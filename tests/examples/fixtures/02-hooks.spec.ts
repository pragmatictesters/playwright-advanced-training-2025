import { test, expect } from '@playwright/test';

/**
 * Example 2: Test Hooks (Setup and Teardown)
 * 
 * This file demonstrates:
 * - beforeAll() - runs once before all tests
 * - afterAll() - runs once after all tests
 * - beforeEach() - runs before each test
 * - afterEach() - runs after each test
 * - Hook execution order
 * - Common use cases for each hook
 * 
 * Run this file: npx playwright test tests/examples/fixtures/02-hooks.spec.ts
 */

// ============================================================================
// EXAMPLE 1: All Four Hooks Together
// ============================================================================

test.describe('Complete Hooks Demo', () => {
  console.log('\n📦 Test Suite: Complete Hooks Demo\n');

  // Runs ONCE before all tests in this describe block
  test.beforeAll(async () => {
    console.log('🔧 beforeAll: Setting up test suite (runs ONCE)');
    console.log('   - Connect to database');
    console.log('   - Load test configuration');
    console.log('   - Initialize test environment\n');
  });

  // Runs ONCE after all tests in this describe block
  test.afterAll(async () => {
    console.log('\n🧹 afterAll: Cleaning up test suite (runs ONCE)');
    console.log('   - Disconnect from database');
    console.log('   - Clear test data');
    console.log('   - Generate reports\n');
  });

  // Runs BEFORE EACH test
  test.beforeEach(async () => {
    console.log('  ▶️  beforeEach: Setting up test');
    console.log('     - Navigate to page');
    console.log('     - Login user');
  });

  // Runs AFTER EACH test
  test.afterEach(async () => {
    console.log('  ⏹️  afterEach: Cleaning up test');
    console.log('     - Logout user');
    console.log('     - Clear cookies\n');
  });

  test('test 1', () => {
    console.log('    ✅ Test 1: Executing test logic');
  });

  test('test 2', () => {
    console.log('    ✅ Test 2: Executing test logic');
  });

  test('test 3', () => {
    console.log('    ✅ Test 3: Executing test logic');
  });
});

// ============================================================================
// EXAMPLE 2: beforeEach and afterEach Only
// ============================================================================

test.describe('beforeEach and afterEach Demo', () => {
  console.log('\n📦 Test Suite: beforeEach/afterEach Demo\n');

  let testCounter = 0;

  test.beforeEach(() => {
    testCounter++;
    console.log(`  ▶️  beforeEach: Preparing test #${testCounter}`);
  });

  test.afterEach(() => {
    console.log(`  ⏹️  afterEach: Completed test #${testCounter}\n`);
  });

  test('should execute test A', () => {
    console.log('    ✅ Test A: Running');
    expect(testCounter).toBe(1);
  });

  test('should execute test B', () => {
    console.log('    ✅ Test B: Running');
    expect(testCounter).toBe(2);
  });

  test('should execute test C', () => {
    console.log('    ✅ Test C: Running');
    expect(testCounter).toBe(3);
  });
});

// ============================================================================
// EXAMPLE 3: beforeAll and afterAll Only
// ============================================================================

test.describe('beforeAll and afterAll Demo', () => {
  console.log('\n📦 Test Suite: beforeAll/afterAll Demo\n');

  let sharedResource: string;

  test.beforeAll(() => {
    console.log('🔧 beforeAll: Creating shared resource (expensive operation)');
    sharedResource = 'Database Connection';
    console.log(`   - Resource created: ${sharedResource}\n`);
  });

  test.afterAll(() => {
    console.log('\n🧹 afterAll: Destroying shared resource');
    console.log(`   - Resource destroyed: ${sharedResource}\n`);
  });

  test('test 1 uses shared resource', () => {
    console.log(`  ✅ Test 1: Using ${sharedResource}`);
    expect(sharedResource).toBe('Database Connection');
  });

  test('test 2 uses shared resource', () => {
    console.log(`  ✅ Test 2: Using ${sharedResource}`);
    expect(sharedResource).toBe('Database Connection');
  });

  test('test 3 uses shared resource', () => {
    console.log(`  ✅ Test 3: Using ${sharedResource}`);
    expect(sharedResource).toBe('Database Connection');
  });
});

// ============================================================================
// EXAMPLE 4: Nested Hooks
// ============================================================================

test.describe('Outer Suite', () => {
  console.log('\n📦 Outer Suite\n');

  test.beforeAll(() => {
    console.log('🔧 Outer beforeAll');
  });

  test.beforeEach(() => {
    console.log('  ▶️  Outer beforeEach');
  });

  test.afterEach(() => {
    console.log('  ⏹️  Outer afterEach');
  });

  test.afterAll(() => {
    console.log('🧹 Outer afterAll\n');
  });

  test('outer test', () => {
    console.log('    ✅ Outer test');
  });

  test.describe('Inner Suite', () => {
    console.log('  📦 Inner Suite\n');

    test.beforeAll(() => {
      console.log('  🔧 Inner beforeAll');
    });

    test.beforeEach(() => {
      console.log('    ▶️  Inner beforeEach');
    });

    test.afterEach(() => {
      console.log('    ⏹️  Inner afterEach');
    });

    test.afterAll(() => {
      console.log('  🧹 Inner afterAll');
    });

    test('inner test', () => {
      console.log('      ✅ Inner test');
    });
  });
});

// ============================================================================
// EXAMPLE 5: Real-World Use Cases
// ============================================================================

test.describe('Real-World Hook Examples', () => {
  console.log('\n📦 Real-World Hook Examples\n');

  // Use Case 1: Database setup/teardown
  test.describe('Database Tests', () => {
    let databaseConnection: any;

    test.beforeAll(async () => {
      console.log('🔧 beforeAll: Connect to database');
      databaseConnection = { connected: true, name: 'TestDB' };
    });

    test.afterAll(async () => {
      console.log('🧹 afterAll: Disconnect from database\n');
      databaseConnection = null;
    });

    test.beforeEach(() => {
      console.log('  ▶️  beforeEach: Start transaction');
    });

    test.afterEach(() => {
      console.log('  ⏹️  afterEach: Rollback transaction\n');
    });

    test('should insert record', () => {
      console.log('    ✅ Insert record into database');
      expect(databaseConnection.connected).toBe(true);
    });

    test('should query record', () => {
      console.log('    ✅ Query record from database');
      expect(databaseConnection.name).toBe('TestDB');
    });
  });

  // Use Case 2: Authentication
  test.describe('Authenticated Tests', () => {
    let authToken: string;

    test.beforeEach(() => {
      console.log('  ▶️  beforeEach: Login user');
      authToken = 'mock-auth-token-12345';
      console.log(`     - Token: ${authToken}`);
    });

    test.afterEach(() => {
      console.log('  ⏹️  afterEach: Logout user');
      authToken = '';
      console.log('     - Token cleared\n');
    });

    test('should access protected resource', () => {
      console.log('    ✅ Access protected resource');
      expect(authToken).toBeTruthy();
    });

    test('should update user profile', () => {
      console.log('    ✅ Update user profile');
      expect(authToken).toBe('mock-auth-token-12345');
    });
  });

  // Use Case 3: Test data preparation
  test.describe('Test Data Tests', () => {
    let testData: any[];

    test.beforeAll(() => {
      console.log('🔧 beforeAll: Load test data from file');
      testData = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' }
      ];
      console.log(`   - Loaded ${testData.length} records\n`);
    });

    test('should process first record', () => {
      console.log('  ✅ Process record 1');
      expect(testData[0].name).toBe('User 1');
    });

    test('should process second record', () => {
      console.log('  ✅ Process record 2');
      expect(testData[1].name).toBe('User 2');
    });
  });
});

// ============================================================================
// EXAMPLE 6: Hook Execution Order Visualization
// ============================================================================

test.describe('Hook Execution Order', () => {
  console.log('\n📦 Hook Execution Order Visualization\n');

  test.beforeAll(() => console.log('1️⃣  beforeAll (once)'));
  test.afterAll(() => console.log('8️⃣  afterAll (once)\n'));

  test.beforeEach(() => console.log('  2️⃣  beforeEach'));
  test.afterEach(() => console.log('  4️⃣  afterEach\n'));

  test('first test', () => {
    console.log('    3️⃣  Test 1 execution');
  });

  test.beforeEach(() => console.log('  5️⃣  beforeEach'));
  test.afterEach(() => console.log('  7️⃣  afterEach'));

  test('second test', () => {
    console.log('    6️⃣  Test 2 execution');
  });
});

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================

/**
 * 📚 What You Learned:
 * 
 * 1. Hook Types:
 *    - beforeAll() - Setup once before all tests (expensive operations)
 *    - afterAll() - Cleanup once after all tests
 *    - beforeEach() - Setup before each test (test isolation)
 *    - afterEach() - Cleanup after each test
 * 
 * 2. Execution Order:
 *    beforeAll → (beforeEach → test → afterEach) × N → afterAll
 * 
 * 3. Common Use Cases:
 *    - beforeAll: Database connections, load config, create shared resources
 *    - afterAll: Close connections, cleanup shared resources, generate reports
 *    - beforeEach: Login, navigate to page, prepare test data
 *    - afterEach: Logout, clear cookies, reset state
 * 
 * 4. Best Practices:
 *    - Use beforeAll/afterAll for expensive operations
 *    - Use beforeEach/afterEach for test isolation
 *    - Keep hooks simple and focused
 *    - Nested hooks run in order (outer → inner)
 * 
 * 5. When to Use Each:
 *    - beforeAll: Shared setup that doesn't change between tests
 *    - beforeEach: Fresh state for each test (isolation)
 *    - afterEach: Cleanup after each test
 *    - afterAll: Final cleanup of shared resources
 * 
 * 🎯 Next: Learn about test annotations (skip, only, fixme, etc.)
 */

