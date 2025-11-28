/**
 * Logging with LogManager - Framework Integration Example
 *
 * This test demonstrates how to use the LogManager utility for
 * framework-level logging in Playwright tests.
 *
 * Benefits of LogManager:
 * - Consistent configuration across all tests
 * - Child loggers with test-specific context
 * - Singleton pattern - single source of truth
 * - Easy to mock for unit testing
 *
 * Run this test:
 *   npx playwright test tests/examples/logging/02-logging-with-manager.spec.ts
 *
 * Run with different log levels:
 *   LOG_LEVEL=debug npx playwright test tests/examples/logging/02-logging-with-manager.spec.ts
 */

import { test, expect } from '@playwright/test';
import { LogManager, logger } from '../../../utils/log-manager';

// ============================================================================
// TEST: Using the Singleton Logger Instance
// ============================================================================

test.describe('LogManager Usage', () => {
  test('using the singleton logger instance', async ({ page }) => {
    // Use the exported singleton instance directly
    logger.info('Starting test with singleton logger');

    await page.goto('https://playwright.dev');
    logger.info('Navigated to Playwright homepage');

    const title = await page.title();
    logger.debug('Page title retrieved', { title });

    expect(title).toContain('Playwright');
    logger.info('Title assertion passed');
  });

  // ==========================================================================
  // TEST: Using Child Loggers for Test Context
  // ==========================================================================

  test('using child logger with test context', async ({ page }) => {
    // Create a child logger with test-specific context
    // All logs from this logger will include the test name
    const testLogger = LogManager.getInstance().forTest(
      'child-logger-example',
      { browser: 'chromium' } // Additional metadata
    );

    testLogger.info('Starting test with child logger');

    await page.goto('https://playwright.dev');
    testLogger.debug('Page loaded');

    // Click on "Get Started" link
    await page.getByRole('link', { name: 'Get started' }).click();
    testLogger.info('Clicked Get Started link');

    // Verify navigation
    await expect(page).toHaveURL(/.*intro/);
    testLogger.info('Navigation verified');

    testLogger.info('Test completed successfully');
  });

  // ==========================================================================
  // TEST: Logging with Structured Data
  // ==========================================================================

  test('logging with structured data', async ({ page }) => {
    logger.info('Demonstrating structured logging');

    await page.goto('https://playwright.dev');

    // Log page metrics
    const metrics = await page.evaluate(() => ({
      documentReady: performance.timing.domContentLoadedEventEnd,
      loadComplete: performance.timing.loadEventEnd,
    }));

    logger.info('Page performance metrics captured', {
      metrics,
      url: page.url(),
    });

    // Log element information
    const heading = page.locator('h1').first();
    const headingText = await heading.textContent();

    logger.debug('Found heading element', {
      text: headingText,
      visible: await heading.isVisible(),
    });

    expect(headingText).toBeTruthy();
    logger.info('Heading verification passed');
  });

  // ==========================================================================
  // TEST: Logging in Test Hooks
  // ==========================================================================

  test.describe('Logging in hooks', () => {
    test.beforeEach(async ({ page }, testInfo) => {
      // Create test-specific logger using test info
      const hookLogger = LogManager.getInstance().forTest(testInfo.title);
      hookLogger.info('beforeEach hook started');

      await page.goto('https://playwright.dev');
      hookLogger.info('Page loaded in beforeEach');
    });

    test.afterEach(async ({}, testInfo) => {
      const hookLogger = LogManager.getInstance().forTest(testInfo.title);
      hookLogger.info('afterEach hook - test cleanup', {
        status: testInfo.status,
        duration: testInfo.duration,
      });
    });

    test('test with logged hooks', async ({ page }) => {
      logger.info('Test body executing');

      const title = await page.title();
      expect(title).toContain('Playwright');

      logger.info('Test assertions passed');
    });
  });
});

