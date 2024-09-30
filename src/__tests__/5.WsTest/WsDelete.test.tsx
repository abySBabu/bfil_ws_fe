
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Watershed Master Delete Automation', () => {

    test('Should click the delete icon in the table row', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should click the confirmation delete icon ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const confirmButton = page.locator('button', { hasText: 'Delete' });
        await confirmButton.isVisible();
        await page.waitForTimeout(2000);
        await browser.close();
    });


    test('Should click the confirmation cancel icon ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        const confirmButton = page.locator('button', { hasText: 'Cancel' });
        await confirmButton.isVisible();
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should click the delete icon and check the successful message ', async () => {
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
        // const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await expect(editIcon).toBeVisible();
        // await editIcon.click();
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(deleteIcon).toBeVisible();
        await deleteIcon.click();
        const confirmButton = page.locator('button', { hasText: 'Delete' });
        await confirmButton.isVisible();

        await page.click('button:has-text("Update")');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        expect(alertMessage).toBe(`Watershed deleted`);
        await page.waitForTimeout(2000);
        await browser.close();
    });


    test('Should click the cancel icon ', async () => {
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
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(editIcon).toBeVisible();
        await editIcon.click();
        await page.click('button:has-text("Cancel")');
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // expect(alertMessage).toBe(`Watershed ${wsName} updated`);
        await page.waitForTimeout(2000);
        await browser.close();
    });
});