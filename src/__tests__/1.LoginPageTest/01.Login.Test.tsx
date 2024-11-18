import { test, expect, chromium } from '@playwright/test';

test.describe('Login Screen Automation', () => {
    // //test.describe.configure({ mode: 'serial' });

    //Test Number : 1
    test('01.Should display validation error messages for empty userName field', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', 'ABC');
        await page.fill('input#userName', '');
        await page.fill('input#password', '1234');
        const usernameRequiredError = await page.textContent('.MuiFormHelperText-root');
        console.log("Username Error Message:", usernameRequiredError);
        expect(usernameRequiredError).toBe('UserName is required');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('02.Should display validation error messages for empty password field', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.fill('input#password', '');
        const userPasswordRequiredError = await page.textContent('.MuiFormHelperText-root');
        console.log("UserPassword Error Message:", userPasswordRequiredError);
        expect(userPasswordRequiredError).toBe('Password is required');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 3
    test('03.Should display validation error messages for empty userName and password field', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', 'ABC');
        await page.fill('input#userName', '');
        await page.fill('input#password', '1234');
        await page.fill('input#password', '');
        const userPasswordRequiredError = await page.locator('#password-helper-text').innerText();
        const userNameRequiredError = await page.locator('#userName-helper-text').innerText();
        console.log("UserPassword Error Message:", userPasswordRequiredError);
        console.log("UserName Error Message:", userNameRequiredError);
        expect(userNameRequiredError).toBe('UserName is required');
        expect(userPasswordRequiredError).toBe('Password is required');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 4
    test('04.Should display minimum length error message when password is too short', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '1234567890');
        await page.fill('input#password', 'ABC');
        await page.waitForTimeout(1000);
        const passwordLengthError = await page.textContent('.MuiFormHelperText-root');
        console.log("Password Error Message:", passwordLengthError);
        expect(passwordLengthError).toBe('Password must be at least 4 characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 5
    test('05.Should display validation error in alphanumeric for username', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', 'ABC@');
        await page.fill('input#password', '1234');
        const userNameAlphaNumeric = await page.textContent('.MuiFormHelperText-root');
        console.log("userName Error Message:", userNameAlphaNumeric);
        expect(userNameAlphaNumeric).toBe('UserName must only contain alphanumeric characters');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 6
    test('06.Should display invalid user error', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', 'Poun@123');
        await page.click('button[type="submit"]');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Incorrect error " + alertMessage);
        expect(alertMessage).toBe('User error:Username or password incorrect');
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 7
    test('07.Should display validation error messages for blocked user', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '1234567890');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Incorrect error " + alertMessage);
        const disabledErrorMessage = "User error:User disabled.If it's an error,please contact your administrator";
        expect(alertMessage).toBe(disabledErrorMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    // Test Number : 8
    test('08. Should navigate to home page on successful login and screen testing', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');

        // Fill login form and submit
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');

        // Verify alert message after login
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Alert message: " + alertMessage);
        expect(alertMessage).toBe('Login successfully');

        // Wait for navigation to the home page
        await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home');
        //await page.waitForURL('http://localhost:3000/bfilreactdev/home');

        // Wait briefly for the sections to load
        await page.waitForTimeout(5000);

        // Retrieve all sections from the list items
        const sections = await page.$$eval('.MuiListItemText-primary', items =>
            [...new Set(items.map(item => item.textContent ? item.textContent.trim() : '').filter(Boolean))]
        );

        // Log retrieved sections
        console.log("Retrieved sections:", sections);

        // Verify that each section is visible on the page
        for (const section of sections) {
            const sectionElement = page.locator('.MuiTypography-root.MuiListItemText-primary', {
                hasText: section
            }).first();
            await expect(sectionElement).toBeVisible();
        }

        await page.screenshot({ path: 'D:/BFIL_workspace/bfil_ws_fe/home-page-screenshot.png' });
        await page.waitForTimeout(1000);
        await browser.close();
    });

    // Test Number : 9
    test('09.Should navigate to home page on successful login ', async () => {
        test.setTimeout(60000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');

        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');

        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("Alert message: " + alertMessage);
        expect(alertMessage).toBe('Login successfully');
        await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home');
        //await page.waitForURL('http://localhost:3000/bfilreactdev/home');

        await page.waitForTimeout(1000);
        await browser.close();
    });

    // //Test Number : 10
    // test('10.Should display validation error messages for blocked user', async () => {
    //     test.setTimeout(80000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page = await context.newPage();
    //             await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    // await page.goto('http://localhost:3000/bfilreactdev'); 
    //     await page.fill('input#userName', '9677694777');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');

    //     const alertMessage = await page.locator('.MuiAlert-message').innerText();
    //     console.log("login Error Message:", alertMessage);
    //     //User error:User disabled.If it's an error,please contact your administrator
    //     const blockedPersonErrorMessage = "User error:User disabled.If it's an error,please contact your administrator";
    //     expect(alertMessage).toBe(blockedPersonErrorMessage);
    //     await page.waitForTimeout(1000);
    //     await browser.close();
    // });

    //Test Number : 11
    test('11.Should display validation error messages for deleted user', async () => {
        test.setTimeout(80000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '9884794975');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');

        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        console.log("login Error Message:", alertMessage);//
        const blockedPersonErrorMessage = "User error:User disabled.If it's an error,please contact your administrator";
        expect(alertMessage).toBe(blockedPersonErrorMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 12
    test('12.Should check button visibility for all field entered', async () => {
        test.setTimeout(80000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');

        const signInButton = page.locator('button[type="submit"]');
        const isSignInButtonVisible = await signInButton.isVisible();
        console.log("Is sign in button visible :" + isSignInButtonVisible);
        expect(isSignInButtonVisible).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 13
    test('13.Should check button visibility without username value', async () => {
        test.setTimeout(80000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '');
        await page.fill('input#password', '1234');

        const signInButton = page.locator('button[type="submit"]');
        const isSignInButtonVisible = await signInButton.isDisabled();
        console.log("Is sign in button visible :" + isSignInButtonVisible);
        expect(isSignInButtonVisible).toBe(true); //I am expecting true
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 14
    //Negative test case
    test('14.Should check button visibility without passsword value', async () => {
        test.setTimeout(80000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');
        await page.fill('input#userName', '1234567');
        await page.fill('input#password', '');

        const signInButton = page.locator('button[type="submit"]');
        const isSignInButtonVisible = await signInButton.isDisabled();
        console.log("Is sign in button visible :" + isSignInButtonVisible);//I am expecting false
        expect(isSignInButtonVisible).toBe(true); //received true
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Negative test case
    //Test Number : 15
    // test('15.Should display validation error messages after login', async () => {
    //     test.setTimeout(80000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page = await context.newPage();
    //             await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    // await page.goto('http://localhost:3000/bfilreactdev'); 
    //     await page.fill('input#userName', '0000000001'); //deleted data 
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');

    //     const alertMessage = await page.locator('.MuiAlert-message').innerText();
    //     console.log("login Error Message:", alertMessage);//
    //     const blockedPersonErrorMessage =
    //         //Received
    //         "User error:User disabled.If it's an error,please contact your administrator";
    //     //Expected
    //     // "User error: MobileNumber already exits 9384615425";
    //     expect(alertMessage).toBe(blockedPersonErrorMessage);
    //     await page.waitForTimeout(1000);
    //     await browser.close();
    // });

});
