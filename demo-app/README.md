# 🎭 Playwright Training Demo App

A comprehensive, self-contained web application designed specifically for Playwright automation training. This single-page application contains multiple UI components and interactions to practice various testing scenarios.

## 🎯 Purpose

This demo app provides a stable, future-proof testing playground for learning:
- Locator strategies (ID, class, data-testid, ARIA roles)
- Form interactions (inputs, dropdowns, checkboxes, file uploads)
- Dynamic content handling (search, tables, pagination)
- Interactive components (modals, tooltips, tabs, accordions)
- Async behavior (delays, progress bars, mock API calls)
- Advanced elements (iframes, Shadow DOM, Canvas)
- Authentication flows

## 📁 Project Structure

```
demo-app/
├── index.html          # Main HTML file with all sections
├── css/
│   └── styles.css      # Complete styling
├── js/
│   └── scripts.js      # All JavaScript interactions
├── assets/             # (Optional) Icons and images
└── README.md           # This file
```

## 🚀 How to Run Locally

### Option 1: Direct File Opening
1. Clone or download this repository
2. Open `index.html` directly in your browser
3. All features work without a server!

### Option 2: Using a Local Server (Recommended)

**Using Python:**
```bash
cd demo-app
python -m http.server 8000
# Visit: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd demo-app
http-server -p 8000
# Visit: http://localhost:8000
```

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🌐 Deploy to GitHub Pages

1. **Create a GitHub repository**
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Playwright training demo app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/playwright-demo-app.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` → `/root` or `/demo-app`
   - Save

4. **Access your app:**
   - URL: `https://YOUR_USERNAME.github.io/playwright-demo-app/`

## 📚 Features & Components

### A. Basic Inputs
- Text input, textarea
- Placeholder, required, disabled, readonly fields
- Button interactions with different states

### B. Form Controls
- Dropdown select
- Radio buttons
- Checkboxes
- Toggle switch
- Date picker
- Range slider
- File upload

### C. Dynamic Data
- Search with auto-suggestions
- Sortable table (click headers to sort)
- Pagination (2 pages with 5 items each)

### D. Interactive Components
- Modal dialog
- Tooltip (hover to see)
- Toast notifications
- Tabs (3 tabs with different content)
- Accordion (expandable sections)
- Drag and drop (HTML5 native)

### E. Async Behavior
- Delayed content loading (2 seconds)
- Progress bar animation
- Button enabling after delay (3 seconds)
- Mock API success/error simulation

### F. Advanced Elements
- **iFrame:** Embedded content with interactive button
- **Shadow DOM:** Encapsulated component
- **Canvas:** Simple shapes drawn with Canvas API

### G. Authentication
- Mock login form
- Credentials: `demo` / `password123`
- Dashboard visible only after login
- Logout functionality

## 🧪 Example Playwright Tests

### Basic Test Setup

```typescript
import { test, expect } from '@playwright/test';

test.describe('Playwright Demo App Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
  });

  // Your tests here
});
```

### 1. Basic Input Test

```typescript
test('should interact with text input and button', async ({ page }) => {
  // Navigate to Basic Inputs section
  await page.click('text=Basic Inputs');
  
  // Fill text input
  await page.fill('[data-testid="text-input"]', 'Hello Playwright');
  
  // Click primary button
  await page.click('[data-testid="primary-button"]');
  
  // Verify result
  await expect(page.locator('[data-testid="basics-result"]'))
    .toContainText('Hello Playwright');
});
```

### 2. Form Controls Test

```typescript
test('should select dropdown option', async ({ page }) => {
  await page.click('text=Form Controls');
  
  // Select dropdown
  await page.selectOption('[data-testid="dropdown"]', 'option2');
  
  // Verify result
  await expect(page.locator('[data-testid="forms-result"]'))
    .toContainText('option2');
});

test('should check checkbox', async ({ page }) => {
  await page.click('text=Form Controls');

  // Check checkbox
  await page.check('[data-testid="checkbox-1"]');

  // Verify checked
  await expect(page.locator('[data-testid="checkbox-1"]')).toBeChecked();
});
```

### 3. File Upload Test

```typescript
test('should upload file', async ({ page }) => {
  await page.click('text=Form Controls');

  // Upload file
  const fileInput = page.locator('[data-testid="file-upload"]');
  await fileInput.setInputFiles({
    name: 'test.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Test file content')
  });

  // Verify file info displayed
  await expect(page.locator('.file-info')).toContainText('test.txt');
});
```

### 4. Search with Auto-suggest Test

```typescript
test('should show search suggestions', async ({ page }) => {
  await page.click('text=Dynamic Data');

  // Type in search
  await page.fill('[data-testid="search-input"]', 'play');

  // Wait for suggestions
  await page.waitForSelector('[data-testid="suggestions"].show');

  // Verify suggestions appear
  await expect(page.locator('[data-testid="suggestions"]')).toBeVisible();
  await expect(page.locator('[data-testid="suggestion-item"]').first())
    .toContainText('Playwright');
});
```

### 5. Table Sorting Test

```typescript
test('should sort table by column', async ({ page }) => {
  await page.click('text=Dynamic Data');

  // Click on Name header to sort
  await page.click('th[data-sort="name"]');

  // Get first row name
  const firstRowName = await page.locator('#table-body tr:first-child td:first-child').textContent();

  // Verify sorting (should be alphabetically first)
  expect(firstRowName).toBeTruthy();
});
```

### 6. Pagination Test

```typescript
test('should navigate between pages', async ({ page }) => {
  await page.click('text=Dynamic Data');

  // Verify on page 1
  await expect(page.locator('#page-info')).toContainText('Page 1 of 2');

  // Click next
  await page.click('#next-page');

  // Verify on page 2
  await expect(page.locator('#page-info')).toContainText('Page 2 of 2');

  // Verify next button disabled
  await expect(page.locator('#next-page')).toBeDisabled();
});
```

### 7. Modal Test

```typescript
test('should open and close modal', async ({ page }) => {
  await page.click('text=Interactive');

  // Open modal
  await page.click('[data-testid="open-modal"]');

  // Verify modal visible
  await expect(page.locator('[data-testid="modal"]')).toHaveClass(/show/);

  // Close modal
  await page.click('[data-testid="modal-close"]');

  // Verify modal hidden
  await expect(page.locator('[data-testid="modal"]')).not.toHaveClass(/show/);
});
```

### 8. Tabs Test

```typescript
test('should switch between tabs', async ({ page }) => {
  await page.click('text=Interactive');

  // Click Tab 2
  await page.click('button[data-tab="tab2"]');

  // Verify Tab 2 content visible
  await expect(page.locator('[data-testid="tab-2-content"]')).toBeVisible();

  // Verify Tab 1 content hidden
  await expect(page.locator('[data-testid="tab-1-content"]')).not.toBeVisible();
});
```

### 9. Accordion Test

```typescript
test('should expand accordion item', async ({ page }) => {
  await page.click('text=Interactive');

  // Click accordion header
  await page.click('[data-testid="accordion-1"]');

  // Verify accordion expanded
  const accordionItem = page.locator('[data-testid="accordion-1"]').locator('..');
  await expect(accordionItem).toHaveClass(/active/);
});
```

### 10. Drag and Drop Test

```typescript
test('should drag and drop item', async ({ page }) => {
  await page.click('text=Interactive');

  // Drag item to drop zone
  const dragItem = page.locator('[data-testid="drag-item-1"]');
  const dropZone = page.locator('[data-testid="drop-zone"]');

  await dragItem.dragTo(dropZone);

  // Verify item moved to drop zone
  await expect(dropZone.locator('[data-testid="drag-item-1"]')).toBeVisible();
});
```

### 11. Async Behavior - Delayed Content Test

```typescript
test('should wait for delayed content', async ({ page }) => {
  await page.click('text=Async Behavior');

  // Click button
  await page.click('[data-testid="delayed-content-btn"]');

  // Verify loading state
  await expect(page.locator('[data-testid="delayed-content"]'))
    .toContainText('Loading...');

  // Wait for content to load (2 seconds)
  await expect(page.locator('[data-testid="delayed-content"]'))
    .toContainText('Content loaded', { timeout: 3000 });
});
```

### 12. Progress Bar Test

```typescript
test('should show progress bar animation', async ({ page }) => {
  await page.click('text=Async Behavior');

  // Click progress button
  await page.click('[data-testid="progress-btn"]');

  // Wait for progress to complete
  await expect(page.locator('#progress-text'))
    .toContainText('100%', { timeout: 5000 });
});
```

### 13. Mock API Test

```typescript
test('should simulate API success', async ({ page }) => {
  await page.click('text=Async Behavior');

  // Click API success button
  await page.click('[data-testid="api-success"]');

  // Wait for success message
  await expect(page.locator('[data-testid="api-result"]'))
    .toContainText('API Success', { timeout: 2000 });
});

test('should simulate API error', async ({ page }) => {
  await page.click('text=Async Behavior');

  // Click API error button
  await page.click('[data-testid="api-error"]');

  // Wait for error message
  await expect(page.locator('[data-testid="api-result"]'))
    .toContainText('API Error', { timeout: 2000 });
});
```

### 14. iFrame Test

```typescript
test('should interact with iframe content', async ({ page }) => {
  await page.click('text=Advanced');

  // Get iframe
  const iframe = page.frameLocator('[data-testid="demo-iframe"]');

  // Click button inside iframe
  await iframe.locator('#iframe-btn').click();

  // Verify result inside iframe
  await expect(iframe.locator('#iframe-result'))
    .toContainText('Button inside iframe clicked!');
});
```

### 15. Shadow DOM Test

```typescript
test('should interact with Shadow DOM', async ({ page }) => {
  await page.click('text=Advanced');

  // Access Shadow DOM
  const shadowHost = page.locator('[data-testid="shadow-host"]');
  const shadowButton = shadowHost.locator('[data-testid="shadow-button"]');

  // Click shadow button
  await shadowButton.click();

  // Verify result
  const shadowResult = shadowHost.locator('#shadow-result');
  await expect(shadowResult).toContainText('Shadow DOM button clicked!');
});
```

### 16. Authentication Test

```typescript
test('should login successfully', async ({ page }) => {
  await page.click('text=Authentication');

  // Fill credentials
  await page.fill('[data-testid="username"]', 'demo');
  await page.fill('[data-testid="password"]', 'password123');

  // Click login
  await page.click('[data-testid="login-btn"]');

  // Verify dashboard visible
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

  // Verify user info
  await expect(page.locator('#user-info')).toContainText('demo');
});

test('should show error for invalid credentials', async ({ page }) => {
  await page.click('text=Authentication');

  // Fill wrong credentials
  await page.fill('[data-testid="username"]', 'wrong');
  await page.fill('[data-testid="password"]', 'wrong');

  // Click login
  await page.click('[data-testid="login-btn"]');

  // Verify error message
  await expect(page.locator('[data-testid="login-error"]'))
    .toContainText('Invalid username or password');
});
```

## 🎓 Learning Objectives

This demo app helps you practice:

1. **Locator Strategies:**
   - By ID: `#text-input`
   - By class: `.btn-primary`
   - By data-testid: `[data-testid="username"]`
   - By ARIA role: `page.getByRole('button', { name: 'Login' })`
   - By text: `page.locator('text=Login')`

2. **Form Interactions:**
   - Text input: `fill()`, `type()`
   - Dropdowns: `selectOption()`
   - Checkboxes/Radio: `check()`, `uncheck()`
   - File upload: `setInputFiles()`

3. **Assertions:**
   - Visibility: `toBeVisible()`, `toBeHidden()`
   - Text content: `toContainText()`, `toHaveText()`
   - State: `toBeChecked()`, `toBeDisabled()`, `toBeEnabled()`
   - URL: `toHaveURL()`

4. **Waiting Strategies:**
   - Auto-waiting for elements
   - Explicit waits: `waitForSelector()`
   - Timeout configuration
   - Network idle: `waitForLoadState()`

5. **Advanced Scenarios:**
   - iFrame handling: `frameLocator()`
   - Shadow DOM: Direct locator access
   - Drag and drop: `dragTo()`
   - Multiple tabs/windows

## 🛠️ Customization

Feel free to extend this app:
- Add more form fields
- Create additional sections
- Modify styling in `styles.css`
- Add new interactions in `scripts.js`
- Include more complex scenarios

## 📝 Notes

- **No Backend Required:** All functionality is client-side
- **No Dependencies:** Pure HTML, CSS, JavaScript
- **Offline Ready:** Works without internet
- **Mobile Responsive:** Adapts to different screen sizes
- **Browser Compatible:** Works in all modern browsers

## 🤝 Contributing

This is a training resource. Feel free to:
- Report issues
- Suggest improvements
- Add new test scenarios
- Share with your team

## 📄 License

Free to use for educational and training purposes.

---

**Happy Testing with Playwright! 🎭**

For questions or feedback, please open an issue in the repository.


