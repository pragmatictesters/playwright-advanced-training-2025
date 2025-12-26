/**
 * 🔧 MCP Server for Playwright Training
 * 
 * This is a simple, deterministic MCP server that provides test data
 * for Playwright tests against Sauce Demo (saucedemo.com).
 * 
 * KEY PRINCIPLES:
 * ✅ Deterministic - Same input always gives same output
 * ✅ Pure functions - No side effects, no randomness
 * ✅ Test support only - Does NOT control the browser
 * 
 * @author Playwright Training Team
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Checkout data structure for Sauce Demo
 * These fields match the checkout form on saucedemo.com
 */
interface CheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Response from resetTestContext tool
 */
interface ResetResponse {
  status: 'reset';
  timestamp: string;
}

// =============================================================================
// DETERMINISTIC DATA
// =============================================================================

/**
 * Static checkout data - ALWAYS returns the same values
 * 
 * WHY DETERMINISTIC?
 * - Tests should be repeatable
 * - Easy to debug when you know expected values
 * - No flaky tests due to random data
 */
const CHECKOUT_DATA: CheckoutData = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
};

// =============================================================================
// MCP SERVER SETUP
// =============================================================================

// Create the MCP server instance
const server = new Server(
  {
    name: 'playwright-training-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},  // We're providing tools
    },
  }
);

// =============================================================================
// TOOL DEFINITIONS
// =============================================================================

/**
 * List all available tools
 * 
 * This handler tells clients what tools are available
 * Each tool has a name, description, and input schema
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generateCheckoutData',
        description: 'Generate deterministic checkout data for Sauce Demo. Returns firstName, lastName, and postalCode.',
        inputSchema: {
          type: 'object',
          properties: {},  // No inputs needed
          required: [],
        },
      },
      {
        name: 'resetTestContext',
        description: 'Reset test context between tests. Returns status confirmation.',
        inputSchema: {
          type: 'object',
          properties: {},  // No inputs needed
          required: [],
        },
      },
    ],
  };
});

/**
 * Handle tool execution
 * 
 * This is where the actual tool logic runs
 * Each tool returns a structured response
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  switch (name) {
    // ─────────────────────────────────────────────────────────────────────────
    // Tool: generateCheckoutData
    // Purpose: Provide form data for Sauce Demo checkout
    // ─────────────────────────────────────────────────────────────────────────
    case 'generateCheckoutData':
      console.error('[MCP] Generating checkout data...');
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(CHECKOUT_DATA, null, 2),
          },
        ],
      };

    // ─────────────────────────────────────────────────────────────────────────
    // Tool: resetTestContext
    // Purpose: Demonstrate test lifecycle management
    // ─────────────────────────────────────────────────────────────────────────
    case 'resetTestContext':
      console.error('[MCP] Resetting test context...');
      const response: ResetResponse = {
        status: 'reset',
        timestamp: new Date().toISOString(),
      };
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response, null, 2),
          },
        ],
      };

    // ─────────────────────────────────────────────────────────────────────────
    // Unknown tool
    // ─────────────────────────────────────────────────────────────────────────
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// =============================================================================
// SERVER STARTUP
// =============================================================================

/**
 * Main entry point
 * 
 * Uses stdio transport - communicates via stdin/stdout
 * This is the simplest transport for local testing
 */
async function main() {
  console.error('🚀 Starting MCP Server for Playwright Training...');
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('✅ MCP Server is running!');
  console.error('📋 Available tools: generateCheckoutData, resetTestContext');
}

// Start the server
main().catch((error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

