import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo/login-page';
import { ProductsPage } from '../pages/saucedemo/products-page';
import { CartPage } from '../pages/saucedemo/cart-page';
import { CheckoutStepOnePage } from '../pages/saucedemo/checkout-step-one-page';
import { CheckoutStepTwoPage } from '../pages/saucedemo/checkout-step-two-page';
import { CheckoutCompletePage } from '../pages/saucedemo/checkout-complete-page';

/**
 * Custom Fixtures for SauceDemo Tests
 *
 * This file extends Playwright's base test with custom fixtures.
 * Fixtures provide automatic setup and teardown for test dependencies.
 *
 * Benefits of Fixtures:
 * - No manual object instantiation (new LoginPage(page))
 * - Automatic dependency injection
 * - Cleaner test code
 * - Reusable across test files
 * - Type-safe
 *
 * Usage:
 * import { test, expect } from './fixtures/saucedemo-fixtures';
 *
 * test('my test', async ({ loginPage, productsPage }) => {
 *   // loginPage and productsPage are automatically available!
 * });
 */

// Define custom fixture types
type SauceDemoFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  authenticatedPage: Page;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<SauceDemoFixtures>({
  /**
   * LoginPage fixture
   * Automatically creates a LoginPage instance for each test
   */
  loginPage: async ({ page }, use) => {
    // Setup: Create LoginPage instance
    const loginPage = new LoginPage(page);
    
    // Provide the fixture to the test
    await use(loginPage);
    
    // Teardown: Nothing to clean up for page objects
    // (page cleanup is handled by Playwright automatically)
  },

  /**
   * ProductsPage fixture
   * Automatically creates a ProductsPage instance for each test
   */
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  /**
   * CartPage fixture
   */
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /**
   * CheckoutStepOnePage fixture
   */
  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutPage = new CheckoutStepOnePage(page);
    await use(checkoutPage);
  },

  /**
   * CheckoutStepTwoPage fixture
   */
  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutStepTwoPage(page);
    await use(checkoutPage);
  },

  /**
   * CheckoutCompletePage fixture
   */
  checkoutCompletePage: async ({ page }, use) => {
    const completePage = new CheckoutCompletePage(page);
    await use(completePage);
  },

  /**
   * AuthenticatedPage fixture
   * Automatically logs in before the test starts
   * This is an example of a "setup fixture" that performs actions
   * 
   * Use this when you want to skip login UI and start testing from products page
   */
  authenticatedPage: async ({ page }, use) => {
    // Setup: Perform login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Wait for products page to load
    const productsPage = new ProductsPage(page);
    await productsPage.verifyPageLoaded();
    
    // Provide the authenticated page to the test
    await use(page);
    
    // Teardown: Logout (optional)
    // await productsPage.logout();
  },
});

// Re-export expect for convenience
export { expect };

/**
 * Example Usage:
 * 
 * // Without fixtures (traditional POM):
 * test('login test', async ({ page }) => {
 *   const loginPage = new LoginPage(page);  // Manual instantiation
 *   await loginPage.goto();
 *   await loginPage.login('user', 'pass');
 * });
 * 
 * // With fixtures (cleaner):
 * test('login test', async ({ loginPage }) => {
 *   await loginPage.goto();
 *   await loginPage.login('user', 'pass');
 * });
 * 
 * // With authenticated fixture (skip login):
 * test('products test', async ({ authenticatedPage, productsPage }) => {
 *   // Already logged in! Start testing products immediately
 *   await productsPage.verifyPageLoaded();
 *   const count = await productsPage.getProductCount();
 *   expect(count).toBe(6);
 * });
 */

