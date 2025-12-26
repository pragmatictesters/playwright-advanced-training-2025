# 📝 YAML Basics for GitHub Actions

> **Learning Objective**: Understand YAML syntax and structure for writing GitHub Actions workflows

---

## 📚 Table of Contents

1. [What is YAML?](#what-is-yaml)
2. [Basic Syntax](#basic-syntax)
3. [Data Types](#data-types)
4. [GitHub Actions Structure](#github-actions-structure)
5. [Common Patterns](#common-patterns)

---

## 🎯 What is YAML?

**YAML** (YAML Ain't Markup Language) is a human-readable data format used for configuration files.

```yaml
# This is YAML - clean and readable!
name: My Workflow
jobs:
  build:
    runs-on: ubuntu-latest
```

```json
// Same thing in JSON - more cluttered
{
  "name": "My Workflow",
  "jobs": {
    "build": {
      "runs-on": "ubuntu-latest"
    }
  }
}
```

---

## 📋 Basic Syntax

### Key-Value Pairs

```yaml
# Simple key-value
name: Playwright Tests
version: 1.0

# Nested key-value (use 2-space indentation!)
person:
  name: John
  age: 30
```

### Lists (Arrays)

```yaml
# List with dashes
browsers:
  - chromium
  - firefox
  - webkit

# Inline list
browsers: [chromium, firefox, webkit]
```

### Comments

```yaml
# This is a comment
name: My Workflow  # Inline comment
```

---

## 🔤 Data Types

| Type | Example | Notes |
|------|---------|-------|
| **String** | `name: hello` | Quotes optional |
| **Number** | `count: 42` | Integer or float |
| **Boolean** | `enabled: true` | `true`, `false`, `yes`, `no` |
| **Null** | `value: null` | Or just `value:` |
| **List** | `- item1` | Dash + space |
| **Object** | `key: value` | Nested with indentation |

### Multi-line Strings

```yaml
# Literal block (preserves newlines)
description: |
  Line 1
  Line 2
  Line 3

# Folded block (joins lines)
description: >
  This will become
  a single line
```

---

## 🏗️ GitHub Actions Structure

### Complete Workflow Anatomy

```yaml
# ───────────────────────────────────────
# 1. WORKFLOW NAME
# ───────────────────────────────────────
name: Playwright Tests

# ───────────────────────────────────────
# 2. TRIGGERS (when to run)
# ───────────────────────────────────────
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:  # Manual trigger

# ───────────────────────────────────────
# 3. ENVIRONMENT VARIABLES (optional)
# ───────────────────────────────────────
env:
  CI: true
  NODE_VERSION: '20'

# ───────────────────────────────────────
# 4. JOBS
# ───────────────────────────────────────
jobs:
  # Job 1: Test
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Run tests
        run: npm test
  
  # Job 2: Deploy (runs after test)
  deploy:
    needs: test  # 👈 Dependency
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."
```

### Key Components Explained

| Component | Purpose | Example |
|-----------|---------|---------|
| `name` | Workflow display name | `name: CI` |
| `on` | Trigger events | `push`, `pull_request` |
| `jobs` | Collection of jobs | `test`, `build`, `deploy` |
| `runs-on` | Runner machine | `ubuntu-latest` |
| `steps` | Sequence of tasks | `uses`, `run` |
| `uses` | Use an action | `actions/checkout@v4` |
| `run` | Run shell command | `npm test` |
| `env` | Environment variables | `CI: true` |
| `needs` | Job dependencies | `needs: test` |

---

## 🔄 Common Patterns

### Conditional Steps

```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: ./deploy.sh
```

### Matrix Strategy

```yaml
strategy:
  matrix:
    node: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]
```

### Secrets

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

---

## ⚠️ Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Wrong indentation | YAML uses 2 spaces | Use consistent 2-space indent |
| Tabs instead of spaces | YAML hates tabs | Configure editor for spaces |
| Missing quotes | Special chars break | Quote strings with `:`, `#` |

---

## 📚 Next Steps

➡️ [Tools for Efficiency](./05-tools-for-efficiency.md)

---

*Part of the Playwright Training 2025 CI/CD Documentation Series* 🎭

