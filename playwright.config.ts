import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 1, 
  workers: 1, 
  testDir: 'D:/BFIL_workspace/bfil_ws_fe/src/__tests__', 
  // testMatch: '**/*.test.tsx',  // Pattern to match your test files (you can adjust it if needed)
//   timeout: 30000,              // Set global timeout for tests (in milliseconds)
//   retries: 2,                  // Retries for flaky tests
 // reporter: 'html',            // Generates an HTML report after test execution
//   use: {
//     headless: true,            // Run tests in headless mode
//     viewport: { width: 1280, height: 720 },  // Set viewport size
//     ignoreHTTPSErrors: true,   // Ignore HTTPS errors
//     video: 'retain-on-failure', // Record video of test run (only on failure)
//     screenshot: 'only-on-failure',  // Take screenshots only on test failure
//   },

testMatch: [
  '1.LoginPageTest/Login.Test.tsx', // First test file
  // '2.UserPageTest/1.UserAdd.test.tsx', // Second test file
  // You can add more test files here in the order you want
],
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    // },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    }
  ],
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  
});
