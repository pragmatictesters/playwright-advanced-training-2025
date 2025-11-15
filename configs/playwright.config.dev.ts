import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration - Development Environment
 * 
 * This configuration is optimized for local development:
 * - Slower timeouts for debugging
 * - Browser visible (headless: false)
 * - No retries (fail fast)
 * - Single worker (sequential execution)
 * - Full traces and videos for debugging
 */

export default defineConfig({
  testDir: '../tests',
  
  // Longer timeouts for development/debugging
  timeout: 60000,              // 60 seconds per test
  expect: {
    timeout: 10000             // 10 seconds for assertions
  },
  
  // Test execution settings
  fullyParallel: false,        // Run tests sequentially
  forbidOnly: false,           // Allow test.only() in development
  retries: 0,                  // No retries - fail fast
  workers: 1,                  // Single worker for easier debugging
  
  // Reporting
  reporter: [
    ['html'],
    ['list'],
  ],
  
  use: {
    // Development environment URL
    baseURL: process.env.DEV_BASE_URL || 'http://localhost:3000',
    
    // Browser options - optimized for debugging
    headless: false,           // Show browser
    viewport: { width: 1280, height: 720 },
    
    // Debugging aids
    screenshot: 'on',          // Always take screenshots
    video: 'on',               // Always record videos
    trace: 'on',               // Always record traces
    
    // Timeouts
    actionTimeout: 15000,      // 15 seconds for actions
    navigationTimeout: 30000,  // 30 seconds for navigation
    
    // Environment-specific settings
    ignoreHTTPSErrors: true,   // Ignore SSL errors in dev
    
    // Authentication (from environment variables)
    extraHTTPHeaders: {
      'Authorization': process.env.DEV_AUTH_TOKEN ? `Bearer ${process.env.DEV_AUTH_TOKEN}` : '',
    },
  },
  
  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Dev-specific browser settings
        launchOptions: {
          slowMo: 100,         // Slow down by 100ms for visibility
        },
      },
    },
  ],
  
  // Development server (if needed)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});

