import pg from 'pg';
import { E2E_CONFIG } from '../../playwright.config';

export function makePool() {
  return new pg.Pool({ connectionString: E2E_CONFIG.databaseUrl });
}

export async function resetDb(pool: pg.Pool) {
  await pool.query('TRUNCATE session, kv_item, app_user RESTART IDENTITY CASCADE');
}
