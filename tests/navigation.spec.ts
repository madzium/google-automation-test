import { test, expect } from '@playwright/test';

test.describe('Documentation navigation', () => {
  test('navigates from the homepage to the Writing tests guide', async ({ page }) => {
    await test.step('Open the Playwright homepage', async () => {
      await page.goto('https://playwright.dev/');
    });

    await test.step('Open the documentation', async () => {
      await page.getByRole('link', { name: 'Get started' }).click();
      await expect(page).toHaveURL(/\/docs\/intro$/);
    });

    await test.step('Navigate to the Writing tests guide', async () => {
      await page.getByRole('link', { name: 'Writing tests', exact: true }).click();
    });

    await test.step('Verify the guide page', async () => {
      await expect(page).toHaveURL(/\/docs\/writing-tests$/);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Writing tests');
    });
  });
});
