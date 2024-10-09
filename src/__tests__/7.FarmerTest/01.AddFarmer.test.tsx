import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Farmer add automation', () => {
    test.describe.configure({ mode: 'serial' });
    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('01.Should check add farmer icon visible in farmer screen', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('02.Should check add farmer icon clickable in farmer screen', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('03.Should click add farmer icon and check the validation', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Test Remarks');
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('123456789020');
        await page.getByRole('textbox', { name: 'Mobile' }).fill('9876543221');
        await page.waitForTimeout(2000);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('04.Should click add farmer icon and name is empty', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.getByRole('textbox', { name: 'Name' }).fill(''); // Empty name
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('123'); // Invalid Aadhar
        await page.getByRole('textbox', { name: 'Mobile' }).fill('98765'); // Invalid Mobile
        const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('05.Should click add farmer icon and Add button visible', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.getByRole('textbox', { name: 'Name' }).fill(''); // Empty name
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('123'); // Invalid Aadhar
        await page.getByRole('textbox', { name: 'Mobile' }).fill('98765'); // Invalid Mobile
        // Click Cancel button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.isVisible();
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('06.Should click add farmer icon and successfull alert message ', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Alluri reddy'); // Empty name
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341951'); // Invalid Aadhar
        await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887751'); // Invalid Mobile
        // Click Cancel button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        // Optionally, you can verify if a success message or alert appears
        const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
        if (await alertMessage.isVisible()) {
            const alertText = await alertMessage.innerText();
            console.log(alertText);
            expect(alertText).toBe('Farmer added'); // Verify success message
        }
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('07.Should click add farmer icon and duplicate error for number alert message ', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Alluri reddy'); // Empty name
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341951'); // Invalid Aadhar
        await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887751'); // Invalid Mobile
        // Click Cancel button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        // Optionally, you can verify if a success message or alert appears
        const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
        if (await alertMessage.isVisible()) {
            const alertText = await alertMessage.innerText();
            console.log(alertText);
            expect(alertText).toBe('Duplicate mobile number found: 9998887751'); // Verify success message
        }
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('08.Should click add farmer icon and fill empty for all field ', async () => {
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
        const addFarmer = page.locator('button:has-text("Add Farmer")');
        await addFarmer.click();
        await page.getByRole('textbox', { name: 'Name' }).fill('');
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('');
        await page.getByRole('textbox', { name: 'Mobile' }).fill('');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        if (await addButton.isEnabled()) {
            console.log("Button Disabled");
        }
        else {
            console.log("Button Abled");
        }
        await page.waitForTimeout(2000);
        await browser.close();
    });

});
