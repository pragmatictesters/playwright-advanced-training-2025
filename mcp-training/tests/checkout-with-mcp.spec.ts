/**
 * 🧪 Playwright Test with MCP Integration
 * 
 * This test demonstrates how to use MCP tools in Playwright tests.
 * 
 * KEY POINTS:
 * 1. MCP provides TEST DATA (checkout info)
 * 2. Playwright controls the BROWSER (navigation, clicks, fills)
 * 3. Clear separation of concerns
 * 
 * @author Playwright Training Team
 */

import { test, expect } from '@playwright/test';
import { McpTestClient, CheckoutData } from '../src/mcp-client.js';

// =============================================================================
// MCP CLIENT SETUP
// =============================================================================

/**
 * MCP client instance - shared across tests
 * 
 * WHY SHARED?
 * - Creating connections is expensive
 * - One connection for all tests in this file
 * - Clean disconnect after all tests
 */
let mcpClient: McpTestClient;

// Connect to MCP before all tests
test.beforeAll(async () => {
  mcpClient = new McpTestClient();
  await mcpClient.connect();
});

// Disconnect after all tests
test.afterAll(async () => {
  await mcpClient.disconnect();
});

// Reset context before each test
test.beforeEach(async () => {
  await mcpClient.resetTestContext();
});

// =============================================================================
// TEST DATA (from MCP)
// =============================================================================

/**
 * These are the EXPECTED values from MCP
 * 
 * Since MCP is deterministic, we know exactly what values to expect.
 * This makes our tests predictable and debuggable.
 */
const EXPECTED_CHECKOUT_DATA: CheckoutData = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
};

// =============================================================================
// SAUCE DEMO LOCATORS
// =============================================================================

/**
 * Page locators for Sauce Demo
 * 
 * Keeping locators separate makes tests more maintainable.
 * If a locator changes, update it in ONE place.
 */
const locators = {
  // Login page
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  
  // Inventory page
  addToCartBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
  cartBadge: '.shopping_cart_badge',
  cartLink: '.shopping_cart_link',
  
  // Cart page
  checkoutButton: '[data-test="checkout"]',
  
  // Checkout page
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  
  // Checkout overview
  finishButton: '[data-test="finish"]',
  
  // Confirmation
  completeHeader: '.complete-header',
};

// =============================================================================
// TESTS
// =============================================================================

test.describe('🛒 Sauce Demo Checkout with MCP', () => {

  /**
   * Test: Complete checkout flow using MCP data
   * 
   * This test shows the BOUNDARY between MCP and Playwright:
   * - MCP: Provides checkout data (firstName, lastName, postalCode)
   * - Playwright: Controls browser (navigate, click, fill, assert)
   */
  test('should complete checkout using MCP-generated data', async ({ page }) => {
    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1: Get checkout data from MCP
    // ─────────────────────────────────────────────────────────────────────────
    // 📦 MCP provides the test data
    // This is the ONLY place we call MCP in this test
    
    const checkoutData = await mcpClient.generateCheckoutData();
    
    // Verify MCP returned expected data (deterministic!)
    expect(checkoutData.firstName).toBe(EXPECTED_CHECKOUT_DATA.firstName);
    expect(checkoutData.lastName).toBe(EXPECTED_CHECKOUT_DATA.lastName);
    expect(checkoutData.postalCode).toBe(EXPECTED_CHECKOUT_DATA.postalCode);

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 2: Login (Playwright controls browser)
    // ─────────────────────────────────────────────────────────────────────────
    // 🎭 Playwright handles all browser actions from here
    
    await page.goto('https://www.saucedemo.com/');
    await page.fill(locators.username, 'standard_user');
    await page.fill(locators.password, 'secret_sauce');
    await page.click(locators.loginButton);
    
    // Verify login success
    await expect(page).toHaveURL(/inventory/);

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 3: Add item to cart
    // ─────────────────────────────────────────────────────────────────────────
    await page.click(locators.addToCartBackpack);
    await expect(page.locator(locators.cartBadge)).toHaveText('1');

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 4: Go to cart and checkout
    // ─────────────────────────────────────────────────────────────────────────
    await page.click(locators.cartLink);
    await page.click(locators.checkoutButton);

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 5: Fill checkout form with MCP data
    // ─────────────────────────────────────────────────────────────────────────
    // 📦 Using the data from MCP (Step 1)
    // 🎭 Playwright fills the form
    
    await page.fill(locators.firstName, checkoutData.firstName);
    await page.fill(locators.lastName, checkoutData.lastName);
    await page.fill(locators.postalCode, checkoutData.postalCode);
    await page.click(locators.continueButton);

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 6: Complete order
    // ─────────────────────────────────────────────────────────────────────────
    await page.click(locators.finishButton);

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 7: Verify success
    // ─────────────────────────────────────────────────────────────────────────
    await expect(page.locator(locators.completeHeader)).toHaveText(
      'Thank you for your order!'
    );
    
    console.log('✅ Checkout completed successfully with MCP data!');
  });

});

