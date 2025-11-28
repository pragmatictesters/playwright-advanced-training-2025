/**
 * ============================================
 * HTTP Basic Authentication Examples
 * ============================================
 * 
 * This file demonstrates THREE different methods to handle
 * HTTP Basic Authentication in Playwright.
 * 
 * 🔒 HTTP Basic Auth displays a BROWSER-LEVEL dialog, NOT a webpage form.
 *    Standard selectors (page.fill, page.click) will NOT work!
 *    Dialog handlers (page.on('dialog')) will NOT work either!
 * 
 * ✅ Solution: Use `httpCredentials` at the protocol level.
 * 
 * Test Credentials:
 *   Username: admin
 *   Password: secret123
 * 
 * @author Pragmatic Test Labs
 * @see https://playwright.dev/docs/auth#http-authentication
 */

import { test, expect, chromium } from '@playwright/test';

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Protected page URL - simulates HTTP Basic Authentication
 *
 * NOTE: This is a TRAINING DEMO on GitHub Pages (static hosting).
 * Real HTTP Basic Auth requires a server that returns 401 status codes.
 *
 * For testing REAL Basic Auth, use sites like:
 * - https://httpbin.org/basic-auth/admin/secret123
 * - https://authenticationtest.com/HTTPAuth/
 *
 * This demo page is accessible without authentication to allow
 * trainees to see the UI and understand the concepts.
 */
const PROTECTED_PAGE_URL = process.env.TEST_URL
  ? `${process.env.TEST_URL}auth-protected/`
  : 'https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/auth-protected/';

/**
 * Real Basic Auth test URL (httpbin.org provides actual 401 auth)
 * Format: https://httpbin.org/basic-auth/{username}/{password}
 */
const REAL_BASIC_AUTH_URL = 'https://httpbin.org/basic-auth/admin/secret123';

/**
 * Test credentials for HTTP Basic Authentication
 * In production, these should come from environment variables!
 */
const CREDENTIALS = {
  username: 'admin',
  password: 'secret123'
};

// =============================================================================
// METHOD A: Using httpCredentials in test.use() (Recommended for test files)
// =============================================================================

test.describe('Method A: httpCredentials via test.use()', () => {
  /**
   * 🎓 LEARN: test.use() applies settings to all tests in this describe block.
   * This is the cleanest approach when all tests in a file need the same credentials.
   *
   * The credentials are automatically sent with every HTTP request.
   */
  test.use({
    httpCredentials: {
      username: CREDENTIALS.username,
      password: CREDENTIALS.password
    }
  });

  test('should access REAL Basic Auth protected page with test.use() credentials', async ({ page }) => {
    /**
     * 🎓 LEARN: httpbin.org provides a real Basic Auth endpoint.
     * Without credentials, you get a 401 error.
     * With correct credentials, you get a JSON response.
     */
    await page.goto(REAL_BASIC_AUTH_URL);

    // httpbin returns JSON with authenticated: true
    await expect(page.locator('body')).toContainText('"authenticated": true');
    await expect(page.locator('body')).toContainText('"user": "admin"');
  });

  test('should access demo protected page with credentials from test.use()', async ({ page }) => {
    // Navigate to our demo protected page (static page, no real auth required)
    const response = await page.goto(PROTECTED_PAGE_URL);

    // Skip if demo page not deployed yet
    if (!response || response.status() === 404) {
      test.skip(true, 'Demo page not yet deployed to GitHub Pages');
      return;
    }

    // Verify we reached the authenticated content (demo page)
    await expect(page.locator('[data-testid="success-message"]'))
      .toContainText('You have successfully authenticated!');

    // Verify the page shows the correct username
    await expect(page.locator('[data-testid="auth-username"]'))
      .toHaveText('admin');
  });

  test('should navigate within protected area after authentication', async ({ page }) => {
    // First access - credentials sent automatically
    const response = await page.goto(PROTECTED_PAGE_URL);

    // Skip if demo page not deployed yet
    if (!response || response.status() === 404) {
      test.skip(true, 'Demo page not yet deployed to GitHub Pages');
      return;
    }

    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

    // Navigate back to main app
    await page.click('[data-testid="back-link"]');

    // Verify we're on the main demo app (could be /demo-app/ or /demo-app/index.html)
    await expect(page).toHaveURL(/demo-app\/(index\.html)?$/);
  });
});

// =============================================================================
// METHOD B: Using browser.newContext() with httpCredentials
// =============================================================================

test.describe('Method B: httpCredentials via browser.newContext()', () => {
  /**
   * 🎓 LEARN: browser.newContext() creates an isolated browser context.
   * Use this when you need different credentials for different tests,
   * or when testing multiple user roles in the same test.
   *
   * Note: We use test() without the built-in page fixture since we create our own.
   */

  test('should access REAL Basic Auth with context-level credentials', async ({ browser }) => {
    // Create a new context with authentication credentials
    const context = await browser.newContext({
      httpCredentials: {
        username: CREDENTIALS.username,
        password: CREDENTIALS.password
      }
    });

    // Create a page in the authenticated context
    const page = await context.newPage();

    // Navigate to real Basic Auth endpoint
    await page.goto(REAL_BASIC_AUTH_URL);

    // Verify successful authentication (httpbin returns JSON)
    await expect(page.locator('body')).toContainText('"authenticated": true');

    // Clean up - always close context when done
    await context.close();
  });

  test('should access demo protected page with context-level credentials', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: CREDENTIALS.username,
        password: CREDENTIALS.password
      }
    });

    const page = await context.newPage();
    const response = await page.goto(PROTECTED_PAGE_URL);

    // Skip if demo page not deployed yet
    if (!response || response.status() === 404) {
      await context.close();
      test.skip(true, 'Demo page not yet deployed to GitHub Pages');
      return;
    }

    // Verify we see the demo success message
    await expect(page.locator('[data-testid="success-message"]'))
      .toContainText('You have successfully authenticated!');

    await context.close();
  });

  test('should test multiple users with different contexts', async ({ browser }) => {
    /**
     * 🎓 LEARN: You can create multiple contexts with different credentials
     * to test scenarios like "admin vs regular user" permissions.
     */

    // Create context for admin user
    const adminContext = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'secret123'
      }
    });
    const adminPage = await adminContext.newPage();
    await adminPage.goto(REAL_BASIC_AUTH_URL);
    await expect(adminPage.locator('body')).toContainText('"authenticated": true');

    // In a real app, you might create another context for a different user:
    // const userContext = await browser.newContext({
    //   httpCredentials: { username: 'user', password: 'userpass' }
    // });

    // Clean up
    await adminContext.close();
  });
});

// =============================================================================
// METHOD C: Inline URL Credentials (Not Recommended for Production)
// =============================================================================

test.describe('Method C: Inline URL Credentials', () => {
  /**
   * 🎓 LEARN: You can embed credentials directly in the URL.
   * Format: https://username:password@domain.com/path
   *
   * ⚠️ WARNING: This method exposes credentials in:
   *    - Browser history
   *    - Server logs
   *    - CI/CD logs
   *    - Network inspector
   *
   * Use only for quick local testing, NEVER in production!
   */

  test('should access REAL Basic Auth with inline URL credentials', async ({ page }) => {
    /**
     * 🎓 LEARN: Embed credentials directly in the URL
     * Format: https://username:password@host/path
     */
    const authenticatedUrl = `https://${CREDENTIALS.username}:${CREDENTIALS.password}@httpbin.org/basic-auth/admin/secret123`;

    // Navigate with credentials in URL
    await page.goto(authenticatedUrl);

    // Verify successful authentication
    await expect(page.locator('body')).toContainText('"authenticated": true');
  });

  test('should demonstrate URL credential format for demo page', async ({ page }) => {
    /**
     * 🎓 LEARN: The URL format is:
     * protocol://username:password@host/path
     *
     * Example:
     * https://admin:secret123@example.com/protected/page.html
     */

    // For GitHub Pages demo, construct URL with credentials
    const baseUrl = new URL(PROTECTED_PAGE_URL);
    const credentialUrl = `${baseUrl.protocol}//${CREDENTIALS.username}:${CREDENTIALS.password}@${baseUrl.host}${baseUrl.pathname}`;

    const response = await page.goto(credentialUrl);

    // Skip if demo page not deployed yet
    if (!response || response.status() === 404) {
      test.skip(true, 'Demo page not yet deployed to GitHub Pages');
      return;
    }

    // Page should load successfully (demo page doesn't require auth, but shows success)
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });
});

// =============================================================================
// ANTI-PATTERN EXAMPLES (What NOT to do)
// =============================================================================

test.describe('Anti-Patterns: What NOT to do', () => {
  /**
   * 🎓 LEARN: These approaches will FAIL with HTTP Basic Auth.
   * They are included here to demonstrate common mistakes.
   */

  test.skip('❌ WRONG: Using page.fill() for Basic Auth', async ({ page }) => {
    /**
     * This will NOT work because:
     * - HTTP Basic Auth shows a BROWSER dialog, not an HTML form
     * - There are no DOM elements to interact with
     * - The page hasn't loaded yet when the dialog appears
     */
    await page.goto(PROTECTED_PAGE_URL);

    // These selectors don't exist - Basic Auth is not a form!
    // await page.fill('#username', 'admin');     // ❌ FAILS
    // await page.fill('#password', 'secret123'); // ❌ FAILS
    // await page.click('#login');                // ❌ FAILS
  });

  test.skip('❌ WRONG: Using page.on("dialog") for Basic Auth', async ({ page }) => {
    /**
     * This will NOT work because:
     * - page.on('dialog') only captures JavaScript dialogs (alert, confirm, prompt)
     * - HTTP Basic Auth is handled at the browser/protocol level
     * - It's a native browser feature, not JavaScript
     */
    page.on('dialog', async dialog => {
      // This handler will NEVER be called for Basic Auth
      await dialog.accept();
    });

    await page.goto(PROTECTED_PAGE_URL);
    // The test would hang or fail because the dialog handler never fires
  });
});

// =============================================================================
// BEST PRACTICES
// =============================================================================

test.describe('Best Practices', () => {
  test.use({
    httpCredentials: {
      username: CREDENTIALS.username,
      password: CREDENTIALS.password
    }
  });

  test('should use environment variables for credentials in CI/CD', async ({ page }) => {
    /**
     * 🎓 LEARN: In production/CI environments, NEVER hardcode credentials.
     * Use environment variables instead:
     *
     * httpCredentials: {
     *   username: process.env.AUTH_USERNAME!,
     *   password: process.env.AUTH_PASSWORD!
     * }
     *
     * Set these in your CI/CD pipeline or .env file (excluded from git).
     */

    // Test with real Basic Auth endpoint
    await page.goto(REAL_BASIC_AUTH_URL);
    await expect(page.locator('body')).toContainText('"authenticated": true');
  });

  test('should verify page content after successful auth', async ({ page }) => {
    /**
     * 🎓 LEARN: Always verify that authentication was successful
     * by checking for content that only appears after login.
     */

    // Test with real Basic Auth endpoint
    await page.goto(REAL_BASIC_AUTH_URL);

    // Good assertions after Basic Auth:
    await expect(page.locator('body')).toContainText('"authenticated": true');
    await expect(page.locator('body')).toContainText('"user": "admin"');
  });

  test('should verify demo page content', async ({ page }) => {
    /**
     * 🎓 LEARN: For the demo page, verify the simulated success message.
     */
    const response = await page.goto(PROTECTED_PAGE_URL);

    // Skip if demo page not deployed yet
    if (!response || response.status() === 404) {
      test.skip(true, 'Demo page not yet deployed to GitHub Pages');
      return;
    }

    await expect(page.locator('[data-testid="success-message"]'))
      .toContainText('successfully authenticated');

    await expect(page.locator('[data-testid="auth-username"]'))
      .toHaveText(CREDENTIALS.username);

    await expect(page).toHaveURL(/auth-protected/);
  });
});

