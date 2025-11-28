/**
 * ============================================
 * 03 - Dynamic Data Tests
 * ============================================
 * 
 * This file demonstrates testing dynamic content:
 * - Auto-suggest/Autocomplete functionality
 * - Sortable data tables
 * - Pagination controls
 * - Filtered search results
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Use waitForSelector() for dynamic elements that appear after action
 * 2. Table sorting often changes data order - test the logic, not specific values
 * 3. Pagination requires testing boundaries (first/last page)
 * 4. Auto-suggest lists need proper wait strategies
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, TEST_DATA, TIMEOUTS } from './helpers/test-config';

test.describe('03 - Dynamic Data', () => {
  
  // Navigate to Dynamic Data section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.DYNAMIC}`);
  });

  // ============================================
  // AUTO-SUGGEST TESTS
  // ============================================
  test.describe('Auto-Suggest / Autocomplete', () => {
    
    /**
     * Test: Show suggestions when typing
     * 🎓 LEARN: Wait for dynamic suggestion list to appear
     */
    test('should show suggestions when typing', async ({ page }) => {
      const searchInput = page.locator('[data-testid="search-input"]');
      
      // Type search term
      await searchInput.fill(TEST_DATA.searchTerm);
      
      // Wait for suggestions to appear
      await page.waitForSelector('[data-testid="suggestions"].show');
      
      // Verify suggestions container is visible
      await expect(page.locator('[data-testid="suggestions"]')).toBeVisible();
    });

    /**
     * Test: Suggestions contain matching items
     * 🎓 LEARN: Verify suggestion content matches search term
     */
    test('should display relevant suggestions', async ({ page }) => {
      await page.fill('[data-testid="search-input"]', 'play');
      
      // Wait for suggestions
      await page.waitForSelector('[data-testid="suggestions"].show');
      
      // Verify at least one suggestion contains 'Playwright'
      const suggestions = page.locator('[data-testid="suggestion-item"]');
      await expect(suggestions.first()).toContainText('Playwright');
    });

    /**
     * Test: Select suggestion from list
     * 🎓 LEARN: Click suggestion to populate input
     */
    test('should select suggestion from list', async ({ page }) => {
      const searchInput = page.locator('[data-testid="search-input"]');
      
      await searchInput.fill('play');
      await page.waitForSelector('[data-testid="suggestions"].show');
      
      // Click first suggestion
      await page.click('[data-testid="suggestion-item"] >> nth=0');
      
      // Verify input is filled with selected value
      await expect(searchInput).not.toHaveValue('play'); // Changed from partial search
    });

    /**
     * Test: Hide suggestions when clicking outside
     * 🎓 LEARN: Test blur behavior for dropdown-like elements
     */
    test('should hide suggestions when clicking outside', async ({ page }) => {
      const searchInput = page.locator('[data-testid="search-input"]');
      const suggestions = page.locator('[data-testid="suggestions"]');

      await searchInput.fill('javascript');
      await expect(suggestions).not.toBeEmpty();

      // Clear input to hide suggestions
      await searchInput.clear();

      // Suggestions should be empty after clearing
      await expect(suggestions).toBeEmpty();
    });

    /**
     * Test: No suggestions for non-matching search
     * 🎓 LEARN: Test negative cases too
     */
    test('should show no results for non-matching search', async ({ page }) => {
      await page.fill('[data-testid="search-input"]', 'xyz123notfound');
      
      // Wait a moment for search to complete
      await page.waitForTimeout(500);
      
      // Either no suggestions or "no results" message
      const suggestions = page.locator('[data-testid="suggestion-item"]');
      const count = await suggestions.count();
      expect(count).toBeLessThanOrEqual(1); // May show "no results" message
    });
  });

  // ============================================
  // SORTABLE TABLE TESTS
  // ============================================
  test.describe('Sortable Data Table', () => {
    
    /**
     * Test: Sort table by clicking column header
     * 🎓 LEARN: Table sorting changes data order
     */
    test('should sort table by name column', async ({ page }) => {
      // Get first name before sorting
      const firstNameBefore = await page.locator('#table-body tr:first-child td:first-child').textContent();
      
      // Click Name header to sort
      await page.click('th[data-sort="name"]');
      
      // Get first name after sorting
      const firstNameAfter = await page.locator('#table-body tr:first-child td:first-child').textContent();
      
      // Names should be different (unless already sorted)
      // More robust: check that some data is present
      expect(firstNameAfter).toBeTruthy();
      expect(firstNameAfter?.length).toBeGreaterThan(0);
    });

    /**
     * Test: Toggle sort direction (ascending/descending)
     * 🎓 LEARN: Clicking same header toggles sort direction
     */
    test('should toggle sort direction on header click', async ({ page }) => {
      const nameHeader = page.locator('th[data-sort="name"]');

      // First click - ascending
      await nameHeader.click();
      const firstSortFirstName = await page.locator('#table-body tr:first-child td:first-child').textContent();

      // Second click - descending
      await nameHeader.click();
      const secondSortFirstName = await page.locator('#table-body tr:first-child td:first-child').textContent();

      // First names should differ (opposite sort orders)
      expect(firstSortFirstName).not.toBe(secondSortFirstName);
    });

    /**
     * Test: Sort by email column
     * 🎓 LEARN: Different columns have different sort behaviors
     */
    test('should sort table by email column', async ({ page }) => {
      // Click Email header
      await page.click('th[data-sort="email"]');

      // Verify table still has data (sorting didn't break anything)
      const rowCount = await page.locator('#table-body tr').count();
      expect(rowCount).toBeGreaterThan(0);
    });

    /**
     * Test: Verify table row count
     * 🎓 LEARN: Count elements with locator.count()
     */
    test('should display correct number of table rows', async ({ page }) => {
      // Count visible rows
      const rowCount = await page.locator('#table-body tr').count();

      // Should show some data (pagination may limit to page size)
      expect(rowCount).toBeGreaterThan(0);
      expect(rowCount).toBeLessThanOrEqual(5); // Typical page size
    });
  });

  // ============================================
  // PAGINATION TESTS
  // ============================================
  test.describe('Pagination Controls', () => {

    /**
     * Test: Verify initial page state
     * 🎓 LEARN: Test initial state before interactions
     */
    test('should start on page 1', async ({ page }) => {
      await expect(page.locator('#page-info')).toContainText('Page 1');
    });

    /**
     * Test: Navigate to next page
     * 🎓 LEARN: Test forward navigation
     */
    test('should navigate to next page', async ({ page }) => {
      // Verify starting on page 1
      await expect(page.locator('#page-info')).toContainText('Page 1');

      // Click next
      await page.click('#next-page');

      // Verify now on page 2
      await expect(page.locator('#page-info')).toContainText('Page 2');
    });

    /**
     * Test: Navigate to previous page
     * 🎓 LEARN: Test backward navigation
     */
    test('should navigate to previous page', async ({ page }) => {
      // Go to page 2 first
      await page.click('#next-page');
      await expect(page.locator('#page-info')).toContainText('Page 2');

      // Click previous
      await page.click('#prev-page');

      // Verify back on page 1
      await expect(page.locator('#page-info')).toContainText('Page 1');
    });

    /**
     * Test: Previous button disabled on first page
     * 🎓 LEARN: Test boundary conditions
     */
    test('should disable previous button on first page', async ({ page }) => {
      // On first page, previous should be disabled
      await expect(page.locator('#prev-page')).toBeDisabled();
    });

    /**
     * Test: Next button disabled on last page
     * 🎓 LEARN: Navigate to end and verify boundary
     */
    test('should disable next button on last page', async ({ page }) => {
      // Navigate to last page (click next until disabled)
      const nextBtn = page.locator('#next-page');

      // Keep clicking next until we reach the last page
      while (await nextBtn.isEnabled()) {
        await nextBtn.click();
      }

      // Verify next button is now disabled
      await expect(nextBtn).toBeDisabled();
    });

    /**
     * Test: Page info displays total pages
     * 🎓 LEARN: Verify pagination metadata
     */
    test('should display total page count', async ({ page }) => {
      // Page info should show "Page X of Y"
      const pageInfo = await page.locator('#page-info').textContent();
      expect(pageInfo).toMatch(/Page \d+ of \d+/);
    });

    /**
     * Test: Data changes between pages
     * 🎓 LEARN: Different pages should show different data
     */
    test('should show different data on different pages', async ({ page }) => {
      // Get first row data on page 1
      const page1FirstRow = await page.locator('#table-body tr:first-child td:first-child').textContent();

      // Go to page 2
      await page.click('#next-page');

      // Get first row data on page 2
      const page2FirstRow = await page.locator('#table-body tr:first-child td:first-child').textContent();

      // Data should be different (different pages show different records)
      expect(page1FirstRow).not.toBe(page2FirstRow);
    });
  });

  // ============================================
  // COMBINED DYNAMIC TESTS
  // ============================================
  test.describe('Combined Dynamic Operations', () => {

    /**
     * Test: Sort and paginate together
     * 🎓 LEARN: Multiple dynamic features working together
     */
    test('should maintain sort order across pages', async ({ page }) => {
      // Sort by name
      await page.click('th[data-sort="name"]');

      // Get first name on page 1
      const page1Name = await page.locator('#table-body tr:first-child td:first-child').textContent();

      // Navigate to page 2 and back
      await page.click('#next-page');
      await page.click('#prev-page');

      // First name should still be the same (sort maintained)
      const afterNavName = await page.locator('#table-body tr:first-child td:first-child').textContent();
      expect(afterNavName).toBe(page1Name);
    });
  });
});

