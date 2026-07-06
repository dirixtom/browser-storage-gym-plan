// Sync client, ported from the legacy app's `Sync` IIFE.
//
// Optional cloud sync via the same-origin backend (server/). If no backend is
// reachable (app opened as a static file / GitHub Pages without a server),
// every call fails quietly and the app stays in pure local-storage mode.
//
// TanStack Query (hooks/useSync.ts) decides WHEN things run (on login, on
// window focus); the newer-wins merge logic itself lives here as plain
// functions so it stays testable and framework-free.

import {
  applyRaw,
  getMeta,
  getRaw,
  localSyncKeys,
  registerSyncQueue,
  setMeta,
} from './storage';

export interface SyncItem {
  item_key: string;
  value: string | null;
  deleted: boolean;
  updated_at: string;
}

export function api(path: string, opts?: RequestInit): Promise<Response> {
  return fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
}

/** Snapshot one local key in the sync wire format. */
export function collectItem(lsKey: string): SyncItem {
  const meta = getMeta(lsKey) || { updated_at: new Date(0).toISOString(), deleted: false };
  const deleted = !!meta.deleted;
  const value = deleted ? null : getRaw(lsKey);
  return { item_key: lsKey, value, deleted, updated_at: meta.updated_at };
}

/** Apply one remote item locally if it is strictly newer than what we have. */
export function applyRemote(r: SyncItem): boolean {
  const lm = getMeta(r.item_key);
  const localTs = lm ? Date.parse(lm.updated_at) : -Infinity;
  const remoteTs = Date.parse(r.updated_at);
  if (remoteTs <= localTs) return false;
  applyRaw(r.item_key, r.value, { updated_at: r.updated_at, deleted: !!r.deleted });
  return true;
}

/**
 * Full two-way reconcile against an already-fetched remote item list
 * (newer-wins per key): applies newer remote values locally and returns the
 * local items that are newer than the server's and need pushing.
 */
export function reconcileWithRemote(remote: SyncItem[]): SyncItem[] {
  const remoteMap = new Map(remote.map((r) => [r.item_key, r]));
  const keys = new Set([...localSyncKeys(), ...remoteMap.keys()]);
  const toPush: SyncItem[] = [];
  keys.forEach((key) => {
    const local = collectItem(key);
    const r = remoteMap.get(key);
    const localTs = Date.parse(local.updated_at);
    const remoteTs = r ? Date.parse(r.updated_at) : -Infinity;
    if (r && remoteTs > localTs) applyRemote(r);
    else if (localTs > remoteTs) toPush.push(local);
  });
  return toPush;
}

// ── Debounced push of edited keys while logged in ────────────────────────────
// Module-level (not React state): edits can come from any component and must
// coalesce into one POST 800ms after the last edit, exactly like the original.

const pending = new Set<string>();
let pushTimer: ReturnType<typeof setTimeout> | undefined;
let enabled = false; // flipped by useSync when /api/me says loggedIn

export function setSyncEnabled(on: boolean): void {
  enabled = on;
  if (on && pending.size) scheduleFlush();
}

function scheduleFlush(): void {
  clearTimeout(pushTimer);
  pushTimer = setTimeout(flush, 800);
}

function queue(lsKey: string): void {
  if (!enabled) return;
  pending.add(lsKey);
  scheduleFlush();
}

export async function flush(): Promise<void> {
  if (!enabled || pending.size === 0) return;
  const keys = [...pending];
  pending.clear();
  const items = keys.map(collectItem);
  try {
    const res = await api('/api/sync', { method: 'POST', body: JSON.stringify({ items }) });
    if (res.ok) {
      // Adopt the server's authoritative timestamps for what we pushed.
      const remote: SyncItem[] = (await res.json()).items || [];
      const m = new Map(remote.map((r) => [r.item_key, r]));
      keys.forEach((k) => {
        const r = m.get(k);
        if (r) setMeta(k, { updated_at: r.updated_at, deleted: !!r.deleted });
      });
    } else {
      keys.forEach((k) => pending.add(k)); // retry later
    }
  } catch {
    keys.forEach((k) => pending.add(k)); // offline — retry at next flush/login
  }
}

/** Push a set of items (used by reconcile for local-newer values). */
export async function pushItems(items: SyncItem[]): Promise<void> {
  if (!items.length) return;
  try {
    await api('/api/sync', { method: 'POST', body: JSON.stringify({ items }) });
  } catch {
    /* offline — the next reconcile will retry */
  }
}

// Wire local edits into the debounced push.
registerSyncQueue(queue);
