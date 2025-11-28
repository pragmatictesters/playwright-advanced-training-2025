# HTTP Basic Authentication in Playwright

## 🔒 What is HTTP Basic Authentication?

**HTTP Basic Authentication** is a simple authentication mechanism built into the HTTP protocol. When a web server requires Basic Auth:

1. The server responds with a **401 Unauthorized** status and a `WWW-Authenticate: Basic` header
2. The browser displays a **native login dialog** (not an HTML form)
3. The user enters credentials (username + password)
4. The browser encodes credentials as Base64 and sends them in the `Authorization` header
5. All subsequent requests include this header automatically

### Example HTTP Header:
```
Authorization: Basic YWRtaW46c2VjcmV0MTIz
```
(This is `admin:secret123` encoded in Base64)

---

## ⚠️ Why Selectors and Dialog Handlers DON'T Work

### The Problem:
```typescript
// ❌ This will NOT work!
await page.fill('#username', 'admin');        // No DOM elements exist
await page.click('#login-button');            // No button to click

// ❌ This also will NOT work!
page.on('dialog', async dialog => {           // Basic Auth is NOT a JS dialog
  await dialog.accept();
});
```

### Why?
- The Basic Auth prompt is a **browser-level dialog**, not part of the webpage DOM
- It appears BEFORE the page loads, so there are no elements to interact with
- It's NOT a JavaScript `alert()`, `confirm()`, or `prompt()` — it's handled by the browser itself
- Playwright's `page.on('dialog')` only captures JavaScript dialogs, not HTTP authentication prompts

---

## ✅ The Solution: `httpCredentials`

Playwright provides the `httpCredentials` option to handle HTTP Basic Authentication at the protocol level.

---

## 🎓 Three Methods to Handle Basic Auth

### Method A: Configure in `playwright.config.ts` (Global)

Best for: When ALL tests need the same credentials

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    httpCredentials: {
      username: 'admin',
      password: 'secret123'
    }
  }
});
```

### Method B: Use `browser.newContext()` (Per-Test)

Best for: When different tests need different credentials

```typescript
const context = await browser.newContext({
  httpCredentials: {
    username: 'admin',
    password: 'secret123'
  }
});
const page = await context.newPage();
await page.goto('https://example.com/protected');
```

### Method C: Inline URL Credentials (Quick & Simple)

Best for: Quick tests, but use with caution (credentials visible in URLs/logs)

```typescript
await page.goto('https://admin:secret123@example.com/protected');
```

---

## 📁 Example Tests

See `basic-auth.spec.ts` in this folder for complete working examples of all three methods.

### Test Credentials for Demo App:
| Field    | Value       |
|----------|-------------|
| Username | `admin`     |
| Password | `secret123` |

### Protected Page URL:
```
https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/auth-protected/
```

---

## 🔗 Additional Resources

- [Playwright HTTP Authentication Docs](https://playwright.dev/docs/auth#http-authentication)
- [MDN: HTTP Basic Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [RFC 7617: The 'Basic' HTTP Authentication Scheme](https://datatracker.ietf.org/doc/html/rfc7617)

---

## 💡 Best Practices

1. **Never hardcode credentials** in production code — use environment variables
2. **Use Method A (config)** for consistent auth across all tests
3. **Use Method B (context)** when testing different user roles
4. **Avoid Method C (URL)** in CI/CD as credentials appear in logs
5. **Use `.env` files** with `dotenv` for credential management

```typescript
// Example with environment variables
httpCredentials: {
  username: process.env.AUTH_USERNAME!,
  password: process.env.AUTH_PASSWORD!
}
```

---

*Pragmatic Test Labs — Playwright Advanced Training 2025*

