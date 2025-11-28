# 📊 Playwright Test Reporting Guide

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 20 minutes](https://img.shields.io/badge/Time-20%20minutes-blue)

## 🎯 What is a Test Reporter?

A **test reporter** transforms your test results into readable formats. Think of it like a **translator** - it takes raw test data and presents it in a way that's easy to understand.

```
Test Runs → Reporter → Beautiful Report
```

**Why are reporters important?**
- ✅ **Visibility** - See which tests passed/failed at a glance
- ✅ **Debugging** - Screenshots, videos, and traces help find bugs
- ✅ **CI/CD Integration** - Share results with Jenkins, GitHub Actions, etc.
- ✅ **History** - Track test trends over time

---

## 📋 Built-in Reporters

Playwright includes **6 built-in reporters** - no installation needed!

| Reporter | Output | Best For | CI/CD Ready |
|----------|--------|----------|-------------|
| `html` | Interactive web page | 🔍 Local debugging | ⚠️ Needs hosting |
| `list` | Detailed console output | 👀 Quick feedback | ✅ Yes |
| `dot` | Minimal dots (`.` or `F`) | ⚡ Fast CI runs | ✅ Yes |
| `line` | One line per test | 📝 CI logs | ✅ Yes |
| `json` | JSON file | 🔧 Custom processing | ✅ Yes |
| `junit` | JUnit XML | 🏗️ Jenkins, GitHub | ✅ Yes |

### Quick Examples

```bash
# Use specific reporter from CLI
npx playwright test --reporter=list
npx playwright test --reporter=html
npx playwright test --reporter=dot

# Combine multiple reporters
npx playwright test --reporter=html,junit
```

---

## ⚙️ Configuration in `playwright.config.ts`

### Single Reporter
```typescript
export default defineConfig({
  reporter: 'html',  // Simple - just HTML report
});
```

### Multiple Reporters (Recommended)
```typescript
export default defineConfig({
  reporter: [
    ['list'],                                    // Console output
    ['html', { open: 'never' }],                 // HTML report (don't auto-open)
    ['json', { outputFile: 'results.json' }],   // JSON for processing
    ['junit', { outputFile: 'junit.xml' }],      // For CI/CD
  ],
});
```

### Reporter Options

| Reporter | Common Options |
|----------|---------------|
| `html` | `open: 'always' \| 'never' \| 'on-failure'`, `outputFolder: 'my-report'` |
| `json` | `outputFile: 'path/to/results.json'` |
| `junit` | `outputFile: 'path/to/junit.xml'`, `embedAnnotationsAsProperties: true` |

---

## 📸 Screenshots, Videos & Traces

### Configuration Options

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Screenshots
    screenshot: 'only-on-failure',  // 'on' | 'off' | 'only-on-failure'
    
    // Videos
    video: 'retain-on-failure',     // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
    
    // Traces (timeline, network, console)
    trace: 'on-first-retry',        // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
  },
});
```

### 📊 Options Explained

| Option | `on` | `off` | `only-on-failure` | `retain-on-failure` |
|--------|------|-------|-------------------|---------------------|
| **screenshot** | Always capture | Never | Only when test fails | - |
| **video** | Always record | Never | - | Keep only if test fails |
| **trace** | Always collect | Never | - | Keep only if test fails |

### 💡 Recommended Settings

```typescript
// Development - capture everything for debugging
use: {
  screenshot: 'on',
  video: 'on',
  trace: 'on',
}

// CI/CD - only capture on failure (saves storage)
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

### 📂 Where Are Files Stored?

```
test-results/
├── my-test-chromium/
│   ├── test-failed-1.png      # Screenshot
│   ├── video.webm             # Video recording
│   └── trace.zip              # Trace file
```

### 🔍 Viewing Traces

```bash
# View trace from failed test
npx playwright show-trace test-results/my-test/trace.zip
```

---

## 🌟 Third-Party Reporters

### Popular Options

| Reporter | Install Command | Key Features |
|----------|-----------------|--------------|
| **Allure** | `npm i -D allure-playwright` | Beautiful dashboards, history, attachments |
| **Monocart** | `npm i -D monocart-reporter` | Code coverage, custom columns, trends |
| **ReportPortal** | `npm i -D @reportportal/agent-js-playwright` | Team collaboration, AI analysis |
| **Tesults** | `npm i -D tesults-reporter` | Cloud hosting, analytics |

---

## 🔮 Allure Reporter - Complete Setup

**Allure** creates stunning, interactive reports with dashboards, history, and categories.

### Step 1: Install

```bash
npm install -D allure-playwright
```

### Step 2: Configure

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
```

### Step 3: Run Tests

```bash
npx playwright test
```

### Step 4: Generate Report

```bash
# Install Allure CLI (one-time)
npm install -D allure-commandline

# Generate HTML report from results
npx allure generate allure-results -o allure-report --clean
```

### Step 5: View Report

```bash
npx allure open allure-report
```

### 🎨 Allure Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Overview with charts and statistics |
| 📁 **Categories** | Group failures by type |
| 📜 **History** | Track results over time |
| 📎 **Attachments** | Screenshots, videos auto-attached |
| 🏷️ **Labels** | Tag tests with severity, owner, etc. |

### 📝 Allure Annotations (Optional)

```typescript
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('checkout flow', async ({ page }) => {
  // Add metadata
  await allure.description('Verifies complete checkout process');
  await allure.severity('critical');
  await allure.owner('QA Team');

  // Add steps for better reporting
  await allure.step('Login to application', async () => {
    await page.goto('/login');
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
    await page.click('#login-btn');
  });

  await allure.step('Add item to cart', async () => {
    await page.click('[data-test="add-to-cart"]');
  });

  // Attach screenshot manually
  await allure.attachment('Current State', await page.screenshot(), 'image/png');
});
```

---

## 🔷 Monocart Reporter

**Monocart** is great for code coverage and custom reporting.

### Setup

```bash
npm install -D monocart-reporter
```

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: [
    ['monocart-reporter', {
      name: 'My Test Report',
      outputFile: './test-results/report.html',
    }],
  ],
});
```

---

## 💡 Which Reporter Should I Use?

### Decision Guide

```
┌─────────────────────────────────────────────────────────┐
│                 What's your use case?                    │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    Local Debug      CI/CD Pipeline    Team Reports
          │               │               │
          ▼               ▼               ▼
       html +          junit +        allure or
        list            line         reportportal
```

### Quick Recommendations

| Scenario | Recommended Setup |
|----------|-------------------|
| 🔍 **Local Development** | `['html', 'list']` |
| 🏗️ **GitHub Actions** | `['github', 'html']` |
| 🔧 **Jenkins** | `['junit', 'html']` |
| 📊 **Team Dashboards** | `['allure-playwright']` |
| 📈 **Code Coverage** | `['monocart-reporter']` |
| ⚡ **Fast CI Feedback** | `['dot']` or `['line']` |

---

## 🛠️ VS Code Extensions

Enhance your reporting experience with these extensions:

| Extension | Purpose |
|-----------|---------|
| **Playwright Test for VS Code** | View test results in sidebar |
| **Test Explorer UI** | Visual test tree with results |
| **HTML Preview** | Preview HTML reports in VS Code |

### Open HTML Report from VS Code

```bash
# Terminal command
npx playwright show-report
```

Or use the Playwright extension sidebar to view results directly!

---

## ❌ Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| `screenshot: 'on'` in CI | Large storage usage | Use `'only-on-failure'` |
| Missing `--clean` with Allure | Old results mix with new | Always use `--clean` flag |
| Not installing browsers | Reports show 0 tests | Run `npx playwright install` |
| Hardcoded output paths | CI path conflicts | Use relative paths |

---

## 📚 Quick Reference

### CLI Commands

```bash
# View HTML report
npx playwright show-report

# View trace
npx playwright show-trace trace.zip

# Run with specific reporter
npx playwright test --reporter=list

# Multiple reporters
npx playwright test --reporter=html,junit
```

### Config Cheat Sheet

```typescript
export default defineConfig({
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'results.json' }],
    ['junit', { outputFile: 'junit.xml' }],
    ['allure-playwright'],
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
});
```

### Artifact Locations

| Artifact | Default Location |
|----------|------------------|
| HTML Report | `playwright-report/` |
| Screenshots | `test-results/<test-name>/` |
| Videos | `test-results/<test-name>/` |
| Traces | `test-results/<test-name>/trace.zip` |
| Allure Results | `allure-results/` |
| Allure Report | `allure-report/` |

---

## 🎓 Summary

| What | When | How |
|------|------|-----|
| **Built-in reporters** | Always available | `reporter: 'html'` |
| **Screenshots** | Debug failures | `screenshot: 'only-on-failure'` |
| **Videos** | Complex flows | `video: 'retain-on-failure'` |
| **Traces** | Deep debugging | `trace: 'on-first-retry'` |
| **Allure** | Team dashboards | `npm i -D allure-playwright` |

---

**Next Steps:**
1. Start with `['html', 'list']` for local development
2. Add `junit` when integrating with CI/CD
3. Try Allure when you need team-wide visibility

---

**Pragmatic Test Labs** | Playwright Advanced Training 2025

