import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});
test.describe('Characters', () => {
    test('Path to find Amber and find certain information', async ({ page }) => {
        await page.getByRole('navigation').getByRole('link', { name: 'Characters' }).click();
        await expect(page.locator('h1').getByText('Characters List')).toBeVisible();
        await page.waitForTimeout(2000);
        await page.click('a[id="Amber"]');
        await page.waitForTimeout(2000);
        await page.getByRole('heading', { name: 'Amber', exact: true }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Show Materials' }).click();
        await page.getByRole('heading', { name: '% Outrider' }).click();
        await page.getByRole('img', { name: '% Outrider gacha splash' }).click();
        await page.getByRole('heading', { name: '-Star Outrider' }).click();
        await page.getByRole('link', { name: 'Open in New Tab' }).click();
    });

    test('Path from Birthdays to Zhongli and find gallery', async ({ page }) => {
        await page.locator('#months').selectOption('#December');
        await page.waitForTimeout(4000);
        await page.click('a#Zhongli_month');
        await page.waitForTimeout(2000);
        await page.getByText('🔲').click();
        await page.getByRole('img', { name: 'Zhongli constellation', exact: true }).click();
    });

    test('Path from daily domains to Diluc by pathing through Sunday, then to Friday', async ({ page }) => {
        await page.locator('#days').selectOption('Sunday');
        await page.waitForTimeout(2000);
        await page.locator('#days').selectOption('Friday');
        await page.waitForTimeout(2000);
        await page.click('a#Diluc_daily');
        await page.getByRole('heading', { name: 'Darknight Blaze' }).click();
        await page.getByRole('heading', { name: 'Red Dead of Night' }).click();
    });
});