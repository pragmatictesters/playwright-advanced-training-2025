import { test, expect } from '@playwright/test';

/**
 * Playwright Training Demo App - Example Tests
 * 
 * These tests demonstrate various Playwright features using the demo app.
 * Use these as templates for your own tests!
 */

// Base URL configuration
const BASE_URL = 'http://localhost:8000';

test.describe('Playwright Demo App - Complete Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto(BASE_URL);
  });

  // ============================================
  // Section 1: Basic Inputs Tests
  // ============================================
  test.describe('Basic Inputs', () => {
    
    test('should fill text input and click button', async ({ page }) => {
      // Navigate to Basic Inputs section
      await page.click('text=Basic Inputs');
      
      // Fill text input
      await page.fill('[data-testid="text-input"]', 'Hello Playwright!');
      
      // Click primary button
      await page.click('[data-testid="primary-button"]');
      
      // Verify result contains the input text
      await expect(page.locator('[data-testid="basics-result"]'))
        .toContainText('Hello Playwright!');
    });

    test('should verify disabled and readonly fields', async ({ page }) => {
      await page.click('text=Basic Inputs');
      
      // Verify disabled field
      await expect(page.locator('[data-testid="disabled-input"]')).toBeDisabled();
      
      // Verify readonly field
      await expect(page.locator('[data-testid="readonly-input"]')).toHaveAttribute('readonly');
    });
  });

  // ============================================
  // Section 2: Form Controls Tests
  // ============================================
  test.describe('Form Controls', () => {
    
    test('should select dropdown option', async ({ page }) => {
      await page.click('text=Form Controls');
      
      // Select option from dropdown
      await page.selectOption('[data-testid="dropdown"]', 'option2');
      
      // Verify result
      await expect(page.locator('[data-testid="forms-result"]'))
        .toContainText('option2');
    });

    test('should select radio button', async ({ page }) => {
      await page.click('text=Form Controls');
      
      // Click radio button
      await page.check('[data-testid="radio-2"]');
      
      // Verify it's checked
      await expect(page.locator('[data-testid="radio-2"]')).toBeChecked();
      
      // Verify result
      await expect(page.locator('[data-testid="forms-result"]'))
        .toContainText('radio2');
    });

    test('should check multiple checkboxes', async ({ page }) => {
      await page.click('text=Form Controls');
      
      // Check multiple checkboxes
      await page.check('[data-testid="checkbox-1"]');
      await page.check('[data-testid="checkbox-2"]');
      
      // Verify both are checked
      await expect(page.locator('[data-testid="checkbox-1"]')).toBeChecked();
      await expect(page.locator('[data-testid="checkbox-2"]')).toBeChecked();
    });

    test('should toggle switch', async ({ page }) => {
      await page.click('text=Form Controls');
      
      // Toggle the switch
      await page.check('[data-testid="toggle-switch"]');
      
      // Verify status changed to ON
      await expect(page.locator('#toggle-status')).toContainText('ON');
    });

    test('should upload file', async ({ page }) => {
      await page.click('text=Form Controls');
      
      // Upload a file
      const fileInput = page.locator('[data-testid="file-upload"]');
      await fileInput.setInputFiles({
        name: 'test-file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('This is test file content')
      });
      
      // Verify file info is displayed
      await expect(page.locator('.file-info')).toContainText('test-file.txt');
    });
  });

  // ============================================
  // Section 3: Dynamic Data Tests
  // ============================================
  test.describe('Dynamic Data', () => {
    
    test('should show search suggestions', async ({ page }) => {
      await page.click('text=Dynamic Data');
      
      // Type in search field
      await page.fill('[data-testid="search-input"]', 'play');
      
      // Wait for suggestions to appear
      await page.waitForSelector('[data-testid="suggestions"].show');
      
      // Verify suggestions are visible
      await expect(page.locator('[data-testid="suggestions"]')).toBeVisible();
      
      // Verify "Playwright" is in suggestions
      await expect(page.locator('[data-testid="suggestion-item"]').first())
        .toContainText('Playwright');
    });

    test('should sort table by clicking header', async ({ page }) => {
      await page.click('text=Dynamic Data');
      
      // Click on Name header to sort
      await page.click('th[data-sort="name"]');
      
      // Get first row name
      const firstRowName = await page.locator('#table-body tr:first-child td:first-child').textContent();
      
      // Verify we got a name
      expect(firstRowName).toBeTruthy();
      expect(firstRowName?.length).toBeGreaterThan(0);
    });

    test('should navigate pagination', async ({ page }) => {
      await page.click('text=Dynamic Data');
      
      // Verify starting on page 1
      await expect(page.locator('#page-info')).toContainText('Page 1 of 2');
      
      // Click next page
      await page.click('#next-page');
      
      // Verify now on page 2
      await expect(page.locator('#page-info')).toContainText('Page 2 of 2');
      
      // Verify next button is disabled
      await expect(page.locator('#next-page')).toBeDisabled();
      
      // Go back to page 1
      await page.click('#prev-page');
      
      // Verify back on page 1
      await expect(page.locator('#page-info')).toContainText('Page 1 of 2');
    });
  });

  // ============================================
  // Section 4: Interactive Components Tests
  // ============================================
  test.describe('Interactive Components', () => {

    test('should open and close modal', async ({ page }) => {
      await page.click('text=Interactive');

      // Open modal
      await page.click('[data-testid="open-modal"]');

      // Verify modal is visible
      await expect(page.locator('[data-testid="modal"]')).toHaveClass(/show/);

      // Close modal using X button
      await page.click('[data-testid="modal-close"]');

      // Verify modal is hidden
      await expect(page.locator('[data-testid="modal"]')).not.toHaveClass(/show/);
    });

    test('should switch between tabs', async ({ page }) => {
      await page.click('text=Interactive');

      // Click Tab 2
      await page.click('button[data-tab="tab2"]');

      // Verify Tab 2 content is visible
      await expect(page.locator('[data-testid="tab-2-content"]')).toBeVisible();

      // Verify Tab 1 content is hidden
      await expect(page.locator('[data-testid="tab-1-content"]')).not.toBeVisible();

      // Click Tab 3
      await page.click('button[data-tab="tab3"]');

      // Verify Tab 3 content is visible
      await expect(page.locator('[data-testid="tab-3-content"]')).toBeVisible();
    });

    test('should expand and collapse accordion', async ({ page }) => {
      await page.click('text=Interactive');

      // Click first accordion header
      await page.click('[data-testid="accordion-1"]');

      // Verify accordion item is expanded
      const accordionItem = page.locator('[data-testid="accordion-1"]').locator('..');
      await expect(accordionItem).toHaveClass(/active/);

      // Click again to collapse
      await page.click('[data-testid="accordion-1"]');

      // Verify accordion item is collapsed
      await expect(accordionItem).not.toHaveClass(/active/);
    });

    test('should drag and drop item', async ({ page }) => {
      await page.click('text=Interactive');

      // Perform drag and drop
      const dragItem = page.locator('[data-testid="drag-item-1"]');
      const dropZone = page.locator('[data-testid="drop-zone"]');

      await dragItem.dragTo(dropZone);

      // Verify item is now in drop zone
      await expect(dropZone.locator('[data-testid="drag-item-1"]')).toBeVisible();
    });

    test('should show toast notification', async ({ page }) => {
      await page.click('text=Interactive');

      // Click show toast button
      await page.click('[data-testid="show-toast"]');

      // Verify toast is visible
      await expect(page.locator('[data-testid="toast"]')).toHaveClass(/show/);

      // Wait for toast to disappear (3 seconds)
      await expect(page.locator('[data-testid="toast"]'))
        .not.toHaveClass(/show/, { timeout: 4000 });
    });
  });

  // ============================================
  // Section 5: Async Behavior Tests
  // ============================================
  test.describe('Async Behavior', () => {

    test('should wait for delayed content', async ({ page }) => {
      await page.click('text=Async Behavior');

      // Click button to load delayed content
      await page.click('[data-testid="delayed-content-btn"]');

      // Verify loading state
      await expect(page.locator('[data-testid="delayed-content"]'))
        .toContainText('Loading...');

      // Wait for content to load (2 seconds delay)
      await expect(page.locator('[data-testid="delayed-content"]'))
        .toContainText('Content loaded', { timeout: 3000 });
    });

    test('should track progress bar', async ({ page }) => {
      await page.click('text=Async Behavior');

      // Start progress
      await page.click('[data-testid="progress-btn"]');

      // Wait for progress to complete
      await expect(page.locator('#progress-text'))
        .toContainText('100%', { timeout: 5000 });
    });

    test('should enable button after delay', async ({ page }) => {
      await page.click('text=Async Behavior');

      // Button should be disabled initially
      await expect(page.locator('[data-testid="enable-after-delay"]')).toBeDisabled();

      // Wait for button to be enabled (3 seconds)
      await expect(page.locator('[data-testid="enable-after-delay"]'))
        .toBeEnabled({ timeout: 4000 });
    });

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
  });

  // ============================================
  // Section 6: Advanced Elements Tests
  // ============================================
  test.describe('Advanced Elements', () => {

    test('should interact with iframe content', async ({ page }) => {
      await page.click('text=Advanced');

      // Get iframe locator
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');

      // Click button inside iframe
      await iframe.locator('#iframe-btn').click();

      // Verify result inside iframe
      await expect(iframe.locator('#iframe-result'))
        .toContainText('Button inside iframe clicked!');
    });

    test('should interact with Shadow DOM', async ({ page }) => {
      await page.click('text=Advanced');

      // Access Shadow DOM element
      const shadowHost = page.locator('[data-testid="shadow-host"]');
      const shadowButton = shadowHost.locator('[data-testid="shadow-button"]');

      // Click shadow button
      await shadowButton.click();

      // Verify result in Shadow DOM
      const shadowResult = shadowHost.locator('#shadow-result');
      await expect(shadowResult).toContainText('Shadow DOM button clicked!');
    });

    test('should verify canvas element exists', async ({ page }) => {
      await page.click('text=Advanced');

      // Verify canvas is visible
      await expect(page.locator('[data-testid="demo-canvas"]')).toBeVisible();

      // Verify canvas has correct dimensions
      const canvas = page.locator('[data-testid="demo-canvas"]');
      await expect(canvas).toHaveAttribute('width', '300');
      await expect(canvas).toHaveAttribute('height', '150');
    });
  });

  // ============================================
  // Section 7: Authentication Tests
  // ============================================
  test.describe('Authentication', () => {

    test('should login successfully with valid credentials', async ({ page }) => {
      await page.click('text=Authentication');

      // Fill login form
      await page.fill('[data-testid="username"]', 'demo');
      await page.fill('[data-testid="password"]', 'password123');

      // Click login button
      await page.click('[data-testid="login-btn"]');

      // Verify dashboard is visible
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // Verify user info is displayed
      await expect(page.locator('#user-info')).toContainText('demo');

      // Verify login form is hidden
      await expect(page.locator('[data-testid="login-form"]')).not.toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
      await page.click('text=Authentication');

      // Fill with wrong credentials
      await page.fill('[data-testid="username"]', 'wronguser');
      await page.fill('[data-testid="password"]', 'wrongpass');

      // Click login button
      await page.click('[data-testid="login-btn"]');

      // Verify error message is shown
      await expect(page.locator('[data-testid="login-error"]'))
        .toContainText('Invalid username or password');

      // Verify dashboard is not visible
      await expect(page.locator('[data-testid="dashboard"]')).not.toBeVisible();
    });

    test('should logout successfully', async ({ page }) => {
      await page.click('text=Authentication');

      // Login first
      await page.fill('[data-testid="username"]', 'demo');
      await page.fill('[data-testid="password"]', 'password123');
      await page.click('[data-testid="login-btn"]');

      // Wait for dashboard
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // Click logout
      await page.click('#logout-btn');

      // Verify back to login form
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

      // Verify dashboard is hidden
      await expect(page.locator('[data-testid="dashboard"]')).not.toBeVisible();

      // Verify user info reset
      await expect(page.locator('#user-info')).toContainText('Not logged in');
    });

    test('should submit login with Enter key', async ({ page }) => {
      await page.click('text=Authentication');

      // Fill credentials
      await page.fill('[data-testid="username"]', 'demo');
      await page.fill('[data-testid="password"]', 'password123');

      // Press Enter on password field
      await page.locator('[data-testid="password"]').press('Enter');

      // Verify dashboard is visible
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });

  // ============================================
  // Section 8: Cross-Section Integration Tests
  // ============================================
  test.describe('Integration Tests', () => {

    test('should complete full user workflow', async ({ page }) => {
      // 1. Fill basic input
      await page.click('text=Basic Inputs');
      await page.fill('[data-testid="text-input"]', 'Test User');
      await page.click('[data-testid="primary-button"]');

      // 2. Fill form controls
      await page.click('text=Form Controls');
      await page.selectOption('[data-testid="dropdown"]', 'option1');
      await page.check('[data-testid="checkbox-1"]');

      // 3. Search for data
      await page.click('text=Dynamic Data');
      await page.fill('[data-testid="search-input"]', 'Playwright');
      await page.waitForSelector('[data-testid="suggestions"].show');

      // 4. Open modal
      await page.click('text=Interactive');
      await page.click('[data-testid="open-modal"]');
      await page.click('[data-testid="modal-confirm"]');

      // 5. Login
      await page.click('text=Authentication');
      await page.fill('[data-testid="username"]', 'demo');
      await page.fill('[data-testid="password"]', 'password123');
      await page.click('[data-testid="login-btn"]');

      // Verify final state
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });
});

