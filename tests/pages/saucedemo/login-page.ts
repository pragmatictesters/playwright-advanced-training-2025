import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model for SauceDemo Login Page
 * 
 * This class encapsulates all locators and actions related to the login page.
 * Benefits:
 * - Centralized locators (change in one place)
 * - Reusable methods across tests
 * - Cleaner test code
 * - Easier maintenance
 * 
 * URL: https://www.saucedemo.com/
 */
export class LoginPage {
  // Page object
  readonly page: Page;
  
  // Locators - defined once, used everywhere
  readonly loginLogo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.loginLogo = page.locator('.login_logo');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('.error-button');
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.loginLogo).toBeVisible();
  }

  /**
   * Perform login action
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Fill username only
   * @param username - Username to fill
   */
  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password only
   * @param password - Password to fill
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    await this.usernameInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.passwordInput.clear();
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
   * Verify error message contains text
   * @param text - Text to check for in error message
   */
  async expectErrorContaining(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  /**
   * Close error message
   */
  async closeError() {
    await this.errorButton.click();
    await expect(this.errorMessage).not.toBeVisible();
  }

  /**
   * Check if password is masked
   * @returns true if password input type is 'password'
   */
  async isPasswordMasked(): Promise<boolean> {
    const type = await this.passwordInput.getAttribute('type');
    return type === 'password';
  }

  /**
   * Verify login page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}

