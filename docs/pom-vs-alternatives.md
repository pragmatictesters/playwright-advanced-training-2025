# Page Object Model vs Modern Alternatives in Playwright

## 📚 Overview

This guide compares different approaches to organizing Playwright test code. Understanding these patterns helps you choose the right approach for your project.

---

## 🎯 The Four Approaches

### 1. **Traditional Page Object Model (POM)** 📄

**What:** Create classes representing pages with locators and methods.

**Example:**
```typescript
// login-page.ts
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
  }
  
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
}

// test file
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);  // Manual instantiation
  await loginPage.login('user', 'pass');
});
```

**Pros:**
- ✅ Centralized locators
- ✅ Reusable methods
- ✅ Easy to understand
- ✅ Industry standard

**Cons:**
- ❌ Manual object instantiation
- ❌ Boilerplate code
- ❌ Page-centric (not component-centric)

**When to Use:**
- Large applications with many pages
- Team familiar with POM pattern
- Long-term maintenance priority

---

### 2. **Fixtures + Page Objects** ⭐ (Recommended)

**What:** Combine POM with Playwright's fixtures for automatic dependency injection.

**Example:**
```typescript
// fixtures.ts
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

// test file
test('login', async ({ loginPage }) => {
  // No instantiation! Automatically available!
  await loginPage.login('user', 'pass');
});
```

**Pros:**
- ✅ All POM benefits
- ✅ No manual instantiation
- ✅ Cleaner test code
- ✅ Automatic setup/teardown
- ✅ Type-safe

**Cons:**
- ❌ Requires understanding fixtures
- ❌ Slightly more setup initially

**When to Use:**
- **Best for beginners** learning Playwright
- Modern Playwright projects
- When you want clean, maintainable code

---

### 3. **Component Object Model (COM)** 🧩

**What:** Break pages into reusable components instead of full pages.

**Example:**
```typescript
// components/login-form.ts
class LoginForm {
  constructor(page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
  }
  
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
}

// components/navigation.ts
class Navigation {
  constructor(page) {
    this.logoutButton = page.locator('[data-test="logout"]');
  }
  
  async logout() {
    await this.logoutButton.click();
  }
}

// test file
test('login and logout', async ({ page }) => {
  const loginForm = new LoginForm(page);
  const nav = new Navigation(page);
  
  await loginForm.login('user', 'pass');
  await nav.logout();
});
```

**Pros:**
- ✅ More granular than POM
- ✅ Reuse components across pages
- ✅ Matches modern app architecture (React/Vue)
- ✅ Less duplication

**Cons:**
- ❌ More files to manage
- ❌ Requires careful component design
- ❌ Can be overkill for simple apps

**When to Use:**
- Modern component-based applications
- Shared components across pages (header, footer, modals)
- Large applications with complex UI

---

### 4. **App Actions Pattern** 🚀

**What:** Bypass UI for setup, use API/direct actions instead.

**Example:**
```typescript
// Without App Actions (slow)
test('view dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-test="username"]', 'user');
  await page.fill('[data-test="password"]', 'pass');
  await page.click('[data-test="login"]');  // UI login every test!
  await page.goto('/dashboard');
  // Test dashboard...
});

// With App Actions (fast)
test('view dashboard', async ({ page, request }) => {
  // Login via API, not UI
  const response = await request.post('/api/login', {
    data: { username: 'user', password: 'pass' }
  });
  const token = await response.json();
  
  // Set auth directly
  await page.context().addCookies([{
    name: 'auth_token',
    value: token.access_token,
    domain: 'example.com',
    path: '/'
  }]);
  
  // Now test the actual feature
  await page.goto('/dashboard');
  // Test dashboard...
});
```

**Pros:**
- ✅ Much faster tests
- ✅ More reliable (less UI flakiness)
- ✅ Focus on testing, not setup
- ✅ Reduces test execution time

**Cons:**
- ❌ Requires API access
- ❌ More complex setup
- ❌ Not suitable for all scenarios

**When to Use:**
- Testing features that require authentication
- When test speed is critical
- When you have API access
- Advanced testing scenarios

---

## 📊 Comparison Table

| Aspect | Traditional POM | Fixtures + POM | Component Model | App Actions |
|--------|----------------|----------------|-----------------|-------------|
| **Beginner-Friendly** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Code Reusability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Test Speed** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Maintainability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Setup Complexity** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Boilerplate Code** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎓 Recommendations

### For Beginners (Day 3)
**Use: Fixtures + Page Objects** ⭐

**Why:**
- Easy to learn and understand
- Clean, readable code
- Industry-standard approach
- Best balance of simplicity and power

### For Advanced Users
**Use: Combination of all patterns**

**Strategy:**
1. Use **Fixtures + POM** for most tests
2. Use **Component Model** for shared UI components
3. Use **App Actions** for authentication and setup
4. Use **Traditional POM** when fixtures aren't needed

---

## 💡 Best Practices

### 1. Start Simple, Add Complexity Gradually
```typescript
// Step 1: Start with basic POM
class LoginPage {
  constructor(page) { this.page = page; }
  async login(user, pass) { /* ... */ }
}

// Step 2: Add fixtures
export const test = base.extend({
  loginPage: async ({ page }, use) => await use(new LoginPage(page))
});

// Step 3: Add authenticated fixture
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Auto-login
    await use(page);
  }
});
```

### 2. Combine Patterns When Needed
```typescript
// Use POM for pages
class DashboardPage { /* ... */ }

// Use components for shared UI
class HeaderComponent { /* ... */ }

// Use app actions for setup
test.use({
  storageState: 'authenticated.json'  // Skip login UI
});
```

### 3. Choose Based on Context
- **Testing login?** → Use POM
- **Testing features after login?** → Use App Actions + POM
- **Testing shared components?** → Use Component Model
- **Need clean code?** → Use Fixtures

---

## 🚀 Next Steps

1. **Learn POM basics** - Understand the foundation
2. **Add fixtures** - Make code cleaner
3. **Explore components** - For complex UIs
4. **Try app actions** - For faster tests

**Remember:** There's no "one size fits all" - choose the right tool for the job!

