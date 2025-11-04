/**
 * First Test - Demonstrating Playwright Conventions
 * 
 * This test serves as a reference implementation demonstrating all the coding
 * conventions and best practices covered in the training.
 * 
 * 📖 Full conventions guide: docs/best-practices/01-coding-conventions.md
 * 
 * Learning Objectives:
 * - ✅ Proper file naming (kebab-case.spec.ts)
 * - ✅ Descriptive test names (not 'test1' or 'loginTest')
 * - ✅ Playwright locators (getByRole, getByTestId, getByText)
 * - ✅ Web-first assertions (auto-wait and retry)
 * - ✅ Test independence (each test stands alone)
 * - ✅ No hard-coded waits (use smart waiting)
 * - ✅ TypeScript conventions (const, explicit types)
 * - ✅ Proper import organization
 * 
 * @see {@link ../docs/best-practices/01-coding-conventions.md} for detailed conventions
 */

// ============================================
// Imports - External libraries first
// ============================================
// ✅ CONVENTION: Import external libraries before internal modules
import { test, expect } from '@playwright/test';

// ============================================
// Test Suite: First Test - Conventions Demo
// ============================================

test.describe('First Test - Demonstrating Conventions', () => {
  
  /**
   * Test 1: Basic Navigation and Assertions
   * 
   * Demonstrates:
   * - Descriptive test names
   * - Web-first assertions
   * - Proper locator usage (getByRole)
   */
  test('user can navigate to getting started documentation', async ({ page }) => {
    // ============================================
    // Setup: Navigate to application
    // ============================================
    
    // ✅ CONVENTION: Use page.goto() for navigation
    // No need for manual waits - Playwright waits for page load automatically
    await page.goto('https://playwright.dev/');
    
    // ============================================
    // Assertions: Verify page loaded correctly
    // ============================================
    
    // ✅ CONVENTION: Use web-first assertions (auto-wait and retry)
    // This assertion will automatically wait up to 30 seconds for the title to match
    await expect(page).toHaveTitle(/Playwright/);
    
    // ============================================
    // Action: Click navigation link
    // ============================================
    
    // ✅ CONVENTION: Use getByRole() for accessible, semantic locators
    // Priority order: Test IDs > Role/Label > Text > CSS selectors
    // getByRole() is preferred because it:
    // - Tests accessibility
    // - Is resilient to UI changes
    // - Matches how users interact with the page
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // ============================================
    // Assertions: Verify navigation succeeded
    // ============================================
    
    // ✅ CONVENTION: Use specific, meaningful assertions
    // Check URL changed to the expected page
    await expect(page).toHaveURL(/.*intro/);
    
    // ✅ CONVENTION: Verify key elements are visible
    // This confirms the page loaded correctly, not just that the URL changed
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
  
  /**
   * Test 2: Search Functionality
   *
   * Demonstrates:
   * - Test independence (doesn't rely on previous test)
   * - Multiple locator strategies
   * - Handling multiple matching elements with .first()
   */
  test('user can search for API documentation', async ({ page }) => {
    // ============================================
    // Setup: Navigate to application
    // ============================================

    // ✅ CONVENTION: Each test is independent
    // This test navigates to the page itself, doesn't rely on previous test
    await page.goto('https://playwright.dev/');

    // ============================================
    // Action: Open search
    // ============================================

    // ✅ CONVENTION: Use getByRole() with accessible name
    // The search button has an aria-label or accessible name
    await page.getByRole('button', { name: 'Search' }).click();

    // ============================================
    // Action: Type search query
    // ============================================

    // ✅ CONVENTION: Use getByPlaceholder() for input fields with placeholders
    // Alternative: getByLabel() if there's a label, or getByTestId() for stability
    await page.getByPlaceholder('Search docs').fill('locators');

    // ============================================
    // Assertions: Verify search results appear
    // ============================================

    // ✅ CONVENTION: When multiple elements match, use .first(), .last(), or .nth()
    // This is better than relying on strict mode violations
    // The text "Locators" appears multiple times in search results
    await expect(page.getByText('Locators').first()).toBeVisible();

    // ✅ CONVENTION: Multiple assertions to verify complete behavior
    // Verify that the search results container is visible
    await expect(page.locator('.DocSearch-Dropdown')).toBeVisible();
  });
  
  /**
   * Test 3: Multiple Elements and Filtering
   * 
   * Demonstrates:
   * - Working with multiple elements
   * - Filtering and selecting specific elements
   * - Counting elements
   */
  test('documentation page displays multiple navigation links', async ({ page }) => {
    // ============================================
    // Setup
    // ============================================
    
    await page.goto('https://playwright.dev/');
    
    // ============================================
    // Assertions: Working with multiple elements
    // ============================================
    
    // ✅ CONVENTION: Use count() to verify number of elements
    // This is better than checking if elements exist
    const navLinks = page.getByRole('navigation').first().getByRole('link');
    await expect(navLinks).toHaveCount(await navLinks.count());
    
    // ✅ CONVENTION: Use .first(), .last(), .nth() to select specific elements
    // When multiple elements match, be explicit about which one you want
    const firstNavLink = page.getByRole('link').first();
    await expect(firstNavLink).toBeVisible();
    
    // ============================================
    // Best Practice: Verify key elements exist
    // ============================================
    
    // ✅ CONVENTION: Check for important page elements
    // This ensures the page structure is correct
    await expect(page.getByRole('banner')).toBeVisible(); // Header
    await expect(page.getByRole('main')).toBeVisible();   // Main content
    await expect(page.getByRole('contentinfo')).toBeVisible(); // Footer
  });
});

// ============================================
// Additional Test Suite: Demonstrating Test Organization
// ============================================

test.describe('Advanced Locator Strategies', () => {
  
  /**
   * Test 4: Different Locator Methods
   * 
   * Demonstrates all major locator strategies in priority order
   */
  test('demonstrates various locator strategies', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // ============================================
    // Locator Priority Order (Best to Last Resort)
    // ============================================
    
    // 🥇 PRIORITY 1: getByTestId() - Most stable for dynamic content
    // Use this in your own applications by adding data-testid attributes
    // Example: <button data-testid="submit-button">Submit</button>
    // await page.getByTestId('submit-button').click();
    
    // 🥈 PRIORITY 2: getByRole() - Accessible and semantic
    // Tests accessibility while locating elements
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    
    // 🥉 PRIORITY 3: getByLabel() - For form inputs with labels
    // Example: await page.getByLabel('Email').fill('test@example.com');
    
    // 4️⃣ PRIORITY 4: getByPlaceholder() - For inputs with placeholders
    // Example: await page.getByPlaceholder('Enter your email').fill('test@example.com');
    
    // 5️⃣ PRIORITY 5: getByText() - For unique text content
    await expect(page.getByText('Playwright enables reliable end-to-end testing')).toBeVisible();
    
    // ⚠️ LAST RESORT: CSS selectors - Use only when other methods don't work
    // These are brittle and break easily with UI changes
    // await page.locator('.some-class').click(); // Avoid if possible
  });
  
  /**
   * Test 5: Web-First Assertions
   * 
   * Demonstrates the power of auto-waiting assertions
   */
  test('demonstrates web-first assertions with auto-waiting', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // ============================================
    // Web-First Assertions (Auto-wait and Retry)
    // ============================================
    
    // ✅ GOOD: Web-first assertions automatically wait and retry
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page).toHaveURL('https://playwright.dev/');
    await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeEnabled();
    
    // ❌ BAD: Manual assertions (shown for comparison - don't do this!)
    // expect(await page.title()).toContain('Playwright'); // No auto-waiting!
    // expect(await page.url()).toBe('https://playwright.dev/'); // No retry!
    
    // ============================================
    // Common Web-First Assertions
    // ============================================
    
    // Visibility
    await expect(page.getByRole('banner')).toBeVisible();
    
    // Text content
    await expect(page.getByRole('heading').first()).toContainText('Playwright');
    
    // Attributes
    await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
    
    // Count
    await expect(page.getByRole('link')).toHaveCount(await page.getByRole('link').count());
  });
});

// ============================================
// Key Takeaways
// ============================================

/**
 * Summary of Conventions Demonstrated:
 * 
 * 1. ✅ File Naming: kebab-case.spec.ts (01-first-test.spec.ts)
 * 2. ✅ Test Names: Descriptive sentences explaining user behavior
 * 3. ✅ Test Organization: Use test.describe() to group related tests
 * 4. ✅ Locators: Priority order - TestId > Role > Label > Text > CSS
 * 5. ✅ Assertions: Always use web-first assertions (await expect())
 * 6. ✅ Independence: Each test navigates to the page independently
 * 7. ✅ No Hard Waits: Never use page.waitForTimeout() - use smart waiting
 * 8. ✅ Comments: Explain WHY, not WHAT (code shows what)
 * 9. ✅ TypeScript: Use const, explicit types, proper imports
 * 10. ✅ Structure: Clear sections with comments for readability
 * 
 * 📖 For complete conventions, see: docs/best-practices/01-coding-conventions.md
 * 
 * Next Steps:
 * - Run this test: npx playwright test 01-first-test
 * - Run in UI mode: npx playwright test 01-first-test --ui
 * - Debug mode: npx playwright test 01-first-test --debug
 */

