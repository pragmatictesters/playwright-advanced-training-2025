/**
 * Day 4 Exercise: Checkout Flow Tests for SauceDemo
 * 
 * This file demonstrates:
 * - End-to-end happy path testing
 * - Multiple page objects working together
 * - Authenticated page fixture usage
 * - Real-world checkout flow testing
 * 
 * Learning Objectives:
 * - Chain multiple page objects in a flow
 * - Use fixtures for pre-authenticated state
 * - Test complete user journeys
 */

import { test, expect } from '../../fixtures/saucedemo-fixtures';

// Test data
const CHECKOUT_INFO = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345'
};

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt'
};

test.describe('SauceDemo Checkout Flow', () => {

  test.describe('Happy Path - Complete Purchase', () => {

    test('should complete checkout with single product', async ({ 
      authenticatedPage, 
      productsPage, 
      cartPage, 
      checkoutStepOnePage, 
      checkoutStepTwoPage, 
      checkoutCompletePage 
    }) => {
      // Step 1: Add product to cart
      await productsPage.addProductToCart(PRODUCTS.backpack);
      
      // Verify cart badge shows 1 item
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(1);

      // Step 2: Go to cart
      await productsPage.clickShoppingCart();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyProductInCart(PRODUCTS.backpack);

      // Step 3: Proceed to checkout
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.verifyPageLoaded();

      // Step 4: Fill checkout information
      await checkoutStepOnePage.completeStepOne(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );

      // Step 5: Verify order overview
      await checkoutStepTwoPage.verifyPageLoaded();
      await checkoutStepTwoPage.verifyProductInSummary(PRODUCTS.backpack);
      
      // Verify price information is displayed
      const total = await checkoutStepTwoPage.getTotal();
      expect(total).toContain('$');

      // Step 6: Complete order
      await checkoutStepTwoPage.finishOrder();
      
      // Step 7: Verify order completion
      await checkoutCompletePage.verifyCheckoutComplete();
      const successHeader = await checkoutCompletePage.getSuccessHeader();
      expect(successHeader).toBe('Thank you for your order!');
    });

    test('should complete checkout with multiple products', async ({ 
      authenticatedPage, 
      productsPage, 
      cartPage, 
      checkoutStepOnePage, 
      checkoutStepTwoPage, 
      checkoutCompletePage 
    }) => {
      // Add multiple products
      await productsPage.addProductToCart(PRODUCTS.backpack);
      await productsPage.addProductToCart(PRODUCTS.bikeLight);
      
      // Verify cart count
      const cartCount = await productsPage.getCartItemCount();
      expect(cartCount).toBe(2);

      // Complete checkout flow
      await productsPage.clickShoppingCart();
      await cartPage.verifyPageLoaded();
      
      // Verify both products in cart
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(2);

      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.completeStepOne(
        CHECKOUT_INFO.firstName,
        CHECKOUT_INFO.lastName,
        CHECKOUT_INFO.postalCode
      );

      // Verify overview shows 2 items
      await checkoutStepTwoPage.verifyPageLoaded();
      const overviewItemCount = await checkoutStepTwoPage.getItemCount();
      expect(overviewItemCount).toBe(2);

      // Complete order
      await checkoutStepTwoPage.finishOrder();
      await checkoutCompletePage.verifyCheckoutComplete();
    });

  });

  test.describe('Cart Management', () => {

    test('should add and remove product from cart', async ({ 
      authenticatedPage, 
      productsPage, 
      cartPage 
    }) => {
      // Add product
      await productsPage.addProductToCart(PRODUCTS.backpack);
      expect(await productsPage.getCartItemCount()).toBe(1);

      // Go to cart and remove
      await productsPage.clickShoppingCart();
      await cartPage.removeItem(PRODUCTS.backpack);
      
      // Verify cart is empty
      await cartPage.verifyCartEmpty();
    });

    test('should continue shopping from cart', async ({ 
      authenticatedPage, 
      productsPage, 
      cartPage 
    }) => {
      // Add product and go to cart
      await productsPage.addProductToCart(PRODUCTS.bikeLight);
      await productsPage.clickShoppingCart();
      await cartPage.verifyPageLoaded();

      // Continue shopping
      await cartPage.continueShopping();
      
      // Verify back on products page
      await productsPage.verifyPageLoaded();
    });

  });

});

