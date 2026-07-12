# e2e

Playwright tests against a real Chromium, the real Fastify server (`../server/`), and a
real disposable Postgres — the layer above `server/`'s `node --test` suite and `web/`'s
Vitest/`node --test` suites, which don't exercise the full stack together.

GitHub OAuth itself is never driven through a real browser (it needs a live github.com
round-trip against one specific allowed account). Instead, `tests/support/session.ts`
seeds a session row directly in Postgres and hands the browser the same signed `sid`
cookie the real `/auth/github/callback` route would have set — see that file for how the
signature is reproduced with `@fastify/cookie`'s `Signer`.

## Running

```bash
npm install
createdb kilo_e2e && psql -d kilo_e2e -f ../server/schema.sql   # or the Docker recipe in server/README.md
E2E_DATABASE_URL="postgres://<user>@127.0.0.1:5432/kilo_e2e" npx playwright test
```

`playwright.config.ts`'s `webServer` builds `web/` and starts `server/` for you, pointed
at `E2E_DATABASE_URL` (defaults to `postgres://postgres:test@127.0.0.1:5432/kilo_e2e`).
Every spec resets the database in `beforeEach`/`beforeAll` — never point this at a real
database.

If your Playwright-managed browser install doesn't match what's on disk (e.g. a sandboxed
environment with a pre-installed, pinned Chromium revision), set
`PLAYWRIGHT_CHROMIUM_PATH` to the binary path instead of running `playwright install`.
