/**
 * LogManager - Framework-level logging utility for Playwright tests
 *
 * This module provides a centralized logging solution using Pino,
 * the fastest Node.js logging library.
 *
 * Features:
 * - Singleton pattern for consistent logging across all tests
 * - Child loggers for per-test context
 * - Pretty printing for development, JSON for CI/CD
 * - All log levels: trace, debug, info, warn, error, fatal
 *
 * @example
 * import { LogManager } from '../utils/log-manager';
 * const logger = LogManager.getInstance();
 * logger.info('Test started');
 */

import pino, { Logger, LoggerOptions } from 'pino';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Log level configuration
 * Set via LOG_LEVEL environment variable or defaults to 'info'
 *
 * Levels (from most to least verbose):
 * trace (10) → debug (20) → info (30) → warn (40) → error (50) → fatal (60)
 */
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

/**
 * Determine if we should use pretty printing
 * Pretty print in development, JSON in CI/CD for machine parsing
 */
const IS_PRETTY = process.env.LOG_PRETTY !== 'false' && !process.env.CI;

// ============================================================================
// LOGGER OPTIONS
// ============================================================================

const loggerOptions: LoggerOptions = {
  level: LOG_LEVEL,

  // Add timestamp to all logs
  timestamp: pino.stdTimeFunctions.isoTime,

  // Base properties added to every log entry
  base: {
    framework: 'playwright',
  },
};

// ============================================================================
// LOG MANAGER CLASS
// ============================================================================

/**
 * LogManager - Singleton class for centralized logging
 *
 * Why Singleton?
 * - Ensures consistent log configuration across all tests
 * - Single point of configuration
 * - Easy to mock in unit tests
 */
export class LogManager {
  private static instance: LogManager;
  private logger: Logger;

  private constructor() {
    // Create logger with pretty printing for development
    if (IS_PRETTY) {
      this.logger = pino({
        ...loggerOptions,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:HH:MM:ss.l',
            ignore: 'pid,hostname,framework',
          },
        },
      });
    } else {
      // JSON output for CI/CD and production
      this.logger = pino(loggerOptions);
    }
  }

  /**
   * Get the singleton instance of LogManager
   * Creates the instance if it doesn't exist
   */
  static getInstance(): LogManager {
    if (!LogManager.instance) {
      LogManager.instance = new LogManager();
    }
    return LogManager.instance;
  }

  /**
   * Get the raw Pino logger instance
   * Use this when you need direct access to Pino's API
   */
  getLogger(): Logger {
    return this.logger;
  }

  /**
   * Create a child logger with test-specific context
   * Perfect for adding test name, browser, or other metadata
   *
   * @param testName - Name of the test for context
   * @param metadata - Additional metadata to include in logs
   */
  forTest(testName: string, metadata?: Record<string, unknown>): Logger {
    return this.logger.child({
      test: testName,
      ...metadata,
    });
  }

  // ==========================================================================
  // CONVENIENCE METHODS - Delegate to Pino logger
  // ==========================================================================

  /** TRACE: Most verbose - variable values, loop iterations */
  trace(msg: string, data?: Record<string, unknown>): void {
    data ? this.logger.trace(data, msg) : this.logger.trace(msg);
  }

  /** DEBUG: Development details - element states, API responses */
  debug(msg: string, data?: Record<string, unknown>): void {
    data ? this.logger.debug(data, msg) : this.logger.debug(msg);
  }

  /** INFO: Key milestones - test steps, important events */
  info(msg: string, data?: Record<string, unknown>): void {
    data ? this.logger.info(data, msg) : this.logger.info(msg);
  }

  /** WARN: Potential issues - slow responses, retries */
  warn(msg: string, data?: Record<string, unknown>): void {
    data ? this.logger.warn(data, msg) : this.logger.warn(msg);
  }

  /** ERROR: Failures that don't stop the test */
  error(msg: string, data?: Record<string, unknown>): void {
    data ? this.logger.error(data, msg) : this.logger.error(msg);
  }

  /** FATAL: Critical failures - test cannot continue */
  fatal(msg: string, data?: Record<string, unknown>): void {
    data ? this.logger.fatal(data, msg) : this.logger.fatal(msg);
  }
}

// Export singleton instance for convenience
export const logger = LogManager.getInstance();

