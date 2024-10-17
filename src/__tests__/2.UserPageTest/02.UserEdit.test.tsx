import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Edit Automation', () => {
  test.describe.configure({ mode: 'serial' });
  //Test Number : 1
  test('01.Should edit user details with alphanumeric error message', async () => {
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

    await page.locator('#role').click();
    await page.waitForSelector('ul[role="listbox"]');
    await page.waitForTimeout(1000);

    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    await page.waitForTimeout(1000);

    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    await expect(page.locator('#userName-helper-text')).toHaveText('Name must only contain alphanumeric characters');
    await page.waitForTimeout(1000);
    await browser.close();
  });


  //Test Number : 2
  test('02.Should edit user details with alphanumeric error message and update button disable', async () => {
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
    await page.locator('#role').click();
    await page.waitForSelector('ul[role="listbox"]');
    await page.waitForTimeout(1000);
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
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 3
  test('03.Should edit user details with alphanumeric error message for designation', async () => {
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
    await page.locator('#role').click();
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
  test('04.Should edit user details with alphanumeric error message for designation and button disable', async () => {
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
    await page.locator('#role').click();
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
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 5
  test('05.Should edit user details and Empty fields ', async () => {
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
    await page.locator('#role').click();
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
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();   
  });

  //Test Number : 6
  test('06.Should edit user details and check username fields ', async () => {
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
    await page.locator('#role').click();
    await page.waitForSelector('ul[role="listbox"]');
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
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 7
  test('07.Should edit user details some fields are empty ', async () => {
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
    await page.locator('#role').click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    await page.waitForTimeout(1000);
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }
    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }
    const updateUserDialogButton = page.locator('button:has-text("Update")').nth(1);
    const isButtonVisible = await updateUserDialogButton.isVisible();
    console.log('Is the "Update" button visible?', isButtonVisible);
    expect(isButtonVisible).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 8
  test('08.Should edit user details with correct data and successful alert message ', async () => {
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
    await page.fill('input#designation', 'Program officer');
    await page.locator('#role').click();
    await page.waitForSelector('ul[role="listbox"]');
    // await expect(roleOptions).toBeVisible();
    await page.waitForTimeout(1000);
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForTimeout(1000);

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
    expect(alertMessage).toBe('User updated successfully');
    await page.waitForTimeout(1000);
    await browser.close();
  });

  // //Test Number : 9
  // test.only('9.Should edit user details with wrong alert message ', async () => {
  //   test.setTimeout(800000);
  //   const browser = await chromium.launch({
  //     headless: false,
  //     channel: 'chrome',
  //   });
  //   const context = await browser.newContext();
  //   const page: Page = await context.newPage();
  //   await page.goto('http://localhost:3000/bfilreact');
  //   await page.fill('input#userName', '9677694732');
  //   await page.fill('input#password', '1234');
  //   await page.click('button[type="submit"]');
  //   await page.waitForTimeout(1000);

  //   await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
  //   await page.reload();
  //   const userManagementButton = page.locator('text=User Management');
  //   await userManagementButton.click();

  //   const userRow = page.locator('tr').nth(1);
  //   console.log("Hi this userrow testing " + userRow);
  //   const editIcon = userRow.locator('[data-testid="EditIcon"]');
  //   await editIcon.click();

  //   await page.waitForSelector('[data-testid="EditIcon"]');
  //   await page.fill('input#userName', 'Manhattan');
  //   await page.fill('input#designation', 'Admin');
  //   await page.locator('#role').click();

  //   await page.waitForSelector('ul[role="listbox"]');
  //   // await expect(roleOptions).toBeVisible();
  //   await page.waitForTimeout(1000);

  //   const roleOptions = await page.$$('ul[role="listbox"] > li');
  //   if (roleOptions.length > 0) {
  //     await roleOptions[0].click();
  //   }

  //   const loginTypeDropdown = page.locator('#loginType');
  //   await loginTypeDropdown.click();
  //   await page.waitForTimeout(1000);

  //   await page.waitForSelector('ul[role="listbox"]');
  //   const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
  //   if (loginTypeOptions.length > 0) {
  //     await loginTypeOptions[2].click();
  //   }
  //   // const successMessage = page.locator('text=Update ');
  //   // await expect(successMessage).toBeVisible();
  //   const addUserDialogButton = page.locator('button:has-text("Update")');
  //   await expect(addUserDialogButton).toBeVisible();
  //   await addUserDialogButton.click();
  //   const alertMessage = await page.locator('.MuiAlert-message').innerText();
  //   // await page.waitForTimeout(3000);
  //   console.log("Alert message: " + alertMessage);
  //   //User error: MobileNumber already exits 8310450995
  //   //    expect(alertMessage).toBe('User updated successfully');
  //   expect(alertMessage).toBe('User updated successfully');
  //   await page.waitForTimeout(1000);
  //   await browser.close();
  // });

  //Test Number : 10
  test('10.Should check the edit icon', async () => {
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
    await page.waitForTimeout(5000);

    const userRow = page.locator('tr').nth(1);
    console.log("Hi, this user row testing: ", await userRow.textContent());

    const editIcon = userRow.locator('[data-testid="EditIcon"]');
    const isEditIconVisible = await editIcon.isVisible();  // Await here
    expect(isEditIconVisible).toBe(true);  // Now it will check after await
    await page.waitForTimeout(1000);
    await browser.close();
  });

});
