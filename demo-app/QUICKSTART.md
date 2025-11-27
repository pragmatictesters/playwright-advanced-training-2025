# 🚀 Quick Start Guide - Playwright Training Demo App

## For Trainers & Students

This guide will help you get started with the Playwright Training Demo App in under 5 minutes.

---

## ⚡ 5-Minute Setup

### Step 1: Get the Files
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/playwright-demo-app.git
cd playwright-demo-app/demo-app
```

### Step 2: Open the App
**Option A - Direct (Fastest):**
- Double-click `index.html`
- Works immediately in any browser!

**Option B - Local Server (Recommended for testing):**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Visit: http://localhost:8000
```

### Step 3: Explore the App
- Click through the 7 navigation tabs
- Try all interactive elements
- Note the `data-testid` attributes for testing

---

## 🎓 Training Session Structure

### Session 1: Basic Locators (30 mins)
**Focus:** Basic Inputs & Form Controls sections

**Topics:**
- Finding elements by ID, class, data-testid
- Text input interactions
- Button clicks
- Form field states (disabled, readonly)

**Practice Tests:**
```typescript
// Test 1: Basic input
await page.fill('[data-testid="text-input"]', 'Hello');
await page.click('[data-testid="primary-button"]');

// Test 2: Dropdown
await page.selectOption('[data-testid="dropdown"]', 'option2');

// Test 3: Checkbox
await page.check('[data-testid="checkbox-1"]');
```

---

### Session 2: Dynamic Content (45 mins)
**Focus:** Dynamic Data section

**Topics:**
- Search with auto-suggestions
- Table sorting
- Pagination
- Waiting for dynamic content

**Practice Tests:**
```typescript
// Test 1: Search suggestions
await page.fill('[data-testid="search-input"]', 'play');
await page.waitForSelector('[data-testid="suggestions"].show');

// Test 2: Table sorting
await page.click('th[data-sort="name"]');

// Test 3: Pagination
await page.click('#next-page');
await expect(page.locator('#page-info')).toContainText('Page 2');
```

---

### Session 3: Interactive Components (45 mins)
**Focus:** Interactive section

**Topics:**
- Modals and overlays
- Tabs and accordions
- Drag and drop
- Tooltips and toasts

**Practice Tests:**
```typescript
// Test 1: Modal
await page.click('[data-testid="open-modal"]');
await expect(page.locator('[data-testid="modal"]')).toBeVisible();

// Test 2: Tabs
await page.click('button[data-tab="tab2"]');
await expect(page.locator('[data-testid="tab-2-content"]')).toBeVisible();

// Test 3: Drag and drop
await page.locator('[data-testid="drag-item-1"]').dragTo(
  page.locator('[data-testid="drop-zone"]')
);
```

---

### Session 4: Async Behavior (30 mins)
**Focus:** Async Behavior section

**Topics:**
- Waiting strategies
- Timeouts
- Progress tracking
- Mock API calls

**Practice Tests:**
```typescript
// Test 1: Delayed content
await page.click('[data-testid="delayed-content-btn"]');
await expect(page.locator('[data-testid="delayed-content"]'))
  .toContainText('Content loaded', { timeout: 3000 });

// Test 2: Progress bar
await page.click('[data-testid="progress-btn"]');
await expect(page.locator('#progress-text'))
  .toContainText('100%', { timeout: 5000 });
```

---

### Session 5: Advanced Topics (60 mins)
**Focus:** Advanced section

**Topics:**
- iFrame handling
- Shadow DOM
- Canvas elements
- Authentication flows

**Practice Tests:**
```typescript
// Test 1: iFrame
const iframe = page.frameLocator('[data-testid="demo-iframe"]');
await iframe.locator('#iframe-btn').click();

// Test 2: Shadow DOM
const shadowButton = page.locator('[data-testid="shadow-host"]')
  .locator('[data-testid="shadow-button"]');
await shadowButton.click();

// Test 3: Authentication
await page.fill('[data-testid="username"]', 'demo');
await page.fill('[data-testid="password"]', 'password123');
await page.click('[data-testid="login-btn"]');
await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
```

---

## 📋 Cheat Sheet: All data-testid Attributes

### Basic Inputs
- `text-input`
- `textarea-input`
- `required-input`
- `disabled-input`
- `readonly-input`
- `primary-button`
- `basics-result`

### Form Controls
- `dropdown`
- `radio-1`, `radio-2`, `radio-3`
- `checkbox-1`, `checkbox-2`, `checkbox-3`
- `toggle-switch`
- `date-picker`
- `range-slider`
- `file-upload`
- `forms-result`

### Dynamic Data
- `search-input`
- `suggestions`
- `suggestion-item`
- `data-table`
- `pagination`

### Interactive
- `open-modal`
- `modal`
- `modal-close`
- `modal-confirm`
- `show-tooltip`
- `tooltip`
- `show-toast`
- `toast`
- `tab-1-content`, `tab-2-content`, `tab-3-content`
- `accordion-1`, `accordion-2`, `accordion-3`
- `drag-item-1`, `drag-item-2`, `drag-item-3`
- `drop-zone`

### Async Behavior
- `delayed-content-btn`
- `delayed-content`
- `progress-btn`
- `progress-bar`
- `enable-after-delay`
- `api-success`
- `api-error`
- `api-result`

### Advanced
- `demo-iframe`
- `shadow-host`
- `shadow-button`
- `demo-canvas`

### Authentication
- `login-form`
- `username`
- `password`
- `login-btn`
- `login-error`
- `dashboard`

---

## 🎯 Common Training Exercises

### Exercise 1: Complete Form Submission
Fill all form fields and verify results

### Exercise 2: Search and Filter
Search for items and verify suggestions appear

### Exercise 3: Table Manipulation
Sort table, navigate pages, verify data

### Exercise 4: Modal Workflow
Open modal, interact, close, verify state

### Exercise 5: Authentication Flow
Login, verify dashboard, logout, verify state

### Exercise 6: Async Handling
Test all delayed content and progress bars

### Exercise 7: Advanced Elements
Work with iframes, Shadow DOM, and Canvas

---

## 💡 Tips for Trainers

1. **Start Simple:** Begin with Basic Inputs section
2. **Build Gradually:** Progress through sections in order
3. **Live Coding:** Demonstrate tests while students follow
4. **Pair Programming:** Have students work in pairs
5. **Debugging Practice:** Intentionally break tests to practice debugging
6. **Best Practices:** Emphasize data-testid over fragile selectors
7. **Real Scenarios:** Relate examples to real-world applications

---

## 🐛 Troubleshooting

**App not loading?**
- Check browser console for errors
- Ensure all files are in correct folders
- Try a different browser

**Tests failing?**
- Verify correct URL (localhost:8000)
- Check for typos in selectors
- Increase timeout for async operations
- Use `--headed` mode to see what's happening

**Slow performance?**
- Close other browser tabs
- Disable browser extensions
- Use `--workers=1` for sequential execution

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Locator Strategies](https://playwright.dev/docs/locators)
- [Test Assertions](https://playwright.dev/docs/test-assertions)

---

**Ready to start testing? Open the app and begin your Playwright journey! 🎭**

