# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Kilo is a personal 1-year dumbbell training-plan app. The repo has **three
independent parts** — know which one you're being asked to change:

- `web/` — the actively developed frontend: Astro (static output) + a single
  React "island", TanStack Query, Tailwind v4, shadcn/ui-style components.
  This is where almost all feature work happens.
- `server/` — an optional Fastify + Postgres backend that adds cross-device
  sync (GitHub OAuth, single allowed user) on top of the same localStorage
  data model. The app is fully functional without it (local-only mode).
- `simple/index.html` — a separate, self-contained single-file HTML build of
  the same training plan. It is **not generated from `web/`** and shares no
  code with it — workout/exercise content edits made in `web/src/data/*.ts`
  do not propagate here and vice versa. It auto-deploys via SSH/rsync
  (`.github/workflows/deploy-ssh.yml`) whenever `simple/index.html` changes
  on `main`. If a task is about "the gym plan page" without specifying which,
  check which of `web/` or `simple/index.html` (or both) the user actually
  means before editing.

**Whenever exercises or workouts change, update both `web/` and
`simple/index.html`.** There is no build step keeping them in sync (the old
`extract-data.mjs` migration script is stale and non-functional — see below)
so any addition, removal, or edit to exercise data (`web/src/data/exercises.ts`
and the matching `EXERCISE_DATA` object inside `simple/index.html`'s inline
`<script>`) or workout/phase content (`web/src/data/phases.ts` and the
hand-written `<li class="exercise-item">` rows inside `simple/index.html`)
must be applied to both places by hand. The two files' actual workout
programs have already drifted independently (e.g. their "Legs" days list
different exercises) — don't assume a diff from one transfers verbatim to
the other; port the intent (same exercise, same phase/day, same sets/reps
convention) rather than copy-pasting.

(`e2e/` is a fourth, test-only directory — Playwright tests over the full
`web` + `server` + Postgres stack; see Testing.)

There used to be a root `index.html` ("the legacy app") that was mechanically
extracted into `web/src/data/{exercises,phases}.ts` via
`web/scripts/extract-data.mjs`, then removed. Comments like "ported from the
legacy app" refer to that removed file, not to `simple/index.html`.

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

## Commands

All frontend commands run from `web/`:

```bash
npm install
npm run dev       # astro dev at http://localhost:4321, proxies /api and /auth to 127.0.0.1:8787
npm run build     # -> web/dist/ (static)
npm run check     # astro/type check
npm test          # test:unit (node --test) + test:dom (vitest run)
npm run preview   # serve the production build locally
```

Single test file: `node --import tsx/esm --test tests/unit/sync.test.ts`
(unit) or `npx vitest run tests/dom/PhaseTabs.test.tsx` (dom), from `web/`.

Server commands run from `server/` (needs `web/dist/` built first):

```bash
npm install
npm run init-db   # applies schema.sql to Postgres
npm start         # node --env-file=.env server.js, listens on 127.0.0.1:8787
```

## Testing

- `web/`: `npm test` runs `node --test` (`tests/unit/`, pure logic) + Vitest+RTL+jsdom (`tests/dom/`, hooks/components).
- `server/`: `npm test` = `node --test` via Fastify `inject()`, against a real Postgres (`TEST_DATABASE_URL`) — see `server/README.md`.
- `e2e/`: `npx playwright test` — real browser + real server + real Postgres (`E2E_DATABASE_URL`). Real GitHub OAuth can't run in tests, so a session is seeded in Postgres with a matching signed cookie (`e2e/tests/support/session.ts`). Set `PLAYWRIGHT_CHROMIUM_PATH` if the sandbox's pre-installed browser doesn't match what Playwright expects.
- CI: `.github/workflows/test.yml` runs all three on PRs/push to `main`.

## Architecture

### Frontend (`web/`)

- Astro (`output: 'static'`) mounts one React tree (`src/components/App.tsx`)
  on `src/pages/index.astro`; nearly all interactivity lives inside that tree
  rather than being spread across separate Astro components.
- `astro dev` proxies `/api` and `/auth` to `127.0.0.1:8787` (`astro.config.mjs`)
  so cloud sync works end-to-end in development if the server is running.
- Path alias `@/*` → `src/*` (`tsconfig.json`); shadcn/ui components
  (`components.json`, style `new-york`) live under `src/components/ui/`.
- Content is data-as-code: `src/data/{exercises,phases,categories,library,guide}.ts`
  are hand-maintained TS literals (no CMS/fetch), edited directly now that the
  legacy HTML `extract-data.mjs` was generating from is gone.

### Storage and sync (the most important/subtle part)

- `src/lib/storage.ts` is the localStorage persistence layer and defines the
  **wire format**: keys `kilo_weight_*` (via `storageKey()`, one per
  exercise+phase) and `kilo_last_phase`, each with a `kilo_meta_*` sidecar
  (`{updated_at, deleted}`) used for newer-wins conflict resolution and
  tombstones. **This format is locked** — it's shared verbatim with the
  Postgres `kv_item` table (`server/schema.sql`) and is asserted byte-for-byte
  by `web/tests/unit/storage-keys.test.mjs`. Never change `storageKey()`'s
  transform or the key prefixes; doing so would orphan every existing user's
  data and every synced row.
- `src/lib/sync.ts` holds the newer-wins merge/reconcile logic as plain,
  framework-free functions (kept testable independent of React). It registers
  a queue callback into `storage.ts` (`registerSyncQueue`) rather than
  importing it directly, to avoid a circular import, and debounces pushes by
  800ms while logged in.
- `src/hooks/useSync.ts` (TanStack Query) decides *when* sync runs (on mount,
  on window focus) and toggles push-on-edit via login state.
  `src/hooks/useWeight.ts` is the per-exercise read/write hook, using
  `useSyncExternalStore` over `storage.ts` so every UI instance of a given
  key re-renders on any edit anywhere.
- The app must always work fully offline/local-only. All sync calls fail
  silently (not with errors) when no backend is reachable, e.g. on a static
  host like GitHub Pages.

### Backend (`server/`)

- One module (`server.js`) exporting `buildApp({ pool, config })` — tests
  build the app without a full `.env` or a real `listen()`. Single-user gate:
  only `ALLOWED_GITHUB_ID` (a numeric GitHub id) may log in via GitHub OAuth;
  everyone else gets `403` and nothing is persisted for them.
- Sessions are random ids in a signed, `HttpOnly; Secure` cookie, backed by a
  Postgres `session` table (revocable, expiring).
- `/api/sync`: GET pulls, POST pushes with **newer-wins enforced in SQL**
  (`WHERE EXCLUDED.updated_at > kv_item.updated_at` in the upsert) — the same
  invariant `lib/sync.ts` implements client-side.
- Serves `web/dist/` as the static app so the whole thing runs from one
  HTTPS origin (no CORS, cookie works cleanly); only `DIST_DIR` is exposed,
  never `.env`/`.git`. Route registration order matters: API/auth routes are
  registered before the static handler so they can never be shadowed; the
  404 handler falls back to `index.html` for any unmatched GET outside
  `/api`/`/auth` so client-side routing survives a hard refresh.

## PR workflow

- Once every item that belongs in a PR is actually done, mark the PR ready
  for review (take it out of draft) instead of leaving it in draft
  indefinitely.
- Before marking ready for review, check the changes against the feature
  plan (the task/issue the PR is meant to satisfy) to confirm nothing from
  that plan is missing.
- Never merge a PR unless the user explicitly says to merge it, even after
  marking it ready for review and even if CI is green.
