// import { test, expect, chromium, Page } from '@playwright/test';

// test.describe('User Delete Automation', () => {


//   //Test Number : 1
//   test('01.Should delete user details based on index', async () => {
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

//     const successMessage = page.locator('text=User deleted successfully');
//     await expect(successMessage).toBeVisible();
//     await page.waitForTimeout(1000);

//     await browser.close();

//   });

//   //Test Number : 2
//   test('02.Should delete user details based on particular index', async () => {
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
//     const isBlockUserIconVisible = await blockUserIcon.isVisible();


//     if (isBlockUserIconVisible) {
//       await blockUserIcon.click();
//       const confirmButton = page.locator('button', { hasText: 'Delete' });
//       await confirmButton.click();
//       const successMessage = page.locator('text=User deleted successfully');
//       await expect(successMessage).toBeVisible();
//       console.log("Block user icon is visible.");
//     } else {
//       console.log("Block user icon is not visible.");
//     }
//     await page.waitForTimeout(1000);
//     await browser.close();
//   });

//   //Test Number : 3
//   test('03.Should check the delete confirmation button', async () => {
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
//     await confirmButton.isVisible();
//     // User deleted successfully

//     // const successMessage = page.locator('text=User deleted successfully');
//     // await expect(successMessage).toBeVisible();
//     await page.waitForTimeout(1000);
//     await browser.close()
//   });

//   //Test Number : 4
//   test('04.Should check the user delete icon ', async () => {
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
//     const isBlockIconVisible = blockUserIcon.isVisible();
//     expect(isBlockIconVisible).toBe(true);

//     await page.waitForTimeout(1000);
//     await browser.close();

//   });

//   //Test Number : 5
//   test('Should check the user delete confirm button', async () => {
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
//     const confirmButton = page.locator('button', { hasText: 'Delete' });
//     const isDeleteIconVisible = confirmButton.isVisible();
//     expect(isDeleteIconVisible).toBe(true);
//     await page.waitForTimeout(1000);
//     await browser.close();
//   });
  

//   //Unwanted test case
//   // test('Success', async () => {
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
//   //   const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
//   //   await blockUserIcon.click();
//   //   const confirmButton = page.locator('button', { hasText: 'Block User' });
//   //   await confirmButton.click();
//   //   const successMessage = page.locator('text=User Blocked successfully');
//   //   await expect(successMessage).toBeVisible();

//   //   const deleteUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//   //   await deleteUserIcon.click();
//   //   const deleteConfirmButton = page.locator('button', { hasText: 'Delete' });
//   //   await deleteConfirmButton.click();
//   //   const deleteSuccessMessage = page.locator('text=User Blocked successfully');
//   //   await expect(deleteSuccessMessage).toBeVisible();
//   //   await page.waitForTimeout(1000);
//   //   await browser.close();
//   // });


// });