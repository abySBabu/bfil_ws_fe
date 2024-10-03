import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Add Role Automation', () => {

    test('should add a role and validate success alert', async () => {
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
        await page.reload(); // this load is used to retrieve some fields
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Project Head');
        await page.fill('input#roleDesc', 'State Project Head');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        await expect(addRoleDialogButton).toBeVisible();
        await addRoleDialogButton.click();
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        await page.waitForTimeout(3000);
        expect(alertMessage).toBe('Role created successfully');
        await browser.close();
    });

    test('alphanumeric testing', async () => {
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
        await page.reload();
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State ## Head');
        await page.fill('input#roleDesc', 'State ## Head');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        await expect(addRoleDialogButton).toBeVisible();
        await addRoleDialogButton.click();
        const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
        const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
        console.log("Error Message " + errorMessage);
        expect(errorMessage).toBe('Role Description must only contain alphanumeric characters');
        expect(errorMessageForUserName).toBe('Role Name must only contain alphanumeric characters');
        await browser.close();
    });

    test.only('rolename and description null testing', async () => {
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
        await page.reload();
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', '');
        await page.fill('input#roleDesc', '');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        await expect(addRoleDialogButton).toBeVisible();
        await addRoleDialogButton.click();
        const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
        const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
        console.log("Error Message " + errorMessage);
        expect(errorMessage).toBe('Role Description is required');
        expect(errorMessageForUserName).toBe('Role Name is required');
        await browser.close();
    });

});
