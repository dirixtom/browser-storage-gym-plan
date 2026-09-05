# Kilo — 1 Year Training Plan (simple version)

A personal training plan: a 1-year, 3-sessions-per-week dumbbell/kettlebell
programme (floor + two dumbbells, no bench), split into four progressive phases.

This repo holds the **simple version**: a static page with no dependencies and
no build step. Edit the files and reload.

The richer app version (Astro + React frontend, optional Fastify + Postgres
sync backend, Playwright e2e tests) lives in a separate repo,
[`dirixtom/gym-plan-app`](https://github.com/dirixtom/gym-plan-app). The two
share no code: exercise and workout changes have to be made in both by hand.

## Layout

```
index.html              markup only — the workout rows for all four phases
assets/css/styles.css   every style rule
assets/js/              behaviour, one plain script per concern:
  ui-state.js             scroll position shared between the overlays
  data.js                 loads exercises.json; category grouping
  storage.js              saved weights in localStorage
  phases.js               phase tabs and drawer
  guide.js                training guide panel
  modal.js                per-exercise slide-out
  fullscreen.js           "tap to train" view
  library.js              searchable exercise library
  app.js                  bootstrap, loaded last
data/exercises.json     the exercise catalogue (description, tips, weights)
```

The scripts are plain (non-module) scripts loaded in dependency order at the
end of `index.html`, so the functions the markup calls from `onclick` handlers
stay global. `images/` lives on the server only — the deploy never deletes it.

## Development

The page fetches `data/exercises.json`, which a browser blocks over `file://`.
Serve the folder instead:

```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```

Opening `index.html` directly still renders the plan, but exercise details, the
library and the fullscreen view come up empty and the page says so.

Adding an exercise means two edits: a hand-written
`<li class="exercise-item" data-exercise="<slug>" data-phase="<n>">` row in
`index.html`, and a matching entry under the same slug in
`data/exercises.json`.

## Deployment

Any push to `main` that touches a site file deploys the whole site over
SSH/rsync (`.github/workflows/deploy-ssh.yml`); docs and CI config are ignored.
The workflow can also be triggered manually.

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
