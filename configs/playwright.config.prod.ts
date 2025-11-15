import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration - Production Environment
 * 
 * This configuration is optimized for production testing:
 * - Standard timeouts
 * - Headless execution
 * - Multiple retries
 * - Full parallel execution
 * - Minimal debugging output
 * - Multiple browsers
 */

export default defineConfig({
  testDir: '../tests',
  
  // Standard timeouts for production
  timeout: 30000,              // 30 seconds per test
  expect: {
    timeout: 5000              // 5 seconds for assertions
  },
  
  // Test execution settings
  fullyParallel: true,         // Full parallel execution
  forbidOnly: true,            // Fail if test.only() found
  retries: 2,                  // Retry twice on failure
  workers: process.env.CI ? 1 : 4,  // 4 workers locally, 1 in CI
  
  // Reporting
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/prod-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],
  
  use: {
    // Production environment URL
    baseURL: process.env.PROD_BASE_URL || 'https://www.example.com',
    
    // Browser options - optimized for production
    headless: true,            // Always run headless
    viewport: { width: 1280, height: 720 },
    
    // Debugging aids - minimal
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 10000,      // 10 seconds for actions
    navigationTimeout: 30000,  // 30 seconds for navigation
    
    // Environment-specific settings
    ignoreHTTPSErrors: false,  // Enforce SSL in production
    
    // Authentication (from environment variables)
    extraHTTPHeaders: {
      'Authorization': process.env.PROD_AUTH_TOKEN ? `Bearer ${process.env.PROD_AUTH_TOKEN}` : '',
      'X-API-Key': process.env.PROD_API_KEY || '',
      'X-Client-ID': process.env.PROD_CLIENT_ID || '',
      'X-Client-Secret': process.env.PROD_CLIENT_SECRET || '',
    },
  },
  
  // Browser projects - test on all major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});

