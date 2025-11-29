import { Page, Locator, expect } from '@playwright/test';

/**
 * CheckoutStepTwoPage - Page Object Model for SauceDemo Checkout Step Two (Overview)
 * 
 * This is the second checkout step where user reviews order before completing.
 * 
 * URL: https://www.saucedemo.com/checkout-step-two.html
 */
export class CheckoutStepTwoPage {
  // Page object
  readonly page: Page;
  
  // Locators
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly totalPrice: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.totalPrice = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.paymentInfo = page.locator('.summary_value_label').first();
    this.shippingInfo = page.locator('.summary_value_label').nth(1);
  }

  /**
   * Verify checkout step two page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.pageTitle).toContainText('Checkout: Overview');
  }

  /**
   * Get number of items in checkout
   * @returns Number of items
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get subtotal (item total before tax)
   * @returns Subtotal as string (e.g., "Item total: $29.99")
   */
  async getSubtotal(): Promise<string> {
    return await this.itemTotal.textContent() || '';
  }

  /**
   * Get tax amount
   * @returns Tax as string (e.g., "Tax: $2.40")
   */
  async getTax(): Promise<string> {
    return await this.tax.textContent() || '';
  }

  /**
   * Get total price
   * @returns Total as string (e.g., "Total: $32.39")
   */
  async getTotal(): Promise<string> {
    return await this.totalPrice.textContent() || '';
  }

  /**
   * Verify product is in checkout summary
   * @param productName - Name of the product
   */
  async verifyProductInSummary(productName: string) {
    const product = this.page.locator('.inventory_item_name', { hasText: productName });
    await expect(product).toBeVisible();
  }

  /**
   * Click finish button to complete order
   */
  async finishOrder() {
    await this.finishButton.click();
  }

  /**
   * Click cancel button
   */
  async cancelOrder() {
    await this.cancelButton.click();
  }

  /**
   * Get payment information
   * @returns Payment info text
   */
  async getPaymentInfo(): Promise<string> {
    return await this.paymentInfo.textContent() || '';
  }

  /**
   * Get shipping information
   * @returns Shipping info text
   */
  async getShippingInfo(): Promise<string> {
    return await this.shippingInfo.textContent() || '';
  }
}

