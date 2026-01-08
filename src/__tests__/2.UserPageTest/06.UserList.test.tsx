import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Edit Automation', () => {
    // //test.describe.configure({ mode: 'serial' });

    test('1.Should display user data in the table', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        // Navigate to the User Management page
        const userManagementButton = page.locator('text=User Management').first();
        await userManagementButton.click();
        await page.waitForTimeout(10000);
        await page.waitForSelector('table');
        const rows = page.locator('tr');
        const rowCount = await rows.count();
        console.log('Number of rows:', rowCount);
        expect(rowCount).toBeGreaterThan(0);
        await browser.close();
    });

});
