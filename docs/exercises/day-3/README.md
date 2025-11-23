# Day 3: AI-Powered Testing & Shopping Cart

## 📚 Overview

Day 3 focuses on **AI-assisted development** with GitHub Copilot, mastering **CSS & XPath selectors**, and building **shopping cart tests** for SauceDemo. You'll learn to use modern AI tools, refactor code effectively, and write comprehensive test scenarios.

---

## 🎯 Learning Goals

By the end of Day 3, you will:
- ✅ Use GitHub Copilot for code generation and completion
- ✅ Use GitHub Copilot Chat for debugging and explanations
- ✅ Master CSS and XPath selectors
- ✅ Extract variables and refactor code
- ✅ Group tests with `test.describe()`
- ✅ Reuse login functionality effectively
- ✅ Use Playwright VS Code extension for recording
- ✅ Use DevTools Accessibility panel for locators
- ✅ Write positive and negative test scenarios

---

## 📖 Materials

### 📝 Exercises
- **[Exercise 1: Shopping Cart Testing](./exercise-1-shopping-cart.md)** - Main hands-on exercise (NEW!)
- **[Exercise 3: Page Object Model & Fixtures](./exercise-3-page-objects.md)** - Advanced patterns (Day 4)

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
| GitHub Copilot Setup & Demo | 30 min |
| CSS & XPath Selectors | 30 min |
| DevTools Accessibility Panel | 20 min |
| Shopping Cart Tests (Valid) | 60 min |
| Shopping Cart Tests (Negative) | 30 min |
| Refactoring & Variables | 20 min |
| **Total** | **~3 hours** |

---

## 🗺️ Learning Path

```
Day 2: Login Tests
         ↓
Day 3: AI-Powered Shopping Cart
         ↓
    Part 1: AI Tools Setup
    (Copilot, Copilot Chat)
         ↓
    Part 2: Locator Strategies
    (CSS, XPath, Accessibility)
         ↓
    Part 3: Shopping Cart Tests
    (Add, Remove, View Cart)
         ↓
    Part 4: Refactoring
    (Variables, Reusability)
         ↓
Day 4: Page Object Model
```

---

## 🎓 Key Concepts

### 1. GitHub Copilot
**What:** AI pair programmer that suggests code as you type

**Benefits:**
- Faster code writing
- Learn new patterns
- Reduce boilerplate
- Fix errors quickly

**Example:**
```typescript
// Type a comment and Copilot suggests code:
// Add sauce labs backpack to cart
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
```

---

### 2. CSS vs XPath Selectors

| Feature | CSS | XPath |
|---------|-----|-------|
| **Readability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Parent Selection** | ❌ | ✅ |
| **Text Content** | Limited | ✅ |
| **Browser Support** | ✅ | ✅ |

**CSS Example:**
```typescript
page.locator('[data-test="username"]')
page.locator('.inventory_item_name')
```

**XPath Example:**
```typescript
page.locator('xpath=//button[@data-test="login-button"]')
page.locator('xpath=//div[contains(text(), "Backpack")]')
```

---

### 3. DevTools Accessibility Panel
**What:** Browser tool showing element roles, names, and properties

**Benefits:**
- Find reliable locators
- Use semantic selectors
- Better accessibility
- More stable tests

**Example:**
```typescript
// From Accessibility panel: role="button", name="Add to cart"
await page.getByRole('button', { name: 'Add to cart' });
```

---

### 4. Test Organization with describe()

**Without describe:**
```typescript
test('add item', async ({ page }) => { });
test('remove item', async ({ page }) => { });
```

**With describe:**
```typescript
test.describe('Shopping Cart - Valid Scenarios', () => {
  test('add item', async ({ page }) => { });
  test('remove item', async ({ page }) => { });
});
```

**Benefits:** Better organization, shared setup, clearer reports

---

## 📊 Before & After

### Before (Repetitive Code):
```typescript
test('add item', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});
```

### After (With Variables):
```typescript
test('add item', async ({ page }) => {
  // Extract variables for readability
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartBadge = page.locator('.shopping_cart_badge');
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

  await addButton.click();
  await expect(cartBadge).toHaveText('1');
  await expect(removeButton).toBeVisible();
});
```

---

## ✅ Success Criteria

You've successfully completed Day 3 when you can:

- [ ] Use GitHub Copilot for code generation
- [ ] Use GitHub Copilot Chat for debugging
- [ ] Write CSS selectors confidently
- [ ] Write XPath selectors when needed
- [ ] Use DevTools Accessibility panel
- [ ] Extract variables for readability
- [ ] Group tests with `test.describe()`
- [ ] Reuse login functionality
- [ ] Write 13 shopping cart tests (8 valid + 5 negative)
- [ ] All tests pass

---

## 🚀 Getting Started

1. **Setup AI tools:** Install GitHub Copilot & Copilot Chat
2. **Read the exercise:** [Exercise 1: Shopping Cart Testing](./exercise-1-shopping-cart.md)
3. **Review Day 2 login tests** for reuse strategies
4. **Follow step-by-step instructions**
5. **Use Copilot to help write code**
6. **Run tests to verify**

---

## 💡 Tips for Success

1. **Use Copilot actively** - Let it suggest code, then review and modify
2. **Try different locators** - CSS, XPath, getByRole - see what works best
3. **Extract variables** - Makes code more readable and maintainable
4. **Use beforeEach** - Simplest way to reuse login for this exercise
5. **Record with VS Code** - Great way to learn locators
6. **Check Accessibility panel** - Most reliable locator source
7. **Ask Copilot Chat** - When stuck, ask for help!

---

## 🤝 Need Help?

**AI Tools:**
- GitHub Copilot - Inline suggestions as you type
- GitHub Copilot Chat - Ask questions, get explanations
- VS Code Extension - Record tests, pick locators

**Resources:**
- Exercise documentation with examples
- CSS Selectors reference
- XPath tutorial
- Playwright locators docs

**Common Issues:**
- Copilot not working → Check GitHub login
- Locator not found → Use DevTools to inspect
- Test timing out → Add explicit waits
- Login not reused → Check beforeEach placement

---

## 🎉 What's Next?

After completing Day 3:
- **Day 4:** Page Object Model pattern
- **Day 5:** API testing with Playwright
- **Day 6:** CI/CD integration

**You're making great progress!** 🚀

