import { test, expect, chromium, Page } from '@playwright/test';
test.describe('Role Management Automation', () => {

    test('should click the edit icon in the table row', async () => {

        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694777');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);

        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        await page.reload();  // this load is used to retrive some fields
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
        // // Select the edit icon in the first row and click it
        // const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await editIcon.click();

        // // Step 5: Fill the values in the dialog form fields
        // await page.fill('input#roleName', 'New Role Name');
        // await page.fill('input#roleDesc', 'New Role Description');
        // await page.waitForTimeout(2000); // 2000 milliseconds = 2 seconds

        // // Step 6: Interact with the "Edit" checkbox
        // // Locate the checkbox based on how the "Edit" permission is represented in your DOM
        // const editCheckbox = await page.locator('input[type="checkbox"]').nth(1); 
        // await page.waitForTimeout(2000); // 2000 milliseconds = 2 seconds

        // await editCheckbox.check();  // Check the checkbox for "Edit"

        // // Step 7: Click the "Edit" button to submit the form
        // await page.click('button:has-text("Edit")');

        // // Step 8: (Optional) Validate successful form submission
        // await page.waitForSelector('.MuiAlert-message');  // Assuming there's an alert for success/error
        // const alertMessage = await page.textContent('.MuiAlert-message');
        // console.log('Alert Message:', alertMessage);

        await browser.close();

    });

});