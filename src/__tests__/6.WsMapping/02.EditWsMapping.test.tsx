
import { test, expect, chromium, Page } from '@playwright/test';
import exp from 'constants';

test.describe('Watershed mapping edit automation', () => {
    //test.describe.configure({ mode: 'serial' });
    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('01.Should check edit icon visible in watershed mapping screen', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.isVisible();
        // const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        // await addWsAddWsMappingIcon.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('02.Should check edit icon clickable in watershed mapping', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();

        // const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        // await addWsAddWsMappingIcon.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('03.Should check edit icon and check the username disabled watershed mapping', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.waitForSelector('dialog');
        const userNameDropdown = page.locator('#user');
        const isAddButtonEnabled = await userNameDropdown.isDisabled();
        await expect(isAddButtonEnabled).toBe(true);
        // await userNameDropdown.isDisabled();
        await page.fill('input#remarks', 'Test Remarks');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('04.Should edit Watershed Mapping add visible the update button', async () => {
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
        await page.waitForTimeout(5000);

        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.fill('input#remarks', 'Test Remarks');
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[1].click();
        }
        await page.keyboard.press('Escape');
        const addButton = page.locator('button:has-text("Update")').nth(0);
        const isAddButtonEnabled = await addButton.isEnabled();
        await expect(isAddButtonEnabled).toBe(true);
        // await addButton.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('05.Should edit Watershed Mapping add visible the cancel button', async () => {
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
        await page.waitForTimeout(5000);

        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.fill('input#remarks', 'Test Remarks');

        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[1].click(); // Select the first option in the list
        }
        await page.keyboard.press('Escape');
        // Click Add button
        const addButton = page.locator('button:has-text("Cancel")').nth(1);
        await addButton.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('06.Should check the search bar is working in Watershed Mapping', async () => {
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
        const inputField = page.locator('xpath=//*[@id=":r5:"]'); // Escaping the ID
        await inputField.waitFor({ state: 'visible' });
        await inputField.fill('a');
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.fill('input#remarks', 'Test Remarks');

        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[1].click(); // Select the first option in the list
        }
        await page.keyboard.press('Escape');
        // Click Add button
        const addButton = page.locator('button:has-text("Cancel")').nth(1);
        await addButton.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });
});