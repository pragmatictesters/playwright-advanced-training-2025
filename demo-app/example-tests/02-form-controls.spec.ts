/**
 * ============================================
 * 02 - Form Controls Tests
 * ============================================
 * 
 * This file demonstrates testing form elements:
 * - Dropdown/Select menus
 * - Radio buttons
 * - Checkboxes
 * - Toggle switches
 * - File upload
 * - Date pickers
 * - Range sliders
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Use selectOption() for dropdowns - pass value, label, or index
 * 2. Use check() and uncheck() for checkboxes/radio buttons
 * 3. Use setInputFiles() for file uploads
 * 4. Always verify the selected state after interaction
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, createTestFile } from './helpers/test-config';

test.describe('02 - Form Controls', () => {
  
  // Navigate to Form Controls section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.FORMS}`);
  });

  // ============================================
  // DROPDOWN/SELECT TESTS
  // ============================================
  test.describe('Dropdown Selection', () => {
    
    /**
     * Test: Select dropdown option by value
     * 🎓 LEARN: selectOption() accepts value attribute
     */
    test('should select dropdown option by value', async ({ page }) => {
      const dropdown = page.locator('[data-testid="dropdown"]');
      
      // Select by value attribute
      await dropdown.selectOption('option2');
      
      // Verify selection
      await expect(dropdown).toHaveValue('option2');
      await expect(page.locator('[data-testid="forms-result"]'))
        .toContainText('option2');
    });

    /**
     * Test: Select dropdown option by visible label
     * 🎓 LEARN: Pass object { label: 'text' } for label-based selection
     */
    test('should select dropdown option by label', async ({ page }) => {
      const dropdown = page.locator('[data-testid="dropdown"]');
      
      // Select by visible text label
      await dropdown.selectOption({ label: 'Option 3' });
      
      await expect(dropdown).toHaveValue('option3');
    });

    /**
     * Test: Select dropdown option by index
     * 🎓 LEARN: Pass object { index: n } for index-based selection
     */
    test('should select dropdown option by index', async ({ page }) => {
      const dropdown = page.locator('[data-testid="dropdown"]');
      
      // Select by index (0-based)
      await dropdown.selectOption({ index: 1 }); // Second option
      
      // Verify something was selected (index 1 = second option)
      const value = await dropdown.inputValue();
      expect(value).toBeTruthy();
    });

    /**
     * Test: Get currently selected option
     * 🎓 LEARN: inputValue() returns the selected option's value
     */
    test('should get selected dropdown value', async ({ page }) => {
      const dropdown = page.locator('[data-testid="dropdown"]');
      
      await dropdown.selectOption('option2');
      
      // Get the selected value
      const selectedValue = await dropdown.inputValue();
      expect(selectedValue).toBe('option2');
    });
  });

  // ============================================
  // RADIO BUTTON TESTS
  // ============================================
  test.describe('Radio Buttons', () => {
    
    /**
     * Test: Select a radio button option
     * 🎓 LEARN: check() selects radio button
     */
    test('should select radio button option', async ({ page }) => {
      const radio = page.locator('[data-testid="radio-2"]');
      
      // Select radio button
      await radio.check();
      
      // Verify it's checked
      await expect(radio).toBeChecked();
      await expect(page.locator('[data-testid="forms-result"]'))
        .toContainText('radio2');
    });

    /**
     * Test: Only one radio can be selected in a group
     * 🎓 LEARN: Radio buttons in same group are mutually exclusive
     */
    test('should only allow one radio selection in group', async ({ page }) => {
      const radio1 = page.locator('[data-testid="radio-1"]');
      const radio2 = page.locator('[data-testid="radio-2"]');
      
      // Select first radio
      await radio1.check();
      await expect(radio1).toBeChecked();
      
      // Select second radio
      await radio2.check();
      
      // First should now be unchecked, second checked
      await expect(radio1).not.toBeChecked();
      await expect(radio2).toBeChecked();
    });

    /**
     * Test: Verify radio button state with toBeChecked
     * 🎓 LEARN: toBeChecked() and not.toBeChecked() for state verification
     */
    test('should verify radio button checked state', async ({ page }) => {
      const radio1 = page.locator('[data-testid="radio-1"]');
      const radio2 = page.locator('[data-testid="radio-2"]');
      const radio3 = page.locator('[data-testid="radio-3"]');

      // Select option 2
      await radio2.check();

      // Verify states
      await expect(radio1).not.toBeChecked();
      await expect(radio2).toBeChecked();
      await expect(radio3).not.toBeChecked();
    });
  });

  // ============================================
  // CHECKBOX TESTS
  // ============================================
  test.describe('Checkboxes', () => {

    /**
     * Test: Check a single checkbox
     * 🎓 LEARN: check() enables checkbox
     */
    test('should check a single checkbox', async ({ page }) => {
      const checkbox = page.locator('[data-testid="checkbox-1"]');

      await checkbox.check();

      await expect(checkbox).toBeChecked();
    });

    /**
     * Test: Uncheck a checkbox
     * 🎓 LEARN: uncheck() disables checkbox
     */
    test('should uncheck a checkbox', async ({ page }) => {
      const checkbox = page.locator('[data-testid="checkbox-1"]');

      // First check it
      await checkbox.check();
      await expect(checkbox).toBeChecked();

      // Then uncheck it
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    });

    /**
     * Test: Check multiple checkboxes
     * 🎓 LEARN: Unlike radio buttons, multiple checkboxes can be checked
     */
    test('should check multiple checkboxes', async ({ page }) => {
      const checkbox1 = page.locator('[data-testid="checkbox-1"]');
      const checkbox2 = page.locator('[data-testid="checkbox-2"]');
      const checkbox3 = page.locator('[data-testid="checkbox-3"]');

      // Check all three
      await checkbox1.check();
      await checkbox2.check();
      await checkbox3.check();

      // Verify all are checked
      await expect(checkbox1).toBeChecked();
      await expect(checkbox2).toBeChecked();
      await expect(checkbox3).toBeChecked();
    });

    /**
     * Test: Toggle checkbox with click
     * 🎓 LEARN: click() toggles checkbox state
     */
    test('should toggle checkbox with click', async ({ page }) => {
      const checkbox = page.locator('[data-testid="checkbox-1"]');

      // Initial state - unchecked
      await expect(checkbox).not.toBeChecked();

      // Click to check
      await checkbox.click();
      await expect(checkbox).toBeChecked();

      // Click again to uncheck
      await checkbox.click();
      await expect(checkbox).not.toBeChecked();
    });
  });

  // ============================================
  // TOGGLE SWITCH TESTS
  // ============================================
  test.describe('Toggle Switch', () => {

    /**
     * Test: Toggle switch ON
     * 🎓 LEARN: Toggle switches often use checkbox inputs with custom styling
     * Click the slider span which is the visible element
     */
    test('should toggle switch ON', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-switch"]');
      const slider = page.locator('label.switch .slider');

      // Click the visible slider element
      await slider.click();

      await expect(toggle).toBeChecked();
    });

    /**
     * Test: Toggle switch OFF
     * 🎓 LEARN: Verify both states of toggle
     */
    test('should toggle switch OFF', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-switch"]');
      const slider = page.locator('label.switch .slider');

      // Turn ON first
      await slider.click();
      await expect(toggle).toBeChecked();

      // Turn OFF
      await slider.click();
      await expect(toggle).not.toBeChecked();
    });

    /**
     * Test: Verify toggle status reflects switch state
     * 🎓 LEARN: UI elements should reflect underlying state
     */
    test('should update status text when toggled', async ({ page }) => {
      const toggle = page.locator('[data-testid="toggle-switch"]');
      const slider = page.locator('label.switch .slider');

      // Multiple toggles
      await slider.click();
      await expect(toggle).toBeChecked();

      await slider.click();
      await expect(toggle).not.toBeChecked();

      await slider.click();
      await expect(toggle).toBeChecked();
    });
  });

  // ============================================
  // FILE UPLOAD TESTS
  // ============================================
  test.describe('File Upload', () => {

    /**
     * Test: Upload a single file
     * 🎓 LEARN: setInputFiles() uploads files to input[type="file"]
     */
    test('should upload a single file', async ({ page }) => {
      const fileInput = page.locator('[data-testid="file-upload"]');

      // Create and upload a test file
      await fileInput.setInputFiles(createTestFile('test.txt', 'Hello World'));

      // Verify file info is displayed
      await expect(page.locator('.file-info')).toContainText('test.txt');
    });

    /**
     * Test: Upload file and verify file details
     * 🎓 LEARN: Verify file name, size, and type after upload
     */
    test('should display uploaded file information', async ({ page }) => {
      const fileInput = page.locator('[data-testid="file-upload"]');

      const fileName = 'document.txt';
      const fileContent = 'This is a test document with some content.';

      await fileInput.setInputFiles(createTestFile(fileName, fileContent));

      // Verify file name is displayed
      await expect(page.locator('.file-info')).toContainText(fileName);
    });

    /**
     * Test: Clear file selection
     * 🎓 LEARN: Pass empty array to clear file selection
     */
    test('should clear file selection', async ({ page }) => {
      const fileInput = page.locator('[data-testid="file-upload"]');

      // Upload a file
      await fileInput.setInputFiles(createTestFile('test.txt', 'content'));
      await expect(page.locator('.file-info')).toContainText('test.txt');

      // Clear selection
      await fileInput.setInputFiles([]);

      // File info should be cleared or hidden
    });
  });

  // ============================================
  // DATE PICKER TESTS
  // ============================================
  test.describe('Date Picker', () => {

    /**
     * Test: Set date in date picker
     * 🎓 LEARN: Date inputs accept YYYY-MM-DD format
     */
    test('should set date in date picker', async ({ page }) => {
      const datePicker = page.locator('[data-testid="date-picker"]');

      // Set date in YYYY-MM-DD format
      await datePicker.fill('2025-12-25');

      await expect(datePicker).toHaveValue('2025-12-25');
    });

    /**
     * Test: Get current date value
     * 🎓 LEARN: inputValue() returns the date in ISO format
     */
    test('should get date picker value', async ({ page }) => {
      const datePicker = page.locator('[data-testid="date-picker"]');

      await datePicker.fill('2025-01-15');

      const dateValue = await datePicker.inputValue();
      expect(dateValue).toBe('2025-01-15');
    });
  });

  // ============================================
  // RANGE SLIDER TESTS
  // ============================================
  test.describe('Range Slider', () => {

    /**
     * Test: Set range slider value
     * 🎓 LEARN: fill() works for range inputs too
     */
    test('should set range slider value', async ({ page }) => {
      const slider = page.locator('[data-testid="range-slider"]');

      // Set slider to 75
      await slider.fill('75');

      await expect(slider).toHaveValue('75');
    });

    /**
     * Test: Verify range slider display updates
     * 🎓 LEARN: Range sliders often have associated value displays
     */
    test('should update display when slider changes', async ({ page }) => {
      const slider = page.locator('[data-testid="range-slider"]');
      const display = page.locator('#slider-value');

      await slider.fill('50');
      await expect(display).toContainText('50');

      await slider.fill('100');
      await expect(display).toContainText('100');
    });
  });
});

