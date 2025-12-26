# Day 4 Exercise Feedback - Chamiya

**Repository:** https://github.com/Chamiya98/playwright-automation-Test  
**Date:** 2025-12-04

---

## ✅ Very Good Work!

This is a **well-organized submission** with excellent folder structure and creative additions like Faker.js integration.

---

## 🌟 Strengths

### 1. Excellent Project Structure ⭐⭐⭐⭐⭐
- Self-contained exercise folder with dedicated subfolders:
  - `pages/` - Page objects
  - `fixtures/` - Custom fixtures
  - `constants/` - Test data separation
- Clean separation of concerns

### 2. Test Data Management ⭐⭐⭐⭐⭐
- Excellent `testData.ts` with organized constants:
  - `USERS`, `ERROR_MESSAGES`, `EXPECTED_RESULTS`
  - `NEGATIVE_LOGIN_SCENARIOS` array for parameterized tests
- Great use of parameterized tests with `forEach`

### 3. Creative Use of Faker.js ⭐⭐⭐⭐⭐
- Excellent addition! Using `faker.person.firstName()`, `faker.location.zipCode()` for dynamic test data
- Shows initiative beyond the exercise requirements

### 4. Login Tests ⭐⭐⭐⭐⭐
- Comprehensive coverage:
  - Valid login ✓
  - Parameterized negative scenarios (4 cases) ✓
  - Error message dismissal ✓
  - Password masking verification ✓

### 5. Checkout Tests ⭐⭐⭐⭐
- Single product checkout ✓
- Multiple products (6 items) checkout ✓
- Add/remove products ✓
- Continue shopping navigation ✓

---

## 💡 Suggestions for Improvement

### 1. Add JSDoc Documentation
Page objects lack documentation. Add JSDoc comments:
```typescript
/**
 * Navigate to the login page
 */
async goto() { ... }
```

### 2. Missing `await` in `goto()` Method
```typescript
// Current (missing await)
expect(this.page).toHaveTitle("Swag Labs");

// Should be
await expect(this.page).toHaveTitle("Swag Labs");
```

### 3. Test Title Mismatch
In `checkout.spec.ts`, test name doesn't match content:
```typescript
// Current
test("should login with valid credentials.", async ({ ... }) => {
  // Actually tests single product checkout
```

### 4. Consider Separating Checkout Page Objects
`CartPage` combines cart, checkout info, and complete pages. Consider splitting into:
- `CartPage` - Cart operations only
- `CheckoutStepOnePage` - Customer info form
- `CheckoutCompletePage` - Order confirmation

### 5. Add Page Verification Methods
Consider adding methods like:
```typescript
async verifyCartPageLoaded() {
  await expect(this.page).toHaveURL(/\/cart\.html$/);
}
```

### 6. Use `test.beforeEach` Pattern Consistently
Good use in `checkout.spec.ts`, but consider using `authenticatedPage` fixture instead for cleaner setup.

---

## 📊 Summary

| Criteria | Score |
|----------|-------|
| Page Object Model | ⭐⭐⭐⭐ |
| Custom Fixtures | ⭐⭐⭐⭐ |
| Test Data Organization | ⭐⭐⭐⭐⭐ |
| Test Coverage | ⭐⭐⭐⭐ |
| Best Practices | ⭐⭐⭐⭐ |
| **Overall** | **Very Good** |

---

## 🎯 Action Items

1. ⚠️ Add `await` to the `expect` in `goto()` method
2. ✍️ Fix test title in checkout.spec.ts to match actual test content
3. 📝 Add JSDoc documentation to page object methods
4. 🔧 Consider splitting `CartPage` into separate checkout step pages

**Great job with the folder structure and Faker.js integration!** 🎉

