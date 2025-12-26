# 🔧 MCP Server for Playwright Training

A simple, deterministic MCP (Model Context Protocol) server designed for Playwright test automation training.

## 🎯 What is MCP?

MCP (Model Context Protocol) is a protocol for connecting AI models to external tools and data sources. In test automation, we use MCP to:

- **Separate concerns**: Test data generation ≠ Browser automation
- **Centralize test utilities**: One place for common test helpers
- **Enable reusability**: Same tools work across different test frameworks

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Playwright Test                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Connect to MCP Server                           │   │
│  │  2. Call generateCheckoutData()                     │   │
│  │  3. Use data in page.fill() actions                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ stdio transport
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Tools:                                             │   │
│  │  • generateCheckoutData() → { firstName, ... }      │   │
│  │  • resetTestContext()     → { status: "reset" }     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ❌ NO browser actions                                      │
│  ❌ NO page navigation                                      │
│  ❌ NO AI reasoning                                         │
│  ✅ Pure data generation                                    │
│  ✅ Deterministic output                                    │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Installation

```bash
# Navigate to the mcp-training folder
cd mcp-training

# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install chromium

# Build the TypeScript (for full MCP server)
npm run build
```

## 🚀 Quick Start

### Option 1: Run Simple Test (Recommended for Beginners)

This test demonstrates MCP concepts **without** requiring the MCP server:

```bash
# Run the simulated MCP test
npx playwright test checkout-simple.spec.ts

# Run with visible browser (recommended for learning)
npx playwright test checkout-simple.spec.ts --headed
```

### Option 2: Run Full MCP Integration Test

This test connects to the actual MCP server:

```bash
# First, build the server
npm run build

# Run the full MCP test
npx playwright test checkout-with-mcp.spec.ts
```

### View Test Report

```bash
npx playwright show-report reports/html
```

## 🛠️ Available Tools

| Tool | Purpose | Output |
|------|---------|--------|
| `generateCheckoutData` | Get checkout form data | `{ firstName, lastName, postalCode }` |
| `resetTestContext` | Reset test state | `{ status: "reset" }` |

## 📚 Key Concepts

### Why MCP for Testing?

1. **Deterministic**: Same input → Same output (no randomness)
2. **Separation of Concerns**: Data logic separate from browser logic
3. **Testable**: MCP tools can be unit tested independently
4. **Scalable**: Add new tools without changing tests

### What MCP Should NOT Do

- ❌ Control the browser
- ❌ Navigate pages
- ❌ Make AI decisions
- ❌ Generate random data

## 📁 Files

```
mcp-training/
├── src/
│   └── server.ts        # MCP server implementation
├── tests/
│   └── checkout-with-mcp.spec.ts  # Example Playwright test
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Test Files Explained

| File | Description | MCP Server Required? |
|------|-------------|---------------------|
| `checkout-simple.spec.ts` | Simulated MCP (for learning concepts) | ❌ No |
| `checkout-with-mcp.spec.ts` | Full MCP integration | ✅ Yes |

## ❓ Common Issues

### Browser not installed

```
Error: browserType.launch: Executable doesn't exist
```

**Solution:**
```bash
npx playwright install chromium
```

### Tests not found

```
Error: No tests found
```

**Solution:** Make sure you're in the `mcp-training` folder:
```bash
cd mcp-training
npx playwright test
```

---

*Created for Playwright Training 2025* 🎓

