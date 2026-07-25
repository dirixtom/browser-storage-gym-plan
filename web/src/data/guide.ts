// Training guide content: effort/tempo advice shown in the Guide sheet,
// the per-phase legend above workouts, and the fullscreen "tap to train" cue bar.

export interface GuideSection {
  id: 'effort' | 'progression' | 'tempo' | 'rest' | 'deload' | 'phase1';
  title: string;
  body: string[];
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'effort',
    title: 'Effort — reps in reserve',
    body: [
      'Reps in reserve (RIR) = how many more clean reps you could do when you stop. Work sets stop at 1–2 RIR.',
      'The LAST set of every exercise goes to failure — the point where the next rep would not move, or form would break. No drop sets, ever.',
    ],
  },
  {
    id: 'progression',
    title: 'Progression',
    body: [
      'Every exercise has a fixed rep target. Pick a weight you can hit that target with on all sets, keeping 1–2 reps in reserve.',
      'When you complete every rep on every set with good form, add weight next session. If you miss the target, hold the weight until you hit it.',
    ],
  },
  {
    id: 'tempo',
    title: 'Tempo / eccentric',
    body: [
      'Always control the lowering: 2–3 sec down on every rep, every phase.',
      'Phase 4 makes it strict: 3 sec down + 1 sec pause at the bottom, then lift. That slow eccentric is the overload — weights stay at Phase 3 level.',
    ],
  },
  {
    id: 'rest',
    title: 'Rest between sets',
    body: [
      'Phase 1 & 2: 90 sec between sets and exercises. Phase 3 & 4: 2 min.',
      'Core finishers need less — 45–60 sec between sides is plenty.',
    ],
  },
  {
    id: 'deload',
    title: 'Deload',
    body: [
      'Phase 4: every 6th week is a deload — 50% weight, 2 sets per exercise, stop far from failure.',
      'Any phase: if a lift has stalled for 2 weeks, deload that exercise for a week and rebuild.',
    ],
  },
  {
    id: 'phase1',
    title: 'Phase 1 exception — form first',
    body: [
      'In Phase 1 nothing goes to failure. Stop every set at 2–3 RIR and spend the reps on technique.',
      'Failure training starts in Phase 2.',
    ],
  },
];

/** One-line cue for the fullscreen header bar, indexed by phase (0–3). */
export const EFFORT_CUES: [string, string, string, string] = [
  'Form first · stop 2–3 reps in reserve · no failure sets yet',
  '1–2 reps in reserve · last set → failure',
  '1–2 reps in reserve · last set → failure · rest 2 min',
  '3s down · 1s pause · 1–2 RIR · last set → failure',
];

/** Per-phase effort legend rendered above the workouts grid. */
export const EFFORT_LEGEND: [string, string, string, string] = [
  'Form first — every set stops 2–3 reps short of failure. Failure training starts in Phase 2.',
  'Work sets at 1–2 reps in reserve · last set of every exercise → failure · hit every rep on all sets → add weight',
  'Work sets at 1–2 reps in reserve · last set of every exercise → failure · hit every rep on all sets → add weight',
  'Strict 3s down · 1s pause tempo · 1–2 reps in reserve · last set of every exercise → failure',
];

/** Extra lines shown when the fullscreen "Guide" toggle is expanded, per phase. */
export const FS_GUIDE_DETAILS: [string[], string[], string[], string[]] = [
  [
    'Every set stops 2–3 reps before failure — this phase is about learning the movements.',
    'No failure sets — that starts in Phase 2.',
  ],
  [
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Hit every rep on all sets → add weight next session.',
  ],
  [
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Rest 2 min between sets and exercises — the heavier load needs it.',
  ],
  [
    '3 sec lowering, 1 sec pause at the bottom, then lift — every rep.',
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Weights match Phase 3 — the slow eccentric is the added overload.',
    'Deload every 6th week: 50% weight, 2 sets, nowhere near failure.',
  ],
];
