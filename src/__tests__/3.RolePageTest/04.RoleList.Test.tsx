import { test, expect, chromium, Page } from '@playwright/test';
test.describe('Role Management Automation', () => {
    test.describe.configure({ mode: 'serial' });
    test('01.Should click the edit icon in the table row', async () => {

        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);

        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        await page.reload();
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        // // Wait for the table to be visible
        await page.waitForSelector('table');
        // Locate all rows in the table
        const rows = page.locator('tr');
        // Log the row count to ensure data is loaded
        const rowCount = await rows.count();
        console.log('Number of rows:', rowCount);
        expect(rowCount).toBeGreaterThan(0);
        await page.waitForTimeout(1000);
        await browser.close();
    });

});