import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Delete Role Automation', () => {
    test.only('should delete a role and validate success alert', async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        // Navigate to the application
        await page.goto('http://localhost:3000/bfilreact');
        // Log in
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
        const roleManagementButton = page.locator('text=Role Management');
        await roleManagementButton.click();
        await page.waitForSelector('table');
        // await page.waitForSelector('table');
        // Select the edit icon in the first row and click it
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await deleteIcon.click();

        // const deleteButton = page.locator('button:has-text("Delete")').first();
        // await deleteButton.click();

        // Confirm deletion in the dialog
        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        await confirmDeleteButton.click();

        // Wait for the Snackbar to appear and validate its content
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        expect(alertMessage).toBe('Role Deleted successfully');
        console.log('Alert Message:', alertMessage);

        await browser.close();
    });

});
