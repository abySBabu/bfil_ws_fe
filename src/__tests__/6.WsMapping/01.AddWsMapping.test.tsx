
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed mapping automation', () => {
    test.describe.configure({ mode: 'serial' });
    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('01.Should check add icon visible in watershed mapping', async () => {
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
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
        await page.reload();
        const userManagementButton = page.locator('text=Watershed Mapping');
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

        // Navigate to the application and log in
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');

        // Wait for the home page to load
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
        await page.reload();
        // Click on 'Watershed Mapping' button
        const userManagementButton = page.locator('text=Watershed Mapping');
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

    test('03.Should add Watershed Mapping add visible', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        // Navigate and log in
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
        await page.reload();

        // Open Watershed Mapping
        const userManagementButton = page.locator('text=Watershed Mapping');
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        // Open Add Mapping dialog
        const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        await addWsAddWsMappingIcon.isVisible();
        await addWsAddWsMappingIcon.click();
        // Fill in the form
        const loginTypeDropdown = page.locator('#user');
        await loginTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const userNameOption = await page.$$('ul[role="listbox"] > li');
        if (userNameOption.length > 0) {
            await userNameOption[0].click();
        }
        await page.fill('input#remarks', 'Test Remarks');
        // Select the first value from the Watershed Name dropdown
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
        await addButton.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should add Watershed Mapping and show success alert', async () => {
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
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Mapping');
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        await addWsAddWsMappingIcon.isVisible();
        await addWsAddWsMappingIcon.click();
        await page.fill('input#remarks', 'Test Remarks');
        // Open user dropdown and select first option
        const loginTypeDropdown = page.locator('#user');
        await loginTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const userNameOption = await page.$$('ul[role="listbox"] > li');
        if (userNameOption.length > 0) {
            await userNameOption[0].click();
        }
        // Open ws_name dropdown and select first option
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[0].click(); // Select the first option in the list
        }
        await page.keyboard.press('Escape');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();

        // Verify success alert
        const alertMessage = await page.waitForSelector('div[role="alert"]');
        const alertText = await alertMessage.innerText();
        expect(alertText).toBe('WaterShed mapping created successfully');

        await page.waitForTimeout(1000);
        await browser.close();
    });

});