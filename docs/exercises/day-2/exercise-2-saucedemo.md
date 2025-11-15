# Day 2 - Exercise 2: SauceDemo Login Testing

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 2 hours](https://img.shields.io/badge/Time-2%20hours-blue)

## 🎯 Learning Objectives

By completing this exercise, you will:
- ✅ Configure `baseURL` in playwright.config.ts
- ✅ Use `beforeEach` hook for navigation
- ✅ Test multiple valid user accounts
- ✅ Implement invalid login scenarios
- ✅ Configure timeouts (global and test-specific)
- ✅ Use data-test attributes for locators
- ✅ Create custom npm scripts
- ✅ Generate and view test reports
- ✅ Push code to GitHub

---

## 📋 Prerequisites

- ✅ Completed Day 1 exercises
- ✅ Understanding of basic Playwright concepts
- ✅ Node.js and Playwright installed
- ✅ Git installed and configured

---

## 🌐 Application Under Test

**Application**: SauceDemo (Swag Labs)  
**URL**: https://www.saucedemo.com

### Valid User Accounts:
| Username | Password | Description |
|----------|----------|-------------|
| `standard_user` | `secret_sauce` | Standard user with full access |
| `problem_user` | `secret_sauce` | User with UI issues |
| `performance_glitch_user` | `secret_sauce` | Slow performance user |
| `error_user` | `secret_sauce` | Error-prone user |
| `visual_user` | `secret_sauce` | Visual testing user |
| `locked_out_user` | `secret_sauce` | ⚠️ Locked out (should fail) |

---

## 📝 Test Cases to Implement

### Part 1: Valid Login Tests (6 tests)
1. ✅ Login with `standard_user`
2. ✅ Login with `problem_user`
3. ✅ Login with `performance_glitch_user` (with custom timeout)
4. ✅ Login with `error_user`
5. ✅ Login with `visual_user`
6. ✅ Verify `locked_out_user` shows error

### Part 2: Invalid Login Tests (7 tests)
1. ✅ Empty username and password
2. ✅ Empty username only
3. ✅ Empty password only
4. ✅ Invalid username
5. ✅ Invalid password
6. ✅ Username case sensitivity
7. ✅ Password case sensitivity

### Part 3: UI Validation Tests (3 tests)
1. ✅ Verify all login page elements
2. ✅ Verify password is masked
3. ✅ Verify error message can be dismissed

**Total: 16 tests**

---

## 📁 Project Structure

Create the following structure:

```
your-project/
├── tests/
│   └── saucedemo/
│       └── auth/
│           └── login.spec.ts
├── playwright.config.ts
└── package.json
```

---

## 🚀 Step-by-Step Instructions

### **Step 1: Create Folder Structure**

```bash
mkdir -p tests/saucedemo/auth
```

### **Step 2: Update playwright.config.ts**

Add baseURL and timeout configurations:

```typescript
export default defineConfig({
  testDir: './tests',
  
  // Timeout configurations
  timeout: 30000,              // 30 seconds per test
  expect: {
    timeout: 5000              // 5 seconds for assertions
  },
  
  use: {
    // Base URL - use relative paths in tests
    baseURL: 'https://www.saucedemo.com',
    
    // Browser options
    headless: false,           // Show browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    
    // Action timeout
    actionTimeout: 10000,      // 10 seconds
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

**Key Concepts**:
- `baseURL` - Base URL for all tests (use `page.goto('/')` instead of full URL)
- `timeout` - Maximum time for entire test
- `expect.timeout` - Maximum time for assertions
- `actionTimeout` - Maximum time for actions (click, fill, etc.)

### **Step 3: Create login.spec.ts**

Create `tests/saucedemo/auth/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login Tests', () => {
  
  // This runs before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('https://www.saucedemo.com/');
    
    // Wait for page to load
    await expect(page.locator('.login_logo')).toBeVisible();
  });

  test('should login successfully with standard_user', async ({ page }) => {
    // Fill username using data-test attribute
    await page.locator('[data-test="username"]').fill('standard_user');
    
    // Fill password
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login button
    await page.locator('[data-test="login-button"]').click();
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('should show error with empty username and password', async ({ page }) => {
    // Click login without filling fields
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username is required');
  });

  // Add more tests here...
});
```

**💡 Tip**: Use the provided solution file `tests/saucedemo/auth/login.spec.ts` as reference!

### **Step 4: Add npm Scripts**

Update `package.json`:

```json
{
  "scripts": {
    "test:saucedemo": "playwright test tests/saucedemo",
    "test:saucedemo:headed": "playwright test tests/saucedemo --headed",
    "test:saucedemo:ui": "playwright test tests/saucedemo --ui",
    "test:saucedemo:debug": "playwright test tests/saucedemo --debug",
    "codegen:saucedemo": "playwright codegen https://www.saucedemo.com"
  }
}
```

### **Step 5: Run Tests**

```bash
# Run all SauceDemo tests
npm run test:saucedemo

# Run with browser visible
npm run test:saucedemo:headed

# Run in UI mode (interactive)
npm run test:saucedemo:ui

# Run in debug mode
npm run test:saucedemo:debug
```

### **Step 6: View Test Report**

```bash
# Generate and open HTML report
npx playwright show-report
```

### **Step 7: Push to GitHub**

```bash
# Check status
git status

# Add files
git add tests/saucedemo/
git add playwright.config.ts
git add package.json

# Commit with descriptive message
git commit -m "feat: Add SauceDemo login tests

- Add 16 login tests (valid, invalid, UI validation)
- Configure baseURL and timeouts
- Add npm scripts for SauceDemo tests
- Use data-test attributes for locators"

# Push to GitHub
git push origin main
```

---

## ✅ Verification Checklist

After completing the exercise, verify:

- [ ] All 16 tests pass successfully
- [ ] Tests use `beforeEach` for navigation
- [ ] Tests use `data-test` attributes for locators
- [ ] `performance_glitch_user` test has custom timeout
- [ ] Error messages are validated correctly
- [ ] HTML report is generated
- [ ] Code is pushed to GitHub

---

## 🎓 Key Concepts Learned

### 1. **beforeEach Hook**
```typescript
test.beforeEach(async ({ page }) => {
  // Runs before each test
  await page.goto('https://www.saucedemo.com/');
});
```

### 2. **Data-Test Attributes**
```typescript
// Better than CSS selectors - more stable
await page.locator('[data-test="username"]').fill('standard_user');
```

### 3. **Custom Timeout**
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds for this test only
  // ... test code
});
```

### 4. **Error Validation**
```typescript
await expect(page.locator('[data-test="error"]')).toBeVisible();
await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
```

---

## 💡 Best Practices

### ✅ Do:
- Use `beforeEach` for common setup
- Use `data-test` attributes for locators
- Write descriptive test names
- Validate both success and error scenarios
- Configure appropriate timeouts
- Commit code with clear messages

### ❌ Don't:
- Hardcode URLs in every test (use `baseURL`)
- Use fragile CSS selectors
- Skip error validation
- Use generic test names
- Forget to push code to GitHub

---

## 🐛 Common Issues & Solutions

### Issue 1: Tests are slow
**Solution**: Check if you're using `performance_glitch_user` - this user is intentionally slow. Use `test.setTimeout(60000)`.

### Issue 2: Error message not found
**Solution**: Make sure to wait for the error to appear: `await expect(page.locator('[data-test="error"]')).toBeVisible();`

### Issue 3: Tests fail randomly
**Solution**: Add proper waits: `await expect(page.locator('.login_logo')).toBeVisible();`

---

## 🎯 Bonus Challenges

1. **Data-Driven Tests**: Create a JSON file with user credentials and loop through them
2. **Helper Function**: Create a `login()` helper function to reduce code duplication
3. **Logout Test**: Add a test to verify logout functionality
4. **Screenshot on Failure**: Configure automatic screenshots on test failure

---

## 📚 Resources

- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Test Hooks](https://playwright.dev/docs/api/class-test#test-before-each)

---

## 🎉 Summary

Congratulations! You've learned:
- ✅ How to configure `baseURL` and timeouts
- ✅ How to use `beforeEach` for setup
- ✅ How to test multiple user scenarios
- ✅ How to validate error messages
- ✅ How to use data-test attributes
- ✅ How to create npm scripts
- ✅ How to push code to GitHub

**You're now ready for Day 3: Page Object Model!** 🚀


