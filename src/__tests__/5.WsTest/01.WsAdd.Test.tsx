import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed Master Automation', () => {
    // //test.describe.configure({ mode: 'serial' });

    test('01.Should check village dropdown visibility before choosing gram panchayath', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")');
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();

        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('New Watershed Name');
        await page.getByLabel('Description').fill('New Description');
        await page.getByLabel('District').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.getByLabel('Taluk').click();
        await page.click('ul[role="listbox"] li:first-child');
        // await page.getByLabel('Grampanchayat').click();
        // await page.click('ul[role="listbox"] li:first-child');

        // await page.getByLabel('Village').click();
        // Check if the TextField for "Village" is visible
        const villageDropdown = page.getByLabel('Village');
        // Check if the dropdown is visible
        const isVillageVisible = await villageDropdown.isVisible();
        console.log("Village dropdown visibility:", isVillageVisible);
        const isVillageDisabled = await villageDropdown.isDisabled();
        console.log("Village dropdown disabled state:", isVillageDisabled);
        expect(isVillageDisabled).toBe(true);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('02.Should check taluk dropdown visibility', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        // await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")');
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('New Watershed Name');
        await page.getByLabel('Description').fill('New Description');
        // await page.getByLabel('District').click();
        // await page.click('ul[role="listbox"] li:first-child');
        const TalukDropdown = page.getByLabel('Taluk');
        const isTalukVisible = await TalukDropdown.isDisabled();
        expect(isTalukVisible).toBe(true);
        console.log("Taluk dropdown visibility:", TalukDropdown);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('03.Should check the count of line item', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        // await page.waitForSelector('table');
        await page.waitForTimeout(1000);
        const rows = page.locator('tr');
        const rowCount = await rows.count();
        console.log('Number of rows:', rowCount);
        expect(rowCount).toBeGreaterThan(0);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Add watershed don't need the onchange error 
    test('04.Should check alphanumeric data for watershed name field', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        // await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")');
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('###2@@@');
        await page.getByLabel('Description').fill('New Description');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        console.log(await addButton.isEnabled());
        if (await addButton.isEnabled()) {
            expect(await addButton.isEnabled()).toBe(true);
            console.log("Add button Enable ")
            // await page.locator('button:has-text("Add")').nth(1).click();
            // const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            console.log("Add button is still disble ")
        }
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('05.Should check allow alphanumeric data for description field', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        // await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")');
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('New data');
        await page.getByLabel('Description').fill('&&*%%');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        console.log(await addButton.isEnabled());
        if (await addButton.isEnabled()) {
            expect(await addButton.isEnabled()).toBe(true);
            console.log("Add button Enable ")
            // await page.locator('button:has-text("Add")').nth(1).click();
            // const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            console.log("Add button is still disble ")
        }
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('06.Should check empty data for both name and description', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        // await page.waitForSelector('table');
        const addWSWDialogButton = page.locator('button:has-text("Add Watershed")');
        await expect(addWSWDialogButton).toBeVisible();
        await addWSWDialogButton.click();
        await page.waitForSelector('div[role="dialog"]');
        await page.getByLabel('Name').fill('');
        await page.getByLabel('Description').fill('');
        // const addButton = page.locator('button:has-text("Add")').nth(1);
        const addButton = page.locator('button:has-text("Add")').nth(1);
        console.log(await addButton.isEnabled());
        if (await addButton.isEnabled()) {
            expect(await addButton.isEnabled()).toBe(true);
            console.log("Add button Enable ")
            // await page.locator('button:has-text("Add")').nth(1).click();
            // const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            expect(await addButton.isDisabled()).toBe(true);

            console.log("Add button is still disble ")
        }
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('07.Should click the add icon and enter all details', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        await page.waitForSelector('table');

        const clickAddWs = page.locator('button:has-text("Add Watershed")');
        await clickAddWs.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Name').fill('TestingWatershed3'); //TestingWatershed1
        await dialog.getByLabel('Description').fill('New Description');
        await dialog.getByLabel('District').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 2nd district
        await dialog.getByLabel('Taluk').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await dialog.getByLabel('Grampanchayat').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await page.waitForTimeout(2000);
        await page.keyboard.press('Escape');

        // const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await expect(editIcon).toBeVisible();
        // await editIcon.click();
        // Scope the search for the input field inside the dialog
        // const dialog = await page.locator('div[role="dialog"]');
        // await dialog.getByLabel('Name').fill('New Watershed Name');
        // await dialog.getByLabel('Description').fill('New Description');
        // await dialog.getByLabel('District').click();
        // await page.click('ul[role="listbox"] li:first-child');
        // await dialog.getByLabel('Taluk').click();
        // await page.click('ul[role="listbox"] li:first-child');
        // await dialog.getByLabel('Grampanchayat').click();
        // await page.click('ul[role="listbox"] li:first-child');
        // await dialog.getByLabel('Village').click();
        // await page.click('ul[role="listbox"] li:first-child');
        // await page.waitForTimeout(2000);
        // await page.click('button:has-text("Add")').nth(1);;
        // await page.locator('button:has-text("Add")').nth(1).click();
        // Wait for the Snackbar to appear and validate its content
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // const toBe = alertMessage;
        // expect(alertMessage).toBe(toBe);
        // console.log('Alert Message:', alertMessage);

        const addButton = page.locator('button:has-text("Add")').nth(1);
        console.log(await addButton.isEnabled());
        if (await addButton.isEnabled()) {
            expect(await addButton.isEnabled()).toBe(true);
            console.log("Add button Enable ")
            // await page.locator('button:has-text("Add")').nth(1).click();
            // const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            expect(await addButton.isDisabled()).toBe(true);
            console.log("Add button is still disble ")
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('08.Should click the add icon and enter all details', async () => {
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
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        await page.waitForSelector('table');

        const clickAddWs = page.locator('button:has-text("Add Watershed")');
        await clickAddWs.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Name').fill('TestingWatershed3'); //TestingWatershed1
        await dialog.getByLabel('Description').fill('New Description');
        await dialog.getByLabel('District').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 2nd district
        await dialog.getByLabel('Taluk').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await dialog.getByLabel('Grampanchayat').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await page.keyboard.press('Escape');
        await page.waitForTimeout(2000);
        const cancelButton = page.locator('button:has-text("Cancel")').nth(0);
        console.log(await cancelButton.isEnabled());
        if (await cancelButton.isEnabled()) {
            expect(await cancelButton.isEnabled()).toBe(true);
            await page.waitForTimeout(2000);
            console.log("Cancel button Enable ")
            // await page.locator('button:has-text("Add")').nth(1).click();
            // const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            expect(await cancelButton.isDisabled()).toBe(true);
            console.log("Cancel button is still disble ")
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });


});