
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed Master Edit Automation', () => {
    //test.describe.configure({ mode: 'serial' });
    test('01.Should click the edit icon in the table row', async () => {
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
        // Navigate to the "Watershed Master" module
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        await page.waitForSelector('table');

        // Get the initial count of rows in the table
        const rows = await page.locator('table tbody tr');
        const initialCount = await rows.count();
        console.log('Initial Row Count:', initialCount);

        // Ensure there is at least one row to edit
        expect(initialCount).toBeGreaterThan(0);

        // Perform the edit operation
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

        // Additional steps for the edit operation can be added here

        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('02.Should click the edit icon and check the village dropdown ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Name').fill('TestingWatershed');
        await dialog.getByLabel('Description').fill('New Description');
        await dialog.getByLabel('District').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 2nd district
        await dialog.getByLabel('Taluk').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await dialog.getByLabel('Grampanchayat').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        // await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    // test.only('03.Should click the edit icon and fill null value Name and Description', async () => {
    //     test.setTimeout(800000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();
    //     //         await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    //    //await page.goto('http://localhost:3000/bfilreactdev');

    //     //await page.goto('http://localhost:3000/bfilreactdev');

    //     await page.fill('input#userName', '8877199197');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     // await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    //     //await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });

    //     await page.waitForTimeout(3000);
    //     const userManagementButton = page.locator('text=Watershed Master').first();
    //     await userManagementButton.click();
    //     await page.waitForSelector('table');
    //     const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
    //     await expect(editIcon).toBeVisible();
    //     await editIcon.click();

    //     const dialog = await page.locator('div[role="dialog"]');
    //     await dialog.getByLabel('Name').fill('');
    //     await dialog.getByLabel('Description').fill('');
    //     await page.waitForTimeout(2000);
    //     await browser.close();
    // });

    test('03.Should click the edit icon and fill null value Name and Description', async () => {
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
        // Navigate to the "Watershed Master" module
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        await page.waitForSelector('table');

        // Click the edit icon
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

        // Locate the dialog and fill null values
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Name').fill('');
        await dialog.getByLabel('Description').fill('');

        // Validate the error messages
        const nameErrorText = await dialog.locator('text=Watershed name cannot be empty').innerText();
        const descriptionErrorText = await dialog.locator('text=Watershed description cannot be empty').innerText();

        // Assert the error messages are correct
        await expect(nameErrorText).toBe('Watershed name cannot be empty');
        await expect(descriptionErrorText).toBe('Watershed description cannot be empty');

        // Print the error messages (optional for debugging)
        console.log('Name Error Message:', nameErrorText);
        console.log('Description Error Message:', descriptionErrorText);
        await browser.close();
    });

    test('03.Should click the edit icon and fill null value Name and Description, then check the button visiblitiy', async () => {
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
        // Navigate to the "Watershed Master" module
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        await page.waitForSelector('table');

        // Click the edit icon
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

        // Locate the dialog and fill null values
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Name').fill('');
        await dialog.getByLabel('Description').fill('');

        // Validate the error messages
        const nameErrorText = await dialog.locator('text=Watershed name cannot be empty').innerText();
        const descriptionErrorText = await dialog.locator('text=Watershed description cannot be empty').innerText();

        // Assert the error messages are correct
        await expect(nameErrorText).toBe('Watershed name cannot be empty');
        await expect(descriptionErrorText).toBe('Watershed description cannot be empty');

        // Print the error messages (optional for debugging)
        console.log('Name Error Message:', nameErrorText);
        console.log('Description Error Message:', descriptionErrorText);


        const addButton = page.locator('button:has-text("Update")').nth(0);
        console.log(await addButton.isEnabled());
        console.log(await addButton.isVisible());
        console.log(await addButton.isHidden());
        if (await addButton.isEnabled()) {
            //  await page.locator('button:has-text("Add")').nth(1).click();
            //     const alertMessage = await page.locator('.MuiAlert-message').innerText();
            //     expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            await expect(await addButton.isDisabled()).toBe(true);
            console.log("Add button is still disble ")
        }

        await browser.close();
    });

    test('04.Should click the edit icon and choose village data before choosing the hirarchy', async () => {
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
        // Get the initial count of rows in the table
        const rows = await page.locator('table tbody tr');
        const initialCount = await rows.count();
        console.log('Initial Row Count:', initialCount);
        // Ensure there is at least one row to edit
        expect(initialCount).toBeGreaterThan(0);
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.waitForTimeout(2000);
        const addButton = page.locator('button:has-text("Update")').nth(0);
        console.log(await addButton.isEnabled());
        console.log(await addButton.isVisible());
        console.log(await addButton.isHidden());
        if (await addButton.isEnabled()) {
            await expect(await addButton.isVisible()).toBe(true);

            //  await page.locator('button:has-text("Add")').nth(1).click();
            //     const alertMessage = await page.locator('.MuiAlert-message').innerText();
            //     expect(alertMessage).toBe(`Watershed added`);
        }
        else {
            await expect(await addButton.isDisabled()).toBe(true);
            console.log("Add button is still disble ")
        }
        await page.waitForTimeout(2000);
        await browser.close();
    });


    test('05.Should click the cancel icon ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.keyboard.press('Escape');
        await page.click('button:has-text("Cancel")');
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('06.Should check the search bar in watershed master screen ', async () => {
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
        const inputField = page.locator('xpath=//*[@id=":r9:"]'); // Escaping the ID
        await inputField.waitFor({ state: 'visible' });
        await inputField.fill('a');
        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.keyboard.press('Escape');
        await page.click('button:has-text("Cancel")');
        await page.waitForTimeout(2000);
        await browser.close();
    });

});