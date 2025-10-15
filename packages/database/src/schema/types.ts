import { sql } from 'drizzle-orm';
import { timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';

export const commonColums = {
  createdAt: timestamp('created_at', { mode: 'date' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp('deleted_at', { mode: 'date' }),
};

export const documentStatusEnum = pgEnum('document_status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const agentTypeEnum = pgEnum('agent_type', [
  'document_analyzer',
  'content_summarizer',
  'query_resolver',
  'coordinator',
]);

export const executionStatusEnum = pgEnum('execution_status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const messageRoleEnum = pgEnum('message_role', [
  'user',
  'assistant',
  'system',
])