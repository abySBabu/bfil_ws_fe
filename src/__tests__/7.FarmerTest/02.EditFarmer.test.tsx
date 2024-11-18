import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Farmer add automation', () => {
    //test.describe.configure({ mode: 'serial' });
    // test.beforeEach(async ({ page }) => {
    //     // Navigate to the page containing the dialog
    //     await page.goto('http://localhost:3000'); // Update with your actual URL
    // });

    //Test Number : 1
    test('01.Should check edit farmer icon visible in farmer screen', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.isVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('02.Should check edit farmer icon clickable in farmer screen', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('03.Should click edit farmer icon and edit data farmer screen', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('04.Should click edit farmer icon and name is empty', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.locator('xpath=//*[@id=":rh:"]').clear();
        // await page.locator('xpath=//*[@id=":rj:"]').fill('     ');
        const mobileValidationMessage = await page.getByText('Name cannot be empty');
        expect(await mobileValidationMessage.isDisabled()); // Validate error message for Mobile
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('05.Should click edit farmer icon and update button visible', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');
        // Click Cancel button
        const addButton = page.locator('button:has-text("Update")');
        await expect(await addButton.isDisabled()).toBe(false);
        // await addButton.isDisabled();
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });


    // test.only('Check empty values in line items and handle pagination', async () => {
    //     test.setTimeout(800000);

    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });

    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();

    //     // Navigate and log in
    //     await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');


    //     //await page.goto('http://localhost:3000/bfilreactdev');

    //     await page.fill('input#userName', '8877199197');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     // await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    //     //await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });

    //     await page.waitForTimeout(3000);

    //     // Navigate to "Farmer Master"
    //     const FarmerMasterButton = page.locator('text=Beneficiary Master').first();
    //     await FarmerMasterButton.click();
    //     await page.waitForTimeout(5000);

    //     // Function to check for null/empty rows and log the index
    //     async function checkTableRowsForNulls() {
    //         const rows = page.locator('tr'); // All rows in the table
    //         const rowCount = await rows.count(); // Get the total number of rows

    //         for (let i = 1; i < rowCount; i++) { // Start from 1 to skip the header row
    //             const row = rows.nth(i);
    //             const columns = row.locator('td'); // All columns in the row
    //             const columnCount = await columns.count(); // Number of columns in the row

    //             let isEmptyRow = false;

    //             // Loop through each column
    //             for (let j = 0; j < columnCount; j++) {
    //                 const cellValue = await columns.nth(j).textContent();
    //                 console.log("Printing :" + cellValue);
    //                 if (cellValue === null || cellValue.trim() === '') {
    //                     console.log(`Row ${i}, Column ${j} contains a null or empty value.`);
    //                     isEmptyRow = true;
    //                 }
    //             }

    //             // If a row contains any null values, return the index and stop checking
    //             if (isEmptyRow) {
    //                 console.log(`Row ${i} is null or empty.`);
    //                 return i;
    //             }
    //         }
    //         return -1; // Return -1 if no null rows were found
    //     }

    //     // Main loop to check all pages
    //     let hasNextPage = true;

    //     while (hasNextPage) {
    //         // Check the current page for null values
    //         const nullRowIndex = await checkTableRowsForNulls();

    //         // If a null row is found, perform any required action here
    //         if (nullRowIndex !== -1) {
    //             console.log(`Null row found at index: ${nullRowIndex}`);
    //             // Example: Click the edit button if needed
    //             const editButton = page.locator(`tr:nth-child(${nullRowIndex + 1}) td:last-child button[title="Edit farmer"]`);
    //             await editButton.click();
    //             break; // Stop further pagination if necessary
    //         }

    //         // Check if the "Next Page" button is visible and enabled for pagination
    //         const nextButton = page.locator('.MuiTablePagination-actions button[aria-label="Next Page"]');
    //         const isNextVisible = await nextButton.isVisible();
    //         const isNextEnabled = await nextButton.isEnabled();

    //         if (isNextVisible && isNextEnabled) {
    //             await nextButton.click(); // Move to the next page
    //             await page.waitForTimeout(2000); // Wait for the page to load
    //         } else {
    //             hasNextPage = false; // No more pages to check
    //         }
    //     }
    //     await browser.close();
    // });

    test('05.Should check the close button working', async () => {
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
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');
        // Click Cancel button
        const addButton = page.locator('button:has-text("Cancel")');
        await addButton.click();
        // await expect(await addButton.isDisabled()).toBe(false);
        // await addButton.isDisabled();
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

    test('06.Should check the search bar working', async () => {
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
        //        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');

        const inputField = page.locator('xpath=//*[@id=":r9:"]'); // Escaping the ID
        await inputField.waitFor({ state: 'visible' });
        await inputField.fill('a');
        const userRow = page.locator('tr').nth(1);
        console.log("Hi this mapping testing " + userRow);
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await editIcon.click();
        await page.locator('xpath=//*[@id=":rj:"]').fill('6384742615');
        await page.locator('xpath=//*[@id=":rp:"]').fill('Hardy');
        await page.locator('xpath=//*[@id=":rr:"]').fill('Testing');
        // Click Cancel button
        const addButton = page.locator('button:has-text("Cancel")');
        await addButton.click();
        // await expect(await addButton.isDisabled()).toBe(false);
        // await addButton.isDisabled();
        // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
        // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);
        await browser.close();
    });

});
