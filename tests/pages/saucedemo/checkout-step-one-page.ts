import { Page, Locator, expect } from '@playwright/test';

/**
 * CheckoutStepOnePage - Page Object Model for SauceDemo Checkout Step One
 * 
 * This is the first checkout step where user enters shipping information.
 * 
 * URL: https://www.saucedemo.com/checkout-step-one.html
 */
export class CheckoutStepOnePage {
  // Page object
  readonly page: Page;
  
  // Locators
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('.error-button');
  }

  /**
   * Verify checkout step one page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.pageTitle).toContainText('Checkout: Your Information');
  }

  /**
   * Fill checkout information
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal/Zip code
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.cancelButton.click();
  }

  /**
   * Complete checkout step one (fill info and continue)
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal/Zip code
   */
  async completeStepOne(firstName: string, lastName: string, postalCode: string) {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  /**
   * Verify error message is displayed
   * @param expectedMessage - Expected error message text
   */
  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Close error message
   */
  async closeError() {
    await this.errorButton.click();
    await expect(this.errorMessage).not.toBeVisible();
  }
}

