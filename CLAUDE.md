# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Kilo is a personal 1-year dumbbell/kettlebell training plan, built as a static
page with no dependencies and no build step. Edit the files directly; there is
nothing to compile, install, or generate.

```
index.html              markup only — the workout rows for all four phases
assets/css/styles.css   every style rule
assets/js/*.js          behaviour, one plain script per concern
data/exercises.json     the exercise catalogue
```

### The app version lives in another repo

A richer version of the same plan — an Astro + React frontend, an optional
Fastify + Postgres sync backend, and Playwright e2e tests — lives in
**`dirixtom/gym-plan-app`** (private). It shares no code with this repo and is
not generated from it.

**Whenever exercises or workouts change here, the same change has to be made
by hand in that repo** — `data/exercises.json` ↔ `web/src/data/exercises.ts`
there, and the hand-written `<li class="exercise-item">` rows in `index.html`
↔ `web/src/data/phases.ts`. There is no build step or sync tooling between the
two repos. The two workout programs have already drifted independently (e.g.
their "Legs" days list different exercises) — don't assume a diff from one
transfers verbatim to the other; port the intent (same exercise, same
phase/day, same sets/reps convention) rather than copy-pasting. If a task is
about "the gym plan page" without specifying which, check which of the two apps
the user actually means before editing.

## Training constraints (the plan's single user)

The plan is written for one person, who has a permanent hand/arm injury.
Respect these whenever you add, swap, or reorder exercises:

- **No push-ups or any open-palm floor position.** The hand cannot be opened
  flat on command. This rules out push-up variants, planks on the hands,
  renegade rows, ab rollouts, mountain climbers, and plank-to-push-up —
  regardless of how well they fit the muscle target. Bodyweight substitutes
  are not a safe default here; prefer a gripped-dumbbell movement instead.
- **Gripping is fine; releasing on command is not.** Anything held in a
  closed fist (dumbbells, a band handle) works normally.
- **Straps/support are used above roughly 20kg per hand.** Grip-limited
  pulls (RDL, shrug, bent-over row) already exceed this in the later phases,
  which is expected — no need to cap the load, just don't design a movement
  whose limiting factor is bare-handed grip endurance.

## Inside the site

- **`index.html`** is markup only — a `<link>` to the stylesheet in the head,
  the phase sections, then the `<script src>` tags at the end of the body.
- **Workout rows** are hand-written list items:
  `<li class="exercise-item clickable" data-exercise="<slug>" data-phase="<n>">`
  with spans for the number, the name, a `data-weight-badge` default weight,
  and the sets/reps text. Adding an exercise means writing the row by hand.
- **`data/exercises.json`** holds per-exercise name, muscles, description, tips
  and per-phase default weights, keyed by the same slug as the row's
  `data-exercise`. A row without a matching entry breaks its detail modal and
  the exercise library, so always add both. Category is derived from the slug
  and muscles by `categorise()` in `assets/js/data.js`, not stored.
- **`assets/js/`** holds one plain (non-module) script per concern, loaded in
  dependency order at the end of the body: `ui-state`, `data`, `storage`,
  `phases`, `guide`, `modal`, `fullscreen`, `library`, `app`. They are not
  modules on purpose — the markup calls these functions from `onclick`
  attributes, so they have to stay global. `app.js` loads last and starts the
  `data/exercises.json` fetch.
- **Weights** live in `localStorage` under `kilo_weight_<slug>_phase<n>` (see
  `storageKey()` in `assets/js/storage.js`), plus `kilo_last_phase` for the
  selected tab. This key format is shared verbatim with the app repo and its
  Postgres sync table — never change the transform or the prefixes; doing so
  orphans saved data.
- **`images/`** exists on the server only (the favicon), not in this repo. The
  deploy runs without `--delete` so it survives; keep it that way.

## Testing

There is no test suite and no build step here — check a change in a browser.
The page fetches `data/exercises.json`, which browsers block over `file://`,
so serve the folder rather than double-clicking the file:

```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```

Opened straight off disk the plan still renders, but exercise details, the
library and the fullscreen view are empty and the page shows a notice saying
so. (The unit, server and e2e suites live in the app repo.)

## Deployment

The site auto-deploys via SSH/rsync (`.github/workflows/deploy-ssh.yml`) on any
push to `main` that touches a site file: the tree is copied into `deploy/`
minus the repo-only files (`README.md`, `CLAUDE.md`, `.claude/`, `.github/`,
`.gitignore`) and rsynced to the server's target directory. New files deploy
automatically — the workflow lists exclusions, not inclusions, so there is
nothing to add when you create one. The `paths-ignore` trigger and the rsync
`--exclude` list have to stay in step.

The workflow can also be run by hand (`workflow_dispatch`). It reads the
`SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USERNAME`, `SSH_PORT` and `SSH_TARGET_DIR`
repository secrets.

## PR workflow

- Once every item that belongs in a PR is actually done, mark the PR ready
  for review (take it out of draft) instead of leaving it in draft
  indefinitely.
- Before marking ready for review, check the changes against the feature
  plan (the task/issue the PR is meant to satisfy) to confirm nothing from
  that plan is missing.
- Never merge a PR unless the user explicitly says to merge it, even after
  marking ready for review and even if CI is green.
