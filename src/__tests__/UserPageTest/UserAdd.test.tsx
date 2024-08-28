// import { test, expect, chromium } from '@playwright/test';

// test('Add user details and submit the form', async () => {
//     test.setTimeout(80000);

//     const browser = await chromium.launch({
//         headless: false, // Set to true if you don't want the browser UI
//         channel: 'chrome',
//     });

//     const context = await browser.newContext();
//     const page = await context.newPage();

//     // Go to the application
//     await page.goto('http://localhost:3000/home');

//     // Click on the 'User Management' section in the sidebar
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();

//     // Verify that the UserList component is visible
//     const userListComponent = page.locator('button:has-text("Add User")');
//     await expect(userListComponent).toBeVisible();

//     // Click the "Add User" button to open the form modal
//     await page.click('button:has-text("Add User")');

//     // Fill in the form fields with appropriate values
//     await page.fill('#userName', 'John Doe');
//     await page.fill('#employeeCode', 'E12345');
//     await page.fill('#designation', 'Software Engineer');
    
//     // Select the role from the dropdown
// // Open the role dropdown
// // await page.click('#role');

// // Select the desired role from the dropdown options
// // await page.click('li[role="option"]:has-text("Admin")');

//     // Select the user type from the dropdown

//     // Fill in email and mobile number
//     await page.fill('#email', 'john.doe@example.com');
//     await page.fill('#mobileNo', '1234567890');
    
//     // Fill in the password field
//     await page.fill('#password', 'securePassword');

//     // Select the manager from the dropdown
//     // await page.selectOption('#manager', { label: 'Jane Manager' });

//     // Select login type from the dropdown
//     await page.click('#userType');  // Open the user type dropdown
//     await page.click('li[role="option"]:has-text("Service")');  // Select "Permanent"
    
//     // Select the login type (e.g., "Single Sign-On")
//     await page.click('#loginType');  // Open the login type dropdown
//     await page.click('li[role="option"]:has-text("Mobile")');
//     // Submit the form by clicking the "Add User" button
//     await page.click('button:has-text("Add User")');

//     // Verify the success message in a snackbar or alert
//     const snackbar = await page.waitForSelector('div[role="alert"]');
//     await expect(await snackbar.textContent()).toContain('User added successfully');
//     // await page.waitForTimeout(20000); 
//     // Close the browser
//     // await browser.close();
// });

import { test, expect, chromium, Page } from '@playwright/test';

// test('Add user details with form validation', async () => {
//     test.setTimeout(80000); // Set a generous timeout for the test

//     // Launch the browser and create a new page
//     const browser = await chromium.launch({
//         headless: false,
//         channel: 'chrome', // Ensure you're using the Chrome browser
//     });

//     const context = await browser.newContext();
//     const page: Page = await context.newPage();

//     // Navigate to the application
//     await page.goto('http://localhost:3000/home'); // Replace with your application's URL

//     // Navigate to the User Management page
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();

//     // Click the "Add User" button
//     const addUserButton = page.locator('button:has-text("Add User")');
//     await expect(addUserButton).toBeVisible();
//     await addUserButton.click();

//     await page.waitForSelector('text=Add User'); // Wait for the dialog title
//     await page.fill('input#userName', ''); // Empty userName to trigger validation

//      // Click the "Add User" button in the dialog
// // Use index to select the first occurrence if it's the correct button
// const addUserDialogButton = page.locator('button:has-text("Add User")').nth(1);
//      await expect(addUserDialogButton).toBeVisible();
//      await addUserDialogButton.click();
// });




test('Add user details with form validation', async () => {
    test.setTimeout(80000); 

    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome', 
    });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('http://localhost:3000/home'); 

    const userManagementButton = page.locator('text=User Management');
    await userManagementButton.click();

    const addUserButton = page.locator('button:has-text("Add User")');
    await expect(addUserButton).toBeVisible();
    await addUserButton.click();

    await page.waitForSelector('text=Add User');
    
    await page.fill('input#userName', ''); 
    await page.fill('input#employeeCode', ''); 
    await page.fill('input#designation', ''); 
    await page.fill('input#email', '');
    await page.fill('input#mobileNo', ''); 
    await page.fill('input#password', ''); 

    const addUserDialogButton = page.locator('button:has-text("Add User")').nth(1);
    await expect(addUserDialogButton).toBeVisible();
    await addUserDialogButton.click();
    await expect(page.locator('text=UserName is required')).toBeVisible();
    await expect(page.locator('text=Employee Code is required')).toBeVisible();
    await expect(page.locator('text=Designation is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Mobile Number is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();

    console.log("Username Error Message:", await page.locator('text=UserName is required').textContent());
    console.log("Employee Code Error Message:", await page.locator('text=Employee Code is required').textContent());
    console.log("Designation Error Message:", await page.locator('text=Designation is required').textContent());
    console.log("Email Error Message:", await page.locator('text=Email is required').textContent());
    console.log("Mobile No Error Message:", await page.locator('text=Mobile Number is required').textContent());
    console.log("Password Error Message:", await page.locator('text=Password is required').textContent());
    await page.waitForTimeout(50000);

});



// test('Add user details with form validation', async () => {
//     test.setTimeout(80000); // Set a generous timeout for the test

//     const browser = await chromium.launch({
//         headless: false,
//         channel: 'chrome', // Ensure you're using the Chrome browser
//     });

//     const context = await browser.newContext();
//     const page: Page = await context.newPage();

//     await page.goto('http://localhost:3000/home'); // Replace with your application's URL

//     // Navigate to the User Management page
//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();

//     // Check that the "Add User" button is visible
//     // const userListComponent = page.locator('button:has-text("Add User")');

//     // Click the "Add User" button
//     const addUserButton = page.locator('button:has-text("Add User")');    
//     await expect(addUserButton).toBeVisible();
//     await addUserButton.click();
//     await page.fill('input#userName', '');

//     await page.waitForTimeout(1000);
//     const errorMessage = await page.textContent('.MuiAlert-message');

//         // const usernameRequiredError = await page.textContent('.MuiFormHelperText-root');
//         console.log("Username Error Message:", errorMessage);
//         expect(errorMessage).toBe('UserName is required');
//     // await expect(page.locator('#userName-helper-text')).toHaveText('UserName is required');
//     // await expect(page.locator('#employeeCode-helper-text')).toHaveText('Employee Code is required');
//     // await expect(page.locator('#designation-helper-text')).toHaveText('Designation is required');
//     // await expect(page.locator('#role-helper-text')).toHaveText('Role Set is required');
//     // await expect(page.locator('#userType-helper-text')).toHaveText('User Type is required');
//     // await expect(page.locator('#email-helper-text')).toHaveText('Email is required');
//     // await expect(page.locator('#mobileNo-helper-text')).toHaveText('Mobile Number is required');
//     // await expect(page.locator('#password-helper-text')).toHaveText('Password is required');
//     // await expect(page.locator('#manager-helper-text')).toHaveText('Manager is required');

//     // Add an optional delay to keep the browser open for observation
//     await page.waitForTimeout(30000);

//     // Close the browser after the test
//     await browser.close();
// });


// test('Add user details and submit the form', async () => {
//     test.setTimeout(80000); // Set the timeout to 80 seconds

//     const browser = await chromium.launch({
//         headless: false, // Set to true if you don't want the browser UI
//         channel: 'chrome',
//     });
//     const context = await browser.newContext();
//     // Explicitly type 'page' as 'Page'
//     const page: Page = await context.newPage();

//     // Go to the application
//     await page.goto('http://localhost:3000/home');
//     await page.waitForTimeout(30000); // Wait for 30 seconds before proceeding (adjust as needed)
//     await page.reload();

//     const userManagementButton = page.locator('text=User Management');
//     await userManagementButton.click();

//     const userListComponent = page.locator('button:has-text("Add User")');
//     await expect(userListComponent).toBeVisible();

//     await page.click('button:has-text("Add User")');

//     await page.fill('#userName', 'John Doe');
//     await page.fill('#employeeCode', 'E12345');
//     await page.fill('#designation', 'Software Engineer');
    
//      await page.click('#role');  // Open the role dropdown
//      await page.click('li[role="option"]:has-text("Project Head")');  
 
//     await page.click('#userType');  
//     await page.click('li[role="option"]:has-text("Routes")');  
    
//     //await page.click('#loginType');  // Open the login type dropdown
//     //await page.click('li[role="option"]:has-text("Mobile")');

//     await page.fill('#email', 'john.doe@example.com');
//     await page.fill('#mobileNo', '1234567890');
    
//     await page.fill('#password', 'securePassword');

//    await page.click('#manager');  
//    await page.click('li[role="option"]:has-text("shri siddaramaiah")');  
//     // Submit the form by clicking the "Add User" button
//     await page.click('button:has-text("Add User")');

//     // Verify the success message in a snackbar or alert
//     const snackbar = await page.waitForSelector('div[role="alert"]');
//     await expect(await snackbar.textContent()).toContain('User added successfully');

//     // Add delay for observation purposes (optional)
//     await page.waitForTimeout(30000); // Wait for 30 seconds before proceeding (adjust as needed)

//     // Commenting out browser.close() to keep the browser open after the test completes
//     // await browser.close();
// });
