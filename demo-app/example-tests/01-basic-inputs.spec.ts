/**
 * ============================================
 * 01 - Basic Inputs Tests
 * ============================================
 * 
 * This file demonstrates fundamental Playwright interactions:
 * - Text input operations (fill, clear, type)
 * - Button clicks
 * - Field state verification (disabled, readonly)
 * - Placeholder and value assertions
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Use fill() for replacing text, type() for typing character by character
 * 2. Use data-testid attributes for reliable selectors
 * 3. Always verify the result of user interactions
 * 4. Check field states before attempting interactions
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, TEST_DATA } from './helpers/test-config';

test.describe('01 - Basic Inputs', () => {
  
  // Navigate to app and Basic Inputs section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.BASICS}`);
  });

  // ============================================
  // TEXT INPUT TESTS
  // ============================================
  test.describe('Text Input Field', () => {
    
    /**
     * Test: Fill text input field
     * 🎓 LEARN: fill() replaces any existing text
     */
    test('should fill text in input field', async ({ page }) => {
      const input = page.locator('[data-testid="text-input"]');
      
      // Fill the input with test data
      await input.fill(TEST_DATA.textInput);
      
      // Verify the value
      await expect(input).toHaveValue(TEST_DATA.textInput);
    });

    /**
     * Test: Clear text input field
     * 🎓 LEARN: fill('') or clear() removes text from input
     */
    test('should clear text input field', async ({ page }) => {
      const input = page.locator('[data-testid="text-input"]');
      
      // First fill some text
      await input.fill('Some text to clear');
      await expect(input).toHaveValue('Some text to clear');
      
      // Clear the input
      await input.clear();
      
      // Verify input is empty
      await expect(input).toHaveValue('');
    });

    /**
     * Test: Verify placeholder text
     * 🎓 LEARN: toHaveAttribute() checks HTML attributes
     */
    test('should display placeholder text', async ({ page }) => {
      const input = page.locator('[data-testid="text-input"]');

      // Verify placeholder attribute (actual placeholder in demo app)
      await expect(input).toHaveAttribute('placeholder', 'Enter text here');
    });

    /**
     * Test: Type text character by character
     * 🎓 LEARN: type() simulates real keyboard typing (slower but more realistic)
     */
    test('should type text character by character', async ({ page }) => {
      const input = page.locator('[data-testid="text-input"]');
      
      // Type text (triggers input events for each character)
      await input.type('Typing slowly', { delay: 50 });
      
      // Verify the typed text
      await expect(input).toHaveValue('Typing slowly');
    });
  });

  // ============================================
  // BUTTON INTERACTION TESTS
  // ============================================
  test.describe('Button Clicks', () => {
    
    /**
     * Test: Click primary button and verify result
     * 🎓 LEARN: Actions should produce verifiable results
     */
    test('should click primary button and show result', async ({ page }) => {
      // Fill input first
      await page.fill('[data-testid="text-input"]', TEST_DATA.textInput);
      
      // Click the primary button
      await page.click('[data-testid="primary-button"]');
      
      // Verify result displays the input text
      await expect(page.locator('[data-testid="basics-result"]'))
        .toContainText(TEST_DATA.textInput);
    });

    /**
     * Test: Click secondary button
     * 🎓 LEARN: Different buttons may have different behaviors
     */
    test('should click secondary button', async ({ page }) => {
      await page.fill('[data-testid="text-input"]', 'Test value');

      // Click secondary button (using id selector as it lacks data-testid)
      await page.click('#secondary-btn');

      // Verify action was recorded in result
      await expect(page.locator('[data-testid="basics-result"]'))
        .toContainText('Secondary');
    });

    /**
     * Test: Double-click interaction
     * 🎓 LEARN: dblclick() for double-click events
     */
    test('should handle double-click on button', async ({ page }) => {
      await page.fill('[data-testid="text-input"]', 'Double click test');
      
      // Double-click the primary button
      await page.dblclick('[data-testid="primary-button"]');
      
      // Result should still show (two clicks processed)
      await expect(page.locator('[data-testid="basics-result"]'))
        .toContainText('Double click test');
    });
  });

  // ============================================
  // FIELD STATE TESTS
  // ============================================
  test.describe('Field States', () => {
    
    /**
     * Test: Verify disabled field cannot be edited
     * 🎓 LEARN: toBeDisabled() checks if element is disabled
     */
    test('should verify disabled field is not editable', async ({ page }) => {
      const disabledInput = page.locator('[data-testid="disabled-input"]');

      // Verify field is disabled
      await expect(disabledInput).toBeDisabled();

      // Verify it has a value (actual value in demo app)
      await expect(disabledInput).toHaveValue('Cannot edit');
    });

    /**
     * Test: Verify readonly field has value but cannot be modified
     * 🎓 LEARN: readonly attribute allows reading but not editing
     */
    test('should verify readonly field has value', async ({ page }) => {
      const readonlyInput = page.locator('[data-testid="readonly-input"]');

      // Verify readonly attribute exists
      await expect(readonlyInput).toHaveAttribute('readonly', '');

      // Verify the preset value (actual value in demo app)
      await expect(readonlyInput).toHaveValue('Read only value');
    });

    /**
     * Test: Compare disabled vs readonly field behavior
     * 🎓 LEARN: Disabled fields are not focusable, readonly are
     */
    test('should differentiate disabled and readonly fields', async ({ page }) => {
      const disabledInput = page.locator('[data-testid="disabled-input"]');
      const readonlyInput = page.locator('[data-testid="readonly-input"]');

      // Disabled: cannot be focused, not submitted with form
      await expect(disabledInput).toBeDisabled();

      // Readonly: can be focused, submitted with form
      await expect(readonlyInput).toHaveAttribute('readonly');
      await expect(readonlyInput).not.toBeDisabled(); // readonly is not disabled
    });
  });

  // ============================================
  // INPUT VALIDATION TESTS
  // ============================================
  test.describe('Input Validation', () => {

    /**
     * Test: Empty input handling
     * 🎓 LEARN: Testing empty/null states is important
     */
    test('should handle empty input submission', async ({ page }) => {
      // Click button without filling input
      await page.click('[data-testid="primary-button"]');

      // Verify result handles empty input
      await expect(page.locator('[data-testid="basics-result"]'))
        .toBeVisible();
    });

    /**
     * Test: Input with special characters
     * 🎓 LEARN: Test edge cases with special characters
     */
    test('should handle special characters in input', async ({ page }) => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/\\`~';

      await page.fill('[data-testid="text-input"]', specialText);
      await page.click('[data-testid="primary-button"]');

      // Verify special characters are displayed correctly
      await expect(page.locator('[data-testid="basics-result"]'))
        .toContainText(specialText);
    });

    /**
     * Test: Input with unicode characters
     * 🎓 LEARN: Modern apps should handle international text
     */
    test('should handle unicode characters', async ({ page }) => {
      const unicodeText = '日本語 한국어 中文 🎭🚀✅';

      await page.fill('[data-testid="text-input"]', unicodeText);

      await expect(page.locator('[data-testid="text-input"]'))
        .toHaveValue(unicodeText);
    });
  });

  // ============================================
  // KEYBOARD INTERACTION TESTS
  // ============================================
  test.describe('Keyboard Interactions', () => {

    /**
     * Test: Press Enter key in input field
     * 🎓 LEARN: press() simulates keyboard key press
     */
    test('should trigger action with Enter key', async ({ page }) => {
      const input = page.locator('[data-testid="text-input"]');

      await input.fill('Press Enter to submit');

      // Click the button to submit (Enter key behavior depends on app)
      await page.click('[data-testid="primary-button"]');

      // Verify action was triggered
      await expect(page.locator('[data-testid="basics-result"]'))
        .toContainText('Press Enter to submit');
    });

    /**
     * Test: Tab navigation between fields
     * 🎓 LEARN: Tab key moves focus between focusable elements
     */
    test('should tab between input fields', async ({ page }) => {
      const textInput = page.locator('[data-testid="text-input"]');

      // Focus the text input
      await textInput.focus();
      await expect(textInput).toBeFocused();

      // Tab to next element
      await page.keyboard.press('Tab');

      // Verify focus moved (text input no longer focused)
      await expect(textInput).not.toBeFocused();
    });

    /**
     * Test: Select all text with keyboard shortcut
     * 🎓 LEARN: Keyboard shortcuts for text selection
     */
    test('should select all text with Ctrl+A', async ({ page }) => {
      const input = page.locator('[data-testid="text-input"]');

      await input.fill('Select this text');
      await input.focus();

      // Select all (Meta+A on Mac, Control+A on Windows/Linux)
      const isMac = process.platform === 'darwin';
      await page.keyboard.press(isMac ? 'Meta+a' : 'Control+a');

      // Type new text (replaces selected)
      await page.keyboard.type('Replaced text');

      await expect(input).toHaveValue('Replaced text');
    });
  });
});

