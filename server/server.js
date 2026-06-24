// Kilo gym plan — sync server.
//
// Responsibilities:
//   * Serve the static app (index.html etc.) at the same origin as the API.
//   * GitHub OAuth login, gated to a single allowed numeric GitHub id.
//   * A tiny newer-wins key/value sync API backed by Postgres.
//
// Run with:  node --env-file=.env server.js   (npm start)
// Node >= 20 (native fetch + --env-file).

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import pg from 'pg';

// ── Config ───────────────────────────────────────────────────────────────
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  ALLOWED_GITHUB_ID,
  SESSION_SECRET,
  DATABASE_URL,
  PUBLIC_ORIGIN,
} = process.env;

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '127.0.0.1'; // localhost-only; the tunnel reaches in.
const SESSION_TTL_DAYS = 30;
const SESSION_COOKIE = 'sid';
const STATE_COOKIE = 'oauth_state';

for (const [k, v] of Object.entries({
  GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ALLOWED_GITHUB_ID,
  SESSION_SECRET, DATABASE_URL, PUBLIC_ORIGIN,
})) {
  if (!v) {
    console.error(`Missing required env var: ${k}. See .env.example.`);
    process.exit(1);
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = path.join(__dirname, '..', 'index.html'); // single-file frontend at repo root

const pool = new pg.Pool({ connectionString: DATABASE_URL });

// ── App ──────────────────────────────────────────────────────────────────
const app = Fastify({ logger: true, trustProxy: true });

await app.register(cookie, { secret: SESSION_SECRET });
await app.register(rateLimit, { max: 120, timeWindow: '1 minute' });

// Baseline security headers on every response.
app.addHook('onSend', async (req, reply, payload) => {
  reply.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  reply.header('X-Content-Type-Options', 'nosniff');
  reply.header('X-Frame-Options', 'DENY');
  reply.header('Referrer-Policy', 'no-referrer');
  return payload;
});

// ── Helpers ──────────────────────────────────────────────────────────────
function randomId() {
  return crypto.randomBytes(32).toString('hex');
}

function setSignedCookie(reply, name, value, maxAgeSeconds) {
  reply.setCookie(name, value, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    signed: true,
    maxAge: maxAgeSeconds,
  });
}

function readSignedCookie(req, name) {
  const raw = req.cookies?.[name];
  if (!raw) return null;
  const unsigned = req.unsignCookie(raw);
  return unsigned.valid ? unsigned.value : null;
}

// Returns { user_id, github_login } for a valid, unexpired session, else null.
async function getSession(req) {
  const sid = readSignedCookie(req, SESSION_COOKIE);
  if (!sid) return null;
  const { rows } = await pool.query(
    `SELECT s.user_id, u.github_login
       FROM session s JOIN app_user u ON u.id = s.user_id
      WHERE s.id = $1 AND s.expires_at > now()`,
    [sid],
  );
  return rows[0] || null;
}

async function requireSession(req, reply) {
  const session = await getSession(req);
  if (!session) {
    reply.code(401).send({ error: 'not_authenticated' });
    return null;
  }
  return session;
}

// ── OAuth: login ─────────────────────────────────────────────────────────
app.get('/auth/github/login', async (req, reply) => {
  const state = randomId();
  // Short-lived signed cookie binds this browser to the state we send GitHub.
  setSignedCookie(reply, STATE_COOKIE, state, 600);
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', GITHUB_CLIENT_ID);
  url.searchParams.set('redirect_uri', `${PUBLIC_ORIGIN}/auth/github/callback`);
  url.searchParams.set('scope', 'read:user');
  url.searchParams.set('state', state);
  url.searchParams.set('allow_signup', 'false');
  reply.redirect(url.toString());
});

// ── OAuth: callback ──────────────────────────────────────────────────────
app.get('/auth/github/callback', {
  config: { rateLimit: { max: 20, timeWindow: '1 minute' } },
}, async (req, reply) => {
  const { code, state } = req.query;
  const expectedState = readSignedCookie(req, STATE_COOKIE);
  reply.clearCookie(STATE_COOKIE, { path: '/' });

  if (!code || !state || !expectedState || state !== expectedState) {
    return reply.code(400).send('Invalid OAuth state.');
  }

  // Exchange the code for an access token (client secret stays server-side).
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${PUBLIC_ORIGIN}/auth/github/callback`,
    }),
  });
  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token;
  if (!accessToken) {
    req.log.warn({ tokenJson }, 'token exchange failed');
    return reply.code(502).send('OAuth token exchange failed.');
  }

  // Read the user's numeric id. Token is used only here, then discarded.
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'kilo-gym-plan',
    },
  });
  const ghUser = await userRes.json();

  // Single-user gate: only the allowed numeric id may proceed. No persistence
  // of any kind for anyone else.
  if (String(ghUser.id) !== String(ALLOWED_GITHUB_ID)) {
    req.log.warn({ id: ghUser.id, login: ghUser.login }, 'blocked login attempt');
    return reply.code(403).send('Access denied — this is a private app.');
  }

  // Upsert the (one) user and open a session.
  const { rows } = await pool.query(
    `INSERT INTO app_user (github_id, github_login)
     VALUES ($1, $2)
     ON CONFLICT (github_id) DO UPDATE SET github_login = EXCLUDED.github_login
     RETURNING id`,
    [ghUser.id, ghUser.login],
  );
  const userId = rows[0].id;

  const sid = randomId();
  await pool.query(
    `INSERT INTO session (id, user_id, expires_at)
     VALUES ($1, $2, now() + ($3 || ' days')::interval)`,
    [sid, userId, String(SESSION_TTL_DAYS)],
  );
  setSignedCookie(reply, SESSION_COOKIE, sid, SESSION_TTL_DAYS * 24 * 3600);
  reply.redirect('/');
});

// ── Logout ───────────────────────────────────────────────────────────────
app.post('/auth/logout', async (req, reply) => {
  const sid = readSignedCookie(req, SESSION_COOKIE);
  if (sid) await pool.query('DELETE FROM session WHERE id = $1', [sid]);
  reply.clearCookie(SESSION_COOKIE, { path: '/' });
  reply.send({ ok: true });
});

// ── Who am I ─────────────────────────────────────────────────────────────
app.get('/api/me', async (req, reply) => {
  const session = await getSession(req);
  reply.send(session
    ? { loggedIn: true, github_login: session.github_login }
    : { loggedIn: false });
});

// ── Sync: pull ───────────────────────────────────────────────────────────
app.get('/api/sync', async (req, reply) => {
  const session = await requireSession(req, reply);
  if (!session) return;
  const { since } = req.query;
  const params = [session.user_id];
  let where = 'user_id = $1';
  if (since) { params.push(since); where += ' AND updated_at > $2'; }
  const { rows } = await pool.query(
    `SELECT item_key, value, deleted, updated_at
       FROM kv_item WHERE ${where} ORDER BY updated_at`,
    params,
  );
  const { rows: t } = await pool.query('SELECT now() AS now');
  reply.send({ items: rows, server_time: t[0].now });
});

// ── Sync: push (newer-wins) ──────────────────────────────────────────────
app.post('/api/sync', {
  schema: {
    body: {
      type: 'object',
      required: ['items'],
      properties: {
        items: {
          type: 'array',
          maxItems: 5000,
          items: {
            type: 'object',
            required: ['item_key', 'updated_at'],
            properties: {
              item_key: { type: 'string', maxLength: 200 },
              value: { type: ['string', 'null'], maxLength: 1000 },
              deleted: { type: 'boolean' },
              updated_at: { type: 'string' },
            },
          },
        },
      },
    },
  },
}, async (req, reply) => {
  const session = await requireSession(req, reply);
  if (!session) return;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const it of req.body.items) {
      // Newer-wins: only overwrite when the incoming timestamp is strictly newer.
      await client.query(
        `INSERT INTO kv_item (user_id, item_key, value, deleted, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id, item_key) DO UPDATE
           SET value = EXCLUDED.value,
               deleted = EXCLUDED.deleted,
               updated_at = EXCLUDED.updated_at
         WHERE EXCLUDED.updated_at > kv_item.updated_at`,
        [session.user_id, it.item_key, it.value ?? null, it.deleted ?? false, it.updated_at],
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  // Return the authoritative merged set so the client can reconcile to it.
  const { rows } = await pool.query(
    `SELECT item_key, value, deleted, updated_at
       FROM kv_item WHERE user_id = $1 ORDER BY updated_at`,
    [session.user_id],
  );
  const { rows: t } = await pool.query('SELECT now() AS now');
  reply.send({ items: rows, server_time: t[0].now });
});

// ── Static app ─────────────────────────────────────────────────────────--
// The frontend is a single self-contained index.html. We serve ONLY that file,
// explicitly — never a directory — so server/.env, .git, etc. are never exposed.
function sendIndex(reply) {
  let html;
  try {
    html = fs.readFileSync(INDEX_PATH, 'utf8');
  } catch {
    return reply.code(500).send('index.html not found');
  }
  reply.header('Content-Type', 'text/html; charset=utf-8').send(html);
}
app.get('/', (req, reply) => sendIndex(reply));
app.get('/index.html', (req, reply) => sendIndex(reply));

// ── Start ──────────────────────────────────────────────────────────────--
try {
  await pool.query('SELECT 1'); // fail fast if the DB is unreachable
  await app.listen({ port: PORT, host: HOST });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
