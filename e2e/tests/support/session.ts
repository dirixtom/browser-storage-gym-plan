// Seeds a logged-in session directly in Postgres and hands the browser the
// matching signed cookie — the real GitHub OAuth handshake can't run in
// tests (it needs a live github.com round-trip and a real allowed account),
// so this reproduces exactly what the callback route would have produced.

import { Signer } from '@fastify/cookie';
import crypto from 'node:crypto';
import type pg from 'pg';
import type { BrowserContext } from '@playwright/test';
import { E2E_CONFIG } from '../../playwright.config';

export async function seedLoggedInSession(
  pool: pg.Pool,
  context: BrowserContext,
  githubLogin = 'tdirix',
): Promise<void> {
  const { rows } = await pool.query(
    `INSERT INTO app_user (github_id, github_login) VALUES ($1, $2)
     ON CONFLICT (github_id) DO UPDATE SET github_login = EXCLUDED.github_login
     RETURNING id`,
    [Number(E2E_CONFIG.allowedGithubId), githubLogin],
  );
  const userId = rows[0].id;

  const sid = crypto.randomBytes(32).toString('hex');
  await pool.query(
    `INSERT INTO session (id, user_id, expires_at) VALUES ($1, $2, now() + interval '30 days')`,
    [sid, userId],
  );

  const signedSid = new Signer(E2E_CONFIG.sessionSecret, 'sha256').sign(sid);
  await context.addCookies([
    {
      name: 'sid',
      value: signedSid,
      url: E2E_CONFIG.baseURL,
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    },
  ]);
}
