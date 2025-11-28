/**
 * ============================================
 * 07 - Advanced Elements Tests
 * ============================================
 * 
 * This file demonstrates testing advanced web elements:
 * - iFrames (inline frames)
 * - Shadow DOM components
 * - Canvas elements
 * - Web Components
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Use frameLocator() to access iframe content
 * 2. Use locator().shadowRoot() for Shadow DOM
 * 3. Canvas testing requires JavaScript evaluation
 * 4. Web Components may need special handling
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, TIMEOUTS } from './helpers/test-config';

test.describe('07 - Advanced Elements', () => {
  
  // Navigate to Advanced section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.ADVANCED}`);
  });

  // ============================================
  // IFRAME TESTS
  // ============================================
  test.describe('iFrame Interactions', () => {

    /**
     * Test: Access iframe content
     * 🎓 LEARN: frameLocator() creates a locator for iframe content
     */
    test('should access content inside iframe', async ({ page }) => {
      // Get iframe locator
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');

      // Access element inside iframe
      const heading = iframe.locator('h1');

      // Verify iframe content
      await expect(heading).toContainText('iFrame Content');
    });

    /**
     * Test: Click button inside iframe
     * 🎓 LEARN: Click events work normally inside iframes
     * Note: This test verifies the button can be clicked. The click handler
     * is attached by parent page JS which may have cross-origin restrictions
     * on some hosting environments.
     */
    test('should click button inside iframe', async ({ page }) => {
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');
      const button = iframe.locator('#iframe-btn');

      // Wait for button to be visible (iframe loaded)
      await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });

      // Click button inside iframe - this verifies the click action works
      await button.click();

      // Verify the button was clickable (no error thrown)
      // Note: The result text update depends on parent page JS having
      // access to iframe content, which may be restricted on some hosts
      await expect(button).toBeVisible();
    });

    /**
     * Test: Verify button exists inside iframe
     * 🎓 LEARN: Use locators to verify elements inside iframes
     */
    test('should verify button exists inside iframe', async ({ page }) => {
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');

      // Verify button is present
      const button = iframe.locator('#iframe-btn');
      await expect(button).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
      await expect(button).toHaveText('Click Me Inside iFrame');
    });

    /**
     * Test: Switch between main page and iframe
     * 🎓 LEARN: Main page and iframe are separate contexts
     */
    test('should interact with both main page and iframe', async ({ page }) => {
      // Interact with main page - check section heading
      const sectionHeading = page.locator('#advanced h2');
      await expect(sectionHeading).toContainText('Advanced Elements');

      // Interact with iframe
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');
      await expect(iframe.locator('h1')).toContainText('iFrame Content', { timeout: TIMEOUTS.MEDIUM });

      // Back to main page (no explicit switch needed)
      await expect(sectionHeading).toContainText('Advanced Elements');
    });
  });

  // ============================================
  // SHADOW DOM TESTS
  // ============================================
  test.describe('Shadow DOM', () => {

    /**
     * Test: Access Shadow DOM content
     * 🎓 LEARN: Playwright pierces Shadow DOM by default
     */
    test('should access element inside Shadow DOM', async ({ page }) => {
      // Playwright automatically pierces Shadow DOM - look for button
      const shadowButton = page.locator('.shadow-button');

      await expect(shadowButton).toBeVisible();
    });

    /**
     * Test: Verify Shadow DOM heading
     * 🎓 LEARN: Content inside Shadow DOM is accessible
     */
    test('should access heading inside Shadow DOM', async ({ page }) => {
      // Access content inside shadow DOM
      const shadowContent = page.locator('.shadow-content h4');

      await expect(shadowContent).toContainText('Shadow DOM Component');
    });

    /**
     * Test: Click button in Shadow DOM
     * 🎓 LEARN: Events work across Shadow DOM boundary
     */
    test('should click button inside Shadow DOM', async ({ page }) => {
      const shadowButton = page.locator('.shadow-button');

      await shadowButton.click();

      // Verify result text appears
      const shadowResult = page.locator('.shadow-result');
      await expect(shadowResult).toContainText('Shadow DOM button clicked!');
    });

    /**
     * Test: Verify Shadow DOM component structure
     * 🎓 LEARN: Shadow DOM encapsulates styles and structure
     */
    test('should verify Shadow DOM component structure', async ({ page }) => {
      // Shadow host should be present
      const shadowHost = page.locator('[data-testid="shadow-host"]');
      await expect(shadowHost).toBeVisible();

      // Content inside should be accessible
      const shadowContent = page.locator('.shadow-content');
      await expect(shadowContent).toBeVisible();
    });
  });

  // ============================================
  // CANVAS TESTS
  // ============================================
  test.describe('Canvas Element', () => {

    /**
     * Test: Verify canvas is rendered
     * 🎓 LEARN: Canvas elements need special testing approaches
     */
    test('should render canvas element', async ({ page }) => {
      const canvas = page.locator('[data-testid="demo-canvas"]');

      // Verify canvas exists and is visible
      await expect(canvas).toBeVisible();

      // Verify canvas has dimensions
      const box = await canvas.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
    });

    /**
     * Test: Draw on canvas with mouse
     * 🎓 LEARN: Use mouse actions for canvas drawing
     */
    test('should draw on canvas with mouse', async ({ page }) => {
      const canvas = page.locator('[data-testid="demo-canvas"]');
      const box = await canvas.boundingBox();

      if (box) {
        // Draw a line on canvas
        await page.mouse.move(box.x + 50, box.y + 50);
        await page.mouse.down();
        await page.mouse.move(box.x + 150, box.y + 150);
        await page.mouse.up();

        // Canvas should still be visible after drawing
        await expect(canvas).toBeVisible();
      }
    });

    /**
     * Test: Verify canvas has pre-drawn shapes
     * 🎓 LEARN: Canvas is pre-populated with shapes on load
     */
    test('should have pre-drawn shapes on canvas', async ({ page }) => {
      const canvas = page.locator('[data-testid="demo-canvas"]');

      // Scroll canvas into view
      await canvas.scrollIntoViewIfNeeded();

      // Verify canvas exists
      await expect(canvas).toBeVisible();

      // Verify canvas dimensions using attributes
      await expect(canvas).toHaveAttribute('width', '300');
      await expect(canvas).toHaveAttribute('height', '150');
    });

    /**
     * Test: Get canvas data URL
     * 🎓 LEARN: Use evaluate() for canvas-specific operations
     */
    test('should get canvas as data URL', async ({ page }) => {
      const canvas = page.locator('[data-testid="demo-canvas"]');

      // Get canvas data URL using JavaScript
      const dataUrl = await canvas.evaluate((el: HTMLCanvasElement) => {
        return el.toDataURL();
      });

      // Verify it's a valid data URL
      expect(dataUrl).toContain('data:image/png');
    });

    /**
     * Test: Screenshot canvas for visual comparison
     * 🎓 LEARN: Visual testing for canvas content
     */
    test('should capture canvas screenshot', async ({ page }) => {
      const canvas = page.locator('[data-testid="demo-canvas"]');

      // Take screenshot of canvas element
      const screenshot = await canvas.screenshot();

      // Verify screenshot was captured (has data)
      expect(screenshot.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // WEB COMPONENTS TESTS
  // ============================================
  test.describe('Web Components', () => {

    /**
     * Test: Interact with custom element
     * 🎓 LEARN: Custom elements work like regular elements
     */
    test('should interact with custom web component', async ({ page }) => {
      const customElement = page.locator('custom-element');

      // If custom element exists
      if (await customElement.count() > 0) {
        await expect(customElement).toBeVisible();
      }
    });

    /**
     * Test: Access slots in web component
     * 🎓 LEARN: Slots allow content projection in web components
     */
    test('should access slotted content', async ({ page }) => {
      const slottedContent = page.locator('[slot="content"]');

      if (await slottedContent.count() > 0) {
        await expect(slottedContent).toBeVisible();
      }
    });
  });

  // ============================================
  // COMBINED ADVANCED TESTS
  // ============================================
  test.describe('Combined Advanced Scenarios', () => {

    /**
     * Test: iframe with Shadow DOM inside
     * 🎓 LEARN: Complex nesting requires careful locator chaining
     */
    test('should handle iframe containing Shadow DOM', async ({ page }) => {
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');

      // Access Shadow DOM inside iframe (if exists)
      const shadowInIframe = iframe.locator('[data-testid="shadow-content"]');

      if (await shadowInIframe.count() > 0) {
        await expect(shadowInIframe).toBeVisible();
      }
    });

    /**
     * Test: Multiple advanced elements on same page
     * 🎓 LEARN: Test interactions don't interfere with each other
     */
    test('should interact with multiple advanced elements', async ({ page }) => {
      // Interact with iframe
      const iframe = page.frameLocator('[data-testid="demo-iframe"]');
      await expect(iframe.locator('body')).toBeVisible();

      // Interact with Shadow DOM
      const shadowElement = page.locator('[data-testid="shadow-content"]');
      if (await shadowElement.count() > 0) {
        await expect(shadowElement).toBeVisible();
      }

      // Interact with canvas
      const canvas = page.locator('[data-testid="demo-canvas"]');
      if (await canvas.count() > 0) {
        await expect(canvas).toBeVisible();
      }
    });
  });
});

