# 🎹 Keyboard Keys in Playwright - Quick Reference

> **One-page cheat sheet for keyboard interactions in Playwright tests**

---

## 🎯 Basic Methods

| Method | Usage | When to Use |
|--------|-------|-------------|
| `locator.press('Enter')` | Press key on specific element | ✅ **Recommended** - Target specific element |
| `page.keyboard.press('Tab')` | Press key globally | Use for global shortcuts |
| `page.keyboard.type('text')` | Type text with key events | Simulate real typing |
| `locator.fill('text')` | Fill input directly | ✅ **Faster** - Use for forms |

---

## 📋 Common Keys Reference

| Key | Playwright Syntax | Common Use Cases |
|-----|-------------------|------------------|
| **Enter** | `'Enter'` | Submit forms, confirm actions |
| **Tab** | `'Tab'` | Navigate between fields |
| **Escape** | `'Escape'` | Close modals, cancel actions |
| **Space** | `'Space'` | Toggle checkboxes, click buttons |
| **Backspace** | `'Backspace'` | Delete text backward |
| **Delete** | `'Delete'` | Delete text forward |

---

## ⬆️ Arrow Keys

```typescript
'ArrowUp'     // Navigate up in dropdowns, lists
'ArrowDown'   // Navigate down in dropdowns, lists
'ArrowLeft'   // Move cursor left, navigate back
'ArrowRight'  // Move cursor right, navigate forward
```

**Example:**
```typescript
await page.locator('select').focus();
await page.keyboard.press('ArrowDown');
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');
```

---

## 🔧 Modifier Keys & Combinations

| Combination | Windows/Linux | macOS | Use Case |
|-------------|---------------|-------|----------|
| Select All | `'Control+A'` | `'Meta+A'` | Select all text |
| Copy | `'Control+C'` | `'Meta+C'` | Copy selection |
| Paste | `'Control+V'` | `'Meta+V'` | Paste content |
| Cut | `'Control+X'` | `'Meta+X'` | Cut selection |
| Undo | `'Control+Z'` | `'Meta+Z'` | Undo action |
| Redo | `'Control+Y'` | `'Meta+Shift+Z'` | Redo action |
| Reverse Tab | `'Shift+Tab'` | `'Shift+Tab'` | Navigate backward |

**Cross-Platform Helper:**
```typescript
const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
await page.keyboard.press(`${modifier}+A`);
```

---

## 🎮 Special Keys

```typescript
'Home'      // Go to start of line/page
'End'       // Go to end of line/page
'PageUp'    // Scroll up one page
'PageDown'  // Scroll down one page
'F1'-'F12'  // Function keys
'Insert'    // Toggle insert mode
```

---

## 💡 Practical Examples

### Example 1: Form Navigation with Tab
```typescript
test('navigate form with keyboard', async ({ page }) => {
  await page.goto('https://example.com/form');
  
  await page.locator('#username').fill('testuser');
  await page.keyboard.press('Tab');           // Move to password
  await page.keyboard.type('password123');
  await page.keyboard.press('Tab');           // Move to submit
  await page.keyboard.press('Enter');         // Submit form
});
```

### Example 2: Dropdown Navigation
```typescript
test('select from dropdown with arrows', async ({ page }) => {
  await page.locator('select#country').focus();
  await page.keyboard.press('ArrowDown');     // Move down
  await page.keyboard.press('ArrowDown');     // Move down again
  await page.keyboard.press('Enter');         // Select option
});
```

### Example 3: Text Selection & Editing
```typescript
test('select and replace text', async ({ page }) => {
  await page.locator('textarea').click();
  await page.keyboard.press('Control+A');     // Select all
  await page.keyboard.press('Backspace');     // Delete
  await page.keyboard.type('New text');       // Type new
});
```

### Example 4: Hold & Release (Advanced)
```typescript
test('select multiple items with Shift', async ({ page }) => {
  await page.keyboard.down('Shift');          // Hold Shift
  await page.keyboard.press('ArrowDown');     // Select next
  await page.keyboard.press('ArrowDown');     // Select next
  await page.keyboard.up('Shift');            // Release Shift
});
```

---

## ⚠️ Common Pitfalls

| ❌ Wrong | ✅ Correct | Note |
|---------|-----------|------|
| `press('ENTER')` | `press('Enter')` | Keys are case-sensitive! |
| `press('enter')` | `press('Enter')` | Use proper capitalization |
| `keyboard.press()` without focus | Focus element first | Some keys need element focus |
| Using keyboard for simple fills | Use `fill()` instead | `fill()` is faster & more reliable |

---

## 🎯 Best Practices

✅ **Use `locator.press()`** when targeting specific elements  
✅ **Use `page.keyboard.press()`** for global shortcuts  
✅ **Test keyboard navigation** for accessibility  
✅ **Focus element** before pressing keys (when needed)  
✅ **Use `fill()`** for simple text input (faster)  
✅ **Use `type()`** when simulating real user typing  

---

## 📚 Complete Key List

```
Alphanumeric:  'a'-'z', 'A'-'Z', '0'-'9'
Navigation:    'Tab', 'Enter', 'Escape', 'Space'
Arrows:        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
Editing:       'Backspace', 'Delete', 'Insert'
Modifiers:     'Shift', 'Control', 'Alt', 'Meta'
Function:      'F1', 'F2', 'F3', ... 'F12'
Special:       'Home', 'End', 'PageUp', 'PageDown'
Punctuation:   'Comma', 'Period', 'Semicolon', 'Slash', etc.
```

---

## 🔗 Quick Links

- **Playwright Docs:** [keyboard.press()](https://playwright.dev/docs/api/class-keyboard#keyboard-press)
- **Locator press:** [locator.press()](https://playwright.dev/docs/api/class-locator#locator-press)
- **Accessibility:** Test tab order and keyboard-only navigation

---

**💡 Pro Tip:** Always test your application with keyboard-only navigation to ensure accessibility! Press `Tab` through your entire form to verify the flow. 🎹✨

