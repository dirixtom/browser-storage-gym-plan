import { expect, test } from '@playwright/test';

// No login needed: weight persistence is pure localStorage, exercised
// through a real browser rather than jsdom.

test('a saved weight survives a reload', async ({ page }) => {
  await page.goto('/');

  const firstExercise = page.locator('li[role="button"]').first();
  await firstExercise.click();

  const weightInput = page.getByLabel('Weight for current phase (kg)');
  await expect(weightInput).toBeVisible();
  await weightInput.fill('37.5');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Saved ✓')).toBeVisible();

  await page.keyboard.press('Escape'); // close the sheet
  await page.reload();

  await firstExercise.click();
  await expect(page.getByLabel('Weight for current phase (kg)')).toHaveValue('37.5');
});
