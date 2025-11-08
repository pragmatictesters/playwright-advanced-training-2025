# Day 1 - Exercise 1: Getting Started with Playwright

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 30-45 minutes](https://img.shields.io/badge/Time-30--45%20minutes-blue)

## 🎯 Learning Objectives

By completing this exercise, you will:
- ✅ Set up a new Playwright project from scratch
- ✅ Install Playwright and configure it
- ✅ Create and run your first tests
- ✅ Use different test execution modes (headless, headed, UI mode)
- ✅ View test reports
- ✅ Configure `.gitignore` for version control
- ✅ Add npm scripts for common commands

---

## 📋 Prerequisites

- ✅ Node.js 18+ installed
- ✅ VS Code (or any code editor)
- ✅ Git installed
- ✅ Basic understanding of command line

---

## 🚀 Exercise Steps

### Step 1: Create a New Git Project

Create a new folder and initialize Git:

```bash
# Create project folder
mkdir advanced-playwright
cd advanced-playwright

# Initialize Git repository
git init

# Check Git status
git status
```

**Expected output**: You should see "Initialized empty Git repository"

---

### Step 2: Initialize Playwright Project

Install Playwright using the official initialization command:

```bash
# Initialize Playwright (answer prompts as shown below)
npm init playwright@latest
```

**When prompted, choose:**
- ✅ TypeScript or JavaScript? → **TypeScript**
- ✅ Where to put your end-to-end tests? → **tests**
- ✅ Add a GitHub Actions workflow? → **No** (we'll do this later)
- ✅ Install Playwright browsers? → **Yes**

**Wait for installation to complete** (this may take a few minutes)

---

### Step 3: Verify Installation

Check that Playwright was installed correctly:

```bash
# Check Playwright version
npx playwright --version

# List installed browsers
npx playwright install --dry-run
```

**Expected output**: You should see the Playwright version and list of browsers (Chromium, Firefox, WebKit)

---

### Step 4: Create `.gitignore` File

Create a `.gitignore` file to exclude unnecessary files from Git:

**Create a file named `.gitignore` in your project root** with this content:

```gitignore
# Node modules
node_modules/

# Playwright
test-results/
playwright-report/
playwright/.cache/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Environment variables
.env
.env.local

# Logs
*.log
npm-debug.log*
```

**Verify it matches**: https://github.com/pragmatictesters/playwright-advanced-training-2025/blob/main/.gitignore

---

### Step 5: Run the Example Test

Playwright creates an example test. Let's run it!

```bash
# Run all tests (headless mode - no browser window)
npx playwright test

# View the HTML report
npx playwright show-report
```

**Expected output**: 
- Tests should pass ✅
- HTML report should open in your browser

---

### Step 6: Run Tests in Different Modes

Try running tests in different modes:

**Headed mode** (see the browser):
```bash
npx playwright test --headed
```

**UI Mode** (interactive mode):
```bash
npx playwright test --ui
```

**Debug mode** (step through tests):
```bash
npx playwright test --debug
```

**Single browser** (Chromium only):
```bash
npx playwright test --project=chromium
```

---

### Step 7: Create Your First Test

Create a new test file: `tests/my-first-test.spec.ts`

**Copy this content** (from Playwright official website examples):

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev/');

  // Expect page to have a title containing "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev/');

  // Click the "Get started" link
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name "Installation"
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('check documentation link', async ({ page }) => {
  // Go to Playwright website
  await page.goto('https://playwright.dev/');

  // Click on "Docs" link
  await page.getByRole('link', { name: 'Docs' }).click();

  // Verify we're on the docs page
  await expect(page).toHaveURL(/.*docs/);
});
```

**Save the file** and run your new tests:

```bash
# Run only your new test file
npx playwright test my-first-test

# Run in headed mode to see what's happening
npx playwright test my-first-test --headed
```

---

### Step 8: Modify Configuration File

Open `playwright.config.ts` and make these changes:

**Find this line** (around line 7):
```typescript
fullyParallel: true,
```

**Change it to**:
```typescript
fullyParallel: false,
```

**Find this line** (around line 10):
```typescript
retries: process.env.CI ? 2 : 0,
```

**Change it to**:
```typescript
retries: 1,
```

**Find this line** (around line 13):
```typescript
workers: process.env.CI ? 1 : undefined,
```

**Change it to**:
```typescript
workers: 1,
```

**Save the file** and run tests again:

```bash
npx playwright test
```

**Notice**: Tests now run one at a time (not in parallel)

---

### Step 9: Add npm Scripts

Open `package.json` and add these scripts to the `"scripts"` section:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "report": "playwright show-report",
    "codegen": "playwright codegen"
  }
}
```

**Now you can run tests using npm commands**:

```bash
# Run all tests
npm test

# Run in headed mode
npm run test:headed

# Open UI mode
npm run test:ui

# View report
npm run report

# Generate test code
npm run codegen
```

**Try each command** to see how they work!

---

### Step 10: View Test Reports

After running tests, view the reports:

```bash
# Run tests to generate a report
npm test

# Open HTML report
npm run report
```

**Explore the report**:
- ✅ See which tests passed/failed
- ✅ View test duration
- ✅ Check screenshots (if any)
- ✅ See test traces

---

### Step 11: Commit Your Work

Save your work to Git:

```bash
# Check what files changed
git status

# Add all files
git add .

# Commit with a message
git commit -m "Day 1: Initial Playwright setup with first tests"

# View commit history
git log --oneline
```

---

## ✅ Verification Checklist

Make sure you've completed all steps:

- [ ] Created `advanced-playwright` folder
- [ ] Initialized Git repository
- [ ] Installed Playwright
- [ ] Created `.gitignore` file
- [ ] Ran example tests in headless mode
- [ ] Ran tests in headed mode
- [ ] Ran tests in UI mode
- [ ] Created `my-first-test.spec.ts` with 3 tests
- [ ] Modified `playwright.config.ts` (parallel, retries, workers)
- [ ] Added npm scripts to `package.json`
- [ ] Ran tests using npm commands
- [ ] Viewed HTML report
- [ ] Committed changes to Git

---

## 📊 Expected Results

### Your Project Structure Should Look Like:

```
advanced-playwright/
├── .git/
├── .gitignore
├── node_modules/
├── tests/
│   ├── example.spec.ts          (created by Playwright)
│   └── my-first-test.spec.ts    (created by you)
├── playwright.config.ts          (modified by you)
├── package.json                  (modified by you)
├── package-lock.json
└── README.md
```

### Test Results:

- ✅ All tests should pass
- ✅ You should see 3 tests in `my-first-test.spec.ts`
- ✅ Tests should run in Chromium, Firefox, and WebKit (9 total test runs)

---

## 🎓 What You Learned

### Commands You Used:

| Command | What It Does |
|---------|--------------|
| `npm init playwright@latest` | Initialize new Playwright project |
| `npx playwright test` | Run all tests (headless) |
| `npx playwright test --headed` | Run tests with visible browser |
| `npx playwright test --ui` | Open interactive UI mode |
| `npx playwright test --debug` | Run tests in debug mode |
| `npx playwright show-report` | View HTML test report |
| `npx playwright codegen` | Generate test code interactively |

### Files You Modified:

| File | What You Changed |
|------|------------------|
| `.gitignore` | Added files to exclude from Git |
| `playwright.config.ts` | Changed parallel, retries, workers settings |
| `package.json` | Added npm scripts for common commands |
| `tests/my-first-test.spec.ts` | Created your first test file |

---

## 🤔 Common Issues & Solutions

### Issue 1: "command not found: npx"
**Solution**: Node.js not installed. Install from https://nodejs.org

### Issue 2: Tests fail with timeout
**Solution**: Slow internet connection. Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

### Issue 3: Browsers not installed
**Solution**: Run:
```bash
npx playwright install
```

### Issue 4: `.gitignore` not working
**Solution**: Make sure the file is named exactly `.gitignore` (with the dot at the start)

---

## 🚀 Bonus Challenges (Optional)

If you finish early, try these:

### Challenge 1: Add More Tests
Add 2 more tests to `my-first-test.spec.ts` that:
- Check if the search box is visible
- Click on "API" link and verify the URL

### Challenge 2: Run Specific Browser
Run your tests only in Firefox:
```bash
npm run test:firefox
```

### Challenge 3: Generate a Test
Use codegen to generate a test for https://demo.playwright.dev/todomvc:
```bash
npm run codegen https://demo.playwright.dev/todomvc
```

---

## 📚 Reference Links

- **Playwright Official Docs**: https://playwright.dev/
- **Writing Tests**: https://playwright.dev/docs/writing-tests
- **Running Tests**: https://playwright.dev/docs/running-tests
- **Test Reports**: https://playwright.dev/docs/test-reporters
- **Configuration**: https://playwright.dev/docs/test-configuration

---

## 🎉 Congratulations!

You've completed Day 1 Exercise 1! 🎭

You now know how to:
- ✅ Set up a Playwright project
- ✅ Run tests in different modes
- ✅ Create your own tests
- ✅ Configure Playwright
- ✅ Use npm scripts
- ✅ View test reports
- ✅ Use Git for version control

**Next**: Day 2 will cover writing more advanced tests and using locators!

---

**Questions?** Ask your trainer or check the [Troubleshooting Guide](../../installation/04-troubleshooting.md)

**Happy Testing!** 🚀✨

