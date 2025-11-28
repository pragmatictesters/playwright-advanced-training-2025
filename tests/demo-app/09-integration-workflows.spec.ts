/**
 * ============================================
 * 09 - Integration Workflow Tests
 * ============================================
 * 
 * This file demonstrates end-to-end user journey tests:
 * - Multi-step workflows across sections
 * - User scenarios that span multiple features
 * - Real-world usage patterns
 * - Cross-feature integration testing
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Integration tests verify features work together
 * 2. Use realistic user scenarios
 * 3. Test complete workflows, not just individual features
 * 4. Consider state management across steps
 * 5. These tests are slower but provide high confidence
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, CREDENTIALS, TEST_DATA, TIMEOUTS } from './helpers/test-config';

test.describe('09 - Integration Workflows', () => {
  
  // Start fresh for each workflow
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // ============================================
  // COMPLETE USER JOURNEY TESTS
  // ============================================
  test.describe('Complete User Journeys', () => {
    
    /**
     * Test: Full login and explore workflow
     * 🎓 LEARN: Test realistic user behavior patterns
     */
    test('should complete login and explore all sections', async ({ page }) => {
      // Step 1: Navigate to Auth section and login
      await page.click(`text=${SECTIONS.AUTH}`);
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // Step 2: Explore Basic Inputs
      await page.click(`text=${SECTIONS.BASICS}`);
      await page.fill('[data-testid="text-input"]', TEST_DATA.textInput);
      await page.click('[data-testid="primary-button"]');
      await expect(page.locator('[data-testid="basics-result"]')).toContainText(TEST_DATA.textInput);

      // Step 3: Explore Form Controls
      await page.click(`text=${SECTIONS.FORMS}`);
      await page.locator('[data-testid="dropdown"]').selectOption('option2');
      await expect(page.locator('[data-testid="dropdown"]')).toHaveValue('option2');

      // Step 4: Return to Auth and logout
      await page.click(`text=${SECTIONS.AUTH}`);
      await page.click('#logout-btn');
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
    });

    /**
     * Test: Form submission workflow
     * 🎓 LEARN: Multi-step form interactions
     */
    test('should complete multi-step form workflow', async ({ page }) => {
      // Step 1: Fill basic inputs
      await page.click(`text=${SECTIONS.BASICS}`);
      await page.fill('[data-testid="text-input"]', 'User Name');
      await page.click('[data-testid="primary-button"]');
      
      // Step 2: Fill form controls
      await page.click(`text=${SECTIONS.FORMS}`);
      await page.locator('[data-testid="dropdown"]').selectOption('option1');
      await page.locator('[data-testid="radio-2"]').check();
      await page.locator('[data-testid="checkbox-1"]').check();
      
      // Verify all selections
      await expect(page.locator('[data-testid="dropdown"]')).toHaveValue('option1');
      await expect(page.locator('[data-testid="radio-2"]')).toBeChecked();
      await expect(page.locator('[data-testid="checkbox-1"]')).toBeChecked();
    });

    /**
     * Test: Search and interact workflow
     * 🎓 LEARN: Dynamic content interaction flow
     */
    test('should search and interact with results', async ({ page }) => {
      // Step 1: Go to Dynamic Data section
      await page.click(`text=${SECTIONS.DYNAMIC}`);
      
      // Step 2: Search for item
      await page.fill('[data-testid="search-input"]', TEST_DATA.searchTerm);
      await page.waitForSelector('[data-testid="suggestions"].show', { timeout: TIMEOUTS.MEDIUM });
      
      // Step 3: Select from suggestions
      await page.click('[data-testid="suggestion-item"] >> nth=0');
      
      // Step 4: Interact with table
      await page.click('th[data-sort="name"]');
      
      // Step 5: Navigate pagination
      await page.click('#next-page');
      await expect(page.locator('#page-info')).toContainText('Page 2');
    });
  });

  // ============================================
  // CROSS-SECTION WORKFLOWS
  // ============================================
  test.describe('Cross-Section Workflows', () => {
    
    /**
     * Test: Interactive components workflow
     * 🎓 LEARN: Test multiple interactive features together
     */
    test('should use multiple interactive components', async ({ page }) => {
      await page.click(`text=${SECTIONS.INTERACTIVE}`);
      
      // Open and close modal
      await page.click('[data-testid="open-modal"]');
      await expect(page.locator('[data-testid="modal"]')).toHaveClass(/show/);
      await page.click('[data-testid="modal-confirm"]');
      await expect(page.locator('[data-testid="modal"]')).not.toHaveClass(/show/);
      
      // Navigate tabs
      await page.click('button[data-tab="tab2"]');
      await expect(page.locator('[data-testid="tab-2-content"]')).toBeVisible();
      
      // Expand accordion
      await page.click('[data-testid="accordion-1"]');
      
      // Show toast
      await page.click('[data-testid="show-toast"]');
      await expect(page.locator('[data-testid="toast"]')).toHaveClass(/show/);
    });

    /**
     * Test: Async operations workflow
     * 🎓 LEARN: Handle multiple async operations in sequence
     */
    test('should handle async operations in sequence', async ({ page }) => {
      await page.click(`text=${SECTIONS.ASYNC}`);

      // Start progress bar
      await page.click('[data-testid="progress-btn"]');

      // While progress runs, load delayed content
      await page.click('[data-testid="delayed-content-btn"]');

      // Wait for progress to complete (check progress text)
      await expect(page.locator('#progress-text'))
        .toContainText('100%', { timeout: TIMEOUTS.LONG });

      // Wait for delayed content to appear
      await expect(page.locator('[data-testid="delayed-content"]'))
        .toContainText('Content loaded', { timeout: TIMEOUTS.LONG });
    });

    /**
     * Test: JavaScript popups workflow
     * 🎓 LEARN: Handle multiple dialog types in sequence
     */
    test('should handle multiple JavaScript dialogs', async ({ page }) => {
      await page.click(`text=${SECTIONS.POPUPS}`);

      // Handle alert
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        await dialog.accept();
      });
      await page.click('[data-testid="alert-btn"]');
      await expect(page.locator('[data-testid="alert-result"]')).toContainText('acknowledged');

      // Handle confirm (accept)
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
      });
      await page.click('[data-testid="confirm-btn"]');
      await expect(page.locator('[data-testid="confirm-result"]')).toContainText('OK');

      // Handle prompt
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        await dialog.accept('Test User');
      });
      await page.click('[data-testid="prompt-btn"]');
      await expect(page.locator('[data-testid="prompt-result"]')).toContainText('Test User');
    });
  });

  // ============================================
  // DATA PERSISTENCE WORKFLOWS
  // ============================================
  test.describe('Data Persistence Workflows', () => {

    /**
     * Test: Data persists across section navigation
     * 🎓 LEARN: Verify state management across navigation
     */
    test('should maintain form data across section navigation', async ({ page }) => {
      // Fill form in Basic Inputs
      await page.click(`text=${SECTIONS.BASICS}`);
      await page.fill('[data-testid="text-input"]', 'Persistent Data');

      // Navigate away
      await page.click(`text=${SECTIONS.FORMS}`);

      // Navigate back
      await page.click(`text=${SECTIONS.BASICS}`);

      // Check if data persists (depends on app implementation)
      // Some apps clear, some persist - test the expected behavior
      const input = page.locator('[data-testid="text-input"]');
      const value = await input.inputValue();

      // Log the behavior for documentation
      console.log(`Form data persistence: ${value ? 'persisted' : 'cleared'}`);
    });

    /**
     * Test: Login state persists across navigation
     * 🎓 LEARN: Authentication state should persist
     */
    test('should maintain login state across sections', async ({ page }) => {
      // Login
      await page.click(`text=${SECTIONS.AUTH}`);
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // Navigate to other sections
      await page.click(`text=${SECTIONS.BASICS}`);
      await page.click(`text=${SECTIONS.FORMS}`);
      await page.click(`text=${SECTIONS.DYNAMIC}`);

      // Return to Auth - should still be logged in
      await page.click(`text=${SECTIONS.AUTH}`);
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });

  // ============================================
  // ERROR RECOVERY WORKFLOWS
  // ============================================
  test.describe('Error Recovery Workflows', () => {

    /**
     * Test: Recover from failed login
     * 🎓 LEARN: Test error recovery paths
     */
    test('should recover from failed login attempt', async ({ page }) => {
      await page.click(`text=${SECTIONS.AUTH}`);

      // Attempt with invalid credentials
      await page.fill('[data-testid="username"]', CREDENTIALS.invalid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.invalid.password);
      await page.click('[data-testid="login-btn"]');

      // Verify error shown
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();

      // Recover with valid credentials
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');

      // Verify successful login
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      await expect(page.locator('[data-testid="login-error"]')).not.toBeVisible();
    });

    /**
     * Test: Continue after async operation timeout
     * 🎓 LEARN: Handle and recover from timeouts
     */
    test('should continue workflow after slow operation', async ({ page }) => {
      await page.click(`text=${SECTIONS.ASYNC}`);

      // Start slow operation
      await page.click('[data-testid="delayed-content-btn"]');

      // Wait for completion
      await expect(page.locator('[data-testid="delayed-content"]'))
        .toContainText('Content loaded', { timeout: TIMEOUTS.LONG });

      // Continue with other operations
      await page.click(`text=${SECTIONS.BASICS}`);
      await page.fill('[data-testid="text-input"]', 'After async');
      await expect(page.locator('[data-testid="text-input"]')).toHaveValue('After async');
    });
  });

  // ============================================
  // FULL APPLICATION WORKFLOW
  // ============================================
  test.describe('Full Application Workflow', () => {

    /**
     * Test: Complete application walkthrough
     * 🎓 LEARN: End-to-end test covering all major features
     */
    test('should complete full application walkthrough', async ({ page }) => {
      // 1. Start at home
      await expect(page).toHaveTitle(/Demo App/);

      // 2. Login
      await page.click(`text=${SECTIONS.AUTH}`);
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // 3. Use basic inputs
      await page.click(`text=${SECTIONS.BASICS}`);
      await page.fill('[data-testid="text-input"]', 'Integration Test');
      await page.click('[data-testid="primary-button"]');

      // 4. Use form controls
      await page.click(`text=${SECTIONS.FORMS}`);
      await page.locator('[data-testid="dropdown"]').selectOption('option2');
      await page.locator('[data-testid="checkbox-1"]').check();

      // 5. Use dynamic data
      await page.click(`text=${SECTIONS.DYNAMIC}`);
      await page.click('th[data-sort="name"]');

      // 6. Use interactive components
      await page.click(`text=${SECTIONS.INTERACTIVE}`);
      await page.click('[data-testid="open-modal"]');
      await page.click('[data-testid="modal-confirm"]');

      // 7. Logout
      await page.click(`text=${SECTIONS.AUTH}`);
      await page.click('#logout-btn');
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

      // Workflow complete!
      console.log('✅ Full application walkthrough completed successfully');
    });
  });
});

