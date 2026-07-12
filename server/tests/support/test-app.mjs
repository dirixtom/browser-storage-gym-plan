// Shared test fixtures: a real (ephemeral) Postgres pool + dummy OAuth config.
//
// DATABASE_URL must point at a scratch database with schema.sql already
// applied — see server/README.md for the docker/local setup. Never point
// this at a real database; resetDb() truncates every table.

import pg from 'pg';

export function testConfig(overrides = {}) {
  return {
    GITHUB_CLIENT_ID: 'test-client-id',
    GITHUB_CLIENT_SECRET: 'test-client-secret',
    ALLOWED_GITHUB_ID: '424242',
    SESSION_SECRET: 'test-session-secret-not-for-production-use-only',
    PUBLIC_ORIGIN: 'http://localhost:8787',
    ...overrides,
  };
}

export function makePool() {
  const connectionString =
    process.env.TEST_DATABASE_URL || 'postgres://postgres:test@127.0.0.1:5432/kilo_test';
  return new pg.Pool({ connectionString });
}

export async function resetDb(pool) {
  await pool.query('TRUNCATE session, kv_item, app_user RESTART IDENTITY CASCADE');
}
