import { test, expect } from '@playwright/test';

/**
 * Example 3: Test Annotations
 * 
 * This file demonstrates:
 * - test.skip() - Skip a test
 * - test.only() - Run only this test
 * - test.fixme() - Mark test as broken
 * - test.slow() - Triple the timeout
 * - test.fail() - Expect test to fail
 * - Conditional skipping
 * - Annotations with describe blocks
 * 
 * Run this file: npx playwright test tests/examples/fixtures/03-annotations.spec.ts
 * 
 * NOTE: Comment out test.only() examples to run all tests
 */

// ============================================================================
// EXAMPLE 1: test.skip() - Skip Tests
// ============================================================================

test.describe('test.skip() Examples', () => {
  console.log('\n📦 test.skip() Examples\n');

  test('normal test that runs', () => {
    console.log('  ✅ This test runs normally');
  });

  test.skip('skipped test', () => {
    console.log('  ⏭️  This will NOT run - test is skipped');
  });

  test('another normal test', () => {
    console.log('  ✅ This test also runs normally');
  });

  // Conditional skip
  test('conditionally skipped test', () => {
    const isCI = process.env.CI === 'true';
    test.skip(isCI, 'Skipping in CI environment');
    console.log('  ✅ This runs only in non-CI environments');
  });
});

// ============================================================================
// EXAMPLE 2: test.only() - Focus on Specific Tests
// ============================================================================

test.describe('test.only() Examples', () => {
  console.log('\n📦 test.only() Examples\n');

  test('test 1 - will NOT run', () => {
    console.log('  ❌ This will NOT run when test.only() is present');
  });

  // Uncomment to see test.only() in action
  // test.only('focused test - ONLY this runs', () => {
  //   console.log('  🎯 ONLY this test runs when test.only() is used');
  // });

  test('test 2 - will NOT run', () => {
    console.log('  ❌ This will also NOT run when test.only() is present');
  });

  // Note: Comment out test.only() to run all tests in this suite
  console.log('  ℹ️  Uncomment test.only() to see it in action');
});

// ============================================================================
// EXAMPLE 3: test.fixme() - Mark Tests as Broken
// ============================================================================

test.describe('test.fixme() Examples', () => {
  console.log('\n📦 test.fixme() Examples\n');

  test('working test', () => {
    console.log('  ✅ This test works fine');
  });

  test.fixme('broken test - needs fixing', () => {
    console.log('  🔧 This test is broken and needs to be fixed');
    // This test is skipped but marked as "fixme" in reports
  });

  test.fixme('another broken test', () => {
    console.log('  🔧 This test also needs fixing');
  });

  test('another working test', () => {
    console.log('  ✅ This test works fine too');
  });
});

// ============================================================================
// EXAMPLE 4: test.slow() - Increase Timeout
// ============================================================================

test.describe('test.slow() Examples', () => {
  console.log('\n📦 test.slow() Examples\n');

  test('normal speed test', () => {
    console.log('  ✅ Normal test with default timeout');
  });

  test.slow('slow test - 3x timeout', () => {
    console.log('  🐌 This test gets 3x the normal timeout');
    console.log('     - Default timeout: 30s');
    console.log('     - With test.slow(): 90s');
  });

  // You can also mark slow conditionally
  test('conditionally slow test', () => {
    const isSlowEnvironment = false; // Change to true to see effect
    test.slow(isSlowEnvironment, 'Running in slow environment');
    console.log('  ✅ This test is slow only in certain conditions');
  });
});

// ============================================================================
// EXAMPLE 5: test.fail() - Expect Test to Fail
// ============================================================================

test.describe('test.fail() Examples', () => {
  console.log('\n📦 test.fail() Examples\n');

  test('normal passing test', () => {
    console.log('  ✅ This test passes normally');
    expect(1 + 1).toBe(2);
  });

  test.fail('expected to fail', () => {
    console.log('  ⚠️  This test is EXPECTED to fail');
    expect(1 + 1).toBe(3); // This fails, but that's expected!
  });

  // Conditional fail
  test('conditionally expected to fail', () => {
    const isBugPresent = true;
    test.fail(isBugPresent, 'Known bug - will be fixed in next release');
    console.log('  ⚠️  This test fails due to known bug');
    expect(1 + 1).toBe(isBugPresent ? 3 : 2);
  });
});

// ============================================================================
// EXAMPLE 6: Combining Annotations
// ============================================================================

test.describe('Combining Annotations', () => {
  console.log('\n📦 Combining Annotations\n');

  test('normal test', () => {
    console.log('  ✅ Normal test');
  });

  test.skip('skipped slow test', () => {
    test.slow(); // Can combine annotations
    console.log('  ⏭️  This is skipped AND would be slow');
  });

  test.fixme('broken slow test', () => {
    test.slow();
    console.log('  🔧 This needs fixing AND would be slow');
  });
});

// ============================================================================
// EXAMPLE 7: Annotations on describe() Blocks
// ============================================================================

test.describe('Normal Suite', () => {
  console.log('\n📦 Normal Suite\n');

  test('test 1', () => console.log('  ✅ Test 1 runs'));
  test('test 2', () => console.log('  ✅ Test 2 runs'));
});

test.describe.skip('Skipped Suite', () => {
  console.log('\n📦 Skipped Suite (entire suite skipped)\n');

  test('test 1', () => console.log('  ⏭️  Will NOT run'));
  test('test 2', () => console.log('  ⏭️  Will NOT run'));
});

// Uncomment to see describe.only() in action
// test.describe.only('Focused Suite', () => {
//   console.log('\n📦 Focused Suite (ONLY this suite runs)\n');
//   
//   test('test 1', () => console.log('  🎯 Test 1 runs'));
//   test('test 2', () => console.log('  🎯 Test 2 runs'));
// });

test.describe.fixme('Broken Suite', () => {
  console.log('\n📦 Broken Suite (entire suite needs fixing)\n');

  test('test 1', () => console.log('  🔧 Needs fixing'));
  test('test 2', () => console.log('  🔧 Needs fixing'));
});

// ============================================================================
// EXAMPLE 8: Conditional Annotations
// ============================================================================

test.describe('Conditional Annotations', () => {
  console.log('\n📦 Conditional Annotations\n');

  const isMobile = false;
  const isCI = false;
  const browserName = 'chromium';

  test('skip on mobile', () => {
    test.skip(isMobile, 'This test does not work on mobile');
    console.log('  ✅ Runs on desktop only');
  });

  test('skip in CI', () => {
    test.skip(isCI, 'Flaky in CI environment');
    console.log('  ✅ Runs locally only');
  });

  test('skip in specific browser', () => {
    test.skip(browserName === 'webkit', 'Known issue in WebKit');
    console.log('  ✅ Runs in Chromium and Firefox');
  });

  test('slow in CI', () => {
    test.slow(isCI, 'CI environment is slower');
    console.log('  ✅ Gets extra timeout in CI');
  });
});

// ============================================================================
// EXAMPLE 9: Real-World Use Cases
// ============================================================================

test.describe('Real-World Annotation Examples', () => {
  console.log('\n📦 Real-World Examples\n');

  test('stable feature test', () => {
    console.log('  ✅ Stable feature - always runs');
  });

  test.skip('test for feature not yet implemented', () => {
    console.log('  ⏭️  Feature coming in v2.0');
  });

  test.fixme('test broken by recent API change', () => {
    console.log('  🔧 Broken by API v3 - needs update');
  });

  test.slow('test with large file upload', () => {
    console.log('  🐌 Uploading 100MB file - needs extra time');
  });

  test.fail('test for known bug #1234', () => {
    console.log('  ⚠️  Known bug - tracked in JIRA-1234');
    expect(true).toBe(false); // Expected to fail
  });

  test('test with conditional skip', () => {
    const featureFlag = false;
    test.skip(!featureFlag, 'Feature flag disabled');
    console.log('  ✅ Runs only when feature flag is enabled');
  });
});

// ============================================================================
// EXAMPLE 10: Annotation Summary
// ============================================================================

test.describe('Annotation Summary', () => {
  console.log('\n📦 Annotation Summary\n');

  test('✅ Normal test - runs always', () => {
    console.log('  ✅ Normal test');
  });

  test.skip('⏭️  Skipped test - does not run', () => {
    console.log('  ⏭️  Skipped');
  });

  // test.only('🎯 Focused test - only this runs', () => {
  //   console.log('  🎯 Focused (uncomment to see)');
  // });

  test.fixme('🔧 Broken test - needs fixing', () => {
    console.log('  🔧 Fixme');
  });

  test.slow('🐌 Slow test - 3x timeout', () => {
    console.log('  🐌 Slow');
  });

  test.fail('⚠️  Expected to fail', () => {
    console.log('  ⚠️  Expected fail');
    expect(true).toBe(false);
  });
});

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================

/**
 * 📚 What You Learned:
 * 
 * 1. Test Annotations:
 *    - test.skip() - Skip test (won't run)
 *    - test.only() - Run ONLY this test (debugging)
 *    - test.fixme() - Mark as broken (needs fixing)
 *    - test.slow() - Triple the timeout (slow operations)
 *    - test.fail() - Expect test to fail (known bugs)
 * 
 * 2. Describe Annotations:
 *    - test.describe.skip() - Skip entire suite
 *    - test.describe.only() - Run only this suite
 *    - test.describe.fixme() - Mark entire suite as broken
 * 
 * 3. Conditional Annotations:
 *    - test.skip(condition, reason)
 *    - test.slow(condition, reason)
 *    - test.fail(condition, reason)
 * 
 * 4. Common Use Cases:
 *    - skip: Feature not implemented, environment-specific
 *    - only: Debugging single test (remove before commit!)
 *    - fixme: Known broken test, needs attention
 *    - slow: Large uploads, heavy processing
 *    - fail: Known bugs, temporary workarounds
 * 
 * 5. Best Practices:
 *    - Always provide reason for skip/fixme
 *    - Remove test.only() before committing
 *    - Use fixme for broken tests (better than skip)
 *    - Use conditional annotations for environment-specific tests
 *    - Document known bugs with test.fail()
 * 
 * 🎯 Next: Learn about custom fixtures
 */

