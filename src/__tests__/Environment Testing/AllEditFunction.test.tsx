// // import { test, expect, chromium, Page } from '@playwright/test';

// // test.describe('User Management Automation', () => {
// //     // //Test Number : 8
// //     test('08.Should edit user details with correct data and successful alert message ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);

// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=User Management').first();
// //         await userManagementButton.click();

// //         const userRow = page.locator('tr').nth(1);
// //         console.log("Hi this userrow testing " + userRow);
// //         const editIcon = userRow.locator('[data-testid="EditIcon"]');
// //         await editIcon.click();

// //         await page.waitForSelector('[data-testid="EditIcon"]');
// //         await page.fill('input#userName', 'User Edited');
// //         await page.fill('input#designation', 'Program officer');
// //         await page.locator('#role').click();
// //         await page.waitForSelector('ul[role="listbox"]');
// //         // await expect(roleOptions).toBeVisible();
// //         await page.waitForTimeout(1000);
// //         const roleOptions = await page.$$('ul[role="listbox"] > li');
// //         if (roleOptions.length > 0) {
// //             await roleOptions[0].click();
// //         }

// //         const loginTypeDropdown = page.locator('#loginType');
// //         await loginTypeDropdown.click();
// //         await page.waitForTimeout(1000);

// //         await page.waitForSelector('ul[role="listbox"]');
// //         const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
// //         if (loginTypeOptions.length > 0) {
// //             await loginTypeOptions[2].click();
// //         }
// //         // const successMessage = page.locator('text=Update ');
// //         // await expect(successMessage).toBeVisible();
// //         const addUserDialogButton = page.locator('button:has-text("Update")');
// //         await expect(addUserDialogButton).toBeVisible();
// //         await addUserDialogButton.click();
// //         const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //         // await page.waitForTimeout(3000);
// //         console.log("Alert message: " + alertMessage);
// //         expect(alertMessage).toBe('User updated successfully');
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });

// //     test('6.Should block user details based on index and check alert', async () => {
// //         test.setTimeout(800000);

// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();

// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=User Management').first();
// //         await userManagementButton.click();
// //         const userRow = page.locator('tr').nth(1);
// //         await page.waitForTimeout(5000);
// //         const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
// //         await blockUserIcon.click();
// //         const confirmButton = page.locator('button', { hasText: 'Block' });
// //         await confirmButton.click();
// //         const successMessage = page.locator('text=User blocked successfully');
// //         console.log("Alert message :" + successMessage)
// //         // await expect(successMessage).toBeVisible();
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });


// //     test('7.Should block user details based on particular data', async () => {
// //         test.setTimeout(800000);

// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();

// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=User Management').first();
// //         await userManagementButton.click();

// //         // Locate the input field for searching by its ID
// //         const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
// //         await inputField.waitFor({ state: 'visible' });
// //         await inputField.fill('');
// //         await inputField.fill('9655008962');

// //         // Check if "No records" is visible after performing the search
// //         const noRecordsMessage = page.locator('text=No records');
// //         if (await noRecordsMessage.isVisible()) {
// //             console.log('No records found for the search term');
// //         } else {
// //             console.log('User found, proceeding to block the user');
// //             // Find the row containing the user and click the block icon
// //             const blockUserIcon = page.locator('[data-testid="PersonRemoveIcon"]');
// //             await blockUserIcon.click();
// //             const confirmButton = page.locator('button', { hasText: 'Block' });
// //             await confirmButton.click();
// //             const successMessage = page.locator('text=User blocked successfully');
// //             console.log("Alert message: " + (await successMessage.innerText()));
// //             // Optionally check if the success message is visible
// //             await expect(successMessage).toBeVisible();
// //         }
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });

// //     test('04.Should enable user details based on particular data with alert message', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();

// //         // Navigate to the app and log in
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();

// //         const userManagementButton = page.locator('text=User Management').first();
// //         await userManagementButton.click();

// //         // Locate the input field for searching by its ID
// //         const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
// //         await inputField.waitFor({ state: 'visible' });

// //         // Clear the input field if necessary and fill in the user number
// //         await inputField.fill('');
// //         await inputField.fill('9655008962');

// //         // Wait for the search results to load
// //         await page.waitForTimeout(2000);

// //         // Check if "No records" is visible after performing the search
// //         const noRecordsMessage = page.locator('text=No records');
// //         if (await noRecordsMessage.isVisible()) {
// //             console.log('No records found for the search term');
// //         } else {
// //             console.log('User found, proceeding to block the user');

// //             let foundRow = false;
// //             let index = 0;

// //             // Loop through rows to find the correct user based on the data
// //             while (!foundRow) {
// //                 const userRow = page.locator('tr').nth(index);
// //                 const userData = userRow.locator('td').first(); // Assuming the first column contains the user data

// //                 if (await userData.innerText() === '9655008962') {
// //                     console.log('Found user row');
// //                     const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
// //                     await blockUserIcon.click();

// //                     const confirmButton = page.locator('button', { hasText: 'Block' });
// //                     await confirmButton.click();

// //                     // Wait for and log the success message
// //                     const successMessage = page.locator('text=User blocked successfully');
// //                     console.log("Alert message: " + (await successMessage.innerText()));

// //                     // Optionally check if the success message is visible
// //                     await expect(successMessage).toBeVisible();
// //                     foundRow = true; // Exit loop once the user is found and blocked
// //                 }

// //                 index++;

// //                 // Optional: Add a limit to prevent an infinite loop (e.g., max 10 rows)
// //                 if (index > 10) {
// //                     throw new Error("No user found with the specified ID within the first 10 rows");
// //                 }
// //             }
// //         }

// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });


// //     test('05.Should enable user details wrong alert message', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();

// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=User Management').first();
// //         await userManagementButton.click();

// //         const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
// //         try {
// //             // Try to locate the edit icon (or block user icon)
// //             const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
// //             if (await blockUserIcon.isVisible()) {
// //                 await blockUserIcon.click();
// //                 const confirmButton = page.locator('button', { hasText: 'Unblock' });
// //                 await confirmButton.click();
// //                 // Wait for success message
// //                 const successMessage = page.locator('text=User unblocked successfullyy'); // Misspelling here
// //                 console.log("Success alert message : " + await successMessage.innerText());
// //             } else {
// //                 console.error("Edit icon is not visible.");
// //             }
// //         } catch (error) {
// //             console.error("Error: Edit icon not found or an issue occurred while clicking the icon.");
// //             console.error(error);
// //         }
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });

// //     //Test Number : 12
// //     test('12.Should validate the role edit alert message', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //         try {
// //                     await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //             await page.fill('input#userName', '8877199197');
// //             await page.fill('input#password', '1234');
// //             await page.click('button[type="submit"]');
// //             await page.waitForTimeout(1000);
// //             await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //             await page.reload();
// //             const userManagementButton = page.locator('text=Role Management').first();
// //             await userManagementButton.click();
// //             await page.waitForTimeout(2000);

// //             await page.waitForSelector('table');
// //             const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
// //             await editIcon.click();
// //             // await page.fill('input#roleName', 'Testing New Role');
// //             await page.fill('input#roleDesc', 'Desc');
// //             await page.waitForTimeout(2000);
// //             const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
// //             await editCheckbox.check();
// //             const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
// //             // const isButtonVisible = await addRoleDialogButton.isDisabled();
// //             await addRoleDialogButton.click();
// //             const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //             // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();

// //             console.log("Alertmessage " + alertMessage);
// //             expect(alertMessage).toBe('Role updated successfully');
// //         } catch (error) {
// //             console.error("Test failed with error: ", error);
// //         } finally {
// //             await page.waitForTimeout(1000);
// //             await browser.close();
// //         }
// //     });

// //      //Test Number : 3
// //      test('03.Should delete a role and check the alert message for incase mapping', async () => {
// //         test.setTimeout(800000);

// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);

// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const roleManagementButton = page.locator('text=Role Management').first();
// //         await roleManagementButton.click();
// //         await page.waitForTimeout(2000);

// //         await page.waitForSelector('table');
// //         const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
// //         await deleteIcon.click();
// //         await page.waitForTimeout(2000);

// //         const confirmDeleteButton = page.locator('button:has-text("Delete")');
// //         await expect(confirmDeleteButton).toBeVisible();
// //         await confirmDeleteButton.click();
// //         const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //         expect(alertMessage).toBe('Unexpected error');

// //         // expect(alertMessage).toBe('User error:This role has been mapped to another user');
// //         console.log('Alert Message:', alertMessage);
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });

      

// //     //Test Number : 4
// //     test('04.Should delete a role and check the alert message', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);

// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const roleManagementButton = page.locator('text=Role Management').first();
// //         await roleManagementButton.click();
// //         await page.waitForTimeout(2000);

// //         await page.waitForSelector('table');
// //         const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
// //         const isDelRoleIconVisible = await deleteIcon.isVisible();
// //         await page.waitForTimeout(2000);

// //         if (isDelRoleIconVisible) {
// //             await deleteIcon.click();
// //             const confirmButton = page.locator('button', { hasText: 'Delete' });
// //             await confirmButton.click();
// //             // const successMessage = page.locator('text=Role Deleted successfully');
// //             // await expect(successMessage).toBeVisible();
// //             const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //             expect(alertMessage).toBe('Role Deleted successfully');
// //             console.log('Alert Message:', alertMessage);
// //             console.log("Role icon is visible");
// //         } else {
// //             console.log("Role icon is not visible.");
// //         }
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });

// //     test('06.Should click the edit icon and check the successful message ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=Watershed Master').first();
// //         await userManagementButton.click();
// //         await page.waitForSelector('table');
// //         const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
// //         await expect(editIcon).toBeVisible();
// //         await editIcon.click();
// //         const dialog = await page.locator('div[role="dialog"]');
// //         await dialog.getByLabel('Village').click();
// //         await page.click('ul[role="listbox"] li:first-child');
// //         // await page.click('button:has-text("Add")').nth(1);;
// //         //    await page.locator('button:has-text("Update")').nth(1).click();
// //         // Wait for the Snackbar to appear and validate its content
// //         const wsName = await page.locator('div:has-text("Name") input').nth(0).getAttribute('value');
// //         await page.click('button:has-text("Update")');
// //         const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //         // expect(alertMessage).toBe(`Watershed ${wsName}updated`);
// //         expect(alertMessage).toBe(`Watershed updated`);
// //         await page.waitForTimeout(2000);
// //         await browser.close();
// //     });

// //     test('07.Should click the edit icon and add the existing watershed name and show the duplicate alert ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=Watershed Master').first();
// //         await userManagementButton.click();
// //         await page.waitForSelector('table');
// //         const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
// //         await expect(editIcon).toBeVisible();
// //         await editIcon.click();
// //         const dialog = await page.locator('div[role="dialog"]');
// //         await dialog.getByLabel('Village').click();
// //         await page.click('ul[role="listbox"] li:first-child');
// //         // await page.click('button:has-text("Add")').nth(1);;
// //         //    await page.locator('button:has-text("Update")').nth(1).click();
// //         // Wait for the Snackbar to appear and validate its content
// //         const wsName = await page.locator('div:has-text("Name") input').nth(0).getAttribute('value');
// //         await page.click('button:has-text("Update")');
// //         const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //         // expect(alertMessage).toBe(`Watershed ${wsName}updated`);
// //         expect(alertMessage).toBe(`Watershed already exist`);
// //         await page.waitForTimeout(2000);
// //         await browser.close();
// //     });
// //     test('04.Should click the delete icon and check the successful message ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=Watershed Master').first();
// //         await userManagementButton.click();
// //         await page.waitForSelector('table');
// //         // const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
// //         // await expect(editIcon).toBeVisible();
// //         // await editIcon.click();
// //         const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
// //         await expect(deleteIcon).toBeVisible();
// //         await deleteIcon.click();
// //         const confirmButton = page.locator('button', { hasText: 'Delete' });
// //         await confirmButton.isVisible();

// //         await page.click('button:has-text("Delete")');
// //         const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //         expect(alertMessage).toBe(`Watershed deleted`);
// //         await page.waitForTimeout(2000);
// //         await browser.close();
// //     });

// //     //////
// //     test('05.Should click the add icon and check the successful message ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //         await page.reload();
// //         const watershed = page.locator('text=Watershed Master').first();
// //         await watershed.click();
// //         await page.waitForSelector('table');
// //         const clickAddWs = page.locator('button:has-text("Add Watershed")');
// //         await clickAddWs.click();
// //         const dialog = await page.locator('div[role="dialog"]');
// //         await dialog.getByLabel('Name').fill('TestingWatershed');
// //         await dialog.getByLabel('Description').fill('New Description');
// //         await dialog.getByLabel('District').click();
// //         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 2nd district
// //         await dialog.getByLabel('Taluk').click();
// //         await page.click('ul[role="listbox"] li:nth-child(10)'); // Selects the 10th taluk
// //         await dialog.getByLabel('Grampanchayat').click();
// //         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 10th taluk
// //         await dialog.getByLabel('Village').click();
// //         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 10th taluk
// //         await page.waitForTimeout(2000);
    
// //         const addButton = page.locator('button:has-text("Add")').nth(1);
// //         console.log(await addButton.isEnabled());
// //         console.log(await addButton.isVisible());
// //         console.log(await addButton.isHidden());
// //         if (await addButton.isEnabled()) {
// //             await page.locator('button:has-text("Add")').nth(1).click();
// //             const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //             expect(alertMessage).toBe(`Watershed added`);
// //         }
// //         else {
// //             console.log("Add button is still disable ")
// //         }
// //         await page.waitForTimeout(2000);
// //         await browser.close();
// //     });

// //     // test('05.Should click the cancel icon ', async () => {
// //     //     test.setTimeout(800000);
// //     //     const browser = await chromium.launch({
// //     //         headless: false,
// //     //         channel: 'chrome',
// //     //     });
// //     //     const context = await browser.newContext();
// //     //     const page: Page = await context.newPage();
// //     //             await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //     //     await page.fill('input#userName', '8877199197');
// //     //     await page.fill('input#password', '1234');
// //     //     await page.click('button[type="submit"]');
// //     //     await page.waitForTimeout(1000);
// //     //     await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
// //     //     await page.reload();
// //     //     const userManagementButton = page.locator('text=Watershed Master').first();
// //     //     await userManagementButton.click();
// //     //     await page.waitForSelector('table');
// //     //     const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
// //     //     await expect(editIcon).toBeVisible();
// //     //     await editIcon.click();
// //     //     await page.click('button:has-text("Cancel")');
// //     //     // const alertMessage = await page.locator('.MuiAlert-message').innerText();
// //     //     // expect(alertMessage).toBe(`Watershed ${wsName} updated`);
// //     //     await page.waitForTimeout(2000);
// //     //     await browser.close();
// //     // });
// //     test('06.Should edit Watershed Mapping and show success alert', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();

// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=Watershed Mapping').first();
// //         await userManagementButton.click();
// //         await page.waitForTimeout(5000);
// //         const userRow = page.locator('tr').nth(1);
// //         console.log("Hi this mapping testing " + userRow);
// //         const editIcon = userRow.locator('[data-testid="EditIcon"]');
// //         await editIcon.click();

// //         await page.fill('input#remarks', 'Test Remarks');
// //         const wsNameDropdown = page.locator('#ws_name');
// //         await wsNameDropdown.click();
// //         await page.waitForSelector('ul[role="listbox"]');
// //         const watershedOptions = await page.$$('ul[role="listbox"] > li');
// //         if (watershedOptions.length > 0) {
// //             await watershedOptions[0].click(); // Select the first option in the list
// //         }
// //         await page.keyboard.press('Escape');
// //         const addButton = page.locator('button:has-text("Update")').nth(0);
// //         await addButton.click();
// //         const alertMessage = await page.waitForSelector('div[role="alert"]'); // Adjust the selector for the alert message
// //         const alertText = await alertMessage.innerText();
// //         expect(alertText).toBe('WaterShed mapping updated successfully');
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });


// //     //Negative Test Cases
// //     test('Should edit Watershed Mapping edit and check the remarks field', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();

// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
// //         await page.reload();
// //         const userManagementButton = page.locator('text=Watershed Mapping').first();
// //         await userManagementButton.click();
// //         await page.waitForTimeout(5000);
// //         const userRow = page.locator('tr').nth(1);
// //         console.log("Hi this mapping testing " + userRow);
// //         const editIcon = userRow.locator('[data-testid="EditIcon"]');
// //         await editIcon.click();

// //         await page.fill('input#remarks', 'Test RemarksAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
// //         // const wsNameDropdown = page.locator('#ws_name');
// //         // await wsNameDropdown.click();
// //         // await page.waitForSelector('ul[role="listbox"]');
// //         // const watershedOptions = await page.$$('ul[role="listbox"] > li');
// //         // if (watershedOptions.length > 0) {
// //         //     await watershedOptions[0].click(); // Select the first option in the list
// //         // }
// //         // await page.keyboard.press('Escape');
// //         const addButton = page.locator('button:has-text("Update")').nth(0);
// //         await addButton.click();
// //         const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
// //         const alertText = await alertMessage.innerText();
// //         expect(alertText).toBe('WaterShed mapping updated successfully');
// //         await page.waitForTimeout(1000);
// //         await browser.close();
// //     });


// //     test('06.Should edit add farmer icon and successfull alert message ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
// //         await page.reload();
// //         const FarmerMasterButton = page.locator('text=Farmer Master').first();
// //         await FarmerMasterButton.click();
// //         await page.waitForTimeout(5000);
// //         const userRow = page.locator('tr').nth(1);
// //         console.log("Hi this mapping testing " + userRow);
// //         const editIcon = userRow.locator('[data-testid="EditIcon"]');
// //         await editIcon.click();
// //         await page.getByRole('textbox', { name: 'Name' }).fill('Alluri reddy edited'); // Empty name
// //         // await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341990'); // Invalid Aadhar
// //         // await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887775'); // Invalid Mobile
// //         // Click Cancel button
// //         const addButton = page.locator('button:has-text("Update")');
// //         await addButton.click();
// //         // Optionally, you can verify if a success message or alert appears
// //         const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
// //         if (await alertMessage.isVisible()) {
// //             const alertText = await alertMessage.innerText();
// //             console.log(alertText);
// //             expect(alertText).toBe('Farmer edited'); // Verify success message
// //         }
// //         await page.waitForTimeout(2000);
// //         await browser.close();
// //     });


// //     test('07.Should edit add farmer icon and successfull alert message ', async () => {
// //         test.setTimeout(800000);
// //         const browser = await chromium.launch({
// //             headless: false,
// //             channel: 'chrome',
// //         });
// //         const context = await browser.newContext();
// //         const page: Page = await context.newPage();
// //                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
//         //await page.goto('http://localhost:3000/bfilreactdev');
 
// //         await page.fill('input#userName', '8877199197');
// //         await page.fill('input#password', '1234');
// //         await page.click('button[type="submit"]');
// //         await page.waitForTimeout(1000);
// //         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
// //         await page.reload();
// //         const FarmerMasterButton = page.locator('text=Farmer Master').first();
// //         await FarmerMasterButton.click();
// //         await page.waitForTimeout(5000);
// //         const userRow = page.locator('tr').nth(1);
// //         console.log("Hi this mapping testing " + userRow);
// //         const editIcon = userRow.locator('[data-testid="EditIcon"]');
// //         await editIcon.click();
// //         await page.getByRole('textbox', { name: 'Name' }).fill('Alluri reddy edited'); // Empty name
// //         // await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341990'); // Invalid Aadhar
// //         await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887751'); // Invalid Mobile
// //         // Click Cancel button
// //         const addButton = page.locator('button:has-text("Update")');
// //         await addButton.click();
// //         // Optionally, you can verify if a success message or alert appears
// //         const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
// //         if (await alertMessage.isVisible()) {
// //             const alertText = await alertMessage.innerText();
// //             console.log(alertText);
// //             expect(alertText).toBe('Farmer already exist'); // Verify success message
// //         }
// //         await page.waitForTimeout(2000);
// //         await browser.close();
// //     });

// // });