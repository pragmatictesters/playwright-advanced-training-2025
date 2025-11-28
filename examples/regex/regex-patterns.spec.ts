/**
 * 🎓 REGEX PATTERNS IN PLAYWRIGHT
 * ================================
 * Regular expressions (regex) help match text patterns instead of exact strings.
 * This is useful when content is dynamic or you need flexible matching.
 * 
 * 📚 QUICK REFERENCE:
 *   /pattern/   - Basic regex (case-sensitive)
 *   /pattern/i  - Case-insensitive matching
 *   .*          - Any characters (wildcard)
 *   \d          - Any digit (0-9)
 *   ^           - Start of string
 *   $           - End of string
 *   ?           - Optional (0 or 1)
 *   +           - One or more
 *   |           - OR operator
 */

import { test, expect } from '@playwright/test';

// 🌐 Using playwright.dev as our demo site
const BASE_URL = 'https://playwright.dev';

test.describe('🔤 Regex Basics - Text Matching', () => {
  
  test('Case-insensitive matching with /i flag', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // ✅ GOOD: /i flag ignores case - matches "Playwright", "PLAYWRIGHT", "playwright"
    await expect(page).toHaveTitle(/playwright/i);
    
    // ❌ WITHOUT /i: This would fail if case doesn't match exactly
    // await expect(page).toHaveTitle(/PLAYWRIGHT/);  // Would fail!
  });

  test('Partial text matching with getByText()', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Match any text containing "started" (case-insensitive)
    const link = page.getByRole('link', { name: /get started/i });
    await expect(link).toBeVisible();
  });

  test('Match text containing numbers', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // \d matches any digit, \d+ matches one or more digits
    // This would match "v1.40", "v2.0", "Version 3" etc.
    // Example pattern: /v\d+/i matches version numbers
    
    // For this demo, we'll check the title contains letters
    await expect(page).toHaveTitle(/[A-Za-z]+/);  // One or more letters
  });
});

test.describe('🔗 Regex in URL Assertions', () => {
  
  test('Wildcard matching with .*', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // .* means "any characters" (including none)
    // This matches any URL ending with ".dev" or ".dev/"
    await expect(page).toHaveURL(/.*playwright\.dev/);
  });

  test('Match URL path patterns', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/intro`);
    
    // Match URL containing /docs/ followed by any word
    await expect(page).toHaveURL(/\/docs\/\w+/);
    
    // \w+ means one or more word characters (letters, digits, underscore)
  });

  test('Anchor patterns - start (^) and end ($)', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // ^ means "starts with"
    // $ means "ends with"
    await expect(page).toHaveURL(/^https:\/\//);  // Starts with https://
    await expect(page).toHaveURL(/\.dev\/?$/);    // Ends with .dev or .dev/
  });
});

test.describe('🎯 Regex in Locators', () => {

  test('getByRole with regex name', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Match button/link with name containing "start" (case-insensitive)
    const getStartedLink = page.getByRole('link', { name: /start/i });
    await expect(getStartedLink.first()).toBeVisible();
  });

  test('Filter elements with regex', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Find all links, then filter to those with text matching pattern
    const links = page.getByRole('link');
    
    // Filter to links containing "doc" in their text
    const docLinks = links.filter({ hasText: /doc/i });
    
    // Should find at least one link with "doc" in it
    await expect(docLinks.first()).toBeVisible();
  });

  test('getByText with regex', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Find element by text pattern
    // | is OR operator: matches "Playwright" OR "testing"
    const element = page.getByText(/playwright|testing/i).first();
    await expect(element).toBeVisible();
  });
});

test.describe('✅ Regex in Assertions', () => {

  test('toContainText with regex', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check if main content contains text matching pattern
    const main = page.getByRole('main');
    
    // Match any text (this is a very flexible check)
    await expect(main).toContainText(/.+/);  // Contains at least one character
  });

  test('toHaveAttribute with regex', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check href attribute matches a pattern
    const getStartedLink = page.getByRole('link', { name: /get started/i });
    
    // Verify href contains "/docs/" somewhere
    await expect(getStartedLink).toHaveAttribute('href', /\/docs\//);
  });
});

test.describe('💡 Common Real-World Patterns', () => {

  test('Match price format: $XX.XX', async ({ page }) => {
    // Pattern explanation:
    // \$     - Literal dollar sign (escaped with \)
    // \d+    - One or more digits
    // \.     - Literal period (escaped with \)
    // \d{2}  - Exactly 2 digits
    
    const pricePattern = /\$\d+\.\d{2}/;
    
    // Test the pattern (these would work on a shopping site)
    expect('$19.99').toMatch(pricePattern);
    expect('$100.00').toMatch(pricePattern);
    expect('Price: $5.99 each').toMatch(pricePattern);
  });

  test('Match email format', async ({ page }) => {
    // Simple email pattern
    const emailPattern = /\w+@\w+\.\w+/;
    
    expect('test@example.com').toMatch(emailPattern);
    expect('user123@company.org').toMatch(emailPattern);
  });

  test('Match date format: YYYY-MM-DD', async ({ page }) => {
    const datePattern = /\d{4}-\d{2}-\d{2}/;
    
    expect('2024-01-15').toMatch(datePattern);
    expect('Created: 2024-12-25').toMatch(datePattern);
  });
});

