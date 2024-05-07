import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});
test.describe('Characters', () => {
    test('Path to find Amber and find certain information', async ({ page }) => {
        await page.click('a[id="Characters"]');

        await expect(page.locator('h1').getByText('Characters List')).toBeVisible();
        await page.waitForTimeout(2000);
        await page.click('a[id="Amber"]');

        await page.waitForTimeout(2000);
        await expect(page).toHaveTitle(/Amber - Tenryou 💮/);

        await expect(page.locator('h1').getByText('Amber')).toBeVisible();
    });
});