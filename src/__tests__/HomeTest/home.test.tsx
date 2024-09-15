import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Permission based screen view', () => {

    test('Should check the manager role', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694777');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        await page.reload();
        // Ensure the 'Watershed Master' section is visible and clickable
        const watershedMasterLink = page.locator('text=Dashboard');
        await expect(watershedMasterLink).toBeVisible();
        await watershedMasterLink.click(); 
        await browser.close();

    });

    test('Should check the company admin role', async () => {
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

        const dashboard = page.locator('text=Dashboard');
        await expect(dashboard).toBeVisible();
        await dashboard.click();
       
        const userManagement = page.locator('text=User Management');
        await expect(userManagement).toBeVisible();
        await userManagement.click();
        const addUserButton = page.locator('button:has-text("Add User")');
        await expect(addUserButton).toBeVisible();
        // await addUserButton.click();
        // const userRow = page.locator('tr').first(); // Adjust if you want a specific row PersonRemoveIcon
        const userRow = page.locator('tr').nth(1);
        console.log("Testing userRow: " + await userRow.innerText()); // Print the row content for debugging
        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();
        const blockUser = userRow.locator('[data-testid="PersonRemoveIcon"]');
        await expect(blockUser).toBeVisible();

        const roleManagement = page.locator('text=Role Management');
        await expect(roleManagement).toBeVisible();
        await roleManagement.click();
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await expect(addRoleButton).toBeVisible();
        const roleEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(roleEditIcon).toBeVisible();
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(deleteIcon).toBeVisible();


        const watershedMaster = page.locator('text=Watershed Master');
        await expect(watershedMaster).toBeVisible();
        await watershedMaster.click();
        const wsEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(wsEditIcon).toBeVisible();
        const addWSWDialogButton = page.locator('button:has-text("Add WS")').nth(0);
        await expect(addWSWDialogButton).toBeVisible();

        const farmerMaster = page.locator('text=Farmer Master');
        await expect(farmerMaster).toBeVisible();
        await farmerMaster.click();
        await browser.close();
    });


});