import { test, expect, chromium, Page } from '@playwright/test';

test('should enable user details', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
  
    await page.goto('http://localhost:3000/login');
    await page.fill('input#userName', '9677694732');
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
  
    await page.waitForURL('http://localhost:3000/home', { timeout: 600000 });
    await page.reload();  // this load is used to retrive some fields
    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();
  
  //   // Find the row containing the specific user name and click the Edit icon
  const userRow = page.locator('tr').filter({ hasText: '9655008962' });
  const blockUserIcon = userRow.locator('[data-testid="PersonIcon"]');
    await blockUserIcon.click();
    
    // Step 5: Confirm the blocking action in the modal dialog
    const confirmButton = page.locator('button', { hasText: 'Enable User' });
    await confirmButton.click();
  
    // Optionally: Assert that the user was successfully blocked
    const successMessage = page.locator('text=User UnBlocked successfully');
    await expect(successMessage).toBeVisible();
  });
  
  