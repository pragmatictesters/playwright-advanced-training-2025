/**
 * Logging Basics - All Log Levels Demonstration
 *
 * This test file demonstrates how to use Pino logging in Playwright tests.
 * Each log level is explained with practical examples.
 *
 * Log Levels (from most to least verbose):
 * ┌─────────┬───────┬─────────────────────────────────────────────────┐
 * │ Level   │ Value │ When to Use                                     │
 * ├─────────┼───────┼─────────────────────────────────────────────────┤
 * │ trace   │ 10    │ Most detailed - variable values, loop steps     │
 * │ debug   │ 20    │ Development details - element states, responses │
 * │ info    │ 30    │ Key milestones - test steps completed           │
 * │ warn    │ 40    │ Potential issues - slow response, retry needed  │
 * │ error   │ 50    │ Failures - but test can continue                │
 * │ fatal   │ 60    │ Critical - test cannot continue                 │
 * └─────────┴───────┴─────────────────────────────────────────────────┘
 *
 * Run this test:
 *   npx playwright test tests/examples/logging/01-logging-basics.spec.ts
 *
 * Run with different log levels:
 *   LOG_LEVEL=trace npx playwright test tests/examples/logging/01-logging-basics.spec.ts
 *   LOG_LEVEL=debug npx playwright test tests/examples/logging/01-logging-basics.spec.ts
 */

import { test, expect } from '@playwright/test';
import pino from 'pino';

// ============================================================================
// SETUP: Create a pretty-printed logger for this example
// ============================================================================

const logger = pino({
  level: process.env.LOG_LEVEL || 'trace', // Show all levels in this demo
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss.l',
      ignore: 'pid,hostname',
    },
  },
});

// ============================================================================
// TEST: Demonstrate All Log Levels
// ============================================================================

test.describe('Logging Basics', () => {
  test('demonstrates all log levels with a real page interaction', async ({
    page,
  }) => {
    // ========================================================================
    // TRACE - Most verbose level
    // Use for: Variable values, loop iterations, detailed debugging
    // When: You need to trace exact program flow
    // ========================================================================
    logger.trace('Starting test - trace level is the most verbose');
    logger.trace({ testFile: 'logging-basics.spec.ts' }, 'Test context');

    // ========================================================================
    // DEBUG - Development details
    // Use for: Element states, API response details, intermediate values
    // When: Debugging test failures in development
    // ========================================================================
    logger.debug('Navigating to Playwright homepage');
    logger.debug({ url: 'https://playwright.dev' }, 'Target URL');

    await page.goto('https://playwright.dev');

    logger.debug({ title: await page.title() }, 'Page loaded successfully');

    // ========================================================================
    // INFO - Key milestones (DEFAULT LEVEL)
    // Use for: Test steps completed, important state changes
    // When: Normal test execution - what you want to see in CI logs
    // ========================================================================
    logger.info('✓ Playwright homepage loaded');
    logger.info({ step: 1, action: 'navigate' }, 'Step completed');

    // ========================================================================
    // Check page title
    // ========================================================================
    const title = await page.title();
    logger.info({ title }, 'Verifying page title');

    expect(title).toContain('Playwright');
    logger.info('✓ Title verification passed');

    // ========================================================================
    // WARN - Potential issues
    // Use for: Slow responses, deprecation notices, retry attempts
    // When: Something unexpected but not fatal happened
    // ========================================================================
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    if (loadTime > 1000) {
      logger.warn({ loadTime: `${loadTime}ms` }, 'Page load was slow');
    } else {
      logger.debug({ loadTime: `${loadTime}ms` }, 'Page load time acceptable');
    }

    // ========================================================================
    // ERROR - Failures (test continues)
    // Use for: Non-critical failures, failed soft assertions
    // When: Something failed but test can continue
    // ========================================================================
    // Example: Checking for an optional element
    const optionalBanner = page.locator('.optional-promo-banner');
    const bannerExists = (await optionalBanner.count()) > 0;

    if (!bannerExists) {
      logger.error(
        { selector: '.optional-promo-banner' },
        'Optional banner not found (non-critical)'
      );
    }

    // ========================================================================
    // FATAL - Critical failures
    // Use for: Unrecoverable errors, test must stop
    // When: Database down, authentication failed, critical element missing
    // ========================================================================
    // Example: We WON'T call fatal here as it implies test should stop
    // In real tests, you'd use this before throwing an error:
    //
    // if (!criticalElement) {
    //   logger.fatal({ selector: '#critical' }, 'Critical element not found');
    //   throw new Error('Cannot continue without critical element');
    // }

    logger.info('✓ Test completed successfully');

    // ========================================================================
    // STRUCTURED LOGGING - Adding context to logs
    // ========================================================================
    logger.info(
      {
        browser: 'chromium',
        viewport: { width: 1280, height: 720 },
        timestamp: new Date().toISOString(),
      },
      'Test environment details'
    );
  });
});

