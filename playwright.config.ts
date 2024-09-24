import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__',  // Directory where your test files are located
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
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    // },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
    }
  ],
  reporter: [
    ['list'],  // This is optional, it shows test progress in the terminal
    // ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'results.xml' }]
  ],
});
