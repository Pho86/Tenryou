import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Home Page Bento Grid', () => {
    test('has expected homepage title', async ({ page }) => {
        await expect(page).toHaveTitle(/Home - Tenryou 💮/);
    });
});

test.describe('Bento Items, Path to correct director', () => {
    test('Find Character Page, find title', async ({ page }) => {
        await page.click('a[id="Characters"]');
        await expect(page).toHaveTitle(/Characters - Tenryou 💮/);
    });
    test('Find Elements Page, find title', async ({ page }) => {
        await page.click('a[id="Elements"]');
        await expect(page).toHaveTitle(/Elements - Tenryou 💮/);
    });
    test('Find Artifacts Page, find title', async ({ page }) => {
        await page.click('a[id="Artifacts"]');
        await expect(page).toHaveTitle(/Artifacts - Tenryou 💮/);
    });
    test('Find Weapons Page, find title', async ({ page }) => {
        await page.click('a[id="Weapons"]');
        await expect(page).toHaveTitle(/Weapons - Tenryou 💮/);
    });
    test('Find Namecards Page, find title', async ({ page }) => {
        await page.click('a[id="Namecards"]');
        await expect(page).toHaveTitle(/Namecards - Tenryou 💮/);
    });
    test('Find Outfits Page, find title', async ({ page }) => {
        await page.click('a[id="Outfits"]');
        await expect(page).toHaveTitle(/Outfits - Tenryou 💮/);
    });
    test('Find Materials Page, find title', async ({ page }) => {
        await page.click('a[id="Materials"]');
        await expect(page).toHaveTitle(/Materials - Tenryou 💮/);
    });


});