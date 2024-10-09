import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Farmer delete automation', () => {
    test.describe.configure({ mode: 'serial' });
    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('01.Should check delete farmer icon visible in farmer screen', async () => {
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
        const FarmerMasterButton = page.locator('text=Farmer Master');
        await FarmerMasterButton.click();
        await page.waitForTimeout(5000);
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const DeleteIcon = userRow.locator('[data-testid="DeleteIcon"]');
        await DeleteIcon.isVisible();

        // const addFarmer = page.locator('button:has-text("Add Farmer")');
        // await addFarmer.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('02.Should check delete farmer icon and click delete cancel button in farmer screen', async () => {
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
        const FarmerMasterButton = page.locator('text=Farmer Master');
        await FarmerMasterButton.click();
        await page.waitForTimeout(5000);
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const DeleteIcon = userRow.locator('[data-testid="DeleteIcon"]');
        await DeleteIcon.isVisible()
        await DeleteIcon.click();

        const confirmButton = page.locator('button', { hasText: 'Cancel' });
        await confirmButton.click();
        // const successMessage = page.locator('text=Farmer deleted');
        // await expect(successMessage).toBeVisible();
        // const addFarmer = page.locator('button:has-text("Add Farmer")');
        // await addFarmer.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

});