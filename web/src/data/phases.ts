// Originally generated from the legacy index.html (now removed); maintained by hand.

export interface StatCard { label: string; value: string; }
export interface SessionStep { time: string; desc: string; }

/** An exercise as it appears in a specific workout (sets/reps and dumbbell count are per-workout). */
export interface WorkoutExercise {
  slug: string;
  /** Display name as shown in the workout card (can differ from EXERCISE_DATA name). */
  name: string;
  setsReps: string;
  /** Number of dumbbells/kettlebells held; 0 = bodyweight, banded or sandbag (see EXERCISE_DATA). */
  dumbbells: number;
}

export interface Workout {
  id: string;
  badge: string;
  name: string;
  exercises: WorkoutExercise[];
}

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
}

export const PHASES: Phase[] = [
  {
    "index": 0,
    "tabName": "Foundation",
    "monthsLabel": "Months 1–3",
    "title": "Foundation",
    "goal": "Learn the movements and build the habit. Each session is 7 lifts × 3 sets plus a core finisher — light enough to focus on form but enough volume to start adapting. The kettlebell work starts here: swings on Workout B teach the hip snap, and the alternating farmer's carry on Workout A teaches you to brace. Lower body and back take a beating; upper body stays controlled and conservative.",
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
        "desc": "Main workout — 7 lifts × 3 sets, then the core finisher"
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
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "3 × 10",
            "dumbbells": 2
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
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 30 sec each side",
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
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-swing",
            "name": "KB swing",
            "setsReps": "3 × 15",
            "dumbbells": 1
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "3 × 8",
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
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      }
    ]
  },
  {
    "index": 1,
    "tabName": "Building",
    "monthsLabel": "Months 4–6",
    "title": "Building",
    "goal": "Three sessions a week on a Legs / Upper A / Upper B split. Legs get one focused day and double as your hinge and carry day (you run 3× a week too), while both upper days train chest, back, shoulders and arms — so every upper muscle is trained twice a week. Core work is spread one item per session: the iron trident on Upper A, the KB Russian twist on Upper B, carries and sandbag work on Legs. Volume climbs where it was thin: chest, arms and hamstrings.",
    "stats": [
      {
        "label": "Session length",
        "value": "30–40 min"
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
        "value": "2–3 sec down"
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
        "time": "20–30 min",
        "desc": "Main workout — 3–7 lifts × 3 sets, then the core finisher"
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
        "name": "Legs & core — squat, hinge, swing & carries",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "1 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "4 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-swing",
            "name": "KB swing",
            "setsReps": "3 × 15",
            "dumbbells": 1
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge",
            "setsReps": "2 × 10 each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 30 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "3 × 8 each direction",
            "dumbbells": 0
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
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "3 × 10",
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
            "setsReps": "3 × 13",
            "dumbbells": 2
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "3 × 13",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "3 × 13",
            "dumbbells": 1
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly",
            "setsReps": "3 × 13",
            "dumbbells": 2
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident",
            "setsReps": "2 × 10 each side",
            "dumbbells": 0
          }
        ]
      },
      {
        "id": "p2-ub",
        "badge": "Upper B",
        "name": "Upper B — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-single-arm-overhead-press",
            "name": "KB single-arm overhead press",
            "setsReps": "3 × 10 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 13",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "3 × 13",
            "dumbbells": 2
          },
          {
            "slug": "db-close-grip-floor-press",
            "name": "DB close-grip floor press",
            "setsReps": "3 × 13",
            "dumbbells": 2
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 20 steps (2 per arm)",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      }
    ]
  },
  {
    "index": 2,
    "tabName": "Intensity",
    "monthsLabel": "Months 7–9",
    "title": "Intensity",
    "goal": "Same Legs / Upper A / Upper B split, now heavier with full 2-minute rests. Push the weight up here via double progression (add reps, then load). The overhead kettlebell work tops out at 16kg — the heaviest bell you own that you can press strictly — so the single-arm press and overhead walk progress by reps and steps instead of load. Your strength-building block; upper muscles still trained twice a week.",
    "stats": [
      {
        "label": "Session length",
        "value": "40–50 min"
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
        "value": "2–3 sec down"
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
        "time": "30–40 min",
        "desc": "Main workout — 3–7 lifts × 3 straight sets, 2 min rest, then the core finisher"
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
        "name": "Legs & core — squat, hinge, swing & carries",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "1 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "4 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-swing",
            "name": "KB swing",
            "setsReps": "3 × 15",
            "dumbbells": 1
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge",
            "setsReps": "2 × 10 each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 40 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "3 × 8 each direction",
            "dumbbells": 0
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
            "slug": "db-overhead-press",
            "name": "DB overhead press",
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
            "setsReps": "3 × 10",
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
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident",
            "setsReps": "2 × 12 each side",
            "dumbbells": 0
          }
        ]
      },
      {
        "id": "p3-ub",
        "badge": "Upper B",
        "name": "Upper B — chest, back, shoulders, arms",
        "exercises": [
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
            "slug": "kb-single-arm-overhead-press",
            "name": "KB single-arm overhead press",
            "setsReps": "3 × 8 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-close-grip-floor-press",
            "name": "DB close-grip floor press",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 25 steps (2 per arm)",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      }
    ]
  },
  {
    "index": 3,
    "tabName": "Mastery",
    "monthsLabel": "Months 10–12",
    "title": "Mastery",
    "goal": "Same split and the same weights as Phase 3 — but every rep on strict tempo: 3 seconds lowering, 1-second pause, controlled lift. The slow eccentric is the added overload, so you don't add weight. Swings and carries are the exception: they run at normal speed and get extra reps or seconds instead. Take a deload week (50% weight, 2 sets) every 6 weeks.",
    "stats": [
      {
        "label": "Session length",
        "value": "45–55 min"
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
        "time": "35–45 min",
        "desc": "Main workout — 3–7 lifts × 3 sets with strict tempo, then the core finisher"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — hold each stretch 30–45 sec"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Upper A → Upper B, strict tempo",
    "rotationNote": "Tempo: 3 sec lowering · 1 sec pause at bottom · lift normally · weights held at Phase 3 level · swings and carries run at normal speed",
    "workouts": [
      {
        "id": "p4-legs",
        "badge": "Legs",
        "name": "Legs & core — squat, hinge, swing & carries",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "1 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat (tempo)",
            "setsReps": "4 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift-tempo",
            "name": "DB Romanian deadlift (tempo)",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-swing",
            "name": "KB swing",
            "setsReps": "3 × 20",
            "dumbbells": 1
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge (tempo)",
            "setsReps": "2 × 10 each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 40 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "3 × 10 each direction",
            "dumbbells": 0
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
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row-tempo",
            "name": "DB bent-over row (tempo)",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press-tempo",
            "name": "DB overhead press (tempo)",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-lateral-raise-tempo",
            "name": "DB lateral raise (tempo)",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-curl-tempo",
            "name": "DB curl (tempo)",
            "setsReps": "3 × 10",
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
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident (tempo)",
            "setsReps": "2 × 12 each side",
            "dumbbells": 0
          }
        ]
      },
      {
        "id": "p4-ub",
        "badge": "Upper B",
        "name": "Upper B — chest, back, shoulders, arms",
        "exercises": [
          {
            "slug": "db-floor-press-tempo",
            "name": "DB floor press (tempo)",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-bent-over-row-tempo",
            "name": "DB bent-over row (tempo)",
            "setsReps": "3 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-single-arm-overhead-press",
            "name": "KB single-arm overhead press (tempo)",
            "setsReps": "3 × 8 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise-tempo",
            "name": "DB lateral raise (tempo)",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-hammer-curl-tempo",
            "name": "DB hammer curl (tempo)",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-close-grip-floor-press",
            "name": "DB close-grip floor press (tempo)",
            "setsReps": "3 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 25 steps (2 per arm)",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist (tempo)",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      }
    ]
  }
];
