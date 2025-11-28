/**
 * ❌ BEFORE REFACTORING
 * =====================
 * This file demonstrates common code smells in test automation.
 * Compare with after-refactoring.spec.ts to see improvements.
 * 
 * 🚨 Code Smells in this file:
 * - Duplicate code (same URL, same selectors)
 * - Magic strings (hardcoded values)
 * - Unclear test names
 * - Long tests doing too much
 * - No reusable helpers
 */

import { test, expect } from '@playwright/test';

// ❌ BAD: Hardcoded URL repeated everywhere
// ❌ BAD: Magic string - what does this URL mean?

test('test1', async ({ page }) => {
  // ❌ BAD: Test name doesn't describe what it tests
  
  await page.goto('https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/');
  
  // ❌ BAD: Same selectors duplicated
  await page.locator('input[data-testid="text-input"]').fill('Hello World');
  await page.locator('button[data-testid="primary-button"]').click();
  
  // ❌ BAD: Magic string in assertion
  await expect(page.locator('div[data-testid="basics-result"]')).toContainText('Hello World');
});

test('test2', async ({ page }) => {
  // ❌ BAD: Another unclear test name
  
  // ❌ BAD: Same URL copy-pasted again
  await page.goto('https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/');
  
  // ❌ BAD: Same selectors copy-pasted again
  await page.locator('input[data-testid="text-input"]').fill('Test Input');
  await page.locator('input[data-testid="text-input"]').clear();
  await page.locator('input[data-testid="text-input"]').fill('Updated Value');
  
  await expect(page.locator('input[data-testid="text-input"]')).toHaveValue('Updated Value');
});

test('form test', async ({ page }) => {
  // ❌ BAD: Vague test name
  
  // ❌ BAD: URL repeated for the 3rd time
  await page.goto('https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/');
  
  // ❌ BAD: Magic number - why click this tab?
  await page.locator('button[data-section="forms"]').click();
  
  // ❌ BAD: Long selector with no explanation
  await page.locator('select[data-testid="dropdown"]').selectOption('option1');
  await page.locator('input[data-testid="checkbox-1"]').check();
  await page.locator('input[data-testid="checkbox-2"]').check();
  await page.locator('input[value="radio1"]').check();
  
  // ❌ BAD: Multiple unrelated assertions in one test
  await expect(page.locator('select[data-testid="dropdown"]')).toHaveValue('option1');
  await expect(page.locator('input[data-testid="checkbox-1"]')).toBeChecked();
  await expect(page.locator('input[data-testid="checkbox-2"]')).toBeChecked();
  await expect(page.locator('input[value="radio1"]')).toBeChecked();
});

test('buttons', async ({ page }) => {
  // ❌ BAD: Name doesn't explain what's being tested
  
  await page.goto('https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/');
  
  // ❌ BAD: No helper for repeated button checks
  await expect(page.locator('button[data-testid="primary-button"]')).toBeEnabled();
  await expect(page.locator('button[data-testid="primary-button"]')).toBeVisible();
  await expect(page.locator('button#disabled-btn')).toBeDisabled();
});

test('textarea', async ({ page }) => {
  await page.goto('https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/');
  
  // ❌ BAD: More duplicated selectors
  await page.locator('textarea[data-testid="textarea-input"]').fill('Line 1\nLine 2\nLine 3');
  await expect(page.locator('textarea[data-testid="textarea-input"]')).toHaveValue('Line 1\nLine 2\nLine 3');
});

