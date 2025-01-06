import { test, expect, chromium, Page } from '@playwright/test';

test.describe('User Enable Automation', () => {
  //test.describe.configure({ mode: 'serial' });

  test('01.Should check if the enable button is working correctly', async () => {
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
    await page.waitForTimeout(2000); // Wait for the page to load after clicking User Management

    let foundIcon = false;
    let index = 0;

    // Loop through table rows until we find the block user icon
    while (!foundIcon) {
      const userRow = page.locator('tr').nth(index);
      const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');

      // Check if the block user icon is visible
      if (await blockUserIcon.isVisible()) {
        const isBlockUserEnabled = await blockUserIcon.isEnabled();
        console.log(`Is block user icon enabled in row ${index + 1}: ${isBlockUserEnabled}`);
        expect(isBlockUserEnabled).toBe(true); // Assert that the button is enabled
        foundIcon = true; // Stop the loop once the icon is found
      }

      index++; // Increment the index to check the next row

      // Optional: Add a limit to prevent an infinite loop (e.g., max 10 rows)
      if (index > 10) {
        throw new Error("No PersonIcon found in the first 10 rows");
      }
    }

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
    await page.waitForTimeout(2000); // Wait for the page to load after clicking User Management

    let foundIcon = false;
    let index = 0;

    // Loop through table rows until we find the block user icon
    while (!foundIcon) {
      const userRow = page.locator('tr').nth(index);
      const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');

      // Check if the block user icon is visible
      if (await blockUserIcon.isVisible()) {
        await blockUserIcon.click();
        console.log(`Clicked PersonIcon in row ${index + 1}`);

        // Check if the confirm button is visible after clicking the block user icon
        const confirmButton = page.locator('button', { hasText: 'Unblock' });
        const isConfirmButtonVisible = await confirmButton.isVisible();
        console.log(`Is confirm button visible: ${isConfirmButtonVisible}`);
        expect(isConfirmButtonVisible).toBe(true); // Assert that the button is visible
        foundIcon = true; // Stop the loop once the icon is found
      }

      index++; // Increment the index to check the next row

      // Optional: Add a limit to prevent an infinite loop (e.g., max 10 rows)
      if (index > 10) {
        throw new Error("No PersonIcon found in the first 10 rows");
      }
    }

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
  //           await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
  // await page.goto('http://localhost:3000/bfilreactdev');
  //   await page.fill('input#userName', '8877199197');
  //   await page.fill('input#password', '1234');
  //   await page.click('button[type="submit"]');
  //   await page.waitForTimeout(1000);
  //   await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
  //   await page.reload();  // this load is used to retrive some fields
  //   const userManagementButton = page.locator('text=User Management').first();
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

});

