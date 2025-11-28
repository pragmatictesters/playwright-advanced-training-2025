/**
 * ============================================
 * Playwright Training Demo App - Test Configuration
 * ============================================
 * 
 * Shared configuration, constants, and utilities for all test files.
 * This file demonstrates best practices for test organization:
 * 
 * ✅ Centralized configuration
 * ✅ Reusable constants
 * ✅ Type-safe test data
 * ✅ Environment-aware URLs
 * 
 * @author Pragmatic Test Labs
 * @see https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/
 */

// ============================================
// Base URLs
// ============================================

/** Local development server URL */
export const LOCAL_URL = 'http://localhost:8000';

/** GitHub Pages production URL */
export const GITHUB_PAGES_URL = 'https://pragmatictesters.github.io/playwright-advanced-training-2025/demo-app/';

/** 
 * Active base URL - change this to switch between local and production
 * TIP: Use environment variables in real projects
 */
export const BASE_URL = process.env.TEST_URL || LOCAL_URL;

// ============================================
// Test Credentials
// ============================================

/** Valid login credentials for authentication tests */
export const VALID_CREDENTIALS = {
  username: 'demo',
  password: 'password123'
};

/** Invalid credentials for negative test cases */
export const INVALID_CREDENTIALS = {
  username: 'wronguser',
  password: 'wrongpass'
};

/** Combined credentials object for easy access */
export const CREDENTIALS = {
  valid: VALID_CREDENTIALS,
  invalid: INVALID_CREDENTIALS
};

// ============================================
// Error Messages
// ============================================

/** Expected error messages for validation tests */
export const ERROR_MESSAGES = {
  invalidCredentials: 'Invalid username or password',
  emptyUsername: 'Username is required',
  emptyPassword: 'Password is required',
  emptyFields: 'Please fill in all required fields'
};

// ============================================
// Timeout Configuration
// ============================================

/** 
 * Timeout values for different scenarios
 * TIP: Adjust these based on your application's response times
 */
export const TIMEOUTS = {
  /** Short operations (< 2 seconds) */
  SHORT: 2000,
  /** Medium operations (2-5 seconds) */
  MEDIUM: 5000,
  /** Long operations (5-10 seconds) */
  LONG: 10000,
  /** Very long operations (> 10 seconds) - e.g., random delayed popup */
  EXTRA_LONG: 25000
};

// ============================================
// Test Data
// ============================================

/** Sample test data for form inputs */
export const TEST_DATA = {
  textInput: 'Hello Playwright!',
  searchTerm: 'Playwright',
  fileName: 'test-file.txt',
  promptInput: 'John Doe'
};

/** Dialog messages expected from the app */
export const DIALOG_MESSAGES = {
  alert: 'This is a simple alert dialog!',
  confirm: 'Do you want to proceed?',
  prompt: 'Please enter your name:',
  randomAlert: 'Random delayed alert appeared!',
  sequenceAlert: 'Step 1: This is an alert',
  sequenceConfirm: 'Step 2: Do you want to continue?',
  sequencePrompt: 'Step 3: Enter your name:'
};

// ============================================
// Section Navigation
// ============================================

/** Navigation tab labels for each section */
export const SECTIONS = {
  BASICS: 'Basic Inputs',
  FORMS: 'Form Controls',
  DYNAMIC: 'Dynamic Data',
  INTERACTIVE: 'Interactive',
  POPUPS: 'JS Popups',
  ASYNC: 'Async Behavior',
  ADVANCED: 'Advanced',
  AUTH: 'Authentication'
};

// ============================================
// Helper Functions
// ============================================

/**
 * Creates a test file object for file upload tests
 * @param name - File name
 * @param content - File content
 * @returns File object compatible with Playwright's setInputFiles
 */
export function createTestFile(name: string, content: string) {
  return {
    name,
    mimeType: 'text/plain',
    buffer: Buffer.from(content)
  };
}

/**
 * Generates a random delay between min and max milliseconds
 * Useful for simulating realistic user behavior
 */
export function randomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

