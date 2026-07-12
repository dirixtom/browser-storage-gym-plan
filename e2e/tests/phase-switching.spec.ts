import { expect, test } from '@playwright/test';

test('the selected phase survives a reload', async ({ page }) => {
  await page.goto('/');

  const phaseTwoTab = page.locator('nav[aria-label="Phase navigation"] button[data-phase="2"]');
  await phaseTwoTab.click();
  await expect(phaseTwoTab).toHaveAttribute('aria-current', 'page');

  await page.reload();

  await expect(
    page.locator('nav[aria-label="Phase navigation"] button[data-phase="2"]'),
  ).toHaveAttribute('aria-current', 'page');
});
