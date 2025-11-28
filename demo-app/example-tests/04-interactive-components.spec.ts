/**
 * ============================================
 * 04 - Interactive Components Tests
 * ============================================
 * 
 * This file demonstrates testing interactive UI components:
 * - Modal dialogs (open, close, actions)
 * - Tab navigation
 * - Accordion panels
 * - Drag and drop
 * - Tooltips
 * - Toast notifications
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Modals may have multiple close methods (X button, Cancel, overlay click)
 * 2. Tabs require verifying both visibility and hidden states
 * 3. Drag and drop uses dragTo() or drag-related methods
 * 4. Toasts are time-sensitive - set appropriate timeouts
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, TIMEOUTS } from './helpers/test-config';

test.describe('04 - Interactive Components', () => {
  
  // Navigate to Interactive section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.INTERACTIVE}`);
  });

  // ============================================
  // MODAL DIALOG TESTS
  // ============================================
  test.describe('Modal Dialog', () => {
    
    /**
     * Test: Open modal dialog
     * 🎓 LEARN: Verify modal visibility with class or display style
     */
    test('should open modal when clicking trigger button', async ({ page }) => {
      // Click open modal button
      await page.click('[data-testid="open-modal"]');
      
      // Verify modal is visible (has 'show' class)
      await expect(page.locator('[data-testid="modal"]')).toHaveClass(/show/);
    });

    /**
     * Test: Close modal with X button
     * 🎓 LEARN: Modals typically have multiple close mechanisms
     */
    test('should close modal with X button', async ({ page }) => {
      // Open modal
      await page.click('[data-testid="open-modal"]');
      await expect(page.locator('[data-testid="modal"]')).toHaveClass(/show/);
      
      // Close with X button
      await page.click('[data-testid="modal-close"]');
      
      // Verify modal is hidden
      await expect(page.locator('[data-testid="modal"]')).not.toHaveClass(/show/);
    });

    /**
     * Test: Close modal with close (X) button
     * 🎓 LEARN: Test all ways to dismiss a modal
     */
    test('should close modal with close button again', async ({ page }) => {
      await page.click('[data-testid="open-modal"]');

      // Close with X button (modal doesn't have Cancel, only Confirm and X)
      await page.click('[data-testid="modal-close"]');

      await expect(page.locator('[data-testid="modal"]')).not.toHaveClass(/show/);
    });

    /**
     * Test: Confirm action in modal
     * 🎓 LEARN: Modal actions should trigger expected behaviors
     */
    test('should confirm action in modal', async ({ page }) => {
      await page.click('[data-testid="open-modal"]');
      
      // Click Confirm button
      await page.click('[data-testid="modal-confirm"]');
      
      // Modal should close after confirm
      await expect(page.locator('[data-testid="modal"]')).not.toHaveClass(/show/);
    });

    /**
     * Test: Verify modal content
     * 🎓 LEARN: Test modal contains expected elements
     */
    test('should display modal title and content', async ({ page }) => {
      await page.click('[data-testid="open-modal"]');

      // Verify modal has title (actual structure: .modal-content h2)
      await expect(page.locator('.modal-content h2')).toBeVisible();

      // Verify modal has content
      await expect(page.locator('.modal-content p')).toBeVisible();
    });
  });

  // ============================================
  // TAB NAVIGATION TESTS
  // ============================================
  test.describe('Tab Navigation', () => {
    
    /**
     * Test: Switch between tabs
     * 🎓 LEARN: Click tab button to show associated content
     */
    test('should switch to tab 2 when clicked', async ({ page }) => {
      // Click Tab 2
      await page.click('button[data-tab="tab2"]');
      
      // Tab 2 content should be visible
      await expect(page.locator('[data-testid="tab-2-content"]')).toBeVisible();
      
      // Tab 1 content should be hidden
      await expect(page.locator('[data-testid="tab-1-content"]')).not.toBeVisible();
    });

    /**
     * Test: Tab 3 navigation
     * 🎓 LEARN: Verify all tabs work
     */
    test('should switch to tab 3 when clicked', async ({ page }) => {
      await page.click('button[data-tab="tab3"]');
      
      await expect(page.locator('[data-testid="tab-3-content"]')).toBeVisible();
      await expect(page.locator('[data-testid="tab-1-content"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="tab-2-content"]')).not.toBeVisible();
    });

    /**
     * Test: Active tab styling
     * 🎓 LEARN: Active tab should have visual indicator
     */
    test('should highlight active tab', async ({ page }) => {
      const tab2Button = page.locator('button[data-tab="tab2"]');
      
      await tab2Button.click();
      
      // Verify tab has active class or styling
      await expect(tab2Button).toHaveClass(/active/);
    });

    /**
     * Test: Navigate through all tabs sequentially
     * 🎓 LEARN: Test complete navigation flow
     */
    test('should navigate through all tabs', async ({ page }) => {
      // Tab 1 (default)
      await expect(page.locator('[data-testid="tab-1-content"]')).toBeVisible();

      // Tab 2
      await page.click('button[data-tab="tab2"]');
      await expect(page.locator('[data-testid="tab-2-content"]')).toBeVisible();

      // Tab 3
      await page.click('button[data-tab="tab3"]');
      await expect(page.locator('[data-testid="tab-3-content"]')).toBeVisible();

      // Back to Tab 1
      await page.click('button[data-tab="tab1"]');
      await expect(page.locator('[data-testid="tab-1-content"]')).toBeVisible();
    });
  });

  // ============================================
  // ACCORDION TESTS
  // ============================================
  test.describe('Accordion', () => {

    /**
     * Test: Expand accordion section
     * 🎓 LEARN: Accordion items expand to reveal content
     */
    test('should expand accordion when clicking header', async ({ page }) => {
      // Click accordion header
      await page.click('[data-testid="accordion-1"]');

      // Verify accordion item is expanded (has 'active' class)
      const accordionItem = page.locator('[data-testid="accordion-1"]').locator('..');
      await expect(accordionItem).toHaveClass(/active/);
    });

    /**
     * Test: Collapse accordion section
     * 🎓 LEARN: Clicking expanded accordion collapses it
     */
    test('should collapse accordion when clicking again', async ({ page }) => {
      const accordionHeader = page.locator('[data-testid="accordion-1"]');
      const accordionItem = accordionHeader.locator('..');

      // Expand
      await accordionHeader.click();
      await expect(accordionItem).toHaveClass(/active/);

      // Collapse
      await accordionHeader.click();
      await expect(accordionItem).not.toHaveClass(/active/);
    });

    /**
     * Test: Only one accordion open at a time (if configured)
     * 🎓 LEARN: Some accordions allow only one section open
     */
    test('should toggle between accordion sections', async ({ page }) => {
      // Open first accordion
      await page.click('[data-testid="accordion-1"]');

      // Open second accordion
      await page.click('[data-testid="accordion-2"]');

      // Verify second is expanded
      const accordion2Item = page.locator('[data-testid="accordion-2"]').locator('..');
      await expect(accordion2Item).toHaveClass(/active/);
    });
  });

  // ============================================
  // DRAG AND DROP TESTS
  // ============================================
  test.describe('Drag and Drop', () => {

    /**
     * Test: Drag item to drop zone
     * 🎓 LEARN: dragTo() is the simplest drag-and-drop method
     */
    test('should drag item to drop zone', async ({ page }) => {
      const dragItem = page.locator('[data-testid="drag-item-1"]');
      const dropZone = page.locator('[data-testid="drop-zone"]');

      // Perform drag and drop
      await dragItem.dragTo(dropZone);

      // Verify item is now in drop zone
      await expect(dropZone.locator('[data-testid="drag-item-1"]')).toBeVisible();
    });

    /**
     * Test: Multiple items can be dragged
     * 🎓 LEARN: Test multiple drag operations
     */
    test('should drag multiple items to drop zone', async ({ page }) => {
      const dropZone = page.locator('[data-testid="drop-zone"]');

      // Drag first item
      await page.locator('[data-testid="drag-item-1"]').dragTo(dropZone);

      // Drag second item
      await page.locator('[data-testid="drag-item-2"]').dragTo(dropZone);

      // Verify both items are in drop zone
      await expect(dropZone.locator('[data-testid="drag-item-1"]')).toBeVisible();
      await expect(dropZone.locator('[data-testid="drag-item-2"]')).toBeVisible();
    });

    /**
     * Test: Verify drag item has draggable attribute
     * 🎓 LEARN: Check HTML5 draggable attribute
     */
    test('should have draggable attribute', async ({ page }) => {
      const dragItem = page.locator('[data-testid="drag-item-1"]');

      await expect(dragItem).toHaveAttribute('draggable', 'true');
    });
  });

  // ============================================
  // TOAST NOTIFICATION TESTS
  // ============================================
  test.describe('Toast Notifications', () => {

    /**
     * Test: Show toast notification
     * 🎓 LEARN: Toast appears on trigger action
     */
    test('should show toast when triggered', async ({ page }) => {
      // Click show toast button
      await page.click('[data-testid="show-toast"]');

      // Verify toast is visible
      await expect(page.locator('[data-testid="toast"]')).toHaveClass(/show/);
    });

    /**
     * Test: Toast auto-hides after timeout
     * 🎓 LEARN: Set timeout to wait for toast to disappear
     */
    test('should auto-hide toast after timeout', async ({ page }) => {
      await page.click('[data-testid="show-toast"]');

      // Verify toast is shown
      await expect(page.locator('[data-testid="toast"]')).toHaveClass(/show/);

      // Wait for toast to auto-hide (typically 3 seconds)
      await expect(page.locator('[data-testid="toast"]'))
        .not.toHaveClass(/show/, { timeout: TIMEOUTS.MEDIUM });
    });

    /**
     * Test: Toast displays correct message
     * 🎓 LEARN: Verify toast content
     */
    test('should display message in toast', async ({ page }) => {
      await page.click('[data-testid="show-toast"]');

      // Verify toast contains message
      await expect(page.locator('#toast-message')).toBeVisible();
      const message = await page.locator('#toast-message').textContent();
      expect(message).toBeTruthy();
    });
  });

  // ============================================
  // TOOLTIP TESTS
  // ============================================
  test.describe('Tooltips', () => {

    /**
     * Test: Show tooltip on hover
     * 🎓 LEARN: hover() triggers mouseenter events
     */
    test('should show tooltip on hover', async ({ page }) => {
      // Hover over the tooltip trigger button
      const tooltipTrigger = page.locator('[data-testid="show-tooltip"]');

      // Hover over element
      await tooltipTrigger.hover();

      // Verify tooltip is visible
      await expect(page.locator('[data-testid="tooltip"]')).toBeVisible();
    });

    /**
     * Test: Hide tooltip when mouse leaves
     * 🎓 LEARN: Moving mouse away hides tooltip
     */
    test('should hide tooltip when not hovering', async ({ page }) => {
      const tooltipTrigger = page.locator('[data-testid="show-tooltip"]');
      const tooltip = page.locator('[data-testid="tooltip"]');

      // Hover to show tooltip
      await tooltipTrigger.hover();
      await expect(tooltip).toHaveClass(/show/);

      // Move mouse away by hovering on a different element (triggers mouseleave)
      await page.locator('[data-testid="open-modal"]').hover();

      // Tooltip should not have 'show' class after mouseleave
      await expect(tooltip).not.toHaveClass(/show/, { timeout: 3000 });
    });
  });
});

