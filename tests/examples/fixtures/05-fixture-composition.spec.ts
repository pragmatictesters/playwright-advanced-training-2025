import test, { test as base, expect } from '@playwright/test';

/**
 * Example 5: Fixture Composition
 * 
 * This file demonstrates:
 * - Fixtures depending on other fixtures
 * - Fixture dependency chains
 * - Execution order with dependencies
 * - Real-world composition patterns
 * - Building complex fixtures from simple ones
 * 
 * Run this file: npx playwright test tests/examples/fixtures/05-fixture-composition.spec.ts
 */

// ============================================================================
// EXAMPLE 1: Simple Fixture Dependency
// ============================================================================

type SimpleComposition = {
  database: { connected: boolean; name: string };
  authenticatedUser: { username: string; token: string };
};

const test1 = base.extend<SimpleComposition>({
  // Base fixture - no dependencies
  database: async ({}, use) => {
    console.log('  🔧 Setup: Database connection');
    const db = { connected: true, name: 'TestDB' };
    console.log(`     - Connected to: ${db.name}`);
    
    await use(db);
    
    console.log('  🧹 Teardown: Database connection');
    console.log('     - Disconnected');
  },

  // Dependent fixture - depends on database
  authenticatedUser: async ({ database }, use) => {
    console.log('  🔧 Setup: Authenticated user (depends on database)');
    console.log(`     - Using database: ${database.name}`);
    
    const user = {
      username: 'admin',
      token: 'mock-token-12345',
    };
    
    console.log(`     - User authenticated: ${user.username}`);
    
    await use(user);
    
    console.log('  🧹 Teardown: Authenticated user');
    console.log('     - User logged out');
  },
});

test1.describe('Simple Fixture Dependency', () => {
  console.log('\n📦 Simple Fixture Dependency Example\n');

  test1('should use dependent fixtures', ({ database, authenticatedUser }) => {
    console.log(`    ✅ Test running with:`);
    console.log(`       - Database: ${database.name}`);
    console.log(`       - User: ${authenticatedUser.username}`);
    
    expect(database.connected).toBe(true);
    expect(authenticatedUser.token).toBeTruthy();
  });
});

// ============================================================================
// EXAMPLE 2: Fixture Chain (A → B → C)
// ============================================================================

type ChainFixtures = {
  config: { apiUrl: string; timeout: number };
  apiClient: { url: string; request: (endpoint: string) => string };
  userService: { getUser: (id: number) => string };
};

const test2 = base.extend<ChainFixtures>({
  // Level 1: Base fixture
  config: async ({}, use) => {
    console.log('  1️⃣  Setup: Config');
    const cfg = { apiUrl: 'https://api.example.com', timeout: 5000 };
    await use(cfg);
    console.log('  6️⃣  Teardown: Config');
  },

  // Level 2: Depends on config
  apiClient: async ({ config }, use) => {
    console.log('  2️⃣  Setup: API Client (depends on config)');
    console.log(`     - Using URL: ${config.apiUrl}`);
    
    const client = {
      url: config.apiUrl,
      request: (endpoint: string) => {
        console.log(`     - Request: ${endpoint}`);
        return 'Response data';
      },
    };
    
    await use(client);
    console.log('  5️⃣  Teardown: API Client');
  },

  // Level 3: Depends on apiClient
  userService: async ({ apiClient }, use) => {
    console.log('  3️⃣  Setup: User Service (depends on apiClient)');
    console.log(`     - Using API: ${apiClient.url}`);
    
    const service = {
      getUser: (id: number) => {
        console.log(`     - Getting user ${id}`);
        return apiClient.request(`/users/${id}`);
      },
    };
    
    await use(service);
    console.log('  4️⃣  Teardown: User Service');
  },
});

test2.describe('Fixture Chain Example', () => {
  console.log('\n📦 Fixture Chain Example (A → B → C)\n');

  test2('should use chained fixtures', ({ config, apiClient, userService }) => {
    console.log(`    ✅ Test executing`);
    console.log(`       - Config: ${config.apiUrl}`);
    console.log(`       - API Client: ${apiClient.url}`);
    
    const user = userService.getUser(1);
    expect(user).toBe('Response data');
  });
});

// ============================================================================
// EXAMPLE 3: Multiple Dependencies
// ============================================================================

type MultiDependencies = {
  database: { name: string };
  cache: { name: string };
  logger: { name: string };
  dataService: { getData: () => string };
};

const test3 = base.extend<MultiDependencies>({
  database: async ({}, use) => {
    console.log('  🔧 Setup: Database');
    await use({ name: 'PostgreSQL' });
    console.log('  🧹 Teardown: Database');
  },

  cache: async ({}, use) => {
    console.log('  🔧 Setup: Cache');
    await use({ name: 'Redis' });
    console.log('  🧹 Teardown: Cache');
  },

  logger: async ({}, use) => {
    console.log('  🔧 Setup: Logger');
    await use({ name: 'Winston' });
    console.log('  🧹 Teardown: Logger');
  },

  // Depends on multiple fixtures
  dataService: async ({ database, cache, logger }, use) => {
    console.log('  🔧 Setup: Data Service (depends on database, cache, logger)');
    console.log(`     - Database: ${database.name}`);
    console.log(`     - Cache: ${cache.name}`);
    console.log(`     - Logger: ${logger.name}`);
    
    const service = {
      getData: () => {
        console.log('     - Fetching data...');
        return 'Data from service';
      },
    };
    
    await use(service);
    console.log('  🧹 Teardown: Data Service');
  },
});

test3.describe('Multiple Dependencies Example', () => {
  console.log('\n📦 Multiple Dependencies Example\n');

  test3('should use service with multiple dependencies', ({ dataService }) => {
    console.log(`    ✅ Test executing`);
    const data = dataService.getData();
    expect(data).toBe('Data from service');
  });
});

// ============================================================================
// EXAMPLE 4: Real-World Example - E-commerce System
// ============================================================================

type EcommerceFixtures = {
  database: { connected: boolean };
  authService: { login: (user: string) => string };
  cartService: { addItem: (item: string) => void; items: string[] };
  checkoutService: { checkout: () => string };
};

const test4 = base.extend<EcommerceFixtures>({
  // Base: Database
  database: async ({}, use) => {
    console.log('  🔧 Setup: Database');
    await use({ connected: true });
    console.log('  🧹 Teardown: Database');
  },

  // Depends on: database
  authService: async ({ database }, use) => {
    console.log('  🔧 Setup: Auth Service (needs database)');
    const service = {
      login: (user: string) => {
        console.log(`     - Logging in: ${user}`);
        return 'auth-token-12345';
      },
    };
    await use(service);
    console.log('  🧹 Teardown: Auth Service');
  },

  // Depends on: database, authService
  cartService: async ({ database, authService }, use) => {
    console.log('  🔧 Setup: Cart Service (needs database & auth)');
    const token = authService.login('testuser');
    console.log(`     - Using token: ${token}`);
    
    const service = {
      items: [] as string[],
      addItem: function(item: string) {
        console.log(`     - Adding to cart: ${item}`);
        this.items.push(item);
      },
    };
    
    await use(service);
    console.log('  🧹 Teardown: Cart Service');
  },

  // Depends on: cartService
  checkoutService: async ({ cartService }, use) => {
    console.log('  🔧 Setup: Checkout Service (needs cart)');
    const service = {
      checkout: () => {
        console.log(`     - Checking out ${cartService.items.length} items`);
        return 'order-12345';
      },
    };
    await use(service);
    console.log('  🧹 Teardown: Checkout Service');
  },
});

test4.describe('Real-World E-commerce Example', () => {
  console.log('\n📦 Real-World E-commerce Example\n');

  test4('should complete purchase flow', ({ cartService, checkoutService }) => {
    console.log(`    ✅ Test: Complete purchase flow`);
    
    cartService.addItem('Laptop');
    cartService.addItem('Mouse');
    
    const orderId = checkoutService.checkout();
    
    expect(cartService.items.length).toBe(2);
    expect(orderId).toBe('order-12345');
  });
});

// ============================================================================
// EXAMPLE 5: Conditional Fixture Dependencies
// ============================================================================

type ConditionalFixtures = {
  environment: string;
  apiUrl: string;
  testData: any[];
};

const test5 = base.extend<ConditionalFixtures>({
  environment: async ({}, use) => {
    console.log('  🔧 Setup: Environment');
    const env = process.env.TEST_ENV || 'development';
    console.log(`     - Environment: ${env}`);
    await use(env);
    console.log('  🧹 Teardown: Environment');
  },

  apiUrl: async ({ environment }, use) => {
    console.log('  🔧 Setup: API URL (depends on environment)');
    
    const urls: Record<string, string> = {
      development: 'http://localhost:3000',
      staging: 'https://staging.example.com',
      production: 'https://api.example.com',
    };
    
    const url = urls[environment] || urls.development;
    console.log(`     - URL: ${url}`);
    
    await use(url);
    console.log('  🧹 Teardown: API URL');
  },

  testData: async ({ environment }, use) => {
    console.log('  🔧 Setup: Test Data (depends on environment)');
    
    const data = environment === 'production' 
      ? [{ id: 1, name: 'Real User' }]
      : [{ id: 1, name: 'Test User' }, { id: 2, name: 'Test User 2' }];
    
    console.log(`     - Loaded ${data.length} test records`);
    
    await use(data);
    console.log('  🧹 Teardown: Test Data');
  },
});

test5.describe('Conditional Dependencies Example', () => {
  console.log('\n📦 Conditional Dependencies Example\n');

  test5('should use environment-specific fixtures', ({ environment, apiUrl, testData }) => {
    console.log(`    ✅ Test running in: ${environment}`);
    console.log(`       - API URL: ${apiUrl}`);
    console.log(`       - Test data count: ${testData.length}`);
    
    expect(apiUrl).toContain('localhost');
    expect(testData.length).toBeGreaterThan(0);
  });
});

// ============================================================================
// EXAMPLE 6: Fixture Dependency Graph
// ============================================================================

test.describe('Fixture Dependency Visualization', () => {
  console.log('\n📦 Fixture Dependency Graph\n');
  console.log('  Dependency Graph:');
  console.log('  ');
  console.log('  config');
  console.log('    ↓');
  console.log('  apiClient');
  console.log('    ↓');
  console.log('  userService');
  console.log('  ');
  console.log('  OR:');
  console.log('  ');
  console.log('  database ──┐');
  console.log('  cache ─────┼─→ dataService');
  console.log('  logger ────┘');
  console.log('  ');
});

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================

/**
 * 📚 What You Learned:
 * 
 * 1. Fixture Composition:
 *    - Fixtures can depend on other fixtures
 *    - Dependencies are declared in fixture parameters
 *    - Automatic dependency resolution
 * 
 * 2. Execution Order:
 *    - Dependencies setup first
 *    - Then dependent fixtures
 *    - Teardown in reverse order
 *    - Example: A → B → C → Test → C → B → A
 * 
 * 3. Dependency Patterns:
 *    - Simple chain: A → B → C
 *    - Multiple dependencies: A, B, C → D
 *    - Conditional dependencies: Based on environment
 * 
 * 4. Real-World Use Cases:
 *    - Database → Auth → Services
 *    - Config → API Client → Services
 *    - Environment → URLs/Data
 *    - Auth → Cart → Checkout
 * 
 * 5. Benefits:
 *    - Build complex fixtures from simple ones
 *    - Reuse base fixtures
 *    - Clear dependency relationships
 *    - Automatic lifecycle management
 *    - Type-safe composition
 * 
 * 6. Best Practices:
 *    - Keep fixtures focused (single responsibility)
 *    - Use composition over duplication
 *    - Document dependencies clearly
 *    - Avoid circular dependencies
 *    - Test fixtures independently
 * 
 * 🎯 Summary:
 * - Fixtures are powerful for test setup/teardown
 * - Composition enables building complex scenarios
 * - Dependencies are resolved automatically
 * - Clean, reusable, type-safe test code
 * 
 * 🚀 Next Steps:
 * - Apply fixtures to real tests (OrangeHRM)
 * - Create page object fixtures
 * - Build fixture libraries for your project
 */

