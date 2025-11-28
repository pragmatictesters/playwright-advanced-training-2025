/**
 * ✅ AFTER REFACTORING
 * ====================
 * This file demonstrates clean, maintainable test code.
 * Compare with before-refactoring.spec.ts to see improvements.
 * 
 * ✨ Improvements applied:
 * - Constants for URLs and test data
 * - Descriptive test names
 * - beforeEach for common setup
 * - Reusable helper functions
 * - Focused, single-purpose tests
 */

import { test, expect, Page } from '@playwright/test';

// ✅ GOOD: Constants with meaningful names
const BASE_URL = 'https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/';

// ✅ GOOD: Test data organized in one place
const TEST_DATA = {
  sampleText: 'Hello World',
  updatedText: 'Updated Value',
  multilineText: 'Line 1\nLine 2\nLine 3',
};

// ✅ GOOD: Selectors defined once (could also be in Page Object)
const SELECTORS = {
  textInput: '[data-testid="text-input"]',
  textareaInput: '[data-testid="textarea-input"]',
  primaryButton: '[data-testid="primary-button"]',
  resultBox: '[data-testid="basics-result"]',
  dropdown: '[data-testid="dropdown"]',
};

// ✅ GOOD: Reusable helper function
async function navigateToSection(page: Page, section: string) {
  await page.locator(`button[data-section="${section}"]`).click();
}

// ✅ GOOD: Common setup in beforeEach
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// ✅ GOOD: Descriptive test.describe grouping related tests
test.describe('Basic Inputs Section', () => {
  
  // ✅ GOOD: Test name describes exact behavior being tested
  test('should display entered text in result box when primary button clicked', async ({ page }) => {
    // ✅ GOOD: Using getByTestId for cleaner selectors
    await page.getByTestId('text-input').fill(TEST_DATA.sampleText);
    await page.getByTestId('primary-button').click();
    
    await expect(page.getByTestId('basics-result')).toContainText(TEST_DATA.sampleText);
  });

  test('should allow updating text input value', async ({ page }) => {
    const textInput = page.getByTestId('text-input');  // ✅ GOOD: Extract to variable
    
    await textInput.fill('Initial Value');
    await textInput.clear();
    await textInput.fill(TEST_DATA.updatedText);
    
    await expect(textInput).toHaveValue(TEST_DATA.updatedText);
  });

  test('should enable primary button and disable the disabled button', async ({ page }) => {
    // ✅ GOOD: Single responsibility - testing button states only
    await expect(page.getByTestId('primary-button')).toBeEnabled();
    await expect(page.locator('#disabled-btn')).toBeDisabled();
  });

  test('should accept multiline text in textarea', async ({ page }) => {
    const textarea = page.getByTestId('textarea-input');
    
    await textarea.fill(TEST_DATA.multilineText);
    
    await expect(textarea).toHaveValue(TEST_DATA.multilineText);
  });
});

// ✅ GOOD: Separate describe block for different section
test.describe('Form Controls Section', () => {
  
  // ✅ GOOD: Navigate to section in beforeEach for this group
  test.beforeEach(async ({ page }) => {
    await navigateToSection(page, 'forms');
  });

  test('should select dropdown option', async ({ page }) => {
    // ✅ GOOD: Single focused assertion
    await page.getByTestId('dropdown').selectOption('option1');
    
    await expect(page.getByTestId('dropdown')).toHaveValue('option1');
  });

  test('should check multiple checkboxes', async ({ page }) => {
    // ✅ GOOD: Test one feature - checkbox behavior
    await page.getByTestId('checkbox-1').check();
    await page.getByTestId('checkbox-2').check();
    
    await expect(page.getByTestId('checkbox-1')).toBeChecked();
    await expect(page.getByTestId('checkbox-2')).toBeChecked();
  });

  test('should select radio button option', async ({ page }) => {
    // ✅ GOOD: Clear, focused test
    await page.locator('input[value="radio1"]').check();
    
    await expect(page.locator('input[value="radio1"]')).toBeChecked();
  });
});

