// import { test, expect, chromium, Page } from '@playwright/test';

// test.describe('User Delete Automation', () => {
//   test.describe.configure({ mode: 'serial' });
//   // Test Number : 1
//   test('01.Should check visible the delete button', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//       headless: false,
//       channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();

//     // Navigate to the app and log in
//     await page.goto('http://localhost:3000/bfilreact');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);

//     // Wait for the home page to load and reload
//     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//     await page.reload();

//     // Navigate to User Management
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();

//     // Locate the user row and the delete icon
//     const userRow = page.locator('tr').nth(1);
//     const blockUserIcon = userRow.locator('[data-testid="DeleteIcon"]');

//     // Check if the DeleteIcon is visible
//     const isDeleteIconVisible = await blockUserIcon.isVisible();

//     if (isDeleteIconVisible) {
//       // If the delete icon is visible, click it
//       await blockUserIcon.click();

//       // Confirm the delete action
//       const confirmButton = page.locator('button', { hasText: 'Delete' });
//       await expect(confirmButton).toBeVisible();
//       // await confirmButton.click();

//       // Check if the success message is visible
//       // const successMessage = page.locator('text=User Blocked Successfully');
//       // await expect(successMessage).toBeVisible();
//     } else {
//       console.log('Delete icon is not visible for the user row');
//     }

//     await page.waitForTimeout(1000);
//     await browser.close();
//   });


//   // //Test Number : 2
//   // test('02.Should delete user details based on index', async () => {
//   //   test.setTimeout(800000);
//   //   const browser = await chromium.launch({
//   //     headless: false,
//   //     channel: 'chrome',
//   //   });
//   //   const context = await browser.newContext();
//   //   const page: Page = await context.newPage();
//   //   await page.goto('http://localhost:3000/bfilreact');
//   //   await page.fill('input#userName', '9677694732');
//   //   await page.fill('input#password', '1234');
//   //   await page.click('button[type="submit"]');
//   //   await page.waitForTimeout(1000);

//   //   await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//   //   await page.reload();
//   //   const userManagementButton = page.locator('text=User Management');
//   //   await userManagementButton.click();

//   //   // const userRow = page.locator('tr').filter({ hasText: '6384742611' });
//   //   const userRow = page.locator('tr').nth(1);
//   //   const blockUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//   //   // await blockUserIcon.click();

//   //   const isDeleteIconVisible = await blockUserIcon.isVisible();

//   //   if (isDeleteIconVisible) {
//   //     // If the delete icon is visible, click it
//   //     await blockUserIcon.click();

//   //     // Confirm the delete action
//   //     const confirmButton = page.locator('button', { hasText: 'Delete' });
//   //     await expect(confirmButton).toBeVisible();

//   //     // Check if the success message is visible
//   //     // const successMessage = page.locator('text=User Blocked Successfully');
//   //   } else {
//   //     console.log('Delete icon is not visible for the user row');
//   //   }
//   //   // const confirmButton = page.locator('button', { hasText: 'Block' });
//   //   // await confirmButton.click();
//   //   await page.waitForTimeout(10000);

//   //   // const userManagementButton2 = page.locator('text=User Management');
//   //   // await userManagementButton2.click();


//   //   // const confirmButton = page.locator('button', { hasText: 'Delete User' });
//   //   // await confirmButton.click();

//   //   // const successMessage = page.locator('text=User Blocked successfully');
//   //   // await expect(successMessage).toBeVisible();
//   //   await page.waitForTimeout(1000);
//   //   await browser.close();
//   // });

//   //Test Number : 2
//   test('03.Should delete user details based on particular index', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//       headless: false,
//       channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();
//     await page.goto('http://localhost:3000/bfilreact');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);

//     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//     await page.reload();
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();


//           // Locate the input field for searching by its ID
//           const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
//           // Wait for the input field to be visible
//           await inputField.waitFor({ state: 'visible' });
//           // Clear the input field if necessary
//           await inputField.fill('');
//           await inputField.fill('9655008962');
//     const userRow = page.locator('tr').filter({ hasText: '9655008962' });
//     // const userRow = page.locator('tr').nth(1);

//     const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
//     if(await blockUserIcon.isVisible()){
//     await blockUserIcon.click();
//     const confirmButton = page.locator('button', { hasText: 'Cancel' });
//     await confirmButton.click();
//   }
//   else{console.log("Button not find")}
//     // await page.waitForTimeout(10000);

//     // const userManagementButton2 = page.locator('text=User Management');
//     // await userManagementButton2.click();
//    // const deleteUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//    // await deleteUserIcon.click();


//     // if (isBlockUserIconVisible) {
//     //   await blockUserIcon.click();
//     //   const confirmButton = page.locator('button', { hasText: 'Delete User' });
//     //   await confirmButton.click();
//     //   const successMessage = page.locator('text=User Blocked successfully');
//     //   await expect(successMessage).toBeVisible();
//     //   console.log("Block user icon is visible.");
//     // } else {
//     //   console.log("Block user icon is not visible.");
//     // }
//     await page.waitForTimeout(1000);
//     await browser.close();
//   });

//   // //Test Number : 4
//   // test('Should check the user delete icon ', async () => {
//   //   test.setTimeout(800000);
//   //   const browser = await chromium.launch({
//   //     headless: false,
//   //     channel: 'chrome',
//   //   });
//   //   const context = await browser.newContext();
//   //   const page: Page = await context.newPage();
//   //   await page.goto('http://localhost:3000/bfilreact');
//   //   await page.fill('input#userName', '9677694732');
//   //   await page.fill('input#password', '1234');
//   //   await page.click('button[type="submit"]');
//   //   await page.waitForTimeout(1000);

//   //   await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//   //   await page.reload();
//   //   const userManagementButton = page.locator('text=User Management');
//   //   await userManagementButton.click();
//   //   const userRow = page.locator('tr').nth(1);
//   //   const blockUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//   //   const isBlockIconVisible = blockUserIcon.isVisible();
//   //   expect(isBlockIconVisible).toBe(true);

//   //   await page.waitForTimeout(1000);
//   //   await browser.close();

//   // });


//   //Test Number : 5
//   test('04.Should check the user delete cancel button', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//       headless: false,
//       channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();
//     await page.goto('http://localhost:3000/bfilreact');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);

//     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//     await page.reload();
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();
//     const userRow = page.locator('tr').nth(1);
//     const blockUserIcon = userRow.locator('[data-testid="DeleteIcon"]');

//     await blockUserIcon.click();
//     const confirmButton = page.locator('button', { hasText: 'Cancel' });
//     await confirmButton.click();
//     // const isDeleteIconVisible = await confirmButton.isVisible();
//     // expect(isDeleteIconVisible).toBe(true);
//     await page.waitForTimeout(1000);
//     await browser.close();

//   });

//   test('05.Success', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//       headless: false,
//       channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();
//     await page.goto('http://localhost:3000/bfilreact');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);
//     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//     await page.reload();
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();
//     // const userRow = page.locator('tr').filter({ hasText: '6384742611' });
//     const userRow = page.locator('tr').nth(1);
//     const blockUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//     await blockUserIcon.click();
//     const confirmButton = page.locator('button', { hasText: 'Delete' });
//     await confirmButton.click();

//     const alertMessage = await page.locator('.MuiAlert-message').innerText();
//     expect(alertMessage).toBe('User deleted successfully');
//     // const deleteConfirmButton = page.locator('button', { hasText: '' });
//     // await deleteConfirmButton.click();
//     // const successMessage = page.locator('text=User Blocked successfully');
//     // await expect(successMessage).toBeVisible();

//     // const deleteUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//     // await deleteUserIcon.click();
//     // const deleteConfirmButton = page.locator('button', { hasText: 'Delete User' });
//     // await deleteConfirmButton.click();
//     // const deleteSuccessMessage = page.locator('text=User Blocked successfully');
//     // await expect(deleteSuccessMessage).toBeVisible();
//     await page.waitForTimeout(1000);
//     await browser.close();
//   });


//   //////


// //   test('06.Should enable user details based on particular data with alert message', async () => {
// //     test.setTimeout(800000);
// //     const browser = await chromium.launch({
// //       headless: false,
// //       channel: 'chrome',
// //     });
// //     const context = await browser.newContext();
// //     const page: Page = await context.newPage();

// //     await page.goto('http://localhost:3000/bfilreact');
// //     await page.fill('input#userName', '9677694732');
// //     await page.fill('input#password', '1234');
// //     await page.click('button[type="submit"]');
// //     await page.waitForTimeout(1000);

// //     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
// //     await page.reload();
// //     const userManagementButton = page.locator('text=User Management');
// //     await userManagementButton.click();
// //       // Locate the input field for searching by its ID
// //       const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
// //       // Wait for the input field to be visible
// //       await inputField.waitFor({ state: 'visible' });
// //       // Clear the input field if necessary
// //       await inputField.fill('');
// //       await inputField.fill('9655008962');
// //     const userRow = page.locator('tr').filter({ hasText: '9655008962' });
// //     // const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
// //     const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
// //     await blockUserIcon.click();

// //     const confirmButton = page.locator('button', { hasText: 'Unblock' });
// //     await confirmButton.click();

// //     const successMessage = page.locator('text=User unblocked successfully');
// //     console.log("Success alert message : "+ successMessage)
// //     // await expect(successMessage).toBeVisible();
// //     await page.waitForTimeout(1000);
// //     await browser.close();
// //   });

// //   test('07.Should enable user details wrong alert message', async () => {
// //     test.setTimeout(800000);
// //     const browser = await chromium.launch({
// //       headless: false,
// //       channel: 'chrome',
// //     });
// //     const context = await browser.newContext();
// //     const page: Page = await context.newPage();
  
// //     await page.goto('http://localhost:3000/bfilreact');
// //     await page.fill('input#userName', '9677694732');
// //     await page.fill('input#password', '1234');
// //     await page.click('button[type="submit"]');
// //     await page.waitForTimeout(1000);
  
// //     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
// //     await page.reload();
// //     const userManagementButton = page.locator('text=User Management');
// //     await userManagementButton.click();
  
// //     // Find the row containing the specific user name and click the Edit icon
// //     const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
  
// //     try {
// //       // Try to locate the edit icon (or block user icon)
// //       const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
// //       if (await blockUserIcon.isVisible()) {
// //         await blockUserIcon.click();
  
// //         const confirmButton = page.locator('button', { hasText: 'Unblock' });
// //         await confirmButton.click();
  
// //         // Wait for success message
// //         const successMessage = page.locator('text=User unblocked successfullyy');
// //         console.log("Success alert message : "+ successMessage)
// //       } else {
// //         console.error("Edit icon is not visible.");
// //       }
// //     } catch (error) {
// //       console.error("Error: Edit icon not found or an issue occurred while clicking the icon.");
// //       console.error(error);
// //     }
// //     await page.waitForTimeout(1000);
// //     await browser.close();
// //   });

// });