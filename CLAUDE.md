# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Kilo is a personal 1-year dumbbell/kettlebell training plan. This repo holds
exactly one thing that matters: **`simple/index.html`** — a self-contained,
single-file HTML build of the plan, with inline `<style>` and inline
`<script>`, no dependencies and no build step. Edit it directly; there is
nothing to compile, install, or generate.

### The app version lives in another repo

A richer version of the same plan — an Astro + React frontend, an optional
Fastify + Postgres sync backend, and Playwright e2e tests — lives in
**`dirixtom/gym-plan-app`** (private). It shares no code with this file and is
not generated from it.

**Whenever exercises or workouts change here, the same change has to be made
by hand in that repo** — the `EXERCISE_DATA` object in this file's inline
`<script>` ↔ `web/src/data/exercises.ts` there, and the hand-written
`<li class="exercise-item">` rows ↔ `web/src/data/phases.ts`. There is no
build step or sync tooling between the two repos. The two workout programs
have already drifted independently (e.g. their "Legs" days list different
exercises) — don't assume a diff from one transfers verbatim to the other;
port the intent (same exercise, same phase/day, same sets/reps convention)
rather than copy-pasting. If a task is about "the gym plan page" without
specifying which, check which of the two apps the user actually means before
editing.

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

## Inside `simple/index.html`

The file is one document: inline `<style>` first, then the markup for all
phases, then one inline `<script>` holding the data and all behaviour.

- **Workout rows** are hand-written list items:
  `<li class="exercise-item clickable" data-exercise="<slug>" data-phase="<n>">`
  with spans for the number, the name, a `data-weight-badge` default weight,
  and the sets/reps text. Adding an exercise means writing the row by hand.
- **`EXERCISE_DATA`** (top of the inline `<script>`) holds per-exercise
  description, tips and category, keyed by the same slug as the row's
  `data-exercise`. A row without a matching entry breaks its detail modal and
  the exercise library, so always add both.
- **Weights** live in `localStorage` under `kilo_weight_<slug>_phase<n>` (see
  `storageKey()`), plus `kilo_last_phase` for the selected tab. This key
  format is shared verbatim with the app repo and its Postgres sync table —
  never change the transform or the prefixes; doing so orphans saved data.
- Behaviour beyond that: phase tabs, a per-exercise modal with an editable
  weight, a fullscreen "tap to train" view, and a searchable exercise library
  panel with category chips.

## Testing

There is no test suite and no build step here — check a change by opening
`simple/index.html` in a browser. (The unit, server and e2e suites live in the
app repo.)

## Deployment

`simple/index.html` auto-deploys via SSH/rsync
(`.github/workflows/deploy-ssh.yml`) whenever it changes on `main`: the file is
copied to `deploy/index.html` and rsynced to the server's target directory.
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
