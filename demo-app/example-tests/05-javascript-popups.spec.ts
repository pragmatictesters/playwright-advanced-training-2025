/**
 * ============================================
 * 05 - JavaScript Popups & Dialogs Tests
 * ============================================
 * 
 * This file demonstrates how to handle JavaScript dialogs in Playwright:
 * - Alert dialogs (simple message, OK button only)
 * - Confirm dialogs (OK/Cancel buttons)
 * - Prompt dialogs (text input with OK/Cancel)
 * - Delayed/async dialogs
 * - Multiple dialogs in sequence
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Use page.on('dialog') to set up dialog handlers BEFORE triggering
 * 2. Dialogs block the page - handle them promptly
 * 3. Use dialog.accept() for OK, dialog.dismiss() for Cancel
 * 4. For prompts, pass text to dialog.accept('text')
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect, Dialog } from '@playwright/test';
import { BASE_URL, SECTIONS, DIALOG_MESSAGES, TEST_DATA, TIMEOUTS } from './helpers/test-config';

test.describe('05 - JavaScript Popups & Dialogs', () => {
  
  // Navigate to app and JS Popups section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.POPUPS}`);
  });

  // ============================================
  // ALERT DIALOG TESTS
  // ============================================
  test.describe('Alert Dialog', () => {
    
    /**
     * Test: Handle basic alert dialog
     * 🎓 LEARN: Setting up dialog handler before triggering the alert
     */
    test('should accept alert dialog and verify result', async ({ page }) => {
      // IMPORTANT: Set up dialog handler BEFORE clicking the button
      page.on('dialog', async (dialog: Dialog) => {
        // Verify dialog type is 'alert'
        expect(dialog.type()).toBe('alert');
        // Verify the message content
        expect(dialog.message()).toBe(DIALOG_MESSAGES.alert);
        // Accept the alert (click OK)
        await dialog.accept();
      });

      // Trigger the alert
      await page.click('[data-testid="alert-btn"]');

      // Verify result shows alert was acknowledged
      await expect(page.locator('[data-testid="alert-result"]'))
        .toContainText('Alert was acknowledged');
    });

    /**
     * Test: Verify alert message content
     * 🎓 LEARN: Using dialog.message() to validate alert text
     */
    test('should capture and verify alert message text', async ({ page }) => {
      let capturedMessage = '';
      
      page.on('dialog', async (dialog: Dialog) => {
        capturedMessage = dialog.message();
        await dialog.accept();
      });

      await page.click('[data-testid="alert-btn"]');
      
      // Verify we captured the correct message
      expect(capturedMessage).toBe(DIALOG_MESSAGES.alert);
    });
  });

  // ============================================
  // CONFIRM DIALOG TESTS
  // ============================================
  test.describe('Confirm Dialog', () => {
    
    /**
     * Test: Accept confirm dialog (click OK)
     * 🎓 LEARN: dialog.accept() confirms the action
     */
    test('should accept confirm dialog and show OK result', async ({ page }) => {
      page.on('dialog', async (dialog: Dialog) => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe(DIALOG_MESSAGES.confirm);
        await dialog.accept(); // Click OK
      });

      await page.click('[data-testid="confirm-btn"]');

      // Verify result shows user clicked OK
      await expect(page.locator('[data-testid="confirm-result"]'))
        .toContainText('User clicked OK');
    });

    /**
     * Test: Dismiss confirm dialog (click Cancel)
     * 🎓 LEARN: dialog.dismiss() cancels the action
     */
    test('should dismiss confirm dialog and show Cancel result', async ({ page }) => {
      page.on('dialog', async (dialog: Dialog) => {
        expect(dialog.type()).toBe('confirm');
        await dialog.dismiss(); // Click Cancel
      });

      await page.click('[data-testid="confirm-btn"]');

      // Verify result shows user clicked Cancel
      await expect(page.locator('[data-testid="confirm-result"]'))
        .toContainText('User clicked Cancel');
    });
  });

  // ============================================
  // PROMPT DIALOG TESTS
  // ============================================
  test.describe('Prompt Dialog', () => {
    
    /**
     * Test: Enter text in prompt dialog
     * 🎓 LEARN: Pass text to dialog.accept('text') for prompts
     */
    test('should enter text in prompt and verify result', async ({ page }) => {
      page.on('dialog', async (dialog: Dialog) => {
        expect(dialog.type()).toBe('prompt');
        // Accept with input text
        await dialog.accept(TEST_DATA.promptInput);
      });

      await page.click('[data-testid="prompt-btn"]');

      // Verify the entered text is displayed
      await expect(page.locator('[data-testid="prompt-result"]'))
        .toContainText(TEST_DATA.promptInput);
    });

    /**
     * Test: Cancel prompt dialog
     * 🎓 LEARN: Dismissing prompt returns null to the page
     */
    test('should cancel prompt and show cancelled message', async ({ page }) => {
      page.on('dialog', async (dialog: Dialog) => {
        await dialog.dismiss(); // Cancel the prompt
      });

      await page.click('[data-testid="prompt-btn"]');

      // Verify cancelled message
      await expect(page.locator('[data-testid="prompt-result"]'))
        .toContainText('cancelled');
    });

    /**
     * Test: Submit empty text in prompt
     * 🎓 LEARN: Empty string is different from cancellation
     */
    test('should handle empty prompt input', async ({ page }) => {
      page.on('dialog', async (dialog: Dialog) => {
        await dialog.accept(''); // Accept with empty string
      });

      await page.click('[data-testid="prompt-btn"]');

      // Verify empty input message
      await expect(page.locator('[data-testid="prompt-result"]'))
        .toContainText('empty');
    });
  });

  // ============================================
  // RANDOM DELAYED ALERT TESTS
  // ============================================
  test.describe('Random Delayed Alert', () => {

    /**
     * Test: Handle alert that appears after random delay (5-20 seconds)
     * 🎓 LEARN: Use waitForEvent for async dialogs, set appropriate timeout
     */
    test('should wait for and handle random delayed alert', async ({ page }) => {
      // Set up dialog handler
      page.on('dialog', async (dialog: Dialog) => {
        expect(dialog.message()).toBe(DIALOG_MESSAGES.randomAlert);
        await dialog.accept();
      });

      // Trigger the random delayed alert
      await page.click('[data-testid="random-alert-btn"]');

      // Verify countdown started
      await expect(page.locator('#countdown-text'))
        .toContainText('Alert will appear in');

      // Wait for the result (max 25 seconds for 5-20 second delay)
      await expect(page.locator('#countdown-text'))
        .toContainText('Alert was shown', { timeout: TIMEOUTS.EXTRA_LONG });
    });

    /**
     * Test: Cancel pending random alert before it appears
     * 🎓 LEARN: Testing cancellation of async operations
     */
    test('should cancel random alert before it triggers', async ({ page }) => {
      // Trigger the delayed alert
      await page.click('[data-testid="random-alert-btn"]');

      // Wait for countdown to start
      await expect(page.locator('#countdown-text'))
        .toContainText('Alert will appear in');

      // Cancel button should be visible
      await expect(page.locator('[data-testid="cancel-random-btn"]')).toBeVisible();

      // Click cancel
      await page.click('[data-testid="cancel-random-btn"]');

      // Verify cancellation
      await expect(page.locator('#countdown-text'))
        .toContainText('cancelled');

      // Button should be re-enabled
      await expect(page.locator('[data-testid="random-alert-btn"]')).toBeEnabled();
    });

    /**
     * Test: Verify button is disabled during countdown
     * 🎓 LEARN: Testing UI state during async operations
     */
    test('should disable trigger button during countdown', async ({ page }) => {
      await page.click('[data-testid="random-alert-btn"]');

      // Button should be disabled during countdown
      await expect(page.locator('[data-testid="random-alert-btn"]')).toBeDisabled();

      // Cancel to clean up
      await page.click('[data-testid="cancel-random-btn"]');
    });
  });

  // ============================================
  // MULTIPLE POPUPS SEQUENCE TESTS
  // ============================================
  test.describe('Multiple Popups Sequence', () => {

    /**
     * Test: Handle sequence of alert -> confirm -> prompt
     * 🎓 LEARN: Handling multiple dialogs in sequence
     * NOTE: Each dialog must be handled before the next appears
     */
    test('should handle multiple popups in sequence', async ({ page }) => {
      let dialogCount = 0;

      page.on('dialog', async (dialog: Dialog) => {
        dialogCount++;

        switch (dialogCount) {
          case 1:
            // First: Alert
            expect(dialog.type()).toBe('alert');
            await dialog.accept();
            break;
          case 2:
            // Second: Confirm
            expect(dialog.type()).toBe('confirm');
            await dialog.accept(); // Click OK
            break;
          case 3:
            // Third: Prompt
            expect(dialog.type()).toBe('prompt');
            await dialog.accept('Sequence Test');
            break;
        }
      });

      // Trigger the sequence
      await page.click('[data-testid="sequence-btn"]');

      // Wait for and verify final result
      await expect(page.locator('[data-testid="sequence-result"]'))
        .toContainText('Sequence completed', { timeout: TIMEOUTS.MEDIUM });

      // Verify all 3 dialogs were handled
      expect(dialogCount).toBe(3);
    });

    /**
     * Test: Cancel at confirm step in sequence
     * 🎓 LEARN: Different outcomes based on dialog choices
     */
    test('should handle cancel at confirm step', async ({ page }) => {
      let dialogCount = 0;

      page.on('dialog', async (dialog: Dialog) => {
        dialogCount++;

        if (dialogCount === 1) {
          await dialog.accept(); // Accept alert
        } else if (dialogCount === 2) {
          await dialog.dismiss(); // Cancel confirm
        } else {
          await dialog.accept('Test'); // Handle prompt
        }
      });

      await page.click('[data-testid="sequence-btn"]');

      // Verify result shows confirm was cancelled
      await expect(page.locator('[data-testid="sequence-result"]'))
        .toContainText('Cancel', { timeout: TIMEOUTS.MEDIUM });
    });
  });

  // ============================================
  // POPUP ON SECTION LOAD TESTS
  // ============================================
  test.describe('Popup on Section Load', () => {

    /**
     * Test: Enable popup on load and verify it triggers
     * 🎓 LEARN: Handling popups that appear automatically
     */
    test('should show popup when section loads with option enabled', async ({ page }) => {
      // Enable the popup on load checkbox
      await page.check('[data-testid="popup-on-load"]');

      // Set up dialog handler for when we navigate back
      page.on('dialog', async (dialog: Dialog) => {
        expect(dialog.type()).toBe('alert');
        await dialog.accept();
      });

      // Navigate to another section
      await page.click(`text=${SECTIONS.BASICS}`);

      // Navigate back to Popups - should trigger alert
      await page.click(`text=${SECTIONS.POPUPS}`);

      // If we get here without timeout, dialog was handled successfully
    });

    /**
     * Test: Verify checkbox state persistence
     * 🎓 LEARN: Testing checkbox interactions
     */
    test('should toggle popup on load checkbox', async ({ page }) => {
      const checkbox = page.locator('[data-testid="popup-on-load"]');

      // Initially unchecked
      await expect(checkbox).not.toBeChecked();

      // Check it
      await checkbox.check();
      await expect(checkbox).toBeChecked();

      // Uncheck it
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    });
  });

  // ============================================
  // ADVANCED DIALOG PATTERNS
  // ============================================
  test.describe('Advanced Dialog Patterns', () => {

    /**
     * Test: Using once() for single dialog handling
     * 🎓 LEARN: page.once('dialog') handles only one dialog
     */
    test('should use once for single dialog handling', async ({ page }) => {
      // Use once() instead of on() for single dialog
      page.once('dialog', async (dialog: Dialog) => {
        await dialog.accept();
      });

      await page.click('[data-testid="alert-btn"]');

      await expect(page.locator('[data-testid="alert-result"]'))
        .toContainText('acknowledged');
    });

    /**
     * Test: Using waitForEvent to wait for dialog
     * 🎓 LEARN: waitForEvent returns the dialog for inspection
     */
    test('should use waitForEvent for dialog handling', async ({ page }) => {
      // Set up dialog handler first
      let dialogMessage = '';
      let dialogType = '';

      page.once('dialog', async dialog => {
        dialogType = dialog.type();
        dialogMessage = dialog.message();
        await dialog.accept();
      });

      // Trigger the alert
      await page.click('[data-testid="alert-btn"]');

      // Verify result
      await expect(page.locator('[data-testid="alert-result"]'))
        .toContainText('acknowledged');

      // Verify dialog properties were captured
      expect(dialogType).toBe('alert');
      expect(dialogMessage).toContain('alert');
    });
  });
});

