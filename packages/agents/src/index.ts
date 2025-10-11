import { DocumentSchema } from "@repo/shared";
import { test as dbTest } from "@repo/database";

export function initializeAgents() {
  console.log('Agents package initialized');
  console.log('DocumentSchema from shared: [ZodObject]');

  dbTest();
};