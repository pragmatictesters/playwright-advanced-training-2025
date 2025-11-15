import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration - Staging Environment
 * 
 * This configuration is optimized for staging/pre-production testing:
 * - Moderate timeouts
 * - Headless execution
 * - Limited retries
 * - Parallel execution
 * - Screenshots/videos on failure only
 */

export default defineConfig({
  testDir: '../tests',
  
  // Moderate timeouts for staging
  timeout: 45000,              // 45 seconds per test
  expect: {
    timeout: 7000              // 7 seconds for assertions
  },
  
  // Test execution settings
  fullyParallel: true,         // Run tests in parallel
  forbidOnly: true,            // Fail if test.only() found
  retries: 1,                  // Retry once on failure
  workers: 2,                  // 2 parallel workers
  
  // Reporting
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/staging-results.json' }],
  ],
  
  use: {
    // Staging environment URL
    baseURL: process.env.STAGING_BASE_URL || 'https://staging.example.com',
    
    // Browser options - optimized for testing
    headless: true,            // Run headless
    viewport: { width: 1280, height: 720 },
    
    // Debugging aids - only on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    
    // Timeouts
    actionTimeout: 10000,      // 10 seconds for actions
    navigationTimeout: 30000,  // 30 seconds for navigation
    
    // Environment-specific settings
    ignoreHTTPSErrors: false,  // Enforce SSL in staging
    
    // Authentication (from environment variables)
    extraHTTPHeaders: {
      'Authorization': process.env.STAGING_AUTH_TOKEN ? `Bearer ${process.env.STAGING_AUTH_TOKEN}` : '',
      'X-API-Key': process.env.STAGING_API_KEY || '',
      'X-Client-ID': process.env.STAGING_CLIENT_ID || '',
    },
  },
  
  // Browser projects - test on multiple browsers
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
  ],
});

