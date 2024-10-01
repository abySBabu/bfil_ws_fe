import { test, expect, chromium, Page } from '@playwright/test';
test.describe('Role Management Automation', () => {

    //Test Number : 1
    test('Should click the edit icon and error message  for role name', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(1000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(1000);

        // await page.fill('input#roleName', 'State Project Head#');
        await page.fill('input#roleDesc', 'State Project Head##');
        await expect(page.locator('#roleDesc-helper-text')).toHaveText('Role Description must only contain alphanumeric characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('should check error message for role desc.', async () => {
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

        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForSelector('table');
        await page.waitForTimeout(1000);

        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(1000);

        // await page.fill('input#roleName', 'State Project Head');
        await page.fill('input#roleDesc', 'State Project Head#');
        await expect(page.locator('#roleDesc-helper-text')).toHaveText('Role Description must only contain alphanumeric characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('Should check alphanumeric for both roleName and roleDescription', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(1000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(1000);

        // await page.fill('input#roleName', 'State ## Head');
        await page.fill('input#roleDesc', 'State ## Head');
        await page.waitForTimeout(2000);
        // const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
        const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
        console.log("Error Message " + errorMessage);
        expect(errorMessage).toBe('Role Description must only contain alphanumeric characters');
        // expect(errorMessageForUserName).toBe('Role Name must only contain alphanumeric characters');
        await page.waitForTimeout(2000);
        await browser.close();
    });

    //Test Number : 4
    test('Should check alphanumeric for both roleName, roleDescription and button visible', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(1000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(1000);

        // await page.fill('input#roleName', 'State ## Head');
        await page.fill('input#roleDesc', 'State ## Head');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await page.waitForTimeout(2000);
        await editCheckbox.check();
        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 5
    test('Should check atleast one permission have the role ', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(1000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(1000);

        // await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        await page.waitForTimeout(2000);
        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isVisible();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 6
    test('Should give all permission have the role ', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForSelector('table');
        await page.waitForTimeout(1000);

        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        await page.waitForTimeout(2000);

        // Get all checkboxes
        const checkboxes = page.locator('input[type="checkbox"]');
        const checkboxCount = await checkboxes.count();

        // Click each checkbox
        for (let i = 0; i < checkboxCount; i++) {
            const checkbox = checkboxes.nth(i);
            await checkbox.check(); // Click/check the checkbox
            // await page.waitForTimeout(1000); // Optional: wait to ensure the action is processed
        }
        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 7
    test('Should give view permission only ', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        await page.waitForTimeout(2000);

        // await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        await page.waitForTimeout(2000);

        const editCheckbox = await page.locator('input[type="checkbox"]').nth(0);
        await page.waitForTimeout(2000);
        await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 8
    test('Should give edit permission only ', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        await page.waitForTimeout(2000);

        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 9
    test('Should Role name null', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.fill('input#roleName', '');
        await page.fill('input#roleDesc', 'State Head');
        await page.waitForTimeout(2000);
        const addRoleDialogButton = page.locator('button:has-text("Update")');
        const isButtonVisible = await addRoleDialogButton.isEnabled();
        await page.waitForTimeout(2000);

        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 10
    test('Should Role description null', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', '');
        await page.waitForTimeout(2000);

        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isEnabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 11
    test('rolename and description both null testing', async () => {
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
        const userManagementButton = page.locator('text=Role Management');
        await userManagementButton.click();
        await page.waitForTimeout(2000);

        await page.waitForSelector('table');
        const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
        await editIcon.click();
        // await page.fill('input#roleName', '');
        await page.fill('input#roleDesc', '');
        await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        await editCheckbox.check();
        const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Edit" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 12
    test('Should validate the role edit alert message', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        try {
            await page.goto('http://localhost:3000/bfilreact');
            await page.fill('input#userName', '9677694732');
            await page.fill('input#password', '1234');
            await page.click('button[type="submit"]');
            await page.waitForTimeout(1000);
            await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
            await page.reload();
            const userManagementButton = page.locator('text=Role Management');
            await userManagementButton.click();
            await page.waitForTimeout(2000);

            await page.waitForSelector('table');
            const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await editIcon.click();
            // await page.fill('input#roleName', 'Testing New Role');
            await page.fill('input#roleDesc', 'Desc');
            await page.waitForTimeout(2000);
            const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
            await editCheckbox.check();
            const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
            // const isButtonVisible = await addRoleDialogButton.isDisabled();
            await addRoleDialogButton.click();
            const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();

            console.log("Alertmessage " + alertMessage);
            expect(alertMessage).toBe('Role updated successfully');
        } catch (error) {
            console.error("Test failed with error: ", error);
        } finally {
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });


    //Test Number : 13
    test('Should check the edit button visible', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        try {
            await page.goto('http://localhost:3000/bfilreact');
            await page.fill('input#userName', '9677694732');
            await page.fill('input#password', '1234');
            await page.click('button[type="submit"]');
            await page.waitForTimeout(1000);
            await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
            await page.reload();
            const userManagementButton = page.locator('text=Role Management');
            await userManagementButton.click();
            await page.waitForTimeout(2000);

            await page.waitForSelector('table');
            const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
            await editIcon.click();
            // await page.fill('input#roleName', 'Testing New Role');
            await page.fill('input#roleDesc', 'Desc');
            await page.waitForTimeout(2000);
            const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
            await editCheckbox.check();
            const addRoleDialogButton = page.locator('button:has-text("Update")').nth(0);
            const isButtonVisible = await addRoleDialogButton.isVisible();
            expect(isButtonVisible).toBe(true);
        } catch (error) {
            console.error("Test failed with error: ", error);
        } finally {
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });


    // test('Check alphanumeric for fields', async () => {
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
    //     const userManagementButton = page.locator('text=Role Management');
    //     await userManagementButton.click();
    //     await page.waitForSelector('table');
    //     const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
    //     await editIcon.click();
    //     await page.fill('input#roleName', 'New Role##');
    //     await page.fill('input#roleDesc', 'New Role ###');
    //     await page.waitForTimeout(2000);
    //     const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
    //     await page.waitForTimeout(2000);
    //     await editCheckbox.check();
    //     await page.click('button:has-text("Edit")');
    //     const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
    //     const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
    //     console.log("Error Message " + errorMessage);
    //     expect(errorMessage).toBe('Role Description must only contain alphanumeric characters');
    //     expect(errorMessageForUserName).toBe('Role Name must only contain alphanumeric characters');
    //     await browser.close();
    // });

    // test.only('rolename and description null testing', async () => {
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
    //     const userManagementButton = page.locator('text=Role Management');
    //     await userManagementButton.click();
    //     await page.waitForSelector('table');
    //     const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
    //     await editIcon.click();
    //     await page.fill('input#roleName', '');
    //     await page.fill('input#roleDesc', '');
    //     await page.waitForTimeout(2000);
    //     const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
    //     await page.waitForTimeout(2000);
    //     await editCheckbox.check();
    //     await page.click('button:has-text("Edit")');
    //     const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
    //     const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
    //     console.log("Error Message " + errorMessage);
    //     expect(errorMessage).toBe('Role Description is required');
    //     expect(errorMessageForUserName).toBe('Role Name is required');
    //     await browser.close();
    // });


});