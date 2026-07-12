import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, before, beforeEach, test } from 'node:test';

import { buildApp } from '../server.js';
import { makePool, resetDb, testConfig } from './support/test-app.mjs';

let pool;
let app;
let distDir;
const config = testConfig();
const originalFetch = globalThis.fetch;

before(async () => {
  pool = makePool();
  distDir = await fs.mkdtemp(path.join(os.tmpdir(), 'kilo-dist-'));
  await fs.writeFile(path.join(distDir, 'index.html'), '<!doctype html><title>kilo</title>');
  app = await buildApp({ pool, config, distDir, logger: false });
  await app.ready();
});

after(async () => {
  await app.close();
  await pool.end();
  await fs.rm(distDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await resetDb(pool);
  globalThis.fetch = originalFetch;
});

function cookieHeader(res, name) {
  const c = res.cookies.find((c) => c.name === name);
  return c ? `${c.name}=${c.value}` : null;
}

/** Mock the two GitHub API calls the OAuth callback makes. */
function mockGithub({ githubId, login = 'someone' }) {
  globalThis.fetch = async (url) => {
    if (String(url).includes('github.com/login/oauth/access_token')) {
      return new Response(JSON.stringify({ access_token: 'fake-token' }), { status: 200 });
    }
    if (String(url).includes('api.github.com/user')) {
      return new Response(JSON.stringify({ id: githubId, login }), { status: 200 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
}

/** Full login handshake (mocked GitHub) for the allowed user; returns the session cookie. */
async function loginAsAllowedUser() {
  mockGithub({ githubId: Number(config.ALLOWED_GITHUB_ID), login: 'tdirix' });
  const loginRes = await app.inject({ method: 'GET', url: '/auth/github/login' });
  const stateCookie = loginRes.cookies.find((c) => c.name === 'oauth_state');
  const state = new URL(loginRes.headers.location).searchParams.get('state');
  const callbackRes = await app.inject({
    method: 'GET',
    url: `/auth/github/callback?code=abc&state=${state}`,
    cookies: { oauth_state: stateCookie.value },
  });
  assert.equal(callbackRes.statusCode, 302, 'login handshake must succeed for the test to be meaningful');
  return cookieHeader(callbackRes, 'sid');
}

test('GET /auth/github/login redirects to GitHub with a state param and sets a state cookie', async () => {
  const res = await app.inject({ method: 'GET', url: '/auth/github/login' });
  assert.equal(res.statusCode, 302);
  const location = new URL(res.headers.location);
  assert.equal(location.hostname, 'github.com');
  assert.ok(location.searchParams.get('state'), 'must include a random state param');
  assert.ok(res.cookies.find((c) => c.name === 'oauth_state'));
});

test('GET /auth/github/callback without code/state is rejected', async () => {
  const res = await app.inject({ method: 'GET', url: '/auth/github/callback' });
  assert.equal(res.statusCode, 400);
});

test('GET /auth/github/callback with a state that does not match the cookie is rejected (CSRF)', async () => {
  const loginRes = await app.inject({ method: 'GET', url: '/auth/github/login' });
  const stateCookie = loginRes.cookies.find((c) => c.name === 'oauth_state');
  const res = await app.inject({
    method: 'GET',
    url: '/auth/github/callback?code=abc&state=attacker-supplied-state',
    cookies: { oauth_state: stateCookie.value },
  });
  assert.equal(res.statusCode, 400);
});

test('GET /auth/github/callback blocks any GitHub id other than ALLOWED_GITHUB_ID', async () => {
  mockGithub({ githubId: 999999, login: 'not-the-allowed-user' });
  const loginRes = await app.inject({ method: 'GET', url: '/auth/github/login' });
  const stateCookie = loginRes.cookies.find((c) => c.name === 'oauth_state');
  const state = new URL(loginRes.headers.location).searchParams.get('state');
  const res = await app.inject({
    method: 'GET',
    url: `/auth/github/callback?code=abc&state=${state}`,
    cookies: { oauth_state: stateCookie.value },
  });
  assert.equal(res.statusCode, 403);
  const { rows } = await pool.query('SELECT * FROM app_user');
  assert.equal(rows.length, 0, 'a blocked login must not persist a user row');
});

test('GET /auth/github/callback logs in the allowed GitHub id and opens a session', async () => {
  const sidCookie = await loginAsAllowedUser();
  assert.ok(sidCookie, 'must set a signed session cookie');

  const meRes = await app.inject({ method: 'GET', url: '/api/me', cookies: { sid: sidCookie.split('=')[1] } });
  const me = meRes.json();
  assert.equal(me.loggedIn, true);
  assert.equal(me.github_login, 'tdirix');
});

test('POST /auth/logout clears the session cookie and deletes the session row', async () => {
  const sidCookie = await loginAsAllowedUser();
  const sid = sidCookie.split('=')[1];

  const { rows: before } = await pool.query('SELECT * FROM session');
  assert.equal(before.length, 1);

  const res = await app.inject({ method: 'POST', url: '/auth/logout', cookies: { sid } });
  assert.equal(res.statusCode, 200);

  const { rows: after } = await pool.query('SELECT * FROM session');
  assert.equal(after.length, 0, 'logout must delete the session server-side, not just clear the cookie');
});

test('GET /api/me reports loggedIn: false with no session cookie', async () => {
  const res = await app.inject({ method: 'GET', url: '/api/me' });
  assert.deepEqual(res.json(), { loggedIn: false });
});

test('GET and POST /api/sync require a session (401 without one)', async () => {
  const getRes = await app.inject({ method: 'GET', url: '/api/sync' });
  assert.equal(getRes.statusCode, 401);
  const postRes = await app.inject({ method: 'POST', url: '/api/sync', payload: { items: [] } });
  assert.equal(postRes.statusCode, 401);
});

test('POST /api/sync newer-wins: an older incoming update does not overwrite a newer stored value', async () => {
  const sid = (await loginAsAllowedUser()).split('=')[1];

  await app.inject({
    method: 'POST',
    url: '/api/sync',
    cookies: { sid },
    payload: { items: [{ item_key: 'kilo_weight_goblet_squat_phase0', value: 'newer', deleted: false, updated_at: '2999-01-01T00:00:00.000Z' }] },
  });

  const staleRes = await app.inject({
    method: 'POST',
    url: '/api/sync',
    cookies: { sid },
    payload: { items: [{ item_key: 'kilo_weight_goblet_squat_phase0', value: 'older', deleted: false, updated_at: '2000-01-01T00:00:00.000Z' }] },
  });

  const item = staleRes.json().items.find((i) => i.item_key === 'kilo_weight_goblet_squat_phase0');
  assert.equal(item.value, 'newer', 'the stale push must not clobber the newer stored value');
});

test('POST /api/sync accepts a strictly newer update and GET /api/sync returns it', async () => {
  const sid = (await loginAsAllowedUser()).split('=')[1];

  await app.inject({
    method: 'POST',
    url: '/api/sync',
    cookies: { sid },
    payload: { items: [{ item_key: 'kilo_last_phase', value: '2', deleted: false, updated_at: '2000-01-01T00:00:00.000Z' }] },
  });
  await app.inject({
    method: 'POST',
    url: '/api/sync',
    cookies: { sid },
    payload: { items: [{ item_key: 'kilo_last_phase', value: '3', deleted: false, updated_at: '2999-01-01T00:00:00.000Z' }] },
  });

  const pullRes = await app.inject({ method: 'GET', url: '/api/sync', cookies: { sid } });
  const item = pullRes.json().items.find((i) => i.item_key === 'kilo_last_phase');
  assert.equal(item.value, '3');
});

test('unmatched GET outside /api and /auth falls back to the SPA shell', async () => {
  const res = await app.inject({ method: 'GET', url: '/some/deep/link' });
  assert.equal(res.statusCode, 200);
  assert.match(res.body, /<title>kilo<\/title>/);
});

test('unmatched GET under /api is a real 404, not the SPA shell', async () => {
  const res = await app.inject({ method: 'GET', url: '/api/does-not-exist' });
  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.json(), { error: 'not_found' });
});
