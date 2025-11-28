# 🎯 TypeScript Essentials for Playwright

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 25 minutes](https://img.shields.io/badge/Time-25%20minutes-blue)

## 📚 Why TypeScript?

TypeScript is JavaScript with **type safety**. It catches errors before you run your code!

```typescript
// JavaScript - Error only at runtime 😱
const user = { name: 'Alice' };
console.log(user.email);  // undefined - no warning!

// TypeScript - Error at compile time ✅
interface User { name: string; email: string; }
const user: User = { name: 'Alice' };  // ❌ Error: missing 'email'
```

**Benefits for Test Automation:**
- ✅ **Autocomplete** - IDE suggests methods and properties
- ✅ **Error Prevention** - Catch typos and type mismatches early
- ✅ **Better Refactoring** - Rename symbols safely across files
- ✅ **Self-Documenting** - Types explain what data looks like

---

## 📦 Variables: `const`, `let`, and `var`

### The Golden Rule: Use `const` by Default

```typescript
// ✅ GOOD: Use const for values that don't change
const baseUrl = 'https://example.com';
const timeout = 30000;
const testUser = { name: 'Alice', email: 'alice@test.com' };

// ✅ OK: Use let when you need to reassign
let retryCount = 0;
retryCount++;  // Reassignment needed

// ❌ NEVER: Don't use var (confusing scope rules)
var oldStyle = 'avoid this';
```

### In Playwright Tests

```typescript
test('example', async ({ page }) => {
  const loginPage = '/login';           // ✅ const - URL doesn't change
  const username = 'testuser';          // ✅ const - value doesn't change
  
  let attempts = 0;                     // ✅ let - will be incremented
  while (attempts < 3) {
    attempts++;
  }
});
```

---

## 🔤 Basic Data Types

```typescript
// Primitives
const name: string = 'Alice';
const age: number = 25;
const isActive: boolean = true;

// Arrays
const browsers: string[] = ['chromium', 'firefox', 'webkit'];
const scores: number[] = [95, 87, 92];

// Objects
const user: { name: string; email: string } = {
  name: 'Alice',
  email: 'alice@example.com'
};

// Type inference (TypeScript figures it out)
const city = 'London';        // TypeScript knows it's a string
const count = 42;             // TypeScript knows it's a number
```

---

## ➡️ Arrow Functions

Arrow functions are the **modern way** to write functions in JavaScript/TypeScript.

### Basic Syntax

```typescript
// Traditional function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (same thing, shorter)
const add = (a: number, b: number): number => {
  return a + b;
};

// Even shorter (implicit return)
const add = (a: number, b: number): number => a + b;
```

### In Playwright Tests

```typescript
// ✅ Every Playwright test uses arrow functions!
test('user can login', async ({ page }) => {
  await page.goto('/login');
});

// ✅ Callbacks use arrow functions
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// ✅ Array methods use arrow functions
const items = ['a', 'b', 'c'];
items.forEach(item => console.log(item));
```

---

## ⏳ Async/Await (CRITICAL!)

**This is the #1 concept you MUST understand for Playwright!**

### What is Async/Await?

- **Async operations** take time (network requests, page loads, clicking elements)
- **`await`** pauses execution until the operation completes
- **`async`** marks a function that uses `await`

### The Problem Without Await

```typescript
// ❌ WRONG - Doesn't wait for page to load!
test('broken test', async ({ page }) => {
  page.goto('/login');           // Starts loading but doesn't wait
  page.fill('#email', 'test');   // Tries to fill before page loads!
  // 💥 Test fails randomly
});
```

### The Solution: Always Await

```typescript
// ✅ CORRECT - Waits for each action
test('working test', async ({ page }) => {
  await page.goto('/login');           // Wait for page to load
  await page.fill('#email', 'test');   // Wait for fill to complete
  await page.click('#submit');         // Wait for click
  await expect(page).toHaveURL(/dashboard/);  // Wait for assertion
});
```

### Visual Explanation

```
Without await:          With await:
─────────────────       ─────────────────
goto() ──┐              goto() ──────────┐
fill() ──┤ (parallel)   fill() ──────────┤ (sequential)
click()──┘              click()──────────┘
         ↓                               ↓
    💥 Race condition!              ✅ Works correctly!
```

### Async Functions Return Promises

```typescript
// An async function always returns a Promise
async function getTitle(page: Page): Promise<string> {
  await page.goto('/');
  return await page.title();
}

// Must await when calling async functions
const title = await getTitle(page);
```

---

## 🎁 Destructuring

Destructuring lets you **extract values** from objects and arrays easily.

### Object Destructuring

```typescript
// Without destructuring
const user = { name: 'Alice', email: 'alice@test.com', age: 25 };
const name = user.name;
const email = user.email;

// ✅ With destructuring (cleaner!)
const { name, email } = user;

// Rename while destructuring
const { name: userName, email: userEmail } = user;
```

### In Playwright Tests (You Use This Every Test!)

```typescript
// ✅ Playwright fixtures use destructuring!
test('example', async ({ page }) => {
  // 'page' is destructured from the test fixtures object
});

// Multiple fixtures
test('api test', async ({ page, request, context }) => {
  // All three are destructured
});

// With beforeEach
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
```

### Array Destructuring

```typescript
// Get first and second items
const browsers = ['chromium', 'firefox', 'webkit'];
const [first, second] = browsers;
// first = 'chromium', second = 'firefox'

// Skip items with empty slots
const [, , third] = browsers;
// third = 'webkit'

// In Playwright - get multiple elements
const items = await page.locator('.product').all();
const [firstProduct, secondProduct] = items;
```

---

## 📝 Template Literals

Template literals use **backticks** (`) and allow **string interpolation**.

### Basic Usage

```typescript
const name = 'Alice';
const age = 25;

// ❌ Old way (concatenation)
const message = 'Hello, ' + name + '! You are ' + age + ' years old.';

// ✅ Template literal (cleaner!)
const message = `Hello, ${name}! You are ${age} years old.`;
```

### In Playwright Tests

```typescript
// Dynamic selectors
const userId = 123;
await page.locator(`[data-user-id="${userId}"]`).click();
await page.locator(`#user-${userId}`).isVisible();

// Dynamic URLs
const baseUrl = 'https://example.com';
const endpoint = 'users';
await page.goto(`${baseUrl}/${endpoint}/profile`);

// Dynamic test names
const testCases = ['admin', 'user', 'guest'];
for (const role of testCases) {
  test(`should allow ${role} to view dashboard`, async ({ page }) => {
    // Test logic
  });
}
```

### Multi-line Strings

```typescript
// Template literals preserve line breaks
const query = `
  SELECT *
  FROM users
  WHERE status = 'active'
`;
```

---

## 🔄 Array Methods

These methods are essential for **data-driven testing**.

### `forEach` - Loop Through Items

```typescript
const users = ['alice', 'bob', 'charlie'];

users.forEach(user => {
  console.log(`Processing ${user}`);
});
```

### `map` - Transform Each Item

```typescript
const names = ['alice', 'bob'];
const emails = names.map(name => `${name}@test.com`);
// Result: ['alice@test.com', 'bob@test.com']
```

### `filter` - Keep Matching Items

```typescript
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(n => n % 2 === 0);
// Result: [2, 4]
```

### `find` - Get First Match

```typescript
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
];
const admin = users.find(user => user.role === 'admin');
// Result: { name: 'Alice', role: 'admin' }
```

### In Playwright - Data-Driven Tests

```typescript
const testData = [
  { username: 'alice', expected: 'Welcome Alice' },
  { username: 'bob', expected: 'Welcome Bob' },
];

for (const data of testData) {
  test(`login as ${data.username}`, async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', data.username);
    await page.click('#submit');
    await expect(page.locator('.welcome')).toHaveText(data.expected);
  });
}
```

---

## 📋 Interfaces & Types

Interfaces define the **shape of objects**.

### Basic Interface

```typescript
interface User {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Now TypeScript enforces the shape
const testUser: User = {
  name: 'Alice',
  email: 'alice@test.com',
  age: 25,
  isActive: true
};
```

### Optional Properties

```typescript
interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;  // Optional (note the ?)
}

// Both are valid
const creds1: LoginCredentials = { username: 'alice', password: 'pass123' };
const creds2: LoginCredentials = { username: 'bob', password: 'pass456', rememberMe: true };
```

### In Playwright Tests

```typescript
// Define test data structure
interface TestUser {
  username: string;
  password: string;
  expectedPage: string;
}

const users: TestUser[] = [
  { username: 'admin', password: 'admin123', expectedPage: '/admin' },
  { username: 'user', password: 'user123', expectedPage: '/dashboard' },
];

for (const user of users) {
  test(`${user.username} redirects to ${user.expectedPage}`, async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('#login');
    await expect(page).toHaveURL(user.expectedPage);
  });
}
```

---

## ❌ Common Mistakes (Avoid These!)

### Mistake 1: Forgetting `await`

```typescript
// ❌ WRONG - Missing await
test('broken', async ({ page }) => {
  page.goto('/login');        // ❌ Not awaited!
  page.fill('#email', 'test'); // ❌ Runs before page loads!
});

// ✅ CORRECT
test('working', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'test');
});
```

### Mistake 2: Forgetting `async`

```typescript
// ❌ WRONG - Using await without async
test('broken', ({ page }) => {        // ❌ Missing async!
  await page.goto('/login');          // ❌ SyntaxError!
});

// ✅ CORRECT
test('working', async ({ page }) => {  // ✅ async added
  await page.goto('/login');
});
```

### Mistake 3: Using `var`

```typescript
// ❌ WRONG - var has confusing scope
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 (not 0, 1, 2!)

// ✅ CORRECT - let has block scope
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2 ✅
```

### Mistake 4: Modifying `const` Objects (Allowed!)

```typescript
// ✅ This is VALID (surprising but true!)
const user = { name: 'Alice' };
user.name = 'Bob';  // ✅ Properties CAN be changed!
user.email = 'bob@test.com';  // ✅ Properties CAN be added!

// ❌ This is NOT allowed
const user = { name: 'Alice' };
user = { name: 'Bob' };  // ❌ Cannot reassign const variable!
```

### Mistake 5: String Quotes in Template Literals

```typescript
// ❌ WRONG - Using regular quotes
const name = 'Alice';
const greeting = 'Hello, ${name}!';  // ❌ Prints: Hello, ${name}!

// ✅ CORRECT - Using backticks
const greeting = `Hello, ${name}!`;  // ✅ Prints: Hello, Alice!
```

---

## 📚 Quick Reference

### Variable Declaration

| Keyword | Reassignable | Scope | Use When |
|---------|--------------|-------|----------|
| `const` | ❌ No | Block | Default choice |
| `let` | ✅ Yes | Block | Need to reassign |
| `var` | ✅ Yes | Function | ❌ Never use |

### Arrow Function Syntax

```typescript
// No parameters
const greet = () => console.log('Hello');

// One parameter (parentheses optional)
const double = x => x * 2;
const double = (x) => x * 2;  // Same thing

// Multiple parameters
const add = (a, b) => a + b;

// Multi-line body (needs braces and return)
const process = (data) => {
  const result = data.trim();
  return result.toUpperCase();
};
```

### Async/Await Cheat Sheet

```typescript
// Async function declaration
async function doSomething(): Promise<void> {
  await someAsyncOperation();
}

// Async arrow function
const doSomething = async (): Promise<void> => {
  await someAsyncOperation();
};

// Error handling
try {
  await riskyOperation();
} catch (error) {
  console.error('Failed:', error);
}
```

### Destructuring Patterns

```typescript
// Object
const { name, email } = user;
const { name: userName } = user;  // Rename

// Array
const [first, second] = items;
const [, , third] = items;  // Skip items

// Function parameters
const greet = ({ name, age }: User) => `${name} is ${age}`;
```

---

## 🔗 Learn More

**Official Documentation:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Complete guide
- [JavaScript.info](https://javascript.info/) - Excellent JS tutorial
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Reference

**Specific Topics:**
- [Async/Await](https://javascript.info/async-await) - Deep dive
- [Arrow Functions](https://javascript.info/arrow-functions-basics) - Full explanation
- [Destructuring](https://javascript.info/destructuring-assignment) - All patterns

**Practice:**
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try code online
- [Exercism TypeScript Track](https://exercism.org/tracks/typescript) - Practice exercises

---

## 🎯 Key Takeaways

| Concept | Remember |
|---------|----------|
| `const` vs `let` | Use `const` by default, `let` only when reassigning |
| Arrow functions | `async ({ page }) => { }` is standard in Playwright |
| **Async/Await** | **ALWAYS `await` Playwright actions!** |
| Destructuring | `{ page }` extracts page from fixtures |
| Template literals | Use backticks `` ` `` for string interpolation |
| Interfaces | Define shapes for type-safe test data |

---

## 🚀 Next Steps

1. **Practice** - Write a few tests using these concepts
2. **Read** [Coding Conventions](../best-practices/01-coding-conventions.md) - Team standards
3. **Explore** [Playwright Fixtures](../../tests/examples/fixtures/) - See destructuring in action
4. **Try** data-driven tests with arrays and interfaces

---

**Remember:** You don't need to master TypeScript to use Playwright. These essentials cover 90% of what you'll need. Learn more as you go! 🎭

---

**Pragmatic Test Labs** | Playwright Advanced Training 2025
```

