# Day 3 - Exercise 3: Page Object Model & Fixtures

## 🎯 Learning Objectives

By the end of this exercise, you will:
- ✅ Understand **why** Page Object Model is useful
- ✅ Create **page object classes** with locators and methods
- ✅ **Refactor existing tests** to use page objects
- ✅ Use **fixtures** to eliminate boilerplate code
- ✅ Compare **POM vs Fixtures** approaches
- ✅ Apply **best practices** for page objects

---

## ⏱️ Time Allocation

- **Total Time:** ~2 hours
- **Part 1:** Understanding POM (30 min)
- **Part 2:** Creating Page Objects (45 min)
- **Part 3:** Using Fixtures (45 min)

---

## 📋 Prerequisites

- ✅ Completed Day 2 exercises
- ✅ SauceDemo tests from Day 2 working
- ✅ Basic understanding of TypeScript classes

---

## 🚀 Part 1: Understanding the Problem (30 min)

### Step 1: Review Existing Code

Open your Day 2 SauceDemo login tests:
```bash
code tests/saucedemo/auth/login.spec.ts
```

**Observe the duplication:**
- `page.locator('[data-test="username"]')` - repeated many times
- `page.locator('[data-test="password"]')` - repeated many times
- `page.locator('[data-test="login-button"]')` - repeated many times

**Question:** What happens if the selector changes? 🤔

**Answer:** You'd need to update it in **every test**! That's a maintenance nightmare.

---

### Step 2: Understand Page Object Model

**Page Object Model (POM)** solves this by:
1. **Centralizing locators** - Define selectors in one place
2. **Creating reusable methods** - Write login logic once
3. **Improving maintainability** - Change in one place, affects all tests

**Analogy:** Think of it like a TV remote control:
- **Without POM:** You manually press buttons on the TV every time
- **With POM:** You use a remote (page object) with labeled buttons (methods)

---

## 🛠️ Part 2: Creating Page Objects (45 min)

### Step 3: Create LoginPage Class

Create a new file: `tests/pages/saucedemo/login-page.ts`

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  // Locators - defined once, used everywhere
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
```

**Key Points:**
- ✅ `readonly` prevents accidental changes
- ✅ Locators are `Locator` type, not strings
- ✅ Methods are simple and focused
- ✅ Clear, descriptive names

---

### Step 4: Create ProductsPage Class

Create: `tests/pages/saucedemo/products-page.ts`

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.shoppingCart = page.locator('.shopping_cart_link');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.pageTitle).toContainText('Products');
  }
}
```

---

### Step 5: Use Page Objects in Tests

Create: `tests/saucedemo/pom/login-pom.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/login-page';
import { ProductsPage } from '../../pages/saucedemo/products-page';

test.describe('Login Tests with POM', () => {
  
  test('should login successfully', async ({ page }) => {
    // Create page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    // Use page objects
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.verifyPageLoaded();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.verifyErrorMessage('Username and password do not match');
  });
});
```

---

### Step 6: Run Your Tests

```bash
npx playwright test tests/saucedemo/pom/login-pom.spec.ts
```

**Expected Result:** ✅ All tests pass

---

## ⚡ Part 3: Using Fixtures (45 min)

### Step 7: Create Fixtures File

Create: `tests/fixtures/saucedemo-fixtures.ts`

```typescript
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo/login-page';
import { ProductsPage } from '../pages/saucedemo/products-page';

type SauceDemoFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<SauceDemoFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect };
```

---

### Step 8: Use Fixtures in Tests

Create: `tests/saucedemo/fixtures/login-fixtures.spec.ts`

```typescript
import { test, expect } from '../../fixtures/saucedemo-fixtures';

test.describe('Login Tests with Fixtures', () => {
  
  test('should login successfully', async ({ loginPage, productsPage }) => {
    // No manual instantiation! Cleaner code!
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.verifyPageLoaded();
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.verifyErrorMessage('Username and password do not match');
  });
});
```

**Notice the difference:**
- ❌ **Without fixtures:** `const loginPage = new LoginPage(page);`
- ✅ **With fixtures:** `async ({ loginPage }) =>` - automatically available!

---

### Step 9: Run Fixture Tests

```bash
npx playwright test tests/saucedemo/fixtures/login-fixtures.spec.ts
```

**Expected Result:** ✅ All tests pass

---

## 📊 Comparison: Before vs After

### Before (No POM):
```typescript
test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
```

### After (With POM + Fixtures):
```typescript
test('login', async ({ loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.verifyPageLoaded();
});
```

**Benefits:**
- ✅ **Cleaner** - Less code, more readable
- ✅ **Maintainable** - Change selectors in one place
- ✅ **Reusable** - Use across multiple tests
- ✅ **Type-safe** - TypeScript catches errors

---

## ✅ Verification Checklist

After completing this exercise, verify:

- [ ] Created `LoginPage` class with locators and methods
- [ ] Created `ProductsPage` class with locators and methods
- [ ] Created tests using POM (manual instantiation)
- [ ] Created fixtures file for page objects
- [ ] Created tests using fixtures (automatic injection)
- [ ] All tests pass successfully
- [ ] Understand the benefits of POM
- [ ] Understand the benefits of fixtures

---

## 🎓 Key Takeaways

1. **POM centralizes locators** - Change in one place
2. **POM creates reusable methods** - Write once, use everywhere
3. **Fixtures eliminate boilerplate** - No manual instantiation
4. **Fixtures + POM = Best approach** - Clean, maintainable code
5. **Use TypeScript** - Type safety catches errors early

---

## 📚 Additional Resources

- [POM vs Alternatives Guide](../../pom-vs-alternatives.md)
- [POM Best Practices](../../pom-best-practices.md)
- [Playwright Official POM Docs](https://playwright.dev/docs/pom)
- [Playwright Fixtures Docs](https://playwright.dev/docs/test-fixtures)

---

## 🚀 Bonus Challenges

### Challenge 1: Add More Methods
Add these methods to `LoginPage`:
- `fillUsername(username: string)`
- `fillPassword(password: string)`
- `clickLogin()`
- `clearUsername()`

### Challenge 2: Create Authenticated Fixture
Create a fixture that automatically logs in before each test.

### Challenge 3: Add More Page Objects
Create page objects for:
- Cart page
- Checkout page

---

## 🤝 Need Help?

**Common Issues:**

1. **Import errors?**
   - Check file paths are correct
   - Ensure files are saved

2. **Tests failing?**
   - Verify selectors are correct
   - Check SauceDemo website is accessible

3. **TypeScript errors?**
   - Ensure all imports are correct
   - Check types match

---

## 🎉 Congratulations!

You've successfully learned Page Object Model and Fixtures! You now have the skills to write clean, maintainable Playwright tests. 🚀

**Next:** Day 4 - Advanced Patterns & API Testing

