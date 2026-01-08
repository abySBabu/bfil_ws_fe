import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Farmer add automation', () => {
    //test.describe.configure({ mode: 'serial' });
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
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        await page.waitForTimeout(5000);
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        const isAddButtonEnabled = await addFarmer.isEnabled();
        await expect(isAddButtonEnabled).toBe(true);
        // await addFarmer.isVisible();
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
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        await page.waitForTimeout(5000);
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        await addFarmer.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('03.Should click add farmer icon and check the validation then check the button visibility', async () => {
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

        // Navigate to Beneficiary Master
        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        // Open Add Beneficiary form
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        await addFarmer.click();
        const dialog = page.locator('div[role="dialog"]');
        await page.locator('xpath=//*[@id=":rh:"]').fill('John Doe');
        // await page.locator('input[placeholder="Name *"]').fill('John Doe');

        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');

        // Click the dropdown to open it
        // await page.locator('div[role="combobox"][id=":rl:"]').click();
        await page.locator('div[role="combobox"]:visible').nth(1).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(3).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(4).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(5).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(6).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();
        const addButton = page.locator('button:has-text("Add")').nth(1);
        const isAddButtonEnabled = await addButton.isEnabled();
        await expect(isAddButtonEnabled).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('04.Should click add farmer icon and check the validation then check the cancel button visibility', async () => {
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
        // Navigate to Beneficiary Master
        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        // Open Add Beneficiary form
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        await addFarmer.click();
        const dialog = page.locator('div[role="dialog"]');
        await page.locator('xpath=//*[@id=":rh:"]').fill('John Doe');
        // await page.locator('input[placeholder="Name *"]').fill('John Doe');

        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');

        // Click the dropdown to open it
        // await page.locator('div[role="combobox"][id=":rl:"]').click();
        await page.locator('div[role="combobox"]:visible').nth(1).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(3).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(4).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(5).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(6).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();
        const addButton = page.locator('button:has-text("Cancel")').nth(0);
        const isAddButtonEnabled = await addButton.isEnabled();
        await expect(isAddButtonEnabled).toBe(true);
        await addButton.click();
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
        // await page.goto('http://localhost:3000/bfilreactdev');
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        await page.waitForTimeout(2000);
        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        await addFarmer.click();
        await page.locator('xpath=//*[@id=":rj:"]').fill(' ');
        // Get the actual text content of the validation message
        const mobileValidationMessage = await page.locator('text="Mobile number should have 10 digits"').textContent();
        await expect(mobileValidationMessage).toBe("Mobile number should have 10 digits");
        await expect(await page.locator('text="Mobile number should have 10 digits"').isVisible()).toBeTruthy();
        await page.waitForTimeout(2000);
        await browser.close();
    });

    // test('05.Should click add farmer icon and Add button visible', async () => {
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
    //     const FarmerMasterButton = page.locator('text=Farmer Master').first();
    //     await FarmerMasterButton.click();
    //     await page.waitForTimeout(5000);
    //     const addFarmer = page.locator('button:has-text("Add Farmer")');
    //     await addFarmer.click();
    //     await page.getByRole('textbox', { name: 'Name' }).fill(''); // Empty name
    //     await page.getByRole('textbox', { name: 'Aadhar' }).fill('123'); // Invalid Aadhar
    //     await page.getByRole('textbox', { name: 'Mobile' }).fill('98765'); // Invalid Mobile
    //     // Click Cancel button
    //     const addButton = page.locator('button:has-text("Add")').nth(1);
    //     await addButton.isVisible();
    //     // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
    //     // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
    //     await page.waitForTimeout(2000);
    //     await browser.close();
    // });

    test('08.Should click add farmer icon and fill empty for all field ', async () => {
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

        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        await addFarmer.click();
        await page.locator('xpath=//*[@id=":rh:"]').fill('John Doe');
        // await page.locator('input[placeholder="Name *"]').fill('John Doe');
        await page.locator('xpath=//*[@id=":rj:"]').fill(' ');
        await page.locator('xpath=//*[@id=":rp:"]').fill(' ');
        await page.locator('xpath=//*[@id=":rr:"]').fill(' ');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await expect(await addButton.isEnabled()).toBe(false);
        // if (await addButton.isEnabled()) {
        //     console.log("Button Disabled");
        // }
        // else {
        //     console.log("Button Abled");
        // }
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('09.Should click add farmer icon and check the validation when choose village before checking grampanchayath', async () => {
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

        // Navigate to Beneficiary Master
        const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
        await FarmerMasterButton.click();
        // Open Add Beneficiary form
        const addFarmer = page.locator('button:has-text("Add Beneficiary")');
        await addFarmer.click();
        const dialog = page.locator('div[role="dialog"]');
        await page.locator('xpath=//*[@id=":rh:"]').fill('John Doe');
        // await page.locator('input[placeholder="Name *"]').fill('John Doe');

        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');

        // Click the dropdown to open it
        // await page.locator('div[role="combobox"][id=":rl:"]').click();
        await page.locator('div[role="combobox"]:visible').nth(1).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(3).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        await page.locator('div[role="combobox"]:visible').nth(4).click();  // Click the first visible combo box
        await page.waitForSelector('[role="option"]', { state: 'visible' });
        await page.locator('[role="option"]').nth(0).click();

        // await page.locator('div[role="combobox"]:visible').nth(5).click();  // Click the first visible combo box
        // await page.waitForSelector('[role="option"]', { state: 'visible' });
        // await page.locator('[role="option"]').nth(0).click();

        const comboBoxLocator = page.locator('div[role="combobox"]:visible').nth(6);

        // Check if the combo box is visible
        const isComboBoxVisible = await comboBoxLocator.isEnabled();
        if (isComboBoxVisible) {
            // Click the combo box if visible
            await comboBoxLocator.click();

            // Wait for the options to become visible
            await page.waitForSelector('[role="option"]', { state: 'visible' });

            // Click the first option
            await page.locator('[role="option"]').nth(0).click();
        } else {
            await expect(isComboBoxVisible).toBe(false);
            console.log('Combo box is not visible');
        }

        const addButton = page.locator('button:has-text("Add")').nth(1);
        const isAddButtonEnabled = await addButton.isEnabled();
        await expect(isAddButtonEnabled).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });


});
