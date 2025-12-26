# Day 3 Exercise Feedback - Deepika

**Repository:** https://github.com/DeepzD/SauceDemo_Playwright_Testing  
**Date:** 2025-12-09

---

## ✅ Good Work!

Solid submission demonstrating good understanding of Day 3 concepts: test organization, hooks, assertions, and test scenarios.

---

## 🌟 Strengths

### 1. Excellent Test Coverage ⭐⭐⭐⭐⭐
- **Shopping Cart Tests:** Comprehensive scenarios
  - Add single/multiple items ✓
  - Remove from inventory & cart page ✓
  - Cart persistence across pages ✓
  - Continue shopping flow ✓
  - "Add all items" with creative while loop! 👏

### 2. Good Use of Hooks ⭐⭐⭐⭐⭐
```typescript
test.beforeEach(async({page}) => {
    await page.goto(Base_URL);
    // Login steps...
});
```
- Proper use of `beforeEach` for test setup
- Avoids code duplication across tests

### 3. Test Organization ⭐⭐⭐⭐
- Tests grouped with `test.describe()`:
  - `Shopping Cart - Valid Scenarios`
  - `Shopping Cart - Negative Scenarios`
- Separate files for Login (Valid/Invalid)

### 4. Good Assertion Variety ⭐⭐⭐⭐
- `toBeVisible()` - element presence
- `toContainText()` - text content
- `toHaveCount()` - element count
- `toHaveURL()` with regex - URL matching
- `not.toBeVisible()` - negative assertions

### 5. Constants Usage ⭐⭐⭐⭐
```typescript
const Base_URL = 'https://www.saucedemo.com/';
const UserName = 'standard_user';
const Password = 'secret_sauce';
```
Good practice extracting values to constants!

---

## 📝 Suggestions for Improvement

### 1. **Complete Empty Test Stubs**
Several tests are empty - complete or remove them:
```typescript
test('Invalid cart URL', async({page}) => {
  // Empty - needs implementation
});
test('Problem user - broken images', async({page}) => {
  // Empty - needs implementation
});
test('Cart badge with zero items', async({page}) => {
  // Empty - needs implementation
});
```

### 2. **Remove Unused Import**
```typescript
import { error } from 'console'; // Not used - remove this
```

### 3. **Avoid `waitForTimeout`**
```typescript
// Current
await page.waitForTimeout(100);

// Better - wait for specific condition
await expect(addCartButton).toHaveCount(count - 1);
```

### 4. **Use Consistent Naming Convention**
```typescript
// Current (mixed)
const Base_URL = '...';   // Snake_Case
const UserName = '...';   // PascalCase

// Recommended (camelCase for variables)
const baseUrl = '...';
const userName = '...';
```

### 5. **Add Assertions to Valid Login Tests**
Login tests perform actions but don't verify success:
```typescript
// Current - no assertion after login
await page.locator('[data-test="login-button"]').click();
await page.getByRole('button', { name: 'Open Menu' }).click();

// Better - add assertion
await page.locator('[data-test="login-button"]').click();
await expect(page).toHaveURL(/inventory/);  // Verify redirect
await expect(page.locator('[data-test="title"]')).toContainText('Products');
```

### 6. **Remove Unnecessary `.click()` Before `.fill()`**
```typescript
// Current
await page.locator('[data-test="username"]').click();
await page.locator('[data-test="username"]').fill('standard_user');

// Simplified - fill() auto-focuses
await page.locator('[data-test="username"]').fill('standard_user');
```

---

## 📊 Summary

| Criteria | Score |
|----------|-------|
| Test Coverage | ⭐⭐⭐⭐⭐ |
| Use of Hooks | ⭐⭐⭐⭐⭐ |
| Test Organization | ⭐⭐⭐⭐ |
| Assertions | ⭐⭐⭐⭐ |
| Code Quality | ⭐⭐⭐ |
| **Overall** | **Good** |

---

## 🎯 Action Items

1. ✅ Complete or remove empty test stubs
2. 🗑️ Remove unused `import { error }` statement
3. ⏱️ Replace `waitForTimeout` with explicit waits
4. 📝 Use consistent camelCase naming
5. ✅ Add assertions to valid login tests

**Good job Deepika! Strong test coverage and good use of hooks.** 🎉

