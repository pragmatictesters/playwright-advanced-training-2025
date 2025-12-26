# 🛠️ Tools for CI/CD Efficiency

> **Learning Objective**: Discover tools that make working with GitHub Actions easier and more productive

---

## 📚 Table of Contents

1. [VS Code Extensions](#vs-code-extensions)
2. [Online Tools](#online-tools)
3. [Command Line Tools](#command-line-tools)
4. [Best Practices](#best-practices)

---

## 🧩 VS Code Extensions

### 1. GitHub Actions Extension ⭐ (Recommended)

**Install**: [GitHub Actions for VS Code](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)

```
Extension ID: GitHub.vscode-github-actions
```

#### Features:

| Feature | Description |
|---------|-------------|
| 🔍 **Workflow Viewer** | See all workflows in sidebar |
| ▶️ **Run Workflows** | Trigger workflows from VS Code |
| 📊 **View Logs** | Read workflow logs without browser |
| ✅ **Syntax Validation** | Catch YAML errors early |
| 💡 **IntelliSense** | Auto-complete for actions |

#### How to Install:

1. Open VS Code
2. Press `Cmd/Ctrl + Shift + X` (Extensions)
3. Search "GitHub Actions"
4. Click **Install**

#### Usage:

```
┌─────────────────────────────────────────────────────────────────┐
│  VS Code Sidebar                                                │
├─────────────────────────────────────────────────────────────────┤
│  📁 Explorer                                                    │
│  🔍 Search                                                      │
│  🔀 Source Control                                              │
│  🐛 Run and Debug                                               │
│  🎬 GitHub Actions  ◀── Click here!                             │
│     └── 🔄 Workflows                                            │
│         └── Playwright Tests                                    │
│             ├── ✅ Run #42 - passed                             │
│             ├── ❌ Run #41 - failed                             │
│             └── ▶️ Trigger workflow                             │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. YAML Extension

**Install**: [YAML by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

```
Extension ID: redhat.vscode-yaml
```

#### Features:
- Syntax highlighting
- Auto-formatting
- Schema validation
- Error detection

---

### 3. GitHub Pull Requests

**Install**: [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

```
Extension ID: GitHub.vscode-pull-request-github
```

---

## 🌐 Online Tools

### 1. GitHub Actions Marketplace

Browse thousands of pre-built actions:

🔗 **https://github.com/marketplace?type=actions**

Popular Actions:

| Action | Purpose |
|--------|---------|
| `actions/checkout` | Clone repository |
| `actions/setup-node` | Install Node.js |
| `actions/upload-artifact` | Save files |
| `actions/cache` | Cache dependencies |

---

### 2. YAML Validators

Validate your YAML syntax online:

| Tool | URL |
|------|-----|
| YAML Lint | https://www.yamllint.com/ |
| YAML Checker | https://yamlchecker.com/ |

---

### 3. Cron Expression Generator

For scheduled workflows:

🔗 **https://crontab.guru/**

```yaml
on:
  schedule:
    - cron: '0 9 * * 1-5'  # 9am Mon-Fri
```

---

## 💻 Command Line Tools

### GitHub CLI (`gh`)

```bash
# Install (macOS)
brew install gh

# View workflow runs
gh run list

# View specific run
gh run view 12345

# Trigger workflow manually
gh workflow run playwright.yml

# Watch a run in real-time
gh run watch
```

### Act - Run Actions Locally

Test your workflows without pushing:

```bash
# Install
brew install act

# Run workflow locally
act push

# Run specific job
act -j test
```

---

## ✅ Best Practices

### 1. Use Workflow Templates

Start with proven patterns:

```yaml
# .github/workflows/playwright.yml
# Copy from: https://playwright.dev/docs/ci-intro
```

### 2. Enable Branch Protection

Require CI to pass before merging:

```
Repository Settings → Branches → Add rule
✅ Require status checks to pass
   ✅ Playwright Tests
```

### 3. Monitor Workflow Duration

Track how long your CI takes:

```
Actions → Workflow → Insights → Duration graph
```

---

## 🎓 Summary

| Tool | Purpose | Install |
|------|---------|---------|
| **GitHub Actions Extension** | Manage workflows in VS Code | VS Code Marketplace |
| **YAML Extension** | Better YAML editing | VS Code Marketplace |
| **GitHub CLI** | Command-line workflow management | `brew install gh` |
| **Act** | Test workflows locally | `brew install act` |

---

## 📚 Documentation Index

| Document | Topic |
|----------|-------|
| [01 - CI/CD Fundamentals](./01-ci-cd-fundamentals.md) | Core concepts |
| [02 - CI/CD in Test Automation](./02-ci-cd-test-automation.md) | Testing strategies |
| [03 - Playwright GitHub Actions](./03-playwright-github-actions.md) | Setup guide |
| [04 - YAML Basics](./04-yaml-basics.md) | YAML syntax |
| [05 - Tools for Efficiency](./05-tools-for-efficiency.md) | This document |

---

*Part of the Playwright Training 2025 CI/CD Documentation Series* 🎭

