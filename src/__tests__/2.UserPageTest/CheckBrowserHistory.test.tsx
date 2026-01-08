import { test, chromium, expect } from '@playwright/test';

test.describe('Check Browser History Automation', () => {
    //test.describe.configure({ mode: 'serial' });

    test('Brower history go back ', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);

        // Navigate to the User Management section
        const userManagementButton = page.locator('text=User Management').first();
        await userManagementButton.click();

        // Reload the page and click User Management again
        await page.reload();
        const userManagementButton1 = page.locator('text=User Management').first();
        await userManagementButton1.click();

        // Simulate clicking the browser's back button
        await page.goBack();

        // Assert that the URL is now the dashboard URL, not the login page
        await expect(page).toHaveURL('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.waitForTimeout(1000);
        await browser.close();
    });
});
