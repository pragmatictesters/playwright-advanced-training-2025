# Coding Conventions and Best Practices

## 🎯 Why Follow Conventions from Day One?

> **"Start Right, Stay Right"** - Bad habits are expensive to fix later.

Following coding conventions from the outset is not just about aesthetics—it's about:

- **Maintainability**: Code is read 10x more than it's written. Clear conventions make code easier to understand.
- **Team Collaboration**: Consistent style eliminates debates and speeds up code reviews.
- **Automation**: Consistent naming enables better tooling, refactoring, and code generation.
- **Scalability**: As your test suite grows, conventions prevent chaos.
- **Onboarding**: New team members can understand the codebase faster.

**Professional teams don't debate style—they follow conventions and focus on solving problems.**

---

## 📁 File Naming Conventions

### Test Files

**Convention**: Use `kebab-case` with `.spec.ts` extension

```
✅ GOOD
tests/login.spec.ts
tests/user-profile.spec.ts
tests/checkout-flow.spec.ts
tests/api/create-user.spec.ts

❌ BAD
tests/LoginTest.ts              // Don't use PascalCase
tests/login_test.ts             // Don't use snake_case
tests/login.test.ts             // Use .spec.ts (Playwright convention)
tests/loginSpec.ts              // Don't use camelCase
```

**Why?**
- `.spec.ts` is Playwright's official convention
- `kebab-case` is standard for file names in TypeScript/JavaScript ecosystems
- Easier to read and type
- Consistent with web URLs and modern frameworks (React, Angular, Vue)

### Page Object Files

**Convention**: Use `kebab-case` with descriptive suffix

```
✅ GOOD
tests/pages/login-page.ts
tests/pages/checkout-page.ts
tests/pages/user-profile-page.ts

❌ BAD
tests/pages/LoginPage.ts        // Don't use PascalCase for files
tests/pages/login_page.ts       // Don't use snake_case
tests/pages/login.ts            // Include -page suffix for clarity
```

### Fixture Files

```
✅ GOOD
tests/fixtures/auth-fixture.ts
tests/fixtures/test-data.ts
tests/fixtures/mock-api.ts

❌ BAD
tests/fixtures/AuthFixture.ts
tests/fixtures/auth_fixture.ts
```

### Utility/Helper Files

```
✅ GOOD
tests/utils/date-helpers.ts
tests/utils/string-utils.ts
tests/utils/api-client.ts

❌ BAD
tests/utils/DateHelpers.ts
tests/utils/date_helpers.ts
```

---

## 🏷️ TypeScript Naming Conventions

### Classes (PascalCase)

**Convention**: Use `PascalCase` for class names

```typescript
✅ GOOD
class LoginPage { }
class UserProfile { }
class CheckoutFlow { }
class ApiClient { }

❌ BAD
class loginPage { }             // Don't use camelCase
class login_page { }            // Don't use snake_case
class LOGINPAGE { }             // Don't use UPPERCASE
```

**Why?** This is the universal standard in TypeScript/JavaScript for classes.

### Interfaces & Types (PascalCase)

**Convention**: Use `PascalCase` without prefixes

```typescript
✅ GOOD
interface User {
  id: string;
  email: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

type UserRole = 'admin' | 'user' | 'guest';
type Status = 'pending' | 'approved' | 'rejected';

❌ BAD
interface user { }              // Don't use camelCase
interface IUser { }             // Don't use Hungarian notation (I prefix)
interface UserInterface { }     // Don't add Interface suffix
type userRole = 'admin';        // Don't use camelCase for types
```

**Why?** TypeScript's type system makes it clear when something is a type—no need for prefixes.

### Variables & Functions (camelCase)

**Convention**: Use `camelCase` for variables, functions, and methods

```typescript
✅ GOOD
const userName = 'test';
let isLoggedIn = false;
const userCount = 10;

function getUserData() { }
async function loginUser() { }
async function fetchOrderHistory() { }

❌ BAD
const UserName = 'test';        // Don't use PascalCase
const user_name = 'test';       // Don't use snake_case
function GetUserData() { }      // Don't use PascalCase
```

**Why?** Standard JavaScript/TypeScript convention for variables and functions.

### Constants (UPPER_SNAKE_CASE)

**Convention**: Use `UPPER_SNAKE_CASE` for module-level constants

```typescript
✅ GOOD
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT = 30000;
const SUPPORTED_BROWSERS = ['chromium', 'firefox', 'webkit'];

❌ BAD
const maxRetryCount = 3;        // Use UPPER_SNAKE_CASE for true constants
const max_retry_count = 3;      // This is correct!
const MaxRetryCount = 3;        // Don't use PascalCase
```

**Why?** Makes constants immediately recognizable and distinguishes them from variables.

**Note**: Use `camelCase` for local constants within functions:

```typescript
function calculateTotal() {
  const taxRate = 0.08;         // ✅ Local constant - use camelCase
  const subtotal = 100;
  return subtotal * (1 + taxRate);
}
```

### Test Names (Descriptive Sentences)

**Convention**: Use clear, descriptive sentences in lowercase

```typescript
✅ GOOD
test('user can login with valid credentials', async ({ page }) => { });
test('should display error message for invalid email', async ({ page }) => { });
test('checkout flow completes successfully with credit card', async ({ page }) => { });
test('admin can delete user accounts', async ({ page }) => { });

❌ BAD
test('test1', async ({ page }) => { });
test('loginTest', async ({ page }) => { });
test('Login', async ({ page }) => { });
test('test_user_login', async ({ page }) => { });
```

**Why?** Tests are living documentation—they should read like specifications.

**Best Practices for Test Names:**
- Start with what the user/system does: "user can...", "system should...", "admin can..."
- Be specific about the scenario: include conditions and expected outcomes
- Avoid technical jargon—write for business stakeholders
- Keep it concise but complete

### Test Describe Blocks

**Convention**: Use descriptive names with proper capitalization

```typescript
✅ GOOD
test.describe('Login Page', () => { });
test.describe('User Profile - Edit Mode', () => { });
test.describe('Shopping Cart', () => { });
test.describe('API - User Endpoints', () => { });

❌ BAD
test.describe('tests', () => { });
test.describe('login', () => { });
test.describe('TEST_LOGIN', () => { });
```

---

## 📦 Code Organization Best Practices

### Import Organization

**Convention**: Organize imports in three groups with blank lines between

```typescript
✅ GOOD
// 1. External libraries (third-party packages)
import { test, expect } from '@playwright/test';
import { chromium, Browser } from 'playwright';

// 2. Internal modules (absolute paths with aliases)
import { LoginPage } from '@pages/login-page';
import { testData } from '@fixtures/test-data';
import { ApiClient } from '@utils/api-client';

// 3. Relative imports (same directory or parent)
import { helper } from './helpers';
import { config } from '../config';

❌ BAD
// Mixed order, no grouping
import { helper } from './helpers';
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { chromium } from 'playwright';
```

**Why?** Organized imports make dependencies clear and easier to maintain.

### Use Named Exports (Not Default)

**Convention**: Always use named exports

```typescript
✅ GOOD - Named exports
// login-page.ts
export class LoginPage {
  constructor(private page: Page) {}
}

// test-data.ts
export const testUser = { email: 'test@example.com' };
export const adminUser = { email: 'admin@example.com' };

// Importing
import { LoginPage } from './login-page';
import { testUser, adminUser } from './test-data';

❌ BAD - Default exports
// login-page.ts
export default class LoginPage { }

// Importing (can use any name!)
import LoginPage from './login-page';      // ✅ Works
import MyLoginPage from './login-page';    // ✅ Also works - confusing!
import Foo from './login-page';            // ✅ Still works - terrible!
```

**Why?**
- Named exports provide better IDE support (autocomplete, refactoring)
- Prevents naming inconsistencies across files
- Easier to find all usages
- Better for tree-shaking (dead code elimination)

---

## 🎭 Playwright-Specific Best Practices

### Use Locators (Not CSS Selectors)

**Convention**: Use Playwright's built-in locators with priority order

**Priority Order:**
1. **Test IDs** (best for dynamic content)
2. **Role/Label** (accessible and semantic)
3. **Text content** (for unique text)
4. **CSS selectors** (last resort)

```typescript
✅ GOOD - Playwright locators
// 1. Test IDs (best - stable and explicit)
await page.getByTestId('submit-button').click();
await page.getByTestId('user-email-input').fill('test@example.com');

// 2. Role/Label (accessible and semantic)
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('test@example.com');
await page.getByRole('link', { name: 'Sign up' }).click();

// 3. Text content (for unique text)
await page.getByText('Welcome back!').isVisible();
await page.getByText('Order #12345').click();

❌ BAD - CSS selectors (brittle and hard to maintain)
await page.click('button.submit-btn');
await page.fill('#email', 'test@example.com');
await page.click('div > button:nth-child(2)');
await page.locator('.user-profile > .edit-btn').click();
```

**Why?**
- Locators have **auto-waiting** and **retry-ability** built-in
- More resilient to UI changes
- Better aligned with how users interact with the page
- Encourages accessible HTML

### Use Web-First Assertions

**Convention**: Use Playwright's web-first assertions that auto-wait

```typescript
✅ GOOD - Web-first assertions (auto-wait and retry)
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page).toHaveTitle(/Dashboard/);
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
await expect(page.getByTestId('error-message')).toHaveText('Invalid email');
await expect(page).toHaveURL(/.*dashboard/);

❌ BAD - Manual assertions (no waiting, race conditions)
expect(await page.getByText('Welcome').isVisible()).toBe(true);
expect(await page.title()).toContain('Dashboard');
const isEnabled = await page.getByRole('button').isEnabled();
expect(isEnabled).toBe(true);
```

**Why?**
- Auto-waiting eliminates flaky tests
- Automatically retries until condition is met (or timeout)
- More readable and expressive
- Handles timing issues automatically

### Test Independence

**Convention**: Each test must be completely independent

```typescript
✅ GOOD - Independent tests
test('user can login with valid credentials', async ({ page }) => {
  // Setup: Create test data via API (not UI)
  const testUser = await createUserViaAPI({
    email: 'test@example.com',
    password: 'password123'
  });

  // Test: Login flow
  await page.goto('/login');
  await page.getByLabel('Email').fill(testUser.email);
  await page.getByLabel('Password').fill(testUser.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert
  await expect(page).toHaveURL(/.*dashboard/);

  // Cleanup: Delete test data via API
  await deleteUserViaAPI(testUser.id);
});

test('user can update profile information', async ({ page }) => {
  // This test creates its own user - doesn't depend on previous test
  const testUser = await createUserViaAPI({ /* ... */ });
  await loginViaAPI(testUser);

  await page.goto('/profile');
  // ... test logic
});

❌ BAD - Tests depend on each other
test('create user account', async ({ page }) => {
  // Creates a user
  await page.goto('/signup');
  // ... creates user
});

test('login with created user', async ({ page }) => {
  // ❌ Assumes user from previous test exists!
  await page.goto('/login');
  // ... tries to login
});

test('update user profile', async ({ page }) => {
  // ❌ Assumes user is already logged in!
  await page.goto('/profile');
  // ... tries to update
});
```

**Why?**
- Tests can run in any order
- Tests can run in parallel
- One failing test doesn't cascade to others
- Easier to debug failures
- Can run individual tests in isolation

**Best Practice**: Use API calls for test setup/teardown, not UI interactions.

### Avoid Hard-Coded Waits

**Convention**: Never use `page.waitForTimeout()` - use smart waiting instead

```typescript
✅ GOOD - Smart waiting
// Wait for element to be visible
await expect(page.getByText('Loading complete')).toBeVisible();

// Wait for URL change
await expect(page).toHaveURL(/.*dashboard/);

// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for specific network request
await page.waitForResponse(response =>
  response.url().includes('/api/users') && response.status() === 200
);

❌ BAD - Hard-coded waits (flaky and slow)
await page.waitForTimeout(3000);  // ❌ Never do this!
await page.click('button');
await page.waitForTimeout(1000);  // ❌ Arbitrary wait
```

**Why?**
- Hard-coded waits make tests slower (always wait full duration)
- Flaky tests (might not be enough time, or too much)
- Playwright has built-in smart waiting—use it!

---

## 📝 TypeScript Best Practices

### Use `const` by Default

**Convention**: Use `const` by default, `let` only when reassignment is needed

```typescript
✅ GOOD
const userName = 'test';
const page = await browser.newPage();
const users = ['Alice', 'Bob'];

let counter = 0;  // ✅ OK - will be reassigned
counter++;

❌ BAD
let userName = 'test';  // ❌ Never reassigned - should be const
let page = await browser.newPage();  // ❌ Should be const
var counter = 0;  // ❌ Never use var
```

**Why?**
- `const` prevents accidental reassignment
- Makes code easier to reason about
- Signals intent to other developers
- `var` has confusing scoping rules—never use it

### Explicit Types for Function Parameters

**Convention**: Always specify types for function parameters

```typescript
✅ GOOD - Explicit parameter types
function login(email: string, password: string): Promise<void> {
  // ...
}

async function createUser(userData: User): Promise<string> {
  // ...
  return userId;
}

function calculateTotal(items: CartItem[], taxRate: number): number {
  // ...
}

❌ BAD - Implicit any (TypeScript error with strict mode)
function login(email, password) {  // ❌ Implicit any
  // ...
}

function createUser(userData) {  // ❌ What type is userData?
  // ...
}
```

**Why?**
- Catches type errors at compile time
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Prevents runtime errors

### Use Interfaces for Object Structures

**Convention**: Define interfaces for object shapes

```typescript
✅ GOOD - Interface for structure
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const testUser: User = {
  id: '123',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'user',
  createdAt: new Date()
};

async function login(credentials: LoginCredentials): Promise<void> {
  // ...
}

❌ BAD - No type definition
const testUser = {
  id: '123',
  email: 'test@example.com',
  // ... no type safety
};

function login(credentials) {  // ❌ What properties does credentials have?
  // ...
}
```

**Why?**
- Type safety prevents errors
- IDE autocomplete shows available properties
- Easy to refactor
- Self-documenting code

### Avoid `any` Type

**Convention**: Avoid `any` - use specific types or `unknown`

```typescript
✅ GOOD - Specific types
function processUser(user: User): void { }
function handleResponse(response: ApiResponse): void { }

// If type is truly unknown, use 'unknown' (safer than 'any')
function processData(data: unknown): void {
  // Must narrow type before using
  if (typeof data === 'string') {
    console.log(data.toUpperCase());
  }
}

❌ BAD - Using any (defeats TypeScript's purpose)
function processUser(user: any): void { }  // ❌ No type safety
function handleResponse(response: any): void { }  // ❌ Anything goes
```

**Why?**
- `any` disables all type checking
- Defeats the purpose of using TypeScript
- Can hide bugs until runtime
- `unknown` is safer—forces type checking before use

---

## 💬 Comment Best Practices

### JSDoc for Public APIs

**Convention**: Use JSDoc comments for classes, public methods, and complex functions

```typescript
✅ GOOD - JSDoc for public API
/**
 * Represents a login page with methods for authentication.
 */
export class LoginPage {
  /**
   * Logs in a user with the provided credentials.
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise that resolves when login is complete
   * @throws {Error} If login fails due to invalid credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}

/**
 * Creates a test user via API.
 * @param userData - User data to create
 * @returns Promise resolving to the created user's ID
 */
async function createUserViaAPI(userData: Partial<User>): Promise<string> {
  // ...
}
```

**Why?**
- IDE shows documentation on hover
- Helps other developers understand your code
- Generates documentation automatically
- Clarifies intent and usage

### Inline Comments for Complex Logic

**Convention**: Explain **WHY**, not **WHAT**

```typescript
✅ GOOD - Explains WHY
// Wait for network idle to ensure all lazy-loaded images are fetched
await page.waitForLoadState('networkidle');

// Retry login 3 times because auth service occasionally returns 503
for (let i = 0; i < 3; i++) {
  try {
    await login();
    break;
  } catch (error) {
    if (i === 2) throw error;
  }
}

// Use API for user creation because UI signup has CAPTCHA
await createUserViaAPI(testUser);

❌ BAD - States the obvious
// Click the login button
await page.click('button');

// Fill the email field
await page.fill('#email', 'test@example.com');

// Wait for 2 seconds
await page.waitForTimeout(2000);
```

**Why?**
- Code shows WHAT is happening
- Comments should explain WHY it's happening
- Obvious comments add noise
- Good code is self-documenting

### When NOT to Comment

**Convention**: Don't comment if the code is self-explanatory

```typescript
✅ GOOD - No comment needed (code is clear)
const isValidEmail = email.includes('@') && email.includes('.');

await page.getByRole('button', { name: 'Submit' }).click();

const totalPrice = subtotal + tax + shipping;

❌ BAD - Unnecessary comments
// Check if email is valid
const isValidEmail = email.includes('@') && email.includes('.');

// Click the submit button
await page.getByRole('button', { name: 'Submit' }).click();

// Calculate total price
const totalPrice = subtotal + tax + shipping;
```

---

## 🎨 Code Formatting

### Use Prettier (Auto-formatting)

**Convention**: Use Prettier for consistent code formatting

```bash
# Install Prettier
npm install --save-dev prettier

# Create .prettierrc configuration
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}

# Format all files
npx prettier --write "tests/**/*.ts"
```

**Why?**
- Eliminates formatting debates
- Consistent style across team
- Automatic formatting on save
- Focus on logic, not formatting

### Indentation and Spacing

**Convention**: Use 2 spaces for indentation (TypeScript standard)

```typescript
✅ GOOD
test('user can login', async ({ page }) => {
  await page.goto('/login');

  if (needsSetup) {
    await setupTestData();
  }

  await page.getByLabel('Email').fill('test@example.com');
});

❌ BAD
test('user can login', async ({ page }) => {
    await page.goto('/login');  // ❌ 4 spaces

    if (needsSetup) {
        await setupTestData();  // ❌ Inconsistent
    }
});
```

---

## 📚 Quick Reference Cheat Sheet

| Type | Convention | Example |
|------|-----------|---------|
| **Test files** | `kebab-case.spec.ts` | `login.spec.ts` |
| **Page objects** | `kebab-case-page.ts` | `login-page.ts` |
| **Classes** | `PascalCase` | `LoginPage` |
| **Interfaces** | `PascalCase` | `User`, `LoginCredentials` |
| **Variables** | `camelCase` | `userName`, `isLoggedIn` |
| **Functions** | `camelCase` | `getUserData()`, `loginUser()` |
| **Constants** | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| **Test names** | `descriptive sentence` | `'user can login with valid credentials'` |
| **Exports** | Named exports | `export class LoginPage` |
| **Imports** | Organized groups | External → Internal → Relative |
| **Locators** | Playwright locators | `getByRole()`, `getByTestId()` |
| **Assertions** | Web-first | `await expect().toBeVisible()` |
| **Types** | Explicit parameters | `function login(email: string)` |
| **Comments** | Explain WHY | `// Retry because API is flaky` |

---

## 🔗 External References

### Official Documentation
- **[Playwright Best Practices](https://playwright.dev/docs/best-practices)** - Official Playwright recommendations
- **[Playwright API Reference](https://playwright.dev/docs/api/class-playwright)** - Complete API documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)** - Official TypeScript guide
- **[TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)** - TypeScript best practices

### Style Guides
- **[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)** - Comprehensive TypeScript style guide
- **[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)** - Popular JavaScript conventions
- **[Microsoft TypeScript Coding Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)** - TypeScript team's own guidelines

### Testing Best Practices
- **[Test Automation Patterns](https://martinfowler.com/articles/practical-test-pyramid.html)** - Martin Fowler's test pyramid
- **[Page Object Model](https://playwright.dev/docs/pom)** - Playwright's POM guide
- **[Testing Best Practices](https://testingjavascript.com/)** - Kent C. Dodds' testing course

### Tools
- **[Prettier](https://prettier.io/)** - Code formatter
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linter
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

---

## 🎯 Key Takeaways

1. **Consistency Over Preference** - Team consistency matters more than individual preference
2. **Conventions Enable Automation** - Consistent naming allows better tooling and refactoring
3. **Readable Code is Maintainable Code** - Future you (and your team) will thank you
4. **Start Right, Stay Right** - Bad habits are expensive to fix later
5. **Use the Tools** - Prettier, ESLint, and TypeScript catch issues before code review
6. **Tests are Documentation** - Write test names that explain what the system does
7. **Type Safety Prevents Bugs** - Use TypeScript's type system—don't fight it with `any`
8. **Playwright's Built-ins are Better** - Use locators and web-first assertions, not CSS selectors

---

## 🚀 Next Steps

Now that you understand coding conventions, you're ready to:

1. **Set up your development environment** with Prettier and ESLint
2. **Create your first test** following these conventions
3. **Implement Page Object Model** for maintainable tests
4. **Write independent, reliable tests** that can run in parallel

**Remember**: These conventions aren't arbitrary rules—they're battle-tested practices that make your code better, your tests more reliable, and your team more productive.

**Let's write some amazing tests! 🎭**


