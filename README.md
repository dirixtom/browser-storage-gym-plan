# Kilo — 1 Year Training Plan (simple version)

A personal training plan: a 1-year, 3-sessions-per-week dumbbell/kettlebell
programme (floor + two dumbbells, no bench), split into four progressive phases.

This repo holds the **simple version**: `index.html`, one self-contained
HTML file with inline CSS and JavaScript. No dependencies, no build step —
open it in a browser and it works.

The richer app version (Astro + React frontend, optional Fastify + Postgres
sync backend, Playwright e2e tests) lives in a separate private repo,
[`dirixtom/gym-plan-app`](https://github.com/dirixtom/gym-plan-app). The two
share no code: exercise and workout changes have to be made in both by hand.

## Development

```bash
open index.html    # or just double-click it
```

Edit the file directly. Workout rows are hand-written
`<li class="exercise-item">` items; exercise descriptions live in the
`EXERCISE_DATA` object in the inline `<script>`, keyed by the same slug as the
row's `data-exercise`.

## Deployment

Pushing a change to `index.html` on `main` deploys it over SSH/rsync
(`.github/workflows/deploy-ssh.yml`); the workflow can also be triggered
manually.

## Usage

- Switch between phases with the tabs at the top.
- Tap any exercise for a description, tips, and an editable weight for each phase.
- Tap a workout card title for a big, hands-free "tap to train" fullscreen view.
- The Library button lists every exercise with search and category filters.

## Weights

Custom weights you enter are saved in the browser's `localStorage` under
`kilo_weight_*` keys (one per exercise and phase). They persist on the same
browser/device and are cleared if you clear site data. Exercises without a
saved value fall back to the built-in default for that phase. The key format is
shared with the app version, so data carries over between the two.
