# 📊 Allure Reports with GitHub Pages

> **Learning Objective**: Set up beautiful, interactive test reports with trends and history

---

## 📚 Table of Contents

1. [What is Allure?](#what-is-allure)
2. [Features](#features)
3. [Setup Guide](#setup-guide)
4. [Viewing Reports](#viewing-reports)
5. [Understanding the Dashboard](#understanding-the-dashboard)
6. [Adding Test Metadata](#adding-test-metadata)
7. [Best Practices](#best-practices)

---

## 🎯 What is Allure?

**Allure** is a flexible, lightweight test report tool that provides:
- 📊 Beautiful, interactive dashboards
- 📈 Trends and history across runs
- 🔄 Retry and flaky test analysis
- 📁 Organized test suites and categories

### Why Use Allure?

| Feature | Playwright HTML | Allure Report |
|---------|-----------------|---------------|
| Test Results | ✅ | ✅ |
| Screenshots | ✅ | ✅ |
| Trends | ❌ | ✅ |
| History | ❌ | ✅ |
| Flaky Detection | ❌ | ✅ |
| Categories | ❌ | ✅ |
| Online Hosting | Manual | Automated |

---

## ✨ Features

### 1. Overview Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│                    📊 ALLURE REPORT                             │
├─────────────────────────────────────────────────────────────────┤
│  PASSED    │████████████████████████████░░░│  45 (90%)          │
│  FAILED    │███░░░░░░░░░░░░░░░░░░░░░░░░░░░│   3 (6%)           │
│  BROKEN    │██░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   2 (4%)           │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Trend Graph
Shows pass/fail rates over multiple runs:
```
100% ┤                          ●
 90% ┤      ●  ●     ●  ●  ●
 80% ┤   ●              
 70% ┤●
     └──┬──┬──┬──┬──┬──┬──┬──┬──
       1  2  3  4  5  6  7  8  9   ← Run Number
```

### 3. Categories
Groups failures by type:
- 🐛 **Product Defects** - Real bugs
- 🧪 **Test Defects** - Test code issues
- 🌐 **Environment Issues** - Infrastructure problems

---

## 🚀 Setup Guide

### Step 1: Install Allure Playwright

```bash
npm install -D allure-playwright
```

### Step 2: Configure Reporter

In `playwright.config.ts`:
```typescript
reporter: [
  ['allure-playwright', {
    outputFolder: 'allure-results',
    detail: true,
    suiteTitle: true,
  }],
],
```

### Step 3: Run Tests

```bash
npx playwright test
```

### Step 4: Generate Report Locally (Optional)

```bash
# Install Allure CLI
npm install -g allure-commandline

# Generate and open report
allure generate allure-results --clean
allure open allure-report
```

---

## 🌐 Viewing Reports Online

Reports are automatically published to GitHub Pages after each run.

### Report URL
```
https://pragmatictesters.github.io/playwright-advanced-training-2025
```

### What You'll See

| Tab | Description |
|-----|-------------|
| **Overview** | Summary with pass/fail pie chart |
| **Suites** | Tests grouped by file |
| **Graphs** | Trend and duration charts |
| **Timeline** | Parallel execution visualization |
| **Categories** | Failures grouped by type |
| **Packages** | Tests grouped by folder |

---

## 📈 Understanding the Dashboard

### Status Types

| Status | Meaning | Example |
|--------|---------|---------|
| ✅ **Passed** | Test succeeded | All assertions passed |
| ❌ **Failed** | Assertion failed | Expected value mismatch |
| 💥 **Broken** | Error occurred | Element not found |
| ⏭️ **Skipped** | Test skipped | `test.skip()` used |

### Trend Analysis

The trend graph helps identify:
- 📉 **Declining quality** - More failures over time
- 📊 **Flaky tests** - Inconsistent pass/fail
- 📈 **Improvements** - Better pass rates

---

## 🏷️ Adding Test Metadata

Enhance your reports with Allure annotations:

```typescript
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('login test', async ({ page }) => {
  // Add metadata
  await allure.owner('Janesh');
  await allure.severity('critical');
  await allure.feature('Authentication');
  await allure.story('User Login');
  
  // Add steps
  await allure.step('Navigate to login page', async () => {
    await page.goto('/login');
  });
  
  await allure.step('Enter credentials', async () => {
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
  });
});
```

---

## ✅ Best Practices

1. **Keep History** - Store at least 20 runs for trends
2. **Use Categories** - Group failures for easier triage
3. **Add Metadata** - Use `@allure.severity`, `@allure.owner`
4. **Attach Screenshots** - Playwright does this automatically
5. **Clean Old Reports** - Set retention to avoid bloat

---

## 📚 Documentation Index

| # | Document | Topic |
|---|----------|-------|
| 1 | [CI/CD Fundamentals](./01-ci-cd-fundamentals.md) | Core concepts |
| 2 | [CI/CD in Test Automation](./02-ci-cd-test-automation.md) | Testing strategies |
| 3 | [Playwright GitHub Actions](./03-playwright-github-actions.md) | Setup guide |
| 4 | [YAML Basics](./04-yaml-basics.md) | YAML syntax |
| 5 | [Tools for Efficiency](./05-tools-for-efficiency.md) | VS Code extensions |
| 6 | [Allure Reports](./06-allure-reports.md) | This document |

---

*Part of the Playwright Training 2025 CI/CD Documentation Series* 🎭

