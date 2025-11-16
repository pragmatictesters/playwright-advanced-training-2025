# Day 3: Page Object Model & Fixtures

## 📚 Overview

Day 3 focuses on organizing test code using **Page Object Model (POM)** and **Playwright Fixtures**. You'll learn how to create maintainable, reusable test code that's easy to understand and modify.

---

## 🎯 Learning Goals

By the end of Day 3, you will:
- ✅ Understand the benefits of Page Object Model
- ✅ Create page object classes with locators and methods
- ✅ Refactor existing tests to use page objects
- ✅ Use Playwright fixtures for cleaner code
- ✅ Compare different approaches (POM, Fixtures, Alternatives)
- ✅ Apply best practices for maintainable tests

---

## 📖 Materials

### 📝 Exercise
- **[Exercise 3: Page Object Model & Fixtures](./exercise-3-page-objects.md)** - Main hands-on exercise

### 📚 Reference Documentation
- **[POM vs Alternatives](../../pom-vs-alternatives.md)** - Comparison of different patterns
- **[POM Best Practices](../../pom-best-practices.md)** - Tips and common pitfalls

### 💻 Code Examples
- **Page Objects:**
  - `tests/pages/saucedemo/login-page.ts` - LoginPage class
  - `tests/pages/saucedemo/products-page.ts` - ProductsPage class

- **Fixtures:**
  - `tests/fixtures/saucedemo-fixtures.ts` - Custom fixtures

- **Test Files:**
  - `tests/saucedemo/pom/login-pom.spec.ts` - POM without fixtures
  - `tests/saucedemo/fixtures/login-fixtures.spec.ts` - POM with fixtures
  - `tests/saucedemo/fixtures/products-fixtures.spec.ts` - Authenticated fixture example

---

## ⏱️ Time Allocation

| Activity | Duration |
|----------|----------|
| Understanding POM | 30 min |
| Creating Page Objects | 45 min |
| Using Fixtures | 45 min |
| **Total** | **~2 hours** |

---

## 🗺️ Learning Path

```
Day 2: Configuration & Tests
         ↓
Day 3: Page Object Model
         ↓
    Part 1: Why POM?
    (Identify duplication)
         ↓
    Part 2: Create Page Objects
    (LoginPage, ProductsPage)
         ↓
    Part 3: Add Fixtures
    (Cleaner code)
         ↓
Day 4: Advanced Patterns
```

---

## 🎓 Key Concepts

### 1. Page Object Model (POM)
**What:** Design pattern that creates classes representing pages/components

**Benefits:**
- Centralized locators
- Reusable methods
- Easier maintenance
- Better organization

**Example:**
```typescript
class LoginPage {
  readonly usernameInput: Locator;
  
  async login(username: string, password: string) {
    // Login logic
  }
}
```

---

### 2. Playwright Fixtures
**What:** Dependency injection system for automatic setup/teardown

**Benefits:**
- No manual instantiation
- Cleaner test code
- Automatic lifecycle management
- Type-safe

**Example:**
```typescript
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

// In test
test('my test', async ({ loginPage }) => {
  // loginPage automatically available!
});
```

---

### 3. Comparison

| Approach | Code Complexity | Maintainability | Beginner-Friendly |
|----------|----------------|-----------------|-------------------|
| No POM | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| POM Only | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| POM + Fixtures | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Recommendation:** Use **POM + Fixtures** for best results! ⭐

---

## 📊 Before & After

### Before (Day 2 - No POM):
```typescript
test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  // Repeated in every test!
});
```

### After (Day 3 - POM + Fixtures):
```typescript
test('login', async ({ loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.verifyPageLoaded();
  // Clean, reusable, maintainable!
});
```

---

## ✅ Success Criteria

You've successfully completed Day 3 when you can:

- [ ] Explain why POM is useful
- [ ] Create a page object class with locators and methods
- [ ] Use page objects in tests
- [ ] Create custom fixtures
- [ ] Use fixtures in tests
- [ ] Compare POM vs Fixtures approaches
- [ ] Apply best practices

---

## 🚀 Getting Started

1. **Read the exercise:** [Exercise 3: Page Object Model & Fixtures](./exercise-3-page-objects.md)
2. **Review reference docs:** [POM vs Alternatives](../../pom-vs-alternatives.md)
3. **Follow step-by-step instructions**
4. **Run tests to verify**
5. **Try bonus challenges**

---

## 💡 Tips for Success

1. **Start simple** - Don't overcomplicate page objects
2. **Use TypeScript** - Type safety helps catch errors
3. **Follow naming conventions** - Consistency matters
4. **Keep methods focused** - Single responsibility principle
5. **Use fixtures** - Cleaner code, less boilerplate

---

## 🤝 Need Help?

**Resources:**
- Exercise documentation with step-by-step instructions
- Code examples in the repository
- Best practices guide
- Comparison guide

**Common Issues:**
- Import errors → Check file paths
- Tests failing → Verify selectors
- TypeScript errors → Check types

---

## 🎉 What's Next?

After completing Day 3:
- **Day 4:** Advanced patterns, API testing, component objects
- **Day 5:** CI/CD integration, reporting, performance

**Keep building your Playwright skills!** 🚀

