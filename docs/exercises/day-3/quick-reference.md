# Day 3 Quick Reference - Page Object Model & Fixtures

## 🚀 Quick Start

### Run All Day 3 Tests
```bash
npm run test:day3
```

### Run Specific Tests
```bash
npm run test:saucedemo:pom              # POM tests
npm run test:saucedemo:fixtures         # Fixture tests
npm run test:saucedemo:pom:login        # POM login tests
npm run test:saucedemo:fixtures:login   # Fixture login tests
npm run test:saucedemo:fixtures:products # Products tests
```

---

## 📝 Page Object Template

### Basic Page Object
```typescript
import { Page, Locator, expect } from '@playwright/test';

export class MyPage {
  readonly page: Page;
  readonly myButton: Locator;
  readonly myInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myButton = page.locator('[data-test="my-button"]');
    this.myInput = page.locator('[data-test="my-input"]');
  }

  async goto() {
    await this.page.goto('https://example.com');
  }

  async doSomething(value: string) {
    await this.myInput.fill(value);
    await this.myButton.click();
  }

  async verifyPageLoaded() {
    await expect(this.myButton).toBeVisible();
  }
}
```

---

## 🔧 Fixtures Template

### Basic Fixture
```typescript
import { test as base, expect, Page } from '@playwright/test';
import { MyPage } from '../pages/my-page';

type MyFixtures = {
  myPage: MyPage;
};

export const test = base.extend<MyFixtures>({
  myPage: async ({ page }, use) => {
    await use(new MyPage(page));
  },
});

export { expect };
```

### Authenticated Fixture
```typescript
export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user', 'pass');
    
    // Provide authenticated page
    await use(page);
    
    // Teardown (optional)
    // await logout();
  },
});
```

---

## 📖 Usage Examples

### Without POM (Day 2)
```typescript
test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});
```

### With POM (Manual)
```typescript
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});
```

### With Fixtures (Automatic)
```typescript
test('login', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});
```

### With Authenticated Fixture
```typescript
test('products', async ({ authenticatedPage, productsPage }) => {
  // Already logged in!
  await productsPage.verifyPageLoaded();
});
```

---

## ✅ Best Practices Checklist

### Page Objects
- [ ] Use `readonly` for locators
- [ ] Store `Locator` objects, not selector strings
- [ ] Keep methods simple and focused
- [ ] Use descriptive names
- [ ] One page object per file
- [ ] Follow naming convention: `my-page.ts`
- [ ] Add JSDoc comments
- [ ] Use TypeScript with types

### Fixtures
- [ ] Create fixtures file in `tests/fixtures/`
- [ ] Export both `test` and `expect`
- [ ] Use descriptive fixture names
- [ ] Document fixture purpose
- [ ] Keep fixtures simple
- [ ] Use fixtures for common setup

### Tests
- [ ] Import from fixtures file, not `@playwright/test`
- [ ] Use fixtures in test parameters
- [ ] Keep tests focused and readable
- [ ] Add descriptive test names
- [ ] Group related tests with `describe`

---

## 🎯 Common Patterns

### Pattern 1: Simple Page Object
```typescript
class LoginPage {
  constructor(page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
  }
  
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Pattern 2: Page Object with Verification
```typescript
class LoginPage {
  async verifyErrorMessage(expected: string) {
    await expect(this.errorMessage).toContainText(expected);
  }
}
```

### Pattern 3: Fixture with Setup
```typescript
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(); // Auto-navigate
    await use(loginPage);
  },
});
```

---

## 🐛 Troubleshooting

### Import Errors
```typescript
// ❌ Wrong
import { test } from '@playwright/test';

// ✅ Correct (when using fixtures)
import { test } from '../../fixtures/saucedemo-fixtures';
```

### Type Errors
```typescript
// ❌ Wrong
constructor(page) {  // No type

// ✅ Correct
constructor(page: Page) {  // With type
```

### Locator Errors
```typescript
// ❌ Wrong
readonly usernameSelector = '[data-test="username"]';

// ✅ Correct
readonly usernameInput: Locator;
constructor(page: Page) {
  this.usernameInput = page.locator('[data-test="username"]');
}
```

---

## 📚 File Locations

```
tests/
├── pages/
│   └── saucedemo/
│       ├── login-page.ts          # Page objects here
│       └── products-page.ts
├── fixtures/
│   └── saucedemo-fixtures.ts      # Fixtures here
└── saucedemo/
    ├── pom/
    │   └── login-pom.spec.ts      # Tests here
    └── fixtures/
        └── login-fixtures.spec.ts
```

---

## 🎓 Key Takeaways

1. **POM = Centralized locators + Reusable methods**
2. **Fixtures = Automatic dependency injection**
3. **POM + Fixtures = Best approach**
4. **Use TypeScript for type safety**
5. **Follow naming conventions**
6. **Keep it simple**

---

## 📖 Full Documentation

- **Main Exercise:** `docs/exercises/day-3/exercise-3-page-objects.md`
- **Comparison Guide:** `docs/pom-vs-alternatives.md`
- **Best Practices:** `docs/pom-best-practices.md`
- **Day 3 Summary:** `docs/day-3-summary.md`

---

## 🚀 Next Steps

1. Complete the exercise
2. Review code examples
3. Try bonus challenges
4. Read best practices
5. Move to Day 4!

**Happy Testing!** 🎉

