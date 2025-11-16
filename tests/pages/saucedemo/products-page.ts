import { Page, Locator, expect } from '@playwright/test';

/**
 * ProductsPage - Page Object Model for SauceDemo Products/Inventory Page
 * 
 * This class encapsulates all locators and actions related to the products page.
 * This page is shown after successful login.
 * 
 * URL: https://www.saucedemo.com/inventory.html
 */
export class ProductsPage {
  // Page object
  readonly page: Page;
  
  // Locators
  readonly pageTitle: Locator;
  readonly shoppingCart: Locator;
  readonly shoppingCartBadge: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly productItems: Locator;
  readonly productSortDropdown: Locator;

  /**
   * Constructor - Initialize page and locators
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.pageTitle = page.locator('.title');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.productItems = page.locator('.inventory_item');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  /**
   * Navigate to products page directly
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  /**
   * Verify products page is loaded
   */
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.pageTitle).toContainText('Products');
    await expect(this.shoppingCart).toBeVisible();
  }

  /**
   * Verify page title
   * @param expectedTitle - Expected title text
   */
  async verifyTitle(expectedTitle: string) {
    await expect(this.pageTitle).toContainText(expectedTitle);
  }

  /**
   * Get number of products displayed
   * @returns Number of products
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Verify shopping cart is visible
   */
  async verifyShoppingCartVisible() {
    await expect(this.shoppingCart).toBeVisible();
  }

  /**
   * Get shopping cart badge count
   * @returns Cart item count or 0 if badge not visible
   */
  async getCartItemCount(): Promise<number> {
    const isVisible = await this.shoppingCartBadge.isVisible();
    if (!isVisible) return 0;
    
    const text = await this.shoppingCartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  /**
   * Add product to cart by name
   * @param productName - Name of the product to add
   */
  async addProductToCart(productName: string) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await addButton.click();
  }

  /**
   * Remove product from cart by name
   * @param productName - Name of the product to remove
   */
  async removeProductFromCart(productName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  /**
   * Click shopping cart
   */
  async clickShoppingCart() {
    await this.shoppingCart.click();
  }

  /**
   * Open hamburger menu
   */
  async openMenu() {
    await this.hamburgerMenu.click();
    await expect(this.logoutLink).toBeVisible();
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Sort products
   * @param sortOption - Sort option (az, za, lohi, hilo)
   */
  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSortDropdown.selectOption(sortOption);
  }

  /**
   * Get product name by index
   * @param index - Product index (0-based)
   * @returns Product name
   */
  async getProductName(index: number): Promise<string> {
    const product = this.productItems.nth(index);
    const nameLocator = product.locator('.inventory_item_name');
    return await nameLocator.textContent() || '';
  }

  /**
   * Verify specific product is visible
   * @param productName - Name of the product
   */
  async verifyProductVisible(productName: string) {
    const product = this.page.locator('.inventory_item_name', { hasText: productName });
    await expect(product).toBeVisible();
  }
}

