import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed Master Automation', () => {

    // test.only('should click the edit icon in the table row', async () => {
    //     test.setTimeout(800000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();
    //     await page.goto('http://localhost:3000/bfilreact');
    //     await page.fill('input#userName', '9677694732');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    //     await page.reload();
    //     const userManagementButton = page.locator('text=Watershed Master');
    //     await userManagementButton.click();
    //     await page.waitForSelector('table');
    //     const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
    //     await expect(editIcon).toBeVisible();
    //     await editIcon.click();
    //     // Scope the search for the input field inside the dialog
    //     const dialog = await page.locator('div[role="dialog"]');
    //     await dialog.getByLabel('Name').fill('New Watershed Name');
    //     await dialog.getByLabel('Description').fill('New Description');
    //     await dialog.getByLabel('District').click();
    //     await page.click('ul[role="listbox"] li:first-child');
    //     await dialog.getByLabel('Taluk').click();
    //     await page.click('ul[role="listbox"] li:first-child');
    //     await dialog.getByLabel('Grampanchayat').click();
    //     await page.click('ul[role="listbox"] li:first-child');
    //     await dialog.getByLabel('Village').click();
    //     await page.click('ul[role="listbox"] li:first-child');
    //     await page.waitForTimeout(2000);
    //     // await page.click('button:has-text("Add")').nth(1);;
    //     await page.locator('button:has-text("Add")').nth(1).click();
    //     // Wait for the Snackbar to appear and validate its content
    //     const alertMessage = await page.locator('.MuiAlert-message').innerText();
    //     const toBe = alertMessage;
    //     expect(alertMessage).toBe(toBe);
    //     console.log('Alert Message:', alertMessage);
    //     await browser.close();
    // });


    test('Should check village dropdown visibility', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('New Watershed Name');
        await page.getByLabel('Description').fill('New Description');
        await page.getByLabel('District').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.getByLabel('Taluk').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.getByLabel('Grampanchayat').click();
        await page.click('ul[role="listbox"] li:first-child');

        // await page.getByLabel('Village').click();
        // Check if the TextField for "Village" is visible
        const villageDropdown = page.getByLabel('Village');
        const isVillageVisible = await villageDropdown.isVisible();
        // 
        console.log("Village dropdown visibility:", isVillageVisible);
        const isVillageDropdown = await villageDropdown.isEnabled();
        expect(isVillageDropdown).toBe(false);
        // // Check if the 'Village' dropdown contains any options
        // const villageOptionsCount = await page.locator('ul[role="listbox"] li').count();

        // if (villageOptionsCount > 0) {
        //     console.log(`Village dropdown contains ${villageOptionsCount} options.`);
        //     // Optionally, you can interact with the options here
        //     await page.click('ul[role="listbox"] li:first-child'); // Select first option if needed
        // } else {
        //     console.log('Village dropdown is empty or has no options.');
        // }
        // await page.click('ul[role="listbox"] li:first-child');
        // await page.waitForTimeout(2000);
        // await page.click('button:has-text("Add")').nth(1);;
        // await page.locator('button:has-text("Add")').nth(1).click();
        // Wait for the Snackbar to appear and validate its content
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // expect(alertMessage).toBe('Watershed added');
        // console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(2000);

        await browser.close();
    });


    test('Should check taluk dropdown visibility', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('New Watershed Name');
        await page.getByLabel('Description').fill('New Description');
        await page.getByLabel('District').click();
        await page.click('ul[role="listbox"] li:first-child');
        const TalukDropdown = page.getByLabel('Taluk');
        const isTalukVisible = await TalukDropdown.isVisible();
        expect(isTalukVisible).toBe(true);
        console.log("Taluk dropdown visibility:", TalukDropdown);
        await page.waitForTimeout(2000);

        await browser.close();
    });

    test('Should check the count of line item', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master');
        await userManagementButton.click();
        await page.waitForSelector('table');
        await page.waitForTimeout(1000);
        const rows = page.locator('tr');
        const rowCount = await rows.count();
        console.log('Number of rows:', rowCount);
        expect(rowCount).toBeGreaterThan(0);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    test('Should check allow alphanumeric data for name', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('###2@@@');
        await page.getByLabel('Description').fill('New Description');

        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should check allow alphanumeric data for description', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('New data');
        await page.getByLabel('Description').fill('&&*%%');

        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should check empty data for both name and description', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master');
        await userManagementButton.click();
        await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('');
        await page.getByLabel('Description').fill('');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        const isAddButtonVisible = await addButton.isVisible();
        console.log("Is the 'Add' button visible:", isAddButtonVisible);

        // Check if the button is enabled (should be false because it's disabled)
        const isAddButtonEnabled = await addButton.isEnabled();
        console.log("Is the 'Add' button enabled:", isAddButtonEnabled);
        await page.waitForTimeout(2000);
        await browser.close();
    });


});