
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed mapping edit automation', () => {

    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('Should check eidt icon visible in watershed mapping', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.isVisible();

        // const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        // await addWsAddWsMappingIcon.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should check edit icon clickable in watershed mapping', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();

        // const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
        // await addWsAddWsMappingIcon.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should check edit icon and check the username disabled watershed mapping', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.waitForSelector('dialog');
        const userNameDropdown = page.locator('#user');
        await userNameDropdown.isEnabled();        // await page.waitForSelector('ul[role="listbox"]');
        // const userNameOption = await page.$$('ul[role="listbox"] > li');
        // if (userNameOption.length > 0) {
        //     await userNameOption[0].click();
        // }

        await page.fill('input#remarks', 'Test Remarks');

        // const wsNameDropdown = page.locator('#ws_name');
        // await wsNameDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]');
        // const watershedOptions = await page.$$('ul[role="listbox"] > li');
        // if (watershedOptions.length > 0) {
        //     await watershedOptions[0].click(); // Select the first option in the list
        // }
        // const cancelButton = page.locator('button:has-text("Cancel")');
        // await cancelButton.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should add Watershed Mapping add visible the update button', async () => {
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
        await page.waitForTimeout(5000);
        
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        
        // // Fill in the form
        // const loginTypeDropdown = page.locator('#user');
        // await loginTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]');
        // const userNameOption = await page.$$('ul[role="listbox"] > li');
        // if (userNameOption.length > 0) {
        //     await userNameOption[0].click();
        // }
    
        await page.fill('input#remarks', 'Test Remarks');
    
        // Select the first value from the Watershed Name dropdown
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[1].click(); // Select the first option in the list
        }
    
        // Click Add button
        const addButton = page.locator('button:has-text("Update")').nth(1);
        await addButton.isVisible();
    
        // // Verify alert message
        // const alertMessage = await page.waitForSelector('div[role="alert"]'); // Adjust the selector for the alert message
        // const alertText = await alertMessage.innerText();
        // expect(alertText).toBe('WaterShed mapping created successfully');
    
        await page.waitForTimeout(1000);
        await browser.close();
    });


    test('Should edit Watershed Mapping add visible the cancel button', async () => {
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
        await page.waitForTimeout(5000);
        
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        
        // // Fill in the form
        // const loginTypeDropdown = page.locator('#user');
        // await loginTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]');
        // const userNameOption = await page.$$('ul[role="listbox"] > li');
        // if (userNameOption.length > 0) {
        //     await userNameOption[0].click();
        // }
    
        await page.fill('input#remarks', 'Test Remarks');
    
        // Select the first value from the Watershed Name dropdown
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[1].click(); // Select the first option in the list
        }
    
        // Click Add button
        const addButton = page.locator('button:has-text("Cancel")').nth(1);
        await addButton.isVisible();
    
        // // Verify alert message
        // const alertMessage = await page.waitForSelector('div[role="alert"]'); // Adjust the selector for the alert message
        // const alertText = await alertMessage.innerText();
        // expect(alertText).toBe('WaterShed mapping created successfully');
    
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should edit Watershed Mapping and show success alert', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        const loginTypeDropdown = page.locator('#user');
        await loginTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const userNameOption = await page.$$('ul[role="listbox"] > li');
        if (userNameOption.length > 0) {
            await userNameOption[0].click();
        }
        await page.fill('input#remarks', 'Test Remarks');
        const wsNameDropdown = page.locator('#ws_name');
        await wsNameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]');
        const watershedOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedOptions.length > 0) {
            await watershedOptions[0].click(); // Select the first option in the list
        }
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        const alertMessage = await page.waitForSelector('div[role="alert"]'); // Adjust the selector for the alert message
        const alertText = await alertMessage.innerText();
        expect(alertText).toBe('WaterShed mapping updated successfully');
        await page.waitForTimeout(1000);
        await browser.close();
    });
});