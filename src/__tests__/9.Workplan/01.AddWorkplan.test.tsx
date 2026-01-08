import { test, expect, chromium, Page } from '@playwright/test';

test.describe('Worplan Add Automation', () => {
    //test.describe.configure({ mode: 'serial' });
    //Test Number : 1
    test('01.Should click the add icon button visible', async () => {
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

        const userManagementButton = page.locator('text=Work Plan').first();
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Plan")');
        if (await addIcon.isVisible()) {
            console.log("Button visible ");
        }
        else {
            console.log("Button visible ");
        }
        // const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        // await fundSourceDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (fundSourceDropdownOptions.length > 0) {
        //     await fundSourceDropdownOptions[0].click();
        // }
        // const nameDropdown = page.locator('label:has-text("Name") + *');
        // await nameDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (nameDropdownOptions.length > 0) {
        //     await nameDropdownOptions[0].click();
        // }
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('02.Should click the add icon and check all field validation', async () => {
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
        const userManagementButton = page.locator('text=Work Plan').first();
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Plan")');
        await addIcon.click();
        await page.getByRole('textbox', { name: 'Year' }).fill('2024');

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[1].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (landTypeDropdownOptions.length > 0) {
            await landTypeDropdownOptions[0].click();
        }

        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }

        await page.getByRole('spinbutton', { name: 'Value' }).fill('250');
        await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
        await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
        await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
        // const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        // await fundSourceDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (fundSourceDropdownOptions.length > 0) {
        //     await fundSourceDropdownOptions[0].click();
        // }
        // const nameDropdown = page.locator('label:has-text("Name") + *');
        // await nameDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (nameDropdownOptions.length > 0) {
        //     await nameDropdownOptions[0].click();
        // }
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 5
    test('05.Should click the add icon and click the cancel button', async () => {
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
        const userManagementButton = page.locator('text=Work Plan').first();
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Plan")');
        await addIcon.click();
        await page.getByRole('textbox', { name: 'Year' }).fill('2024');

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[1].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (landTypeDropdownOptions.length > 0) {
            await landTypeDropdownOptions[0].click();
        }

        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }
        await page.getByRole('spinbutton', { name: 'Value' }).fill('250');
        await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
        await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
        await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
        const addButton = page.locator('button:has-text("Close")');
        await addButton.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 6
    test('06.Should click the add icon and check year missing , add button visibility', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');

        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        //await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });

        await page.waitForTimeout(3000);

        const userManagementButton = page.locator('text=Work Plan').first();
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Plan")');
        await addIcon.click();
        // await page.getByRole('textbox', { name: 'Year' }).fill('2024');

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[1].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (landTypeDropdownOptions.length > 0) {
            await landTypeDropdownOptions[0].click();
        }

        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }
        await page.getByRole('spinbutton', { name: 'Value' }).fill('250');
        await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
        await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
        await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        if (await addButton.isHidden()) {
            console.log("Button is hidden");
        }
        else {
            console.log("Button is Enable");
        }
        // await addButton.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 7
    test('07.Should click the add icon and check dropdown missing , add button visibility', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
        //await page.goto('http://localhost:3000/bfilreactdev');

        await page.fill('input#userName', '8877199197');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        // await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
        //await page.waitForURL('http://localhost:3000/bfilreactdev/home', { timeout: 600000 });

        await page.waitForTimeout(3000);

        const userManagementButton = page.locator('text=Work Plan').first();
        await userManagementButton.click();
        const addIcon = await page.locator('button:has-text("Add Plan")');
        await addIcon.click();
        // await page.getByRole('textbox', { name: 'Year' }).fill('2024');

        // const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        // await interventionDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const interventionOptions = await page.$$('ul[role="listbox"] > li');
        // if (interventionOptions.length > 0) {
        //     await interventionOptions[1].click();
        // }
        // const activityDropdown = page.locator('label:has-text("Activity") + *');
        // await activityDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (activityDropdownOptions.length > 0) {
        //     await activityDropdownOptions[0].click();
        // }
        // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        // await landTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (landTypeDropdownOptions.length > 0) {
        //     await landTypeDropdownOptions[0].click();
        // }

        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }
        await page.getByRole('spinbutton', { name: 'Value' }).fill('250');
        await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
        await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
        await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
        await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
        await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        if (await addButton.isHidden()) {
            console.log("Button is hidden");
        }
        else {
            console.log("Button is Enable");
        }
        // await addButton.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });

    // //Test Number : 8
    // test('Should click the add icon and check dropdown missing , add button visibility', async () => {
    //     test.setTimeout(800000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();

    //             await page.goto('https://pragatbfildev.abynet.xyz/bfilreactdev');
    // await page.goto('http://localhost:3000/bfilreactdev'); 
    //     await page.fill('input#userName', '8877199197');
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     await page.waitForURL('https://pragatbfildev.abynet.xyz/bfilreactdev/home', { timeout: 600000 });
    //     await page.reload();

    //     const userManagementButton = page.locator('text=Work Plan').first();
    //     await userManagementButton.click();
    //     await page.waitForTimeout(5000);
    //     const addIcon = await page.locator('button:has-text("Add Plan")');
    //     await addIcon.click();
    //     // await page.getByRole('textbox', { name: 'Year' }).fill('2024');

    //     // const interventionDropdown = page.locator('label:has-text("Intervention") + *');
    //     // await interventionDropdown.click();
    //     // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
    //     // const interventionOptions = await page.$$('ul[role="listbox"] > li');
    //     // if (interventionOptions.length > 0) {
    //     //     await interventionOptions[1].click();
    //     // }
    //     // const activityDropdown = page.locator('label:has-text("Activity") + *');
    //     // await activityDropdown.click();
    //     // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
    //     // const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
    //     // if (activityDropdownOptions.length > 0) {
    //     //     await activityDropdownOptions[0].click();
    //     // }
    //     // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
    //     // await landTypeDropdown.click();
    //     // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
    //     // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
    //     // if (landTypeDropdownOptions.length > 0) {
    //     //     await landTypeDropdownOptions[0].click();
    //     // }

    //     const watershedDropdown = page.locator('label:has-text("Watershed") + *');
    //     await watershedDropdown.click();
    //     await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
    //     const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
    //     if (watershedDropdownOptions.length > 0) {
    //         await watershedDropdownOptions[0].click();
    //     }
    //     await page.getByRole('textbox', { name: 'Value' }).fill('250');
    //     await page.getByRole('textbox', { name: 'UOM' }).fill('100000');
    //     await page.getByRole('spinbutton', { name: 'BFIL' }).fill('250');
    //     await page.getByRole('spinbutton', { name: 'Other Gov Scheme' }).fill('100000');
    //     await page.getByRole('spinbutton', { name: 'Other', exact: true }).fill('250');
    //     await page.getByRole('spinbutton', { name: 'MGNREGA' }).fill('100');
    //     await page.getByRole('spinbutton', { name: 'IBL' }).fill('250');
    //     await page.getByRole('spinbutton', { name: 'Community' }).fill('1000');
    //     const addButton = page.locator('button:has-text("Add")').nth(1);
    //     if (await addButton.isHidden()) {
    //         console.log("Button is hidden");
    //     }
    //     else {
    //         console.log("Button is Enable");
    //     }
    //     // await addButton.click();
    //     await page.waitForTimeout(1000);
    //     await browser.close();
    // });
});