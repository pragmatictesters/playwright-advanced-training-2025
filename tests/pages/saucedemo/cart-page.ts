import { Page, Locator, expect } from '@playwright/test';

/**
 * CartPage - Page Object Model for SauceDemo Cart Page
 * 
 * This class encapsulates all locators and actions related to the shopping cart.
 * 
 * URL: https://www.saucedemo.com/cart.html
 */
export class CartPage {
  // Page object
  readonly page: Page;
  
  // Locators
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButtons = page.locator('[data-test^="remove-"]');
  }

  /**
   * Navigate to cart page directly
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  /**
   * Verify cart page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.pageTitle).toContainText('Your Cart');
  }

  /**
   * Get number of items in cart
   * @returns Number of cart items
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get cart item names
   * @returns Array of product names in cart
   */
  async getCartItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
      if (name) names.push(name);
    }
    return names;
  }

  /**
   * Verify specific product is in cart
   * @param productName - Name of the product
   */
  async verifyProductInCart(productName: string) {
    const product = this.page.locator('.inventory_item_name', { hasText: productName });
    await expect(product).toBeVisible();
  }

  /**
   * Remove item from cart by name
   * @param productName - Name of the product to remove
   */
  async removeItem(productName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  /**
   * Click continue shopping button
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Click checkout button
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Verify cart is empty
   */
  async verifyCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  /**
   * Get item price by product name
   * @param productName - Name of the product
   * @returns Price as string (e.g., "$29.99")
   */
  async getItemPrice(productName: string): Promise<string> {
    const item = this.cartItems.filter({ hasText: productName });
    const price = await item.locator('.inventory_item_price').textContent();
    return price || '';
  }
}

