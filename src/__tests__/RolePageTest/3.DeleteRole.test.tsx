import { test, expect, chromium, Page } from '@playwright/test';
import { execPath } from 'process';

test.describe('Delete Role Automation', () => {

    //Test Number : 1
    test('Should delete a role and check the button visible', async () => {
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
        const roleManagementButton = page.locator('text=Role Management');
        await page.waitForTimeout(2000);

        await roleManagementButton.click();
        await page.waitForSelector('table');
        // const userRow = page.locator('tr').nth(1);
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await deleteIcon.click();

        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        await expect(confirmDeleteButton).toBeVisible();


        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('Should delete a role and check the particular data', async () => {
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
        const roleManagementButton = page.locator('text=Role Management');
        await roleManagementButton.click();
        await page.waitForTimeout(5000);

        await page.waitForSelector('table');

        const userRow = page.locator('tr').filter({ hasText: 'Testing New Role2' }).first();
        const deleteIcon = userRow.locator('[data-testid="DeleteIcon"]');
        await deleteIcon.click();
        await page.waitForTimeout(2000);

        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        await expect(confirmDeleteButton).toBeVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('Should delete a role and check the alert message for incase mapping', async () => {
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
        const roleManagementButton = page.locator('text=Role Management');
        await roleManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await deleteIcon.click();
        await page.waitForTimeout(2000);

        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        await expect(confirmDeleteButton).toBeVisible();
        await confirmDeleteButton.click();
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        expect(alertMessage).toBe('User error:This role has been mapped to another user');
        console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 4
    test('Should delete a role and check the alert message', async () => {
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
        const roleManagementButton = page.locator('text=Role Management');
        await roleManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        const isDelRoleIconVisible = await deleteIcon.isVisible();
        await page.waitForTimeout(2000);

        if (isDelRoleIconVisible) {
            await deleteIcon.click();
            const confirmButton = page.locator('button', { hasText: 'Delete' });
            await confirmButton.click();
            // const successMessage = page.locator('text=Role Deleted successfully');
            // await expect(successMessage).toBeVisible();
            const alertMessage = await page.locator('.MuiAlert-message').innerText();
            expect(alertMessage).toBe('Role Deleted successfully');
            console.log('Alert Message:', alertMessage);
            console.log("Role icon is visible");
        } else {
            console.log("Role icon is not visible.");
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 5
    test('Should check the delete button visibility', async () => {
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
        const roleManagementButton = page.locator('text=Role Management');
        await roleManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        const isDelteIconVisibility = deleteIcon.isVisible();
        expect(isDelteIconVisibility).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 6
    test('Should check the confirmation button', async () => {
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
        const roleManagementButton = page.locator('text=Role Management');
        await roleManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await deleteIcon.click();
        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        const isConfirmDeleteButton = confirmDeleteButton.isVisible();
        expect(isConfirmDeleteButton).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });
});
