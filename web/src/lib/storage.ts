// localStorage persistence layer, ported verbatim from the legacy app.
//
// WIRE-FORMAT WARNING: `storageKey` and the meta sidecar define the exact keys
// stored in localStorage AND in the Postgres kv_item table (server/schema.sql).
// They must not change, or every returning user's data and every synced row is
// silently orphaned. See web/tests/storage.test.mjs.
//
// All persistent data lives in localStorage. When the user is logged in, every
// change is also queued for a debounced push to the sync backend (lib/sync.ts
// registers the queue callback to avoid a circular import).

export const META_PREFIX = 'kilo_meta_';
export const SYNC_KEY_RE = /^(kilo_weight_|kilo_last_phase$)/;
export const LAST_PHASE_KEY = 'kilo_last_phase';

export interface Meta {
  updated_at: string; // ISO timestamp
  deleted: boolean;
}

/** Derive the localStorage key for a logical name like "goblet-squat_phase2". */
export function storageKey(name: string): string {
  return 'kilo_weight_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

const hasStorage = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

// ── Raw access (guarded: never throws, no-ops during SSR/build) ─────────────
export function getRaw(lsKey: string): string | null {
  if (!hasStorage) return null;
  try {
    return localStorage.getItem(lsKey);
  } catch {
    return null;
  }
}

function setRaw(lsKey: string, val: string): void {
  if (!hasStorage) return;
  try {
    localStorage.setItem(lsKey, val);
  } catch {
    /* quota exceeded / private mode — fail quietly, matching the legacy app */
  }
}

function removeRaw(lsKey: string): void {
  if (!hasStorage) return;
  try {
    localStorage.removeItem(lsKey);
  } catch {
    /* ignore */
  }
}

// ── Meta sidecar ─────────────────────────────────────────────────────────────
export function getMeta(lsKey: string): Meta | null {
  const m = getRaw(META_PREFIX + lsKey);
  if (!m) return null;
  try {
    return JSON.parse(m) as Meta;
  } catch {
    return null;
  }
}

export function setMeta(lsKey: string, meta: Meta): void {
  setRaw(META_PREFIX + lsKey, JSON.stringify(meta));
}

// ── Change notification (drives useSyncExternalStore re-renders) ────────────
const listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notify(): void {
  listeners.forEach((l) => l());
}

// Sync queue hook-up; lib/sync.ts registers itself here.
let queueSync: (lsKey: string) => void = () => {};
export function registerSyncQueue(fn: (lsKey: string) => void): void {
  queueSync = fn;
}

// ── Timestamped writes (the only mutation paths the app uses) ────────────────
export function kvSet(lsKey: string, val: string): void {
  setRaw(lsKey, val);
  setMeta(lsKey, { updated_at: new Date().toISOString(), deleted: false });
  queueSync(lsKey);
  notify();
}

export function kvDelete(lsKey: string): void {
  removeRaw(lsKey);
  // Tombstone so a cleared override is not resurrected by an older remote value.
  setMeta(lsKey, { updated_at: new Date().toISOString(), deleted: true });
  queueSync(lsKey);
  notify();
}

/** Write without bumping the timestamp or queueing sync (remote-applied values). */
export function applyRaw(lsKey: string, value: string | null, meta: Meta): void {
  if (meta.deleted || value === null) removeRaw(lsKey);
  else setRaw(lsKey, value);
  setMeta(lsKey, meta);
  notify();
}

// ── Weight helpers (logical name = `${slug}_phase${idx}`) ───────────────────
export function getSavedWeight(name: string): string | null {
  return getRaw(storageKey(name));
}

export function setSavedWeight(name: string, val: number): void {
  kvSet(storageKey(name), String(val));
}

export function clearSavedWeight(name: string): void {
  kvDelete(storageKey(name));
}

// ── One-time migrations, run once on app mount before the first reconcile ───

/**
 * Stamp any existing un-timestamped data as "now" so a first login pushes the
 * local values up (local-wins on first migration). Ported from the legacy app.
 */
export function migrateMeta(): void {
  if (!hasStorage) return;
  const now = new Date().toISOString();
  const keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && SYNC_KEY_RE.test(k)) keys.push(k);
    }
  } catch {
    return;
  }
  keys.forEach((k) => {
    if (!getMeta(k)) setMeta(k, { updated_at: now, deleted: false });
  });
}

/**
 * The legacy HTML referenced two exercise slugs that never existed in
 * EXERCISE_DATA (see web/scripts/extract-data.mjs SLUG_ALIASES). Weights could
 * still be saved under those keys via the fullscreen editor. Move any such
 * override to the canonical slug's key (once, and only if the canonical key has
 * no value yet), using kvSet/kvDelete so the change syncs + tombstones.
 */
const LEGACY_KEY_MIGRATIONS: Array<[oldSlug: string, newSlug: string]> = [
  ['db-step-up-onto-step', 'db-step-up'],
  ['single-arm-row', 'single-arm-row-tempo'],
];

export function migrateLegacyKeys(): void {
  if (!hasStorage) return;
  for (const [oldSlug, newSlug] of LEGACY_KEY_MIGRATIONS) {
    for (let phase = 0; phase < 4; phase++) {
      const oldKey = storageKey(`${oldSlug}_phase${phase}`);
      const newKey = storageKey(`${newSlug}_phase${phase}`);
      const val = getRaw(oldKey);
      if (val !== null) {
        if (getRaw(newKey) === null) kvSet(newKey, val);
        kvDelete(oldKey);
      }
    }
  }
}

/** Every key we know about: live values + tombstones (meta with the value gone). */
export function localSyncKeys(): Set<string> {
  const set = new Set<string>();
  if (!hasStorage) return set;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (SYNC_KEY_RE.test(k)) set.add(k);
      else if (k.startsWith(META_PREFIX)) set.add(k.slice(META_PREFIX.length));
    }
  } catch {
    /* ignore */
  }
  return set;
}
