// import { test, expect, chromium, Page } from '@playwright/test';
// test.describe('Role Management Automation', () => {

//     //Test Number : 1
//     test('Should click the edit icon and update the data', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//         await page.goto('http://localhost:3000/bfilreact');
//         await page.fill('input#userName', '9677694732');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//         await page.reload();
//         const userManagementButton = page.locator('text=Watershed Activity');
//         await userManagementButton.click();

//         await page.waitForSelector('table');
//         const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
//         await editIcon.click();

//         // await page.waitForSelector('input[label="Total Units"]');
//         // await page.locator('div:has-text("Total Units") >> input').fill('0');
//         await page.getByRole('textbox', { name: 'Total Units' }).fill('1');
//         await page.getByRole('textbox', { name: 'Land Type' }).fill('Agriculture');
//         await page.getByRole('textbox', { name: 'Water Conserved' }).fill('250');
//         await page.getByRole('textbox', { name: 'Funds spent' }).fill('100000');
//         await page.getByRole('textbox', { name: 'Funds source' }).fill('Private place');

//         const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');
//         await page.click('button:has-text("Update")');
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         expect(alertMessage).toBe(`Activity ${activityName} updated`);
//         console.log('Alert Message:', alertMessage);
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });


//     //Test Number : 2
//     test('Should click the edit icon and check the button visibility', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//         await page.goto('http://localhost:3000/bfilreact');
//         await page.fill('input#userName', '9677694732');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//         await page.reload();
//         const userManagementButton = page.locator('text=Watershed Activity');
//         await userManagementButton.click();

//         await page.waitForSelector('table');
//         const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
//         await editIcon.click();
//         await page.getByRole('textbox', { name: 'Total Units' }).fill('1');
//         await page.getByRole('textbox', { name: 'Land Type' }).fill('Agriculture');
//         await page.getByRole('textbox', { name: 'Water Conserved' }).fill('250');
//         await page.getByRole('textbox', { name: 'Funds spent' }).fill('100000');
//         await page.getByRole('textbox', { name: 'Funds source' }).fill('Private place');

//         // const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');
//         const updateButton = page.locator('button:has-text("Update")'); // No need to await locator
//         const isUpdateButtonVisible = await updateButton.isVisible();    // Await the isVisible() promise
//         expect(isUpdateButtonVisible).toBe(true);                      // Now assert visibility as expected
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });


//      //Test Number : 3
//      test('Should check null data allow', async () => {
//         test.setTimeout(800000);
//         const browser = await chromium.launch({
//             headless: false,
//             channel: 'chrome',
//         });
//         const context = await browser.newContext();
//         const page: Page = await context.newPage();

//         await page.goto('http://localhost:3000/bfilreact');
//         await page.fill('input#userName', '9677694732');
//         await page.fill('input#password', '1234');
//         await page.click('button[type="submit"]');
//         await page.waitForTimeout(1000);
//         await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
//         await page.reload();
//         const userManagementButton = page.locator('text=Watershed Activity');
//         await userManagementButton.click();

//         await page.waitForSelector('table');
//         const editIcon = await page.locator('table tbody tr:first-child svg[data-testid="EditIcon"]');
//         await editIcon.click();

//         // await page.waitForSelector('input[label="Total Units"]');
//         // await page.locator('div:has-text("Total Units") >> input').fill('0');
//         await page.getByRole('textbox', { name: 'Total Units' }).fill('');
//         await page.getByRole('textbox', { name: 'Land Type' }).fill('');
//         await page.getByRole('textbox', { name: 'Water Conserved' }).fill('');
//         await page.getByRole('textbox', { name: 'Funds spent' }).fill('');
//         await page.getByRole('textbox', { name: 'Funds source' }).fill('');

//         const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');
//         await page.click('button:has-text("Update")');
//         const alertMessage = await page.locator('.MuiAlert-message').innerText();
//         expect(alertMessage).toBe(`Activity ${activityName} updated`);
//         console.log('Alert Message:', alertMessage);
//         await page.waitForTimeout(1000);
//         await browser.close();
//     });
// });