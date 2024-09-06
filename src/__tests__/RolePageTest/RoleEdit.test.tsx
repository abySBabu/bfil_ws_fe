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
        // Select the edit icon in the first row and click it
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.fill('input#roleName', 'New Role Name');
        await page.fill('input#roleDesc', 'New Role Description');
        await page.waitForTimeout(2000); // 2000 milliseconds = 2 seconds
        // Locate the checkbox based on how the "Edit" permission is represented in your DOM
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        await page.click('button:has-text("Edit")');
        // Wait for the Snackbar to appear and validate its content
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        expect(alertMessage).toBe('Role updated successfully');
        console.log('Alert Message:', alertMessage);
        await browser.close();
    });

    test('Check alphanumeric for fields', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.fill('input#roleName', 'New Role##');
        await page.fill('input#roleDesc', 'New Role ###');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        await page.click('button:has-text("Edit")');
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.fill('input#roleName', '');
        await page.fill('input#roleDesc', '');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        await page.click('button:has-text("Edit")');
        const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
        const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
        console.log("Error Message " + errorMessage);
        expect(errorMessage).toBe('Role Description is required');
        expect(errorMessageForUserName).toBe('Role Name is required');
        await browser.close();
    });


});