// One-off extraction script: parses the legacy single-file ../index.html and
// generates src/data/exercises.ts and src/data/phases.ts.
//
// Run from web/:  npm run extract
//
// The script also performs a parity check: for every exercise row in every
// workout it re-derives the weight badge text from the extracted data
// (defaultWeights + dumbbell count) and asserts it matches the original HTML
// byte-for-byte. Extraction fails loudly on any mismatch, missing slug, or
// unexpected markup, so the generated data can be trusted over hand-copying.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML_PATH = path.join(__dirname, '..', '..', 'index.html');
const OUT_DIR = path.join(__dirname, '..', 'src', 'data');

const html = fs.readFileSync(HTML_PATH, 'utf8');
const { document } = parseHTML(html);

// ── 1. EXERCISE_DATA ────────────────────────────────────────────────────────
// The object is a pure literal inside the inline <script>; evaluate just that
// block (no DOM access, no side effects) instead of re-typing 65 entries.
const scriptText = [...document.querySelectorAll('script')].map((s) => s.textContent).join('\n');
const dataMatch = scriptText.match(/const EXERCISE_DATA = (\{[\s\S]*?\n {2}\});/);
if (!dataMatch) throw new Error('EXERCISE_DATA literal not found in index.html');
const EXERCISE_DATA = new Function(`return (${dataMatch[1]});`)();

const slugs = Object.keys(EXERCISE_DATA);
if (slugs.length < 60) throw new Error(`Suspiciously few exercises extracted: ${slugs.length}`);
for (const [slug, ex] of Object.entries(EXERCISE_DATA)) {
  for (const key of ['name', 'muscles', 'desc', 'tips']) {
    if (typeof ex[key] !== 'string' || !ex[key]) throw new Error(`${slug}: bad ${key}`);
  }
  if (!Array.isArray(ex.defaultWeights) || ex.defaultWeights.length !== 4) {
    throw new Error(`${slug}: defaultWeights must have 4 entries`);
  }
}

// ── 2. Phase tab names (from the nav) ───────────────────────────────────────
const tabNames = [...document.querySelectorAll('.phase-tabs .phase-tab .phase-tab-name')].map(
  (el) => el.textContent.trim(),
);
if (tabNames.length !== 4) throw new Error(`Expected 4 phase tabs, got ${tabNames.length}`);

// ── 3. Phases ───────────────────────────────────────────────────────────────
const text = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');

function parseWeightBadge(badgeText, isBodyweight) {
  // "20.5kg × 2" → { weight: 20.5, dumbbells: 2 }; "bodyweight" → dumbbells 0
  if (isBodyweight) return { dumbbells: 0 };
  const m = badgeText.match(/^([0-9.]+)kg × (\d)$/);
  if (!m) throw new Error(`Unparseable weight badge: "${badgeText}"`);
  return { weight: parseFloat(m[1]), dumbbells: Number(m[2]) };
}

// The legacy HTML references one slug that never existed in EXERCISE_DATA
// ("DB step-up (onto step)" in Phase 4) — its detail modal silently failed to
// open. Its badge weight (24.5) matches db-step-up's phase-4 default, so it is
// a typo'd reference. Alias it; storage.ts migrates any override saved under
// the old key (see LEGACY_KEY_MIGRATIONS there).
const SLUG_ALIASES = {
  'db-step-up-onto-step': 'db-step-up', // badge 24.5 == db-step-up phase-4 default
  'single-arm-row': 'single-arm-row-tempo', // row name/badge match the -tempo entry exactly
};

const sections = [...document.querySelectorAll('.phase-section')];
if (sections.length !== 4) throw new Error(`Expected 4 phase sections, got ${sections.length}`);

let badgeChecks = 0;
const phases = sections.map((section, index) => {
  const monthsLabel = text(section.querySelector('.phase-months'));
  const title = text(section.querySelector('.phase-title'));
  const goal = text(section.querySelector('.phase-goal'));

  const stats = [...section.querySelectorAll('.stats-grid .stat-card')].map((card) => ({
    label: text(card.querySelector('.stat-label')),
    value: text(card.querySelector('.stat-value')),
  }));

  const sessionStructure = [...section.querySelectorAll('.session-structure .session-step')].map(
    (step) => ({
      time: text(step.querySelector('.step-time')),
      desc: text(step.querySelector('.step-desc')),
    }),
  );

  // First .workouts-label in the phase (the core section has its own).
  const workoutsLabel = text(section.querySelector('.workouts-label'));
  const rotationNote = text(section.querySelector('.rotation-note'));

  const workouts = [...section.querySelectorAll('.workouts-grid .workout-card')].map((card) => {
    const badge = text(card.querySelector('.workout-badge'));
    const name = text(card.querySelector('.workout-name'));
    const letter = badge.replace(/^Workout /, '').toLowerCase();
    const exercises = [...card.querySelectorAll('.exercise-list .exercise-item')].map((row) => {
      const rawSlug = row.getAttribute('data-exercise');
      const slug = SLUG_ALIASES[rawSlug] ?? rawSlug;
      if (!slug || !EXERCISE_DATA[slug]) throw new Error(`Unknown exercise slug: ${rawSlug}`);
      const rowPhase = Number(row.getAttribute('data-phase'));
      if (rowPhase !== index) throw new Error(`data-phase mismatch in ${badge}: ${rowPhase} != ${index}`);
      // Display name as it appears in the workout card (minus the ⓘ icon) —
      // kept because it can differ from EXERCISE_DATA[slug].name (aliased rows).
      const nameEl = row.querySelector('.ex-name').cloneNode(true);
      nameEl.querySelector('.ex-info-icon')?.remove();
      const name = text(nameEl);
      const setsReps = text(row.querySelector('.ex-sets'));
      if (!setsReps) throw new Error(`Missing sets/reps for ${slug} in phase ${index}`);
      const badgeEl = row.querySelector('[data-weight-badge]');
      const isBodyweight = badgeEl.classList.contains('bodyweight');
      const badgeText = text(badgeEl);
      const { weight, dumbbells } = parseWeightBadge(badgeText, isBodyweight);

      // Parity check: badge weight must equal the exercise's default for this phase,
      // so rendering `${defaultWeights[phase]}kg × ${dumbbells}` reproduces the HTML.
      if (!isBodyweight) {
        const expected = EXERCISE_DATA[slug].defaultWeights[index];
        if (weight !== expected) {
          throw new Error(
            `Badge/default mismatch for ${slug} phase ${index}: badge ${weight} vs defaultWeights ${expected}`,
          );
        }
        const rebuilt = `${expected}kg × ${dumbbells}`;
        if (rebuilt !== badgeText) throw new Error(`Rebuild mismatch: "${rebuilt}" vs "${badgeText}"`);
      }
      badgeChecks++;
      if (name !== EXERCISE_DATA[slug].name) {
        console.warn(`  note: row name "${name}" differs from EXERCISE_DATA name "${EXERCISE_DATA[slug].name}"`);
      }
      return { slug, name, setsReps, dumbbells };
    });
    return { id: `p${index + 1}-${letter}`, badge, name, exercises };
  });

  const coreSection = section.querySelector('.core-section');
  const coreLabel = text(coreSection.querySelector('.workouts-label'));
  const core = [...coreSection.querySelectorAll('.core-card')].map((card) => {
    const header = card.querySelector('.core-card-header');
    // Header text is "<dot div>Name" — the dot div has no text.
    const name = text(header);
    const items = [...card.querySelectorAll('.exercise-item')];
    if (items.length !== 2) throw new Error(`Core card "${name}": expected 2 rows, got ${items.length}`);
    const desc = text(items[0].querySelector('.ex-name'));
    const setsReps = text(items[1].querySelector('.ex-sets'));
    return { name, desc, setsReps };
  });

  return {
    index,
    tabName: tabNames[index],
    monthsLabel,
    title,
    goal,
    stats,
    sessionStructure,
    workoutsLabel,
    rotationNote,
    workouts,
    coreLabel,
    core,
  };
});

// Structural expectations from the original app.
const workoutCounts = phases.map((p) => p.workouts.length);
if (JSON.stringify(workoutCounts) !== JSON.stringify([2, 3, 3, 3])) {
  throw new Error(`Unexpected workout counts: ${workoutCounts}`);
}

// ── 4. Emit TypeScript ──────────────────────────────────────────────────────
const GENERATED_NOTE = `// GENERATED by scripts/extract-data.mjs from the legacy index.html — do not edit by hand.
// Re-run \`npm run extract\` (against the pre-conversion index.html) to regenerate.`;

const exercisesTs = `${GENERATED_NOTE}

/** One entry per exercise slug. \`defaultWeights\` has one value per phase; 0 = bodyweight. */
export interface Exercise {
  name: string;
  muscles: string;
  desc: string;
  tips: string;
  defaultWeights: [number, number, number, number];
}

export type Slug = keyof typeof EXERCISE_DATA;

export const EXERCISE_DATA = ${JSON.stringify(EXERCISE_DATA, null, 2)} as const satisfies Record<string, Exercise>;
`;

const phasesTs = `${GENERATED_NOTE}

export interface StatCard { label: string; value: string; }
export interface SessionStep { time: string; desc: string; }

/** An exercise as it appears in a specific workout (sets/reps and dumbbell count are per-workout). */
export interface WorkoutExercise {
  slug: string;
  /** Display name as shown in the workout card (can differ from EXERCISE_DATA name). */
  name: string;
  setsReps: string;
  /** Number of dumbbells used; 0 = bodyweight. */
  dumbbells: number;
}

export interface Workout {
  id: string;
  badge: string;
  name: string;
  exercises: WorkoutExercise[];
}

/** Core-finisher card. Free text — names are NOT EXERCISE_DATA slugs. */
export interface CoreItem { name: string; desc: string; setsReps: string; }

export interface Phase {
  index: number;
  tabName: string;
  monthsLabel: string;
  title: string;
  goal: string;
  stats: StatCard[];
  sessionStructure: SessionStep[];
  workoutsLabel: string;
  rotationNote: string;
  workouts: Workout[];
  coreLabel: string;
  core: CoreItem[];
}

export const PHASES: Phase[] = ${JSON.stringify(phases, null, 2)};
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'exercises.ts'), exercisesTs);
fs.writeFileSync(path.join(OUT_DIR, 'phases.ts'), phasesTs);

console.log(
  `Extracted ${slugs.length} exercises, ${phases.length} phases ` +
    `(${phases.map((p) => p.workouts.length).join('/')} workouts, ` +
    `${phases.reduce((n, p) => n + p.core.length, 0)} core items). ` +
    `${badgeChecks} weight badges parity-checked.`,
);
