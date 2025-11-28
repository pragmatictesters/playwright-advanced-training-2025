# 🔄 Code Refactoring Guide

> **A beginner-friendly guide to writing clean, maintainable test automation code**

---

## 🎯 What is Refactoring?

**Refactoring** is improving your code's structure **without changing what it does**.

> 🏠 **Analogy**: Like reorganizing a messy room - same items, better organization. Everything still works, but now it's easier to find what you need!

### The Golden Rule:
```
✅ Tests pass BEFORE refactoring
✅ Tests pass AFTER refactoring
```

---

## 💡 Why Refactor?

| Benefit | What It Means |
|---------|---------------|
| 📖 **Readability** | Code is easier to understand |
| 🐛 **Maintainability** | Bugs are easier to find and fix |
| ♻️ **Reusability** | Less copy-paste, more sharing |
| 🚀 **Scalability** | Adding new tests becomes easier |
| 👥 **Collaboration** | Team members can work together smoothly |

---

## ⏰ When to Refactor? (Spot the Code Smells 👃)

**Code smells** are signs your code needs cleaning. Check these warning signs:

| 🚨 Code Smell | 📝 Example |
|---------------|-----------|
| **Duplicate Code** | Same selector in 5 different tests |
| **Magic Strings** | `'button.submit-btn-primary'` everywhere |
| **Long Tests** | Single test with 50+ lines |
| **Unclear Names** | `test('test1', ...)` |
| **Hardcoded Values** | `await page.goto('http://localhost:3000')` |
| **Deep Nesting** | Multiple nested if/for blocks |

---

## 🔧 What to Refactor in Playwright Tests?

| Problem | Solution |
|---------|----------|
| Duplicate selectors | → **Page Objects** or constants |
| Repeated setup | → **`beforeEach`** hooks |
| Magic strings/numbers | → **Named constants** |
| Long test files | → **Split into focused files** |
| Hardcoded URLs | → **Environment config** |
| Complex assertions | → **Custom matchers** or helpers |

---

## 🛠️ Refactoring Techniques

### 1️⃣ Extract Variable (Name Your Magic Values)

**❌ Before:**
```typescript
// What does this selector mean?
await page.locator('input[data-testid="text-input"]').fill('John');
await page.locator('input[data-testid="text-input"]').clear();
```

**✅ After:**
```typescript
// Clear intent - this is the username field
const usernameInput = page.getByTestId('text-input');
await usernameInput.fill('John');
await usernameInput.clear();
```

---

### 2️⃣ Extract Function (Reuse Repeated Logic)

**❌ Before:**
```typescript
test('login admin', async ({ page }) => {
  await page.goto('https://demo-app/');
  await page.getByTestId('username').fill('admin');
  await page.getByTestId('password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('login user', async ({ page }) => {
  await page.goto('https://demo-app/');
  await page.getByTestId('username').fill('user');
  await page.getByTestId('password').fill('user123');
  await page.getByRole('button', { name: 'Login' }).click();
});
```

**✅ After:**
```typescript
// Reusable login helper
async function login(page: Page, username: string, password: string) {
  await page.goto('https://demo-app/');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test('login admin', async ({ page }) => {
  await login(page, 'admin', 'admin123');
});

test('login user', async ({ page }) => {
  await login(page, 'user', 'user123');
});
```

---

### 3️⃣ Extract Constants (Remove Magic Values)

**❌ Before:**
```typescript
await page.goto('https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/');
await page.waitForTimeout(3000);  // What's 3000?
```

**✅ After:**
```typescript
const BASE_URL = 'https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/';
const ANIMATION_DELAY = 3000;  // Wait for CSS animation to complete

await page.goto(BASE_URL);
await page.waitForTimeout(ANIMATION_DELAY);
```

---

### 4️⃣ Use Descriptive Test Names

**❌ Before:**
```typescript
test('test1', async ({ page }) => { ... });
test('button test', async ({ page }) => { ... });
test('form', async ({ page }) => { ... });
```

**✅ After:**
```typescript
test('should display error when submitting empty form', async ({ page }) => { ... });
test('should enable submit button after filling required fields', async ({ page }) => { ... });
test('should redirect to dashboard after successful login', async ({ page }) => { ... });
```

---

### 5️⃣ Extract to Page Object (Group Related Selectors)

**❌ Before:** Selectors scattered across tests
```typescript
// test-1.spec.ts
await page.getByTestId('text-input').fill('value');
await page.getByTestId('primary-button').click();

// test-2.spec.ts  
await page.getByTestId('text-input').clear();
await page.getByTestId('primary-button').click();
```

**✅ After:** Centralized in Page Object
```typescript
// pages/BasicInputsPage.ts
export class BasicInputsPage {
  constructor(private page: Page) {}
  
  // Selectors in one place
  readonly textInput = this.page.getByTestId('text-input');
  readonly primaryButton = this.page.getByTestId('primary-button');
  
  // Actions as methods
  async fillText(value: string) {
    await this.textInput.fill(value);
  }

  async submit() {
    await this.primaryButton.click();
  }
}
```

---

### 6️⃣ Use beforeEach for Common Setup

**❌ Before:**
```typescript
test('fill form', async ({ page }) => {
  await page.goto('https://demo-app/');
  await page.getByTestId('text-input').fill('test');
});

test('submit form', async ({ page }) => {
  await page.goto('https://demo-app/');
  await page.getByTestId('primary-button').click();
});
```

**✅ After:**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://demo-app/');
});

test('fill form', async ({ page }) => {
  await page.getByTestId('text-input').fill('test');
});

test('submit form', async ({ page }) => {
  await page.getByTestId('primary-button').click();
});
```

---

## ⚡ VS Code Refactoring Tools

### Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| **Rename Symbol** | `F2` | `F2` |
| **Quick Fix / Refactor** | `⌘ + .` | `Ctrl + .` |
| **Extract to Function** | `⌘ + .` → Select | `Ctrl + .` → Select |
| **Format Document** | `⇧ + ⌥ + F` | `Shift + Alt + F` |
| **Go to Definition** | `F12` | `F12` |
| **Find All References** | `⇧ + F12` | `Shift + F12` |
| **Organize Imports** | `⇧ + ⌥ + O` | `Shift + Alt + O` |

### Using the Refactor Menu

1. **Select the code** you want to refactor
2. **Right-click** → Choose "Refactor..."
3. Or press `⌘ + .` (Mac) / `Ctrl + .` (Windows)

**Available options in the menu:**

```
┌─────────────────────────────────┐
│ 💡 Quick Fix...                 │
├─────────────────────────────────┤
│ 📦 Extract to constant          │  ← For magic values
│ 📝 Extract to function          │  ← For repeated code
│ 🔄 Extract to method            │  ← For class methods
│ ✏️  Rename Symbol               │  ← Change name everywhere
│ 📁 Move to new file            │  ← Organize code
│ 🔀 Convert to arrow function    │  ← Modern syntax
└─────────────────────────────────┘
```

### Recommended VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| 🎭 **Playwright Test for VS Code** | Run/debug tests, record new tests |
| 📝 **ESLint** | Catch code quality issues automatically |
| 🎨 **Prettier** | Auto-format code on save |
| 🔤 **Code Spell Checker** | Catch typos in variable names |

**Setup Prettier to format on save:**
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## ❌ Anti-Patterns (What NOT to Do)

### 🚫 Anti-Pattern 1: Over-Engineering

**Don't create abstractions for code used only once!**

```typescript
// ❌ BAD: Page Object for a single-use page
class SingleUseModalPage {
  readonly closeButton = this.page.getByRole('button', { name: 'Close' });
  async close() { await this.closeButton.click(); }
}

// ✅ GOOD: Direct code is fine for one-time use
await page.getByRole('button', { name: 'Close' }).click();
```

**Rule of thumb:** Refactor when you see the same code **3+ times**.

---

### 🚫 Anti-Pattern 2: Premature Abstraction

**Don't abstract before you understand the patterns!**

```typescript
// ❌ BAD: Creating a "universal" form filler before knowing all forms
async function fillAnyForm(page: Page, data: unknown) {
  // Overly complex, handles too many cases
}

// ✅ GOOD: Start specific, generalize later
async function fillLoginForm(page: Page, username: string, password: string) {
  // Simple and focused
}
```

**Write the code 3 times, then look for patterns to extract.**

---

### 🚫 Anti-Pattern 3: Hiding Important Details

**Don't hide information that helps understand the test!**

```typescript
// ❌ BAD: What credentials? What page?
await loginHelper.login();
await formHelper.fill();
await submitHelper.submit();

// ✅ GOOD: Clear what's happening
await loginPage.loginAs('admin', 'secret123');
await productPage.addToCart('iPhone 15');
await checkoutPage.completeOrder();
```

---

### 🚫 Anti-Pattern 4: God Objects

**Don't put everything in one massive Page Object!**

```typescript
// ❌ BAD: One class with 50 methods
class AppPage {
  async login() { }
  async logout() { }
  async addProduct() { }
  async checkout() { }
  async viewProfile() { }
  // ... 45 more methods
}

// ✅ GOOD: Separate concerns
class LoginPage { }
class ProductPage { }
class CheckoutPage { }
class ProfilePage { }
```

---

## 📋 Quick Reference Card

### Refactoring Checklist

- [ ] Is the same code repeated 3+ times? → **Extract function**
- [ ] Are there magic strings/numbers? → **Extract constant**
- [ ] Is the test name descriptive? → **Rename it**
- [ ] Is the test longer than 20 lines? → **Consider splitting**
- [ ] Are selectors duplicated? → **Use Page Object**
- [ ] Is setup code repeated? → **Use beforeEach**

### When to Stop Refactoring

| ✅ Good Signs | ❌ Warning Signs |
|---------------|-----------------|
| Tests still pass | Tests start failing |
| Code is clearer | Code is more complex |
| Less duplication | More files to manage |
| Easy to add tests | Hard to find things |

---

## 📚 Learn More

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Refactoring Guru](https://refactoring.guru/) - Visual catalog of patterns
- [Clean Code by Robert Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/) - Classic book

---

> 💡 **Remember**: Refactoring is a skill that improves with practice. Start small, keep tests passing, and gradually improve your codebase!
```

