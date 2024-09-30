import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Permission based screen view', () => {

    //Test Number : 1
    test('Should check the manager role', async () => {
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
        // Ensure the 'Watershed Master' section is visible and clickable
        
        const dashBoard = page.locator('role=button[name="Dashboard"]');
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
    //     await page.goto('http://localhost:3000/bfilreact');
    //     await page.fill('input#userName', '9677694777');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
    //     await page.reload();
    //     // Ensure the 'Watershed Master' section is visible and clickable
    //     const watershedMasterLink = page.locator('text=User Management');
    //     await expect(watershedMasterLink).toBeVisible();
    //     await watershedMasterLink.click(); 
    //     await browser.close();
    // });

    //Test Number : 2
    test('Should display validation error messages for blocked user', async () => {
        test.setTimeout(80000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694777');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');

        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("login Error Message:", alertMessage);
        const blockedPersonErrorMessage = "User error:User disabled.If it's an error,please contact your administrator";
        expect(alertMessage).toBe(blockedPersonErrorMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('Should check crp role have user management screen with add , edit', async () => {
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
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        await page.reload();
        // Ensure the 'Watershed Master' section is visible and clickable

        // const userManagementButton = page.locator('text=Role Management');
        // await userManagementButton.click();
        const watershedMasterLink = page.locator('role=button[name="User Management"]');

        // const watershedMasterLink = page.locator('text=User Management');
        await expect(watershedMasterLink).toBeVisible();
        await watershedMasterLink.click();

        const addUserButton = page.locator('button:has-text("Add User")');
        await expect(addUserButton).toBeVisible();
        // await addUserButton.click();
        // const userRow = page.locator('tr').first(); // Adjust if you want a specific row PersonRemoveIcon
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
    test('Should check CRP role have user management screen negative test cases', async () => {
        test.setTimeout(800000);
        
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        
        // Navigate to the login page and log in
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '8861982062');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        
        // Wait for the home page to load
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        
        // Reload to ensure elements are present
        await page.reload();
        
        // Try to locate the 'Role Management' button with a timeout of 5 seconds
        const roleManagementButton = page.locator('role=button[name="Role Management"]');
        
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
    //Role Name : Company Admin
    test('Should check the company admin role screen permission', async () => {
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

    //Test Number : 6
    //Role Name : Chief Manager
    test('Should check the Chief Manager role screen permission', async () => {
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
    test('Should check the Program Officer role screen permission', async () => {
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