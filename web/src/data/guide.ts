// Training guide content: effort/rest-pause/tempo advice shown in the Guide sheet,
// the per-phase legend above workouts, and the fullscreen "tap to train" cue bar.

export interface GuideSection {
  id: 'effort' | 'double-progression' | 'rest-pause' | 'tempo' | 'rest' | 'deload' | 'phase1';
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
    id: 'double-progression',
    title: 'Double progression',
    body: [
      'Every exercise has a rep range (e.g. 8–12). Start at the bottom of the range with a weight you can control.',
      'Add reps each session. When you hit the TOP of the range on ALL sets, add weight next session — reps drop back to the bottom, then climb again.',
    ],
  },
  {
    id: 'rest-pause',
    title: 'Rest-pause (exercises tagged RP)',
    body: [
      'On RP exercises, the last set becomes a rest-pause set: go to failure → rest 15–20 sec → go to failure again (expect ~30–50% of the first set\'s reps) → rest 15–20 sec → once more. 2–3 mini-sets total.',
      'Isolation exercises only — never on compounds (squats, deadlifts, presses, rows).',
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
      'Rest-pause mini-rests are exactly 15–20 sec — count them, don\'t eyeball it.',
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
      'Failure training (and rest-pause) starts in Phase 2.',
    ],
  },
];

/** One-line cue for the fullscreen header bar, indexed by phase (0–3). */
export const EFFORT_CUES: [string, string, string, string] = [
  'Form first · stop 2–3 reps in reserve · no failure sets yet',
  '1–2 reps in reserve · last set → failure · RP: fail → 15–20s → fail → 15–20s → fail',
  '1–2 reps in reserve · last set → failure · rest 2 min · RP: fail → 15–20s → fail',
  '3s down · 1s pause · 1–2 RIR · last set → failure · RP: fail → 15–20s → fail',
];

/** Per-phase effort legend rendered above the workouts grid. */
export const EFFORT_LEGEND: [string, string, string, string] = [
  'Form first — every set stops 2–3 reps short of failure. Failure training starts in Phase 2.',
  'Work sets at 1–2 reps in reserve · last set of every exercise → failure · RP = rest-pause finish · hit the top of the range on all sets → add weight',
  'Work sets at 1–2 reps in reserve · last set of every exercise → failure · RP = rest-pause finish · hit the top of the range on all sets → add weight',
  'Strict 3s down · 1s pause tempo · 1–2 reps in reserve · last set of every exercise → failure · RP = rest-pause finish',
];

/** Extra lines shown when the fullscreen "Guide" toggle is expanded, per phase. */
export const FS_GUIDE_DETAILS: [string[], string[], string[], string[]] = [
  [
    'Every set stops 2–3 reps before failure — this phase is about learning the movements.',
    'No rest-pause, no failure sets. That starts in Phase 2.',
  ],
  [
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'RP exercises: after the failure set, rest 15–20s, go again, rest 15–20s, go once more.',
    'Hit the top of the rep range on every set → add weight next session.',
  ],
  [
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'RP exercises: after the failure set, rest 15–20s, go again, rest 15–20s, go once more.',
    'Rest 2 min between sets and exercises — the heavier load needs it.',
  ],
  [
    '3 sec lowering, 1 sec pause at the bottom, then lift — every rep.',
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Weights match Phase 3 — the slow eccentric is the added overload.',
    'Deload every 6th week: 50% weight, 2 sets, nowhere near failure.',
  ],
];
