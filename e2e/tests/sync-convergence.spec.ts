import { expect, test } from '@playwright/test';
import type { Pool } from 'pg';
import { makePool, resetDb } from './support/db';
import { seedLoggedInSession } from './support/session';

let pool: Pool;

test.beforeAll(() => {
  pool = makePool();
});

test.afterAll(async () => {
  await pool.end();
});

test.beforeEach(async () => {
  await resetDb(pool);
});

test('a weight saved on one device shows up on another after reconcile', async ({ browser }) => {
  const deviceA = await browser.newContext();
  const deviceB = await browser.newContext();
  await seedLoggedInSession(pool, deviceA);
  await seedLoggedInSession(pool, deviceB);

  const pageA = await deviceA.newPage();
  await pageA.goto('/');
  await expect(pageA.getByRole('button', { name: 'Sign out' })).toBeVisible();

  await pageA.locator('li[role="button"]').first().click();
  await pageA.getByLabel('Weight for current phase (kg)').fill('42');
  await pageA.getByRole('button', { name: 'Save' }).click();
  await expect(pageA.getByText('Saved ✓')).toBeVisible();

  // Force a reconcile cycle (mount-time sync query) so the newer local edit gets pushed.
  const pushed = pageA.waitForResponse(
    (r) => r.url().includes('/api/sync') && r.request().method() === 'POST',
  );
  await pageA.reload();
  await pushed;

  const pageB = await deviceB.newPage();
  const pulled = pageB.waitForResponse(
    (r) => r.url().includes('/api/sync') && r.request().method() === 'GET',
  );
  await pageB.goto('/');
  await pulled;

  await pageB.locator('li[role="button"]').first().click();
  await expect(pageB.getByLabel('Weight for current phase (kg)')).toHaveValue('42');

  await deviceA.close();
  await deviceB.close();
});
