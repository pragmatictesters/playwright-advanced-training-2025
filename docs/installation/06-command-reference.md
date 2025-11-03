# Playwright Command Reference

Quick reference for common Playwright commands. Keep this page handy during development and testing.

## 🚀 Running Tests

### Run All Tests (Headless)
```bash
npx playwright test
```
- **When to use**: CI/CD, automated testing, quick validation
- **Behavior**: Runs all tests in headless mode (no browser UI visible)
- **Output**: Terminal summary with pass/fail results

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```
- **When to use**: Development, debugging, learning, exploring tests
- **Behavior**: Opens interactive UI - tests do NOT run automatically
- **Features**: 
  - Click to run individual tests
  - Watch mode (auto-rerun on file changes)
  - Time-travel debugging
  - Built-in trace viewer
  - Locator picker

> **Note**: UI Mode is interactive - you must manually select and run tests. This is the intended behavior!

### Run Tests with Visible Browser (Headed)
```bash
npx playwright test --headed
```
- **When to use**: Debugging, seeing what the test does, demos
- **Behavior**: Tests run automatically with browser window visible
- **Difference from UI Mode**: Tests execute automatically, not interactive

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```
- **When to use**: Step-by-step debugging, investigating failures
- **Behavior**: Opens Playwright Inspector, pauses at each action
- **Features**:
  - Step through each test action
  - Inspect page state
  - Try locators in real-time
  - View console logs

### Run Specific Test File
```bash
npx playwright test tests/example.spec.ts
```
- **When to use**: Working on specific feature, focused testing
- **Behavior**: Runs only the specified test file

### Run Tests Matching Pattern
```bash
npx playwright test tests/login
```
- **When to use**: Run all tests in a folder or matching a pattern
- **Behavior**: Runs all test files matching the pattern

### Run Single Test by Name
```bash
npx playwright test -g "test name"
```
- **When to use**: Run one specific test
- **Example**: `npx playwright test -g "should login successfully"`

### Run Tests with Specific Tag
```bash
npx playwright test --grep @smoke
```
- **When to use**: Run tagged test suites (smoke, regression, etc.)
- **Requires**: Tests tagged with `test.describe('@smoke', ...)`

---

## 🎯 Running Tests by Browser

### Run on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```
- **When to use**: Test browser-specific behavior
- **Available projects**: chromium, firefox, webkit, Mobile Chrome, Mobile Safari

### Run on All Browsers
```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```
- **When to use**: Cross-browser testing
- **Default**: Runs all projects defined in `playwright.config.ts`

---

## 📊 Viewing Results

### Show HTML Report
```bash
npx playwright show-report
```
- **When to use**: After test run, reviewing detailed results
- **Behavior**: Opens HTML report in browser
- **Contains**: Test results, screenshots, videos, traces

### Show Trace Viewer
```bash
npx playwright show-trace trace.zip
```
- **When to use**: Debugging failed tests, analyzing test execution
- **Behavior**: Opens interactive trace viewer
- **Features**: Timeline, screenshots, network, console logs

---

## 🎨 Code Generation

### Generate Test Code (Codegen)
```bash
npx playwright codegen
```
- **When to use**: Learning, quick test creation, exploring selectors
- **Behavior**: Opens browser and Inspector, records your actions
- **Output**: Generates test code as you interact with the page

### Generate Code for Specific URL
```bash
npx playwright codegen https://example.com
```
- **When to use**: Start recording from a specific page
- **Behavior**: Opens URL and starts recording immediately

### Generate Code with Device Emulation
```bash
npx playwright codegen --device="iPhone 13"
```
- **When to use**: Generate mobile tests
- **Behavior**: Emulates device and records actions

### Generate Code with Specific Browser
```bash
npx playwright codegen --browser=firefox
```
- **When to use**: Test browser-specific behavior
- **Options**: chromium, firefox, webkit

---

## 🔧 Browser Management

### Install All Browsers
```bash
npx playwright install
```
- **When to use**: First-time setup, after Playwright update
- **Behavior**: Downloads Chromium, Firefox, and WebKit

### Install Specific Browser
```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```
- **When to use**: Only need specific browser, save disk space
- **Behavior**: Downloads only the specified browser

### Install System Dependencies (Linux)
```bash
npx playwright install-deps
```
- **When to use**: Linux systems, CI/CD, Docker containers
- **Behavior**: Installs OS-level dependencies for browsers

### Install Browser with Dependencies
```bash
npx playwright install --with-deps chromium
```
- **When to use**: Linux first-time setup
- **Behavior**: Installs browser + system dependencies

---

## ⚙️ Configuration & Info

### List All Projects
```bash
npx playwright test --list
```
- **When to use**: See all configured test projects
- **Output**: Lists all projects from `playwright.config.ts`

### Show Playwright Version
```bash
npx playwright --version
```
- **When to use**: Verify installation, check version
- **Output**: Installed Playwright version

### Update Playwright
```bash
npm install -D @playwright/test@latest
npx playwright install
```
- **When to use**: Get latest features and fixes
- **Note**: Always run `install` after updating

---

## 🎬 Test Execution Options

### Run Tests in Parallel
```bash
npx playwright test --workers=4
```
- **When to use**: Speed up test execution
- **Default**: Uses CPU cores / 2
- **Note**: Set to 1 for debugging

### Run Tests Sequentially
```bash
npx playwright test --workers=1
```
- **When to use**: Debugging, tests with shared state
- **Behavior**: Runs one test at a time

### Run Tests with Retries
```bash
npx playwright test --retries=2
```
- **When to use**: Flaky tests, CI/CD
- **Behavior**: Retries failed tests up to N times

### Run Tests with Timeout
```bash
npx playwright test --timeout=60000
```
- **When to use**: Slow tests, custom timeout needs
- **Value**: Milliseconds (60000 = 60 seconds)

### Run Tests in Specific Reporter
```bash
npx playwright test --reporter=html
npx playwright test --reporter=json
npx playwright test --reporter=junit
npx playwright test --reporter=dot
npx playwright test --reporter=list
```
- **When to use**: Different output formats for CI/CD
- **html**: Interactive HTML report (default)
- **json**: Machine-readable JSON output
- **junit**: JUnit XML for CI integration
- **dot**: Minimal dot output
- **list**: Detailed list output

---

## 🔍 Advanced Commands

### Update Snapshots
```bash
npx playwright test --update-snapshots
```
- **When to use**: Update visual/text snapshots after intentional changes
- **Alias**: `-u`

### Run Tests in Global Setup/Teardown Only
```bash
npx playwright test --global-setup
npx playwright test --global-teardown
```
- **When to use**: Test setup/teardown scripts independently

### Run Tests with Specific Config File
```bash
npx playwright test --config=playwright.prod.config.ts
```
- **When to use**: Multiple environments (dev, staging, prod)
- **Behavior**: Uses specified config instead of default

---

## 📱 Mobile Testing

### Test on Mobile Chrome
```bash
npx playwright test --project="Mobile Chrome"
```
- **When to use**: Mobile-specific testing
- **Behavior**: Emulates mobile Chrome browser

### Test on Mobile Safari
```bash
npx playwright test --project="Mobile Safari"
```
- **When to use**: iOS-specific testing
- **Behavior**: Emulates mobile Safari browser

---

## 🆘 Help & Documentation

### Show Help
```bash
npx playwright test --help
```
- **Output**: All available options and flags

### Show Codegen Help
```bash
npx playwright codegen --help
```
- **Output**: Codegen-specific options

---

## 💡 Common Workflows

### Development Workflow
```bash
# 1. Write tests interactively
npx playwright test --ui

# 2. Generate code for complex interactions
npx playwright codegen https://example.com

# 3. Debug specific test
npx playwright test tests/login.spec.ts --debug

# 4. Run all tests before commit
npx playwright test
```

### CI/CD Workflow
```bash
# Install browsers in CI
npx playwright install --with-deps

# Run all tests with retries
npx playwright test --retries=2

# Generate reports
npx playwright test --reporter=html,junit
```

### Debugging Workflow
```bash
# 1. Run with visible browser
npx playwright test --headed

# 2. Run in debug mode
npx playwright test --debug

# 3. View trace of failed test
npx playwright show-trace test-results/example-test/trace.zip

# 4. Run single test
npx playwright test -g "failing test name"
```

---

## 📚 Quick Reference Table

| Command | Purpose | Interactive? |
|---------|---------|--------------|
| `npx playwright test` | Run all tests (headless) | No |
| `npx playwright test --ui` | Open UI Mode | Yes - Manual |
| `npx playwright test --headed` | Run with visible browser | No - Auto |
| `npx playwright test --debug` | Step-by-step debugging | Yes - Manual |
| `npx playwright codegen` | Generate test code | Yes - Recording |
| `npx playwright show-report` | View HTML report | Yes - Viewing |
| `npx playwright install` | Install browsers | No |

---

## 🔗 Related Documentation

- [Quick Start Guide](./01-quick-start.md) - Installation basics
- [Complete Guide](./02-complete-guide.md) - Detailed setup
- [Troubleshooting](./04-troubleshooting.md) - Common issues
- [Official Examples](./05-official-examples.md) - Example projects
- [Playwright CLI Docs](https://playwright.dev/docs/test-cli) - Official CLI reference

---

**Pro Tip**: Bookmark this page and keep it open during development for quick command lookup! 🚀

