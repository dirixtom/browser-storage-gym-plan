## Testing
- `web/`: `npm test` runs `node --test` (`tests/unit/`, pure logic) + Vitest+RTL+jsdom (`tests/dom/`, hooks/components).
- `server/`: `npm test` = `node --test` via Fastify `inject()`, against a real Postgres (`TEST_DATABASE_URL`) — see `server/README.md`.
- `e2e/`: `npx playwright test` — real browser + real server + real Postgres (`E2E_DATABASE_URL`). Set `PLAYWRIGHT_CHROMIUM_PATH` if the sandbox's pre-installed browser doesn't match what Playwright expects.
- CI: `.github/workflows/test.yml` runs all three on PRs/push to `main`.
