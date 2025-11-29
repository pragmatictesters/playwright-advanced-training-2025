import { Page, Locator, expect } from '@playwright/test';

/**
 * CheckoutCompletePage - Page Object Model for SauceDemo Checkout Complete
 * 
 * This page is shown after successful order completion.
 * 
 * URL: https://www.saucedemo.com/checkout-complete.html
 */
export class CheckoutCompletePage {
  // Page object
  readonly page: Page;
  
  // Locators
  readonly pageTitle: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Verify checkout complete page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.pageTitle).toContainText('Checkout: Complete!');
  }

  /**
   * Verify order completion success message
   */
  async verifyOrderSuccess() {
    await expect(this.completeHeader).toContainText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.ponyExpressImage).toBeVisible();
  }

  /**
   * Get success header text
   * @returns Header text
   */
  async getSuccessHeader(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  /**
   * Get success message text
   * @returns Success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.completeText.textContent() || '';
  }

  /**
   * Click back home button
   */
  async backToProducts() {
    await this.backHomeButton.click();
  }

  /**
   * Verify complete checkout flow success
   * Combines page load and success message verification
   */
  async verifyCheckoutComplete() {
    await this.verifyPageLoaded();
    await this.verifyOrderSuccess();
  }
}

