import { initializeAgents } from "@repo/agents";
import { DocumentSchema } from "@repo/shared";

console.log('MCP Server starting...');
console.log('Document schema:', Object.keys(DocumentSchema.shape));

initializeAgents();

console.log('MCP Server ready');