import { test, expect, chromium, Page } from '@playwright/test';
test.describe('Watershed Activity Add Automation', () => {

    //Test Number : 1
    test('Should click the add icon and check all field validation', async () => {
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
        await page.waitForTimeout(5000);
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();
        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
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

        const surveyNumber = page.locator('#\\:r17\\:');
        await surveyNumber.fill('1');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value
        const unit = page.locator('#\\:r1b\\:');
        await unit.fill('1');
        const totalValueField = page.locator('#\\:r19\\:');
        await totalValueField.fill('1');

        const areatreated = page.locator('#\\:r1d\\:');
        await areatreated.fill('1');
        const fundSpent = page.locator('#\\:r1l\\:');
        await fundSpent.fill('1');

        // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        // await landTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (landTypeDropdownOptions.length > 0) {
        //     await landTypeDropdownOptions[0].click();
        // }

        const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        await fundSourceDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }
        const nameDropdown = page.locator('label:has-text("Name") + *');
        await nameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (nameDropdownOptions.length > 0) {
            await nameDropdownOptions[0].click();
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

        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        await page.reload();
        await page.waitForTimeout(5000);
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
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

        const surveyNumber = page.locator('#\\:r17\\:');
        await surveyNumber.fill('1');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value
        const unit = page.locator('#\\:r1b\\:');
        await unit.fill('1');
        const totalValueField = page.locator('#\\:r19\\:');
        await totalValueField.fill('1');

        const areatreated = page.locator('#\\:r1d\\:');
        await areatreated.fill('1');
        const fundSpent = page.locator('#\\:r1l\\:');
        await fundSpent.fill('1');

        // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        // await landTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (landTypeDropdownOptions.length > 0) {
        //     await landTypeDropdownOptions[0].click();
        // }

        // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        // await landTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (landTypeDropdownOptions.length > 0) {
        //     await landTypeDropdownOptions[0].click();
        // }

        const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        await fundSourceDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const nameDropdown = page.locator('label:has-text("Name") + *');
        await nameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });

        // Select first Watershed option
        const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (nameDropdownOptions.length > 0) {
            await nameDropdownOptions[0].click();
        }

        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.isVisible();


        // await page.getByRole('textbox', { name: 'Aadhar' }).fill('250');
        // await page.getByRole('textbox', { name: 'Funds spent' }).fill('100000');
        // Get activity name and click Update
        //  const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');
        // await page.click('button:has-text("Update")');

        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Test Number : 3
    test('Should click the add icon and click the add button then check the alert message', async () => {
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
        await page.waitForTimeout(5000);
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
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

     
        const surveyNumber = page.locator('#\\:r17\\:');
        await surveyNumber.fill('1');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value
        const unit = page.locator('#\\:r1b\\:');
        await unit.fill('1');
        const totalValueField = page.locator('#\\:r19\\:');
        await totalValueField.fill('1');

        const areatreated = page.locator('#\\:r1d\\:');
        await areatreated.fill('1');
        const fundSpent = page.locator('#\\:r1l\\:');
        await fundSpent.fill('1');

        // const landTypeDropdown = page.locator('label:has-text("Land Type") + *');
        // await landTypeDropdown.click();
        // await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // const landTypeDropdownOptions = await page.$$('ul[role="listbox"] > li');
        // if (landTypeDropdownOptions.length > 0) {
        //     await landTypeDropdownOptions[0].click();
        // }

        const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        await fundSourceDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const nameDropdown = page.locator('label:has-text("Name") + *');
        await nameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });

        // Select first Watershed option
        const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (nameDropdownOptions.length > 0) {
            await nameDropdownOptions[0].click();
        }
        // const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');

        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // expect(alertMessage).toBe(`Activity ${activityName} updated`);
        expect(alertMessage).toBe('Activity added');
        console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Test Number : 4
    test('Should click the add icon and check cancel button', async () => {
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
        await page.waitForTimeout(5000);
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

        const interventionDropdown = page.locator('label:has-text("Intervention") + *');
        await interventionDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const interventionOptions = await page.$$('ul[role="listbox"] > li');
        if (interventionOptions.length > 0) {
            await interventionOptions[0].click();
        }
        const activityDropdown = page.locator('label:has-text("Activity") + *');
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

       const surveyNumber = page.locator('#\\:r17\\:');
        await surveyNumber.fill('1');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value
        const unit = page.locator('#\\:r1b\\:');
        await unit.fill('1');
        const totalValueField = page.locator('#\\:r19\\:');
        await totalValueField.fill('1');

        const areatreated = page.locator('#\\:r1d\\:');
        await areatreated.fill('1');
        const fundSpent = page.locator('#\\:r1l\\:');
        await fundSpent.fill('1');

        const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        await fundSourceDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const nameDropdown = page.locator('label:has-text("Name") + *');
        await nameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });

        // Select first Watershed option
        const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (nameDropdownOptions.length > 0) {
            await nameDropdownOptions[0].click();
        }
        // const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');

        const addButton = page.locator('button:has-text("Cancel")');
        await addButton.click();
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // // expect(alertMessage).toBe(`Activity ${activityName} updated`);
        // expect(alertMessage).toBe('Activity added');
        // console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });


    /*********************************** Negative test cases ******************************* */
    //Test Number : 5
    //Intervention : Demand Side
    //Activity : Drip sprinkler
    test('Should click the add icon and choose the demand side intervention land type missing', async () => {
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
        await page.waitForTimeout(5000);
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

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

        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }

          const surveyNumber = page.locator('#\\:r17\\:');
        await surveyNumber.fill('1');
        // Fill Survey No.
        // await page.getByRole('textbox', { name: 'Survey No. *' }).fill('1');
        // Fill Total Value
        const unit = page.locator('#\\:r1b\\:');
        await unit.fill('1');
        const totalValueField = page.locator('#\\:r19\\:');
        await totalValueField.fill('1');

        const areatreated = page.locator('#\\:r1d\\:');
        await areatreated.fill('1');
        const fundSpent = page.locator('#\\:r1l\\:');
        await fundSpent.fill('1');

        const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        await fundSourceDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }

        const nameDropdown = page.locator('label:has-text("Name") + *');
        await nameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });

        // Select first Watershed option
        const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (nameDropdownOptions.length > 0) {
            await nameDropdownOptions[0].click();
        }
        // const activityName = await page.locator('div:has-text("Activity") input[disabled]').nth(1).getAttribute('value');

        const addButton = page.locator('button:has-text("Cancel")');
        await addButton.click();
        // const alertMessage = await page.locator('.MuiAlert-message').innerText();
        // // expect(alertMessage).toBe(`Activity ${activityName} updated`);
        // expect(alertMessage).toBe('Activity added');
        // console.log('Alert Message:', alertMessage);
        await page.waitForTimeout(1000);
        await browser.close();
    });

    //Intervention : Demand Side
    //Activity : Members Capacitated
    test('Should click the add icon and choose the demand side intervention Members capacitated', async () => {
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

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

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
            await activityDropdownOptions[2].click();
        }

        // Fill out the Members Capacitated form
        await page.getByRole('textbox', { name: 'Event Name' }).fill('Community Training');
        await page.getByRole('textbox', { name: 'Event Type' }).fill('Workshop');
        await page.getByRole('textbox', { name: 'date' }).fill('2024-09-30');
        await page.getByRole('textbox', { name: 'Group' }).fill('NGO');
        await page.getByRole('textbox', { name: 'State' }).fill('Karnataka');
        await page.getByRole('textbox', { name: 'District' }).fill('Belleri');
        await page.getByRole('textbox', { name: 'Taluk' }).fill('Belleri');
        await page.getByRole('textbox', { name: 'Panchayat' }).fill('algood');
        await page.getByRole('textbox', { name: 'Habitation' }).fill('Greenfield');
        // await page.getByRole('textbox', { name: 'Male Participants' }).fill('20'); 
        // await page.getByRole('textbox', { name: 'Female Participants' }).fill('20'); 
        await page.getByRole('textbox', { name: 'Facilitator' }).fill('Nagarguna Reddy');
        await page.getByRole('textbox', { name: 'Mobilizer' }).fill('Suji');
        await page.getByRole('textbox', { name: 'Remarks' }).fill('Testing');
        await page.getByRole('spinbutton', { name: 'Male Participants' }).nth(0).fill('20');
        await page.getByRole('spinbutton', { name: 'Female Participants' }).nth(0).fill('20');
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
        await page.waitForTimeout(1000);
        await browser.close();
    });


    //Intervention : Demand Side
    //Activity : Sustainable Practice
    test('Should click the add icon and choose the demand side intervention Sustainable practice', async () => {
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

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();

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
            await activityDropdownOptions[3].click();
        }

        await page.getByRole('textbox', { name: 'Sustainable Practice' }).fill('1');
        const watershedDropdown = page.locator('label:has-text("Watershed") + *');
        await watershedDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const watershedDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (watershedDropdownOptions.length > 0) {
            await watershedDropdownOptions[0].click();
        }
        await page.getByRole('textbox', { name: 'Total Units' }).fill('1');
        // await page.getByRole('textbox', { name: 'Water Conserved' }).fill('250');
        await page.getByRole('textbox', { name: 'Funds spent' }).fill('100000');
        const fundSourceDropdown = page.locator('label:has-text("Funds source") + *');
        await fundSourceDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        const fundSourceDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (fundSourceDropdownOptions.length > 0) {
            await fundSourceDropdownOptions[0].click();
        }
        const nameDropdown = page.locator('label:has-text("Name") + *');
        await nameDropdown.click();
        await page.waitForSelector('ul[role="listbox"]', { state: 'visible' });
        // Select first Watershed option
        const nameDropdownOptions = await page.$$('ul[role="listbox"] > li');
        if (nameDropdownOptions.length > 0) {
            await nameDropdownOptions[0].click();
        }
        const addButton = page.locator('button:has-text("Add")').nth(1);
        await addButton.click();
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
        await page.goto('http://localhost:3000/bfilreact');
        await page.fill('input#userName', '9677694732');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreact/home', { timeout: 600000 });
        await page.reload();

        const userManagementButton = page.locator('text=Watershed Activity');
        await userManagementButton.click();
        // await page.waitForTimeout(5000);
        const addIcon = await page.locator('button:has-text("Add Activity")');
        await addIcon.click();
        const addButton = page.locator('button:has-text("Add")').nth(1);
        if (await addButton.isHidden()) {
            console.log("Button Hidden");
        } else {
            console.log("Button Enable");
        }
        await page.waitForTimeout(1000);
        await browser.close();
    });

});