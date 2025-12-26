// pages/LoginPage.ts
import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;

    // Locators
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
    this.errorMessage  = page.getByTestId('error');
  }

  // Navigation
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page).toHaveURL(/saucedemo/);
  }

  // Actions

  //Type username 
  async typeUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  //Type password 
  async typePassword(password: string) {
    await this.passwordInput.fill(password);
  }

  //Click login button
  async clickLogin() {
    await this.loginButton.click();
  }

  //clear username field
  async clearUsername() {
    await this.usernameInput.clear();
  }
  //clear password field
  async clearPassword() {
    await this.passwordInput.clear();
  }
  //clear both username and password fields
  async clearCredentials() {
    await this.clearUsername();
    await this.clearPassword();
  }
  async login(username: string, password: string) {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLogin();
  }

  // Assertions
  async assertLoginError(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}