import { test, expect } from '@playwright/test';

const menuItems = [
    { name: 'Docs', url: 'https://playwright.dev/docs/intro', heading: 'Installation' },
    { name: 'MCP', url: 'https://playwright.dev/mcp/introduction', heading: 'Playwright MCP' },
    { name: 'CLI', url: 'https://playwright.dev/agent-cli/introduction', heading: 'Playwright CLI' },
    { name: 'API', url: 'https://playwright.dev/docs/api/class-playwright', heading: 'Playwright Library' },
];
test.describe('Mobile Top Navigation', () => {
    for (const item of menuItems) {
        test(`opens the ${item.name} page`, async ({ page }) => {
            const topMenu = page.getByRole('navigation', { name: 'Main' });
            await test.step(`Open the Playwright homepage`, async () => {
                await page.goto('https://playwright.dev/');
            });
            await test.step(`Open the mobile menu`, async () => {
                await topMenu.getByRole('button', { name: 'toggle navigation bar' }).click();
            });

            await test.step(`Click "${item.name}" in the mobile menu`, async () => {
                await topMenu.getByRole('link', { name: item.name, exact: true }).click();
            });

            await test.step('Verify the opened page', async () => {
                await expect(page).toHaveURL(item.url);
                await expect(page.getByRole('heading', { level: 1 })).toHaveText(item.heading);
            });
        });
    }
});