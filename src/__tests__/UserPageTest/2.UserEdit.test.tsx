import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Edit Automation', () => {

  //Test Number : 1
  test('Should edit user details with alphanumeric error message', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: 'NewUserName' });
    const userRow = page.locator('tr').nth(1);

    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();
    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', 'Shivaraja#####Shetty');
    await page.fill('input#designation', 'NewDesignation');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    await expect(page.locator('#userName-helper-text')).toHaveText('Name must only contain alphanumeric characters');

    await page.waitForTimeout(1000);
    await browser.close();


    // const addUserDialogButton = page.locator('button:has-text("Update")');
    // await expect(addUserDialogButton).toBeVisible();
    // await addUserDialogButton.click();
    // await page.waitForTimeout(5000);


    // // Wait for the success snackbar to appear
    // const snackbar = await page.waitForSelector('role=alert', { timeout: 100000 });

    // // Verify the success message
    // await expect(snackbar).toContain('User updated successfully');

  });


  //Test Number : 2
  test('Should edit user details with alphanumeric error message and update button disable', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: 'NewUserName' });
    const userRow = page.locator('tr').nth(1);

    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();
    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', 'Shivaraja#####Shetty');
    await page.fill('input#designation', 'NewDesignation');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    // Ensure the button exists before evaluating
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);

    // DEBUG: Check if the button is properly located
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);

    await browser.close();
  });


  //Test Number : 3
  test('should edit user details with alphanumeric error message for designation', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    const userRow = page.locator('tr').nth(1);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();
    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', 'Shivaraja');
    await page.fill('input#designation', 'NewDesignation#$#');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    await expect(page.locator('#designation-helper-text')).toHaveText('Designation must only contain alphanumeric characters');
    await page.waitForTimeout(1000);

    await browser.close();
  });

  //Test Number : 4
  test('should edit user details with alphanumeric error message for designation and button disable', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    const userRow = page.locator('tr').nth(1);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();
    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', 'Shivaraja');
    await page.fill('input#designation', 'NewDesignation#$#');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    // Ensure the button exists before evaluating
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);

    // DEBUG: Check if the button is properly located
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);

    await browser.close();
  });

  //Test Number : 5
  test('should edit user details and Empty fields ', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const userRow = page.locator('tr').nth(1);
    console.log("Hi this userrow testing " + userRow);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();

    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', '');
    await page.fill('input#designation', '');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    // Ensure the button exists before evaluating
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);

    // DEBUG: Check if the button is properly located
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);

    await browser.close();    // const successMessage = page.locator('text=User updated successfully');
    // await expect(successMessage).toBeVisible();
    //    // Wait for the success snackbar to appear
    //    const snackbar = await page.waitForSelector('role=alert', { timeout: 100000 });
    //    await expect(snackbar).toContain('User updated successfully');

  });

  //Test Number : 6
  test('should edit user details and check username fields ', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const userRow = page.locator('tr').nth(1);
    console.log("Hi this userrow testing " + userRow);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();

    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', '');
    // await page.fill('input#designation', '');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    // Ensure the button exists before evaluating
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);
    // DEBUG: Check if the button is properly located
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();

  });


  //Test Number : 7
  test('should edit user details some fields are empty ', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const userRow = page.locator('tr').nth(1);
    console.log("Hi this userrow testing " + userRow);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();

    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', '');
    await page.fill('input#designation', '');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    // await expect(page.locator('#userName-helper-text')).toHaveText('Name must only contain alphanumeric characters');
    // await expect(page.locator('#designation-helper-text')).toHaveText('Designation must only contain alphanumeric characters');


    // Ensure the button exists before evaluating
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);

    // DEBUG: Check if the button is properly located
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);

    await browser.close();

  });

  //Test Number : 8
  test('should edit user details with correct data ', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const userRow = page.locator('tr').nth(1);
    console.log("Hi this userrow testing " + userRow);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();

    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', 'User Edited');
    await page.fill('input#designation', 'Admin');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    // const successMessage = page.locator('text=Update ');
    // await expect(successMessage).toBeVisible();
    const addUserDialogButton = page.locator('button:has-text("Update")');
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    const alertMessage = await page.locator('.MuiAlert-message').innerText();
    // await page.waitForTimeout(3000);
    console.log("Alert message: " + alertMessage);
    //User error: MobileNumber already exits 8310450995
    expect(alertMessage).toBe('User updated successfully');
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 9
  test('should edit user details with wrong alert message ', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const userRow = page.locator('tr').nth(1);
    console.log("Hi this userrow testing " + userRow);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    await editIcon.click();

    await page.waitForSelector('[data-testid="EditIcon"]');
    await page.fill('input#userName', 'Manhattan');
    await page.fill('input#designation', 'Admin');

    const managerTypeDropdown = page.locator('#manager');
    await managerTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const managerOptions = await page.$$('ul[role="listbox"] > li');
    if (managerOptions.length > 0) {
      await managerOptions[0].click();
    }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    // const successMessage = page.locator('text=Update ');
    // await expect(successMessage).toBeVisible();
    const addUserDialogButton = page.locator('button:has-text("Update")');
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    const alertMessage = await page.locator('.MuiAlert-message').innerText();
    // await page.waitForTimeout(3000);
    console.log("Alert message: " + alertMessage);
    //User error: MobileNumber already exits 8310450995
    expect(alertMessage).toBe('User updated successfully...');
    await page.waitForTimeout(1000);

    await browser.close();
  });



   //Test Number : 10
   test('Should check the edit icon  ', async () => {
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

    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const userRow = page.locator('tr').nth(1);
    console.log("Hi this userrow testing " + userRow);
    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    const isEditIconVisibel = editIcon.isVisible();
    expect(isEditIconVisibel).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();
  });

});
