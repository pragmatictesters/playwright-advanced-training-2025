# Page Object Model - Best Practices & Tips

## 📚 Overview

This guide covers best practices, common pitfalls, and tips for implementing Page Object Model (POM) in Playwright tests.

---

## ✅ Best Practices

### 1. **Use Descriptive Class and Method Names**

```typescript
// ✅ Good - Clear and descriptive
class LoginPage {
  async login(username: string, password: string) { }
  async verifyErrorMessage(message: string) { }
}

// ❌ Bad - Vague names
class LP {
  async doLogin(u: string, p: string) { }
  async check(msg: string) { }
}
```

**Why:** Clear names make tests self-documenting and easier to maintain.

---

### 2. **Store Locators, Not Selectors**

```typescript
// ✅ Good - Store Locator objects
class LoginPage {
  readonly usernameInput: Locator;
  
  constructor(page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
  }
}

// ❌ Bad - Store selector strings
class LoginPage {
  readonly usernameSelector = '[data-test="username"]';
  
  async fillUsername(username: string) {
    await this.page.locator(this.usernameSelector).fill(username);
  }
}
```

**Why:** Locators have built-in auto-waiting and retry logic. Selectors don't.

---

### 3. **Keep Methods Simple and Focused**

```typescript
// ✅ Good - Single responsibility
class LoginPage {
  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }
  
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  
  async clickLoginButton() {
    await this.loginButton.click();
  }
  
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}

// ❌ Bad - Too much responsibility
class LoginPage {
  async loginAndVerifyDashboardAndCheckProducts(username: string, password: string) {
    // Too many things in one method!
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL('/dashboard');
    await expect(this.page.locator('.products')).toBeVisible();
  }
}
```

**Why:** Small, focused methods are easier to test, reuse, and maintain.

---

### 4. **Use Readonly for Locators**

```typescript
// ✅ Good - Readonly prevents accidental changes
class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
}

// ❌ Bad - Mutable locators
class LoginPage {
  usernameInput: Locator;  // Can be accidentally reassigned
}
```

**Why:** Locators should never change after initialization.

---

### 5. **One Page Object Per File**

```typescript
// ✅ Good - Separate files
// login-page.ts
export class LoginPage { }

// products-page.ts
export class ProductsPage { }

// ❌ Bad - All in one file
// pages.ts
export class LoginPage { }
export class ProductsPage { }
export class CheckoutPage { }
// ... 20 more classes
```

**Why:** Easier to find, maintain, and understand.

---

### 6. **Follow Naming Conventions**

```typescript
// ✅ Good - Consistent naming
tests/pages/saucedemo/login-page.ts      // kebab-case with -page suffix
tests/pages/saucedemo/products-page.ts
tests/pages/saucedemo/checkout-page.ts

// ❌ Bad - Inconsistent naming
tests/pages/saucedemo/LoginPage.ts       // PascalCase for files
tests/pages/saucedemo/products.ts        // Missing -page suffix
tests/pages/saucedemo/CheckOut_Page.ts   // Mixed case
```

**Why:** Consistency makes codebase easier to navigate.

---

### 7. **Don't Put Assertions in Page Objects**

```typescript
// ✅ Good - Return values, let tests assert
class LoginPage {
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}

// Test file
test('error message', async ({ loginPage }) => {
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid credentials');
});

// ❌ Bad - Assertions in page object
class LoginPage {
  async verifyErrorMessage(expected: string) {
    const actual = await this.errorMessage.textContent();
    expect(actual).toBe(expected);  // Don't do this!
  }
}
```

**Why:** Tests should control assertions. Page objects should provide data.

**Exception:** Simple visibility checks are OK:
```typescript
// ✅ OK - Simple verification methods
async verifyPageLoaded() {
  await expect(this.loginLogo).toBeVisible();
}
```

---

### 8. **Use TypeScript for Type Safety**

```typescript
// ✅ Good - TypeScript with types
class LoginPage {
  constructor(page: Page) {
    this.page = page;
  }
  
  async login(username: string, password: string): Promise<void> {
    // Type-safe!
  }
}

// ❌ Bad - JavaScript without types
class LoginPage {
  constructor(page) {  // What type is page?
    this.page = page;
  }
  
  async login(username, password) {  // What types?
    // No type safety
  }
}
```

**Why:** Catch errors at compile time, not runtime.

---

### 9. **Group Related Locators**

```typescript
// ✅ Good - Logical grouping
class CheckoutPage {
  // Form fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  
  // Buttons
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  
  // Error messages
  readonly errorMessage: Locator;
}
```

**Why:** Easier to understand page structure.

---

### 10. **Add JSDoc Comments**

```typescript
// ✅ Good - Documented
/**
 * LoginPage - Page Object for SauceDemo login page
 * URL: https://www.saucedemo.com/
 */
class LoginPage {
  /**
   * Perform login action
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string) { }
}
```

**Why:** Helps other developers understand your code.

---

## ❌ Common Pitfalls

### 1. **Too Much Logic in Page Objects**

```typescript
// ❌ Bad - Business logic in page object
class LoginPage {
  async loginWithRetry(username: string, password: string, maxRetries: number) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.login(username, password);
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
      }
    }
  }
}

// ✅ Good - Keep it simple
class LoginPage {
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

### 2. **Returning Page Objects from Methods**

```typescript
// ❌ Bad - Fluent interface (confusing)
class LoginPage {
  async fillUsername(username: string): Promise<LoginPage> {
    await this.usernameInput.fill(username);
    return this;
  }
}

// ✅ Good - Return void or data
class LoginPage {
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }
}
```

---

### 3. **Not Using Data-Test Attributes**

```typescript
// ❌ Bad - Fragile selectors
this.loginButton = page.locator('button.btn-primary.login-btn');

// ✅ Good - Stable data-test attributes
this.loginButton = page.locator('[data-test="login-button"]');
```

---

## 💡 Pro Tips

### Tip 1: Use Fixtures for Cleaner Code
```typescript
// Instead of manual instantiation
const loginPage = new LoginPage(page);

// Use fixtures
test('my test', async ({ loginPage }) => {
  // Automatically available!
});
```

### Tip 2: Create Base Page Class (Optional)
```typescript
class BasePage {
  constructor(protected page: Page) {}
  
  async goto(url: string) {
    await this.page.goto(url);
  }
}

class LoginPage extends BasePage {
  // Inherits goto method
}
```

### Tip 3: Use Page Object for Verification
```typescript
class LoginPage {
  async verifyPageLoaded() {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }
}
```

---

## 🎯 Summary

**DO:**
- ✅ Use descriptive names
- ✅ Store Locators, not selectors
- ✅ Keep methods simple
- ✅ Use readonly for locators
- ✅ One page object per file
- ✅ Follow naming conventions
- ✅ Use TypeScript
- ✅ Add documentation

**DON'T:**
- ❌ Put too much logic in page objects
- ❌ Use fluent interfaces
- ❌ Use fragile selectors
- ❌ Mix concerns
- ❌ Forget to use fixtures

**Remember:** Page objects should be simple, focused, and easy to maintain!

