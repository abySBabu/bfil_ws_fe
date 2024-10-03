import { test, expect, chromium, Page } from '@playwright/test';

// test.beforeAll(async () => {
//   global.getComputedStyle = (element: Element) => ({
//     getPropertyValue: (prop: string): string => {
//       if (prop === '--button-bradius') return '4px';
//       if (prop === '--text-color-default') return '#000000';
//       if (prop === '--button-bgcolor-active-brand') return '#1976d2';
//       return '';
//     }
//   }) as any;
// });


test.describe('User Management Automation', () => {

  //Test Number : 1
  test('Add user details with alphanumeric validation', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreact');
    await page.fill('input#userName', '8861982062');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 60000 });
    await page.reload();
    const userManagementButton = page.locator('role=button[name="User Management"]');
    await userManagementButton.click();
    await page.reload();
    const userManagementButton1 = page.locator('role=button[name="User Management"]');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'Shivaraja#####Shetty');
    await page.fill('input#employeeCode', '####%%');
    await page.fill('input#designation', 'newDesg&*%#');
    await page.fill('input#email', 'shivaraga@bfil#####*');
    await page.fill('input#mobileNo', '65432ert#');
    await page.fill('input#password', '1');

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }

    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
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

    // Validate the error messages
    await expect(page.locator('#userName-helper-text')).toHaveText('Name must only contain alphanumeric characters');
    await expect(page.locator('#employeeCode-helper-text')).toHaveText('Employee Code must only contain alphanumeric characters');
    await expect(page.locator('#designation-helper-text')).toHaveText('Designation must only contain alphanumeric characters');
    await expect(page.locator('#email-helper-text')).toHaveText('Email is invalid');
    await expect(page.locator('#mobileNo-helper-text')).toHaveText('Mobile Number is invalid');
    await expect(page.locator('#password-helper-text')).toHaveText('Password must be at least 4 characters');
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 2
  test('Should check the onchange error for empty fields', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
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
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   console.log("managerOptions" + managerOptions[2]);
    //   await managerOptions[0].click();
    // }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 3
  test('Should check the onchange error for userName fields', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', '');
    const roleDropdown = page.locator('#role');
    await roleDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   console.log("managerOptions" + managerOptions[2]);
    //   await managerOptions[0].click();
    // }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });


  //Test Number : 4
  test('Should check the onchange error for employeeCode fields', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#employeeCode', '');

    await page.locator('#role').click();
    // await roleDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   console.log("managerOptions" + managerOptions[2]);
    //   await managerOptions[0].click();
    // }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 5
  test('Should check the onchange error for mail fields', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');
    await page.fill('input#email', '');

    await page.locator('#role').click();
    // await roleDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   console.log("managerOptions" + managerOptions[2]);
    //   await managerOptions[0].click();
    // }
    await page.waitForTimeout(1000);

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 6
  test('Should check the onchange error for mobile number fields', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#mobileNo', '');
    await page.locator('#role').click();

    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   console.log("managerOptions" + managerOptions[2]);
    //   await managerOptions[0].click();
    // }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 7
  test('Should check the length of mobile number and password', async () => {
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
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();

    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'Asad Ahmad');
    await page.fill('input#employeeCode', 'EMP10003');
    await page.fill('input#email', 'asad.ahmad@bfil.co.in');
    await page.fill('input#mobileNo', '123456789');
    await page.fill('input#password', '12');

    await page.locator('#role').click();

    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }
    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   console.log("managerOptions" + managerOptions[2]);
    //   await managerOptions[0].click();
    // }

    const loginTypeDropdown = page.locator('#loginType');
    await loginTypeDropdown.click();
    await page.waitForSelector('ul[role="listbox"]');
    await page.waitForTimeout(1000);

    const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
    if (loginTypeOptions.length > 0) {
      await loginTypeOptions[2].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 8
  test('Should check all fields are empty', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', '');
    await page.fill('input#employeeCode', '');
    await page.fill('input#email', '');
    await page.fill('input#mobileNo', '');
    await page.fill('input#password', '');

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();
  });


  //Test Number : 9
  test('Should enter numbers for username, employee code, designation and mail', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', '12345');
    await page.fill('input#employeeCode', '12345');
    await page.fill('input#designation', '12345');
    await page.fill('input#email', '12345@gmail.com');
    await page.fill('input#mobileNo', '1234567890');
    await page.fill('input#password', '12345');

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }
    await page.waitForTimeout(1000);

    await page.locator('#role').click();

    await page.waitForTimeout(1000);

    await page.waitForSelector('ul[role="listbox"]');
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
    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();
  });


  //Test Number : 10
  test('Should check the important field', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', '12345');
    await page.fill('input#employeeCode', '12345');
    // await page.fill('input#designation', '12345');
    await page.fill('input#email', '12345@gmail.com');
    await page.fill('input#mobileNo', '1234567890');
    await page.fill('input#password', '12345');

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForTimeout(1000);

    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }

    await page.locator('#role').click();

    await page.waitForSelector('ul[role="listbox"]');
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
    // await expect(page.locator('#designation-helper-text')).toHaveText('Designation must only contain alphanumeric characters');
    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 11
  test('Should check the miss any dropdown error message', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', '12345');
    await page.fill('input#employeeCode', '12345');
    await page.fill('input#designation', '12345');
    await page.fill('input#email', '12345@gmail.com');
    await page.fill('input#mobileNo', '1234567890');
    await page.fill('input#password', '12345');

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }

    await page.locator('#role').click();

    await page.waitForSelector('ul[role="listbox"]');
    const roleOptions = await page.$$('ul[role="listbox"] > li');
    if (roleOptions.length > 0) {
      await roleOptions[0].click();
    }

    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    const classes = await addUserDialogButton.evaluate(node => node.className);
    console.log('Button classes:', classes);
    const hasDisabledClass = classes.split(' ').includes('Mui-disabled');
    console.log('Does the "Add User" button have the disabled class?', hasDisabledClass);
    expect(hasDisabledClass).toBe(true);
    const isClickable = await addUserDialogButton.evaluate(node => !node.hasAttribute('disabled') && node.classList.contains('Mui-disabled'));
    expect(isClickable).toBe(false);
    await page.waitForTimeout(1000);
    await browser.close();

  });

  //Test Number : 12
  test('Should check the successful alert message after add user', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'S D Kalyanshetti');
    await page.fill('input#employeeCode', '14');
    await page.fill('input#designation', 'Project Manager');
    await page.fill('input#email', 'narasimhanaru192@gmail.com');
    await page.fill('input#mobileNo', '9655008964');
    await page.fill('input#password', '1234'); 

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }

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
    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    const alertMessage = await page.locator('.MuiAlert-message').innerText();
    // await page.waitForTimeout(3000);
    console.log("Alert message: " + alertMessage);
    //User error: MobileNumber already exits 8310450995
    expect(alertMessage).toBe('User created successfully');
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 13
  test('Should check the mobile number duplicate error message after add user', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'Duplicate');
    await page.fill('input#employeeCode', '15');
    await page.fill('input#designation', 'Project Manager');
    await page.fill('input#email', 'guruswamy704@gamil.com');
    await page.fill('input#mobileNo', '9655008964');
    await page.fill('input#password', '1234');

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }

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
    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    const alertMessage = await page.locator('.MuiAlert-message').innerText();
    // await page.waitForTimeout(3000);
    console.log("Alert message: " + alertMessage);
    //User error: MobileNumber already exits 8310450995
    expect(alertMessage).toBe('User error: MobileNumber already exits 9655008964');
    await page.waitForTimeout(1000);
    await browser.close();

  });

  //Test Number : 14
  //Need to changes
  test('Should check the duplicate error message for usercode exist after add user', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();
    await page.waitForSelector('text=Add User');

    await page.fill('input#userName', 'Hussainappa');
    await page.fill('input#employeeCode', '14');
    await page.fill('input#designation', 'Project Manager');
    await page.fill('input#email', 'guruswamy704@gamil.com');
    await page.fill('input#mobileNo', '9655008965');
    await page.fill('input#password', '1234');

    // const managerTypeDropdown = page.locator('#manager');
    // await managerTypeDropdown.click();
    // await page.waitForSelector('ul[role="listbox"]');
    // const managerOptions = await page.$$('ul[role="listbox"] > li');
    // if (managerOptions.length > 0) {
    //   await managerOptions[0].click();
    // }

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
    const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    const alertMessage = await page.locator('.MuiAlert-message').innerText();
    // await page.waitForTimeout(3000);
    console.log("Alert message: " + alertMessage);
    //User error: MobileNumber already exits 8310450995
    expect(alertMessage).toBe('User error: User Code already exits 14');
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //Test Number : 15
  test('Should check the useradd button visibility', async () => {
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
    await page.reload();
    const userManagementButton1 = page.locator('text=User Management');
    await userManagementButton1.click();
    const addUserButton = page.locator('button:has-text("Add User")');
    // await expect(addUserButton).toBeVisible();
    const isUserAddButtonVisible = await addUserButton.isVisible();
    console.log("User Add in button visible :" + isUserAddButtonVisible);
    expect(isUserAddButtonVisible).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();
  });


});