import { test, expect, chromium } from '@playwright/test';

test('should display UserList when clicking on User Management', async () => {
    test.setTimeout(60000);

    const browser = await chromium.launch({
        headless: false, // Set to true if you don't want the browser UI
        channel: 'chrome',
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/home');
    // Click on the 'User Management' section
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    // Verify that the UserList component is visible
    const userListComponent = page.locator('text=Add User'); // Adjusted this selector to match a unique element in the UserList
    await expect(userListComponent).toBeVisible();
    // Optionally, you can take a screenshot for verification
    await page.screenshot({ path: 'user-list-screenshot.png' });
    // Close the browser
    await browser.close();
});
