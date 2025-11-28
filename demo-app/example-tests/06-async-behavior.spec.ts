/**
 * ============================================
 * 06 - Async Behavior Tests
 * ============================================
 * 
 * This file demonstrates testing asynchronous operations:
 * - Delayed content loading
 * - Progress bars and loading indicators
 * - API call simulations
 * - Retry mechanisms
 * - Polling patterns
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Use waitForSelector() for elements that appear after delay
 * 2. Use waitForResponse() to wait for API calls
 * 3. Avoid fixed waitForTimeout() - prefer condition-based waits
 * 4. Set appropriate timeouts for slow operations
 * 5. Use polling with expect().toPass() for retry logic
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, TIMEOUTS } from './helpers/test-config';

test.describe('06 - Async Behavior', () => {
  
  // Navigate to Async section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.ASYNC}`);
  });

  // ============================================
  // DELAYED CONTENT TESTS
  // ============================================
  test.describe('Delayed Content Loading', () => {

    /**
     * Test: Wait for delayed content to appear
     * 🎓 LEARN: waitFor with toContainText waits for element content
     */
    test('should wait for delayed content to load', async ({ page }) => {
      const content = page.locator('[data-testid="delayed-content"]');

      // Click button that triggers delayed content
      await page.click('[data-testid="delayed-content-btn"]');

      // Wait for content to appear (loads after 2 seconds)
      await expect(content).toContainText('Content loaded', { timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Verify loading text appears first
     * 🎓 LEARN: Test intermediate states during async operations
     */
    test('should show loading text while content loads', async ({ page }) => {
      const content = page.locator('[data-testid="delayed-content"]');

      // Click to start loading
      await page.click('[data-testid="delayed-content-btn"]');

      // Loading text should appear immediately
      await expect(content).toContainText('Loading...');

      // Wait for final content to load
      await expect(content).toContainText('Content loaded', { timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Content appears with correct data
     * 🎓 LEARN: Verify content, not just visibility
     */
    test('should display correct delayed content', async ({ page }) => {
      const content = page.locator('[data-testid="delayed-content"]');

      // Click to trigger delayed content
      await page.click('[data-testid="delayed-content-btn"]');

      // Wait for and verify content (includes checkmark)
      await expect(content).toContainText('Content loaded after 2 seconds!', { timeout: TIMEOUTS.MEDIUM });
      await expect(content).toContainText('✓');
    });
  });

  // ============================================
  // PROGRESS BAR TESTS
  // ============================================
  test.describe('Progress Bar', () => {

    /**
     * Test: Progress bar starts at 0%
     * 🎓 LEARN: Verify initial state before action
     */
    test('should start progress at 0%', async ({ page }) => {
      const progressText = page.locator('#progress-text');

      // Verify initial state
      await expect(progressText).toContainText('0%');
    });

    /**
     * Test: Progress bar completes to 100%
     * 🎓 LEARN: Wait for progress to complete
     */
    test('should complete progress to 100%', async ({ page }) => {
      // Start progress
      await page.click('[data-testid="progress-btn"]');

      // Wait for progress to complete (takes ~3 seconds at 300ms intervals)
      await expect(page.locator('#progress-text'))
        .toContainText('100%', { timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Progress bar shows intermediate values
     * 🎓 LEARN: Test progress updates during operation
     */
    test('should show progress updates', async ({ page }) => {
      const progressText = page.locator('#progress-text');

      await page.click('[data-testid="progress-btn"]');

      // Wait for some progress (not 0, not 100)
      await expect(async () => {
        const text = await progressText.textContent();
        const value = parseInt(text?.replace('%', '') || '0');
        expect(value).toBeGreaterThan(0);
      }).toPass({ timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Progress text updates with percentage
     * 🎓 LEARN: UI should reflect progress state
     */
    test('should update progress text', async ({ page }) => {
      await page.click('[data-testid="progress-btn"]');

      // Wait for completion
      await expect(page.locator('#progress-text'))
        .toContainText('100%', { timeout: TIMEOUTS.MEDIUM });
    });
  });

  // ============================================
  // API SIMULATION TESTS
  // ============================================
  test.describe('API Call Simulation', () => {

    /**
     * Test: Simulate successful API call
     * 🎓 LEARN: Test simulated API responses
     */
    test('should simulate successful API call', async ({ page }) => {
      // Click to simulate success
      await page.click('[data-testid="api-success"]');

      // Wait for success result
      await expect(page.locator('[data-testid="api-result"]'))
        .toContainText('Success', { timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Simulate API error
     * 🎓 LEARN: Test error handling for API calls
     */
    test('should simulate API error', async ({ page }) => {
      // Click to simulate error
      await page.click('[data-testid="api-error"]');

      // Wait for error result
      await expect(page.locator('[data-testid="api-result"]'))
        .toContainText('Error', { timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: API result shows appropriate styling
     * 🎓 LEARN: Verify both content and visual feedback
     */
    test('should show appropriate result for success', async ({ page }) => {
      // Trigger success
      await page.click('[data-testid="api-success"]');

      // Verify success result appears
      const result = page.locator('[data-testid="api-result"]');
      await expect(result).not.toBeEmpty({ timeout: TIMEOUTS.MEDIUM });
    });
  });

  // ============================================
  // RETRY AND POLLING TESTS
  // ============================================
  test.describe('Retry and Polling Patterns', () => {

    /**
     * Test: Retry until condition is met
     * 🎓 LEARN: expect().toPass() retries until assertion passes
     */
    test('should retry until content appears', async ({ page }) => {
      const content = page.locator('[data-testid="delayed-content"]');

      await page.click('[data-testid="delayed-content-btn"]');

      // Retry assertion until it passes
      await expect(async () => {
        await expect(content).toContainText('Content loaded');
      }).toPass({
        timeout: TIMEOUTS.MEDIUM,
        intervals: [500, 1000, 2000] // Retry intervals
      });
    });

    /**
     * Test: Poll for changing value
     * 🎓 LEARN: Use polling for values that change over time
     */
    test('should poll for progress completion', async ({ page }) => {
      const progressText = page.locator('#progress-text');

      await page.click('[data-testid="progress-btn"]');

      // Poll until progress reaches 100%
      await expect(async () => {
        const text = await progressText.textContent();
        expect(text).toBe('100%');
      }).toPass({ timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Wait for button to become enabled
     * 🎓 LEARN: Wait for specific state transitions
     */
    test('should wait for button to become enabled', async ({ page }) => {
      // Button is initially disabled and enables after 3 seconds
      const submitBtn = page.locator('[data-testid="enable-after-delay"]');

      // Wait for button to become enabled
      await expect(submitBtn).toBeEnabled({ timeout: TIMEOUTS.MEDIUM });
    });
  });

  // ============================================
  // TIMEOUT CONFIGURATION TESTS
  // ============================================
  test.describe('Timeout Handling', () => {

    /**
     * Test: Verify operation completes within expected time
     * 🎓 LEARN: Performance testing - operation should complete in time
     */
    test('should complete within expected time', async ({ page }) => {
      const startTime = Date.now();
      const content = page.locator('[data-testid="delayed-content"]');

      await page.click('[data-testid="delayed-content-btn"]');
      await expect(content).toContainText('Content loaded', { timeout: TIMEOUTS.MEDIUM });

      const duration = Date.now() - startTime;

      // Should complete within reasonable time (not more than 5 seconds)
      expect(duration).toBeLessThan(TIMEOUTS.MEDIUM);
    });

    /**
     * Test: Wait for progress with appropriate timeout
     * 🎓 LEARN: Set appropriate timeouts for different operations
     */
    test('should handle slow progress with custom timeout', async ({ page }) => {
      await page.click('[data-testid="progress-btn"]');

      // Wait for progress to complete with custom timeout
      await expect(page.locator('#progress-text'))
        .toContainText('100%', { timeout: TIMEOUTS.MEDIUM });
    });
  });
});

