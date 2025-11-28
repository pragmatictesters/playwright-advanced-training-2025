# 📝 Homework Feedback: Jayashan (Chamiya98)

**Repository:** [playwright-automation-Test](https://github.com/Chamiya98/playwright-automation-Test/tree/main/tests/saucedemo_ex_3)  
**Exercise:** Day 3 - SauceDemo Shopping Cart Tests  
**Review Date:** 28 November 2025  
**Reviewer:** Janesh Kodikara - Pragmatic Test Labs

---

## 📊 Overall Assessment

| Criteria | Rating | Comments |
|----------|--------|----------|
| **Folder Structure** | ⭐⭐⭐⭐⭐ | Excellent `auth/` and `shopping/` separation |
| **Test Coverage** | ⭐⭐⭐⭐⭐ | 13 tests - positive & negative scenarios |
| **Helper Functions** | ⭐⭐⭐⭐⭐ | Great reusable login functions |
| **Naming Conventions** | ⭐⭐⭐⭐ | Good, minor improvements possible |
| **Locator Strategy** | ⭐⭐⭐⭐ | Good use of `data-test` attributes |
| **Best Practices** | ⭐⭐⭐⭐ | Solid structure, few minor issues |
| **Creativity** | ⭐⭐⭐⭐⭐ | Multiple selector strategies, `test.fixme()` |

### **Overall Grade: A- (Excellent Work!)** 🎉

---

## ✅ What You Did Well

### 1. Excellent Folder Structure
```
tests/saucedemo_ex_3/
├── auth/
│   └── login.spec.ts      ← Reusable login helpers
└── shopping/
    └── cart.spec.ts       ← Cart tests
```
Clean separation of concerns - this is professional-level organization!

### 2. Reusable Helper Functions
```typescript
export async function loginAsStandardUser(page: Page) { ... }
export async function loginAs(page: Page, username: string, password: string) { ... }
```
Two helper variants - one for standard user, one parameterized. Very smart approach!

### 3. Good Test Organization
```typescript
test.describe("Shopping Cart - Valid Scenarios", () => { ... });
test.describe("Shopping Cart - Negative Scenarios", () => { ... });
```
Clear separation of positive and negative test cases.

### 4. Multiple Locator Strategies Demonstrated
```typescript
// data-test attribute
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

// ID selector
await page.locator("#add-to-cart-sauce-labs-backpack").click();

// XPath selector
await page.locator('xpath=//button[@name="add-to-cart-sauce-labs-bike-light"]').click();

// CSS selector
await page.locator('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
```
Shows excellent understanding of various selector strategies!

### 5. Professional Use of `test.fixme()`
```typescript
test.fixme(true, "BUG-123: Checkout button should be disabled for empty cart");
```
Documenting known bugs with proper annotation - this is real-world practice!

### 6. Good Negative Test Scenarios
- Cart without login
- Problem user test (image verification)
- Invalid element access
- Empty cart checkout attempt

Shows critical thinking about edge cases!

---

## 🔧 Suggestions for Improvement

### 1. File Naming Convention ⚠️

**Current:** `login.spec.ts` exports helper functions but uses `.spec.ts` extension.

**Recommended:**
```
auth/
├── login.helpers.ts    ← Helper functions (rename)
└── login.spec.ts       ← Actual login tests (if any)
```

### 2. Add `test.beforeEach()` Hook ⚠️

**Current:** Login repeated in every test.

**Recommended:**
```typescript
test.describe("Shopping Cart - Valid Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("add single item to cart", async ({ page }) => {
    // Already logged in - cleaner!
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  });
});
```

### 3. Test Names - Use "should...when" Pattern

**Current:**
```typescript
test("add single item to cart", ...)
```

**Recommended:**
```typescript
test("should show cart badge with count 1 when adding single item", ...)
```

### 4. Bug Fix Required 🐛

**In "cart badge with zero items" test:**
```typescript
// ❌ Missing parentheses - NOT a valid assertion!
await expect(cartBadge).not.toBeVisible;

// ✅ Should be:
await expect(cartBadge).not.toBeVisible();
```

### 5. Missing Login in "empty cart checkout" Test

The test uses `test.fixme()` but also needs login before accessing cart.

---

## 📋 Action Items

| Priority | Task | Effort |
|----------|------|--------|
| 🔴 High | Fix `not.toBeVisible` → `not.toBeVisible()` | 1 min |
| 🔴 High | Add login to "empty cart checkout" test | 2 min |
| 🟡 Medium | Rename `login.spec.ts` → `login.helpers.ts` | 5 min |
| 🟡 Medium | Add `test.beforeEach()` for login | 10 min |
| 🟢 Low | Update test names to "should...when" pattern | 15 min |

---

## 🎓 Skills Demonstrated

| Concept | ✅ Demonstrated |
|---------|----------------|
| Test organization with `test.describe()` | ✅ |
| Code reusability (helper functions) | ✅ |
| Multiple locator strategies | ✅ |
| Positive/negative testing | ✅ |
| Test annotations (`test.fixme()`) | ✅ |
| Various assertions | ✅ |
| Page navigation patterns | ✅ |
| Configuration setup | ✅ |

---

## 🏆 Final Comments

Excellent work, Jayashan! Your homework demonstrates strong understanding of Playwright test automation fundamentals. The code organization, helper function pattern, and creative use of multiple locator strategies shows you're thinking like a professional automation engineer.

The few improvements suggested are minor refinements. Keep up the great work!

---

**Pragmatic Test Labs** | Playwright Advanced Training 2025

