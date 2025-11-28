# 📋 Logging in Playwright Test Automation

> **"Logs are the black box of your test suite."**  
> When tests fail in CI, good logs tell you exactly what happened.

---

## 🎯 What is Logging?

Logging is recording events that happen during test execution. Unlike `console.log()`, proper logging gives you:

| Feature | console.log | Pino Logger |
|---------|-------------|-------------|
| Log levels | ❌ | ✅ trace, debug, info, warn, error, fatal |
| Structured data | ❌ | ✅ JSON output |
| Timestamps | ❌ | ✅ Automatic |
| Context | ❌ | ✅ Child loggers |
| Performance | Slow | ⚡ Fastest Node.js logger |
| CI/CD friendly | ❌ | ✅ Machine-parseable |

---

## 📊 Log Levels Explained

```
┌─────────────────────────────────────────────────────────────────────┐
│  TRACE  →  DEBUG  →  INFO  →  WARN  →  ERROR  →  FATAL             │
│  (10)      (20)      (30)     (40)     (50)      (60)               │
│                                                                      │
│  ← More verbose                            More critical →           │
└─────────────────────────────────────────────────────────────────────┘
```

| Level | When to Use | Example |
|-------|-------------|---------|
| **trace** | Variable values, loop iterations | `logger.trace({ i: 5 }, 'Loop iteration')` |
| **debug** | Element states, API responses | `logger.debug({ status: 200 }, 'API call')` |
| **info** | Test steps, milestones | `logger.info('User logged in')` |
| **warn** | Slow responses, retries | `logger.warn('Response took 5s')` |
| **error** | Failures (test continues) | `logger.error('Optional element missing')` |
| **fatal** | Critical (test stops) | `logger.fatal('Database connection lost')` |

### 💡 Rule of Thumb

- **Development**: Use `LOG_LEVEL=debug` or `LOG_LEVEL=trace`
- **CI/CD**: Use `LOG_LEVEL=info` (default)
- **Production monitoring**: Use `LOG_LEVEL=warn` or `LOG_LEVEL=error`

---

## ⚙️ Quick Start

### 1. Install Pino

```bash
npm install pino pino-pretty
npm install -D @types/pino
```

### 2. Basic Usage

```typescript
import pino from 'pino';

// Create a logger
const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',  // Pretty print for development
    options: { colorize: true }
  }
});

// Use in your test
logger.info('Test started');
logger.debug({ url: '/login' }, 'Navigating');
logger.error({ statusCode: 500 }, 'API failed');
```

### 3. Using LogManager (Recommended)

```typescript
import { logger, LogManager } from '../utils/log-manager';

// Use singleton instance
logger.info('Simple log message');

// Create child logger with context
const testLogger = LogManager.getInstance().forTest('login-test');
testLogger.info('Logged in successfully');
```

---

## 🔧 LogManager Utility

The `utils/log-manager.ts` provides a framework-level logging solution:

```typescript
// Singleton pattern - same config everywhere
const log = LogManager.getInstance();

// Create child logger for specific test
const testLog = log.forTest('my-test', { browser: 'chrome' });

// All logs from testLog include test context
testLog.info('Step completed');
// Output: {"test":"my-test","browser":"chrome","msg":"Step completed"}
```

---

## 💡 Best Practices

### ✅ DO

```typescript
// Log with structured data
logger.info({ userId: 123, action: 'login' }, 'User action');

// Log before and after important steps
logger.info('Starting checkout flow');
await checkout();
logger.info('Checkout completed');

// Log errors with context
logger.error({ selector: '#submit', error: e.message }, 'Click failed');
```

### ❌ DON'T

```typescript
// Don't use string concatenation
logger.info('User ' + userId + ' logged in');  // ❌

// Don't log sensitive data
logger.info({ password: '123' }, 'Login');  // ❌

// Don't over-log in loops
for (let i = 0; i < 1000; i++) {
  logger.trace({ i }, 'Iteration');  // ❌ Too much noise
}
```

---

## 🏃 Running Examples

```bash
# Run logging basics example
npx playwright test tests/examples/logging/01-logging-basics.spec.ts

# Run LogManager example
npx playwright test tests/examples/logging/02-logging-with-manager.spec.ts

# Change log level
LOG_LEVEL=trace npx playwright test tests/examples/logging/

# Disable pretty printing (JSON output)
LOG_PRETTY=false npx playwright test tests/examples/logging/
```

---

## 🔗 Learn More

- [Pino Documentation](https://getpino.io/)
- [Pino Pretty](https://github.com/pinojs/pino-pretty)
- [Node.js Logging Best Practices](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/)

---

## 📁 Files in This Module

| File | Description |
|------|-------------|
| `utils/log-manager.ts` | Framework-level LogManager class |
| `tests/examples/logging/01-logging-basics.spec.ts` | All log levels demo |
| `tests/examples/logging/02-logging-with-manager.spec.ts` | LogManager usage |

