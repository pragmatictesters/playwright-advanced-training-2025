# 🎭 Running Playwright Tests in GitHub Actions

> **Learning Objective**: Set up and configure Playwright tests to run automatically in GitHub Actions

---

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Basic Workflow](#basic-workflow)
3. [Configuration Options](#configuration-options)
4. [Advanced Features](#advanced-features)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Step 1: Create the Workflow File

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
```

### Step 2: Push to GitHub

```bash
git add .github/workflows/playwright.yml
git commit -m "Add Playwright CI workflow"
git push
```

### Step 3: Check Results

Go to **Actions** tab in your GitHub repository to see the results!

---

## 📋 Basic Workflow Explained

```yaml
name: Playwright Tests        # 👈 Workflow name (shown in GitHub UI)

on:                           # 👈 TRIGGERS - When to run
  push:
    branches: [ main ]        #    Run on push to main
  pull_request:
    branches: [ main ]        #    Run on PRs to main

jobs:                         # 👈 JOBS - What to do
  test:                       #    Job name
    runs-on: ubuntu-latest    #    Runner (machine type)
    
    steps:                    # 👈 STEPS - Sequential tasks
      - uses: actions/checkout@v4           # Get code
      - uses: actions/setup-node@v4         # Install Node.js
      - run: npm ci                         # Install dependencies
      - run: npx playwright install --with-deps  # Install browsers
      - run: npx playwright test            # Run tests
      - uses: actions/upload-artifact@v4    # Save reports
```

---

## ⚙️ Configuration Options

### Run Specific Tests

```yaml
# Run only tests in a specific folder
- run: npx playwright test tests/login/

# Run tests with specific tag
- run: npx playwright test --grep @smoke

# Run specific project
- run: npx playwright test --project=chromium
```

### Environment Variables

```yaml
- name: Run tests
  run: npx playwright test
  env:
    BASE_URL: https://staging.example.com
    CI: true
```

### Secrets Management

```yaml
- name: Run tests with secrets
  run: npx playwright test
  env:
    TEST_USER: ${{ secrets.TEST_USER }}
    TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
```

---

## 🔥 Advanced Features

### Parallel Testing (Sharding)

Run tests across multiple machines:

```yaml
jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: npx playwright test --shard=${{ matrix.shard }}/4
```

### Retry Failed Tests

```yaml
- run: npx playwright test --retries=2
```

### Manual Trigger

```yaml
on:
  workflow_dispatch:
    inputs:
      test_folder:
        description: 'Tests to run'
        default: 'tests/'
```

### Cache Dependencies

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: lts/*
    cache: 'npm'  # 👈 Caches npm dependencies
```

---

## ❓ Troubleshooting

### Browser Installation Fails

```yaml
# Install specific browser only
- run: npx playwright install chromium --with-deps
```

### Tests Time Out

```yaml
jobs:
  test:
    timeout-minutes: 60  # 👈 Increase timeout
```

### View Failed Test Screenshots

```yaml
- uses: actions/upload-artifact@v4
  if: failure()  # 👈 Only upload on failure
  with:
    name: test-screenshots
    path: test-results/
```

---

## 📚 Next Steps

➡️ [YAML Basics](./04-yaml-basics.md)

---

*Part of the Playwright Training 2025 CI/CD Documentation Series* 🎭

