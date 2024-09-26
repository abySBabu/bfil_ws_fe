
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed Master Edit Automation', () => {

    test('Should click the edit icon in the table row', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

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

        // const villageDropdown = page.getByLabel('Village');
        // const isVillageVisible = await villageDropdown.isVisible();
        // // 
        // console.log("Village dropdown visibility:", isVillageVisible);
        // const isVillageDropdown = await villageDropdown.isEnabled();
        // expect(isVillageDropdown).toBe(false);

        // await page.click('button:has-text("Add")').nth(1);;
       // await page.locator('button:has-text("Add")').nth(1).click();
        // Wait for the Snackbar to appear and validate its content
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // const toBe = alertMessage;
        // expect(alertMessage).toBe(toBe);
        // console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should click the edit icon and check the village dropdown ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

        const villageDropdown = page.getByLabel('Village');
        const isVillageVisible = await villageDropdown.isVisible();
        console.log("Village dropdown visibility:", isVillageVisible);
        const isVillageDropdown = await villageDropdown.isEnabled();
        expect(isVillageDropdown).toBe(true);

        // await page.click('button:has-text("Add")').nth(1);;
       // await page.locator('button:has-text("Add")').nth(1).click();
        // Wait for the Snackbar to appear and validate its content
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // const toBe = alertMessage;
        // expect(alertMessage).toBe(toBe);
        // console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(2000);
        await browser.close();
    });


    test('should click the edit icon and check Name and Description is empty', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Name').fill('');
        await dialog.getByLabel('Description').fill('');
        await page.waitForTimeout(2000);
        await browser.close();
    });


    test('Should click the edit icon and choose village data ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();

        const dialog = await page.locator('div[role="dialog"]');
        // await dialog.getByLabel('Name').fill('New Watershed Name');
        // await dialog.getByLabel('Description').fill('New Description');
        // await dialog.getByLabel('District').click();
        // await page.click('ul[role="listbox"] li:first-child');
        // await dialog.getByLabel('Taluk').click();
        // await page.click('ul[role="listbox"] li:first-child');
        // await dialog.getByLabel('Grampanchayat').click();
        // await page.click('ul[role="listbox"] li:first-child');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:first-child');
        await page.waitForTimeout(2000);

        // const villageDropdown = page.getByLabel('Village');
        // const isVillageVisible = await villageDropdown.isVisible();
        // // 
        // console.log("Village dropdown visibility:", isVillageVisible);
        // const isVillageDropdown = await villageDropdown.isEnabled();
        // expect(isVillageDropdown).toBe(false);

        // await page.click('button:has-text("Add")').nth(1);;
       // await page.locator('button:has-text("Add")').nth(1).click();
        // Wait for the Snackbar to appear and validate its content
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // const toBe = alertMessage;
        // expect(alertMessage).toBe(toBe);
        // console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test.only('Should click the edit icon and check the successful message ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:first-child');

        // await page.click('button:has-text("Add")').nth(1);;
    //    await page.locator('button:has-text("Update")').nth(1).click();
        // Wait for the Snackbar to appear and validate its content
        const wsName = await page.locator('div:has-text("Name") input').nth(0).getAttribute('value');

        await page.click('button:has-text("Update")');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        expect(alertMessage).toBe(`Watershed ${wsName} updated`);
        await page.waitForTimeout(2000);
        await browser.close();
    });
});