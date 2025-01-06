
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed mapping automation', () => {
    //test.describe.configure({ mode: 'serial' });
    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('01.Should check watershed mapping add icon visible in dashboard', async () => {
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
        const userManagementButton = page.locator('text=Watershed Mapping').first();
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        await addWsAddWsMappingIcon.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('02.Should check add icon clickable in watershed mapping', async () => {
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
        const userManagementButton = page.locator('text=Watershed Mapping').first();
        await userManagementButton.click();
        // Click the 'Add Mapping' button
        const addWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        await addWsMappingIcon.isVisible();
        await addWsMappingIcon.click();

        // Select a user from the dropdown
        const loginTypeDropdown = page.locator('#user');
        await loginTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const userNameOption = await page.$$('ul[role="listbox"] > li');
        if (userNameOption.length > 0) {
            await userNameOption[0].click();
        }
        // Fill in the remarks
        await page.fill('input#remarks', 'Test Remarks');
        // Select a watershed name
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[0].click();
        }
        await page.keyboard.press('Escape');
        // Click the 'Cancel' button to close the dialog
        const cancelButton = page.locator('button:has-text("Cancel")');
        await cancelButton.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('03.Should check the add button with missing data', async () => {
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

        // Open Watershed Mapping
        const userManagementButton = page.locator('text=Watershed Mapping').first();
        await userManagementButton.click();

        // Open Add Mapping dialog
        const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        await expect(addWsAddWsMappingIcon).toBeVisible();
        await addWsAddWsMappingIcon.click();
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[0].click(); // Select the first option in the list
        }
        await page.keyboard.press('Escape');

        // Click Add button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        const isAddButtonEnabled = await addButton.isDisabled();
        await expect(isAddButtonEnabled).toBe(true);
        await page.waitForTimeout(1000);

        await browser.close();
    });

    test('04.Should check the add button with missing data like watershed', async () => {
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

        // Open Watershed Mapping
        const userManagementButton = page.locator('text=Watershed Mapping').first();
        await userManagementButton.click();

        // Open Add Mapping dialog
        const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        await expect(addWsAddWsMappingIcon).toBeVisible();
        await addWsAddWsMappingIcon.click();
        // const wsNameDropdown = page.locator('#ws_name');
        // await wsNameDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]');
        // const watershedOptions = await page.$$('ul[role="listbox"] > li');
        // if (watershedOptions.length > 0) {
        //     await watershedOptions[0].click(); // Select the first option in the list
        // }
        // await page.keyboard.press('Escape');

        // Click Add button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        const isAddButtonEnabled = await addButton.isDisabled();
        await expect(isAddButtonEnabled).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });
});