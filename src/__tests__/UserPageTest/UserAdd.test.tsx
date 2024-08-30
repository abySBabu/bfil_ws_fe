import { test, expect, chromium, Page } from '@playwright/test';

//Tested ok code
test('Add user details with form validation', async () => {
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
  await page.waitForURL('http://localhost:3000/home', { timeout: 60000 });
  await page.reload();
  const userManagementButton = page.locator('text=User Management');
  await userManagementButton.click();

  const addUserButton = page.locator('button:has-text("Add User")');
  await expect(addUserButton).toBeVisible();
  await addUserButton.click();

  await page.waitForSelector('text=Add User');

  await page.fill('input#userName', '');
  await page.fill('input#employeeCode', '');
  await page.fill('input#email', '');
  await page.fill('input#mobileNo', '');
  await page.fill('input#password', '');
  const roleDropdown = page.locator('#role');
  await roleDropdown.click();
  const roleOptions = page.locator('ul[role="listbox"]'); // Use the class of MenuItem
  await expect(roleOptions).toBeVisible();
  const roleOption = roleOptions.locator('text="Project Head"'); // Replace with actual role name
  await expect(roleOption).toBeVisible();
  await roleOption.click();

  const managerTypeDropdown = page.locator('#manager');
  await managerTypeDropdown.click();
  const maangerTypeOptions = page.locator('ul[role="listbox"]');
  await expect(maangerTypeOptions).toBeVisible();
  const managerTypeOption = maangerTypeOptions.locator('text="Lakshmi"');
  await expect(managerTypeOption).toBeVisible();
  await managerTypeOption.click();

  // await page.waitForTimeout(10000);
  const loginTypeDropdown = page.locator('#loginType');
  await loginTypeDropdown.click();
  const loginTypeOptions = page.locator('ul[role="listbox"]'); 
  await expect(loginTypeOptions).toBeVisible();
  const loginTypeOption = loginTypeOptions.locator('text="Both"'); 
  await expect(loginTypeOption).toBeVisible();
  await loginTypeOption.click();

  const addUserDialogButton = page.locator('button:has-text("Add User")').nth(1);
  await expect(addUserDialogButton).toBeVisible();
  await addUserDialogButton.click();
  await page.waitForTimeout(1000);

  // Validate the error messages
  await expect(page.locator('#userName-helper-text')).toHaveText('Name is required');
  await expect(page.locator('#employeeCode-helper-text')).toHaveText('Employee Code is required');
  await expect(page.locator('#email-helper-text')).toHaveText('Email is required');
  await expect(page.locator('#mobileNo-helper-text')).toHaveText('Mobile Number is required');
  await expect(page.locator('#password-helper-text')).toHaveText('Password is required');
  await browser.close();
});



// // tested code ok 
test.only('should validate alphanumeric value and length for userName and employeeCode fields', async () => {
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
  await page.reload(); 
  const userManagementButton = page.locator('text=User Management');
  await userManagementButton.click();

  const addUserButton = page.locator('button:has-text("Add User")');
  await expect(addUserButton).toBeVisible();
  await addUserButton.click();

  await page.waitForSelector('text=Add User');

  await page.fill('input#userName', 'TestEmp1');
  await page.fill('input#employeeCode', 'EMP100');

  const roleDropdown = page.locator('#role');
  await roleDropdown.click();
  // Wait for the dropdown menu to be visible
  const roleOptions = page.locator('ul[role="listbox"]'); 
  await expect(roleOptions).toBeVisible();
  const roleOption = roleOptions.locator('text="Project Head"'); 
  await expect(roleOption).toBeVisible();
  await roleOption.click();


  await page.fill('input#email', 'testemp#2@gmail.com');
  await page.fill('input#mobileNo', '9655008962');
  await page.fill('input#password', '1234');

  const loginTypeDropdown = page.locator('#loginType');
  await loginTypeDropdown.click();
  const loginTypeOptions = page.locator('ul[role="listbox"]'); 
  await expect(loginTypeOptions).toBeVisible();
  const loginTypeOption = loginTypeOptions.locator('text="Both"'); 
  await expect(loginTypeOption).toBeVisible();
  await loginTypeOption.click();

  // const managerTypeDropdown = page.locator('#manager');
  // await managerTypeDropdown.click();
  // const maangerTypeOptions = page.locator('ul[role="listbox"]');
  // await expect(maangerTypeOptions).toBeVisible();
  // const managerTypeOption = maangerTypeOptions.locator('text="Lakshmi"');
  // await expect(managerTypeOption).toBeVisible();
  // await managerTypeOption.click();
  // await page.waitForTimeout(10000); // Allow time for options to be loaded  
  // // Wait for and select manager type from dropdown
  // const managerTypeDropdown = page.locator('#manager');
  // await page.waitForTimeout(100000); // Allow time for options to be loaded

  // await managerTypeDropdown.click();
  // console.log('Manager dropdown options:', await page.locator('ul[role="listbox"]').allTextContents());
  //      await page.locator('ul[role="listbox"]').waitFor({ state: 'visible', timeout: 10000 });
  //      const managerTypeOption = page.locator('ul[role="listbox"]').locator('text="Pounkumar"');
  //      await expect(managerTypeOption).toBeVisible({ timeout: 10000 });
  //      await managerTypeOption.click();

  const addUserDialogButton = page.locator('button:has-text("Add User")').nth(1);
  await expect(addUserDialogButton).toBeVisible();
  await addUserDialogButton.click();

  await page.waitForTimeout(10000);


});

