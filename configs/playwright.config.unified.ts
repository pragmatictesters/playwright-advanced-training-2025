import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration - Unified Multi-Environment Setup
 * 
 * This configuration uses Playwright's "projects" feature to define
 * multiple environments in a single file. Each project represents
 * a different environment (dev, staging, production).
 * 
 * Usage:
 *   npx playwright test --project=dev
 *   npx playwright test --project=staging
 *   npx playwright test --project=prod
 */

// Helper function to get environment-specific settings
function getEnvironmentConfig(env: 'dev' | 'staging' | 'prod') {
  const configs = {
    dev: {
      baseURL: process.env.DEV_BASE_URL || 'http://localhost:3000',
      authToken: process.env.DEV_AUTH_TOKEN || '',
      apiKey: process.env.DEV_API_KEY || '',
      clientId: process.env.DEV_CLIENT_ID || '',
      headless: false,
      retries: 0,
      workers: 1,
      timeout: 60000,
      screenshot: 'on' as const,
      video: 'on' as const,
      trace: 'on' as const,
    },
    staging: {
      baseURL: process.env.STAGING_BASE_URL || 'https://staging.example.com',
      authToken: process.env.STAGING_AUTH_TOKEN || '',
      apiKey: process.env.STAGING_API_KEY || '',
      clientId: process.env.STAGING_CLIENT_ID || '',
      headless: true,
      retries: 1,
      workers: 2,
      timeout: 45000,
      screenshot: 'only-on-failure' as const,
      video: 'retain-on-failure' as const,
      trace: 'on-first-retry' as const,
    },
    prod: {
      baseURL: process.env.PROD_BASE_URL || 'https://www.example.com',
      authToken: process.env.PROD_AUTH_TOKEN || '',
      apiKey: process.env.PROD_API_KEY || '',
      clientId: process.env.PROD_CLIENT_ID || '',
      headless: true,
      retries: 2,
      workers: process.env.CI ? 1 : 4,
      timeout: 30000,
      screenshot: 'only-on-failure' as const,
      video: 'retain-on-failure' as const,
      trace: 'retain-on-failure' as const,
    },
  };
  
  return configs[env];
}

export default defineConfig({
  testDir: '../tests',
  
  // Global settings (can be overridden by projects)
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  // Reporting
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  
  // Define projects for each environment
  projects: [
    // ========================================================================
    // DEVELOPMENT ENVIRONMENT
    // ========================================================================
    {
      name: 'dev',
      testMatch: /.*\.spec\.ts/,
      retries: getEnvironmentConfig('dev').retries,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvironmentConfig('dev').baseURL,
        headless: getEnvironmentConfig('dev').headless,
        screenshot: getEnvironmentConfig('dev').screenshot,
        video: getEnvironmentConfig('dev').video,
        trace: getEnvironmentConfig('dev').trace,
        actionTimeout: 15000,
        navigationTimeout: 30000,
        ignoreHTTPSErrors: true,
        
        // Authentication headers
        extraHTTPHeaders: {
          'Authorization': getEnvironmentConfig('dev').authToken 
            ? `Bearer ${getEnvironmentConfig('dev').authToken}` 
            : '',
        },
        
        // Slow down for visibility
        launchOptions: {
          slowMo: 100,
        },
      },
    },
    
    // ========================================================================
    // STAGING ENVIRONMENT - Chromium
    // ========================================================================
    {
      name: 'staging',
      testMatch: /.*\.spec\.ts/,
      retries: getEnvironmentConfig('staging').retries,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvironmentConfig('staging').baseURL,
        headless: getEnvironmentConfig('staging').headless,
        screenshot: getEnvironmentConfig('staging').screenshot,
        video: getEnvironmentConfig('staging').video,
        trace: getEnvironmentConfig('staging').trace,
        actionTimeout: 10000,
        navigationTimeout: 30000,
        ignoreHTTPSErrors: false,
        
        // Authentication headers
        extraHTTPHeaders: {
          'Authorization': getEnvironmentConfig('staging').authToken 
            ? `Bearer ${getEnvironmentConfig('staging').authToken}` 
            : '',
          'X-API-Key': getEnvironmentConfig('staging').apiKey,
          'X-Client-ID': getEnvironmentConfig('staging').clientId,
        },
      },
    },
    
    // ========================================================================
    // STAGING ENVIRONMENT - Firefox
    // ========================================================================
    {
      name: 'staging-firefox',
      testMatch: /.*\.spec\.ts/,
      retries: getEnvironmentConfig('staging').retries,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: getEnvironmentConfig('staging').baseURL,
        headless: getEnvironmentConfig('staging').headless,
        screenshot: getEnvironmentConfig('staging').screenshot,
        video: getEnvironmentConfig('staging').video,
        trace: getEnvironmentConfig('staging').trace,
        actionTimeout: 10000,
        navigationTimeout: 30000,
        
        extraHTTPHeaders: {
          'Authorization': getEnvironmentConfig('staging').authToken 
            ? `Bearer ${getEnvironmentConfig('staging').authToken}` 
            : '',
          'X-API-Key': getEnvironmentConfig('staging').apiKey,
          'X-Client-ID': getEnvironmentConfig('staging').clientId,
        },
      },
    },
    
    // ========================================================================
    // PRODUCTION ENVIRONMENT - Chromium
    // ========================================================================
    {
      name: 'prod',
      testMatch: /.*\.spec\.ts/,
      retries: getEnvironmentConfig('prod').retries,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvironmentConfig('prod').baseURL,
        headless: getEnvironmentConfig('prod').headless,
        screenshot: getEnvironmentConfig('prod').screenshot,
        video: getEnvironmentConfig('prod').video,
        trace: getEnvironmentConfig('prod').trace,
        actionTimeout: 10000,
        navigationTimeout: 30000,
        ignoreHTTPSErrors: false,
        
        // Authentication headers
        extraHTTPHeaders: {
          'Authorization': getEnvironmentConfig('prod').authToken 
            ? `Bearer ${getEnvironmentConfig('prod').authToken}` 
            : '',
          'X-API-Key': getEnvironmentConfig('prod').apiKey,
          'X-Client-ID': getEnvironmentConfig('prod').clientId,
        },
      },
    },
    
    // ========================================================================
    // PRODUCTION ENVIRONMENT - Firefox
    // ========================================================================
    {
      name: 'prod-firefox',
      testMatch: /.*\.spec\.ts/,
      retries: getEnvironmentConfig('prod').retries,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: getEnvironmentConfig('prod').baseURL,
        headless: getEnvironmentConfig('prod').headless,
        screenshot: getEnvironmentConfig('prod').screenshot,
        video: getEnvironmentConfig('prod').video,
        trace: getEnvironmentConfig('prod').trace,
        actionTimeout: 10000,
        navigationTimeout: 30000,
        
        extraHTTPHeaders: {
          'Authorization': getEnvironmentConfig('prod').authToken 
            ? `Bearer ${getEnvironmentConfig('prod').authToken}` 
            : '',
          'X-API-Key': getEnvironmentConfig('prod').apiKey,
          'X-Client-ID': getEnvironmentConfig('prod').clientId,
        },
      },
    },
    
    // ========================================================================
    // PRODUCTION ENVIRONMENT - Mobile
    // ========================================================================
    {
      name: 'prod-mobile',
      testMatch: /.*\.spec\.ts/,
      retries: getEnvironmentConfig('prod').retries,
      use: {
        ...devices['Pixel 5'],
        baseURL: getEnvironmentConfig('prod').baseURL,
        headless: getEnvironmentConfig('prod').headless,
        screenshot: getEnvironmentConfig('prod').screenshot,
        video: getEnvironmentConfig('prod').video,
        trace: getEnvironmentConfig('prod').trace,
        
        extraHTTPHeaders: {
          'Authorization': getEnvironmentConfig('prod').authToken 
            ? `Bearer ${getEnvironmentConfig('prod').authToken}` 
            : '',
          'X-API-Key': getEnvironmentConfig('prod').apiKey,
          'X-Client-ID': getEnvironmentConfig('prod').clientId,
        },
      },
    },
  ],
});

