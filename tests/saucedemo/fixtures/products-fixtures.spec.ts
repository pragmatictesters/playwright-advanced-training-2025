import { test, expect } from '../../fixtures/saucedemo-fixtures';

/**
 * SauceDemo Products Tests - Using Authenticated Fixture
 * 
 * This file demonstrates using the authenticatedPage fixture.
 * This fixture automatically logs in before each test, so you can
 * skip the login UI and start testing products immediately.
 * 
 * Benefits:
 * - Faster tests (skip repetitive login UI)
 * - Focus on testing products, not login
 * - Cleaner test code
 * 
 * Use this pattern when:
 * - Testing features that require authentication
 * - Login is not the focus of the test
 * - You want faster test execution
 */

test.describe('SauceDemo - Products Tests (Authenticated)', () => {
  
  test('should display 6 products after login', async ({ authenticatedPage, productsPage }) => {
    // Already logged in! No need to call loginPage.login()
    
    // Verify products page is loaded
    await productsPage.verifyPageLoaded();
    
    // Get product count
    const count = await productsPage.getProductCount();
    expect(count).toBe(6);
  });

  test('should display correct page title', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Verify title
    await productsPage.verifyTitle('Products');
  });

  test('should have shopping cart visible', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Verify shopping cart
    await productsPage.verifyShoppingCartVisible();
  });

  test('should add product to cart', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Verify initial cart is empty
    const initialCount = await productsPage.getCartItemCount();
    expect(initialCount).toBe(0);
    
    // Add product to cart
    await productsPage.addProductToCart('sauce-labs-backpack');
    
    // Verify cart count increased
    const newCount = await productsPage.getCartItemCount();
    expect(newCount).toBe(1);
  });

  test('should remove product from cart', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Add product first
    await productsPage.addProductToCart('sauce-labs-backpack');
    
    // Verify cart has 1 item
    let count = await productsPage.getCartItemCount();
    expect(count).toBe(1);
    
    // Remove product
    await productsPage.removeProductFromCart('sauce-labs-backpack');
    
    // Verify cart is empty
    count = await productsPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('should add multiple products to cart', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Add multiple products
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');
    await productsPage.addProductToCart('sauce-labs-bolt-t-shirt');
    
    // Verify cart count
    const count = await productsPage.getCartItemCount();
    expect(count).toBe(3);
  });

  test('should logout successfully', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Logout
    await productsPage.logout();
    
    // Verify redirected to login page
    await expect(authenticatedPage).toHaveURL('https://www.saucedemo.com/');
  });

  test('should display all product names', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    
    // Get all product names
    const productCount = await productsPage.getProductCount();
    
    // Verify we can get each product name
    for (let i = 0; i < productCount; i++) {
      const name = await productsPage.getProductName(i);
      expect(name).toBeTruthy(); // Name should not be empty
    }
  });
});

/**
 * COMPARISON: Regular Fixture vs Authenticated Fixture
 * 
 * Without Authenticated Fixture:
 * ----------------------------------------
 * test('products test', async ({ loginPage, productsPage }) => {
 *   await loginPage.goto();
 *   await loginPage.login('user', 'pass');  // Login UI every test!
 *   await productsPage.verifyPageLoaded();
 *   // Test products...
 * });
 * 
 * With Authenticated Fixture:
 * ----------------------------------------
 * test('products test', async ({ authenticatedPage, productsPage }) => {
 *   // Already logged in! Skip login UI!
 *   await productsPage.verifyPageLoaded();
 *   // Test products...
 * });
 * 
 * Benefits:
 * ✅ Faster tests (no login UI)
 * ✅ Focus on what you're testing
 * ✅ Less code duplication
 * ✅ More reliable (less UI interaction)
 */

