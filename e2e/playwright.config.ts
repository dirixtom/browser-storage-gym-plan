import { defineConfig, devices } from '@playwright/test';

const PORT = 8788; // distinct from the dev server's 8787, so both can run at once
const BASE_URL = `http://127.0.0.1:${PORT}`;

export const E2E_CONFIG = {
  baseURL: BASE_URL,
  databaseUrl: process.env.E2E_DATABASE_URL || 'postgres://postgres:test@127.0.0.1:5432/kilo_e2e',
  githubClientId: 'e2e-client-id',
  githubClientSecret: 'e2e-client-secret',
  allowedGithubId: '424242',
  sessionSecret: 'e2e-session-secret-not-for-production-use-only',
};

export default defineConfig({
  testDir: './tests',
  // Every spec shares one server + one database — no test isolation between
  // parallel workers, so run serially and let each spec clean up after itself.
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    // This sandbox pre-installs a pinned Chromium revision at a fixed path
    // rather than whatever revision the installed @playwright/test expects.
    // Harmless to leave in other environments too: launchOptions.executablePath
    // simply isn't set there.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
  },
  webServer: {
    command: 'npm run build --prefix ../web && node ../server/server.js',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      DATABASE_URL: E2E_CONFIG.databaseUrl,
      GITHUB_CLIENT_ID: E2E_CONFIG.githubClientId,
      GITHUB_CLIENT_SECRET: E2E_CONFIG.githubClientSecret,
      ALLOWED_GITHUB_ID: E2E_CONFIG.allowedGithubId,
      SESSION_SECRET: E2E_CONFIG.sessionSecret,
      PUBLIC_ORIGIN: BASE_URL,
      PORT: String(PORT),
      HOST: '127.0.0.1',
    },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
