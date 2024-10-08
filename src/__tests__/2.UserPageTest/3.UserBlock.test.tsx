
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Blocklist Automation', () => {

  
  test('Should check the block icon ', async () => {
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
    await page.waitForTimeout(5000);

    //   // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: '8877199197' });
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    const isBlockIconVisible = await blockUserIcon.isVisible();
    expect(isBlockIconVisible).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();
  });

  test('should block user details based on index and button check visible', async () => {
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
    await page.waitForTimeout(5000);

    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    const isBlockUserButtonVisible = await blockUserIcon.isVisible();
    console.log('Is the "Block user" button visible?', isBlockUserButtonVisible);
    expect(isBlockUserButtonVisible).toBe(true);

    await page.waitForTimeout(1000);
    await browser.close();

  });


  test('Should block user details based on index', async () => {
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
    await page.waitForTimeout(5000);

    //   // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: '6384742611' });
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    await blockUserIcon.click();

    // const confirmButton = page.locator('button', { hasText: 'Block' });
    // await confirmButton.click();

    // const successMessage = page.locator('text=User Blocked successfully');
    // await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();

  });

  test('Should check the confirm popup', async () => {
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
    await page.waitForTimeout(5000);

    const userRow = page.locator('tr').nth(1);
    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    await blockUserIcon.click();
    const confirmButton = page.locator('button', { hasText: 'Block' });
    const isConfirmButtonVisible = await confirmButton.isVisible();
    expect(isConfirmButtonVisible).toBe(true);
    await page.waitForTimeout(1000);
    await browser.close();

  });

  test('Should block user cancel button is working fine', async () => {
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

    //   // Find the row containing the specific user name and click the Edit icon
    // const userRow = page.locator('tr').filter({ hasText: '6384742611' });
    const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    await page.waitForTimeout(5000);

    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Cancel' });
    await confirmButton.click();

    // const successMessage = page.locator('text=User blocked successfully');
    // console.log("Alert message :" + successMessage)
    // await expect(successMessage).toBeVisible();
    await page.waitForTimeout(1000);
    await browser.close();

  });


  test('Should block user details based on index and check alert', async () => {
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


  test('Should block user details based on particular data', async () => {
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

    //   // Find the row containing the specific user name and click the Edit icon
    const userRow = page.locator('tr').filter({ hasText: '9655008962' });
    await page.waitForTimeout(5000);

    // const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
    const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
    await blockUserIcon.click();

    const confirmButton = page.locator('button', { hasText: 'Block' });
    await confirmButton.click();

    const successMessage = page.locator('text=User blocked successfully');
    console.log("Alert message: "+ successMessage)
    // await expect(successMessage).toBeVisible();

    await page.waitForTimeout(1000);
    await browser.close();

  });

});