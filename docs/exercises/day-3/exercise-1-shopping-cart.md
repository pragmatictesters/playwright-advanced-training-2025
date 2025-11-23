# Day 3 - Exercise 1: SauceDemo Shopping Cart

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 2-3 hours](https://img.shields.io/badge/Time-2--3%20hours-blue)

## 🎯 Learning Objectives

By completing this exercise, you will:
- ✅ Use GitHub Copilot for code generation and completion
- ✅ Use GitHub Copilot Chat for debugging and explanations
- ✅ Master CSS and XPath selectors
- ✅ Extract variables for better code readability
- ✅ Refactor existing code using VS Code features
- ✅ Use `test.describe()` for grouping tests
- ✅ Reuse login functionality effectively
- ✅ Use Playwright VS Code extension for recording
- ✅ Use DevTools Accessibility panel for locators
- ✅ Write positive and negative test scenarios

---

## 📋 Prerequisites

- ✅ Completed Day 2 Exercise 2 (Login Tests)
- ✅ GitHub Copilot and Copilot Chat installed
- ✅ Playwright VS Code extension installed
- ✅ Understanding of CSS selectors
- ✅ Basic XPath knowledge

---

## 🌐 Application Under Test

**Application**: SauceDemo (Swag Labs)  
**URL**: https://www.saucedemo.com  
**Test User**: `standard_user` / `secret_sauce`

### Shopping Flow:
1. Login → 2. Browse Products → 3. Add to Cart → 4. View Cart → 5. Checkout

---

## 🛠️ Tools & Techniques to Use

### **1. GitHub Copilot**
- Let Copilot suggest test code
- Use inline suggestions for locators
- Accept/reject suggestions with `Tab` / `Esc`

### **2. GitHub Copilot Chat**
- Ask: "How do I add an item to cart in Playwright?"
- Ask: "Explain this CSS selector"
- Ask: "Fix this failing test"

### **3. VS Code Playwright Extension**
- Click "Record new" to generate test code
- Use "Pick locator" to find elements
- Run tests with "Show browser" option

### **4. DevTools Accessibility Panel**
- Open DevTools → Accessibility tab
- Find `role`, `name`, `description` for elements
- Use for `getByRole()` locators

### **5. CSS & XPath Selectors**
- Practice both CSS and XPath
- Compare which is more readable
- Use data-test attributes when available

---

## 📝 Test Cases to Implement

### **Part 1: Valid Shopping Cart Tests (8 tests)**

Use `test.describe('Shopping Cart - Valid Scenarios')` to group these tests:

1. ✅ **Add single item to cart**
   - Login as standard_user
   - Add "Sauce Labs Backpack" to cart
   - Verify cart badge shows "1"
   - Verify button changes to "Remove"

2. ✅ **Add multiple items to cart**
   - Login as standard_user
   - Add 3 different items
   - Verify cart badge shows "3"

3. ✅ **Remove item from inventory page**
   - Login and add item
   - Click "Remove" button
   - Verify cart badge disappears
   - Verify button changes back to "Add to cart"

4. ✅ **View cart with items**
   - Login and add 2 items
   - Click cart icon
   - Verify cart page shows 2 items
   - Verify item names are correct

5. ✅ **Remove item from cart page**
   - Login, add item, go to cart
   - Click "Remove" button in cart
   - Verify item is removed
   - Verify cart is empty

6. ✅ **Continue shopping from cart**
   - Login, add item, go to cart
   - Click "Continue Shopping"
   - Verify back on inventory page

7. ✅ **Cart persists across pages**
   - Login and add item
   - Navigate to different pages
   - Verify cart badge still shows "1"

8. ✅ **Add all items to cart**
   - Login as standard_user
   - Add all 6 items
   - Verify cart badge shows "6"

---

### **Part 2: Negative Shopping Cart Tests (5 tests)**

Use `test.describe('Shopping Cart - Negative Scenarios')` to group these tests:

1. ❌ **Cart without login** (should redirect)
   - Try to access cart URL directly
   - Verify redirected to login page

2. ❌ **Empty cart checkout**
   - Login, go to cart (empty)
   - Verify "Checkout" button behavior
   - Verify appropriate message/state

3. ❌ **Invalid cart URL**
   - Login as standard_user
   - Try to access invalid cart item
   - Verify error handling

4. ❌ **Problem user - broken images**
   - Login as `problem_user`
   - Verify product images are broken
   - Document the issue

5. ❌ **Cart badge with zero items**
   - Login as standard_user
   - Verify cart badge is not visible
   - Add item, remove item
   - Verify badge disappears

---

## 📁 Project Structure

Organize your tests logically:

```
tests/
└── saucedemo/
    ├── auth/
    │   └── login.spec.ts          (from Day 2)
    └── shopping/
        └── cart.spec.ts            (new - create this!)
```

---

## 🔄 Reusing Login Functionality

You have **3 strategies** to reuse login from Day 2:

### **Strategy 1: Helper Function (Simplest)**

Create a helper function in the same file:

```typescript
import { test, expect, Page } from '@playwright/test';

// Helper function for login
async function loginAsStandardUser(page: Page) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('.title')).toContainText('Products');
}

test.describe('Shopping Cart - Valid Scenarios', () => {
  test('add single item to cart', async ({ page }) => {
    // Reuse login
    await loginAsStandardUser(page);

    // Your test code here
  });
});
```

**Pros:** Simple, easy to understand
**Cons:** Duplicated if used in multiple files

---

### **Strategy 2: Shared Helper File (Recommended for Beginners)**

Create `tests/helpers/auth-helpers.ts`:

```typescript
import { Page, expect } from '@playwright/test';

export async function loginAsStandardUser(page: Page) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('.title')).toContainText('Products');
}

export async function loginAs(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}
```

Use in your test:

```typescript
import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../helpers/auth-helpers';

test.describe('Shopping Cart - Valid Scenarios', () => {
  test('add single item to cart', async ({ page }) => {
    await loginAsStandardUser(page);
    // Your test code here
  });
});
```

**Pros:** Reusable across files, organized
**Cons:** Need to manage imports

---

### **Strategy 3: beforeEach Hook (For Related Tests)**

Use `beforeEach` when all tests in a describe block need login:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Shopping Cart - Valid Scenarios', () => {
  // This runs before EACH test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('add single item to cart', async ({ page }) => {
    // Already logged in!
    // Your test code here
  });

  test('add multiple items', async ({ page }) => {
    // Already logged in!
    // Your test code here
  });
});
```

**Pros:** Clean test code, automatic setup
**Cons:** Runs for every test (slower)

---

**💡 Recommendation:** Start with **Strategy 3 (beforeEach)** for this exercise since all tests need login!

---

## 🎨 Using CSS Selectors

### **Common CSS Patterns:**

```typescript
// 1. By data-test attribute (BEST - most reliable)
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

// 2. By class
await page.locator('.inventory_item_name').first().click();

// 3. By ID
await page.locator('#shopping_cart_container').click();

// 4. By text content
await page.locator('text=Sauce Labs Backpack').click();

// 5. Combining selectors
await page.locator('.inventory_item').filter({ hasText: 'Backpack' }).click();

// 6. Parent > Child
await page.locator('.inventory_item > .inventory_item_name').first().click();
```

---

## 🛤️ Using XPath Selectors

### **Common XPath Patterns:**

```typescript
// 1. By text content
await page.locator('xpath=//div[text()="Sauce Labs Backpack"]').click();

// 2. By attribute
await page.locator('xpath=//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();

// 3. Contains text
await page.locator('xpath=//div[contains(text(), "Backpack")]').click();

// 4. Parent/Child relationship
await page.locator('xpath=//div[@class="inventory_item"]//button').first().click();

// 5. Following sibling
await page.locator('xpath=//div[@class="inventory_item_name"]//following-sibling::button').click();
```

**💡 Tip:** CSS is usually more readable, but XPath is powerful for complex relationships!

---

## 🔧 Using DevTools Accessibility Panel

### **Step-by-Step:**

1. **Open SauceDemo** in Chrome/Edge
2. **Login** as standard_user
3. **Open DevTools** (F12 or Right-click → Inspect)
4. **Click "Accessibility" tab** (may need to enable in settings)
5. **Click the element picker** (arrow icon)
6. **Hover over "Add to cart" button**
7. **See the accessibility properties:**
   - **Role:** `button`
   - **Name:** `Add to cart`
   - **Description:** (if any)

### **Use in Playwright:**

```typescript
// Using role and name from Accessibility panel
await page.getByRole('button', { name: 'Add to cart sauce-labs-backpack' }).click();

// Or simpler
await page.getByRole('button', { name: /add to cart/i }).first().click();
```

**💡 This is the MOST RELIABLE way to find locators!**

---

## 📹 Using Playwright VS Code Extension

### **Recording Tests:**

1. **Open Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. **Type:** "Playwright: Record new"
3. **Select browser**
4. **Perform actions** in the browser
5. **Code is generated automatically!**

### **Pick Locator:**

1. **Open Command Palette**
2. **Type:** "Playwright: Pick locator"
3. **Click element** in browser
4. **Locator is copied** to clipboard!

### **Run Tests:**

1. **Click the green play button** next to test
2. **Select "Show browser"** to see execution
3. **Debug with breakpoints** if needed

---

## 🔨 Extracting Variables & Refactoring

### **Before (Repetitive):**

```typescript
test('add item to cart', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});
```

### **After (With Variables):**

```typescript
test('add item to cart', async ({ page }) => {
  // Extract locators as variables
  const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartBadge = page.locator('.shopping_cart_badge');
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

  // Use variables
  await addToCartButton.click();
  await expect(cartBadge).toHaveText('1');
  await expect(removeButton).toBeVisible();
});
```

### **VS Code Refactoring:**

1. **Select the locator string**
2. **Right-click → "Extract to constant"** (or `Ctrl+Shift+R`)
3. **VS Code creates the variable automatically!**

**💡 Use GitHub Copilot to suggest variable names!**

---

## 💻 Implementation Guide

### **Step 1: Create the Test File**

Create `tests/saucedemo/shopping/cart.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Shopping Cart - Valid Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('should add single item to cart', async ({ page }) => {
    // TODO: Implement this test
    // Hint: Use GitHub Copilot to help!
  });

  // Add more tests here...
});

test.describe('Shopping Cart - Negative Scenarios', () => {

  test('should redirect to login when accessing cart without authentication', async ({ page }) => {
    // TODO: Implement this test
  });

  // Add more negative tests here...
});
```

---

### **Step 2: Example Test Implementation**

Here's a complete example for the first test:

```typescript
test('should add single item to cart', async ({ page }) => {
  // Extract locators as variables for better readability
  const backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartBadge = page.locator('.shopping_cart_badge');
  const backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

  // Add item to cart
  await backpackAddButton.click();

  // Verify cart badge shows 1
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');

  // Verify button changed to "Remove"
  await expect(backpackRemoveButton).toBeVisible();
  await expect(backpackAddButton).not.toBeVisible();
});
```

---

### **Step 3: Using Different Locator Strategies**

Try implementing the same test with different locators:

**Option 1: CSS Selectors**
```typescript
const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
```

**Option 2: XPath**
```typescript
const addButton = page.locator('xpath=//button[@data-test="add-to-cart-sauce-labs-backpack"]');
```

**Option 3: getByRole (Recommended)**
```typescript
const addButton = page.getByRole('button', { name: 'Add to cart sauce-labs-backpack' });
```

**Option 4: Text Content**
```typescript
const addButton = page.locator('button:has-text("Add to cart")').first();
```

**💡 Try all 4 and see which you prefer!**

---

### **Step 4: Add Multiple Items Example**

```typescript
test('should add multiple items to cart', async ({ page }) => {
  // Define product names
  const products = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt'
  ];

  // Add each product to cart
  for (const product of products) {
    await page.locator(`[data-test="add-to-cart-${product}"]`).click();
  }

  // Verify cart badge shows correct count
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('3');
});
```

**💡 Ask GitHub Copilot:** "How can I make this code more efficient?"

---

### **Step 5: Navigate to Cart Example**

```typescript
test('should view cart with items', async ({ page }) => {
  // Add 2 items
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Click cart icon
  await page.locator('.shopping_cart_link').click();

  // Verify on cart page
  await expect(page).toHaveURL(/.*cart\.html/);

  // Verify 2 items in cart
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);

  // Verify item names
  await expect(page.locator('.inventory_item_name')).toContainText(['Backpack', 'Bike Light']);
});
```

---

## 🤖 Using GitHub Copilot Effectively

### **Prompts to Try:**

1. **In a comment, type:**
   ```typescript
   // Add all 6 items to cart and verify badge shows 6
   ```
   Then press `Enter` and let Copilot suggest the code!

2. **Ask Copilot Chat:**
   - "How do I verify an element is not visible in Playwright?"
   - "What's the difference between .click() and .dblclick()?"
   - "How do I wait for navigation after clicking?"

3. **Fix errors with Copilot:**
   - Select the error
   - Ask: "Why is this test failing?"
   - Ask: "How do I fix this locator?"

---

## ✅ Verification Checklist

Before submitting, verify:

- [ ] All 13 tests implemented (8 valid + 5 negative)
- [ ] Tests grouped with `test.describe()`
- [ ] Login reused with `beforeEach` or helper function
- [ ] Variables extracted for readability
- [ ] Used at least 3 different locator strategies
- [ ] Tried GitHub Copilot for code generation
- [ ] Used Copilot Chat for debugging
- [ ] Recorded at least one test with VS Code extension
- [ ] Used DevTools Accessibility panel for locators
- [ ] All tests pass when run
- [ ] Code is clean and well-commented

---

## 🎯 Success Criteria

Your submission should demonstrate:

✅ **Functionality** - All tests pass
✅ **Organization** - Tests grouped logically
✅ **Reusability** - Login code reused effectively
✅ **Readability** - Variables extracted, good naming
✅ **Best Practices** - Multiple locator strategies
✅ **AI Usage** - Evidence of Copilot/Chat usage
✅ **Tool Mastery** - Used VS Code extension & DevTools

---

## 📚 Resources

- **Playwright Locators:** https://playwright.dev/docs/locators
- **CSS Selectors:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
- **XPath Tutorial:** https://www.w3schools.com/xml/xpath_intro.asp
- **GitHub Copilot Docs:** https://docs.github.com/en/copilot
- **Accessibility Testing:** https://playwright.dev/docs/accessibility-testing

---

## 🚀 Next Steps

After completing this exercise:

1. **Run all tests:** `npm run test:saucedemo`
2. **Generate report:** `npx playwright show-report`
3. **Review with instructor**
4. **Prepare for Day 4:** Page Object Model pattern!

---

**Good luck! Remember to use GitHub Copilot and ask questions!** 🎉


