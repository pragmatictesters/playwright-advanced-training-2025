# Sauce Demo (saucedemo.com) — Test Plan

**Executive Summary**

- Application: Sauce Demo (https://www.saucedemo.com)
- Purpose: Simple e2e demo ecommerce app used for functional and UI testing practice.
- Scope: Authentication, product listing, cart operations, checkout flow, sorting/filtering, and session behaviors.
- Assumption: Fresh browser state for each test (no persisted sessions), test accounts available (standard_user, locked_out_user, problem_user, performance_glitch_user), network stable.

**Test Setup & Notes**

- Base URL: `https://www.saucedemo.com`
- Recommended test accounts (provided by Saucedemo):
  - `standard_user` / `secret_sauce` — normal flows
  - `locked_out_user` / `secret_sauce` — should fail login
  - `problem_user` / `secret_sauce` — UI issues for exploratory tests
  - `performance_glitch_user` / `secret_sauce` — slow responses for performance checks
- Test data: product names visible on inventory page; generate random strings for user info during checkout (first/last name, postal code).
- Reset state: Clear localStorage/cookies between tests (Playwright fixtures handle this by default).
- Recommended locators: prefer `getByRole`, `getByText`, `getByLabel` and `getByTestId` where available. Avoid brittle CSS selectors.

**Primary User Journeys / Critical Paths**

1. Login → View Products → Add product(s) to cart → Checkout → Order confirmation
2. Login failure (locked out) and error message displayed
3. Cart operations: add multiple products, remove product, verify totals
4. Sorting/filtering: change sort order and verify product order
5. Session handling: logout, back navigation, session expiry
6. Edge/test accounts: `problem_user` behavior and `performance_glitch_user` delays

**Test Scenarios**

Each scenario below includes: Assumptions, Steps, Expected Results, Success Criteria, Failure Conditions.

---

**1. Login — Happy Path**

- Assumptions: App reachable; `standard_user` credentials usable.
- Steps:
  1. Navigate to `/` (login page).
  2. Fill username `standard_user` in username input.
  3. Fill password `secret_sauce` in password input.
  4. Click `Login` button.
- Expected Results:
  - Navigation to `/inventory.html` completes.
  - Page shows a heading/title containing `Products`.
  - No login error message displayed.
- Success Criteria: `toHaveURL('/inventory.html')` and visible product list.
- Failure Conditions: Login error shown, incorrect URL, or blank product list.

---

**2. Login — Locked Out User**

- Assumptions: `locked_out_user` provided by demo.
- Steps:
  1. Navigate to login page.
  2. Fill username `locked_out_user`, password `secret_sauce`.
  3. Click `Login`.
- Expected Results:
  - Login remains on login page.
  - Error message appears containing text like `locked out`.
- Success Criteria: Locator for error banner is visible and contains expected text.
- Failure Conditions: Redirect to inventory page or no visible error.

---

**3. Add Single Product to Cart**

- Assumptions: User is logged in (use `standard_user`) and inventory visible.
- Steps:
  1. On inventory page, find a product (by name or first visible item).
  2. Click its `Add to cart` button.
  3. Click cart icon.
- Expected Results:
  - Cart page shows the added product with same name as inventory.
  - Cart item count (badge) shows `1`.
- Success Criteria: Product present in cart list and count correct.
- Failure Conditions: Wrong product, count mismatch, or missing cart entry.

---

**4. Remove Product from Cart**

- Assumptions: There is at least one product in cart.
- Steps:
  1. Navigate to cart page.
  2. Click `Remove` for a product.
- Expected Results:
  - Product removed from the cart list.
  - Cart badge decreases or disappears if empty.
- Success Criteria: Product no longer present in DOM and badge updated.
- Failure Conditions: Product still listed or inconsistent badge count.

---

**5. Checkout Flow — Happy Path**

- Assumptions: User has at least one item in cart and is logged in.
- Steps:
  1. From cart, click `Checkout`.
  2. Fill in `First Name`, `Last Name`, and `Postal Code` fields.
  3. Click `Continue`, then `Finish` on overview.
- Expected Results:
  - After `Finish`, the confirmation page displays a success message (`THANK YOU FOR YOUR ORDER` or similar).
  - URL changes to checkout-complete (if applicable).
- Success Criteria: Confirmation message visible and order complete UI shown.
- Failure Conditions: Validation messages, failed navigation, or missing confirmation.

---

**6. Sorting Products by Price / Name**

- Assumptions: Inventory list contains multiple products with varying names/prices.
- Steps:
  1. On inventory page, locate sort dropdown (e.g., `Name (A to Z)`, `Price (low to high)`).
  2. Select `Price (low to high)` and capture visible product prices order.
  3. Verify prices are ascending.
  4. Select `Name (Z to A)` and verify product names order accordingly.
- Expected Results:
  - Product order changes to match selected sort.
- Success Criteria: Programmatically assert sorted order of captured values.
- Failure Conditions: Order unchanged or inconsistent sorting results.

---

**7. UI/Visual Sanity for Problem User**

- Assumptions: `problem_user` account causes intentionally broken UI.
- Steps:
  1. Login with `problem_user` / `secret_sauce`.
  2. Observe inventory page for missing images, broken links, or layout shifts.
- Expected Results:
  - Known anomalies (documented) appear for `problem_user`.
- Success Criteria: Anomalies match known expectations; report new/unexpected behavior.
- Failure Conditions: Unexpected app crash or new regression beyond documented anomalies.

---

**8. Performance Glitch User — Slow Load**

- Assumptions: `performance_glitch_user` is available and triggers slower responses.
- Steps:
  1. Login with `performance_glitch_user`.
  2. Measure time to reach `/inventory.html` and time for product images to load.
- Expected Results:
  - Longer load times observed; page still functional.
- Success Criteria: App remains functional under slower responses; thresholds documented.
- Failure Conditions: Timeouts, broken functionality, or test flakiness requiring timeouts adjustment.

---

**9. Accessibility Smoke**

- Assumptions: Basic ARIA roles and accessible names are present.
- Steps:
  1. Verify key interactive elements have accessible roles: login button (`role=button`), product list (`role=list`/`region`), add-to-cart buttons.
  2. Verify images have alt text or meaningful labels.
- Expected Results:
  - No major missing roles for critical controls.
- Success Criteria: Use automated axe/a11y tool or spot checks for critical paths.
- Failure Conditions: Missing labels on inputs or controls that block keyboard access.

---

**10. Session & Logout Behavior**

- Assumptions: User can logout via menu or UI control.
- Steps:
  1. Login as `standard_user`.
  2. Add product to cart.
  3. Click menu → `Logout`.
  4. Attempt to use browser `Back` to revisit `/inventory.html`.
- Expected Results:
  - After logout, protected pages redirect to login.
  - Cart state reset (if application behaves statelessly) or persisted per spec.
- Success Criteria: Protected pages require login; expected cart persistence behavior confirmed.
- Failure Conditions: Access to protected pages without login or inconsistent cart state.

---

**Negative & Edge Cases**

- Invalid input during checkout (empty name, invalid postal code) — assert validation messages.
- Large cart sizes — add all products to cart then checkout.
- Network offline behavior — simulate offline and verify graceful errors.
- Rapid repeated clicks on Add to cart — idempotency checks.

**Automation Recommendations & Locators**

- Prefer semantic locators:
  - Login: `page.getByPlaceholder('Username')`, `page.getByPlaceholder('Password')` or `page.getByRole('textbox', { name: /username/i })` and `page.getByRole('button', { name: 'Login' })`.
  - Inventory items: `page.getByRole('button', { name: /add to cart/i })` scoped to product container using `.locator()`.
  - Cart badge: `page.locator('.shopping_cart_badge')` or role-based equivalent.
  - Checkout fields: `getByLabel('First Name')`, `getByLabel('Last Name')`, `getByLabel('Postal Code')`.
- Example robust locator pattern for product input:
```ts
const productCard = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
await productCard.getByRole('button', { name: /add to cart/i }).click();
```

**Test Data & Execution Notes**

- Cross-browser: Run on Chromium, Firefox, and WebKit where possible.
- Parallelization: Inventory- and login-independent tests can run in parallel, but tests that mutate shared state (if any) should be isolated.
- Retries: For flaky network or performance tests, enable `retry` in Playwright config for CI only.
- Reporting: Capture screenshots and traces on failures: `--trace on-first-retry` and `screenshot: only-on-failure`.

**Deliverables**

- This test plan (saved as `docs/test-plans/saucedemo-test-plan.md`).
- Suggested next steps: convert each scenario into a Playwright test file under `tests/saucedemo/` with fixtures that login and reset state.

---

_End of plan._
