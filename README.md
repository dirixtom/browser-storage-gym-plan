# Kilo — 1 Year Training Plan

A personal training-plan app: a 1-year, 3-sessions-per-week dumbbell programme
(floor + two dumbbells, no bench), split into four progressive phases.

Built with [Astro](https://astro.build) + React islands, [TanStack Query](https://tanstack.com/query),
[Tailwind CSS v4](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com)-style components.

## Layout

- `web/` — the frontend app (Astro, static output)
- `server/` — optional sync backend (Fastify + Postgres + GitHub OAuth); see `server/README.md`

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

Other scripts: `npm run check` (types), `npm test` (storage wire-format tests),
`npm run preview`.

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
