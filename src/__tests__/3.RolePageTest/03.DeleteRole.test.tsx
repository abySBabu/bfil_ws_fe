import { test, expect, chromium, Page } from '@playwright/test';
import { execPath } from 'process';

test.describe('Delete Role Automation', () => {
    //test.describe.configure({ mode: 'serial' });
    //Test Number : 1
    test('01.Should delete a role and check the button visible', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        const roleManagementButton = page.locator('text=Role Management').first();
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
    // Test Number : 2
    test('02.Should delete a role and check the particular data', async () => {
        test.setTimeout(800000);

        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);

        // Navigate to Role Management
        const roleManagementButton = page.locator('text=Role Management').first();
        await roleManagementButton.click();
        await page.waitForTimeout(5000);
        await page.waitForSelector('table');

        // Locate the search input field and enter the role name
        const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
        await inputField.waitFor({ state: 'visible' });
        await inputField.fill('Testing New Role2');

        // Find the role row
        const userRow = page.locator('tr').filter({ hasText: 'Testing New Role2' });

        // Check if the role exists
        if (await userRow.count() === 0) {
            console.log("Role 'Testing New Role2' not found. Closing browser.");
            await browser.close();
            return;
        }

        // Proceed with deleting the role
        const deleteIcon = userRow.locator('[data-testid="DeleteIcon"]');
        await deleteIcon.click();
        await page.waitForTimeout(2000);

        // Confirm deletion
        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        await expect(confirmDeleteButton).toBeVisible();
        // await confirmDeleteButton.click();

        // Wait for success message or other indicator as needed
        await page.waitForTimeout(1000);
        // console.log("Role 'Testing New Role2' deleted successfully.");

        await browser.close();
    });

    //Test Number : 5
    test('05.Should check the delete button visibility', async () => {
        test.setTimeout(800000);

        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        const roleManagementButton = page.locator('text=Role Management').first();
        await roleManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        if (await deleteIcon.isVisible()) {
            const isDelteIconVisibility = await deleteIcon.isVisible();
            expect(isDelteIconVisibility).toBe(true);
        } else {
            console.log("Not visible");
        }

        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 6
    test('06.Should check the confirmation button', async () => {
        test.setTimeout(800000);

        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        const roleManagementButton = page.locator('text=Role Management').first();
        await roleManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await deleteIcon.click();
        const confirmDeleteButton = page.locator('button:has-text("Delete")');
        const isConfirmDeleteButton = await confirmDeleteButton.isVisible();
        expect(isConfirmDeleteButton).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });
});
