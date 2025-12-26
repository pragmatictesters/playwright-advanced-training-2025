/**
 * Playwright Configuration for OrangeHRM Capstone Project
 * 
 * @see https://playwright.dev/docs/test-configuration
 */

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Test file pattern
  testMatch: '**/*.spec.ts',
  
  // Run tests in parallel within files
  fullyParallel: true,
  
  // Fail the build on CI if test.only is left in code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests
  retries: process.env.CI ? 2 : 1,
  
  // Number of parallel workers
  workers: process.env.CI ? 1 : undefined,
  
  // Timeout for each test
  timeout: 60000,
  
  // Timeout for expect assertions
  expect: {
    timeout: 10000,
  },
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { 
      outputFolder: 'reports/allure-results',
      detail: true,
      suiteTitle: true,
    }],
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL
    baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    
    // Run in headless mode
    headless: process.env.HEADLESS !== 'false',
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Collect trace on first retry
    trace: 'retain-on-failure',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video recording
    video: 'retain-on-failure',
    
    // Accept downloads
    acceptDownloads: true,
    
    // Navigation timeout
    navigationTimeout: 30000,
    
    // Action timeout
    actionTimeout: 15000,
  },
  
  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Output directory for test artifacts
  outputDir: 'test-results/',
  
  // Web server configuration (optional - for local testing)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

