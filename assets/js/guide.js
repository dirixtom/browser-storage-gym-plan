// Training guide panel and the per-phase effort cues.

const EFFORT_CUES = [
  'Form first · stop 2–3 reps in reserve · no failure sets yet',
  '1–2 reps in reserve · last set → failure',
  '1–2 reps in reserve · last set → failure · rest 2 min',
  '3s down · 1s pause · 1–2 RIR · last set → failure'
];

const FS_GUIDE_DETAILS = [
  [
    'Every set stops 2–3 reps before failure — this phase is about learning the movements.',
    'No failure sets — that starts in Phase 2.'
  ],
  [
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Hit every rep on all sets → add weight next session.'
  ],
  [
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Rest 2 min between sets and exercises — the heavier load needs it.'
  ],
  [
    '3 sec lowering, 1 sec pause at the bottom, then lift — every rep.',
    'Work sets: 1–2 reps in reserve. Last set of every exercise: go to failure.',
    'Weights match Phase 3 — the slow eccentric is the added overload.',
    'Deload every 6th week: 50% weight, 2 sets, nowhere near failure.'
  ]
];

function toggleFsGuide(barEl) {
  barEl.classList.toggle('open');
}

function openGuide() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.getElementById('guidePanel').classList.add('open');
  document.getElementById('guideBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';
}

function closeGuide() {
  document.getElementById('guidePanel').classList.remove('open');
  document.getElementById('guideBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}
