/**
 * Playwright Configuration for MCP Training
 * 
 * @see https://playwright.dev/docs/test-configuration
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail if test.only is left in code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests
  retries: process.env.CI ? 2 : 0,
  
  // Number of workers
  workers: 1, // Sequential for MCP demo
  
  // Timeout
  timeout: 60000,
  
  // Reporter
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['list'],
  ],
  
  // Shared settings
  use: {
    // Base URL
    baseURL: 'https://www.saucedemo.com',
    
    // Run headed for training (see what's happening)
    headless: false,
    
    // Slow down for visibility
    launchOptions: {
      slowMo: 500, // 500ms delay between actions
    },
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Trace on failure
    trace: 'retain-on-failure',
  },
  
  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

