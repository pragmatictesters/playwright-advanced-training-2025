# AI Tools & Extensions Setup

Quick setup guide for AI-assisted development tools and essential VS Code extensions for the Playwright Advanced Training.

---

## 🤖 AI Development Tools

### **GitHub Copilot**
AI pair programmer that suggests code completions and entire functions.

**Installation:**
1. Install from VS Code Extensions: Search "GitHub Copilot"
2. Sign in with GitHub account (requires subscription)
3. Verify: Look for Copilot icon in status bar

**Official:** https://marketplace.visualstudio.com/items?itemName=GitHub.copilot

---

### **GitHub Copilot Chat**
Interactive AI assistant for code explanations, debugging, and test generation.

**Installation:**
1. Install from VS Code Extensions: Search "GitHub Copilot Chat"
2. Access via sidebar icon or `Ctrl+Shift+I` / `Cmd+Shift+I`

**Official:** https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat

---

## 🐳 Development Tools

### **Docker Desktop**
Container platform for running isolated test environments and services.

**Installation:**
- **Windows/Mac:** Download from https://www.docker.com/products/docker-desktop
- **Linux:** Follow instructions at https://docs.docker.com/desktop/install/linux-install/

**Verify:**
```bash
docker --version
docker-compose --version
```

---

## 🧩 VS Code Extensions

### **Testing & Playwright**

| Extension | Description |
|-----------|-------------|
| **Playwright Test for VSCode** | Run, debug, and record Playwright tests directly in VS Code |

**Install:** Search "Playwright Test for VSCode" or install via:
```bash
code --install-extension ms-playwright.playwright
```

---

### **Code Quality**

| Extension | Description |
|-----------|-------------|
| **ESLint** | JavaScript/TypeScript linter for code quality and consistency |
| **Prettier** | Opinionated code formatter for consistent style |

**Install:**
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

---

### **Productivity & Utilities**

| Extension | Description |
|-----------|-------------|
| **Markdown Preview Enhanced** | Enhanced markdown preview with diagrams and export features |
| **Rainbow CSV** | Colorize CSV files for better readability |
| **Prettify JSON** | Format and validate JSON files |

**Install:**
```bash
code --install-extension shd101wyy.markdown-preview-enhanced
code --install-extension mechatroner.rainbow-csv
code --install-extension mohsen1.prettify-json
```

---

## ⚡ Quick Install All Extensions

Copy and run this command to install all VS Code extensions at once:

```bash
code --install-extension GitHub.copilot && \
code --install-extension GitHub.copilot-chat && \
code --install-extension ms-playwright.playwright && \
code --install-extension dbaeumer.vscode-eslint && \
code --install-extension esbenp.prettier-vscode && \
code --install-extension shd101wyy.markdown-preview-enhanced && \
code --install-extension mechatroner.rainbow-csv && \
code --install-extension mohsen1.prettify-json
```

**Windows PowerShell:**
```powershell
code --install-extension GitHub.copilot; `
code --install-extension GitHub.copilot-chat; `
code --install-extension ms-playwright.playwright; `
code --install-extension dbaeumer.vscode-eslint; `
code --install-extension esbenp.prettier-vscode; `
code --install-extension shd101wyy.markdown-preview-enhanced; `
code --install-extension mechatroner.rainbow-csv; `
code --install-extension mohsen1.prettify-json
```

---

## ✅ Verification Checklist

After installation, verify everything is working:

- [ ] GitHub Copilot icon visible in VS Code status bar
- [ ] GitHub Copilot Chat accessible via sidebar
- [ ] Docker Desktop running (whale icon in system tray)
- [ ] Playwright extension shows test explorer in sidebar
- [ ] ESLint shows warnings/errors in code
- [ ] Prettier formats code on save (configure in settings)
- [ ] Markdown preview works (`Ctrl+K V` / `Cmd+K V`)
- [ ] CSV files show colored columns
- [ ] JSON files can be formatted (`Ctrl+Shift+P` → "Prettify JSON")

---

## 🔧 Recommended VS Code Settings

Add these to your `settings.json` (`Ctrl+,` / `Cmd+,` → Open Settings JSON):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "plaintext": false,
    "markdown": true
  }
}
```

---

## 📚 Resources

- **GitHub Copilot Docs:** https://docs.github.com/en/copilot
- **Docker Docs:** https://docs.docker.com/
- **Playwright VS Code:** https://playwright.dev/docs/getting-started-vscode
- **ESLint:** https://eslint.org/
- **Prettier:** https://prettier.io/

---

**Ready for AI-assisted Playwright development!** 🚀

