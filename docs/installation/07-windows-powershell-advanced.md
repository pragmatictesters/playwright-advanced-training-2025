# Windows PowerShell - Advanced Setup Guide

![Type: Advanced](https://img.shields.io/badge/Type-Advanced-red)
![Platform: Windows](https://img.shields.io/badge/Platform-Windows-blue)
![Updated: 2025-11](https://img.shields.io/badge/Updated-2025--11-orange)

Advanced PowerShell execution policy configuration for power users and automation scenarios.

> 💡 **For Beginners**: If you just need to fix the execution policy error, see the [Troubleshooting Guide](04-troubleshooting.md#windows-powershell-execution-policy-error) for a simpler solution.

---

## Table of Contents

- [Understanding Execution Policies](#understanding-execution-policies)
- [Option 1: Permanent Setup with Script](#option-1-permanent-setup-with-script)
- [Option 2: Auto-Apply on PowerShell Startup](#option-2-auto-apply-on-powershell-startup)
- [Option 3: Windows Startup Automation](#option-3-windows-startup-automation)
- [Comparison Table](#comparison-table)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

---

## Understanding Execution Policies

### What Are Execution Policies?

PowerShell execution policies control which scripts can run on your system. They're a security feature, not a security boundary.

### Policy Levels

| Policy | Description | Use Case |
|--------|-------------|----------|
| **Restricted** | No scripts allowed (default) | Maximum security |
| **AllSigned** | Only signed scripts | Corporate environments |
| **RemoteSigned** | Local scripts OK, remote must be signed | **Recommended** |
| **Unrestricted** | All scripts, with warnings | Development |
| **Bypass** | No restrictions, no warnings | Automation |

### Scope Levels

| Scope | Description | Requires Admin |
|-------|-------------|----------------|
| **Process** | Current session only | ❌ No |
| **CurrentUser** | Your user account | ❌ No |
| **LocalMachine** | All users on PC | ✅ Yes |

---

## Option 1: Permanent Setup with Script

**Best for**: Personal or development machines where you want a one-time automated setup.

### 📝 Script: `Set-ExecutionPolicyPermanent.ps1`

Create a file named `Set-ExecutionPolicyPermanent.ps1` with this content:

```powershell
# Set-ExecutionPolicyPermanent.ps1
# One-time script to configure PowerShell execution policy safely

# Check current policy
$current = Get-ExecutionPolicy -Scope CurrentUser

Write-Host "Current execution policy for CurrentUser: $current" -ForegroundColor Cyan

if ($current -ne 'RemoteSigned') {
    Write-Host "Setting execution policy for CurrentUser to RemoteSigned..." -ForegroundColor Yellow
    
    try {
        Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
        Write-Host "✅ Execution policy updated successfully!" -ForegroundColor Green
        Write-Host "You can now run npm and Playwright commands without issues." -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to set execution policy: $_" -ForegroundColor Red
        Write-Host "Try running PowerShell as Administrator." -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Execution policy already set to RemoteSigned." -ForegroundColor Green
    Write-Host "No changes needed!" -ForegroundColor Cyan
}

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
```

### How to Use

**Method 1: Right-click execution** (Easiest)
1. Save the script to your Desktop or Documents folder
2. Right-click the file → **Run with PowerShell**
3. Done! ✅

**Method 2: Command line**
```powershell
# Navigate to the script location
cd C:\path\to\script

# Run it
powershell -ExecutionPolicy Bypass -File .\Set-ExecutionPolicyPermanent.ps1
```

### What It Does

- ✅ Checks current policy before making changes
- ✅ Only changes if needed (idempotent)
- ✅ Uses safe `RemoteSigned` policy
- ✅ Scoped to `CurrentUser` (no admin needed)
- ✅ Provides clear feedback with colors
- ✅ Handles errors gracefully
- ✅ Persists across all future sessions

---

## Option 2: Auto-Apply on PowerShell Startup

**Best for**: Corporate environments where Group Policy keeps resetting your execution policy.

### How It Works

PowerShell can run a profile script every time it starts. We'll add a command to automatically set the execution policy for each session.

### 📝 Setup Steps

**Step 1**: Check if you have a PowerShell profile
```powershell
Test-Path $PROFILE
```

**Step 2**: Create profile if it doesn't exist
```powershell
if (!(Test-Path $PROFILE)) {
    New-Item -Path $PROFILE -ItemType File -Force
}
```

**Step 3**: Open your profile in Notepad
```powershell
notepad $PROFILE
```

**Step 4**: Add this line to the file
```powershell
# Auto-set execution policy for this session
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

**Step 5**: Save and close Notepad

**Step 6**: Test it
```powershell
# Close and reopen PowerShell, then check:
Get-ExecutionPolicy -Scope Process
# Should show: Bypass
```

### What It Does

- ✅ Automatically applies `Bypass` policy when PowerShell starts
- ✅ Only affects the current session (safe)
- ✅ Works even if Group Policy restricts `CurrentUser` scope
- ✅ No admin rights needed
- ⚠️ Must be applied to each PowerShell session

### Profile Locations

```powershell
# Current user, current host (most common)
$PROFILE
# Usually: C:\Users\<username>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1

# Current user, all hosts
$PROFILE.CurrentUserAllHosts

# All users, current host (requires admin)
$PROFILE.AllUsersCurrentHost

# All users, all hosts (requires admin)
$PROFILE.AllUsersAllHosts
```

---

## Option 3: Windows Startup Automation

**Best for**: Machines where you want the policy set automatically at login, before you open PowerShell.

### 📝 Setup Steps

**Step 1**: Create the script

Save `Set-ExecutionPolicyPermanent.ps1` (from Option 1) to a permanent location:
```
C:\Users\<your-username>\Scripts\Set-ExecutionPolicyPermanent.ps1
```

**Step 2**: Open Task Scheduler
- Press `Win + R`
- Type `taskschd.msc`
- Press Enter

**Step 3**: Create a new task
1. Click **"Create Task"** (not "Create Basic Task")
2. **General tab**:
   - Name: `Set PowerShell Execution Policy`
   - Description: `Automatically set execution policy for npm/Playwright`
   - ✅ Check "Run with highest privileges"
   - Configure for: Windows 10/11

**Step 4**: Triggers tab
1. Click **"New..."**
2. Begin the task: **"At log on"**
3. Specific user: Select your username
4. ✅ Check "Enabled"
5. Click OK

**Step 5**: Actions tab
1. Click **"New..."**
2. Action: **"Start a program"**
3. Program/script:
   ```
   powershell.exe
   ```
4. Add arguments:
   ```
   -ExecutionPolicy Bypass -WindowStyle Hidden -File "C:\Users\<your-username>\Scripts\Set-ExecutionPolicyPermanent.ps1"
   ```
5. Click OK

**Step 6**: Conditions tab
- ✅ Uncheck "Start the task only if the computer is on AC power"

**Step 7**: Settings tab
- ✅ Check "Allow task to be run on demand"
- ✅ Check "Run task as soon as possible after a scheduled start is missed"
- If the task fails, restart every: **1 minute**
- Attempt to restart up to: **3 times**

**Step 8**: Click OK to save

**Step 9**: Test it
1. Right-click the task → **Run**
2. Check if it worked:
   ```powershell
   Get-ExecutionPolicy -Scope CurrentUser
   # Should show: RemoteSigned
   ```

### What It Does

- ✅ Runs automatically when you log in to Windows
- ✅ Sets policy before you open PowerShell
- ✅ Runs hidden (no popup window)
- ✅ Retries if it fails
- ✅ Can be run manually from Task Scheduler
- ✅ Full automation - set it and forget it

---

## Comparison Table

| Goal | Method | Persistent? | Secure? | Admin Needed? | Complexity |
|------|--------|-------------|---------|---------------|------------|
| **Simple one-time fix** | Direct command | ✅ Yes | ✅ Safe | ❌ No | ⭐ Easy |
| **Automated script** | Option 1 | ✅ Yes | ✅ Safe | ❌ No | ⭐⭐ Medium |
| **Auto at PowerShell start** | Option 2 | ✅ Yes | ⚠️ Session-only | ❌ No | ⭐⭐ Medium |
| **Full Windows automation** | Option 3 | ✅ Yes | ✅ Safe | ⚠️ For Task Scheduler | ⭐⭐⭐ Advanced |

### Which Option Should You Choose?

```
┌─────────────────────────────────────────────────────────┐
│ START: Do you have execution policy issues?             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
         ┌───────────────────┐
         │ Personal PC?      │
         └───────┬───────────┘
                 │
        ┌────────┴────────┐
        │                 │
       YES               NO (Work/Corporate PC)
        │                 │
        ▼                 ▼
   ┌─────────┐      ┌──────────────┐
   │ Option 1│      │ Group Policy │
   │ Script  │      │ restrictions?│
   └─────────┘      └──────┬───────┘
                           │
                    ┌──────┴──────┐
                   YES            NO
                    │              │
                    ▼              ▼
              ┌──────────┐   ┌─────────┐
              │ Option 2 │   │ Option 1│
              │ Profile  │   │ Script  │
              └──────────┘   └─────────┘
```

---

## Security Considerations

### ⚠️ Important Warnings

1. **Work/Shared PCs**: Always get administrator permission before changing execution policies
2. **RemoteSigned is Recommended**: Balances security and usability
3. **Avoid Unrestricted/Bypass**: Only use for automation scenarios
4. **Don't Modify LocalMachine**: Affects all users, requires admin, can be risky

### Best Practices

✅ **DO**:
- Use `RemoteSigned` for `CurrentUser` scope
- Test scripts before automating them
- Keep scripts in a secure location
- Document what you've changed

❌ **DON'T**:
- Use `Unrestricted` or `Bypass` for `LocalMachine`
- Run untrusted scripts
- Disable execution policies system-wide
- Forget to inform IT department (corporate PCs)

---

## Troubleshooting

### Script Won't Run Even After Setting Policy

**Problem**: Script still blocked

**Solution**:
```powershell
# Unblock the script file
Unblock-File -Path .\Set-ExecutionPolicyPermanent.ps1

# Then run it
.\Set-ExecutionPolicyPermanent.ps1
```

### Group Policy Overrides My Settings

**Problem**: Corporate Group Policy keeps resetting execution policy

**Solution**: Use Option 2 (PowerShell Profile) which sets policy per-session

### Task Scheduler Task Fails

**Problem**: Scheduled task doesn't run

**Solution**:
```powershell
# Check task history in Task Scheduler
# Common issues:
# 1. Wrong path to script (use full path)
# 2. Missing -ExecutionPolicy Bypass in arguments
# 3. User account doesn't have permissions
```

### How to Revert Changes

**Remove execution policy**:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Undefined
```

**Remove PowerShell profile**:
```powershell
Remove-Item $PROFILE
```

**Remove scheduled task**:
1. Open Task Scheduler
2. Find your task
3. Right-click → Delete

---

## Additional Resources

### Official Documentation
- [About Execution Policies](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- [Set-ExecutionPolicy](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy)
- [PowerShell Profiles](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles)

### Related Guides
- [Troubleshooting Guide](04-troubleshooting.md#windows-powershell-execution-policy-error) - Simple solution for beginners
- [Quick Start Guide](01-quick-start.md) - Getting started with Playwright
- [Complete Installation Guide](02-complete-guide.md) - Full setup instructions

---

## Summary

This guide covered three advanced methods for managing PowerShell execution policies:

1. **Option 1**: Automated script for one-time setup (best for personal PCs)
2. **Option 2**: PowerShell profile for per-session setup (best for corporate restrictions)
3. **Option 3**: Task Scheduler for Windows startup automation (best for full automation)

Choose the method that best fits your environment and security requirements.

**Remember**: For most users, the simple one-line command in the [Troubleshooting Guide](04-troubleshooting.md#windows-powershell-execution-policy-error) is sufficient! 🎯

---

**Happy Testing!** 🎭✨

