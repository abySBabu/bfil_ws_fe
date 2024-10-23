import { test, expect, chromium, Page } from '@playwright/test';
test.describe('Watershed Activity Entire workflow automation', () => {

    test('1.Should click the add icon and check all field validation then check the sucess alert message', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();
        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();
        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();

        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');

            const addIcon = page.locator('button:has-text("Add Activity")');
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

            const surveyNumber = page.locator('label:has-text("Survey No.") + div input');
            await surveyNumber.fill('5577');

            const totalValueField = page.locator('label:has-text("Total Value") + div input');
            await totalValueField.fill('50000');

            const unit = page.locator('label:has-text("Unit") + div input');
            await unit.fill('10000');

            const areaTreated = page.locator('label:has-text("Area Treated (acres)") + div input');
            await areaTreated.fill('1');

            const fundSpent = page.locator('label:has-text("Funds spent (₹)") + div input');
            await fundSpent.fill('100000');

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

            const addButton = page.locator('button:has-text("Add")').nth(1);
            if (await addButton.isVisible()) {
                await addButton.click();
                const alertMessage = await page.locator('.MuiAlert-message').innerText();
                expect(alertMessage).toBe('Activity added');
                console.log('Alert Message:', alertMessage);
                await page.waitForTimeout(1000);
                await browser.close();
            } else {
                console.log("Add button is not visible");
                await page.waitForTimeout(1000);
                await browser.close();
            }
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });

    test('2.Should click the add icon and check the duplicate activity then error message', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();
        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();
        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();
        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');
            const addIcon = page.locator('button:has-text("Add Activity")');
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
            const surveyNumber = page.locator('label:has-text("Survey No.") + div input');
            await surveyNumber.fill('5577');
            const totalValueField = page.locator('label:has-text("Total Value") + div input');
            await totalValueField.fill('50000');
            const unit = page.locator('label:has-text("Unit") + div input');
            await unit.fill('10000');
            const areaTreated = page.locator('label:has-text("Area Treated (acres)") + div input');
            await areaTreated.fill('1');
            const fundSpent = page.locator('label:has-text("Funds spent (₹)") + div input');
            await fundSpent.fill('100000');
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

            const addButton = page.locator('button:has-text("Add")').nth(1);
            if (await addButton.isVisible()) {
                await addButton.click();
                const alertMessage = await page.locator('.MuiAlert-message').innerText();
                expect(alertMessage).toBe('Activity duplicated');
                console.log('Alert Message:', alertMessage);
                await page.waitForTimeout(1000);
                await browser.close();
            } else {
                console.log("Add button is not visible");
                await page.waitForTimeout(1000);
                await browser.close();
            }
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
            await browser.close();
        }
    });

    test('3. Should click the watershed activity and check the line items', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626');
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();

        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();

        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();

        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');
            // Check if the rows in the table are present
            const tableRows = page.locator('table tbody tr');
            const rowCount = await tableRows.count();
            if (rowCount > 0) {
                console.log(`Table contains ${rowCount} rows.`);
            } else {
                console.log('No rows found in the table.');
            }
            const firstRow = tableRows.first();
            const cells = await firstRow.locator('td').allTextContents();
            console.log('First row cell values:', cells);
            await page.waitForTimeout(5000);
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
        }
        await browser.close();
    });

    test('4. Should click the watershed activity and check the line items then view the data', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2 9677694732
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();

        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();

        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();

        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');
            await page.waitForTimeout(5000);

            // Check if the rows in the table are present
            const tableRows = page.locator('table tbody tr');
            const rowCount = await tableRows.count();

            if (rowCount > 0) {
                console.log(`Table contains ${rowCount} rows.`);
                const label = await page.locator('label:has-text("Search")');
                const inputId = await label.getAttribute('for');
                if (inputId !== null) {
                    const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                    const inputField = await page.locator(`#${escapedInputId}`);
                    await inputField.fill('5577');

                    // Optional: Verify the value entered
                    const enteredValue = await inputField.inputValue();
                    console.log(`Value entered in the input field: ${enteredValue}`);
                } else {
                    console.log('The "for" attribute is missing or could not be retrieved.');
                }

                const activityDetailsButton = tableRows.locator('button[title="Activity details"]');
                if (await activityDetailsButton.isVisible()) {
                    console.log('"Activity details" button is visible.');
                    await activityDetailsButton.click();
                    console.log('"Activity details" button clicked.');

                    const interventionField = page.locator('text=Intervention:').locator('..');
                    const activityField = page.locator('text=Activity:').locator('..');
                    const statusField = page.locator('text=Status:').locator('..');

                    const interventionText = await interventionField.innerText();
                    const activityText = await activityField.innerText();
                    const statusText = await statusField.innerText();

                    if (!interventionText.includes('Intervention:')) {
                        console.log('Intervention field is empty.');
                    } else {
                        console.log('Intervention field is not empty.');
                    }

                    if (!activityText.includes('Activity:')) {
                        console.log('Activity field is empty.');
                    } else {
                        console.log('Activity field is not empty.');
                    }

                    if (!statusText.includes('Status:')) {
                        console.log('Status field is empty.');
                    } else {
                        console.log('Status field is not empty.');
                    }

                    // Check fields specific to 'Sustainable Practices'
                    if (activityText.includes('Sustainable Practices')) {
                        console.log("***Sustainable Practices*****");
                        // const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                    }

                    // Check fields specific to 'Members Capacitated'
                    if (activityText.includes('Members Capacitated')) {
                        console.log("***Menmbers Capacited*****");
                        const eventNameField = page.locator('text=Event Name:').locator('..');
                        const eventTypeField = page.locator('text=Event Type:').locator('..');
                        const eventDateField = page.locator('text=Event Date:').locator('..');
                        const targetGroupField = page.locator('text=Target Group:').locator('..');

                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const habitationField = page.locator('text=Habitation:').locator('..');

                        const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                        const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                        const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                        const facilitatorField = page.locator('text=Facilitator:').locator('..');
                        const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                        const remarksField = page.locator('text=Remarks:').locator('..');

                        const fieldsToCheck = [
                            eventNameField, eventTypeField, eventDateField, targetGroupField,
                            stateField, districtField, talukField, panchayatField, habitationField,
                            maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                            facilitatorField, mobilizerField, remarksField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }


                    }

                    //////////  Check remains activity
                    if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                        console.log("Condition true")
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }

                    }
                    // Close button functionality
                    const closeButton = page.locator('button:has-text("Close")');
                    if (await closeButton.isVisible()) {
                        console.log('"Close" button is visible.');
                        await closeButton.click();
                        console.log('"Close" button clicked.');

                        // Verify if the modal is closed
                        const dialog = page.locator('div[role="dialog"]');
                        if (await dialog.isHidden()) {
                            console.log('Dialog is closed successfully.');
                        } else {
                            console.log('Dialog did not close.');
                        }
                    } else {
                        console.log('"Close" button is not visible.');
                    }
                    await page.waitForTimeout(5000);
                } else {
                    console.log('"Activity details" button is not visible.');
                }
            } else {
                console.log('No rows found in the table.');
            }
            await page.waitForTimeout(5000);
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
        }
        await browser.close();
    });

    test('5. Should click the watershed activity and check the line items then edit the data', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();
        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();
        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();
        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            await page.waitForTimeout(5000);

            console.log('Modal closed by pressing the Escape key.');
            const tableRows = page.locator('table tbody tr');
            const rowCount = await tableRows.count();

            if (rowCount > 0) {
                console.log(`Table contains ${rowCount} rows.`);
                const label = await page.locator('label:has-text("Search")');
                const inputId = await label.getAttribute('for');
                if (inputId !== null) {
                    const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                    const inputField = await page.locator(`#${escapedInputId}`);
                    await inputField.fill('5577');

                    // Optional: Verify the value entered
                    const enteredValue = await inputField.inputValue();
                    console.log(`Value entered in the input field: ${enteredValue}`);
                } else {
                    console.log('The "for" attribute is missing or could not be retrieved.');
                }

                const activityDetailsButton = tableRows.locator('button[title="Edit activity"]');
                if (await activityDetailsButton.isVisible()) {
                    console.log('"Edit " button is visible.');
                    await activityDetailsButton.click();
                    console.log('"Edit " button clicked.');

                    const selectedActivityElement = page.locator('label:has-text("Activity") + *');
                    const activityName = await selectedActivityElement.innerText();
                    console.log("Selected Activity Name:", activityName);
                    if (activityName.includes('Sustainable Practices')) {
                        console.log('The selected activity is "Sustainable Practices".');
                        await page.getByRole('textbox', { name: 'Sustainable Practice' }).fill('New Value');
                    } else {
                        console.log('The selected activity is not "Sustainable Practices".');
                    }
                    if (!activityName.includes('Members Capacitated') && !activityName.includes('Sustainable Practices')) {
                        await page.getByRole('textbox', { name: 'Survey No.' }).fill('1');
                    }
                    // Check fields specific to 'Members Capacitated'
                    if (activityName.includes('Members Capacitated')) {
                        await page.getByRole('textbox', { name: 'Event Name' }).fill('Community Training'); // Empty name
                        await page.getByRole('textbox', { name: 'Event Type' }).fill('Workshop'); // Empty name
                        await page.getByRole('textbox', { name: 'date' }).fill('2024-09-30'); // Empty name
                        await page.getByRole('textbox', { name: 'Target Group' }).fill('NGO'); // Empty name
                        // await page.getByRole('textbox', { name: 'Male Participants' }).fill('20'); 
                        // await page.getByRole('textbox', { name: 'Female Participants' }).fill('20'); 
                        await page.getByRole('textbox', { name: 'Facilitator' }).fill('Nagarguna Reddy');
                        await page.getByRole('textbox', { name: 'Mobilizer' }).fill('Suji');
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Testing');
                        await page.getByRole('spinbutton', { name: 'Male Participants' }).nth(0).fill('20');
                        await page.getByRole('spinbutton', { name: 'Female Participants' }).nth(0).fill('20');
                    }
                    // Close button functionality
                    const closeButton = page.locator('button:has-text("Update")');
                    if (await closeButton.isVisible()) {
                        console.log('"Update" button is visible.');
                        await closeButton.click();
                        console.log('"Update" button clicked.');
                        // Verify if the modal is closed
                        const dialog = page.locator('div[role="dialog"]');
                        if (await dialog.isHidden()) {
                            console.log('Dialog is closed successfully.');
                        } else {
                            console.log('Dialog did not close.');
                        }
                    } else {
                        console.log('"Update" button is not visible.');
                    }
                    await page.waitForTimeout(5000);
                    //  } 
                    // else {
                    //     console.log('"Activity details" button is not visible.');
                    // }
                } else {
                    console.log('Edit icon is not visible');
                }
                await page.waitForTimeout(5000);
            } else {
                console.log('No row in line item');
                await page.waitForTimeout(1000);
            }
        } else {
            console.log('Resource person is not found on the page');
            await page.waitForTimeout(1000);
        }
        await browser.close();
    });


    // test('6. Should click the watershed activity and check the line items then process the data', async () => {
    //     test.setTimeout(800000);
    //     const browser = await chromium.launch({
    //         headless: false,
    //         channel: 'chrome',
    //     });
    //     const context = await browser.newContext();
    //     const page: Page = await context.newPage();
    //     await page.goto('http://localhost:3000/bfilreacttest');
    //     await page.fill('input#userName', '6384742626'); // Test user 2
    //     await page.fill('input#password', '1234');
    //     await page.click('button[type="submit"]');
    //     await page.waitForTimeout(1000);
    //     await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    //     await page.reload();

    //     const watershedActivity = page.locator('text=Watershed Activity');
    //     await watershedActivity.click();

    //     const avatar = page.locator('div.MuiAvatar-root');
    //     await avatar.click();

    //     const resourcePersonText = page.locator('text=Community Resource person');
    //     if (await resourcePersonText.isVisible()) {
    //         console.log('Resource person is present on the page.');
    //         await page.keyboard.press('Escape');
    //         console.log('Modal closed by pressing the Escape key.');

    //         // Check if the rows in the table are present
    //         const tableRows = page.locator('table tbody tr');
    //         const rowCount = await tableRows.count();

    //         if (rowCount > 0) {
    //             console.log(`Table contains ${rowCount} rows.`);

    //             // Check if the "Activity details" button is visible in the last row
    //             const activityDetailsButton = tableRows.last().locator('button[title="Activity approval"]');
    //             if (await activityDetailsButton.isVisible()) {
    //                 console.log('"Activity details" button is visible.');
    //                 await activityDetailsButton.click();
    //                 console.log('"Activity details" button clicked.');

    //                 // Check fields based on different scenarios
    //                 const interventionField = page.locator('text=Intervention:').locator('..');
    //                 const activityField = page.locator('text=Activity:').locator('..');
    //                 const statusField = page.locator('text=Status:').locator('..');
    //                 const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');

    //                 // Validate that the basic fields are not empty
    //                 const interventionText = await interventionField.innerText();
    //                 const activityText = await activityField.innerText();
    //                 const statusText = await statusField.innerText();

    //                 if (!interventionText.includes('Intervention:')) {
    //                     console.log('Intervention field is empty.');
    //                 } else {
    //                     console.log('Intervention field is not empty.');
    //                 }

    //                 if (!activityText.includes('Activity:')) {
    //                     console.log('Activity field is empty.');
    //                 } else {
    //                     console.log('Activity field is not empty.');
    //                 }

    //                 if (!statusText.includes('Status:')) {
    //                     console.log('Status field is empty.');
    //                 } else {
    //                     console.log('Status field is not empty.');
    //                 }

    //                 // Check fields specific to 'Sustainable Practices'
    //                 if (activityText.includes('Sustainable Practices')) {
    //                     if (await sustainablePracticeField.isVisible()) {
    //                         const sustainablePracticeText = await sustainablePracticeField.innerText();
    //                         if (!sustainablePracticeText.includes('Sustainable Practice:')) {
    //                             console.log('Sustainable Practice field is empty.');
    //                         } else {
    //                             console.log('Sustainable Practice field is not empty.');
    //                         }
    //                     }
    //                 }

    //                 // Check fields specific to 'Members Capacitated'
    //                 if (activityText.includes('Members Capacitated')) {
    //                     const eventNameField = page.locator('text=Event Name:').locator('..');
    //                     const eventTypeField = page.locator('text=Event Type:').locator('..');
    //                     const eventDateField = page.locator('text=Event Date:').locator('..');
    //                     const targetGroupField = page.locator('text=Target Group:').locator('..');

    //                     const stateField = page.locator('text=State:').locator('..');
    //                     const districtField = page.locator('text=District:').locator('..');
    //                     const talukField = page.locator('text=Taluk:').locator('..');
    //                     const panchayatField = page.locator('text=Panchayat:').locator('..');
    //                     const habitationField = page.locator('text=Habitation:').locator('..');

    //                     const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
    //                     const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
    //                     const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

    //                     const facilitatorField = page.locator('text=Facilitator:').locator('..');
    //                     const mobilizerField = page.locator('text=Mobilizer:').locator('..');
    //                     const remarksField = page.locator('text=Remarks:').locator('..');

    //                     const fieldsToCheck = [
    //                         eventNameField, eventTypeField, eventDateField, targetGroupField,
    //                         stateField, districtField, talukField, panchayatField, habitationField,
    //                         maleParticipantsField, femaleParticipantsField, totalParticipantsField,
    //                         facilitatorField, mobilizerField, remarksField
    //                     ];

    //                     for (const field of fieldsToCheck) {
    //                         const text = await field.innerText();
    //                         if (text.trim().endsWith(':')) {
    //                             console.log(`Field ${text} is empty.`);
    //                         } else {
    //                             console.log(`Field ${text} is not empty.`);
    //                         }
    //                     }
    //                 }
    //                 // Close button functionality
    //                 const closeButton = page.locator('button:has-text("Close")');
    //                 if (await closeButton.isVisible()) {
    //                     console.log('"Close" button is visible.');
    //                     await closeButton.click();
    //                     console.log('"Close" button clicked.');

    //                     // Verify if the modal is closed
    //                     const dialog = page.locator('div[role="dialog"]');
    //                     if (await dialog.isHidden()) {
    //                         console.log('Dialog is closed successfully.');
    //                     } else {
    //                         console.log('Dialog did not close.');
    //                     }
    //                 } else {
    //                     console.log('"Close" button is not visible.');
    //                 }
    //                 await page.waitForTimeout(5000);
    //             } else {
    //                 console.log('"Activity details" button is not visible.');
    //             }
    //         } else {
    //             console.log('No rows found in the table.');
    //         }

    //         await page.waitForTimeout(5000);
    //     } else {
    //         console.log('Resource person is not found on the page.');
    //         await page.waitForTimeout(1000);
    //     }

    //     await browser.close();
    // });


    test('7. Should click the watershed activity and check the line items then process the data', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2 9677694732
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();

        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();

        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();

        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');
            await page.waitForTimeout(5000);

            // Check if the rows in the table are present
            const tableRows = page.locator('table tbody tr');
            const rowCount = await tableRows.count();

            if (rowCount > 0) {
                console.log(`Table contains ${rowCount} rows.`);
                const label = await page.locator('label:has-text("Search")');
                const inputId = await label.getAttribute('for');
                if (inputId !== null) {
                    const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                    const inputField = await page.locator(`#${escapedInputId}`);
                    await inputField.fill('5577');

                    // Optional: Verify the value entered
                    const enteredValue = await inputField.inputValue();
                    console.log(`Value entered in the input field: ${enteredValue}`);
                } else {
                    console.log('The "for" attribute is missing or could not be retrieved.');
                }

                // Check if the "Activity details" button is visible in the last row
                const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
                if (await activityDetailsButton.isVisible()) {
                    console.log('"Activity details" button is visible.');
                    await activityDetailsButton.click();
                    console.log('"Activity details" button clicked.');

                    const interventionField = page.locator('text=Intervention:').locator('..');
                    const activityField = page.locator('text=Activity:').locator('..');
                    const statusField = page.locator('text=Status:').locator('..');

                    const interventionText = await interventionField.innerText();
                    const activityText = await activityField.innerText();
                    const statusText = await statusField.innerText();

                    if (!interventionText.includes('Intervention:')) {
                        console.log('Intervention field is empty.');
                    } else {
                        console.log('Intervention field is not empty.');
                    }

                    if (!activityText.includes('Activity:')) {
                        console.log('Activity field is empty.');
                    } else {
                        console.log('Activity field is not empty.');
                    }

                    if (!statusText.includes('Status:')) {
                        console.log('Status field is empty.');
                    } else {
                        console.log('Status field is not empty.');
                    }

                    // Check fields specific to 'Sustainable Practices'
                    if (activityText.includes('Sustainable Practices')) {
                        console.log("***Sustainable Practices*****");
                        const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar, sustainablePracticeField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                    }

                    // Check fields specific to 'Members Capacitated'
                    if (activityText.includes('Members Capacitated')) {
                        console.log("***Menmbers Capacited*****");
                        const eventNameField = page.locator('text=Event Name:').locator('..');
                        const eventTypeField = page.locator('text=Event Type:').locator('..');
                        const eventDateField = page.locator('text=Event Date:').locator('..');
                        const targetGroupField = page.locator('text=Target Group:').locator('..');

                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const habitationField = page.locator('text=Habitation:').locator('..');

                        const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                        const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                        const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                        const facilitatorField = page.locator('text=Facilitator:').locator('..');
                        const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                        const remarksField = page.locator('text=Remarks:').locator('..');

                        const fieldsToCheck = [
                            eventNameField, eventTypeField, eventDateField, targetGroupField,
                            stateField, districtField, talukField, panchayatField, habitationField,
                            maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                            facilitatorField, mobilizerField, remarksField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                    }

                    //////////  Check remains activity
                    if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                        console.log("Condition true")
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                    }

                    // Send to {next} button functionality
                    const sendButton = page.locator('button', { hasText: /^Send to / });
                    if (await sendButton.isVisible()) {
                        console.log('"Send to {next}" button is visible.');

                        // Get the actual text of the button, e.g., "Send to Next Step"
                        const buttonText = await sendButton.textContent();

                        if (buttonText) { // Check if buttonText is not null or undefined
                            console.log(`Button text: ${buttonText}`);

                            // Optionally, extract the {next} value from the button text
                            const nextValue = buttonText.replace('Send to ', '').trim();
                            console.log(`Dynamic next value: ${nextValue}`);

                            // Click the "Send to {next}" button
                            await sendButton.click();
                            console.log(`"Send to ${nextValue}" button clicked.`);
                        } else {
                            console.log('Button text could not be retrieved.');
                        }

                        // Optionally, add any verification logic after the button is clicked
                        // For example, check if a status message appears or a new page loads
                    } else {
                        console.log('"Send to {next}" button is not visible.');
                    }

                    await page.waitForTimeout(5000);
                } else {
                    console.log('"Activity details" button is not visible.');
                }
            } else {
                console.log('No rows found in the table.');
            }
            await page.waitForTimeout(5000);
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
        }
        await browser.close();
    });

    ///////////////////////////////Approver 1//////////////////////////////////////

    test('8. Should click the watershed activity and check the line items then process the data', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2 9677694732
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();

        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();

        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();

        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');
            await page.waitForTimeout(5000);

            // Check if the rows in the table are present
            const tableRows = page.locator('table tbody tr');
            const rowCount = await tableRows.count();

            if (rowCount > 0) {
                console.log(`Table contains ${rowCount} rows.`);
                const label = await page.locator('label:has-text("Search")');
                const inputId = await label.getAttribute('for');
                if (inputId !== null) {
                    const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                    const inputField = await page.locator(`#${escapedInputId}`);
                    await inputField.fill('5577');

                    // Optional: Verify the value entered
                    const enteredValue = await inputField.inputValue();
                    console.log(`Value entered in the input field: ${enteredValue}`);
                } else {
                    console.log('The "for" attribute is missing or could not be retrieved.');
                }
                // Check if the "Activity details" button is visible in the last row
                const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
                if (await activityDetailsButton.isVisible()) {
                    console.log('"Activity details" button is visible.');
                    await activityDetailsButton.click();
                    console.log('"Activity details" button clicked.');

                    const interventionField = page.locator('text=Intervention:').locator('..');
                    const activityField = page.locator('text=Activity:').locator('..');
                    const statusField = page.locator('text=Status:').locator('..');

                    const interventionText = await interventionField.innerText();
                    const activityText = await activityField.innerText();
                    const statusText = await statusField.innerText();

                    if (!interventionText.includes('Intervention:')) {
                        console.log('Intervention field is empty.');
                    } else {
                        console.log('Intervention field is not empty.');
                    }

                    if (!activityText.includes('Activity:')) {
                        console.log('Activity field is empty.');
                    } else {
                        console.log('Activity field is not empty.');
                    }

                    if (!statusText.includes('Status:')) {
                        console.log('Status field is empty.');
                    } else {
                        console.log('Status field is not empty.');
                    }

                    // Check fields specific to 'Sustainable Practices'
                    if (activityText.includes('Sustainable Practices')) {
                        console.log("***Sustainable Practices*****");
                        const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar, sustainablePracticeField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                    }

                    // Check fields specific to 'Members Capacitated'
                    if (activityText.includes('Members Capacitated')) {
                        console.log("***Menmbers Capacited*****");
                        const eventNameField = page.locator('text=Event Name:').locator('..');
                        const eventTypeField = page.locator('text=Event Type:').locator('..');
                        const eventDateField = page.locator('text=Event Date:').locator('..');
                        const targetGroupField = page.locator('text=Target Group:').locator('..');

                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const habitationField = page.locator('text=Habitation:').locator('..');

                        const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                        const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                        const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                        const facilitatorField = page.locator('text=Facilitator:').locator('..');
                        const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                        const remarksField = page.locator('text=Remarks:').locator('..');

                        const fieldsToCheck = [
                            eventNameField, eventTypeField, eventDateField, targetGroupField,
                            stateField, districtField, talukField, panchayatField, habitationField,
                            maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                            facilitatorField, mobilizerField, remarksField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                    }

                    //////////  Check remains activity
                    if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                        console.log("Condition true")
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                    }

                    // Send to {next} button functionality
                    const sendButton = page.locator('button', { hasText: /^Send to / });
                    if (await sendButton.isVisible()) {
                        console.log('"Send to {next}" button is visible.');

                        // Get the actual text of the button, e.g., "Send to Next Step"
                        const buttonText = await sendButton.textContent();

                        if (buttonText) { // Check if buttonText is not null or undefined
                            console.log(`Button text: ${buttonText}`);

                            // Optionally, extract the {next} value from the button text
                            const nextValue = buttonText.replace('Send to ', '').trim();
                            console.log(`Dynamic next value: ${nextValue}`);

                            // Click the "Send to {next}" button
                            await sendButton.click();
                            console.log(`"Send to ${nextValue}" button clicked.`);
                        } else {
                            console.log('Button text could not be retrieved.');
                        }

                        // Optionally, add any verification logic after the button is clicked
                        // For example, check if a status message appears or a new page loads
                    } else {
                        console.log('"Send to {next}" button is not visible.');
                    }

                    await page.waitForTimeout(5000);
                } else {
                    console.log('"Activity details" button is not visible.');
                }
            } else {
                console.log('No rows found in the table.');
            }
            await page.waitForTimeout(5000);
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
        }
        await browser.close();
    });

    test('9. Should click the watershed activity and check the line items then send to approver 1', async () => {
        test.setTimeout(800000);
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
        });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        await page.goto('http://localhost:3000/bfilreacttest');
        await page.fill('input#userName', '6384742626'); // Test user 2 9677694732
        await page.fill('input#password', '1234');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
        await page.reload();

        const watershedActivity = page.locator('text=Watershed Activity');
        await watershedActivity.click();

        const avatar = page.locator('div.MuiAvatar-root');
        await avatar.click();

        const resourcePersonText = page.locator('text=Community Resource person');
        if (await resourcePersonText.isVisible()) {
            console.log('Resource person is present on the page.');
            await page.keyboard.press('Escape');
            console.log('Modal closed by pressing the Escape key.');
            await page.waitForTimeout(5000);

            // Check if the rows in the table are present
            const tableRows = page.locator('table tbody tr');
            const rowCount = await tableRows.count();

            if (rowCount > 0) {
                console.log(`Table contains ${rowCount} rows.`);
                const label = await page.locator('label:has-text("Search")');
                const inputId = await label.getAttribute('for');
                if (inputId !== null) {
                    const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                    const inputField = await page.locator(`#${escapedInputId}`);
                    await inputField.fill('5577');

                    // Optional: Verify the value entered
                    const enteredValue = await inputField.inputValue();
                    console.log(`Value entered in the input field: ${enteredValue}`);
                } else {
                    console.log('The "for" attribute is missing or could not be retrieved.');
                }
                // Check if the "Activity details" button is visible in the last row
                const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
                if (await activityDetailsButton.isVisible()) {
                    console.log('"Activity details" button is visible.');
                    await activityDetailsButton.click();
                    console.log('"Activity details" button clicked.');

                    const interventionField = page.locator('text=Intervention:').locator('..');
                    const activityField = page.locator('text=Activity:').locator('..');
                    const statusField = page.locator('text=Status:').locator('..');

                    const interventionText = await interventionField.innerText();
                    const activityText = await activityField.innerText();
                    const statusText = await statusField.innerText();

                    if (!interventionText.includes('Intervention:')) {
                        console.log('Intervention field is empty.');
                    } else {
                        console.log('Intervention field is not empty.');
                    }

                    if (!activityText.includes('Activity:')) {
                        console.log('Activity field is empty.');
                    } else {
                        console.log('Activity field is not empty.');
                    }

                    if (!statusText.includes('Status:')) {
                        console.log('Status field is empty.');
                    } else {
                        console.log('Status field is not empty.');
                    }

                    // Check fields specific to 'Sustainable Practices'
                    if (activityText.includes('Sustainable Practices')) {
                        console.log("***Sustainable Practices*****");
                        const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar, sustainablePracticeField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                    }

                    // Check fields specific to 'Members Capacitated'
                    if (activityText.includes('Members Capacitated')) {
                        console.log("***Menmbers Capacited*****");
                        const eventNameField = page.locator('text=Event Name:').locator('..');
                        const eventTypeField = page.locator('text=Event Type:').locator('..');
                        const eventDateField = page.locator('text=Event Date:').locator('..');
                        const targetGroupField = page.locator('text=Target Group:').locator('..');

                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const habitationField = page.locator('text=Habitation:').locator('..');

                        const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                        const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                        const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                        const facilitatorField = page.locator('text=Facilitator:').locator('..');
                        const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                        const remarksField = page.locator('text=Remarks:').locator('..');

                        const fieldsToCheck = [
                            eventNameField, eventTypeField, eventDateField, targetGroupField,
                            stateField, districtField, talukField, panchayatField, habitationField,
                            maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                            facilitatorField, mobilizerField, remarksField
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                    }

                    //////////  Check remains activity
                    if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                        console.log("Condition true")
                        const stateField = page.locator('text=State:').locator('..');
                        const districtField = page.locator('text=District:').locator('..');
                        const talukField = page.locator('text=Taluk:').locator('..');
                        const panchayatField = page.locator('text=Panchayat:').locator('..');
                        const villageField = page.locator('text=Village:').locator('..');
                        const surveyNo = page.locator('text=Survey No:').locator('..');
                        const TotalValue = page.locator('text=Total Value:').locator('..');
                        const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                        const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                        const fundSource = page.locator('text=Funds source:').locator('..');
                        const Name = page.locator('text=Name:').locator('..');
                        const Aadhar = page.locator('text=Aadhar:').locator('..');
                        const mobileNumber = page.locator('text=Mobile No:').locator('..');
                        const fieldsToCheck = [
                            villageField, surveyNo, TotalValue, areaTreated,
                            stateField, districtField, talukField, panchayatField, Name,
                            fundSpent, fundSource, mobileNumber,
                            Aadhar
                        ];

                        for (const field of fieldsToCheck) {
                            const text = await field.innerText();
                            if (text.trim().endsWith(':')) {
                                console.log(`Field ${text} is empty.`);
                            } else {
                                console.log(`Field ${text} is not empty.`);
                            }
                        }
                        await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                    }

                    // Send to {next} button functionality
                    const sendButton = page.locator('button', { hasText: /^Send to / });
                    if (await sendButton.isVisible()) {
                        console.log('"Send to {next}" button is visible.');

                        // Get the actual text of the button, e.g., "Send to Next Step"
                        const buttonText = await sendButton.textContent();

                        if (buttonText) { // Check if buttonText is not null or undefined
                            console.log(`Button text: ${buttonText}`);

                            // Optionally, extract the {next} value from the button text
                            const nextValue = buttonText.replace('Send to ', '').trim();
                            console.log(`Dynamic next value: ${nextValue}`);

                            // Click the "Send to {next}" button
                            await sendButton.click();
                            console.log(`"Send to ${nextValue}" button clicked.`);
                        } else {
                            console.log('Button text could not be retrieved.');
                        }

                        // Optionally, add any verification logic after the button is clicked
                        // For example, check if a status message appears or a new page loads
                    } else {
                        console.log('"Send to {next}" button is not visible.');
                    }

                    await page.waitForTimeout(5000);
                } else {
                    console.log('"Activity details" button is not visible.');
                }
            } else {
                console.log('No rows found in the table.');
            }
            await page.waitForTimeout(5000);
        } else {
            console.log('Resource person is not found on the page.');
            await page.waitForTimeout(1000);
        }
        await browser.close();
    });


/////Approver 1


test('10. Should click the watershed activity and check the line items then send to approver 2', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9677694732'); // Test user 2 9677694732
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();

    const watershedActivity = page.locator('text=Watershed Activity');
    await watershedActivity.click();

    // const avatar = page.locator('div.MuiAvatar-root');
    // await avatar.click();

    // const resourcePersonText = page.locator('text=Community Resource person');
    // if (await resourcePersonText.isVisible()) {
    //     console.log('Resource person is present on the page.');
    //     await page.keyboard.press('Escape');
    //     console.log('Modal closed by pressing the Escape key.');
        await page.waitForTimeout(5000);

        // Check if the rows in the table are present
        const tableRows = page.locator('table tbody tr');
        const rowCount = await tableRows.count();

        if (rowCount > 0) {
            console.log(`Table contains ${rowCount} rows.`);
            const label = await page.locator('label:has-text("Search")');
            const inputId = await label.getAttribute('for');
            if (inputId !== null) {
                const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                const inputField = await page.locator(`#${escapedInputId}`);
                await inputField.fill('5577');

                // Optional: Verify the value entered
                const enteredValue = await inputField.inputValue();
                console.log(`Value entered in the input field: ${enteredValue}`);
            } else {
                console.log('The "for" attribute is missing or could not be retrieved.');
            }
            // Check if the "Activity details" button is visible in the last row
            const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
            if (await activityDetailsButton.isVisible()) {
                console.log('"Activity details" button is visible.');
                await activityDetailsButton.click();
                console.log('"Activity details" button clicked.');

                const interventionField = page.locator('text=Intervention:').locator('..');
                const activityField = page.locator('text=Activity:').locator('..');
                const statusField = page.locator('text=Status:').locator('..');

                const interventionText = await interventionField.innerText();
                const activityText = await activityField.innerText();
                const statusText = await statusField.innerText();

                if (!interventionText.includes('Intervention:')) {
                    console.log('Intervention field is empty.');
                } else {
                    console.log('Intervention field is not empty.');
                }

                if (!activityText.includes('Activity:')) {
                    console.log('Activity field is empty.');
                } else {
                    console.log('Activity field is not empty.');
                }

                if (!statusText.includes('Status:')) {
                    console.log('Status field is empty.');
                } else {
                    console.log('Status field is not empty.');
                }

                // Check fields specific to 'Sustainable Practices'
                if (activityText.includes('Sustainable Practices')) {
                    console.log("***Sustainable Practices*****");
                    const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar, sustainablePracticeField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                }

                // Check fields specific to 'Members Capacitated'
                if (activityText.includes('Members Capacitated')) {
                    console.log("***Menmbers Capacited*****");
                    const eventNameField = page.locator('text=Event Name:').locator('..');
                    const eventTypeField = page.locator('text=Event Type:').locator('..');
                    const eventDateField = page.locator('text=Event Date:').locator('..');
                    const targetGroupField = page.locator('text=Target Group:').locator('..');

                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const habitationField = page.locator('text=Habitation:').locator('..');

                    const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                    const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                    const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                    const facilitatorField = page.locator('text=Facilitator:').locator('..');
                    const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                    const remarksField = page.locator('text=Remarks:').locator('..');

                    const fieldsToCheck = [
                        eventNameField, eventTypeField, eventDateField, targetGroupField,
                        stateField, districtField, talukField, panchayatField, habitationField,
                        maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                        facilitatorField, mobilizerField, remarksField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                }

                //////////  Check remains activity
                if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                    console.log("Condition true")
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                }

                // Send to {next} button functionality
                const sendButton = page.locator('button', { hasText: /^Send to / });
                if (await sendButton.isVisible()) {
                    console.log('"Send to {next}" button is visible.');

                    // Get the actual text of the button, e.g., "Send to Next Step"
                    const buttonText = await sendButton.textContent();

                    if (buttonText) { // Check if buttonText is not null or undefined
                        console.log(`Button text: ${buttonText}`);

                        // Optionally, extract the {next} value from the button text
                        const nextValue = buttonText.replace('Send to ', '').trim();
                        console.log(`Dynamic next value: ${nextValue}`);

                        // Click the "Send to {next}" button
                        await sendButton.click();
                        console.log(`"Send to ${nextValue}" button clicked.`);
                    } else {
                        console.log('Button text could not be retrieved.');
                    }

                    // Optionally, add any verification logic after the button is clicked
                    // For example, check if a status message appears or a new page loads
                } else {
                    console.log('"Send to {next}" button is not visible.');
                }

                await page.waitForTimeout(5000);
            } else {
                console.log('"Activity details" button is not visible.');
            }
        } else {
            console.log('No rows found in the table.');
        }
        await page.waitForTimeout(5000);
    // } else {
    //     console.log('Resource person is not found on the page.');
    //     await page.waitForTimeout(1000);
    // }
    await browser.close();
});

//////Approver 2

test('11. Should click the watershed activity and check the line items then send to approver 3', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9384615401'); // Test user 2 9677694732
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();

    const watershedActivity = page.locator('text=Watershed Activity');
    await watershedActivity.click();

    // const avatar = page.locator('div.MuiAvatar-root');
    // await avatar.click();

    // const resourcePersonText = page.locator('text=Community Resource person');
    // if (await resourcePersonText.isVisible()) {
    //     console.log('Resource person is present on the page.');
    //     await page.keyboard.press('Escape');
    //     console.log('Modal closed by pressing the Escape key.');
        await page.waitForTimeout(5000);

        // Check if the rows in the table are present
        const tableRows = page.locator('table tbody tr');
        const rowCount = await tableRows.count();

        if (rowCount > 0) {
            console.log(`Table contains ${rowCount} rows.`);
            const label = await page.locator('label:has-text("Search")');
            const inputId = await label.getAttribute('for');
            if (inputId !== null) {
                const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                const inputField = await page.locator(`#${escapedInputId}`);
                await inputField.fill('5577');

                // Optional: Verify the value entered
                const enteredValue = await inputField.inputValue();
                console.log(`Value entered in the input field: ${enteredValue}`);
            } else {
                console.log('The "for" attribute is missing or could not be retrieved.');
            }
            // Check if the "Activity details" button is visible in the last row
            const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
            if (await activityDetailsButton.isVisible()) {
                console.log('"Activity details" button is visible.');
                await activityDetailsButton.click();
                console.log('"Activity details" button clicked.');

                const interventionField = page.locator('text=Intervention:').locator('..');
                const activityField = page.locator('text=Activity:').locator('..');
                const statusField = page.locator('text=Status:').locator('..');

                const interventionText = await interventionField.innerText();
                const activityText = await activityField.innerText();
                const statusText = await statusField.innerText();

                if (!interventionText.includes('Intervention:')) {
                    console.log('Intervention field is empty.');
                } else {
                    console.log('Intervention field is not empty.');
                }

                if (!activityText.includes('Activity:')) {
                    console.log('Activity field is empty.');
                } else {
                    console.log('Activity field is not empty.');
                }

                if (!statusText.includes('Status:')) {
                    console.log('Status field is empty.');
                } else {
                    console.log('Status field is not empty.');
                }

                // Check fields specific to 'Sustainable Practices'
                if (activityText.includes('Sustainable Practices')) {
                    console.log("***Sustainable Practices*****");
                    const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar, sustainablePracticeField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                }

                // Check fields specific to 'Members Capacitated'
                if (activityText.includes('Members Capacitated')) {
                    console.log("***Menmbers Capacited*****");
                    const eventNameField = page.locator('text=Event Name:').locator('..');
                    const eventTypeField = page.locator('text=Event Type:').locator('..');
                    const eventDateField = page.locator('text=Event Date:').locator('..');
                    const targetGroupField = page.locator('text=Target Group:').locator('..');

                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const habitationField = page.locator('text=Habitation:').locator('..');

                    const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                    const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                    const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                    const facilitatorField = page.locator('text=Facilitator:').locator('..');
                    const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                    const remarksField = page.locator('text=Remarks:').locator('..');

                    const fieldsToCheck = [
                        eventNameField, eventTypeField, eventDateField, targetGroupField,
                        stateField, districtField, talukField, panchayatField, habitationField,
                        maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                        facilitatorField, mobilizerField, remarksField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                }

                //////////  Check remains activity
                if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                    console.log("Condition true")
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                }

                // Send to {next} button functionality
                const sendButton = page.locator('button', { hasText: /^Send to / });
                if (await sendButton.isVisible()) {
                    console.log('"Send to {next}" button is visible.');

                    // Get the actual text of the button, e.g., "Send to Next Step"
                    const buttonText = await sendButton.textContent();

                    if (buttonText) { // Check if buttonText is not null or undefined
                        console.log(`Button text: ${buttonText}`);

                        // Optionally, extract the {next} value from the button text
                        const nextValue = buttonText.replace('Send to ', '').trim();
                        console.log(`Dynamic next value: ${nextValue}`);

                        // Click the "Send to {next}" button
                        await sendButton.click();
                        console.log(`"Send to ${nextValue}" button clicked.`);
                    } else {
                        console.log('Button text could not be retrieved.');
                    }

                    // Optionally, add any verification logic after the button is clicked
                    // For example, check if a status message appears or a new page loads
                } else {
                    console.log('"Send to {next}" button is not visible.');
                }

                await page.waitForTimeout(5000);
            } else {
                console.log('"Activity details" button is not visible.');
            }
        } else {
            console.log('No rows found in the table.');
        }
        await page.waitForTimeout(5000);
    // } else {
    //     console.log('Resource person is not found on the page.');
    //     await page.waitForTimeout(1000);
    // }
    await browser.close();
});


//////Approver 3

test('12. Should click the watershed activity and check the line items then send to approver 4', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9384615415'); 
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();

    const watershedActivity = page.locator('text=Watershed Activity');
    await watershedActivity.click();

    // const avatar = page.locator('div.MuiAvatar-root');
    // await avatar.click();

    // const resourcePersonText = page.locator('text=Community Resource person');
    // if (await resourcePersonText.isVisible()) {
    //     console.log('Resource person is present on the page.');
    //     await page.keyboard.press('Escape');
    //     console.log('Modal closed by pressing the Escape key.');
        await page.waitForTimeout(5000);

        // Check if the rows in the table are present
        const tableRows = page.locator('table tbody tr');
        const rowCount = await tableRows.count();

        if (rowCount > 0) {
            console.log(`Table contains ${rowCount} rows.`);
            const label = await page.locator('label:has-text("Search")');
            const inputId = await label.getAttribute('for');
            if (inputId !== null) {
                const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                const inputField = await page.locator(`#${escapedInputId}`);
                await inputField.fill('5577');

                // Optional: Verify the value entered
                const enteredValue = await inputField.inputValue();
                console.log(`Value entered in the input field: ${enteredValue}`);
            } else {
                console.log('The "for" attribute is missing or could not be retrieved.');
            }
            // Check if the "Activity details" button is visible in the last row
            const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
            if (await activityDetailsButton.isVisible()) {
                console.log('"Activity details" button is visible.');
                await activityDetailsButton.click();
                console.log('"Activity details" button clicked.');

                const interventionField = page.locator('text=Intervention:').locator('..');
                const activityField = page.locator('text=Activity:').locator('..');
                const statusField = page.locator('text=Status:').locator('..');

                const interventionText = await interventionField.innerText();
                const activityText = await activityField.innerText();
                const statusText = await statusField.innerText();

                if (!interventionText.includes('Intervention:')) {
                    console.log('Intervention field is empty.');
                } else {
                    console.log('Intervention field is not empty.');
                }

                if (!activityText.includes('Activity:')) {
                    console.log('Activity field is empty.');
                } else {
                    console.log('Activity field is not empty.');
                }

                if (!statusText.includes('Status:')) {
                    console.log('Status field is empty.');
                } else {
                    console.log('Status field is not empty.');
                }

                // Check fields specific to 'Sustainable Practices'
                if (activityText.includes('Sustainable Practices')) {
                    console.log("***Sustainable Practices*****");
                    const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar, sustainablePracticeField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                }

                // Check fields specific to 'Members Capacitated'
                if (activityText.includes('Members Capacitated')) {
                    console.log("***Menmbers Capacited*****");
                    const eventNameField = page.locator('text=Event Name:').locator('..');
                    const eventTypeField = page.locator('text=Event Type:').locator('..');
                    const eventDateField = page.locator('text=Event Date:').locator('..');
                    const targetGroupField = page.locator('text=Target Group:').locator('..');

                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const habitationField = page.locator('text=Habitation:').locator('..');

                    const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                    const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                    const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                    const facilitatorField = page.locator('text=Facilitator:').locator('..');
                    const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                    const remarksField = page.locator('text=Remarks:').locator('..');

                    const fieldsToCheck = [
                        eventNameField, eventTypeField, eventDateField, targetGroupField,
                        stateField, districtField, talukField, panchayatField, habitationField,
                        maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                        facilitatorField, mobilizerField, remarksField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                }

                //////////  Check remains activity
                if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                    console.log("Condition true")
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                }

                // Send to {next} button functionality
                const sendButton = page.locator('button', { hasText: /^Send to / });
                if (await sendButton.isVisible()) {
                    console.log('"Send to {next}" button is visible.');

                    // Get the actual text of the button, e.g., "Send to Next Step"
                    const buttonText = await sendButton.textContent();

                    if (buttonText) { // Check if buttonText is not null or undefined
                        console.log(`Button text: ${buttonText}`);

                        // Optionally, extract the {next} value from the button text
                        const nextValue = buttonText.replace('Send to ', '').trim();
                        console.log(`Dynamic next value: ${nextValue}`);

                        // Click the "Send to {next}" button
                        await sendButton.click();
                        console.log(`"Send to ${nextValue}" button clicked.`);
                    } else {
                        console.log('Button text could not be retrieved.');
                    }

                    // Optionally, add any verification logic after the button is clicked
                    // For example, check if a status message appears or a new page loads
                } else {
                    console.log('"Send to {next}" button is not visible.');
                }

                await page.waitForTimeout(5000);
            } else {
                console.log('"Activity details" button is not visible.');
            }
        } else {
            console.log('No rows found in the table.');
        }
        await page.waitForTimeout(5000);
    // } else {
    //     console.log('Resource person is not found on the page.');
    //     await page.waitForTimeout(1000);
    // }
    await browser.close();
});



//////Approver 4

test('13. Should click the watershed activity and check the line items then send to approver 5', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '7337653651'); 
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();

    const watershedActivity = page.locator('text=Watershed Activity');
    await watershedActivity.click();

    // const avatar = page.locator('div.MuiAvatar-root');
    // await avatar.click();

    // const resourcePersonText = page.locator('text=Community Resource person');
    // if (await resourcePersonText.isVisible()) {
    //     console.log('Resource person is present on the page.');
    //     await page.keyboard.press('Escape');
    //     console.log('Modal closed by pressing the Escape key.');
        await page.waitForTimeout(5000);

        // Check if the rows in the table are present
        const tableRows = page.locator('table tbody tr');
        const rowCount = await tableRows.count();

        if (rowCount > 0) {
            console.log(`Table contains ${rowCount} rows.`);
            const label = await page.locator('label:has-text("Search")');
            const inputId = await label.getAttribute('for');
            if (inputId !== null) {
                const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                const inputField = await page.locator(`#${escapedInputId}`);
                await inputField.fill('5577');

                // Optional: Verify the value entered
                const enteredValue = await inputField.inputValue();
                console.log(`Value entered in the input field: ${enteredValue}`);
            } else {
                console.log('The "for" attribute is missing or could not be retrieved.');
            }
            // Check if the "Activity details" button is visible in the last row
            const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
            if (await activityDetailsButton.isVisible()) {
                console.log('"Activity details" button is visible.');
                await activityDetailsButton.click();
                console.log('"Activity details" button clicked.');

                const interventionField = page.locator('text=Intervention:').locator('..');
                const activityField = page.locator('text=Activity:').locator('..');
                const statusField = page.locator('text=Status:').locator('..');

                const interventionText = await interventionField.innerText();
                const activityText = await activityField.innerText();
                const statusText = await statusField.innerText();

                if (!interventionText.includes('Intervention:')) {
                    console.log('Intervention field is empty.');
                } else {
                    console.log('Intervention field is not empty.');
                }

                if (!activityText.includes('Activity:')) {
                    console.log('Activity field is empty.');
                } else {
                    console.log('Activity field is not empty.');
                }

                if (!statusText.includes('Status:')) {
                    console.log('Status field is empty.');
                } else {
                    console.log('Status field is not empty.');
                }

                // Check fields specific to 'Sustainable Practices'
                if (activityText.includes('Sustainable Practices')) {
                    console.log("***Sustainable Practices*****");
                    const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar, sustainablePracticeField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                }

                // Check fields specific to 'Members Capacitated'
                if (activityText.includes('Members Capacitated')) {
                    console.log("***Menmbers Capacited*****");
                    const eventNameField = page.locator('text=Event Name:').locator('..');
                    const eventTypeField = page.locator('text=Event Type:').locator('..');
                    const eventDateField = page.locator('text=Event Date:').locator('..');
                    const targetGroupField = page.locator('text=Target Group:').locator('..');

                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const habitationField = page.locator('text=Habitation:').locator('..');

                    const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                    const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                    const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                    const facilitatorField = page.locator('text=Facilitator:').locator('..');
                    const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                    const remarksField = page.locator('text=Remarks:').locator('..');

                    const fieldsToCheck = [
                        eventNameField, eventTypeField, eventDateField, targetGroupField,
                        stateField, districtField, talukField, panchayatField, habitationField,
                        maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                        facilitatorField, mobilizerField, remarksField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                }

                //////////  Check remains activity
                if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                    console.log("Condition true")
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                }

                // Send to {next} button functionality
                const sendButton = page.locator('button', { hasText: /^Send to / });
                if (await sendButton.isVisible()) {
                    console.log('"Send to {next}" button is visible.');

                    // Get the actual text of the button, e.g., "Send to Next Step"
                    const buttonText = await sendButton.textContent();

                    if (buttonText) { // Check if buttonText is not null or undefined
                        console.log(`Button text: ${buttonText}`);

                        // Optionally, extract the {next} value from the button text
                        const nextValue = buttonText.replace('Send to ', '').trim();
                        console.log(`Dynamic next value: ${nextValue}`);

                        // Click the "Send to {next}" button
                        await sendButton.click();
                        console.log(`"Send to ${nextValue}" button clicked.`);
                    } else {
                        console.log('Button text could not be retrieved.');
                    }

                    // Optionally, add any verification logic after the button is clicked
                    // For example, check if a status message appears or a new page loads
                } else {
                    console.log('"Send to {next}" button is not visible.');
                }

                await page.waitForTimeout(5000);
            } else {
                console.log('"Activity details" button is not visible.');
            }
        } else {
            console.log('No rows found in the table.');
        }
        await page.waitForTimeout(5000);
    // } else {
    //     console.log('Resource person is not found on the page.');
    //     await page.waitForTimeout(1000);
    // }
    await browser.close();
});



//////Approver 5

test('14. Should click the watershed activity and check the line items then send to approver 5', async () => {
    test.setTimeout(800000);
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/bfilreacttest');
    await page.fill('input#userName', '9384615435'); 
    await page.fill('input#password', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForURL('http://localhost:3000/bfilreacttest/home', { timeout: 600000 });
    await page.reload();

    const watershedActivity = page.locator('text=Watershed Activity');
    await watershedActivity.click();

    // const avatar = page.locator('div.MuiAvatar-root');
    // await avatar.click();

    // const resourcePersonText = page.locator('text=Community Resource person');
    // if (await resourcePersonText.isVisible()) {
    //     console.log('Resource person is present on the page.');
    //     await page.keyboard.press('Escape');
    //     console.log('Modal closed by pressing the Escape key.');
        await page.waitForTimeout(5000);

        // Check if the rows in the table are present
        const tableRows = page.locator('table tbody tr');
        const rowCount = await tableRows.count();

        if (rowCount > 0) {
            console.log(`Table contains ${rowCount} rows.`);
            const label = await page.locator('label:has-text("Search")');
            const inputId = await label.getAttribute('for');
            if (inputId !== null) {
                const escapedInputId = inputId.replace(/(:|\.|\[|\]|,|=|#|@)/g, '\\$1');
                const inputField = await page.locator(`#${escapedInputId}`);
                await inputField.fill('5577');

                // Optional: Verify the value entered
                const enteredValue = await inputField.inputValue();
                console.log(`Value entered in the input field: ${enteredValue}`);
            } else {
                console.log('The "for" attribute is missing or could not be retrieved.');
            }
            // Check if the "Activity details" button is visible in the last row
            const activityDetailsButton = tableRows.first().locator('button[title="Activity approval"]');
            if (await activityDetailsButton.isVisible()) {
                console.log('"Activity details" button is visible.');
                await activityDetailsButton.click();
                console.log('"Activity details" button clicked.');

                const interventionField = page.locator('text=Intervention:').locator('..');
                const activityField = page.locator('text=Activity:').locator('..');
                const statusField = page.locator('text=Status:').locator('..');

                const interventionText = await interventionField.innerText();
                const activityText = await activityField.innerText();
                const statusText = await statusField.innerText();

                if (!interventionText.includes('Intervention:')) {
                    console.log('Intervention field is empty.');
                } else {
                    console.log('Intervention field is not empty.');
                }

                if (!activityText.includes('Activity:')) {
                    console.log('Activity field is empty.');
                } else {
                    console.log('Activity field is not empty.');
                }

                if (!statusText.includes('Status:')) {
                    console.log('Status field is empty.');
                } else {
                    console.log('Status field is not empty.');
                }

                // Check fields specific to 'Sustainable Practices'
                if (activityText.includes('Sustainable Practices')) {
                    console.log("***Sustainable Practices*****");
                    const sustainablePracticeField = page.locator('text=Sustainable Practice:').locator('..');
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar, sustainablePracticeField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Sustainable Practice processed');

                }

                // Check fields specific to 'Members Capacitated'
                if (activityText.includes('Members Capacitated')) {
                    console.log("***Menmbers Capacited*****");
                    const eventNameField = page.locator('text=Event Name:').locator('..');
                    const eventTypeField = page.locator('text=Event Type:').locator('..');
                    const eventDateField = page.locator('text=Event Date:').locator('..');
                    const targetGroupField = page.locator('text=Target Group:').locator('..');

                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const habitationField = page.locator('text=Habitation:').locator('..');

                    const maleParticipantsField = page.locator('text=Male Participants:').locator('..');
                    const femaleParticipantsField = page.locator('text=Female Participants:').locator('..');
                    const totalParticipantsField = page.locator('text=Total Participants:').locator('..');

                    const facilitatorField = page.locator('text=Facilitator:').locator('..');
                    const mobilizerField = page.locator('text=Mobilizer:').locator('..');
                    const remarksField = page.locator('text=Remarks:').locator('..');

                    const fieldsToCheck = [
                        eventNameField, eventTypeField, eventDateField, targetGroupField,
                        stateField, districtField, talukField, panchayatField, habitationField,
                        maleParticipantsField, femaleParticipantsField, totalParticipantsField,
                        facilitatorField, mobilizerField, remarksField
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Members capacited processed');


                }

                //////////  Check remains activity
                if (!activityText.includes('Members Capacitated') && !activityText.includes('Sustainable Practices')) {
                    console.log("Condition true")
                    const stateField = page.locator('text=State:').locator('..');
                    const districtField = page.locator('text=District:').locator('..');
                    const talukField = page.locator('text=Taluk:').locator('..');
                    const panchayatField = page.locator('text=Panchayat:').locator('..');
                    const villageField = page.locator('text=Village:').locator('..');
                    const surveyNo = page.locator('text=Survey No:').locator('..');
                    const TotalValue = page.locator('text=Total Value:').locator('..');
                    const areaTreated = page.locator('text=Area Treated (acres):').locator('..');
                    const fundSpent = page.locator('text=Funds spent (₹):').locator('..');
                    const fundSource = page.locator('text=Funds source:').locator('..');
                    const Name = page.locator('text=Name:').locator('..');
                    const Aadhar = page.locator('text=Aadhar:').locator('..');
                    const mobileNumber = page.locator('text=Mobile No:').locator('..');
                    const fieldsToCheck = [
                        villageField, surveyNo, TotalValue, areaTreated,
                        stateField, districtField, talukField, panchayatField, Name,
                        fundSpent, fundSource, mobileNumber,
                        Aadhar
                    ];

                    for (const field of fieldsToCheck) {
                        const text = await field.innerText();
                        if (text.trim().endsWith(':')) {
                            console.log(`Field ${text} is empty.`);
                        } else {
                            console.log(`Field ${text} is not empty.`);
                        }
                    }
                    await page.getByRole('textbox', { name: 'Remarks' }).fill('Processed');

                }

                // Send to {next} button functionality
                const sendButton = page.locator('button', { hasText: /^Send to / });
                if (await sendButton.isVisible()) {
                    console.log('"Send to {next}" button is visible.');

                    // Get the actual text of the button, e.g., "Send to Next Step"
                    const buttonText = await sendButton.textContent();

                    if (buttonText) { // Check if buttonText is not null or undefined
                        console.log(`Button text: ${buttonText}`);

                        // Optionally, extract the {next} value from the button text
                        const nextValue = buttonText.replace('Send to ', '').trim();
                        console.log(`Dynamic next value: ${nextValue}`);

                        // Click the "Send to {next}" button
                        await sendButton.click();
                        console.log(`"Send to ${nextValue}" button clicked.`);
                    } else {
                        console.log('Button text could not be retrieved.');
                    }

                    // Optionally, add any verification logic after the button is clicked
                    // For example, check if a status message appears or a new page loads
                } else {
                    console.log('"Send to {next}" button is not visible.');
                }

                await page.waitForTimeout(5000);
            } else {
                console.log('"Activity details" button is not visible.');
            }
        } else {
            console.log('No rows found in the table.');
        }
        await page.waitForTimeout(5000);
    // } else {
    //     console.log('Resource person is not found on the page.');
    //     await page.waitForTimeout(1000);
    // }
    await browser.close();
});


});