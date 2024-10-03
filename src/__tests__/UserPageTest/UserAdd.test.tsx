import { test, expect, chromium, Page } from '@playwright/test';


test.describe('User Management Automation', () => {

  //Tested ok code
  test.only('Add user details with form validation', async () => {
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

  // tested code ok 
  test('All details are filled in correct way', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreact');
    await page.fill('input#userName', '9677694777');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();

    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'Asad Ahmad');
    await page.fill('input#employeeCode', 'EMP10003');

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    // Wait for the dropdown menu to be visible
    const roleOptions = page.locator('ul[role="listbox"]');
    await expect(roleOptions).toBeVisible();
    const roleOption = roleOptions.locator('text="Project Head"');
    await expect(roleOption).toBeVisible();
    await roleOption.click();


    await page.fill('input#email', 'asad.ahmad@bfil.co.in');
    await page.fill('input#mobileNo', '8877199197');
    await page.fill('input#password', '1234');

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    const loginTypeOptions = page.locator('ul[role="listbox"]');
    await expect(loginTypeOptions).toBeVisible();
    const loginTypeOption = loginTypeOptions.locator('text="Both"');
    await expect(loginTypeOption).toBeVisible();
    await loginTypeOption.click();

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    const mangerTypeOptions = page.locator('ul[role="listbox"]');
    await expect(mangerTypeOptions).toBeVisible();
    const managerTypeOption = mangerTypeOptions.locator('text="Amaresh"');
    await expect(managerTypeOption).toBeVisible();
    await managerTypeOption.click();

    const addUserDialogButton = page.locator('button:has-text("Add User")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    const alertMessage = await page.locator('.MuiAlert-message').innerText();
    await page.waitForTimeout(3000);
    expect(alertMessage).toBe('User created successfully');
    await browser.close();
  });

  
  //Tested ok code
  test('Add user details with alphanuric validation', async () => {
    test.setTimeout(800000);

    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreact');
    await page.fill('input#userName', '9677694777');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();

    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'Shivaraja#####Shetty');
    await page.fill('input#employeeCode', '####%%');
    // await page.fill('input#email', 'shivaraga@bfil#####*.com');
    await page.fill('input#mobileNo', '65432ert#');
    await page.fill('input#password', '1');
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
    await expect(page.locator('#userName-helper-text')).toHaveText('Name must only contain alphanumeric characters');
    await expect(page.locator('#employeeCode-helper-text')).toHaveText('Employee Code must only contain alphanumeric characters');
    // await expect(page.locator('#email-helper-text')).toHaveText('Email is invalid');
    await expect(page.locator('#mobileNo-helper-text')).toHaveText('Mobile Number is invalid');
    // await expect(page.locator('#password-helper-text')).toHaveText('Password is required');
    await browser.close();
  });


});