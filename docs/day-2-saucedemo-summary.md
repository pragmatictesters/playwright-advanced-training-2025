# Day 2 - SauceDemo Exercise Summary

## 🎉 Completion Status: ✅ ALL COMPLETE

---

## 📊 Overview

**Purpose**: Beginner-friendly login testing exercise for SauceDemo  
**Application**: https://www.saucedemo.com  
**Focus**: Configuration, beforeEach, timeouts, and comprehensive login testing  
**Time**: ~2 hours

---

## 📁 Files Created

### Test Files (1 file)
1. **`tests/saucedemo/auth/login.spec.ts`** - 16 comprehensive login tests

### Documentation (2 files)
2. **`docs/exercises/day-2/exercise-2-saucedemo.md`** - Complete exercise guide
3. **`docs/day-2-saucedemo-summary.md`** - This summary

### Configuration Updates
4. **`package.json`** - Added 5 new npm scripts

---

## 📂 Directory Structure

```
tests/
└── saucedemo/
    └── auth/
        └── login.spec.ts

docs/
├── exercises/
│   └── day-2/
│       └── exercise-2-saucedemo.md
└── day-2-saucedemo-summary.md
```

---

## 📚 Test Coverage

### **login.spec.ts** (16 tests)

#### Valid Login Tests (6 tests)
1. ✅ Login with `standard_user`
2. ✅ Login with `problem_user`
3. ✅ Login with `performance_glitch_user` (with custom timeout)
4. ✅ Login with `error_user`
5. ✅ Login with `visual_user`
6. ✅ Verify `locked_out_user` shows error

#### Invalid Login Tests (7 tests)
1. ✅ Empty username and password
2. ✅ Empty username only
3. ✅ Empty password only
4. ✅ Invalid username
5. ✅ Invalid password
6. ✅ Username case sensitivity
7. ✅ Password case sensitivity

#### UI Validation Tests (3 tests)
1. ✅ Verify all login page elements
2. ✅ Verify password is masked
3. ✅ Verify error message can be dismissed

**Total: 16 tests - All Passing ✅**

---

## 🚀 npm Scripts Added

```json
{
  "scripts": {
    "test:saucedemo": "playwright test tests/saucedemo",
    "test:saucedemo:headed": "playwright test tests/saucedemo --headed",
    "test:saucedemo:ui": "playwright test tests/saucedemo --ui",
    "test:saucedemo:debug": "playwright test tests/saucedemo --debug",
    "test:saucedemo:chromium": "playwright test tests/saucedemo --project=chromium",
    "codegen:saucedemo": "playwright codegen https://www.saucedemo.com"
  }
}
```

---

## 🎯 Key Learning Objectives

### 1. **Configuration Best Practices**
- ✅ Configure `baseURL` in playwright.config.ts
- ✅ Set global timeouts (`timeout`, `expect.timeout`, `actionTimeout`)
- ✅ Configure browser options (`headless`, `screenshot`, `video`)
- ✅ Set up test-specific timeout overrides

### 2. **beforeEach Hook**
```typescript
test.beforeEach(async ({ page }) => {
  // Navigate to login page before each test
  await page.goto('https://www.saucedemo.com/');
  
  // Wait for page to be ready
  await expect(page.locator('.login_logo')).toBeVisible();
});
```

### 3. **Data-Test Attributes**
```typescript
// Using data-test attributes (more stable than CSS)
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();
```

### 4. **Custom Timeout for Slow Tests**
```typescript
test('should login with performance_glitch_user', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds for slow user
  // ... test code
});
```

### 5. **Error Validation**
```typescript
await expect(page.locator('[data-test="error"]')).toBeVisible();
await expect(page.locator('[data-test="error"]'))
  .toContainText('Epic sadface: Username is required');
```

### 6. **Git Workflow**
```bash
git add tests/saucedemo/
git commit -m "feat: Add SauceDemo login tests"
git push origin main
```

---

## ✅ Test Execution Results

```
Running 16 tests using 1 worker

✅ should login successfully with standard_user
✅ should login successfully with problem_user
✅ should login successfully with performance_glitch_user
✅ should login successfully with error_user
✅ should login successfully with visual_user
✅ should show error for locked_out_user
✅ should show error with empty username and password
✅ should show error with empty username
✅ should show error with empty password
✅ should show error with invalid username
✅ should show error with invalid password
✅ should be case-sensitive for username
✅ should be case-sensitive for password
✅ should display all login page elements
✅ should mask password input
✅ should allow dismissing error message

16 passed (27.1s)
```

---

## 🎓 Beginner-Friendly Features

### 1. **Clear Structure**
- Single test file with all tests
- Organized into logical sections (valid, invalid, UI)
- Descriptive test names

### 2. **Comprehensive Comments**
```typescript
/**
 * SauceDemo Login Tests
 * 
 * Test Suite: Authentication - Login
 * Application: SauceDemo (Swag Labs)
 * URL: https://www.saucedemo.com
 */
```

### 3. **Step-by-Step Exercise Guide**
- Clear learning objectives
- Prerequisites checklist
- Step-by-step instructions
- Code examples
- Verification checklist
- Common issues & solutions

### 4. **Multiple User Scenarios**
- Tests cover 6 different user types
- Demonstrates handling different behaviors
- Shows custom timeout for slow user

### 5. **Complete Error Coverage**
- Empty fields
- Invalid credentials
- Case sensitivity
- Locked out user

---

## 💡 Best Practices Demonstrated

### ✅ Test Organization
```typescript
test.describe('SauceDemo - Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup
  });
  
  // Valid tests
  test('should login successfully...', async ({ page }) => {});
  
  // Invalid tests
  test('should show error...', async ({ page }) => {});
  
  // UI tests
  test('should display...', async ({ page }) => {});
});
```

### ✅ Locator Strategy
- Use `data-test` attributes (stable, semantic)
- Avoid fragile CSS selectors
- Clear, readable locators

### ✅ Assertions
- Verify URL changes
- Verify element visibility
- Verify text content
- Verify element attributes

### ✅ Configuration
- Global timeouts for all tests
- Test-specific timeout overrides
- Browser options for debugging
- Screenshot/video on failure

---

## 📝 Exercise Document Highlights

### Sections Included:
1. **Learning Objectives** - Clear goals
2. **Prerequisites** - What students need
3. **Application Details** - User accounts table
4. **Test Cases List** - All 16 test cases
5. **Project Structure** - Folder layout
6. **Step-by-Step Instructions** - 7 detailed steps
7. **Verification Checklist** - Success criteria
8. **Key Concepts** - Code examples
9. **Best Practices** - Do's and Don'ts
10. **Common Issues** - Troubleshooting
11. **Bonus Challenges** - Advanced exercises
12. **Resources** - Documentation links

---

## 🚀 Quick Commands

### Run Tests
```bash
# All tests
npm run test:saucedemo

# With browser visible
npm run test:saucedemo:headed

# Interactive UI mode
npm run test:saucedemo:ui

# Debug mode
npm run test:saucedemo:debug

# Specific browser
npm run test:saucedemo:chromium
```

### View Report
```bash
npx playwright show-report
```

### Code Generation
```bash
npm run codegen:saucedemo
```

---

## 🎯 What Students Learn

### Technical Skills:
- ✅ Playwright configuration
- ✅ Test hooks (beforeEach)
- ✅ Timeout management
- ✅ Locator strategies
- ✅ Assertions
- ✅ Error handling
- ✅ npm scripts
- ✅ Git workflow

### Testing Skills:
- ✅ Test organization
- ✅ Test naming
- ✅ Positive testing (valid scenarios)
- ✅ Negative testing (invalid scenarios)
- ✅ UI validation
- ✅ Error message validation
- ✅ Test data management

### Best Practices:
- ✅ DRY principle (beforeEach)
- ✅ Stable locators (data-test)
- ✅ Descriptive naming
- ✅ Proper assertions
- ✅ Configuration management
- ✅ Version control

---

## 🔄 Progression Path

**Day 1**: Basic Playwright concepts ✅  
**Day 2 - Exercise 1**: OrangeHRM (data-driven, CSV) ✅  
**Day 2 - Exercise 2**: SauceDemo (config, timeouts) ✅  
**Day 3**: Page Object Model 🔜  
**Day 4+**: Advanced patterns 🔜

---

## 📊 Comparison with Exercise 1 (OrangeHRM)

| Feature | OrangeHRM | SauceDemo |
|---------|-----------|-----------|
| Tests | 27 tests | 16 tests |
| Files | 3 test files | 1 test file |
| Data-driven | ✅ CSV | ❌ |
| Timeouts | Basic | ✅ Advanced |
| Config | Basic | ✅ Detailed |
| Users | 1 user | 6 users |
| Complexity | Intermediate | Beginner |

**SauceDemo is more beginner-friendly!**

---

## ✅ Success Criteria

Students should be able to:
- ✅ Configure playwright.config.ts with baseURL and timeouts
- ✅ Use beforeEach for common setup
- ✅ Write 16+ login tests covering valid/invalid scenarios
- ✅ Use data-test attributes for locators
- ✅ Set custom timeouts for specific tests
- ✅ Run tests using npm scripts
- ✅ Generate and view HTML reports
- ✅ Commit and push code to GitHub

---

## 🎉 Summary

### Deliverables:
- ✅ 1 comprehensive test file (16 tests)
- ✅ Complete exercise document
- ✅ 5 npm scripts
- ✅ All tests passing
- ✅ Beginner-friendly documentation

### Key Features:
- ✅ Short and focused (2 hours)
- ✅ Beginner-friendly
- ✅ Comprehensive coverage
- ✅ Best practices demonstrated
- ✅ Clear documentation
- ✅ Ready for training

---

## 🚀 Ready for Training!

**Your students will learn:**
- Configuration management
- Test organization with hooks
- Timeout handling
- Multiple user scenarios
- Error validation
- Git workflow

**Perfect foundation for Day 3: Page Object Model!** 🎭✨


