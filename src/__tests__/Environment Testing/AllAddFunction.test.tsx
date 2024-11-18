// import { test, expect, chromium, Page } from '@playwright/test';

// test.describe('User Management Automation', () => {
//     //test.describe.configure({ mode: 'serial' });

//     //Test Number : 12 (User Add)
//     test('12.Should check the successful alert message after add user', async () => {
//         test.setTimeout(800000);

//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
//         await page.reload();
//         const userManagementButton = page.locator('text=User Management').first();
//         await userManagementButton.click();
//         await page.reload();
//         const userManagementButton1 = page.locator('text=User Management').first();
//         await userManagementButton1.click();
//         const addUserButton = page.locator('button:has-text("Add User")');
//         await expect(addUserButton).toBeVisible();
//         await addUserButton.click();
//         await page.waitForSelector('text=Add User');

//         await page.fill('input#userName', 'S D Kalyanshetti');
//         await page.fill('input#employeeCode', 'MY010');//My0010
//         await page.fill('input#designation', 'Program Officer');
//         await page.fill('input#email', 'myradaglb11@gmail.com');
//         await page.fill('input#mobileNo', '9655008970');
//         await page.fill('input#password', '1234');

//         await page.locator('#role').click();

//         await page.waitForSelector('ul[role="listbox"]');
//         const roleOptions = await page.$$('ul[role="listbox"] > li');
//         if (roleOptions.length > 0) {
//             await roleOptions[0].click();
//         }

//         const loginTypeDropdown = page.locator('#loginType');
//         await loginTypeDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]');
//         const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
//         if (loginTypeOptions.length > 0) {
//             await loginTypeOptions[2].click();
//         }
//         const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
//         await expect(addUserDialogButton).toBeVisible();
//         await addUserDialogButton.click();
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         // await page.waitForTimeout(3000);
//         console.log("Alert message: " + alertMessage);
//         //User error: MobileNumber already exits 8310450995
//         expect(alertMessage).toBe('User created successfully');
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });

//     //Test Number : 13
//     test('13.Should check the mobile number duplicate error message after add user', async () => {
//         test.setTimeout(800000);

//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
//         await page.reload();
//         const userManagementButton = page.locator('text=User Management').first();
//         await userManagementButton.click();
//         await page.reload();
//         const userManagementButton1 = page.locator('text=User Management').first();
//         await userManagementButton1.click();
//         const addUserButton = page.locator('button:has-text("Add User")');
//         await expect(addUserButton).toBeVisible();
//         await addUserButton.click();
//         await page.waitForSelector('text=Add User');

//         await page.fill('input#userName', 'S D Kalyanshetti');
//         await page.fill('input#employeeCode', 'MY011');
//         await page.fill('input#designation', 'Program Officer');
//         await page.fill('input#email', 'myradaglb11@gmail.com');
//         await page.fill('input#mobileNo', '9655008970');
//         await page.fill('input#password', '1234');

//         await page.locator('#role').click();

//         await page.waitForSelector('ul[role="listbox"]');
//         const roleOptions = await page.$$('ul[role="listbox"] > li');
//         if (roleOptions.length > 0) {
//             await roleOptions[0].click();
//         }

//         const loginTypeDropdown = page.locator('#loginType');
//         await loginTypeDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]');
//         const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
//         if (loginTypeOptions.length > 0) {
//             await loginTypeOptions[2].click();
//         }
//         const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
//         await expect(addUserDialogButton).toBeVisible();
//         await addUserDialogButton.click();
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         // await page.waitForTimeout(3000);
//         console.log("Alert message: " + alertMessage);
//         //User error: MobileNumber already exits 8310450995
//         expect(alertMessage).toBe('User error: MobileNumber already exits 9655008970');
//         await page.waitForTimeout(1000);
//         await browser.close();

//     });

//     //   Test Number : 14
//     //   Need to changes
//     test('14.Should check the duplicate error message for usercode exist after add user', async () => {
//         test.setTimeout(800000);

//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
//         await page.reload();
//         const userManagementButton = page.locator('text=User Management').first();
//         await userManagementButton.click();
//         await page.reload();
//         const userManagementButton1 = page.locator('text=User Management').first();
//         await userManagementButton1.click();
//         const addUserButton = page.locator('button:has-text("Add User")');
//         await expect(addUserButton).toBeVisible();
//         await addUserButton.click();
//         await page.waitForSelector('text=Add User');

//         await page.fill('input#userName', 'S D Kalyanshetti');
//         await page.fill('input#employeeCode', 'MY010');
//         await page.fill('input#designation', 'Project Manager');
//         await page.fill('input#email', 'guruswamy704@gamil.com');
//         await page.fill('input#mobileNo', '9655008971');
//         await page.fill('input#password', '1234');

//         // const managerTypeDropdown = page.locator('#manager');
//         // await managerTypeDropdown.click();
//         // await page.waitForSelector('ul[role="listbox"]');
//         // const managerOptions = await page.$$('ul[role="listbox"] > li');
//         // if (managerOptions.length > 0) {
//         //   await managerOptions[0].click();
//         // }

//         await page.locator('#role').click();

//         await page.waitForSelector('ul[role="listbox"]');
//         const roleOptions = await page.$$('ul[role="listbox"] > li');
//         if (roleOptions.length > 0) {
//             await roleOptions[0].click();
//         }

//         const loginTypeDropdown = page.locator('#loginType');
//         await loginTypeDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]');
//         const loginTypeOptions = await page.$$('ul[role="listbox"] > li');
//         if (loginTypeOptions.length > 0) {
//             await loginTypeOptions[2].click();
//         }
//         const addUserDialogButton = page.locator('button:has-text("Add")').nth(1);
//         await expect(addUserDialogButton).toBeVisible();
//         await addUserDialogButton.click();
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         // await page.waitForTimeout(3000);
//         console.log("Alert message: " + alertMessage);
//         //User error: MobileNumber already exits 8310450995
//         expect(alertMessage).toBe('User error: User Code already exits MY010');
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });
//     //Test Number : 16
//     test('16.Should validate the role add success alert message', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();
//         try {
//                     await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//             await page.fill('input#userName', '8877199197');
//             await page.fill('input#password', '1234');
//             await page.click('button[type="submit"]');
//             await page.waitForTimeout(1000);
//             await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//             await page.reload();
//             const userManagementButton = page.locator('text=Role Management').first();
//             await userManagementButton.click();
//             await page.waitForSelector('table');
//             const addRoleButton = page.locator('button:has-text("Add Role")');
//             await addRoleButton.click();
//             await page.fill('input#roleName', 'Testing New Role5');//Existing role added throw error
//             await page.fill('input#roleDesc', 'Desc');
//             // await page.waitForTimeout(2000);
//             const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
//             // await page.waitForTimeout(2000);
//             await editCheckbox.check();
//             const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
//             // const isButtonVisible = await addRoleDialogButton.isVisible();
//             await addRoleDialogButton.click();
//             const alertMessage = await page.locator('.MuiAlert-message').innerText();
//             // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();
//             console.log("Alertmessage " + alertMessage);

//             if (alertMessage == "Role created successfully") {
//                 expect(alertMessage).toBe('Role created successfully');
//             }
//             else {
//                 const dynamicRoleName = await page.inputValue('input#roleName');
//                 expect(alertMessage).toBe(`Duplicate record error: ${dynamicRoleName} Role Name Already Exists`);//Role created successfully
//             }
//         } catch (error) {
//             console.error("Test failed with error: ", error);
//         } finally {
//             await page.waitForTimeout(1000);
//             await browser.close();
//         }
//     });

//     //Test Number : 12
//     test('12.Should validate the role add duplicate error alert message', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();
//         try {
//                     await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//             await page.fill('input#userName', '8877199197');
//             await page.fill('input#password', '1234');
//             await page.click('button[type="submit"]');
//             await page.waitForTimeout(1000);
//             await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//             await page.reload();
//             const userManagementButton = page.locator('text=Role Management').first();
//             await userManagementButton.click();
//             await page.waitForSelector('table');
//             const addRoleButton = page.locator('button:has-text("Add Role")');
//             await addRoleButton.click();
//             await page.fill('input#roleName', 'Testing New Role');//Existing role added throw error
//             await page.fill('input#roleDesc', 'Desc');
//             // await page.waitForTimeout(2000);
//             const editCheckbox = await page.locator('input[type="checkbox"]').nth(1);
//             // await page.waitForTimeout(2000);
//             await editCheckbox.check();
//             const addRoleDialogButton = page.locator('button:has-text("Add")').nth(1);
//             // const isButtonVisible = await addRoleDialogButton.isVisible();
//             await addRoleDialogButton.click();
//             const alertMessage = await page.locator('.MuiAlert-message').innerText();
//             // const alertMessage = await page.locator('.MuiAlert-message', { timeout: 5000 }).innerText();
//             console.log("Alertmessage " + alertMessage);
//             expect(alertMessage).toBe('Duplicate record error: Testing New Role Role Name Already Exists');//Role created successfully
//         } catch (error) {
//             console.error("Test failed with error: ", error);
//         } finally {
//             await page.waitForTimeout(1000);
//             await browser.close();
//         }
//     });

//     test('07.Should click the add icon and check the successful message ', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();
//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();
//         const watershed = page.locator('text=Watershed Master').first();
//         await watershed.click();
//         await page.waitForSelector('table');
//         const clickAddWs = page.locator('button:has-text("Add Watershed")');
//         await clickAddWs.click();
//         const dialog = await page.locator('div[role="dialog"]');
//         await dialog.getByLabel('Name').fill('TestingWatershed3'); //TestingWatershed1
//         await dialog.getByLabel('Description').fill('New Description');
//         await dialog.getByLabel('District').click();
//         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 2nd district
//         await dialog.getByLabel('Taluk').click();
//         await page.click('ul[role="listbox"] li:nth-child(10)'); // Selects the 10th taluk
//         await dialog.getByLabel('Grampanchayat').click();
//         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 10th taluk
//         await dialog.getByLabel('Village').click();
//         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 10th taluk
//         await page.waitForTimeout(2000);
    
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         console.log(await addButton.isEnabled());
//         console.log(await addButton.isVisible());
//         console.log(await addButton.isHidden());
//         if (await addButton.isEnabled()) {
//             await page.locator('button:has-text("Add")').nth(1).click();
//             const alertMessage = await page.locator('.MuiAlert-message').innerText();
//             expect(alertMessage).toBe(`Watershed added`);
//         }
//         else {
//             console.log("Add button is still disble ")
//         }
//         await page.waitForTimeout(2000);
//         await browser.close();
//     });

//     test('08.Should click the add icon and check the error message ', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();
//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();
//         const watershed = page.locator('text=Watershed Master').first();
//         await watershed.click();
//         await page.waitForSelector('table');
//         const clickAddWs = page.locator('button:has-text("Add Watershed")');
//         await clickAddWs.click();
//         const dialog = await page.locator('div[role="dialog"]');
//         await dialog.getByLabel('Name').fill('TestingWatershed3');
//         await dialog.getByLabel('Description').fill('New Description');
//         await dialog.getByLabel('District').click();
//         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 2nd district
//         await dialog.getByLabel('Taluk').click();
//         await page.click('ul[role="listbox"] li:nth-child(10)'); // Selects the 10th taluk
//         await dialog.getByLabel('Grampanchayat').click();
//         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 10th taluk
//         await dialog.getByLabel('Village').click();
//         await page.click('ul[role="listbox"] li:nth-child(2)'); // Selects the 10th taluk
//         await page.waitForTimeout(2000);
    
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         console.log(await addButton.isEnabled());
//         console.log(await addButton.isVisible());
//         console.log(await addButton.isHidden());
//         if (await addButton.isEnabled()) {
//             await page.locator('button:has-text("Add")').nth(1).click();
//             const alertMessage = await page.locator('.MuiAlert-message').innerText();
//             expect(alertMessage).toBe(`Failed to add watershed`);
//         }
//         else {
//             console.log("Add button is still disble ")
//         }
//         await page.waitForTimeout(2000);
//         await browser.close();
//     });
//     test('Should add Watershed Mapping and show success alert', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
//         await page.reload();

//         const userManagementButton = page.locator('text=Watershed Mapping').first();
//         await userManagementButton.click();
//         // await page.waitForTimeout(5000);
//         const addWsAddWsMappingIcon = page.locator('button:has-text("Add Mapping")');
//         await addWsAddWsMappingIcon.isVisible();
//         await addWsAddWsMappingIcon.click();
//         await page.fill('input#remarks', 'Test Remarks');
//         // Open user dropdown and select first option
//         const loginTypeDropdown = page.locator('#user');
//         await loginTypeDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]');
//         const userNameOption = await page.$$('ul[role="listbox"] > li');
//         if (userNameOption.length > 0) {
//             await userNameOption[0].click();
//         }
//         // Open ws_name dropdown and select first option
//         const wsNameDropdown = page.locator('#ws_name');
//         await wsNameDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]');
//         const watershedOptions = await page.$$('ul[role="listbox"] > li');
//         if (watershedOptions.length > 0) {
//             await watershedOptions[0].click(); // Select the first option in the list
//         }
//         await page.keyboard.press('Escape');
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();

//         // Verify success alert
//         const alertMessage = await page.waitForSelector('div[role="alert"]');
//         const alertText = await alertMessage.innerText();
//         expect(alertText).toBe('WaterShed mapping created successfully');

//         await page.waitForTimeout(1000);
//         await browser.close();
//     });

//     test('06.Should click add farmer icon and successfull alert message ', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();
//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
//         await page.reload();
//         const FarmerMasterButton = page.locator('text=Farmer Master').first();
//         await FarmerMasterButton.click();
//         await page.waitForTimeout(5000);
//         const addFarmer = page.locator('button:has-text("Add Farmer")');
//         await addFarmer.click();
//         await page.getByRole('textbox', { name: 'Name' }).fill('Alluri reddy'); // Empty name
//         await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341953'); // Invalid Aadhar
//         await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887753'); // Invalid Mobile
//         // Click Cancel button
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         // Optionally, you can verify if a success message or alert appears
//         const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
//         if (await alertMessage.isVisible()) {
//             const alertText = await alertMessage.innerText();
//             console.log(alertText);
//             expect(alertText).toBe('Farmer added'); // Verify success message
//         }
//         // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
//         // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
//         await page.waitForTimeout(2000);
//         await browser.close();
//     });

//     test('07.Should click add farmer icon and duplicate error for number alert message ', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();
//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 60000 });
//         await page.reload();
//         const FarmerMasterButton = page.locator('text=Farmer Master').first();
//         await FarmerMasterButton.click();
//         await page.waitForTimeout(5000);
//         const addFarmer = page.locator('button:has-text("Add Farmer")');
//         await addFarmer.click();
//         await page.getByRole('textbox', { name: 'Name' }).fill('Alluri reddy'); // Empty name
//         await page.getByRole('textbox', { name: 'Aadhar' }).fill('735082341954'); // Invalid Aadhar
//         await page.getByRole('textbox', { name: 'Mobile' }).fill('9998887753'); // Invalid Mobile
//         // Click Cancel button
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         // Optionally, you can verify if a success message or alert appears
//         const alertMessage = await page.locator('div[role="alert"]'); // Adjust the selector based on your actual implementation
//         if (await alertMessage.isVisible()) {
//             const alertText = await alertMessage.innerText();
//             console.log(alertText);
//             expect(alertText).toBe('Duplicate mobile number found: 9998887753'); // Verify success message
//         }
//         // const mobileValidationMessage = await page.getByText('Mobile number should have 10 digits');
//         // expect(await mobileValidationMessage.isVisible()).toBeTruthy(); // Validate error message for Mobile    await page.waitForTimeout(2000);
//         await page.waitForTimeout(2000);
//         await browser.close();
//     });


    
//     //Intervention : Demand Side
//     //Activity : Members Capacitated
//     test('Should click the add icon and choose the demand side intervention Members capacitated', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();

//         const userManagementButton = page.locator('text=Watershed Activity').first();
//         await userManagementButton.click();
//         // await page.waitForTimeout(5000);
//         const addIcon = await page.locator('button:has-text("Add Activity")');
//         await addIcon.click();

//         const interventionDropdown = page.locator('label:has-text("Intervention") + *');
//         await interventionDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const interventionOptions = await page.$$('ul[role="listbox"] > li');
//         if (interventionOptions.length > 0) {
//             await interventionOptions[1].click();
//         }
//         const activityDropdown = page.locator('label:has-text("Activity") + *');
//         await activityDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (activityDropdownOptions.length > 0) {
//             await activityDropdownOptions[2].click();
//         }

//         // Fill out the Members Capacitated form
//         await page.getByRole('textbox', { name: 'Event Name' }).fill('Community Training');
//         await page.getByRole('textbox', { name: 'Event Type' }).fill('Workshop');
//         await page.getByRole('textbox', { name: 'date' }).fill('2024-09-30');
//         await page.getByRole('textbox', { name: 'Group' }).fill('NGO');
//         await page.getByRole('textbox', { name: 'State' }).fill('Karnataka');
//         await page.getByRole('textbox', { name: 'District' }).fill('Belleri');
//         await page.getByRole('textbox', { name: 'Taluk' }).fill('Belleri');
//         await page.getByRole('textbox', { name: 'Panchayat' }).fill('algood');
//         await page.getByRole('textbox', { name: 'Habitation' }).fill('Greenfield');
//         // await page.getByRole('textbox', { name: 'Male Participants' }).fill('20'); 
//         // await page.getByRole('textbox', { name: 'Female Participants' }).fill('20'); 
//         await page.getByRole('textbox', { name: 'Facilitator' }).fill('Nagarguna Reddy');
//         await page.getByRole('textbox', { name: 'Mobilizer' }).fill('Suji');
//         await page.getByRole('textbox', { name: 'Remarks' }).fill('Testing');
//         await page.getByRole('spinbutton', { name: 'Male Participants' }).nth(0).fill('20');
//         await page.getByRole('spinbutton', { name: 'Female Participants' }).nth(0).fill('20');
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });


//     //Intervention : Demand Side
//     //Activity : Sustainable Practice
//     test.only('Should click the add icon and choose the demand side intervention Sustainable practice', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();

//         const userManagementButton = page.locator('text=Watershed Activity').first();
//         await userManagementButton.click();
//         // await page.waitForTimeout(5000);
//         const addIcon = await page.locator('button:has-text("Add Activity")');
//         await addIcon.click();

//         const interventionDropdown = page.locator('label:has-text("Intervention") + *');
//         await interventionDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const interventionOptions = await page.$$('ul[role="listbox"] > li');
//         if (interventionOptions.length > 0) {
//             await interventionOptions[1].click();
//         }
//         const activityDropdown = page.locator('label:has-text("Activity") + *');
//         await activityDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (activityDropdownOptions.length > 0) {
//             await activityDropdownOptions[3].click();
//         }

//         await page.getByRole('textbox', { name: 'Sustainable Practice' }).fill('1');
//         const watershedDropdown = page.locator('label:has-text("Watershed") + *');
//         await watershedDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (watershedDropdownOptions.length > 0) {
//             await watershedDropdownOptions[0].click();
//         }
//         await page.getByRole('textbox', { name: 'Total Units' }).fill('1');
//         // await page.getByRole('textbox', { name: 'Water Conserved' }).fill('250');
//         await page.getByRole('textbox', { name: 'Funds spent' }).fill('100000');
//         const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
//         await fundSourceDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (fundSourceDropdownOptions.length > 0) {
//             await fundSourceDropdownOptions[0].click();
//         }
//         const nameDropdown = page.locator('label:has-text("Name") + *');
//         await nameDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         // Select first Watershed option
//         const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (nameDropdownOptions.length > 0) {
//             await nameDropdownOptions[0].click();
//         }
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });

//       //Test Number : 3
//       test('Should click the add icon and click the add button then check the alert message', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();
//         await page.waitForTimeout(5000);
//         await page.reload();

//         const userManagementButton = page.locator('text=Watershed Activity').first();
//         await userManagementButton.click();
//         await page.waitForTimeout(5000);
//         const addIcon = await page.locator('button:has-text("Add Activity")');
//         await addIcon.click();

//         const interventionDropdown = page.locator('label:has-text("Intervention") + *');
//         await interventionDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const interventionOptions = await page.$$('ul[role="listbox"] > li');
//         if (interventionOptions.length > 0) {
//             await interventionOptions[0].click();
//         }
//         const activityDropdown = page.locator('label:has-text("Activity") + *');
//         await activityDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (activityDropdownOptions.length > 0) {
//             await activityDropdownOptions[0].click();
//         }

//         const watershedDropdown = page.locator('label:has-text("Watershed") + *');
//         await watershedDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (watershedDropdownOptions.length > 0) {
//             await watershedDropdownOptions[0].click();
//         }

     
//         const surveyNumber = page.locator('#\\:r17\\:');
//         await surveyNumber.fill('1');
//         // Fill Survey No.
//         // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
//         // Fill Total Value
//         const unit = page.locator('#\\:r1b\\:');
//         await unit.fill('1');
//         const totalValueField = page.locator('#\\:r19\\:');
//         await totalValueField.fill('1');

//         const areatreated = page.locator('#\\:r1d\\:');
//         await areatreated.fill('1');
//         const fundSpent = page.locator('#\\:r1l\\:');
//         await fundSpent.fill('1');

//         // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
//         // await landTypeDropdown.click();
//         // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         // if (landTypeDropdownOptions.length > 0) {
//         //     await landTypeDropdownOptions[0].click();
//         // }

//         const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
//         await fundSourceDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (fundSourceDropdownOptions.length > 0) {
//             await fundSourceDropdownOptions[0].click();
//         }

//         const nameDropdown = page.locator('label:has-text("Name") + *');
//         await nameDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });

//         // Select first Watershed option
//         const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (nameDropdownOptions.length > 0) {
//             await nameDropdownOptions[0].click();
//         }
//         // const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');

//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         // expect(alertMessage).toBe(`Activity ${activityName} updated`);
//         expect(alertMessage).toBe('Activity added');
//         console.log('Alert Message:', alertMessage);
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });

//     //Test Number : 3
//     test('03.Should click the add icon and check alert successful message', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();

//         const userManagementButton = page.locator('text=Work Plan').first();
//         await userManagementButton.click();
//         // await page.waitForTimeout(5000);
//         const addIcon = await page.locator('button:has-text("Add Plan")');
//         await addIcon.click();
//         await page.getByRole('textbox', { name: 'Year' }).fill('2024');

//         const interventionDropdown = page.locator('label:has-text("Intervention") + *');
//         await interventionDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const interventionOptions = await page.$$('ul[role="listbox"] > li');
//         if (interventionOptions.length > 0) {
//             await interventionOptions[1].click();
//         }
//         const activityDropdown = page.locator('label:has-text("Activity") + *');
//         await activityDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (activityDropdownOptions.length > 0) {
//             await activityDropdownOptions[0].click();
//         }
//         const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
//         await landTypeDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (landTypeDropdownOptions.length > 0) {
//             await landTypeDropdownOptions[0].click();
//         }


//         const watershedDropdown = page.locator('label:has-text("Watershed") + *');
//         await watershedDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (watershedDropdownOptions.length > 0) {
//             await watershedDropdownOptions[0].click();
//         }
//         await page.getByRole('spinbutton', { name: 'Value' }).fill('250');
//         await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
//         await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
//         await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
//         await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
//         await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
//         await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
//         await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         // expect(alertMessage).toBe(`Activity ${activityName} updated`);
//         expect(alertMessage).toBe('Plan added');
//         console.log('Alert Message:', alertMessage);
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });

//     //Test Number : 4
//     test('04.Should click the add icon and check duplicate data can throw error message', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//                 await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        // await page.goto('http://localhost:3000/bfilreactdev'); 
//         await page.fill('input#userName', '8877199197');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
//         await page.reload();

//         const userManagementButton = page.locator('text=Work Plan').first();
//         await userManagementButton.click();
//         // await page.waitForTimeout(5000);
//         const addIcon = await page.locator('button:has-text("Add Plan")');
//         await addIcon.click();
//         await page.getByRole('textbox', { name: 'Year' }).fill('2024');

//         const interventionDropdown = page.locator('label:has-text("Intervention") + *');
//         await interventionDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const interventionOptions = await page.$$('ul[role="listbox"] > li');
//         if (interventionOptions.length > 0) {
//             await interventionOptions[1].click();
//         }
//         const activityDropdown = page.locator('label:has-text("Activity") + *');
//         await activityDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (activityDropdownOptions.length > 0) {
//             await activityDropdownOptions[0].click();
//         }
//         const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
//         await landTypeDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (landTypeDropdownOptions.length > 0) {
//             await landTypeDropdownOptions[0].click();
//         }


//         const watershedDropdown = page.locator('label:has-text("Watershed") + *');
//         await watershedDropdown.click();
//         await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
//         const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
//         if (watershedDropdownOptions.length > 0) {
//             await watershedDropdownOptions[0].click();
//         }
//         await page.getByRole('spinbutton', { name: 'Value' }).fill('250');
//         await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
//         await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
//         await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
//         await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
//         await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
//         await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
//         await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
//         const addButton = page.locator('button:has-text("Add")').nth(1);
//         await addButton.click();
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         expect(alertMessage).toBe('Plan added');
//         console.log('Alert Message:', alertMessage);
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });


// });