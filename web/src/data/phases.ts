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
  /** Phase finished and moved past — rendered dimmed, and skipped when picking the default phase. */
  completed?: boolean;
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
    "completed": true,
    "tabName": "Foundation",
    "monthsLabel": "Months 1–3",
    "title": "Foundation",
    "goal": "Learn the movements and build the habit. Legs, Push, Pull — the same three days you will run all year, so there is no routine to relearn at a phase change. Seven exercises a day, two sets each, 90 seconds between everything: one rule, nothing to decide mid-session. Reps stay high and loads light while the patterns bed in.",
    "stats": [
      {
        "label": "Session length",
        "value": "40–45 min"
      },
      {
        "label": "Rest between sets",
        "value": "1 min 30 sec"
      },
      {
        "label": "Rest between exercises",
        "value": "Same as between sets"
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
        "desc": "Main workout — 7 exercises × 2 sets"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — hold each stretch 20–30 sec"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Push → Pull, one after the other each week",
    "rotationNote": "Rotation: Legs → Push → Pull · the same three days every week, all year",
    "workouts": [
      {
        "id": "p1-legs",
        "badge": "Legs",
        "name": "Legs & core — squat, hinge, lunge & carry",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "2 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident",
            "setsReps": "2 × 15 each side",
            "dumbbells": 0
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 30 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p1-push",
        "badge": "Push",
        "name": "Push — chest, shoulders, triceps",
        "exercises": [
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "kb-clean-and-press",
            "name": "KB clean and press",
            "setsReps": "2 × 10 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "2 × 15",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "2 × 15",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "2 × 13 each direction",
            "dumbbells": 0
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 20 steps (2 per arm)",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p1-pull",
        "badge": "Pull",
        "name": "Pull — back, traps, rear delts, biceps",
        "exercises": [
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "kb-high-pull",
            "name": "KB high pull",
            "setsReps": "2 × 12 each arm",
            "dumbbells": 1
          },
          {
            "slug": "kb-pullover",
            "name": "KB pullover",
            "setsReps": "2 × 15",
            "dumbbells": 1
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "2 × 15",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "2 × 15",
            "dumbbells": 2
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly",
            "setsReps": "2 × 15",
            "dumbbells": 2
          },
          {
            "slug": "db-reverse-curl",
            "name": "DB reverse curl",
            "setsReps": "2 × 15",
            "dumbbells": 2
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
    "goal": "Same three days, more load and fewer reps. Every muscle is trained once a week and the balance is deliberate: Legs covers quads, hamstrings, glutes and adductors; Push covers chest, front and side delts and triceps; Pull covers back, traps, rear delts and biceps. Core work is spread one or two items per day — the farmer's carry and KB Russian twist on Legs, the sandbag and overhead walk on Push, the iron trident on Pull.",
    "stats": [
      {
        "label": "Session length",
        "value": "35–45 min"
      },
      {
        "label": "Rest between sets",
        "value": "1 min 30 sec"
      },
      {
        "label": "Rest between exercises",
        "value": "Same as between sets"
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
        "time": "25–35 min",
        "desc": "Main workout — 7 exercises × 2 sets"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — stretch muscles trained that session"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Push → Pull, one after the other each week",
    "rotationNote": "Rotation: Legs → Push → Pull · every muscle trained once a week",
    "workouts": [
      {
        "id": "p2-legs",
        "badge": "Legs",
        "name": "Legs & core — squat, hinge, lunge & carry",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "2 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge",
            "setsReps": "2 × 12 each side",
            "dumbbells": 1
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident",
            "setsReps": "2 × 12 each side",
            "dumbbells": 0
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 30 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p2-push",
        "badge": "Push",
        "name": "Push — chest, shoulders, triceps",
        "exercises": [
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-clean-and-press",
            "name": "KB clean and press",
            "setsReps": "2 × 8 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "2 × 12",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "2 × 10 each direction",
            "dumbbells": 0
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 20 steps (2 per arm)",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p2-pull",
        "badge": "Pull",
        "name": "Pull — back, traps, rear delts, biceps",
        "exercises": [
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "kb-high-pull",
            "name": "KB high pull",
            "setsReps": "2 × 10 each arm",
            "dumbbells": 1
          },
          {
            "slug": "kb-pullover",
            "name": "KB pullover",
            "setsReps": "2 × 12",
            "dumbbells": 1
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly",
            "setsReps": "2 × 12",
            "dumbbells": 2
          },
          {
            "slug": "db-reverse-curl",
            "name": "DB reverse curl",
            "setsReps": "2 × 12",
            "dumbbells": 2
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
    "goal": "Same three days, the heaviest loads of the year at 8 reps on the compounds. Rest stays at a flat 90 seconds. The overhead kettlebell work tops out at 16kg — the heaviest bell you own that you can press strictly — so the clean and press and the overhead walk progress by reps and steps rather than load.",
    "stats": [
      {
        "label": "Session length",
        "value": "35–45 min"
      },
      {
        "label": "Rest between sets",
        "value": "1 min 30 sec"
      },
      {
        "label": "Rest between exercises",
        "value": "Same as between sets"
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
        "time": "25–35 min",
        "desc": "Main workout — 7 exercises × 2 sets"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — stretch every major muscle group worked"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Push → Pull, one after the other each week",
    "rotationNote": "Rotation: Legs → Push → Pull · heaviest loads, 90 sec rest throughout",
    "workouts": [
      {
        "id": "p3-legs",
        "badge": "Legs",
        "name": "Legs & core — squat, hinge, lunge & carry",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "2 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift",
            "name": "DB Romanian deadlift",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge",
            "setsReps": "2 × 10 each side",
            "dumbbells": 1
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident",
            "setsReps": "2 × 10 each side",
            "dumbbells": 0
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 40 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p3-push",
        "badge": "Push",
        "name": "Push — chest, shoulders, triceps",
        "exercises": [
          {
            "slug": "db-floor-press",
            "name": "DB floor press",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press",
            "name": "DB overhead press",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-clean-and-press",
            "name": "KB clean and press",
            "setsReps": "2 × 6 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise",
            "name": "DB lateral raise",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension",
            "name": "DB tricep overhead extension",
            "setsReps": "2 × 10",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "2 × 8 each direction",
            "dumbbells": 0
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 25 steps (2 per arm)",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p3-pull",
        "badge": "Pull",
        "name": "Pull — back, traps, rear delts, biceps",
        "exercises": [
          {
            "slug": "db-bent-over-row",
            "name": "DB bent-over row",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-high-pull",
            "name": "KB high pull",
            "setsReps": "2 × 8 each arm",
            "dumbbells": 1
          },
          {
            "slug": "kb-pullover",
            "name": "KB pullover",
            "setsReps": "2 × 10",
            "dumbbells": 1
          },
          {
            "slug": "db-curl",
            "name": "DB curl",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "hammer-curl",
            "name": "Hammer curl",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-reverse-curl",
            "name": "DB reverse curl",
            "setsReps": "2 × 10",
            "dumbbells": 2
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
    "goal": "Same three days and the same weights as Phase 3, but every rep on strict tempo: 3 seconds lowering, 1-second pause, controlled lift. The slow eccentric is the added overload, so you don't add weight. The carries, the sandbag, the clean and the high pull run at normal speed — none of them can be done slowly. Take a deload week (50% weight, 1 set) every 6 weeks.",
    "stats": [
      {
        "label": "Session length",
        "value": "40–50 min"
      },
      {
        "label": "Rest between sets",
        "value": "1 min 30 sec"
      },
      {
        "label": "Rest between exercises",
        "value": "Same as between sets"
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
        "time": "30–40 min",
        "desc": "Main workout — 7 exercises × 2 sets at strict tempo"
      },
      {
        "time": "5 min",
        "desc": "Cool-down — hold each stretch 30–45 sec"
      }
    ],
    "workoutsLabel": "Workouts — Legs → Push → Pull, one after the other each week",
    "rotationNote": "Tempo: 3 sec lowering · 1 sec pause at bottom · lift normally · weights held at Phase 3 level · carries, sandbag, clean and high pull run at normal speed",
    "workouts": [
      {
        "id": "p4-legs",
        "badge": "Legs",
        "name": "Legs & core — squat, hinge, lunge & carry",
        "exercises": [
          {
            "slug": "clamshell",
            "name": "Clamshell",
            "setsReps": "2 × 12",
            "dumbbells": 0
          },
          {
            "slug": "db-squat",
            "name": "DB squat (tempo)",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-romanian-deadlift-tempo",
            "name": "DB Romanian deadlift (tempo)",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-side-lunge",
            "name": "KB side lunge (tempo)",
            "setsReps": "2 × 10 each side",
            "dumbbells": 1
          },
          {
            "slug": "iron-trident",
            "name": "Iron trident (tempo)",
            "setsReps": "2 × 10 each side",
            "dumbbells": 0
          },
          {
            "slug": "kb-farmers-carry",
            "name": "Farmer's carry (alternating)",
            "setsReps": "2 × 40 sec each side",
            "dumbbells": 1
          },
          {
            "slug": "kb-russian-twist",
            "name": "KB Russian twist (tempo)",
            "setsReps": "2 × 15 each side",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p4-push",
        "badge": "Push",
        "name": "Push — chest, shoulders, triceps",
        "exercises": [
          {
            "slug": "db-floor-press-tempo",
            "name": "DB floor press (tempo)",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "db-overhead-press-tempo",
            "name": "DB overhead press (tempo)",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-clean-and-press",
            "name": "KB clean and press",
            "setsReps": "2 × 6 each arm",
            "dumbbells": 1
          },
          {
            "slug": "db-lateral-raise-tempo",
            "name": "DB lateral raise (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-tricep-overhead-extension-tempo",
            "name": "DB tricep overhead extension (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 1
          },
          {
            "slug": "sandbag-around-the-world",
            "name": "Sandbag around the world",
            "setsReps": "2 × 8 each direction",
            "dumbbells": 0
          },
          {
            "slug": "kb-overhead-walk",
            "name": "Overhead walk",
            "setsReps": "4 × 25 steps (2 per arm)",
            "dumbbells": 1
          }
        ]
      },
      {
        "id": "p4-pull",
        "badge": "Pull",
        "name": "Pull — back, traps, rear delts, biceps",
        "exercises": [
          {
            "slug": "db-bent-over-row-tempo",
            "name": "DB bent-over row (tempo)",
            "setsReps": "2 × 8",
            "dumbbells": 2
          },
          {
            "slug": "kb-high-pull",
            "name": "KB high pull",
            "setsReps": "2 × 8 each arm",
            "dumbbells": 1
          },
          {
            "slug": "kb-pullover",
            "name": "KB pullover (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 1
          },
          {
            "slug": "db-curl-tempo",
            "name": "DB curl (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-hammer-curl-tempo",
            "name": "Hammer curl (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-rear-delt-fly",
            "name": "DB rear delt fly (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 2
          },
          {
            "slug": "db-reverse-curl",
            "name": "DB reverse curl (tempo)",
            "setsReps": "2 × 10",
            "dumbbells": 2
          }
        ]
      }
    ]
  }
];

/** First phase not yet marked completed — the default when nothing is stored. */
export const FIRST_ACTIVE_PHASE = PHASES.find((p) => !p.completed)?.index ?? 0;
