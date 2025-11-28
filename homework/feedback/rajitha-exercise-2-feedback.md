# 📝 Exercise 2 Feedback - Rajitha

**Exercise:** Day 2 - Exercise 2 (SauceDemo Login Testing)  
**Date:** 2025-11-19  
**Overall Grade:** 🎯 **B+ (85/100)**

---

## 🎉 Summary

Good work, Rajitha! You've completed all **19 tests** (exceeding the 16 required) with proper configuration and organization. Your code demonstrates understanding of Playwright fundamentals and test structure.

**Strengths:**
- ✅ All 19 tests implemented (3 bonus tests!)
- ✅ Perfect configuration (baseURL, timeouts, npm scripts)
- ✅ Correct import syntax
- ✅ Good use of data-test attributes

**Issues Found:**
- ❌ **Critical:** Wrong username in visual_user test (line 79)
- ❌ **Critical:** Hardcoded URL in beforeEach (should use baseURL)
- ⚠️ Typo: "loging" → "login" (5 occurrences)
- ⚠️ Unnecessary `.click()` and `.press('Tab')` actions

---

## ❌ Critical Issues

### **Issue 1: Wrong Username in visual_user Test** 🔴

**Location:** `login.spec.ts:79`

**Problem:**
```typescript
test('verify loging with visual_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('error_user');
    //                                                  ↑
    //                                    Should be 'visual_user'!
```

**Fix:**
```typescript
test('verify login with visual_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('visual_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
});
```

**Impact:** Test doesn't verify what it claims to test (-5 points)

---

### **Issue 2: Hardcoded URL in beforeEach** 🔴

**Location:** `login.spec.ts:8`

**Problem:**
```typescript
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    //              ↑ Hardcoded URL
```

**Fix:**
```typescript
test.beforeEach(async ({ page }) => {
    await page.goto('/');  // Use baseURL from config
    await expect(page.locator('.login_logo')).toBeVisible();
});
```

**Why:** You configured `baseURL` in playwright.config.ts but didn't use it! (-3 points)

---

## ⚠️ Minor Issues

### **Issue 3: Typo - "loging" → "login"**

**Locations:** Lines 50, 59, 68, 77, 86

**Fix:** Change all test names from `'verify loging with...'` to `'verify login with...'`

**Impact:** -2 points

---

### **Issue 4: Unnecessary Actions**

**Problem:** Every test has unnecessary `.click()` and `.press('Tab')`:

```typescript
await page.locator('[data-test="username"]').click();  // Not needed
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="username"]').press('Tab');  // Not needed
```

**Better:**
```typescript
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();
```

**Why:** `.fill()` automatically clicks and focuses. `.press('Tab')` is unnecessary. (-5 points)

---

## 📊 Scoring

| Category | Score | Notes |
|----------|-------|-------|
| Configuration | 10/10 | ✅ Perfect |
| Test Coverage | 10/10 | ✅ 19 tests (3 bonus!) |
| Code Quality | 20/30 | ❌ Wrong username (-5), unnecessary actions (-5) |
| Best Practices | 15/20 | ❌ Hardcoded URL (-3), typos (-2) |
| Import Syntax | 10/10 | ✅ Correct |
| npm Scripts | 10/10 | ✅ Comprehensive |
| Organization | 10/10 | ✅ Good structure |
| **TOTAL** | **85/100** | **Grade: B+** |

---

## 🎯 Action Items

**Priority 1 (Must Fix):**
1. Change `'error_user'` to `'visual_user'` on line 79
2. Change `page.goto('https://www.saucedemo.com/')` to `page.goto('/')` on line 8
3. Fix typo: "loging" → "login" (5 places)

**Priority 2 (Recommended):**
4. Remove unnecessary `.click()` and `.press('Tab')` from all tests

**After fixes:** Expected score **95/100 (A)** 🌟

---

## 💡 Suggestions

1. **Simplify test code** - Remove unnecessary actions
2. **Use constants** - Define usernames as constants to avoid typos
3. **Add timeout for performance_glitch_user** - This user is slow (see Jayashan's example)

---

## 🚀 Next Steps

1. Fix the 2 critical issues
2. Run tests: `npm run test:saucedemo`
3. Verify all tests pass
4. Push to GitHub

**Great effort! Fix these issues and you'll have an excellent submission!** 💪

---

**Reviewed by:** Janesh Kodikara  
**Status:** ✅ Approved with revisions required

