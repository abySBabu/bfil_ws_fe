
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed Master Delete Automation', () => {
    //test.describe.configure({ mode: 'serial' });
    // test('01.Should click the delete icon in the table row', async () => {
    //     test.setTimeout(800000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();
    //     await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');


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
    //     const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
    //     await expect(deleteIcon).toBeVisible();
    //     //  await deleteIcon.click();
    //     await page.waitForTimeout(2000);
    //     await browser.close();
    // });


    test('01.Should click the delete icon in the table row', async () => {
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

        // Navigate to "Watershed Master" module
        const userManagementButton = page.locator('text=Watershed Master').first();
        await userManagementButton.click();
        await page.waitForSelector('table');

        // Get the initial row count
        const tableRows = page.locator('table tbody tr');
        const initialRowCount = await tableRows.count();
        console.log('Initial Row Count:', initialRowCount);

        // Locate and click the delete icon in the first row
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(deleteIcon).toBeVisible();
        await deleteIcon.click();

        // Wait for the deletion to complete
        await page.waitForTimeout(2000);

        // // Get the row count after deletion
        // const finalRowCount = await tableRows.count();
        // console.log('Final Row Count:', finalRowCount);

        // // Verify the row count decreased by one
        // expect(finalRowCount).toBe(initialRowCount - 1);

        await browser.close();
    });

    test('02.Should click the confirmation delete icon and check the visibility of delete', async () => {
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

        // Get the initial row count
        const tableRows = page.locator('table tbody tr');
        const initialRowCount = await tableRows.count();
        console.log('Initial Row Count:', initialRowCount);
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const confirmButton = page.locator('button', { hasText: 'Delete' });
        await confirmButton.isVisible();
        await page.waitForTimeout(2000);
        await browser.close();
    });


    test('03.Should click the confirmation cancel icon ', async () => {
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

        // Get the initial row count
        const tableRows = page.locator('table tbody tr');
        const initialRowCount = await tableRows.count();
        console.log('Initial Row Count:', initialRowCount);
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const confirmButton = page.locator('button', { hasText: 'Cancel' });
        await confirmButton.isVisible();
        await confirmButton.click();
        await page.waitForTimeout(2000);
        await browser.close();
    });

});