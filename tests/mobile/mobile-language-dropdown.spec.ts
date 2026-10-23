import { test, expect } from '@playwright/test';

const languages = [
    { name: 'Node.js', url: 'https://playwright.dev/', title: 'Fast and reliable end-to-end testing for modern web apps | Playwright' },
    { name: 'Python', url: 'https://playwright.dev/python/', title: 'Fast and reliable end-to-end testing for modern web apps | Playwright Python' },
    { name: 'Java', url: 'https://playwright.dev/java/', title: 'Fast and reliable end-to-end testing for modern web apps | Playwright Java' },
    { name: '.NET', url: 'https://playwright.dev/dotnet/', title: 'Fast and reliable end-to-end testing for modern web apps | Playwright .NET' },
];

test.describe('Mobile Language Dropdown Test', () => {
    for (const language of languages) {
        test(`switches to ${language.name}`, async ({ page }) => {
            const topMenu = page.getByRole('navigation', { name: 'Main' });
            await test.step('Open the Playwright homepage', async () => {
                await page.goto('https://playwright.dev/');

            });
            await test.step('Open the mobile menu', async () => {
                await topMenu.getByRole('button', { name: 'Toggle navigation bar' }).click();
            });
            await test.step('Click "Node.js" to expand the language list', async () => {
                await topMenu.getByRole('button', { name: 'Node.js' }).click();
                await expect(topMenu.getByRole('link', { name: 'Python' })).toBeVisible();
            });

            await test.step(`Click "${language.name}" in the dropdown`, async () => {
                await topMenu.getByRole('link', { name: language.name }).click();
            });
            await test.step(`Verify the ${language.name} version is opened`, async () => {
                await expect(page).toHaveURL(language.url);
                await expect(page).toHaveTitle(language.title);

            });
        });
    }
});
