// Originally generated from the legacy index.html (now removed); maintained by hand.

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

export const PHASES: Phase[] = [
  {
    "index": 0,
    "tabName": "Foundation",
    "monthsLabel": "Months 1–3",
    "title": "Foundation",
    "goal": "Learn the movements and build the habit. Each session is 7 exercises × 3 sets — light enough to focus on form but enough volume to start adapting. Lower body and back take a beating; upper body stays controlled and conservative.",
    "stats": [
      {
        "label": "Session length",
        "value": "40–45 min"
      },
      {
        "label": "Rest between sets",
        "value": "90 sec"
      },
      {
        "label": "Rest between exercises",
        "value": "90 sec"
      },
      {
        "label": "Tempo",
        "value": "Slow & controlled"
      },
      {
        "label": "Workouts / week",
        "value": "3"
      }
    ],
    "sessionStructure": [
      {
        "time": "5 min",
        "desc": "Warm-up — arm circles, hip circles, bodyweight squats, jumping jacks"
      },
      {
        "time": "30–35 min",
        "desc": "Main workout — 7 exercises, 3 sets each"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — hold each stretch 20–30 sec"
      }
    ],
    "workoutsLabel": "Workouts — alternate A → B → A each week, then B → A → B the next",
    "rotationNote": "Rotation: Week 1: A–B–A · Week 2: B–A–B · repeat",
    "workouts": [
      {
        "id": "p1-a",
        "badge": "Workout A",
        "name": "Full body — push focus",
        "exercises": [
          {
            "slug": "goblet-squat",
            "name": "Goblet squat",
            "setsReps": "3 × 10",
            "dumbbells": 1
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "3 × 8",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p1-b",
        "badge": "Workout B",
        "name": "Full body — pull focus",
        "exercises": [
          {
            "slug": "goblet-squat",
            "name": "Goblet squat",
            "setsReps": "3 × 10",
            "dumbbells": 1
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-front-raise",
            "name": "DB front raise",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-shrug",
            "name": "DB shrug",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "3 × 8",
            "dumbbells": 2
          }
        ]
      }
    ],
    "coreLabel": "Core — add 3 of these at the end of each session, rotate through them",
    "core": [
      {
        "name": "Dead bug",
        "desc": "Lie on back, arms up, knees at 90°. Lower opposite arm and leg slowly, return.",
        "setsReps": "3 × 8 each side"
      },
      {
        "name": "DB crunch",
        "desc": "Lie on back, hold one dumbbell on chest. Crunch shoulders off floor. No neck pulling.",
        "setsReps": "3 × 12"
      },
      {
        "name": "Leg raise",
        "desc": "Lie flat, legs straight, lower back pressed to floor. Raise legs to 90°, lower slowly.",
        "setsReps": "3 × 10"
      },
      {
        "name": "Bird dog",
        "desc": "On all fours, extend opposite arm and leg simultaneously. Hold 2 sec.",
        "setsReps": "3 × 8 each side"
      },
      {
        "name": "Heel tap",
        "desc": "Lie on back, knees bent. Crunch sideways to tap each heel alternately.",
        "setsReps": "3 × 15 each side"
      },
      {
        "name": "Seated knee tuck",
        "desc": "Lean back slightly, hands behind you. Draw both knees to chest, extend out. Lower abs.",
        "setsReps": "3 × 12"
      }
    ]
  },
  {
    "index": 1,
    "tabName": "Building",
    "monthsLabel": "Months 4–6",
    "title": "Building",
    "goal": "Three sessions a week on a Legs / Upper A / Upper B split. Legs get one focused day (you run 3× a week too), while both upper days train chest, back, shoulders and arms — so every upper muscle is trained twice a week. Volume climbs where it was thin: chest, arms and hamstrings.",
    "stats": [
      {
        "label": "Session length",
        "value": "45–55 min"
      },
      {
        "label": "Rest between sets",
        "value": "90 sec"
      },
      {
        "label": "Rest between exercises",
        "value": "90 sec"
      },
      {
        "label": "Tempo",
        "value": "2 sec down"
      },
      {
        "label": "Workouts / week",
        "value": "3"
      }
    ],
    "sessionStructure": [
      {
        "time": "5 min",
        "desc": "Warm-up — include 1 light set of first exercise at 50% weight"
      },
      {
        "time": "35–45 min",
        "desc": "Main workout — 6–7 exercises, 3 sets each"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — stretch muscles trained that session"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Upper A → Upper B each week",
    "rotationNote": "Rotation: Legs → Upper A → Upper B · repeating cycle",
    "workouts": [
      {
        "id": "p2-legs",
        "badge": "Legs",
        "name": "Legs — quads, hamstrings, glutes",
        "exercises": [
          {
            "slug": "db-sumo-squat",
            "name": "DB sumo squat",
            "setsReps": "3 × 10–12",
            "dumbbells": 1
          },
          {
            "slug": "db-bulgarian-split-squat",
            "name": "DB Bulgarian split squat",
            "setsReps": "3 × 10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 10–12",
            "dumbbells": 2
          },
          {
            "slug": "db-single-leg-rdl",
            "name": "DB single-leg Romanian deadlift",
            "setsReps": "3 × 10 each",
            "dumbbells": 1
          },
          {
            "slug": "db-glute-bridge",
            "name": "DB single-leg glute bridge",
            "setsReps": "3 × 12 each",
            "dumbbells": 1
          },
          {
            "slug": "db-calf-raise",
            "name": "DB calf raise",
            "setsReps": "3 × 15",
            "dumbbells": 2
          }
        ]
      },
      {
        "id": "p2-ua",
        "badge": "Upper A",
        "name": "Upper A — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "3 × 10–12",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "3 × 10–12",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 12–15",
            "dumbbells": 2
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "3 × 10–12",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "3 × 10–12",
            "dumbbells": 1
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly",
            "setsReps": "3 × 12–15",
            "dumbbells": 2
          }
        ]
      },
      {
        "id": "p2-ub",
        "badge": "Upper B",
        "name": "Upper B — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-close-grip-floor-press",
            "name": "DB close-grip floor press",
            "setsReps": "3 × 10–12",
            "dumbbells": 2
          },
          {
            "slug": "db-single-arm-row",
            "name": "DB single-arm row",
            "setsReps": "3 × 10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-arnold-press",
            "name": "DB Arnold press",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 12–15",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "3 × 10–12",
            "dumbbells": 2
          },
          {
            "slug": "tricep-kickback",
            "name": "Tricep kickback",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-face-pull-floor",
            "name": "DB face pull (floor)",
            "setsReps": "3 × 15",
            "dumbbells": 2
          }
        ]
      }
    ],
    "coreLabel": "Core — pick 3 per session, rotate. More variety than Phase 1.",
    "core": [
      {
        "name": "DB crunch",
        "desc": "Dumbbell on chest. Controlled crunch, don't use momentum.",
        "setsReps": "3 × 15"
      },
      {
        "name": "DB Russian twist",
        "desc": "Sit at 45°, hold one dumbbell, rotate side to side. Feet on floor. Oblique focus.",
        "setsReps": "3 × 12 each side"
      },
      {
        "name": "Leg raise",
        "desc": "Lower back flat, raise straight legs to 90° and lower slowly.",
        "setsReps": "3 × 12"
      },
      {
        "name": "Seated knee tuck",
        "desc": "Lean back slightly, hands behind you. Draw both knees to chest. Keep feet off floor the whole set.",
        "setsReps": "3 × 15"
      },
      {
        "name": "Dead bug",
        "desc": "Arms up, knees at 90°. Lower opposite arm and leg simultaneously. Lower back stays on floor.",
        "setsReps": "3 × 10 each side"
      },
      {
        "name": "DB woodchop",
        "desc": "Hold one dumbbell with both hands. Rotate and chop diagonally from high to low.",
        "setsReps": "3 × 10 each side"
      }
    ]
  },
  {
    "index": 2,
    "tabName": "Intensity",
    "monthsLabel": "Months 7–9",
    "title": "Intensity",
    "goal": "Same Legs / Upper A / Upper B split, now heavier with full 2-minute rests. Push the weight up here via double progression (add reps, then load). Your strength-building block; upper muscles still trained twice a week.",
    "stats": [
      {
        "label": "Session length",
        "value": "60–70 min"
      },
      {
        "label": "Rest between sets",
        "value": "2 min"
      },
      {
        "label": "Rest between exercises",
        "value": "2 min"
      },
      {
        "label": "Tempo",
        "value": "2 sec down"
      },
      {
        "label": "Workouts / week",
        "value": "3"
      }
    ],
    "sessionStructure": [
      {
        "time": "5 min",
        "desc": "Warm-up — light movement + 1 warm-up set of first exercise"
      },
      {
        "time": "50–60 min",
        "desc": "Main workout — 6–7 exercises, 3 straight sets, 2 min rest"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — stretch every major muscle group worked"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Upper A → Upper B, straight sets",
    "rotationNote": "Rotation: Legs → Upper A → Upper B · heavier weight, 2 min rest between sets",
    "workouts": [
      {
        "id": "p3-legs",
        "badge": "Legs",
        "name": "Legs — quads, hamstrings, glutes",
        "exercises": [
          {
            "slug": "db-sumo-squat",
            "name": "DB sumo squat",
            "setsReps": "3 × 8–10",
            "dumbbells": 1
          },
          {
            "slug": "db-bulgarian-split-squat",
            "name": "DB Bulgarian split squat",
            "setsReps": "3 × 8–10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-single-leg-rdl",
            "name": "DB single-leg Romanian deadlift",
            "setsReps": "3 × 8–10 each",
            "dumbbells": 1
          },
          {
            "slug": "db-glute-bridge",
            "name": "DB single-leg glute bridge",
            "setsReps": "3 × 12 each",
            "dumbbells": 1
          },
          {
            "slug": "db-calf-raise",
            "name": "DB calf raise",
            "setsReps": "3 × 15–20",
            "dumbbells": 2
          }
        ]
      },
      {
        "id": "p3-ua",
        "badge": "Upper A",
        "name": "Upper A — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "3 × 10",
            "dumbbells": 1
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly",
            "setsReps": "3 × 12",
            "dumbbells": 2
          }
        ]
      },
      {
        "id": "p3-ub",
        "badge": "Upper B",
        "name": "Upper B — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-close-grip-floor-press",
            "name": "DB close-grip floor press",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-single-arm-row",
            "name": "DB single-arm row",
            "setsReps": "3 × 8–10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-arnold-press",
            "name": "DB Arnold press",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "tricep-kickback",
            "name": "Tricep kickback",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-face-pull-floor",
            "name": "DB face pull (floor)",
            "setsReps": "3 × 15",
            "dumbbells": 2
          }
        ]
      }
    ],
    "coreLabel": "Core — add as a finisher after the main workout. Superset core pairs for efficiency.",
    "core": [
      {
        "name": "DB Russian twist",
        "desc": "Feet raised off floor. Heavier dumbbell. Rotate fully each side.",
        "setsReps": "3 × 15 each side"
      },
      {
        "name": "Hollow body hold",
        "desc": "Lie flat, arms overhead, lower back on floor. Raise shoulders and legs slightly. Hold.",
        "setsReps": "3 × 25–30 sec"
      },
      {
        "name": "DB suitcase carry",
        "desc": "One dumbbell at your side. Walk 15 steps keeping shoulders level. Core fights to stay upright.",
        "setsReps": "3 × 15 steps each side"
      },
      {
        "name": "DB woodchop",
        "desc": "Both hands on one dumbbell. Chop diagonally high to low. Rotation comes from core.",
        "setsReps": "3 × 10 each side"
      },
      {
        "name": "V-up",
        "desc": "Lie flat, raise arms and legs simultaneously to form a V. Lower slowly.",
        "setsReps": "3 × 10"
      },
      {
        "name": "Seated knee tuck (weighted)",
        "desc": "Feet off floor. Hold dumbbell between knees. Draw knees to chest, extend.",
        "setsReps": "3 × 15"
      }
    ]
  },
  {
    "index": 3,
    "tabName": "Mastery",
    "monthsLabel": "Months 10–12",
    "title": "Mastery",
    "goal": "Same split and the same weights as Phase 3 — but every rep on strict tempo: 3 seconds lowering, 1-second pause, controlled lift. The slow eccentric is the added overload, so you don't add weight. Take a deload week (50% weight, 2 sets) every 6 weeks.",
    "stats": [
      {
        "label": "Session length",
        "value": "70–75 min"
      },
      {
        "label": "Rest between sets",
        "value": "2 min"
      },
      {
        "label": "Rest between exercises",
        "value": "2 min"
      },
      {
        "label": "Tempo",
        "value": "3s down · 1s pause · lift"
      },
      {
        "label": "Workouts / week",
        "value": "3"
      }
    ],
    "sessionStructure": [
      {
        "time": "5–8 min",
        "desc": "Warm-up — include hip flexor stretch, shoulder circles, thoracic rotation"
      },
      {
        "time": "60–65 min",
        "desc": "Main workout — 6–7 exercises, 3 sets with strict tempo"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — hold each stretch 30–45 sec"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Upper A → Upper B, strict tempo",
    "rotationNote": "Tempo: 3 sec lowering · 1 sec pause at bottom · lift normally · weights held at Phase 3 level",
    "workouts": [
      {
        "id": "p4-legs",
        "badge": "Legs",
        "name": "Legs — quads, hamstrings, glutes",
        "exercises": [
          {
            "slug": "db-bulgarian-split-squat-tempo",
            "name": "DB Bulgarian split squat (tempo)",
            "setsReps": "3 × 8–10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-reverse-lunge-tempo",
            "name": "DB reverse lunge (tempo)",
            "setsReps": "3 × 10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift-tempo",
            "name": "DB Romanian deadlift (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-single-leg-rdl",
            "name": "DB single-leg Romanian deadlift (tempo)",
            "setsReps": "3 × 8–10 each",
            "dumbbells": 1
          },
          {
            "slug": "db-glute-bridge",
            "name": "DB single-leg glute bridge (tempo)",
            "setsReps": "3 × 12 each",
            "dumbbells": 1
          },
          {
            "slug": "db-calf-raise",
            "name": "DB calf raise (tempo)",
            "setsReps": "3 × 15–20",
            "dumbbells": 2
          }
        ]
      },
      {
        "id": "p4-ua",
        "badge": "Upper A",
        "name": "Upper A — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-floor-press-tempo",
            "name": "DB floor press (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row-tempo",
            "name": "DB bent-over row (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press-tempo",
            "name": "DB overhead press (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise-tempo",
            "name": "DB lateral raise (tempo)",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-curl-tempo",
            "name": "DB curl (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension-tempo",
            "name": "DB tricep overhead extension (tempo)",
            "setsReps": "3 × 10",
            "dumbbells": 1
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly (tempo)",
            "setsReps": "3 × 12",
            "dumbbells": 2
          }
        ]
      },
      {
        "id": "p4-ub",
        "badge": "Upper B",
        "name": "Upper B — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-close-grip-floor-press",
            "name": "DB close-grip floor press (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "single-arm-row-tempo",
            "name": "Single-arm row (tempo)",
            "setsReps": "3 × 8–10 each",
            "dumbbells": 2
          },
          {
            "slug": "db-arnold-press",
            "name": "DB Arnold press (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise-tempo",
            "name": "DB lateral raise (tempo)",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-hammer-curl-tempo",
            "name": "DB hammer curl (tempo)",
            "setsReps": "3 × 8–10",
            "dumbbells": 2
          },
          {
            "slug": "tricep-kickback",
            "name": "Tricep kickback (tempo)",
            "setsReps": "3 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-face-pull-floor",
            "name": "DB face pull (floor, tempo)",
            "setsReps": "3 × 15",
            "dumbbells": 2
          }
        ]
      }
    ],
    "coreLabel": "Core — tempo applies here too. Every movement slow and deliberate.",
    "core": [
      {
        "name": "DB ab rollout (floor)",
        "desc": "Kneel, roll dumbbell out slowly as body extends. Pull back before hips touch floor.",
        "setsReps": "3 × 8"
      },
      {
        "name": "Hollow body hold",
        "desc": "30 seconds minimum. Arms overhead, shoulders and legs raised, lower back on floor.",
        "setsReps": "3 × 30–40 sec"
      },
      {
        "name": "DB woodchop (heavy)",
        "desc": "Heavier dumbbell. Controlled rotation high-to-low and low-to-high each side.",
        "setsReps": "3 × 12 each side"
      },
      {
        "name": "DB suitcase carry",
        "desc": "Heavier than Phase 3. Walk slow, shoulders level, core braced the whole time.",
        "setsReps": "3 × 20 steps each side"
      },
      {
        "name": "DB windmill",
        "desc": "One dumbbell overhead, feet wide. Hinge sideways, reach other hand to floor. Eyes on the weight.",
        "setsReps": "3 × 8 each side"
      },
      {
        "name": "V-up with DB pass",
        "desc": "V-up while passing a dumbbell from hands to feet and back. Coordination + full core.",
        "setsReps": "3 × 10"
      }
    ]
  }
];
