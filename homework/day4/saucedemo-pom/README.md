# Day 4 Exercise: Page Object Model & Checkout Flow

## 🎯 Learning Objectives

After completing this exercise, you will be able to:
- ✅ Implement Page Object Model (POM) pattern
- ✅ Create and use custom Playwright fixtures
- ✅ Apply best practices in page object design
- ✅ Follow coding conventions
- ✅ Test complete E2E checkout flows

---

## 📦 Exercise Overview

This exercise uses **saucedemo.com** to practice:
1. **Login Tests** - Using POM and fixtures
2. **Checkout Flow** - Happy path E2E testing

### Website Under Test
- **URL**: https://www.saucedemo.com/
- **Valid Credentials**: `standard_user` / `secret_sauce`

---

## 📁 Project Structure

```
tests/saucedemo/day4-exercise/   # Test files
├── login.spec.ts                # Login test scenarios
└── checkout.spec.ts             # Checkout flow tests

tests/pages/saucedemo/           # Page Objects (shared)
├── login-page.ts
├── products-page.ts
├── cart-page.ts
├── checkout-step-one-page.ts
├── checkout-step-two-page.ts
└── checkout-complete-page.ts

tests/fixtures/
└── saucedemo-fixtures.ts        # Custom fixtures
```

---

## 🚀 Running the Tests

```bash
# Run all Day 4 exercise tests
npx playwright test tests/saucedemo/day4-exercise --project=chromium

# Run login tests only
npx playwright test tests/saucedemo/day4-exercise/login.spec.ts --project=chromium

# Run checkout tests only
npx playwright test tests/saucedemo/day4-exercise/checkout.spec.ts --project=chromium

# Run with UI mode (recommended for learning)
npx playwright test tests/saucedemo/day4-exercise --ui

# Run headed (see browser)
npx playwright test tests/saucedemo/day4-exercise --headed
```

---

## 📚 Key Concepts Covered

### 1. Page Object Model (POM)

**What**: Design pattern that creates an object for each page.

**Why**:
- Centralized locators (change in one place)
- Reusable methods across tests
- Cleaner, more readable tests
- Easier maintenance

**Example**:
```typescript
// Page Object
export class LoginPage {
  readonly usernameInput: Locator;
  
  constructor(page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
  }
  
  async login(username: string, password: string) {
    // implementation
  }
}
```

### 2. Fixtures

**What**: Reusable setup/teardown for tests.

**Why**:
- No manual object instantiation
- Automatic dependency injection
- Cleaner test code
- Type-safe

**Example**:
```typescript
// Without fixtures
test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);  // Manual
});

// With fixtures
test('test', async ({ loginPage }) => {
  // loginPage is automatically injected!
});
```

### 3. Best Practices Applied

- ✅ **Descriptive test names** - Clear what test does
- ✅ **AAA pattern** - Arrange, Act, Assert
- ✅ **Test data separation** - Constants at top
- ✅ **Parameterized tests** - DRY principle
- ✅ **Single responsibility** - One assertion focus per test
- ✅ **test.describe blocks** - Organized test groups

---

## ✍️ Exercise Tasks

### Part 1: Review the Page Objects (15 min)
1. Open `tests/pages/saucedemo/` folder
2. Review each page object file
3. Note the patterns: locators, methods, JSDoc comments

### Part 2: Review the Fixtures (10 min)
1. Open `tests/fixtures/saucedemo-fixtures.ts`
2. Understand how fixtures inject page objects
3. Note the `authenticatedPage` fixture for pre-login state

### Part 3: Run and Analyze Tests (20 min)
1. Run the login tests in UI mode
2. Run the checkout tests in headed mode
3. Observe how page objects chain together

### Part 4: Extend the Tests (30 min)
Add these test cases:
1. **Login**: Test with `problem_user` credentials
2. **Checkout**: Cancel checkout from step one
3. **Checkout**: Verify item total matches product price

---

## 🧪 Test Scenarios Included

### Login Tests (`login.spec.ts`)
| Test | Description |
|------|-------------|
| Valid login | Login with standard_user |
| Product count | Verify 6 products after login |
| Empty username | Error validation |
| Empty password | Error validation |
| Invalid creds | Error validation |
| Locked user | Error validation |
| Close error | UI interaction |
| Password masked | Security check |

### Checkout Tests (`checkout.spec.ts`)
| Test | Description |
|------|-------------|
| Single product checkout | Complete E2E flow |
| Multiple products checkout | 2 items purchase |
| Add/remove from cart | Cart management |
| Continue shopping | Navigation test |

---

## 💡 Tips

1. **Use UI Mode** - Best for debugging: `npx playwright test --ui`
2. **Watch Test Execution** - Use `--headed` flag
3. **Trace on Failure** - Check `playwright-report` folder
4. **Read Page Objects** - Understand before writing tests

---

## 🎓 Summary

This exercise demonstrates:
- **POM Pattern** - Separation of concerns
- **Fixtures** - Clean dependency injection
- **Best Practices** - Professional test structure
- **E2E Testing** - Real user journey validation

**Happy Testing!** 🎭

