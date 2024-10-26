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
//     await page.goto('http://localhost:3000/bfilreacttest');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);
//     await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
//     await page.reload();
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();
//     const userRow = page.locator('tr').nth(1);
//     const blockUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//     const isDeleteIconVisible = await blockUserIcon.isVisible();
//     if (isDeleteIconVisible) {
//       await blockUserIcon.click();
//       const confirmButton = page.locator('button', { hasText: 'Delete' });
//       await expect(confirmButton).toBeVisible();
//     } else {
//       console.log('Delete icon is not visible for the user row');
//     }
//     await page.waitForTimeout(1000);
//     await browser.close();
//   });

//   //Test Number : 2
//   test('03.Should delete user details based on particular index', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//       headless: false,
//       channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();
//     await page.goto('http://localhost:3000/bfilreacttest');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);
//     await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
//     await page.reload();
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();
//     const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
//     // Wait for the input field to be visible
//     await inputField.waitFor({ state: 'visible' });
//     await inputField.fill('');
//     await inputField.fill('9655008962');
//     const userRow = page.locator('tr').filter({ hasText: '9655008962' });
//     const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
//     if (await blockUserIcon.isVisible()) {
//       await blockUserIcon.click();
//       const confirmButton = page.locator('button', { hasText: 'Cancel' });
//       await confirmButton.click();
//     }
//     else { console.log("Button not find") }
//     // await page.waitForTimeout(10000);

//     // const userManagementButton2 = page.locator('text=User Management');
//     // await userManagementButton2.click();
//     // const deleteUserIcon = userRow.locator('[data-testid="DeleteIcon"]');
//     // await deleteUserIcon.click();


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

//   //Test Number : 5
//   test('04.Should check the user delete cancel button', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//       headless: false,
//       channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();
//     await page.goto('http://localhost:3000/bfilreacttest');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);

//     await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
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
//     await page.goto('http://localhost:3000/bfilreacttest');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);
//     await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
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
//     await page.waitForTimeout(1000);
//     await browser.close();
//   });


//   test('Should click the add icon and check all field validation', async () => {
//     test.setTimeout(800000);
//     const browser = await chromium.launch({
//         headless: false,
//         channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     const page: Page = await context.newPage();

//     await page.goto('http://localhost:3000/bfilreacttest');
//     await page.fill('input#userName', '9677694732');
//     await page.fill('input#password', '1234');
//     await page.click('button[type="submit"]');
//     await page.waitForTimeout(1000);
//     await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
//     await page.reload();
//     const userManagementButton = page.locator('text=Watershed Activity');
//     await userManagementButton.click();
//     await page.waitForTimeout(5000);

//     // Click the avatar before clicking the "Add Activity" button
//     const avatar = page.locator('div.MuiAvatar-root');
//     await avatar.click();
//     await page.waitForTimeout(1000);

//     // Check if the word "Resource person" is present
//     const resourcePersonText = page.locator('text=Resource person');
//     if (await resourcePersonText.isVisible()) {
//         console.log('Resource person is present on the page.');

//         // Proceed to click the "Add Activity" button
//         const addIcon = page.locator('button:has-text("Add Activity")');
//         await addIcon.click();
//     } else {
//         console.log('Resource person is not found on the page.');
//     }

//     // Continue with the rest of the test if "Resource person" is found and "Add Activity" is clicked
//     const interventionDropdown = page.locator('label:has-text("Intervention") + *');
//     await interventionDropdown.click();
//     await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//     const interventionOptions = await page.$$('ul[role="listbox"] > li');
//     if (interventionOptions.length > 0) {
//         await interventionOptions[0].click();
//     }

//     const activityDropdown = page.locator('label:has-text("Activity") + *');
//     await activityDropdown.click();
//     await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//     const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
//     if (activityDropdownOptions.length > 0) {
//         await activityDropdownOptions[0].click();
//     }

//     const watershedDropdown = page.locator('label:has-text("Watershed") + *');
//     await watershedDropdown.click();
//     await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//     const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
//     if (watershedDropdownOptions.length > 0) {
//         await watershedDropdownOptions[0].click();
//     }

//     const surveyNumber = page.locator('#\\:r17\\:');
//     await surveyNumber.fill('1');
//     const unit = page.locator('#\\:r1b\\:');
//     await unit.fill('1');
//     const totalValueField = page.locator('#\\:r19\\:');
//     await totalValueField.fill('1');
//     const areatreated = page.locator('#\\:r1d\\:');
//     await areatreated.fill('1');
//     const fundSpent = page.locator('#\\:r1l\\:');
//     await fundSpent.fill('1');

//     const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
//     await fundSourceDropdown.click();
//     await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//     const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
//     if (fundSourceDropdownOptions.length > 0) {
//         await fundSourceDropdownOptions[0].click();
//     }

//     const nameDropdown = page.locator('label:has-text("Name") + *');
//     await nameDropdown.click();
//     await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//     const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
//     if (nameDropdownOptions.length > 0) {
//         await nameDropdownOptions[0].click();
//     }

//     await page.waitForTimeout(1000);
//     await browser.close();
// });


// });