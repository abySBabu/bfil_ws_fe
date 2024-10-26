import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Enable Automation', () => {
  test.describe.configure({ mode: 'serial' });

  test('01.Should check the enable button ', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);

    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    const userRow = page.locator('tr').nth(1);

    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    // Ensure you await the isEnabled() result since it's asynchronous
    const isBlkUserVisibel = await blockUserIcon.isEnabled();
    console.log(`Is block user icon enabled: ${isBlkUserVisibel}`);
    expect(isBlkUserVisibel).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('02.Should check the user enable confirm button', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    // Navigate to the app and log in
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    const userRow = page.locator('tr').nth(1);
    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Unblock' });
    const isConfirmButtonVisible = await confirmButton.isVisible(); // Await the result
    console.log(`Is confirm button visible: ${isConfirmButtonVisible}`);
    expect(isConfirmButtonVisible).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  // test('03.Should enable user details with successful alert message', async () => {
  //   test.setTimeout(800000);
  //   const browser = await chromium.launch({
  //     headless: false,
  //     channel: 'chrome',
  //   });
  //   const context = await browser.newContext();
  //   const page: Page = await context.newPage();
  //   await page.goto('http://localhost:3000/bfilreacttest');
  //   await page.fill('input#userName', '9677694732');
  //   await page.fill('input#password', '1234');
  //   await page.click('button[type="submit"]');
  //   await page.waitForTimeout(1000);
  //   await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
  //   await page.reload();  // this load is used to retrive some fields
  //   const userManagementButton = page.locator('text=User Management');
  //   await userManagementButton.click();
  //   //   // Find the row containing the specific user name and click the Edit icon
  //   // const userRow = page.locator('tr').filter({ hasText: '9655008962' });
  //   const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
  //   const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
  //   await blockUserIcon.click();
  //   const confirmButton = page.locator('button', { hasText: 'Unblock' });
  //   await confirmButton.click();
  //   const successMessage = page.locator('text=User unblocked successfully');
  //   console.log("Success Alert message : " + successMessage)
  //   // await expect(successMessage).toBeVisible();
  //   await page.waitForTimeout(1000);
  //   await browser.close();
  // });

  test('04.Should enable user details based on particular data with alert message', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    // Locate the input field for searching by its ID
    const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
    // Wait for the input field to be visible
    await inputField.waitFor({ state: 'visible' });
    // Clear the input field if necessary
    await inputField.fill('');
    await inputField.fill('9655008962');
    // Check if "No records" is visible after performing the search
    const noRecordsMessage = page.locator('text=No records');
    if (await noRecordsMessage.isVisible()) {
      console.log('No records found for the search term');
    } else {
      console.log('User found, proceeding to block the user');
      // Find the row containing the user and click the block icon
      const blockUserIcon = page.locator('[data-testid="PersonRemoveIcon"]');
      await blockUserIcon.click();
      const confirmButton = page.locator('button', { hasText: 'Block' });
      await confirmButton.click();
      const successMessage = page.locator('text=User blocked successfully');
      console.log("Alert message: " + (await successMessage.innerText()));
      // Optionally check if the success message is visible
      await expect(successMessage).toBeVisible();
    }
    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('05.Should enable user details wrong alert message', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    try {
      // Try to locate the edit icon (or block user icon)
      const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
      if (await blockUserIcon.isVisible()) {
        await blockUserIcon.click();
        const confirmButton = page.locator('button', { hasText: 'Unblock' });
        await confirmButton.click();
        // Wait for success message
        const successMessage = page.locator('text=User unblocked successfullyy');
        console.log("Success alert message : " + successMessage)
      } else {
        console.error("Edit icon is not visible.");
      }
    } catch (error) {
      console.error("Error: Edit icon not found or an issue occurred while clicking the icon.");
      console.error(error);
    }
    await page.waitForTimeout(1000);
    await browser.close();
  });

  //////
  test('06.Should block user details based on index and check alert', async () => {
    test.setTimeout(800000);

    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 60000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    //   // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: '6384742611' });
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    await page.waitForTimeout(5000);

    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Block' });
    await confirmButton.click();

    const successMessage = page.locator('text=User blocked successfully');
    console.log("Alert message :" + successMessage)
    // await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();

  });

  test('07.Should block user details based on particular data', async () => {
    test.setTimeout(800000);

    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 60000 });
    await page.reload();
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    // Locate the input field for searching by its ID
    const inputField = page.locator('#\\:r1\\:'); // Escaping the ID
    await inputField.waitFor({ state: 'visible' });
    await inputField.fill('');
    await inputField.fill('9655008962');

    const noRecordsMessage = page.locator('text=No records');
    if (await noRecordsMessage.isVisible()) {
      console.log('No records found for the search term');
    } else {

      // Find the row containing the user and click the block icon
      const userRow = page.locator('tr').filter({ hasText: '9655008962' });
      await page.waitForTimeout(5000);

      const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
      await blockUserIcon.click();

      const confirmButton = page.locator('button', { hasText: 'Block' });
      await confirmButton.click();

      const successMessage = page.locator('text=User blocked successfully');
      console.log("Alert message: " + (await successMessage.innerText()));
      // Optionally check if the success message is visible
      await expect(successMessage).toBeVisible();
    }

    await page.waitForTimeout(1000);
    await browser.close();
  });


});

