import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Enable Automation', () => {


  test('Should check the enable button ', async () => {
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

    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    // Ensure you await the isEnabled() result since it's asynchronous
    const isBlkUserVisibel = await blockUserIcon.isEnabled();
    console.log(`Is block user icon enabled: ${isBlkUserVisibel}`);
    expect(isBlkUserVisibel).toBe(true);

    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('Should check the user enable confirm button', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
  
    // Navigate to the app and log in
    await page.goto('http://localhost:3000/bfilreact');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
  
    // Wait for the home page
    await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    await page.reload();
  
    // Click on "User Management"
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
  
    // Find the second row in the user table and click the block user icon
    const userRow = page.locator('tr').nth(1);
    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();
  
    // Check if the "Unblock" button is visible
    const confirmButton = page.locator('button', { hasText: 'Unblock' });
    const isConfirmButtonVisible = await confirmButton.isVisible(); // Await the result
    console.log(`Is confirm button visible: ${isConfirmButtonVisible}`);
  
    // Expect the confirm button to be visible
    expect(isConfirmButtonVisible).toBe(true);
  
    await page.waitForTimeout(1000);
    await browser.close();
  });
  
  test('Should enable user details with successful alert message', async () => {
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
    await page.reload();  // this load is used to retrive some fields
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    //   // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: '9655008962' });
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Unblock' });
    await confirmButton.click();

    const successMessage = page.locator('text=User UnBlocked successfully');
    await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('Should enable user details based on particular data with alert message', async () => {
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

    const userRow = page.locator('tr').filter({ hasText: '9655008961' });
    // const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Unblock' });
    await confirmButton.click();

    const successMessage = page.locator('text=User UnBlocked successfully');
    await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('Should enable user details wrong alert message', async () => {
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
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
  
    try {
      // Try to locate the edit icon (or block user icon)
      const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
      if (await blockUserIcon.isVisible()) {
        await blockUserIcon.click();
  
        const confirmButton = page.locator('button', { hasText: 'Unblock' });
        await confirmButton.click();
  
        // Wait for success message
        const successMessage = page.locator('text=User UnBlocked Successfully');
        await expect(successMessage).toBeVisible();
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
  
});

