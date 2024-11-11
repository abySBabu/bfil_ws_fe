import { test, chromium, expect } from '@playwright/test';

test.describe('Check Browser History Automation', () => {
    test.describe.configure({ mode: 'serial' });

    test('Brower history go back ', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to the login page
        await page.goto('http://localhost:3000/bfilreacttest');
        // Fill in the login form and submit
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');

        // Wait for navigation to the home page
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 60000 });

        // Reload the page to ensure it is fully loaded
        await page.reload();

        // Navigate to the User Management section
        const userManagementButton = page.locator('text=User Management');
        await userManagementButton.click();

        // Reload the page and click User Management again
        await page.reload();
        const userManagementButton1 = page.locator('text=User Management');
        await userManagementButton1.click();

        // Simulate clicking the browser's back button
        await page.goBack();

        // Assert that the URL is now the dashboard URL, not the login page
        await expect(page).toHaveURL('http://localhost:3000/bfilreacttest/home');

        // Close the browser
        await browser.close();
    });
});
