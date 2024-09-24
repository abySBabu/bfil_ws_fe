import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Enable Automation', () => {

  test('should enable user details', async () => {
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

    const confirmButton = page.locator('button', { hasText: 'Enable User' });
    await confirmButton.click();

    const successMessage = page.locator('text=User UnBlocked successfully');
    await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('should enable user details based on particular data', async () => {
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

    const userRow = page.locator('tr').filter({ hasText: '8877199197' });
    // const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Enable User' });
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

    //   // Find the row containing the specific user name and click the Edit icon
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    // const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Enable User' });
    await confirmButton.click();

    const successMessage = page.locator('text=User UnBlocked Successfully');
    await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();
  });


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
    const isBlkUserVisibel = blockUserIcon.isVisible();
    expect(isBlkUserVisibel).toBe(true);

    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('Should check the user enable confirm button ', async () => {
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
    await blockUserIcon.click();
    const confirmButton = page.locator('button', { hasText: 'Enable User' });
    const isConfirmbutton = confirmButton.isVisible();
    expect(isConfirmbutton).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();
  });


});

