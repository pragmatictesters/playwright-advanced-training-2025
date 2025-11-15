# Playwright Configuration Guide

## 🎯 Overview

This guide explains key configuration options in `playwright.config.ts` for beginners.

---

## ⚙️ Basic Configuration Template

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // Timeout configurations
  timeout: 30000,              // 30 seconds per test
  expect: {
    timeout: 5000              // 5 seconds for assertions
  },
  
  // Test execution
  fullyParallel: false,        // Run tests sequentially (good for beginners)
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporting
  reporter: [
    ['html'],                  // HTML report
    ['list']                   // Console output
  ],
  
  use: {
    // Base URL
    baseURL: 'https://www.saucedemo.com',
    
    // Browser options
    headless: false,           // Show browser (set true for CI)
    viewport: { width: 1280, height: 720 },
    
    // Debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    
    // Timeouts
    actionTimeout: 10000,      // 10 seconds for actions
    navigationTimeout: 30000,  // 30 seconds for navigation
  },
  
  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---

## 🕐 Timeout Configuration

### 1. **Global Test Timeout**
```typescript
timeout: 30000,  // 30 seconds per test
```
- Maximum time for entire test to complete
- Includes all actions, assertions, and waits
- Default: 30 seconds

### 2. **Expect Timeout**
```typescript
expect: {
  timeout: 5000  // 5 seconds for assertions
}
```
- Maximum time for assertions to pass
- Applies to all `expect()` statements
- Default: 5 seconds

### 3. **Action Timeout**
```typescript
use: {
  actionTimeout: 10000,  // 10 seconds
}
```
- Maximum time for actions (click, fill, etc.)
- Applies to all page interactions
- Default: No timeout (uses test timeout)

### 4. **Navigation Timeout**
```typescript
use: {
  navigationTimeout: 30000,  // 30 seconds
}
```
- Maximum time for page navigation
- Applies to `page.goto()`, `page.reload()`, etc.
- Default: 30 seconds

### 5. **Test-Specific Timeout**
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000);  // 60 seconds for this test only
  // ... test code
});
```

---

## 🌐 Base URL Configuration

### Without baseURL:
```typescript
test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.goto('https://www.saucedemo.com/cart.html');
});
```

### With baseURL:
```typescript
// In config
use: {
  baseURL: 'https://www.saucedemo.com',
}

// In test
test('test', async ({ page }) => {
  await page.goto('/');              // Goes to https://www.saucedemo.com/
  await page.goto('/inventory.html'); // Goes to https://www.saucedemo.com/inventory.html
  await page.goto('/cart.html');      // Goes to https://www.saucedemo.com/cart.html
});
```

**Benefits**:
- ✅ Shorter, cleaner code
- ✅ Easy to change environment (dev, staging, prod)
- ✅ No URL duplication

---

## 🎭 Browser Configuration

### Headless Mode
```typescript
use: {
  headless: false,  // Show browser (good for learning/debugging)
  // headless: true,   // Hide browser (good for CI/faster execution)
}
```

### Viewport Size
```typescript
use: {
  viewport: { width: 1280, height: 720 },  // Desktop size
  // viewport: { width: 375, height: 667 },   // Mobile size
}
```

### Multiple Browsers
```typescript
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
```

---

## 📸 Debugging Configuration

### Screenshots
```typescript
use: {
  screenshot: 'only-on-failure',  // Take screenshot when test fails
  // screenshot: 'on',               // Take screenshot after each test
  // screenshot: 'off',              // Never take screenshots
}
```

### Videos
```typescript
use: {
  video: 'retain-on-failure',  // Keep video only when test fails
  // video: 'on',                 // Record video for all tests
  // video: 'off',                // Never record videos
}
```

### Traces
```typescript
use: {
  trace: 'on-first-retry',  // Record trace on first retry
  // trace: 'on',              // Record trace for all tests
  // trace: 'off',             // Never record traces
}
```

---

## 🔄 Test Execution

### Parallel Execution
```typescript
fullyParallel: false,  // Run tests sequentially (good for beginners)
// fullyParallel: true,   // Run tests in parallel (faster)
```

### Workers
```typescript
workers: 1,           // Run 1 test at a time
// workers: 4,           // Run 4 tests in parallel
// workers: undefined,   // Use default (CPU cores / 2)
```

### Retries
```typescript
retries: 0,                      // No retries (good for development)
// retries: 2,                      // Retry failed tests 2 times
// retries: process.env.CI ? 2 : 0, // Retry only in CI
```

---

## 📊 Reporting

### HTML Report
```typescript
reporter: 'html',  // Generate HTML report
```

### Multiple Reporters
```typescript
reporter: [
  ['html'],                           // HTML report
  ['list'],                           // Console output
  ['json', { outputFile: 'results.json' }],  // JSON report
],
```

---

## 🌍 Environment-Specific Configuration

### Multiple Config Files
```
playwright.config.ts           # Default
playwright.config.dev.ts       # Development
playwright.config.staging.ts   # Staging
playwright.config.prod.ts      # Production
```

### Run with specific config:
```bash
npx playwright test --config=playwright.config.staging.ts
```

### Example: Staging Config
```typescript
export default defineConfig({
  use: {
    baseURL: 'https://staging.example.com',
  },
});
```

---

## 🎯 Recommended Settings for Beginners

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  
  fullyParallel: false,        // Sequential execution
  retries: 0,                  // No retries
  workers: 1,                  // One test at a time
  
  reporter: [['html'], ['list']],
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,           // Show browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10000,
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

---

## 🚀 Recommended Settings for CI/CD

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  
  fullyParallel: true,         // Parallel execution
  forbidOnly: true,            // Fail if test.only() found
  retries: 2,                  // Retry failed tests
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [['html'], ['github']],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: true,            // Hide browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

---

## 📝 Quick Reference

| Setting | Purpose | Beginner Value | CI Value |
|---------|---------|----------------|----------|
| `timeout` | Test timeout | 30000 | 30000 |
| `expect.timeout` | Assertion timeout | 5000 | 5000 |
| `actionTimeout` | Action timeout | 10000 | 10000 |
| `headless` | Show browser | false | true |
| `fullyParallel` | Parallel tests | false | true |
| `workers` | Concurrent tests | 1 | CPU/2 |
| `retries` | Retry failed tests | 0 | 2 |
| `screenshot` | Take screenshots | only-on-failure | only-on-failure |
| `video` | Record videos | retain-on-failure | retain-on-failure |

---

## 🎓 Summary

**Key Takeaways**:
- ✅ Use `baseURL` to avoid URL duplication
- ✅ Configure timeouts appropriately
- ✅ Use `headless: false` for learning
- ✅ Enable screenshots/videos on failure
- ✅ Start with sequential execution
- ✅ Use different configs for different environments

**Next Steps**:
- Experiment with different settings
- Create environment-specific configs
- Optimize for your project needs


