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

    test('should display validation error messages for userName field', async () => {
        test.setTimeout(60000);  // Increase timeout to 60 seconds

        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/login');

        // 1. Check for error message when username is missing
        await page.fill('input#userName', '');
        await page.fill('input#password', 'validPass');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        const usernameRequiredError = await page.textContent('.MuiFormHelperText-root');
        console.log("Username Error Message:", usernameRequiredError);
        expect(usernameRequiredError).toBe('UserName is required');

        // 2. Check for error message with invalid credentials
        await page.fill('input#userName', 'invalidUser');
        await page.fill('input#password', 'invalidPass');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        const errorMessage = await page.textContent('.MuiAlert-message');
        console.log("Error Message:", errorMessage);
        expect(errorMessage).toBe('User error:Username or password incorrect');
        await browser.close();
    });

    test('should navigate to home page on successful login', async () => {
        test.setTimeout(60000);
        // const browser = await chromium.launch({ headless: false });  // Launch Chrome in non-headless mode
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000/login');
        await page.fill('input#userName', '9514116420');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        // await page.waitForNavigation();
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/home', { timeout: 60000 });
        console.log("Current URL:", page.url());
        /** 
         * Here need to understand locator to place or get the data through id or class 
         * dated on 27/08/2024 added by poun
         * 
         * **/
        const sections = [
            'Dashboard',
            'Watershed Master',
            'Watershed Mapping',
            'User Management',
            'Role Management',
            'Watershed Activity (Intervention/Task)'
        ];

        for (const section of sections) {
            const sectionElement = await page.locator(`text=${section}`);
            await expect(sectionElement).toBeVisible();
        }
        await page.screenshot({ path: 'D:/BFIL_workspace/bfil_ws_fe/home-page-screenshot.png' });

        // Assert that the URL is now the home page
        // expect(page.url()).toBe('http://localhost:3000/home');
        //await browser.close(); 
    });

    // test('should display required error message when password is not provided', async () => {
    //     test.setTimeout(60000); 
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome', 
    //     });
    //     const context = await browser.newContext();
    //     const page = await context.newPage();
    //     await page.goto('http://localhost:3000/login');
    //     await page.fill('input#userName', 'validUser');  
    //     await page.fill('input#password', ''); 
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000); 
    //     const passwordRequiredError = await page.textContent('.MuiFormHelperText-root');
    //     console.log("Password Error Message:", passwordRequiredError);
    //     expect(passwordRequiredError).toBe('Password is required');
    //     await browser.close(); 
    // });

    // test('should display minimum length error message when password is too short', async () => {
    //     test.setTimeout(60000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome', 
    //     });
    //     const context = await browser.newContext();
    //     const page = await context.newPage();
    //     await page.goto('http://localhost:3000/login');
    //     await page.fill('input#userName', 'validUser');  
    //     await page.fill('input#password', 'abc'); 
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000); 

    //     const passwordLengthError = await page.textContent('.MuiFormHelperText-root');
    //     console.log("Password Error Message:", passwordLengthError);
    //     console.log("Password Length Error Message:", passwordLengthError);
    //     expect(passwordLengthError).toBe('Password must be at least 4 characters');
    //     await browser.close(); 
    // });

});
