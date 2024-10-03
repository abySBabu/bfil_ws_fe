import { test, expect, chromium, Page } from '@playwright/test';

// //code tested 
// test('should edit user details', async () => {
//   test.setTimeout(800000);
//   const browser = await chromium.launch({
//     headless: false,
//     channel: 'chrome',
//   });
//   const context = await browser.newContext();
//   const page: Page = await context.newPage();

//   await page.goto('http://localhost:3000/login');
//   await page.fill('input#userName', '9677694732');
//   await page.fill('input#password', '1234');
//   await page.click('button[type="submit"]');
//   await page.waitForTimeout(1000);

//   await page.waitForURL('http://localhost:3000/home', { timeout: 600000 });
//   await page.reload();  // this load is used to retrive some fields
//   const userManagementButton = page.locator('text=User Management');
//   await userManagementButton.click();

//   // const table = page.locator('table');
//   // await table.waitFor({ state: 'visible', timeout: 10000 });

//   // Find the row containing the specific user name and click the Edit icon
//   const userRow = page.locator('tr').filter({ hasText: 'NewUserName' });
//   const editIcon = userRow.locator('[data-testid="EditIcon"]');
//   await editIcon.click();
//   await page.waitForSelector('[data-testid="EditIcon"]');
//   await page.fill('input#userName', 'NewUserName123');
//   await page.fill('input#designation', 'NewDesignation');
//   const loginTypeDropdown = page.locator('#loginType');
//   await loginTypeDropdown.click();
//   const loginTypeOptions = page.locator('ul[role="listbox"]');
//   await expect(loginTypeOptions).toBeVisible();
//   const loginTypeOption = loginTypeOptions.locator('text="Web"');
//   await expect(loginTypeOption).toBeVisible();
//   await loginTypeOption.click();

//   const managerTypeDropdown = page.locator('#manager');
//   await managerTypeDropdown.click();
//   const maangerTypeOptions = page.locator('ul[role="listbox"]');
//   await expect(maangerTypeOptions).toBeVisible();
//   const managerTypeOption = maangerTypeOptions.locator('text="Lakshmi"');
//   await expect(managerTypeOption).toBeVisible();
//   await managerTypeOption.click();

//   // Select role from dropdown
//   await page.waitForTimeout(2000);

//   const roleDropdown = page.locator('#role');
//   await page.waitForTimeout(2000);

//   await roleDropdown.click();
//   await page.waitForTimeout(2000);

//   // Wait for the dropdown menu to be visible
//   const roleOptions = page.locator('ul[role="listbox"]');
//   await roleOptions.waitFor({ state: 'visible', timeout: 10000 });
// // Verify the options count
// const optionsCount = await roleOptions.locator('li').count();
// console.log(`Number of options: ${optionsCount}`);
//   // Verify dropdown options are visible
//   const roleOption = roleOptions.locator('li >> text="Project Head"');
//   await roleOption.waitFor({ state: 'visible', timeout: 10000 });
//   await roleOption.click();


//   const addUserDialogButton = page.locator('button:has-text("Update User")');
//   await expect(addUserDialogButton).toBeVisible();
//   await addUserDialogButton.click();
//   await page.waitForTimeout(5000);


//    // Wait for the success snackbar to appear
//    const snackbar = await page.waitForSelector('role=alert', { timeout: 100000 });

//    // Verify the success message
//    await expect(snackbar).toContain('User updated successfully');

// });


//code tested 
test('should edit user details', async () => {
  test.setTimeout(800000);
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto('http://localhost:3000/login');
  await page.fill('input#userName', '9677694732');
  await page.fill('input#password', '1234');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  await page.waitForURL('http://localhost:3000/home', { timeout: 600000 });
  await page.reload();  // this load is used to retrive some fields
  const userManagementButton = page.locator('text=User Management');
  await userManagementButton.click();

  // const table = page.locator('table');
  // await table.waitFor({ state: 'visible', timeout: 10000 });

  // Find the row containing the specific user name and click the Edit icon
  const userRow = page.locator('tr').filter({ hasText: '9655008962' });
  console.log("Hi this userrow testing "+userRow);
  const editIcon = userRow.locator('[data-testid="EditIcon"]');
  await editIcon.click();

  await page.waitForSelector('[data-testid="EditIcon"]');
  await page.fill('input#userName', 'NewUserSecond');
  await page.fill('input#designation', 'NewDesignation');
  const loginTypeDropdown = page.locator('#loginType');
  await loginTypeDropdown.click();
  const loginTypeOptions = page.locator('ul[role="listbox"]');
  await expect(loginTypeOptions).toBeVisible();
  const loginTypeOption = loginTypeOptions.locator('text="Web"');
  await expect(loginTypeOption).toBeVisible();
  await loginTypeOption.click();

  const managerTypeDropdown = page.locator('#manager');
  await managerTypeDropdown.click();
  const maangerTypeOptions = page.locator('ul[role="listbox"]');
  await expect(maangerTypeOptions).toBeVisible();
  const managerTypeOption = maangerTypeOptions.locator('text="shri siddaramaiah"');
  await expect(managerTypeOption).toBeVisible();
  await managerTypeOption.click();

  // Select role from dropdown
  await page.waitForTimeout(2000);

  const roleDropdown = page.locator('#role');
  await roleDropdown.click();
  // Wait for the dropdown menu to be visible
  const roleOptions = page.locator('ul[role="listbox"]'); 
  await expect(roleOptions).toBeVisible();
  const roleOption = roleOptions.locator('text="Project Head"'); 
  await expect(roleOption).toBeVisible();
  await roleOption.click();

//   const addUserDialogButton = page.locator('button:has-text("Update User")');
  const addUserDialogButton = page.locator('button', { hasText: 'Update User' });
  await expect(addUserDialogButton).toBeVisible();
  await addUserDialogButton.click();
//   await page.waitForTimeout(5000);

 // Step 5: Confirm the blocking action in the modal dialog
//  const confirmButton = page.locator('button', { hasText: 'Enable User' });
//  await confirmButton.click();

 // Optionally: Assert that the user was successfully blocked
//  const successMessage = page.locator('text=User UnBlocked successfully');
//  await expect(successMessage).toBeVisible();

//   // Optionally: Assert that the user was successfully blocked
  const successMessage = page.locator('text=User updated successfully');
  await expect(successMessage).toBeVisible();
//    // Wait for the success snackbar to appear
//    const snackbar = await page.waitForSelector('role=alert', { timeout: 100000 });
//    await expect(snackbar).toContain('User updated successfully');

});
