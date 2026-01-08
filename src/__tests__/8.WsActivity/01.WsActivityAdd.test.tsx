import { test, expect, chromium, Page } from '@playwright/test';
test.describe('Watershed Activity Add Automation', () => {
    // //test.describe.configure({ mode: 'serial' });

    //Test Number : 1
    test('Should click the add icon and check all field validation', async () => {
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
        const userManagementButton = page.locator('text=Watershed Activity').first();
        await userManagementButton.click();
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity Type") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }

        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await page.keyboard.press('Escape');
        await dialog.getByLabel('Name').nth(1).click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        // await page.keyboard.press('Escape');

        //const inputField = page.locator('xpath=//*[@id=":r9:"]'); // Escaping the ID
        const activityName = page.locator('xpath=//*[@id=":rr:"]');
        await activityName.fill('testing activity');
        const surveyNumber = page.locator('xpath=//*[@id=":r1d:"]');
        await surveyNumber.fill('1234/5,789B');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value

        const unit = page.locator('xpath=//*[@id=":r1h:"]');
        await unit.fill('1');
        const totalValueField = page.locator('xpath=//*[@id=":r1f:"]');
        await totalValueField.fill('1');

        const areatreated = page.locator('xpath=//*[@id=":r1j:"]');
        await areatreated.fill('1');
        const waterConserved = page.locator('xpath=//*[@id=":r1p:"]');
        await waterConserved.fill('1');
        const bfilFinancialDetails = page.locator('xpath=//*[@id=":r1r:"]');
        await bfilFinancialDetails.fill('1');

        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        // await page.getByRole('textbox', { name: 'Aadhar' }).fill('250');
        // await page.getByRole('textbox', { name: 'Funds spent' }).fill('100000');
        // Get activity name and click Update
        //  const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');
        // await page.click('button:has-text("Update")');
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 2
    test('Should click the add icon and add button is visible', async () => {
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
        const userManagementButton = page.locator('text=Watershed Activity').first();
        await userManagementButton.click();
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity Type") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }

        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await page.keyboard.press('Escape');
        await dialog.getByLabel('Name').nth(1).click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        // await page.keyboard.press('Escape');

        //const inputField = page.locator('xpath=//*[@id=":r9:"]'); // Escaping the ID
        const activityName = page.locator('xpath=//*[@id=":rr:"]');
        await activityName.fill('testing activity');
        const surveyNumber = page.locator('xpath=//*[@id=":r1d:"]');
        await surveyNumber.fill('1234/5,789B');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value

        const unit = page.locator('xpath=//*[@id=":r1h:"]');
        await unit.fill('1');
        const totalValueField = page.locator('xpath=//*[@id=":r1f:"]');
        await totalValueField.fill('1');

        const areatreated = page.locator('xpath=//*[@id=":r1j:"]');
        await areatreated.fill('1');
        const waterConserved = page.locator('xpath=//*[@id=":r1p:"]');
        await waterConserved.fill('1');
        const bfilFinancialDetails = page.locator('xpath=//*[@id=":r1r:"]');
        await bfilFinancialDetails.fill('1');

        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const addButton = page.locator('button:has-text("Add")').nth(1);
        await expect(await addButton.isEnabled()).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 2
    test('Should check the cancel button working in add activity screen', async () => {
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

        const userManagementButton = page.locator('text=Watershed Activity').first();
        await userManagementButton.click();
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity Type") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }

        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await page.keyboard.press('Escape');
        await dialog.getByLabel('Name').nth(1).click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        // await page.keyboard.press('Escape');

        //const inputField = page.locator('xpath=//*[@id=":r9:"]'); // Escaping the ID
        const activityName = page.locator('xpath=//*[@id=":rr:"]');
        await activityName.fill('testing activity');
        const surveyNumber = page.locator('xpath=//*[@id=":r1d:"]');
        await surveyNumber.fill('1234/5,789B');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value

        const unit = page.locator('xpath=//*[@id=":r1h:"]');
        await unit.fill('1');
        const totalValueField = page.locator('xpath=//*[@id=":r1f:"]');
        await totalValueField.fill('1');

        const areatreated = page.locator('xpath=//*[@id=":r1j:"]');
        await areatreated.fill('1');
        const waterConserved = page.locator('xpath=//*[@id=":r1p:"]');
        await waterConserved.fill('1');
        const bfilFinancialDetails = page.locator('xpath=//*[@id=":r1r:"]');
        await bfilFinancialDetails.fill('1');

        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const addButton = page.locator('button:has-text("Cancel")');
        await addButton.click();
        // await expect(await addButton.isEnabled()).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    /*********************************** Negative test cases ******************************* */
    //Test Number : 5
    //Intervention : Demand Side
    //Activity : Drip sprinkler
    //Test Number : 2
    test('Should click the add icon and check if dropdown not choosing that time add button visible or not', async () => {
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
        const userManagementButton = page.locator('text=Watershed Activity').first();
        await userManagementButton.click();
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity Type") + *');
        await activityDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const activityDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (activityDropdownOptions.length > 0) {
            await activityDropdownOptions[0].click();
        }
        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }

        const dialog = await page.locator('div[role="dialog"]');
        await dialog.getByLabel('Village').click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        await page.keyboard.press('Escape');
        await dialog.getByLabel('Name').nth(1).click();
        await page.click('ul[role="listbox"] li:nth-child(1)'); // Selects the 10th taluk
        // await page.keyboard.press('Escape');

        //const inputField = page.locator('xpath=//*[@id=":r9:"]'); // Escaping the ID
        const activityName = page.locator('xpath=//*[@id=":rr:"]');
        await activityName.fill('testing activity');
        const surveyNumber = page.locator('xpath=//*[@id=":r1d:"]');
        await surveyNumber.fill('1234/5,789B');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value

        const unit = page.locator('xpath=//*[@id=":r1h:"]');
        await unit.fill('1');
        const totalValueField = page.locator('xpath=//*[@id=":r1f:"]');
        await totalValueField.fill('1');

        const areatreated = page.locator('xpath=//*[@id=":r1j:"]');
        await areatreated.fill('1');
        const waterConserved = page.locator('xpath=//*[@id=":r1p:"]');
        await waterConserved.fill('1');
        // const bfilFinancialDetails = page.locator('xpath=//*[@id=":r1r:"]');
        // await bfilFinancialDetails.fill('1');

        const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        await landTypeDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const addButton = page.locator('button:has-text("Add")').nth(1);
        await expect(await addButton.isHidden()).toBe(true);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    test('Should click the add icon and all fields are empty , check add button visibility', async () => {
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
        const userManagementButton = page.locator('text=Watershed Activity').first();
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();
        const addButton = page.locator('button:has-text("Add")').nth(1);
        if (await addButton.isEnabled()) {
            console.log("Button Hidden");
        } else {
            console.log("Button disable");
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });

});