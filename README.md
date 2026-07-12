# Kilo — 1 Year Training Plan

A personal training-plan app: a 1-year, 3-sessions-per-week dumbbell programme
(floor + two dumbbells, no bench), split into four progressive phases.

Built with [Astro](https://astro.build) + React islands, [TanStack Query](https://tanstack.com/query),
[Tailwind CSS v4](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com)-style components.

## Layout

- `web/` — the frontend app (Astro, static output)
- `server/` — optional sync backend (Fastify + Postgres + GitHub OAuth); see `server/README.md`
- `e2e/` — end-to-end tests (Playwright); see `e2e/README.md`

## Development

```bash
cd web
npm install
npm run dev        # http://localhost:4321
```

`astro dev` proxies `/api` and `/auth` to a locally running sync server
(`127.0.0.1:8787`). Without the server, the app runs in local-only mode.

## Build

```bash
cd web
npm run build      # → web/dist/
```

The build is fully static: serve `web/dist/` with the sync server
(`cd server && npm start`) or host it anywhere static (e.g. GitHub Pages —
sync is simply disabled when no backend is reachable).

Other scripts: `npm run check` (types), `npm test` (unit + component tests, see
Testing below), `npm run preview`.

## Testing

Three layers, each covering what the others can't:

- `web/`: `npm test` runs `node --test` over pure logic (the sync/merge logic in
  `lib/sync.ts`, the `localStorage` migrations in `lib/storage.ts`) plus Vitest +
  React Testing Library + jsdom over hooks and components.
- `server/`: `npm test` runs `node --test` against a real, disposable Postgres via
  Fastify's `inject()` — including the `/api/sync` newer-wins upsert as actual SQL.
  See `server/README.md` for the local test-database setup.
- `e2e/`: `npx playwright test` drives a real browser against the real built app,
  the real server, and a real Postgres — weight persistence, phase persistence, and
  cross-device sync convergence. See `e2e/README.md`.

All three run in CI on every pull request (`.github/workflows/test.yml`).

## Usage

- Switch between phases with the tabs at the top.
- Tap any exercise for a description, tips, and an editable weight for each phase.
- Tap a workout card title for a big, hands-free "tap to train" fullscreen view.
- The Library button lists every exercise with search and category filters.

## Weights

Custom weights you enter are saved in the browser's `localStorage` under the same
keys the app has always used, so data from the previous version carries over. They
persist on the same browser/device and are cleared if you clear site data. Exercises
without a saved value fall back to the built-in default for that phase.

Signed in (via the optional backend), weights sync across devices with per-item
timestamps (newer wins).
