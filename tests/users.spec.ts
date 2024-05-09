import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});
test.describe('Users Page', () => {
    test('Path to an incorrect user and expect an error page', async ({ page }) => {
        await page.click('a#Users');
        await page.getByPlaceholder('Enter UID...').click();
        await page.getByPlaceholder('Enter UID...').fill('5234321');
        await page.getByRole('button', { name: 'Search' }).click();
        await page.waitForTimeout(4000);
        await page.getByRole('heading', { name: '404' }).click();
    });
})