# 🔤 Regular Expressions in Playwright

> **Beginner-friendly guide** to using regex patterns in your Playwright tests.

## 🎯 What is Regex?

Regular expressions (regex) are patterns used to match text. Instead of matching exact text, regex lets you match *patterns* - perfect for dynamic content!

```typescript
// ❌ Exact match - breaks if text changes slightly
await expect(page).toHaveTitle('Playwright');

// ✅ Regex match - flexible and resilient  
await expect(page).toHaveTitle(/playwright/i);
```

---

## 📚 Quick Reference

| Pattern | Meaning | Example | Matches |
|---------|---------|---------|---------|
| `/i` | Case-insensitive | `/login/i` | "Login", "LOGIN", "login" |
| `.*` | Any characters | `/.*intro/` | "docs/intro", "/intro" |
| `\d` | Any digit | `/item-\d/` | "item-1", "item-9" |
| `\d+` | One or more digits | `/id-\d+/` | "id-123", "id-1" |
| `\w` | Word character | `/user-\w+/` | "user-abc", "user-123" |
| `^` | Start of string | `/^Home/` | "Home Page" (not "My Home") |
| `$` | End of string | `/page$/` | "Home page" (not "pages") |
| `?` | Optional | `/items?/` | "item" or "items" |
| `+` | One or more | `/a+/` | "a", "aa", "aaa" |
| `\|` | OR operator | `/yes\|no/` | "yes" or "no" |
| `\.` | Literal period | `/\.com/` | ".com" |
| `\$` | Literal dollar | `/\$\d+/` | "$99", "$100" |

---

## 🚀 Common Use Cases

### 1️⃣ URL Matching

```typescript
// Match any page under /docs/
await expect(page).toHaveURL(/\/docs\//);

// Match URL ending with specific path
await expect(page).toHaveURL(/\/products\/\d+$/);  // /products/123
```

### 2️⃣ Title Matching

```typescript
// Case-insensitive title check
await expect(page).toHaveTitle(/my app/i);

// Title starts with specific text
await expect(page).toHaveTitle(/^Dashboard/);
```

### 3️⃣ Text Matching

```typescript
// Find button with text containing "submit"
page.getByRole('button', { name: /submit/i });

// Find any link with "doc" in the text
page.getByRole('link', { name: /doc/i });
```

### 4️⃣ Filter Elements

```typescript
// Filter list items containing "available"
page.getByRole('listitem').filter({ hasText: /available/i });

// Filter rows NOT containing "sold out"
page.getByRole('row').filter({ hasNotText: /sold out/i });
```

### 5️⃣ Attribute Matching

```typescript
// Check href contains pattern
await expect(link).toHaveAttribute('href', /\/api\/v\d+/);

// Check class contains pattern
await expect(element).toHaveClass(/active/);
```

---

## 💡 Real-World Patterns

| Use Case | Pattern | Example Match |
|----------|---------|---------------|
| Price | `/\$\d+\.\d{2}/` | "$19.99" |
| Email | `/\w+@\w+\.\w+/` | "user@test.com" |
| Date | `/\d{4}-\d{2}-\d{2}/` | "2024-01-15" |
| Version | `/v\d+\.\d+/` | "v1.40" |
| UUID | `/[a-f0-9-]{36}/i` | "550e8400-e29b-..." |

---

## ⚠️ Common Mistakes

```typescript
// ❌ WRONG: Forgetting to escape special characters
/$.99/          // $ is a special character!

// ✅ CORRECT: Escape with backslash
/\$\.99/        // Matches "$0.99"

// ❌ WRONG: Forgetting /i for case-insensitive
/Login/         // Won't match "login" or "LOGIN"

// ✅ CORRECT: Add /i flag
/Login/i        // Matches any case
```

---

## 🏃 Run the Examples

```bash
# Run all regex examples
npx playwright test examples/regex/regex-patterns.spec.ts --reporter=list

# Run in headed mode to see the browser
npx playwright test examples/regex/regex-patterns.spec.ts --headed

# Run in UI mode for debugging
npx playwright test examples/regex/regex-patterns.spec.ts --ui
```

---

## 📖 Learn More

- [MDN Regex Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Regex101 Tester](https://regex101.com/) - Test your patterns online!

