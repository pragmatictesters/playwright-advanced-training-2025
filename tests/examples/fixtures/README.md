# Playwright Fixtures and Annotations Examples

![Difficulty: Intermediate](https://img.shields.io/badge/Difficulty-Intermediate-yellow)
![Type: Demo](https://img.shields.io/badge/Type-Demo-blue)

## 📚 Overview

This directory contains **demonstration examples** for Playwright fixtures, hooks, and annotations using **console output only** (no browser automation). These examples are designed to help you understand core concepts before applying them to real tests.

---

## 🎯 Purpose

These examples use **console.log()** statements to clearly show:
- Test execution order
- Hook lifecycle (beforeEach, afterEach, etc.)
- Fixture setup and teardown
- Annotation behavior
- Dependency resolution

**Why console messages?**
- ✅ Focus on concepts, not UI complexity
- ✅ Clear, immediate feedback
- ✅ Fast execution (no browser overhead)
- ✅ Easy to experiment and modify
- ✅ Perfect for learning and demonstrations

---

## 📁 Files

### **01-basic-structure.spec.ts**
**Topics**: Basic test structure and organization
- Single tests
- `test.describe()` blocks
- Nested describe blocks
- Test naming conventions
- Test execution order
- Test isolation

**Run**: `npm run demo:fixtures:basic`

---

### **02-hooks.spec.ts**
**Topics**: Test hooks (setup and teardown)
- `test.beforeAll()` - runs once before all tests
- `test.afterAll()` - runs once after all tests
- `test.beforeEach()` - runs before each test
- `test.afterEach()` - runs after each test
- Hook execution order
- Nested hooks
- Real-world use cases

**Run**: `npm run demo:fixtures:hooks`

---

### **03-annotations.spec.ts**
**Topics**: Test annotations
- `test.skip()` - skip tests
- `test.only()` - focus on specific tests
- `test.fixme()` - mark tests as broken
- `test.slow()` - triple the timeout
- `test.fail()` - expect test to fail
- Conditional annotations
- Annotations on describe blocks

**Run**: `npm run demo:fixtures:annotations`

---

### **04-custom-fixtures.spec.ts**
**Topics**: Creating custom fixtures
- What fixtures are and why they're useful
- Creating simple fixtures
- Multiple fixtures
- Fixture setup and teardown
- Complex fixtures (database, auth, etc.)
- Fixture execution order

**Run**: `npm run demo:fixtures:custom`

---

### **05-fixture-composition.spec.ts**
**Topics**: Fixtures depending on other fixtures
- Simple fixture dependencies
- Fixture chains (A → B → C)
- Multiple dependencies
- Real-world composition patterns
- Conditional dependencies
- Dependency graphs

**Run**: `npm run demo:fixtures:composition`

---

## 🚀 Quick Start

### Run All Examples
```bash
npm run demo:fixtures
```

### Run Individual Examples
```bash
npm run demo:fixtures:basic
npm run demo:fixtures:hooks
npm run demo:fixtures:annotations
npm run demo:fixtures:custom
npm run demo:fixtures:composition
```

### Run with Specific Browser
```bash
npm run demo:fixtures -- --project=chromium
npm run demo:fixtures -- --project=firefox
npm run demo:fixtures -- --project=webkit
```

### Run in UI Mode
```bash
npx playwright test tests/examples/fixtures --ui
```

---

## 📊 What You'll Learn

### 1. Test Organization
- How to structure tests with `describe()` blocks
- Nested test suites
- Test naming best practices
- Test isolation principles

### 2. Test Lifecycle
- Hook execution order
- When to use each hook type
- Setup and teardown patterns
- Nested hook behavior

### 3. Test Control
- Skipping tests conditionally
- Focusing on specific tests for debugging
- Marking broken tests
- Handling slow tests
- Documenting known failures

### 4. Fixtures
- What fixtures are and their benefits
- Creating reusable test setup
- Automatic cleanup
- Type-safe fixtures
- Dependency injection

### 5. Advanced Patterns
- Fixture composition
- Dependency chains
- Building complex scenarios
- Real-world patterns

---

## 🎓 Learning Path

**Recommended order**:
1. **01-basic-structure.spec.ts** - Start here to understand test basics
2. **02-hooks.spec.ts** - Learn about setup/teardown
3. **03-annotations.spec.ts** - Control test execution
4. **04-custom-fixtures.spec.ts** - Create reusable fixtures
5. **05-fixture-composition.spec.ts** - Build complex fixtures

---

## 💡 Key Concepts

### Hooks Execution Order
```
beforeAll (once)
  ↓
  beforeEach
    ↓
    TEST 1
    ↓
  afterEach
  ↓
  beforeEach
    ↓
    TEST 2
    ↓
  afterEach
  ↓
afterAll (once)
```

### Fixture Lifecycle
```
Setup Fixture
  ↓
await use(value) → Provide to test
  ↓
Test executes
  ↓
Teardown Fixture
```

### Fixture Dependencies
```
Config
  ↓
API Client (depends on Config)
  ↓
User Service (depends on API Client)
  ↓
Test (uses User Service)
```

---

## 🔍 Console Output Examples

### Example 1: Hooks
```
🔧 beforeAll: Setting up test suite
  ▶️  beforeEach: Setting up test
    ✅ Test 1: Executing
  ⏹️  afterEach: Cleaning up test
  ▶️  beforeEach: Setting up test
    ✅ Test 2: Executing
  ⏹️  afterEach: Cleaning up test
🧹 afterAll: Cleaning up test suite
```

### Example 2: Fixtures
```
🔧 Setup: Database connection
  🔧 Setup: Authenticated user (depends on database)
    ✅ Test: Using authenticated user
  🧹 Teardown: Authenticated user
🧹 Teardown: Database connection
```

---

## 🎯 Real-World Application

After understanding these concepts, you can apply them to:

### OrangeHRM Tests (Day 2)
- Refactor login logic into fixtures
- Use hooks for common setup
- Add annotations for environment-specific tests

### Page Object Model (Day 3)
- Create page fixtures
- Compose page fixtures
- Reuse across tests

### API Testing (Day 4+)
- API client fixtures
- Authentication fixtures
- Test data fixtures

---

## 📝 Best Practices

### ✅ Do:
- Use descriptive test names
- Keep fixtures focused (single responsibility)
- Use `beforeEach` for test isolation
- Use `beforeAll` for expensive operations
- Document fixture dependencies
- Provide reasons for skip/fixme annotations

### ❌ Don't:
- Share state between tests
- Use `test.only()` in committed code
- Create circular fixture dependencies
- Put complex logic in hooks
- Skip tests without explanation

---

## 🔧 Customization

### Modify Examples
Feel free to modify these examples to experiment:
- Change console messages
- Add more tests
- Create new fixtures
- Try different patterns

### Create Your Own
Use these as templates for your own fixture examples:
```typescript
import { test as base } from '@playwright/test';

type MyFixtures = {
  myFixture: string;
};

const test = base.extend<MyFixtures>({
  myFixture: async ({}, use) => {
    console.log('Setup');
    await use('value');
    console.log('Teardown');
  },
});

test('my test', ({ myFixture }) => {
  console.log(`Using: ${myFixture}`);
});
```

---

## 📚 Additional Resources

### Playwright Documentation
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)
- [Test Hooks](https://playwright.dev/docs/api/class-test#test-before-each)
- [Test Annotations](https://playwright.dev/docs/test-annotations)

### Training Materials
- Day 1: Basic Playwright concepts
- Day 2: Real-world testing (OrangeHRM)
- Day 3: Page Object Model with fixtures
- Day 4+: Advanced patterns

---

## 🎉 Summary

These examples provide a **solid foundation** for understanding:
- ✅ Test structure and organization
- ✅ Test lifecycle and hooks
- ✅ Test annotations and control
- ✅ Custom fixtures and composition
- ✅ Real-world patterns

**Next Steps**:
1. Run all examples and observe console output
2. Modify examples to experiment
3. Apply concepts to real tests (OrangeHRM)
4. Create your own fixtures for your project

---

## 🤔 Questions?

If you have questions about:
- **Concepts**: Review the examples and console output
- **Syntax**: Check the code comments and JSDoc
- **Application**: See the "Real-World Application" section
- **Best Practices**: Review the "Best Practices" section

---

**Happy Learning!** 🎭✨


