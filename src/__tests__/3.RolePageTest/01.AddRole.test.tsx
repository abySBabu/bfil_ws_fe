import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Add Role Automation', () => {
    test.describe.configure({ mode: 'serial' });
    //Test Number : 1
    test('01.Should check error message for role name', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Project Head#');
        await page.fill('input#roleDesc', 'State Project Head');
        // await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();

        await expect(page.locator('#roleName-helper-text')).toHaveText('Role Name must only contain alphanumeric characters');

        // const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        // await expect(addRoleDialogButton).toBeVisible();
        // await addRoleDialogButton.click();
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // expect(alertMessage).toBe('Role Name must only contain alphanumeric characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('02.Should check error message for role desc.', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Project Head');
        await page.fill('input#roleDesc', 'State Project Head#');
        // await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();
        await expect(page.locator('#roleDesc-helper-text')).toHaveText('Role Description must only contain alphanumeric characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('03.Should check alphanumeric for both roleName and roleDescription', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State ## Head');
        await page.fill('input#roleDesc', 'State ## Head');
        // await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();
        // const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        // await expect(addRoleDialogButton).toBeVisible();
        // await addRoleDialogButton.click();
        const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
        const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
        console.log("Error Message " + errorMessage);
        expect(errorMessage).toBe('Role Description must only contain alphanumeric characters');
        expect(errorMessageForUserName).toBe('Role Name must only contain alphanumeric characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 4
    test('04.Should check alphanumeric for both roleName, roleDescription and button visible', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State ## Head');
        await page.fill('input#roleDesc', 'State ## Head');
        // await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();
        // const errorMessageForUserName = await page.locator('#roleName-helper-text').textContent();
        // const errorMessage = await page.locator('#roleDesc-helper-text').textContent();
        // console.log("Error Message " + errorMessage);
        // expect(errorMessage).toBe('Role Description must only contain alphanumeric characters');
        // expect(errorMessageForUserName).toBe('Role Name must only contain alphanumeric characters');

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 5
    test('05.Should check atleast one permission have the role ', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        // await page.waitForTimeout(2000);
        // const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        // await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 6
    test('06.Should give all permission have the role ', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        // await page.waitForTimeout(2000);

        // Get all checkboxes
        const checkboxes = page.locator('input[type="checkbox"]');
        const checkboxCount = await checkboxes.count();

        // Click each checkbox
        for (let i = 0; i < checkboxCount; i++) {
            const checkbox = checkboxes.nth(i);
            await checkbox.check();
            // await page.waitForTimeout(1000);
        }
        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 7
    test('07.Should give view permission only ', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        // await page.waitForTimeout(2000);

        const editCheckbox = await page.locator('input[type="checkbox"]').nth(0);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 8
    test('08.Should give edit permission only ', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        // await page.waitForTimeout(2000);

        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 9
    test('09.Should Role name null', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', '');
        await page.fill('input#roleDesc', 'State Head');
        // await page.waitForTimeout(2000);

        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 10
    test('10.Should Role description null', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', '');
        // await page.waitForTimeout(2000);

        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 11
    test('11.Should rolename and description both null testing', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', '');
        await page.fill('input#roleDesc', '');
        // await page.waitForTimeout(2000);
        const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        await editCheckbox.check();
        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isDisabled();
        // await addRoleDialogButton.click();
        console.log('Is the "Add" button disable?', isButtonVisible);
        expect(isButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });


     //Test Number : 13
     test('13.Should check the add icon visibility', async () => {
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
            await page.waitForSelector('table');
            const addRoleButton = page.locator('button:has-text("Add Role")');
            const isAddRoleButtonVisible = await addRoleButton.isVisible();
            expect(isAddRoleButtonVisible).toBe(true);           
        } catch (error) {
            console.error("Test failed with error: ", error);
        } finally {
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });

    test('14.Should check the confirm button icon visibility', async () => {
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
            await page.waitForSelector('table');
            
            const addRoleButton = page.locator('button:has-text("Add Role")');
            const isAddRoleButtonVisible = await addRoleButton.isVisible();  // Await the promise
            expect(isAddRoleButtonVisible).toBe(true);  // Perform the assertion with the resolved value
        } catch (error) {
            console.error("Test failed with error: ", error);
        } finally {
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });

    //Test Number : 15
    test('15.Should check atleast one permission alert message ', async () => {
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
        const addRoleButton = page.locator('button:has-text("Add Role")');
        await addRoleButton.click();
        await page.fill('input#roleName', 'State Head');
        await page.fill('input#roleDesc', 'State Head');
        // await page.waitForTimeout(2000);
        // const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
        // await page.waitForTimeout(2000);
        // await editCheckbox.check();

        const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
        const isButtonVisible = await addRoleDialogButton.isVisible();
        console.log('Is the "Add" button disable?', isButtonVisible);
        // await addRoleDialogButton.click();
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();
        // console.log("Alertmessage " + alertMessage);
        // expect(alertMessage).toBe('Kindly add a role for atleast one screen');
        // expect(isButtonVisible).toBe(false);
        await page.waitForTimeout(1000);
        await browser.close();
    });


     //Test Number : 16
     test('16.Should validate the role add success alert message', async () => {
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
            await page.waitForSelector('table');
            const addRoleButton = page.locator('button:has-text("Add Role")');
            await addRoleButton.click();
            await page.fill('input#roleName', 'Testing New Role5');//Existing role added throw error
            await page.fill('input#roleDesc', 'Desc');
            // await page.waitForTimeout(2000);
            const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
            // await page.waitForTimeout(2000);
            await editCheckbox.check();
            const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
            // const isButtonVisible = await addRoleDialogButton.isVisible();
            await addRoleDialogButton.click();
            const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();
            console.log("Alertmessage " + alertMessage);
            
            if(alertMessage == "Role created successfully"){
                expect(alertMessage).toBe('Role created successfully');
            }
            else{
                const dynamicRoleName = await page.inputValue('input#roleName');
                expect(alertMessage).toBe(`Duplicate record error: ${dynamicRoleName} Role Name Already Exists`);//Role created successfully
            }
        } catch (error) {
            console.error("Test failed with error: ", error);
        } finally {
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });

    //Test Number : 12
    test('12.Should validate the role add duplicate error alert message', async () => {
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
            await page.waitForSelector('table');
            const addRoleButton = page.locator('button:has-text("Add Role")');
            await addRoleButton.click();
            await page.fill('input#roleName', 'Testing New Role');//Existing role added throw error
            await page.fill('input#roleDesc', 'Desc');
            // await page.waitForTimeout(2000);
            const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
            // await page.waitForTimeout(2000);
            await editCheckbox.check();
            const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
            // const isButtonVisible = await addRoleDialogButton.isVisible();
            await addRoleDialogButton.click();
            const alertMessage = await page.locator('.MuiAlert-message').innerText();
            // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();
            console.log("Alertmessage " + alertMessage);
            expect(alertMessage).toBe('Duplicate record error: Testing New Role Role Name Already Exists');//Role created successfully
        } catch (error) {
            console.error("Test failed with error: ", error);
        } finally {
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });

});
