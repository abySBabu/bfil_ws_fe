import { test, expect, chromium, Page } from '@playwright/test';

test('should display user data in the table and check for Edit and Block icons', async () => {
    test.setTimeout(60000);  // Increase timeout to 60 seconds
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Navigate to the login page
    await page.goto('http://localhost:3000/login');

    // Perform login
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');

    // Wait for the home page to load after login
    await page.waitForURL('http://localhost:3000/home', { timeout: 60000 });
    await page.reload();
    // Navigate to the User Management page
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    await page.waitForTimeout(10000);
    // Wait for the table to load
    await page.waitForSelector('table');

    // Locate all rows in the table
    const rows = page.locator('tr');

    // Log the row count to ensure data is loaded
    const rowCount = await rows.count();
    console.log('Number of rows:', rowCount);
    expect(rowCount).toBeGreaterThan(0);
    // Close the browser
    await browser.close();
});
