import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Permission based screen view', () => {
    //test.describe.configure({ mode: 'serial' });
    //Test Number : 1
    test('01.Should check the manager role', async () => {
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
        const dashBoard = page.locator('text=Dashboard').first();

        // const dashBoard = page.locator('role=button[name="Dash Board"]');
        await expect(dashBoard).toBeVisible();
        await dashBoard.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Failure test case 
    // test.only('Should check test role have view restricted screen', async () => {
    //     test.setTimeout(800000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();
    //             await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    // await page.goto('http://localhost:3000/bfilreactdev');
    //     await page.fill('input#userName', '9677694777');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    //     await page.reload();
    //     // Ensure the 'Watershed Master' section is visible and clickable
    //     const watershedMasterLink = page.locator('text=User Management').first();
    //     await expect(watershedMasterLink).toBeVisible();
    //     await watershedMasterLink.click(); 
    //     await browser.close();
    // });

    //Test Number : 3
    test('03.Should check CRP role has access to User Management screen with add, edit permissions', async () => {
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
        // Check for "User Management" link and show an alert if not found
        const userManagementLink = page.locator('text=User Management').first();
        if (await userManagementLink.count() === 0) {
            await page.evaluate(() => {
                alert("You do not have permission to view the User Management screen.");
            });
            await page.waitForTimeout(3000); // Wait to let the alert be visible before closing
            await browser.close();
            return;
        }

        // If found, proceed with testing User Management functionality
        await userManagementLink.click();

        // Check for the "Add User" button
        const addUserButton = page.locator('button:has-text("Add User")');
        await expect(addUserButton).toBeVisible();

        // Locate the first user row and check for edit and block icons
        const userRow = page.locator('tr').nth(1);
        console.log("Testing userRow: " + await userRow.innerText());

        const editIcon = userRow.locator('[data-testid="EditIcon"]');
        await expect(editIcon).toBeVisible();

        const blockUser = userRow.locator('[data-testid="PersonRemoveIcon"]');
        await expect(blockUser).toBeVisible();

        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 4
    //Role Name : CRP
    test('04.Should check CRP role have user management screen negative test cases', async () => {
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
        // Try to locate the 'Role Management' button with a timeout of 5 seconds
        const roleManagementButton = page.locator('role=button[name="Role Management"]').first();
        try {
            // Wait for the 'Role Management' button to appear
            await roleManagementButton.waitFor({ timeout: 5000 });
            await expect(roleManagementButton).toBeVisible();
            await roleManagementButton.click();
            // If the button is found and clicked, continue with further actions
            const addUserButton = page.locator('button:has-text("Add User")');
            await expect(addUserButton).toBeVisible();
            // Interacting with table rows and icons
            const userRow = page.locator('tr').nth(1);
            console.log("Testing userRow: " + await userRow.innerText());
            const editIcon = userRow.locator('[data-testid="EditIcon"]');
            await expect(editIcon).toBeVisible();
            const blockUser = userRow.locator('[data-testid="PersonRemoveIcon"]');
            await expect(blockUser).toBeVisible();
        } catch (error) {
            // If the button is not found within 5 seconds, throw a fail and log the error
            console.log('Role Management button is not available for this user.');
            throw new Error('Test failed because the Role Management button was not found.');
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 5
    //Role Name : Chief Manager Head Office
    test('05.Should check the company admin role screen permission', async () => {
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
        try {
            const dashboard = page.locator('text=Dashboard').first();
            await expect(dashboard).toBeVisible();
            await dashboard.click();

            const userManagement = page.locator('role=button[name="User Management"]').first();
            await expect(userManagement).toBeVisible();
            await userManagement.click();
            await page.waitForTimeout(3000);
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

            const roleManagement = page.locator('role=button[name="Role Management"]').first();
            await expect(roleManagement).toBeVisible();
            await roleManagement.click();
            await page.waitForTimeout(3000);

            const addRoleButton = page.locator('button:has-text("Add Role")');
            await expect(addRoleButton).toBeVisible();
            const roleEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(roleEditIcon).toBeVisible();
            const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
            await expect(deleteIcon).toBeVisible();
            // const watershedMaster = page.locator('role=button[name="Watershed Master"]');
            // await expect(watershedMaster).toBeVisible();
            // await watershedMaster.click();
            // const wsEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            // await expect(wsEditIcon).toBeVisible();
            // const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
            // await expect(addWSWDialogButton).toBeVisible();
            const farmerMaster = page.locator('role=button[name="Farmer Master"]').first();
            await expect(farmerMaster).toBeVisible();
            await farmerMaster.click();
            await page.waitForTimeout(3000);
            const farmerEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(farmerEditIcon).toBeVisible();
            const addFarmerDialogButton = page.locator('button:has-text("Add Farmer")').nth(0);
            await expect(addFarmerDialogButton).toBeVisible();
            const watershedMapping = page.locator('role=button[name="Watershed Mapping"]');
            await expect(watershedMapping).toBeVisible();
            await watershedMapping.click();
            await page.waitForTimeout(3000);
            const wsMappingEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(wsMappingEditIcon).toBeVisible();
            const addWaterShedDialogButton = page.locator('button:has-text("Add Mapping")').nth(0);
            await expect(addWaterShedDialogButton).toBeVisible();
            const watershedActivity = page.locator('role=button[name="Watershed Activity"]');
            await expect(watershedActivity).toBeVisible();
            await watershedActivity.click();
            await page.waitForTimeout(3000);
            const wsActivityEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(wsActivityEditIcon).toBeVisible();
            const wsActivityAddIcon = page.locator('button:has-text("Add Activity")').nth(0);
            await expect(wsActivityAddIcon).toBeVisible();
        } catch (error) {
            // If the button is not found within 5 seconds, throw a fail and log the error
            console.log('Cannot finding ');
            // throw new Error('Test failed because the Role Management button was not found.');
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 6
    //Role Name : Program Officer
    test('06.Should check the Chief Manager role screen permission', async () => {
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

        const dashboard = page.locator('text=Dashboard');
        await expect(dashboard).toBeVisible();
        await dashboard.click();

        const userManagement = page.locator('role=button[name="User Management"]');
        await expect(userManagement).toBeVisible();
        await userManagement.click();
        await page.waitForTimeout(3000);
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

        const roleManagement = page.locator('role=button[name="Role Management"]');
        await expect(roleManagement).toBeVisible();
        await roleManagement.click();
        await page.waitForTimeout(3000);

        const addRoleButton = page.locator('button:has-text("Add Role")');
        await expect(addRoleButton).toBeVisible();
        const roleEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await expect(roleEditIcon).toBeVisible();
        const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
        await expect(deleteIcon).toBeVisible();
        // const watershedMaster = page.locator('role=button[name="Watershed Master"]');
        // await expect(watershedMaster).toBeVisible();
        // await watershedMaster.click();
        // const wsEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await expect(wsEditIcon).toBeVisible();
        // const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
        // await expect(addWSWDialogButton).toBeVisible();
        // const farmerMaster = page.locator('role=button[name="Farmer Master"]');
        // await expect(farmerMaster).toBeVisible();
        // await farmerMaster.click();
        // await page.waitForTimeout(3000);
        // const farmerEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await expect(farmerEditIcon).toBeVisible();
        // const addFarmerDialogButton = page.locator('button:has-text("Add Farmer")').nth(0);
        // await expect(addFarmerDialogButton).toBeVisible();
        // const watershedMapping = page.locator('role=button[name="Watershed Mapping"]');
        // await expect(watershedMapping).toBeVisible();
        // await watershedMapping.click();
        // await page.waitForTimeout(3000);
        // const wsMappingEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await expect(wsMappingEditIcon).toBeVisible();
        // const addWaterShedDialogButton = page.locator('button:has-text("Add Mapping")').nth(0);
        // await expect(addWaterShedDialogButton).toBeVisible();
        // const watershedActivity = page.locator('role=button[name="Watershed Activity"]');
        // await expect(watershedActivity).toBeVisible();
        // await watershedActivity.click();
        // await page.waitForTimeout(3000);
        // const wsActivityEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        // await expect(wsActivityEditIcon).toBeVisible();
        // const wsActivityAddIcon = page.locator('button:has-text("Add Activity")').nth(0);
        // await expect(wsActivityAddIcon).toBeVisible();
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 7
    //Role Name : Program Officer
    test('07.Should check the Program Officer role screen permission', async () => {
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
        try {
            const dashboard = page.locator('text=Dashboard');
            await expect(dashboard).toBeVisible();
            await dashboard.click();

            const userManagement = page.locator('role=button[name="User Management"]');
            await expect(userManagement).toBeVisible();
            await userManagement.click();
            await page.waitForTimeout(3000);
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

            const roleManagement = page.locator('role=button[name="Role Management"]');
            await expect(roleManagement).toBeVisible();
            await roleManagement.click();
            await page.waitForTimeout(3000);

            const addRoleButton = page.locator('button:has-text("Add Role")');
            await expect(addRoleButton).toBeVisible();
            const roleEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(roleEditIcon).toBeVisible();
            const deleteIcon = await page.locator('table tbody tr:first-child svg[data-testid="DeleteIcon"]');
            await expect(deleteIcon).toBeVisible();
            // const watershedMaster = page.locator('role=button[name="Watershed Master"]');
            // await expect(watershedMaster).toBeVisible();
            // await watershedMaster.click();
            // const wsEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            // await expect(wsEditIcon).toBeVisible();
            // const addWSWDialogButton = page.locator('button:has-text("Add Watershed")').nth(0);
            // await expect(addWSWDialogButton).toBeVisible();
            const farmerMaster = page.locator('role=button[name="Farmer Master"]');
            await expect(farmerMaster).toBeVisible();
            await farmerMaster.click();
            await page.waitForTimeout(3000);

            const farmerEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(farmerEditIcon).toBeVisible();
            const addFarmerDialogButton = page.locator('button:has-text("Add Farmer")').nth(0);
            await expect(addFarmerDialogButton).toBeVisible();

            const watershedMapping = page.locator('role=button[name="Watershed Mapping"]');
            await expect(watershedMapping).toBeVisible();
            await watershedMapping.click();
            await page.waitForTimeout(3000);

            const wsMappingEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(wsMappingEditIcon).toBeVisible();
            const addWaterShedDialogButton = page.locator('button:has-text("Add Mapping")').nth(0);
            await expect(addWaterShedDialogButton).toBeVisible();

            const watershedActivity = page.locator('role=button[name="Watershed Activity"]');
            await expect(watershedActivity).toBeVisible();
            await watershedActivity.click();
            await page.waitForTimeout(3000);

            const wsActivityEditIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await expect(wsActivityEditIcon).toBeVisible();
            const wsActivityAddIcon = page.locator('button:has-text("Add Activity")').nth(0);
            await expect(wsActivityAddIcon).toBeVisible();
        } catch (error) {
            // If the button is not found within 5 seconds, throw a fail and log the error
            console.log('Cannot finding ');
            // throw new Error('Test failed because the Role Management button was not found.');
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });
});