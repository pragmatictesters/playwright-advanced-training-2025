# Test Files

This directory contains all test files for the Playwright Advanced Training 2025 workshop.

---

## 📁 Directory Structure

```
tests/
├── README.md                      # This file
├── 01-first-test.spec.ts         # ⭐ START HERE - Reference implementation
└── examples/                      # Original Playwright examples
    └── example.spec.ts            # Default Playwright sample
```

---

## 🎯 Test Files Overview

### **[01-first-test.spec.ts](./01-first-test.spec.ts)** ⭐ START HERE

**Purpose**: Reference implementation demonstrating all coding conventions and best practices

**What it demonstrates:**
- ✅ Proper file naming (`kebab-case.spec.ts`)
- ✅ Descriptive test names (not 'test1' or 'loginTest')
- ✅ Playwright locators (getByRole, getByTestId, getByText)
- ✅ Web-first assertions (auto-wait and retry)
- ✅ Test independence (each test stands alone)
- ✅ No hard-coded waits (use smart waiting)
- ✅ TypeScript conventions (const, explicit types)
- ✅ Proper import organization
- ✅ Educational comments explaining WHY, not just WHAT

**How to run:**
```bash
# Run this specific test
npx playwright test 01-first-test

# Run in UI mode (interactive)
npx playwright test 01-first-test --ui

# Run in debug mode (step through)
npx playwright test 01-first-test --debug

# Run in headed mode (see browser)
npx playwright test 01-first-test --headed
```

**Learning approach:**
1. Read the file top to bottom
2. Pay attention to the `✅ CONVENTION:` comments
3. Run the test and observe the behavior
4. Experiment by modifying the test
5. Reference the [Coding Conventions Guide](../docs/best-practices/01-coding-conventions.md)

---

### **[examples/example.spec.ts](./examples/example.spec.ts)**

**Purpose**: Original Playwright example from installation

**What it demonstrates:**
- Basic Playwright test structure
- Simple navigation and assertions
- Default Playwright patterns

**Note**: This is the original example created by `npm init playwright@latest`. It's kept as a reference to show the default Playwright setup.

---

## 🚀 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test 01-first-test
```

### Run in Different Modes

#### UI Mode (Interactive - Recommended for Learning)
```bash
npx playwright test --ui
```
- Visual test runner
- See tests execute in real-time
- Time travel debugging
- Pick and choose which tests to run

#### Debug Mode (Step Through)
```bash
npx playwright test --debug
```
- Opens Playwright Inspector
- Step through each action
- Inspect page state
- Perfect for understanding test flow

#### Headed Mode (See Browser)
```bash
npx playwright test --headed
```
- Tests run automatically
- Browser window is visible
- Good for demos and presentations

#### Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📖 Learning Path

### For Complete Beginners

1. **Read the fundamentals** (if you haven't already)
   - [Test Automation Basics](../docs/fundamentals/01-test-automation-basics.md)
   - [Playwright Overview](../docs/fundamentals/02-playwright-overview.md)

2. **Read the coding conventions** (essential!)
   - [Coding Conventions Guide](../docs/best-practices/01-coding-conventions.md)

3. **Study the first test**
   - Open `01-first-test.spec.ts`
   - Read all comments carefully
   - Understand each convention

4. **Run the test**
   ```bash
   npx playwright test 01-first-test --ui
   ```

5. **Experiment**
   - Modify the test
   - Try different locators
   - Add your own assertions
   - Break things and fix them!

### For Experienced Developers

1. **Skim the conventions**
   - [Coding Conventions Guide](../docs/best-practices/01-coding-conventions.md)

2. **Review the first test**
   - `01-first-test.spec.ts`
   - Focus on Playwright-specific patterns

3. **Run and experiment**
   ```bash
   npx playwright test 01-first-test --ui
   ```

---

## 🎓 Key Conventions Demonstrated

### File Naming
- ✅ Use `kebab-case.spec.ts`
- ✅ Number prefix for sequential tests (`01-`, `02-`, etc.)
- ❌ Don't use `PascalCase` or `snake_case`

### Test Naming
- ✅ Descriptive sentences: `'user can login with valid credentials'`
- ❌ Don't use: `'test1'`, `'loginTest'`, `'Login'`

### Locator Priority Order
1. 🥇 `getByTestId()` - Most stable (add `data-testid` to your app)
2. 🥈 `getByRole()` - Accessible and semantic
3. 🥉 `getByLabel()` - For form inputs
4. 4️⃣ `getByPlaceholder()` - For inputs with placeholders
5. 5️⃣ `getByText()` - For unique text
6. ⚠️ CSS selectors - Last resort only

### Assertions
- ✅ Always use web-first assertions: `await expect(page).toHaveTitle()`
- ❌ Never use manual assertions: `expect(await page.title()).toBe()`

### Test Independence
- ✅ Each test navigates to the page independently
- ✅ Tests can run in any order
- ✅ Tests can run in parallel
- ❌ Tests should never depend on each other

---

## 🐛 Troubleshooting

### Tests Failing?

1. **Check if browsers are installed**
   ```bash
   npx playwright install
   ```

2. **Run in debug mode**
   ```bash
   npx playwright test 01-first-test --debug
   ```

3. **Check the website is accessible**
   - Tests use `https://playwright.dev/`
   - Ensure you have internet connection

4. **See the [Troubleshooting Guide](../docs/installation/04-troubleshooting.md)**

---

## 📚 Additional Resources

- **[Coding Conventions](../docs/best-practices/01-coding-conventions.md)** - Complete conventions guide
- **[Command Reference](../docs/installation/06-command-reference.md)** - All Playwright commands
- **[Official Playwright Docs](https://playwright.dev/)** - Official documentation
- **[Playwright API](https://playwright.dev/docs/api/class-playwright)** - Complete API reference

---

## 🎯 Next Steps

After mastering the first test:

1. **Create your own tests** following the conventions
2. **Explore Page Object Model** (coming soon)
3. **Learn about fixtures** (coming soon)
4. **API testing with Playwright** (coming soon)
5. **Visual testing** (coming soon)

---

## 💡 Tips

- **Use UI Mode** (`--ui`) for learning - it's the best way to understand tests
- **Read the comments** in `01-first-test.spec.ts` - they explain the WHY
- **Experiment freely** - breaking things is how you learn!
- **Reference the conventions** - keep the guide open while coding
- **Ask questions** - open issues or discussions in the repository

---

**Happy Testing! 🎭**

