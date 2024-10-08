import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Farmer add automation', () => {

    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('Should check add farmer icon visible in farmer screen', async () => {
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
    test('Should check add farmer icon clickable in farmer screen', async () => {
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
    test('Should click add farmer icon and add data farmer screen', async () => {
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
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('123456789012');
        await page.getByRole('textbox', { name: 'Mobile' }).fill('9876543210');
        await page.waitForTimeout(2000);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should click add farmer icon and name is empty', async () => {
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

    test('Should click add farmer icon and Add button visible', async () => {
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

    test('Should click add farmer icon and successfull alert message ', async () => {
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
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341991'); // Invalid Aadhar
        await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887776'); // Invalid Mobile
        // Click Cancel button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        // Optionally, you can verify if a success message or alert appears
        const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
        if (await alertMessage.isVisible()) {
            const alertText = await alertMessage.innerText();
            console.log(alertText);
            expect(alertText).toBe('Farmer added successfully'); // Verify success message
        }
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should click add farmer icon and duplicate error alert message ', async () => {
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
        await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341991'); // Invalid Aadhar
        await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887777'); // Invalid Mobile
        // Click Cancel button
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        // Optionally, you can verify if a success message or alert appears
        const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
        if (await alertMessage.isVisible()) {
            const alertText = await alertMessage.innerText();
            console.log(alertText);
            expect(alertText).toBe('Duplicate Aadhaar number found: 735082341991'); // Verify success message
        }
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('Should click add farmer icon and fill empty for all field ', async () => {
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
