/**
 * 🔌 MCP Client for Playwright Tests
 * 
 * This helper connects Playwright tests to our MCP server.
 * It provides a simple interface to call MCP tools.
 * 
 * USAGE:
 *   const client = new McpTestClient();
 *   await client.connect();
 *   const data = await client.generateCheckoutData();
 *   await client.disconnect();
 * 
 * @author Playwright Training Team
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Checkout data returned by generateCheckoutData tool
 */
export interface CheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Response from resetTestContext tool
 */
export interface ResetResponse {
  status: 'reset';
  timestamp: string;
}

// =============================================================================
// MCP CLIENT CLASS
// =============================================================================

/**
 * MCP Client for Playwright Tests
 * 
 * Provides a clean interface to call MCP tools from tests.
 * Handles connection, tool calls, and cleanup.
 */
export class McpTestClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;

  /**
   * Connect to the MCP server
   * 
   * Must be called before using any tools.
   * The server is spawned as a child process.
   */
  async connect(): Promise<void> {
    console.log('🔌 Connecting to MCP server...');

    // Get the path to our server
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const serverPath = path.join(__dirname, 'server.js');

    // Create transport - spawns the server as a child process
    this.transport = new StdioClientTransport({
      command: 'node',
      args: [serverPath],
    });

    // Create client
    this.client = new Client(
      { name: 'playwright-test-client', version: '1.0.0' },
      { capabilities: {} }
    );

    // Connect
    await this.client.connect(this.transport);
    console.log('✅ Connected to MCP server');
  }

  /**
   * Disconnect from the MCP server
   * 
   * Should be called after tests complete (in afterAll hook)
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.transport = null;
      console.log('👋 Disconnected from MCP server');
    }
  }

  /**
   * Generate checkout data for Sauce Demo
   * 
   * Returns deterministic data for the checkout form.
   * 
   * @returns Checkout form data (firstName, lastName, postalCode)
   */
  async generateCheckoutData(): Promise<CheckoutData> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    console.log('📦 Calling generateCheckoutData...');

    const result = await this.client.callTool({
      name: 'generateCheckoutData',
      arguments: {},
    });

    // Parse the response
    const content = result.content[0];
    if (content.type === 'text') {
      const data = JSON.parse(content.text) as CheckoutData;
      console.log('✅ Received checkout data:', data);
      return data;
    }

    throw new Error('Unexpected response format');
  }

  /**
   * Reset test context
   * 
   * Call this between tests to reset state.
   * 
   * @returns Reset confirmation
   */
  async resetTestContext(): Promise<ResetResponse> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    console.log('🔄 Calling resetTestContext...');

    const result = await this.client.callTool({
      name: 'resetTestContext',
      arguments: {},
    });

    // Parse the response
    const content = result.content[0];
    if (content.type === 'text') {
      const data = JSON.parse(content.text) as ResetResponse;
      console.log('✅ Test context reset:', data);
      return data;
    }

    throw new Error('Unexpected response format');
  }
}

