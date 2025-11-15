import { test as base, expect } from '@playwright/test';

/**
 * Example 4: Custom Fixtures
 * 
 * This file demonstrates:
 * - What fixtures are and why they're useful
 * - Creating custom fixtures
 * - Using fixtures in tests
 * - Fixture setup and teardown
 * - Multiple custom fixtures
 * - Fixture scope (test vs worker)
 * 
 * Run this file: npx playwright test tests/examples/fixtures/04-custom-fixtures.spec.ts
 */

// ============================================================================
// EXAMPLE 1: Simple Custom Fixture
// ============================================================================

// Define a custom fixture
type SimpleFixtures = {
  userName: string;
};

const test1 = base.extend<SimpleFixtures>({
  userName: async ({}, use) => {
    console.log('🔧 Setting up userName fixture');
    const name = 'TestUser';
    await use(name); // Provide the fixture value to the test
    console.log('🧹 Tearing down userName fixture');
  },
});

test1.describe('Simple Custom Fixture', () => {
  console.log('\n📦 Simple Custom Fixture Example\n');

  test1('should use userName fixture', ({ userName }) => {
    console.log(`  ✅ Test running with userName: ${userName}`);
    expect(userName).toBe('TestUser');
  });

  test1('should use userName fixture again', ({ userName }) => {
    console.log(`  ✅ Test running with userName: ${userName}`);
    expect(userName).toBe('TestUser');
  });
});

// ============================================================================
// EXAMPLE 2: Multiple Custom Fixtures
// ============================================================================

type UserFixtures = {
  userName: string;
  userEmail: string;
  userAge: number;
};

const test2 = base.extend<UserFixtures>({
  userName: async ({}, use) => {
    console.log('  🔧 Setup: userName');
    await use('John Doe');
    console.log('  🧹 Teardown: userName');
  },

  userEmail: async ({}, use) => {
    console.log('  🔧 Setup: userEmail');
    await use('john.doe@example.com');
    console.log('  🧹 Teardown: userEmail');
  },

  userAge: async ({}, use) => {
    console.log('  🔧 Setup: userAge');
    await use(30);
    console.log('  🧹 Teardown: userAge');
  },
});

test2.describe('Multiple Custom Fixtures', () => {
  console.log('\n📦 Multiple Custom Fixtures Example\n');

  test2('should use all user fixtures', ({ userName, userEmail, userAge }) => {
    console.log(`    ✅ Test running with:`);
    console.log(`       - Name: ${userName}`);
    console.log(`       - Email: ${userEmail}`);
    console.log(`       - Age: ${userAge}`);
    
    expect(userName).toBe('John Doe');
    expect(userEmail).toBe('john.doe@example.com');
    expect(userAge).toBe(30);
  });

  test2('should use only some fixtures', ({ userName, userEmail }) => {
    console.log(`    ✅ Test running with:`);
    console.log(`       - Name: ${userName}`);
    console.log(`       - Email: ${userEmail}`);
    // Note: userAge fixture is NOT setup because we don't use it
    
    expect(userName).toBe('John Doe');
    expect(userEmail).toBe('john.doe@example.com');
  });
});

// ============================================================================
// EXAMPLE 3: Fixture with Complex Setup/Teardown
// ============================================================================

type DatabaseFixture = {
  database: {
    connected: boolean;
    name: string;
    query: (sql: string) => string;
  };
};

const test3 = base.extend<DatabaseFixture>({
  database: async ({}, use) => {
    console.log('  🔧 Setup: Connecting to database...');
    
    const db = {
      connected: true,
      name: 'TestDB',
      query: (sql: string) => {
        console.log(`     - Executing query: ${sql}`);
        return 'Query result';
      },
    };
    
    console.log(`     - Connected to: ${db.name}`);
    
    await use(db); // Provide database to test
    
    console.log('  🧹 Teardown: Disconnecting from database...');
    db.connected = false;
    console.log('     - Disconnected');
  },
});

test3.describe('Complex Fixture Example', () => {
  console.log('\n📦 Complex Fixture Example\n');

  test3('should use database fixture', ({ database }) => {
    console.log(`    ✅ Test running with database: ${database.name}`);
    expect(database.connected).toBe(true);
    
    const result = database.query('SELECT * FROM users');
    expect(result).toBe('Query result');
  });

  test3('should use database fixture again', ({ database }) => {
    console.log(`    ✅ Test running with database: ${database.name}`);
    expect(database.connected).toBe(true);
    
    const result = database.query('INSERT INTO users VALUES (1, "Test")');
    expect(result).toBe('Query result');
  });
});

// ============================================================================
// EXAMPLE 4: Fixture with Authentication
// ============================================================================

type AuthFixture = {
  authenticatedUser: {
    username: string;
    token: string;
    isAuthenticated: boolean;
  };
};

const test4 = base.extend<AuthFixture>({
  authenticatedUser: async ({}, use) => {
    console.log('  🔧 Setup: Authenticating user...');
    
    const user = {
      username: 'admin',
      token: 'mock-jwt-token-12345',
      isAuthenticated: true,
    };
    
    console.log(`     - User: ${user.username}`);
    console.log(`     - Token: ${user.token}`);
    
    await use(user); // Provide authenticated user to test
    
    console.log('  🧹 Teardown: Logging out user...');
    user.isAuthenticated = false;
    user.token = '';
    console.log('     - User logged out');
  },
});

test4.describe('Authentication Fixture Example', () => {
  console.log('\n📦 Authentication Fixture Example\n');

  test4('should access protected resource', ({ authenticatedUser }) => {
    console.log(`    ✅ Test running as: ${authenticatedUser.username}`);
    console.log(`       - Token: ${authenticatedUser.token}`);
    
    expect(authenticatedUser.isAuthenticated).toBe(true);
    expect(authenticatedUser.token).toBeTruthy();
  });

  test4('should make authenticated API call', ({ authenticatedUser }) => {
    console.log(`    ✅ Making API call with token: ${authenticatedUser.token}`);
    
    expect(authenticatedUser.isAuthenticated).toBe(true);
  });
});

// ============================================================================
// EXAMPLE 5: Fixture with Test Data
// ============================================================================

type TestDataFixture = {
  testUsers: Array<{ id: number; name: string; email: string }>;
};

const test5 = base.extend<TestDataFixture>({
  testUsers: async ({}, use) => {
    console.log('  🔧 Setup: Loading test data...');
    
    const users = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ];
    
    console.log(`     - Loaded ${users.length} test users`);
    
    await use(users);
    
    console.log('  🧹 Teardown: Cleaning up test data...');
    console.log('     - Test data cleaned');
  },
});

test5.describe('Test Data Fixture Example', () => {
  console.log('\n📦 Test Data Fixture Example\n');

  test5('should process first user', ({ testUsers }) => {
    console.log(`    ✅ Processing user: ${testUsers[0].name}`);
    expect(testUsers[0].name).toBe('Alice');
  });

  test5('should process all users', ({ testUsers }) => {
    console.log(`    ✅ Processing ${testUsers.length} users`);
    testUsers.forEach(user => {
      console.log(`       - ${user.name} (${user.email})`);
    });
    expect(testUsers.length).toBe(3);
  });
});

// ============================================================================
// EXAMPLE 6: Combining Built-in and Custom Fixtures
// ============================================================================

type CombinedFixtures = {
  apiUrl: string;
};

const test6 = base.extend<CombinedFixtures>({
  apiUrl: async ({}, use) => {
    console.log('  🔧 Setup: API URL fixture');
    await use('https://api.example.com');
    console.log('  🧹 Teardown: API URL fixture');
  },
});

test6.describe('Combined Fixtures Example', () => {
  console.log('\n📦 Combined Fixtures Example\n');

  // Using both built-in (page) and custom (apiUrl) fixtures
  test6('should use page and apiUrl fixtures', async ({ page, apiUrl }) => {
    console.log(`    ✅ Test running with:`);
    console.log(`       - Page: ${typeof page}`);
    console.log(`       - API URL: ${apiUrl}`);
    
    expect(page).toBeDefined();
    expect(apiUrl).toBe('https://api.example.com');
  });
});

// ============================================================================
// EXAMPLE 7: Fixture Execution Order
// ============================================================================

type OrderFixtures = {
  fixtureA: string;
  fixtureB: string;
  fixtureC: string;
};

const test7 = base.extend<OrderFixtures>({
  fixtureA: async ({}, use) => {
    console.log('  1️⃣  Setup: Fixture A');
    await use('A');
    console.log('  6️⃣  Teardown: Fixture A');
  },

  fixtureB: async ({}, use) => {
    console.log('  2️⃣  Setup: Fixture B');
    await use('B');
    console.log('  5️⃣  Teardown: Fixture B');
  },

  fixtureC: async ({}, use) => {
    console.log('  3️⃣  Setup: Fixture C');
    await use('C');
    console.log('  4️⃣  Teardown: Fixture C');
  },
});

test7.describe('Fixture Execution Order', () => {
  console.log('\n📦 Fixture Execution Order Example\n');

  test7('should show fixture execution order', ({ fixtureA, fixtureB, fixtureC }) => {
    console.log(`    ✅ Test executing with: ${fixtureA}, ${fixtureB}, ${fixtureC}`);
    // Setup: A → B → C
    // Test executes
    // Teardown: C → B → A (reverse order)
  });
});

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================

/**
 * 📚 What You Learned:
 * 
 * 1. What are Fixtures?
 *    - Reusable setup/teardown logic
 *    - Dependency injection for tests
 *    - Automatic lifecycle management
 * 
 * 2. Creating Custom Fixtures:
 *    - Extend base test with custom fixtures
 *    - Define fixture type
 *    - Implement setup and teardown logic
 *    - Use await use() to provide value
 * 
 * 3. Using Fixtures:
 *    - Fixtures are injected as test parameters
 *    - Only used fixtures are setup
 *    - Automatic teardown after test
 * 
 * 4. Fixture Lifecycle:
 *    - Setup runs before test
 *    - await use() provides value to test
 *    - Teardown runs after test
 *    - Teardown runs in reverse order
 * 
 * 5. Common Use Cases:
 *    - Database connections
 *    - Authentication/authorization
 *    - Test data preparation
 *    - API clients
 *    - Configuration
 * 
 * 6. Benefits:
 *    - Reusable across tests
 *    - Clean test code
 *    - Automatic cleanup
 *    - Type-safe
 *    - Composable
 * 
 * 🎯 Next: Learn about fixture composition (fixtures depending on other fixtures)
 */

