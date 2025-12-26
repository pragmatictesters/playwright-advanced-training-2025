import { Server } from "@modelcontextprotocol/sdk/server";
import { z } from "zod";

const server = new Server({
  name: "demo-mcp-server",
  version: "1.0.0",
});

// Register a tool
server.tool("getGreeting", {
  description: "Returns a greeting",
  inputSchema: z.object({
    name: z.string(),
  }),
  outputSchema: z.object({
    greeting: z.string(),
  }),
  async execute({ name }) {
    return { greeting: `Hello, ${name}!` };
  },
});

// Start the server over stdio
server.start();
console.log("MCP server running over stdio...");