
import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Blocklist Automation', () => {
  // //test.describe.configure({ mode: 'serial' });

  // test('1.Should check the block icon ', async () => {
  //   test.setTimeout(800000);

  //   const browser = await chromium.launch({
  //     headless: false,
  //     channel: 'chrome',
  //   });
  //   const context = await browser.newContext();
  //   const page: Page = await context.newPage();

  //           await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
  // await page.goto('http://localhost:3000/bfilreactdev'); 
  //   await page.fill('input#userName', '8877199197');
  //   await page.fill('input#password', '1234');
  //   await page.click('button[type="submit"]');
  //   await page.waitForTimeout(1000);
  //   await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
  //   await page.reload();
  //   const userManagementButton = page.locator('text=User Management').first();
  //   await userManagementButton.click();
  //   await page.waitForTimeout(5000);

  //   //   // Find the row containing the specific user name and click the Edit icon
  //   // const userRow = page.locator('tr').filter({ hasText: '8877199197' });
  //   const userRow = page.locator('tr').nth(1);  // Selects the second <tr> element
  //   const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');
  //   const isBlockIconVisible = await blockUserIcon.isVisible();
  //   expect(isBlockIconVisible).toBe(true);
  //   await page.waitForTimeout(1000);
  //   await browser.close();
  // });

  test('2.Should block user details based on index and button check visible', async () => {
    test.setTimeout(800000);

    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // await page.goto('http://localhost:3000/bfilreactdev');
    await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    await page.fill('input#userName', '8877199197');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
    await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    await page.waitForTimeout(2000);
    const userManagementButton = page.locator('text=User Management').first();
    await userManagementButton.click();
    await page.waitForTimeout(5000);

    let index = 0;
    let foundIcon = false;

    while (!foundIcon) {
      const userRow = page.locator('tr').nth(index);
      const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');

      if (await blockUserIcon.isVisible()) {
        console.log(`Found PersonRemoveIcon in row ${index + 1}`);
        expect(await blockUserIcon.isVisible()).toBe(true);
        foundIcon = true; // Mark as found to exit the loop
      }

      index++;

      if (index > 10) {
        throw new Error("No PersonRemoveIcon found in the first 10 rows");
      }
    }

    await page.waitForTimeout(1000);
    await browser.close();
  });


  test('4.Should check the confirm popup', async () => {
    test.setTimeout(800000);

    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // await page.goto('http://localhost:3000/bfilreactdev');
    await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    await page.fill('input#userName', '8877199197');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
    await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    await page.waitForTimeout(2000);
    const userManagementButton = page.locator('text=User Management').first();
    await userManagementButton.click();
    await page.waitForTimeout(5000);

    let index = 0;
    let foundIcon = false;

    while (!foundIcon) {
      const userRow = page.locator('tr').nth(index);
      const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');

      if (await blockUserIcon.isVisible()) {
        await blockUserIcon.click();
        console.log(`Clicked PersonRemoveIcon in row ${index + 1}`);

        // Check if the confirm popup is visible after clicking the block icon
        const confirmButton = page.locator('button', { hasText: 'Block' });
        const isConfirmButtonVisible = await confirmButton.isVisible();
        expect(isConfirmButtonVisible).toBe(true);
        foundIcon = true; // Exit loop after confirmation popup is checked
      }

      index++;

      if (index > 10) {
        throw new Error("No PersonRemoveIcon found in the first 10 rows");
      }
    }

    await page.waitForTimeout(1000);
    await browser.close();
  });


  test('5.Should check if the block user cancel button is working fine', async () => {
    test.setTimeout(800000);

    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    // await page.goto('http://localhost:3000/bfilreactdev');
    await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    await page.fill('input#userName', '8877199197');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    // await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });
    await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    await page.waitForTimeout(2000);

    const userManagementButton = page.locator('text=User Management').first();
    await userManagementButton.click();
    await page.waitForTimeout(5000);

    let index = 0;
    let foundIcon = false;

    while (!foundIcon) {
      const userRow = page.locator('tr').nth(index);
      const blockUserIcon = userRow.locator('[data-testid="PersonRemoveIcon"]');

      if (await blockUserIcon.isVisible()) {
        await blockUserIcon.click();
        console.log(`Clicked PersonRemoveIcon in row ${index + 1}`);

        // Verify that the cancel button is visible in the confirmation popup
        const cancelButton = page.locator('button', { hasText: 'Cancel' });
        const isCancelButtonVisible = await cancelButton.isVisible();
        expect(isCancelButtonVisible).toBe(true);

        // Click the cancel button and verify that the popup closes without further action
        await cancelButton.click();
        await page.waitForTimeout(1000);

        foundIcon = true; // Exit the loop after confirming the cancel button's functionality
      }

      index++;

      if (index > 10) {
        throw new Error("No PersonRemoveIcon found in the first 10 rows");
      }
    }

    await page.waitForTimeout(1000);
    await browser.close();
  });

});