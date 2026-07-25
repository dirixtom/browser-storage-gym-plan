// Originally generated from the legacy index.html (now removed); maintained by hand.

/** One entry per exercise slug. `defaultWeights` has one value per phase; 0 = bodyweight. */
export interface Exercise {
  name: string;
  muscles: string;
  desc: string;
  tips: string;
  defaultWeights: [number, number, number, number];
}

export type Slug = keyof typeof EXERCISE_DATA;

export const EXERCISE_DATA = {
  "goblet-squat": {
    "name": "Goblet squat",
    "muscles": "Quads, glutes, core",
    "desc": "Hold one dumbbell vertically at chest height with both hands cupped around the top. Feet shoulder-width, toes slightly out. Squat down keeping the dumbbell close to your chest, elbows tracking inside your knees. Drive through your heels to stand.",
    "tips": "Keep your chest up the whole way down. If your heels lift, go lighter or widen your stance.",
    "defaultWeights": [
      20.5,
      24.5,
      30.5,
      30.5
    ]
  },
  "db-squat": {
    "name": "DB squat",
    "muscles": "Quads, glutes",
    "desc": "Stand with feet shoulder-width apart, holding a dumbbell in each hand at your sides. Squat down by bending your knees and pushing your hips back, keeping your chest up and back flat. Drive through your heels to stand.",
    "tips": "Keep your weight in your heels and knees tracking over your toes. More quad-dominant than the sumo squat, so do it first while your form is freshest.",
    "defaultWeights": [
      22,
      26,
      31,
      31
    ]
  },
  "db-side-lunge": {
    "name": "DB side lunge",
    "muscles": "Inner thighs (adductors), quads, glutes",
    "desc": "Hold one dumbbell vertically at your chest with both hands. Stand tall, then take a wide step to one side, bending that knee and pushing your hips back while keeping the other leg completely straight. You should feel a strong stretch along the inside of the straight leg. Push off the bent leg's heel to return to standing. Complete all reps, then switch sides.",
    "tips": "This is your adductor work — the stretch in the straight leg's groin is the point, so step wide enough to feel it. Keep the straight leg fully extended and the toes on both feet pointing forward, and don't let the bent knee cave inward. The sumo squat hits the same muscles but nowhere near this range of motion.",
    "defaultWeights": [
      17,
      20,
      24,
      24
    ]
  },
  "db-romanian-deadlift": {
    "name": "DB Romanian deadlift",
    "muscles": "Hamstrings, glutes, lower back",
    "desc": "Stand holding dumbbells in front of your thighs. Hinge at the hips — push your hips back, not down — lowering the dumbbells along your legs until you feel a stretch in your hamstrings. Drive hips forward to return.",
    "tips": "This is a hinge, not a squat. Keep your back flat and the dumbbells close to your legs throughout.",
    "defaultWeights": [
      18,
      22,
      26,
      26
    ]
  },
  "db-single-leg-rdl": {
    "name": "DB single-leg Romanian deadlift",
    "muscles": "Hamstrings, glutes, core (balance)",
    "desc": "Stand on one leg holding a dumbbell in the opposite hand. Hinge at the hip — push your hips back, not down — letting your free leg extend straight behind you as the dumbbell lowers toward the floor. Keep your back flat and your standing knee softly bent. Drive your hips forward to return. Complete all reps, then switch sides.",
    "tips": "Balance is the challenge — go lighter than your two-leg RDL and fix your eyes on a spot on the floor. You should feel a strong stretch in the hamstring of the standing leg.",
    "defaultWeights": [
      10,
      12,
      14,
      14
    ]
  },
  "db-floor-press": {
    "name": "DB floor press",
    "muscles": "Chest (pectorals), triceps, front shoulders",
    "desc": "Lie on your back, knees bent, feet flat. Hold dumbbells at chest level, elbows at about 45° from your body. Press up until arms are extended, then lower until your upper arms touch the floor — that's the natural range stop.",
    "tips": "The floor limits range of motion vs a bench, so focus on squeezing the chest at the top. Don't bounce off the floor at the bottom.",
    "defaultWeights": [
      11.5,
      14,
      17,
      17
    ]
  },
  "db-bent-over-row": {
    "name": "DB bent-over row",
    "muscles": "Upper back (lats, rhomboids), rear shoulders, biceps",
    "desc": "Hinge forward to roughly 45°, back flat, dumbbells hanging below you. Row both dumbbells toward your hips — not your chest — squeezing your shoulder blades together at the top. Lower with control.",
    "tips": "Lead with your elbows, not your hands. Don't let your back round to pull heavier weight.",
    "defaultWeights": [
      13.5,
      16,
      19,
      19
    ]
  },
  "db-lateral-raise": {
    "name": "DB lateral raise",
    "muscles": "Side (medial) deltoids, upper traps",
    "desc": "Stand holding dumbbells at your sides. With a slight bend in the elbow, raise both arms out to the sides until they reach shoulder height — no higher. Lower slowly.",
    "tips": "Go lighter than you think. Tilting your thumbs down slightly (like pouring a jug) isolates the side delt better. Never shrug at the top.",
    "defaultWeights": [
      4.5,
      6,
      8,
      8
    ]
  },
  "db-curl": {
    "name": "DB curl",
    "muscles": "Biceps, brachialis",
    "desc": "Stand with dumbbells at your sides, palms facing forward. Curl both dumbbells up toward your shoulders, keeping your elbows pinned to your sides. Lower slowly — the lowering phase is where most of the growth happens.",
    "tips": "Don't swing your body to get the weight up. If you have to lean back, the weight is too heavy.",
    "defaultWeights": [
      8,
      9.5,
      11.5,
      11.5
    ]
  },
  "db-tricep-overhead-extension": {
    "name": "DB tricep overhead extension",
    "muscles": "Triceps (long head)",
    "desc": "Hold one dumbbell with both hands overhead, arms extended. Keeping your upper arms still and close to your head, bend at the elbows to lower the dumbbell behind your head. Extend back up.",
    "tips": "Keep your core tight — it's easy to arch your back under a heavy load. This is the safest tricep movement for beginners.",
    "defaultWeights": [
      6.5,
      9,
      12,
      12
    ]
  },
  "db-tricep-overhead-extension-tempo": {
    "name": "DB tricep overhead extension (tempo)",
    "muscles": "Triceps (long head)",
    "desc": "Hold one dumbbell with both hands overhead, arms extended. Lower in 3 seconds, 1-second pause behind your head, extend back up in 1 second. Keeping your upper arms still and close to your head, bend at the elbows to lower the dumbbell behind your head. Extend back up.",
    "tips": "Keep your core tight — it's easy to arch your back under a heavy load. This is the safest tricep movement for beginners.",
    "defaultWeights": [
      6.5,
      9,
      12,
      12
    ]
  },
  "db-overhead-press": {
    "name": "DB overhead press",
    "muscles": "Shoulders (anterior and medial deltoids), triceps, upper chest",
    "desc": "Hold dumbbells at shoulder height, palms facing forward. Press directly overhead until arms are fully extended, then lower with control back to shoulder height.",
    "tips": "Go light to start — shoulder pressing is one of the most common beginner injury points. Avoid flaring your elbows excessively outward.",
    "defaultWeights": [
      8,
      10,
      12.5,
      12.5
    ]
  },
  "db-front-raise": {
    "name": "DB front raise",
    "muscles": "Front (anterior) deltoids, upper chest",
    "desc": "Stand with dumbbells in front of your thighs. With a slight elbow bend, raise both arms in front of you to shoulder height. Lower slowly.",
    "tips": "Don't swing the weight up. Use a weight light enough that you can feel the front of your shoulders working, not your traps.",
    "defaultWeights": [
      4.5,
      6,
      8,
      8
    ]
  },
  "db-shrug": {
    "name": "DB shrug",
    "muscles": "Upper trapezius, neck",
    "desc": "Stand holding dumbbells at your sides. Shrug your shoulders straight up toward your ears as high as possible, hold for a second, then lower slowly. No rolling — straight up and down.",
    "tips": "Don't roll your shoulders. The movement is purely vertical. Hold at the top for a full second to get the most out of it.",
    "defaultWeights": [
      13.5,
      16.5,
      21.5,
      21.5
    ]
  },
  "hammer-curl": {
    "name": "Hammer curl",
    "muscles": "Biceps, brachialis, brachioradialis (forearm)",
    "desc": "Like a regular curl, but your palms face each other throughout (neutral grip — like holding a hammer). Curl up, lower slowly. This hits the brachialis muscle under the bicep, which pushes the bicep up.",
    "tips": "Keep your elbows still at your sides. The neutral grip is easier on the wrists than supinated curls.",
    "defaultWeights": [
      9,
      10.5,
      12.5,
      12.5
    ]
  },
  "db-sumo-squat": {
    "name": "DB sumo squat",
    "muscles": "Quads, glutes, inner thighs (adductors)",
    "desc": "Stand with feet wider than shoulder-width, toes pointed out at 45°. Hold one dumbbell vertically between your legs with both hands. Squat down, keeping your knees tracking over your toes, then drive up.",
    "tips": "The wide stance shifts more emphasis to the inner thighs and glutes. Keep your chest up and don't let your knees cave inward.",
    "defaultWeights": [
      24,
      24,
      24,
      24
    ]
  },
  "db-bulgarian-split-squat": {
    "name": "DB Bulgarian split squat",
    "muscles": "Quads, glutes, hamstrings, core (stabilisation)",
    "desc": "Stand a metre in front of a chair or sofa. Place your rear foot on it, laces down. Hold dumbbells at your sides. Lower your body straight down until your front thigh is parallel to the floor, then drive through your front heel to return.",
    "tips": "Go much lighter than you think for the first few sessions — these are brutally effective. Your front knee should stay roughly above your ankle. If you feel it in your back knee, step your front foot further forward.",
    "defaultWeights": [
      12.5,
      15.5,
      20.5,
      20.5
    ]
  },
  "db-calf-raise": {
    "name": "DB calf raise",
    "muscles": "Calves (gastrocnemius, soleus)",
    "desc": "Stand holding dumbbells at your sides. Rise up onto the balls of both feet as high as possible. Hold for a moment at the top, then lower slowly.",
    "tips": "Do these slowly — calves respond well to time under tension. A slight pause at the bottom (full stretch) and top (full contraction) makes a big difference.",
    "defaultWeights": [
      16,
      16,
      16,
      16
    ]
  },
  "standing-db-curl": {
    "name": "Standing DB curl",
    "muscles": "Biceps, brachialis",
    "desc": "Same as the DB curl but explicitly done standing. Hold dumbbells at sides, palms forward, curl up together. Lower fully between reps to get the full stretch.",
    "tips": "Full range of motion matters here. Don't stop the rep short at the bottom.",
    "defaultWeights": [
      8,
      9.5,
      11.5,
      11.5
    ]
  },
  "concentration-curl": {
    "name": "Concentration curl",
    "muscles": "Biceps (peak contraction focus)",
    "desc": "Sit on a chair or floor with your legs apart. Rest the back of your upper arm against the inside of your thigh for support. Curl the dumbbell up toward your shoulder, squeeze at the top, lower slowly. One arm at a time.",
    "tips": "The braced position isolates the bicep and removes cheating. Go lighter than a standing curl — you'll feel it more.",
    "defaultWeights": [
      8,
      9.5,
      11.5,
      11.5
    ]
  },
  "db-glute-bridge": {
    "name": "DB single-leg glute bridge",
    "muscles": "Glutes (maximus), hamstrings, lower back, core (stabilisation)",
    "desc": "Lie on your back, knees bent, feet flat. Place a dumbbell across your hips and hold it in place. Extend one leg straight out, then drive through the heel of the planted foot to lift your hips until your body forms a straight line from the planted knee to your shoulders. Squeeze hard at the top, lower slowly. Complete all reps, then switch legs.",
    "tips": "Keep your hips level — don't let the side of the extended leg drop. Working one leg at a time makes this much harder, so the dumbbell is lighter than a two-leg bridge.",
    "defaultWeights": [
      13.5,
      19.5,
      25.5,
      25.5
    ]
  },
  "db-goblet-squat": {
    "name": "DB goblet squat",
    "muscles": "Quads, glutes, core",
    "desc": "Same as the goblet squat. Hold one dumbbell vertically at chest height with both hands. Squat down keeping the dumbbell close, elbows inside knees. Drive through heels to stand.",
    "tips": "If you feel it more in your back than your legs, you're leaning too far forward. Keep the chest up.",
    "defaultWeights": [
      20.5,
      24.5,
      30.5,
      30.5
    ]
  },
  "db-close-grip-floor-press": {
    "name": "DB close-grip floor press",
    "muscles": "Triceps, inner chest",
    "desc": "Same position as the floor press but with elbows tucked close to your body throughout. Hold dumbbells closer together. This shifts the load from chest to triceps.",
    "tips": "Keep elbows within about 15° of your torso. The movement is shorter range than the standard floor press.",
    "defaultWeights": [
      11.5,
      14,
      17,
      17
    ]
  },
  "tricep-kickback": {
    "name": "Tricep kickback",
    "muscles": "Triceps",
    "desc": "Hinge forward to roughly 45°. Pin your upper arm against your side parallel to the floor. Extend the dumbbell straight back until your arm is fully extended. Lower slowly — don't let your elbow drop.",
    "tips": "Keep your upper arm completely still. Only the forearm moves. Going too heavy will break this form immediately.",
    "defaultWeights": [
      6.5,
      8,
      10,
      10
    ]
  },
  "db-reverse-lunge": {
    "name": "DB reverse lunge",
    "muscles": "Quads, glutes, hamstrings, balance",
    "desc": "Stand holding dumbbells at sides. Step one foot back and lower your back knee toward the floor. Front thigh should reach parallel. Drive through the front heel to return to standing. Alternate legs.",
    "tips": "Stepping back (vs forward) is easier on the knees. Keep your torso upright throughout.",
    "defaultWeights": [
      13.5,
      16,
      19,
      19
    ]
  },
  "db-single-arm-row": {
    "name": "DB single-arm row",
    "muscles": "Lats, rhomboids, rear shoulders, biceps",
    "desc": "Place one hand and the same-side knee on a sturdy surface for support. Hold a dumbbell in the other hand, hanging straight down. Row the dumbbell toward your hip — not your shoulder — keeping the elbow close to your body.",
    "tips": "Think 'elbow to hip', not 'hand to armpit'. Driving the elbow back engages the lats more than pulling up.",
    "defaultWeights": [
      16.5,
      19.5,
      24.5,
      24.5
    ]
  },
  "db-renegade-row": {
    "name": "DB renegade row",
    "muscles": "Lats, core (anti-rotation), shoulders, triceps",
    "desc": "Start in a high plank position with both hands gripping dumbbells on the floor, shoulder-width apart. Keeping your hips level, row one dumbbell to your hip while the other arm supports your weight. Lower, repeat other side.",
    "tips": "Widen your feet for more stability. Go much lighter than your normal row — your core is doing half the work. If your hips rotate, you need a lighter weight.",
    "defaultWeights": [
      13.5,
      16,
      19,
      19
    ]
  },
  "db-reverse-curl": {
    "name": "DB reverse curl",
    "muscles": "Brachioradialis, forearm extensors, brachialis",
    "desc": "Hold dumbbells with palms facing down. Curl up toward shoulders, keeping the pronated grip throughout. Lower slowly.",
    "tips": "Much lighter than a normal curl. These build serious forearm strength over time.",
    "defaultWeights": [
      5.5,
      7,
      9,
      9
    ]
  },
  "db-arnold-press": {
    "name": "DB Arnold press",
    "muscles": "All three deltoid heads, triceps",
    "desc": "Start with dumbbells at shoulder height, palms facing you. As you press overhead, rotate your palms outward so they face forward at the top. Reverse the rotation on the way down.",
    "tips": "Named after Arnold Schwarzenegger. The rotation hits all three heads of the deltoid. Keep the movement fluid, not jerky.",
    "defaultWeights": [
      8,
      10,
      12.5,
      12.5
    ]
  },
  "diamond-push-up": {
    "name": "Diamond push-up",
    "muscles": "Triceps, inner chest",
    "desc": "Place hands on the floor in a diamond shape (thumbs and index fingers touching) under your chest. Lower your chest to your hands, keeping elbows tucked. Push back up.",
    "tips": "No weight needed. If this is too hard at first, do them from your knees. These get surprisingly difficult by Phase 4.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "db-upright-row": {
    "name": "DB upright row",
    "muscles": "Upper traps, medial deltoids, biceps",
    "desc": "Hold dumbbells in front of your thighs, palms facing you. Pull the dumbbells straight up to chin height, leading with your elbows which should be higher than your wrists throughout. Lower slowly.",
    "tips": "Don't go too heavy — the elbows-above-wrists position can stress the shoulder joint. Keep the dumbbells close to your body.",
    "defaultWeights": [
      9.5,
      12,
      15,
      15
    ]
  },
  "db-split-squat": {
    "name": "DB split squat",
    "muscles": "Quads, glutes, hamstrings",
    "desc": "Stand in a split stance — one foot forward, one back — with dumbbells at your sides. Lower your back knee toward the floor (it stays stationary, no stepping). Drive up through both feet to return.",
    "tips": "This is a stationary lunge. Easier to balance than a Bulgarian split squat because your rear foot stays on the floor.",
    "defaultWeights": [
      12.5,
      15.5,
      20.5,
      20.5
    ]
  },
  "db-sumo-deadlift": {
    "name": "DB sumo deadlift",
    "muscles": "Glutes, inner thighs, hamstrings, lower back",
    "desc": "Wide stance, toes out, one dumbbell held vertically between your legs. Hinge at hips and bend knees to lower the dumbbell, keeping your back flat. Drive hips forward and stand tall.",
    "tips": "Let the dumbbells path be straight down. Don't let your chest collapse forward at the bottom.",
    "defaultWeights": [
      27,
      31,
      37,
      37
    ]
  },
  "db-step-up": {
    "name": "DB step-up",
    "muscles": "Quads, glutes, calves",
    "desc": "Hold dumbbells at sides. Place one foot fully on a step or sturdy box. Drive through that heel to step up, bringing the other foot up beside it. Step back down, same foot leading. Complete all reps on one side then switch.",
    "tips": "Drive through the heel of the raised foot, not the toes. The higher the step, the more glute involvement.",
    "defaultWeights": [
      16.5,
      19.5,
      22.5,
      22.5
    ]
  },
  "db-calf-raise-single-leg": {
    "name": "DB calf raise — single leg",
    "muscles": "Calves (gastrocnemius, soleus)",
    "desc": "Hold one dumbbell in the corresponding hand. Balance on one foot. Rise onto the ball of your foot as high as possible, hold, lower. Complete all reps then switch.",
    "tips": "Single-leg calf raises are dramatically harder than both-leg. Start light and hold something for balance if needed.",
    "defaultWeights": [
      16.5,
      20.5,
      24.5,
      24.5
    ]
  },
  "renegade-row": {
    "name": "Renegade row",
    "muscles": "Lats, core, shoulders, triceps",
    "desc": "High plank on dumbbells. Row one dumbbell to your hip while balancing on the other arm. Hips stay level throughout. Lower and repeat the other side.",
    "tips": "By Phase 4, you should be able to do these with heavier weight than Phase 2. Still prioritise non-rotation over weight.",
    "defaultWeights": [
      13.5,
      16,
      19,
      19
    ]
  },
  "db-hammer-curl-tempo": {
    "name": "DB hammer curl (tempo)",
    "muscles": "Biceps, brachialis, forearm",
    "desc": "Neutral grip (palms facing each other). Curl up in 1 second, lower in 3 seconds with a 1-second pause at the bottom. The tempo dramatically increases the difficulty without needing more weight.",
    "tips": "The 3-second lowering phase is the work. Don't rush it. Full extension at the bottom on every rep.",
    "defaultWeights": [
      9,
      10.5,
      12.5,
      12.5
    ]
  },
  "db-floor-press-tempo": {
    "name": "DB floor press (tempo)",
    "muscles": "Chest, triceps, front shoulders",
    "desc": "Standard floor press but with 3-second lowering. Press up in 1 second, lower in 3 seconds, 1-second pause when arms touch the floor. The floor still acts as the range stop.",
    "tips": "You'll need to go lighter than your standard floor press — the tempo makes it significantly harder.",
    "defaultWeights": [
      11.5,
      14,
      17,
      17
    ]
  },
  "db-overhead-press-tempo": {
    "name": "DB overhead press (tempo)",
    "muscles": "Shoulders, triceps, upper chest",
    "desc": "Standard overhead press with 3-second lowering phase. Press up in 1 second, lower in 3. Feel the shoulder control throughout the full range.",
    "tips": "The slow lowering exposes any shoulder instability. If it feels unstable, drop the weight.",
    "defaultWeights": [
      8,
      10,
      12.5,
      12.5
    ]
  },
  "db-lateral-raise-tempo": {
    "name": "DB lateral raise (tempo)",
    "muscles": "Side (medial) deltoids",
    "desc": "Raise arms to shoulder height in 1 second. Lower in 3 seconds. This turns what was previously a lighter accessory movement into a serious shoulder burner.",
    "tips": "You'll need even lighter weight than the standard lateral raise. The 3-second lower is very hard on the side delts.",
    "defaultWeights": [
      4.5,
      6,
      8,
      8
    ]
  },
  "db-reverse-lunge-tempo": {
    "name": "DB reverse lunge (tempo)",
    "muscles": "Quads, glutes, hamstrings",
    "desc": "Step back and lower over 3 seconds. Pause briefly at the bottom. Drive up in 1 second. The slow eccentric phase crushes the quads.",
    "tips": "This will make your quads extremely sore the next day if it's new to you. Start lighter than your standard reverse lunge.",
    "defaultWeights": [
      13.5,
      16,
      19,
      19
    ]
  },
  "db-bulgarian-split-squat-tempo": {
    "name": "DB Bulgarian split squat (tempo)",
    "muscles": "Quads, glutes, hamstrings, core",
    "desc": "Rear foot elevated, front foot stepped forward. Lower in 3 seconds, pause at the bottom, drive up in 1 second. This is one of the hardest exercises in the programme.",
    "tips": "You will need significantly less weight than your standard Bulgarian split squat. The 3-second lower is brutal. This is a normal feeling.",
    "defaultWeights": [
      12.5,
      15.5,
      20.5,
      20.5
    ]
  },
  "db-sumo-deadlift-tempo": {
    "name": "DB sumo deadlift (tempo)",
    "muscles": "Glutes, inner thighs, hamstrings, lower back",
    "desc": "Wide stance, dumbbell between legs. Lower in 3 seconds. Pause at the bottom. Drive up in 1 second. Slow lowering maximises hamstring stretch.",
    "tips": "Keep your back flat throughout — the slow tempo means your muscles are under load for longer, so form matters even more.",
    "defaultWeights": [
      27,
      31,
      37,
      37
    ]
  },
  "db-bent-over-row-tempo": {
    "name": "DB bent-over row (tempo)",
    "muscles": "Upper back, rear shoulders, biceps",
    "desc": "Hinge forward, back flat. Row toward your hips in 1 second. Lower in 3 seconds with full arm extension at the bottom.",
    "tips": "The slow lowering works the back in a lengthened position, which is one of the most effective ways to build muscle.",
    "defaultWeights": [
      13.5,
      16,
      19,
      19
    ]
  },
  "single-arm-row-tempo": {
    "name": "Single-arm row (tempo)",
    "muscles": "Lats, rhomboids, rear shoulders",
    "desc": "Supported on a bench or chair with one hand and knee. Row in 1 second. Lower in 3 seconds. Full arm extension at the bottom on every rep.",
    "tips": "Don't rush the lowering. Full extension at the bottom is where most people cheat — resist it.",
    "defaultWeights": [
      16.5,
      19.5,
      24.5,
      24.5
    ]
  },
  "db-shrug-tempo": {
    "name": "DB shrug (tempo)",
    "muscles": "Upper trapezius",
    "desc": "Hold dumbbells at sides. Shrug straight up in 1 second. Hold for 2 seconds at the top. Lower in 3 seconds. The extended hold makes this dramatically more effective.",
    "tips": "Keep the movement pure vertical. The 2-second hold at the top is the key addition in Phase 4.",
    "defaultWeights": [
      13.5,
      16.5,
      21.5,
      21.5
    ]
  },
  "db-curl-tempo": {
    "name": "DB curl (tempo)",
    "muscles": "Biceps, brachialis",
    "desc": "Standard curl with 3-second lowering. Curl up in 1 second, lower in 3 seconds, full extension at the bottom. The slow negative is where bicep growth really happens.",
    "tips": "Lower all the way to full arm extension on each rep. Don't stop halfway down.",
    "defaultWeights": [
      8,
      9.5,
      11.5,
      11.5
    ]
  },
  "db-romanian-deadlift-tempo": {
    "name": "DB Romanian deadlift (tempo)",
    "muscles": "Hamstrings, glutes, lower back",
    "desc": "Standard RDL with 3-second lowering phase. Hinge slowly, feeling the hamstring stretch build over 3 seconds. Pause at the bottom. Drive up in 1 second.",
    "tips": "The tempo RDL is exceptional for hamstring development. Keep the dumbbells dragging close to your legs throughout.",
    "defaultWeights": [
      18,
      22,
      26,
      26
    ]
  },
  "db-woodchop": {
    "name": "DB woodchop",
    "muscles": "Obliques, core, shoulders",
    "desc": "Hold one dumbbell with both hands. Start high on one side and chop diagonally downward to the opposite hip, rotating through your core. Control the return. Complete all reps then switch direction.",
    "tips": "The rotation comes from your core, not your arms. Keep your arms relatively straight.",
    "defaultWeights": [
      6,
      8,
      12,
      12
    ]
  },
  "db-half-kneeling-woodchop": {
    "name": "DB half-kneeling woodchop",
    "muscles": "Obliques, core, shoulders",
    "desc": "Kneel on one knee with the other foot planted out to the side, hips square and ribs down. Hold one dumbbell with both hands. Start high above the shoulder on the side of the planted foot and chop diagonally down across your body toward the opposite hip, rotating through your core. Control the return. Complete all reps, then switch sides.",
    "tips": "Half-kneeling takes your legs out of it, so the rotation has to come from your core — that's the point, and it's why you need less weight than the standing version. Keep the down knee, hip and shoulder stacked; if your hips shift or your lower back arches, go lighter.",
    "defaultWeights": [
      5,
      6,
      8,
      8
    ]
  },
  "banded-pallof-press": {
    "name": "Banded Pallof press",
    "muscles": "Obliques, core (anti-rotation), shoulders",
    "desc": "Anchor a resistance band at chest height. Kneel side-on to the anchor on the knee nearest it, other foot planted, and hold the band at your sternum with both hands. Press it straight out until your arms are locked, hold for 2 sec resisting the band's pull to rotate you, then bring it back to your chest. Complete all reps, then switch sides.",
    "tips": "Nothing moves except your arms — the work is refusing to twist. Step further from the anchor to make it harder. Use a band with roughly 5kg of resistance at full extension.",
    "defaultWeights": [
      5,
      5,
      5,
      5
    ]
  },
  "db-half-kneeling-side-bend": {
    "name": "DB half-kneeling side bend",
    "muscles": "Obliques, quadratus lumborum, core",
    "desc": "Kneel on one knee with the other foot planted out to the side. Hold a dumbbell in the hand on the same side as the down knee, hanging at your side. Bend sideways toward the dumbbell as far as is comfortable, then pull yourself back upright using the obliques on the opposite side. Complete all reps, then switch sides.",
    "tips": "Bend straight sideways — don't let your torso rotate or lean forward. The upward pull is the working half of the rep, so control it rather than swinging back up.",
    "defaultWeights": [
      8,
      10,
      12,
      12
    ]
  },
  "db-woodchop-heavy": {
    "name": "DB woodchop (heavy)",
    "muscles": "Obliques, core, shoulders",
    "desc": "Same as Phase 3 woodchop but heavier. Do both high-to-low and low-to-high directions for complete oblique coverage.",
    "tips": "Heavier weight requires more control. Don't let momentum take over.",
    "defaultWeights": [
      8,
      10,
      14,
      14
    ]
  },
  "db-suitcase-carry": {
    "name": "DB suitcase carry",
    "muscles": "Core (lateral stabilisation), obliques, traps, forearms",
    "desc": "Hold one heavy dumbbell at your side, as if carrying a suitcase. Walk in a straight line keeping your shoulders perfectly level — don't lean toward or away from the weight. Complete steps on one side then switch.",
    "tips": "The challenge is staying upright against the weight trying to tip you sideways. This is one of the best core exercises in existence.",
    "defaultWeights": [
      17,
      20,
      25,
      25
    ]
  },
  "db-windmill": {
    "name": "DB windmill",
    "muscles": "Obliques, shoulders (stability), hamstrings, glutes",
    "desc": "Hold one dumbbell overhead in your right hand, arm locked out. Feet wide, toes at 45°. Hinge sideways, pushing your right hip out, reaching your left hand down toward your left foot — keeping your eyes on the dumbbell. Return to standing.",
    "tips": "Keep the overhead arm locked. This is a stability and flexibility movement as much as a strength one. Go very light.",
    "defaultWeights": [
      5.5,
      7,
      10,
      10
    ]
  },
  "db-ab-rollout-floor": {
    "name": "DB ab rollout (floor)",
    "muscles": "Core (entire), lats, shoulders",
    "desc": "Kneel on the floor. Hold a dumbbell horizontally and place it on the floor in front of you. Roll it slowly forward as your body extends, keeping your core braced. Roll back in before your hips touch the floor.",
    "tips": "This is very hard. Keep your core braced the entire time. If you can't control the return, you've gone too far.",
    "defaultWeights": [
      6.5,
      8,
      10,
      10
    ]
  },
  "db-russian-twist": {
    "name": "DB Russian twist",
    "muscles": "Obliques, rectus abdominis, hip flexors",
    "desc": "Sit on the floor with knees bent. Lean back to about 45°. Hold one dumbbell with both hands and rotate side to side, touching the dumbbell to the floor each time. In Phase 3, raise your feet off the floor.",
    "tips": "The rotation comes from your torso, not just your arms. Keep your lower back from rounding.",
    "defaultWeights": [
      4.5,
      6,
      8,
      8
    ]
  },
  "v-up": {
    "name": "V-up",
    "muscles": "Rectus abdominis, hip flexors",
    "desc": "Lie flat on your back, arms stretched overhead. Simultaneously raise your straight legs and your upper body, reaching your hands toward your feet to form a V shape. Lower back down with control.",
    "tips": "Keep your legs straight. If this is too hard, bend your knees slightly. The lowering phase is where the abs work hardest.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "v-up-with-db-pass": {
    "name": "V-up with DB pass",
    "muscles": "Rectus abdominis, hip flexors, coordination",
    "desc": "Same as a V-up but hold a dumbbell in your hands. At the top of the V, pass the dumbbell to your feet (grip it between your feet). Lower down. On the next rep, pass it back to your hands at the top.",
    "tips": "Use a very light dumbbell — the coordination element makes this deceptively hard.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "plank-hold": {
    "name": "Plank hold",
    "muscles": "Core (entire), shoulders, glutes",
    "desc": "Forearms on the floor, elbows under shoulders. Body in a straight line from head to heel. Squeeze your abs, glutes, and quads simultaneously. Hold.",
    "tips": "Don't let your hips sag or pike up. If your form breaks before the time is up, rest and try again.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "db-crunch": {
    "name": "DB crunch",
    "muscles": "Rectus abdominis (upper)",
    "desc": "Lie on your back, knees bent. Hold a dumbbell on your chest with both hands. Crunch your shoulders off the floor — not a full sit-up, just shoulder blades clearing the ground. Lower slowly.",
    "tips": "Don't pull your neck. The movement is small — it's a crunch, not a sit-up. Exhale as you come up.",
    "defaultWeights": [
      5.5,
      7,
      10,
      10
    ]
  },
  "leg-raise": {
    "name": "Leg raise",
    "muscles": "Lower abs, hip flexors",
    "desc": "Lie flat on your back, hands under your glutes for support. Keep legs straight and raise them to 90°. Lower slowly until they almost touch the floor. The key is keeping your lower back pressed down the whole time.",
    "tips": "If your lower back arches as you lower, you're going too far down. Only lower as far as you can control.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "bird-dog": {
    "name": "Bird dog",
    "muscles": "Core, lower back, glutes (stability)",
    "desc": "Start on all fours, hands under shoulders, knees under hips. Extend your right arm forward and left leg back simultaneously, keeping your back completely flat. Hold 2 seconds. Return and switch sides.",
    "tips": "Don't let your hips rotate or your back arch. Imagine balancing a glass of water on your lower back.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "heel-tap": {
    "name": "Heel tap",
    "muscles": "Obliques, transverse abdominis",
    "desc": "Lie on your back, knees bent, feet flat. Crunch slightly so your shoulders hover off the floor. Reach sideways to tap your right heel, then your left heel, alternating. Keep the crunch position throughout.",
    "tips": "The crunch position should be maintained the entire set — don't relax your abs between taps.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "plank-to-push-up": {
    "name": "Plank to push-up",
    "muscles": "Core, chest, triceps, shoulders",
    "desc": "Start in a forearm plank. Push up to a high plank by placing one hand then the other on the floor. Then lower back down to forearms, one arm at a time. Alternate which arm leads.",
    "tips": "Keep your hips as still as possible throughout. This transitions between anti-rotation core work and push movement.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "side-plank": {
    "name": "Side plank",
    "muscles": "Obliques, glutes (medius), core",
    "desc": "Lie on your side, forearm on the floor, elbow under shoulder. Raise your hips off the floor until your body is in a straight line. Hold. Switch sides.",
    "tips": "Stack your feet or stagger them for balance. Don't let your hips drop or rotate forward.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "clamshell": {
    "name": "Clamshell",
    "muscles": "Glutes (medius), hip abductors",
    "desc": "Loop a resistance band around your thighs, just above the knees. Lie on your side with knees bent ~45°, hips stacked, feet together. Keeping your feet touching, raise your top knee toward the ceiling against the band's resistance, then lower with control. Complete all reps, then switch sides.",
    "tips": "Use as a warm-up before leg day to activate the glutes. Keep your hips stacked and don't let your torso roll backward as the knee lifts. Use a band with roughly 5kg of resistance at the top of the movement.",
    "defaultWeights": [
      5,
      5,
      5,
      5
    ]
  },
  "lateral-leg-raise": {
    "name": "Lateral leg raise",
    "muscles": "Glutes (medius), hip abductors",
    "desc": "Lie on your side, legs stacked and straight, head resting on your lower arm. Raise your top leg straight up toward the ceiling, keeping it in line with your body, then lower with control. Complete all reps, then switch sides.",
    "tips": "Use as a warm-up before leg day to activate the glutes. Keep your hips stacked and don't let the leg drift forward — lift straight up.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "mountain-climber": {
    "name": "Mountain climber",
    "muscles": "Core, hip flexors, shoulders (stability)",
    "desc": "Start in a high plank. Drive one knee toward your chest, then quickly switch, alternating legs at a controlled pace. Keep your hips level — don't let them rise.",
    "tips": "Slow mountain climbers are a core exercise. Fast ones become more cardio. In this programme, keep them controlled.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "hollow-body-hold": {
    "name": "Hollow body hold",
    "muscles": "Deep core (transverse abdominis), rectus abdominis",
    "desc": "Lie flat, arms stretched overhead. Press your entire lower back into the floor. Raise your shoulders and legs slightly — just a few inches. Hold this position, maintaining the lower back contact with the floor.",
    "tips": "The key is keeping your lower back on the floor. If it lifts, raise your legs higher until you can maintain it. This is harder than it looks.",
    "defaultWeights": [
      0,
      0,
      0,
      0
    ]
  },
  "plank-db-drag": {
    "name": "Plank DB drag",
    "muscles": "Core (anti-rotation), shoulders, chest",
    "desc": "High plank position. Place a dumbbell to the outside of your left hand. Reach across with your right hand and drag the dumbbell to the right side. Alternate sides.",
    "tips": "Fight against your hips rotating as you drag. The wider your feet, the more stable you'll be.",
    "defaultWeights": [
      4.5,
      6,
      8,
      8
    ]
  },
  "db-rear-delt-fly": {
    "name": "DB rear delt fly",
    "muscles": "Rear (posterior) deltoids, rhomboids, mid traps",
    "desc": "Hinge forward at the hips with a flat back. Hold dumbbells hanging straight down with palms facing each other. With a slight bend in the elbow, raise both arms out to the sides until parallel to the floor. Squeeze shoulder blades together at the top. Lower slowly.",
    "tips": "Go very light — these are easy to swing if too heavy. Imagine you're pouring water out of two jugs as you raise. Lead with the elbows, not the hands.",
    "defaultWeights": [
      0,
      4,
      6.5,
      6.5
    ]
  },
  "db-face-pull-floor": {
    "name": "DB face pull (floor)",
    "muscles": "Rear deltoids, external rotators, upper back",
    "desc": "Lie face down on the floor. Hold light dumbbells with elbows wide. Pull the dumbbells toward your face as if doing a face pull on a cable machine — elbows stay higher than the dumbbells. Squeeze the rear delts at the top.",
    "tips": "This is a corrective exercise as much as a strength one — it helps counteract all the forward-pressing movements. Go very light.",
    "defaultWeights": [
      0,
      4,
      6.5,
      6.5
    ]
  }
} as const satisfies Record<string, Exercise>;
