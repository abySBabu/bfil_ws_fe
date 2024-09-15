import { test, expect, chromium } from '@playwright/test';

test.beforeAll(async () => {
    global.getComputedStyle = (element: Element) => ({
        getPropertyValue: (prop: string): string => {
            if (prop === '--button-bradius') return '4px';
            if (prop === '--text-color-default') return '#000000';
            if (prop === '--button-bgcolor-active-brand') return '#1976d2';
            return '';
        }
    }) as any;
});


test.describe('Login Screen Automation', () => {
    test('should display validation error messages for empty userName field', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        const usernameRequiredError = await page.textContent('.MuiFormHelperText-root');
        console.log("Username Error Message:", usernameRequiredError);
        expect(usernameRequiredError).toBe('UserName is required');
        await browser.close();
    });

    test('should display validation error messages for empty password field', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '');
        await page.click('button[type="submit"]');
        const userPasswordRequiredError = await page.textContent('.MuiFormHelperText-root');
        console.log("UserPassword Error Message:", userPasswordRequiredError);
        expect(userPasswordRequiredError).toBe('Password is required');
        await browser.close();
    });


    test('should display validation error messages for empty userName and password field', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '');
        await page.fill('input#password', '');
        await page.click('button[type="submit"]');
        const userPasswordRequiredError = await page.locator('#password-helper-text').innerText();
        const userNameRequiredError = await page.locator('#userName-helper-text').innerText();
        console.log("UserPassword Error Message:", userPasswordRequiredError);
        console.log("UserName Error Message:", userNameRequiredError);
         expect(userNameRequiredError).toBe('UserName is required');
         expect(userPasswordRequiredError).toBe('Password is required');
        await browser.close();
    });


    test('should display minimum length error message when password is too short', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '1234567890');
        await page.fill('input#password', 'ABC');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);

        const passwordLengthError = await page.textContent('.MuiFormHelperText-root');
        console.log("Password Error Message:", passwordLengthError);
        expect(passwordLengthError).toBe('Password must be at least 4 characters');
        await browser.close();
    });


    test('should display validation error in alphanumeric for username', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', 'ABC@');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        const userNameAlphaNumeric = await page.textContent('.MuiFormHelperText-root');
        console.log("userName Error Message:", userNameAlphaNumeric);
        expect(userNameAlphaNumeric).toBe('UserName must only contain alphanumeric characters');
        await browser.close();
    });

    test('should display invalid user error', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', 'Poun@123');
        await page.click('button[type="submit"]');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Incorrect error "+ alertMessage);
        expect(alertMessage).toBe('User error:Username or password incorrect');
        await browser.close();
    });

    
    test('should display invalid user error contact admin', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '1234567890');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Incorrect error "+ alertMessage);
        expect(alertMessage).toBe('User error:User disabled');
        await browser.close();
    });

    test('should navigate to home page on successful login', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Alertmessage "+ alertMessage);
        expect(alertMessage).toBe('Login successfully');
        // /** 
        //  * Here need to understand locator to place or get the data through id or class 
        //  * dated on 27/08/2024 added by poun
        //  * 
        //  * **/
        // const sections = [
        //     'Dashboard',
        //     'Watershed Master',
        //     'Watershed Mapping',
        //     'User Management',
        //     'Role Management',
        //     'Watershed Activity'
        // ];

        // for (const section of sections) {
        //     const sectionElement = await page.locator(`text=${section}`);
        //     await expect(sectionElement).toBeVisible();
        // }

        await page.screenshot({ path: 'D:/BFIL_workspace/bfil_ws_fe/home-page-screenshot.png' });
    });

});
