import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  jsonb,
  index,
  varchar,
} from 'drizzle-orm/pg-core';
import { commonColums, executionStatusEnum, agentTypeEnum } from './types'; 
import { documents } from './document';

export const processingJobs = pgTable(
  'processing_jobs', {
    id: serial('id').primaryKey(),
    documentId: integer('document_id')
      .notNull()
      .references(() => documents.id, { onDelete: 'cascade' }),
    status: executionStatusEnum('status').notNull().default('pending'),
    startedAt: timestamp('started_at', { mode: 'date' }),
    completedAt: timestamp('completed_at', { mode: 'date' }),
    errorMessage: text('error_message'),
    result: jsonb('result'),
    ...commonColums,
  },
  (table) => [
    index('processing_jobs_document_id_idx').on(table.documentId),
    index('processing_jobs_status_idx').on(table.status),
  ]
);

export const agentExecutions = pgTable(
  'agent_executions',
  {
    id: serial('id').primaryKey(),
    processingJobId: integer('processing_job_id')
      .notNull()
      .references(() => processingJobs.id, { onDelete: 'cascade' }),
    agentType: agentTypeEnum('agent_type').notNull(),
    status: executionStatusEnum('status').notNull().default('pending'),
    input: jsonb('input'),
    output: jsonb('output'),
    errorMessage: text('error_message'),
    durationMs: integer('duration_ms'),
    tokensUsed: integer('tokens_used'),
    startedAt: timestamp('started_at', { mode: 'date' }),
    completedAt: timestamp('completed_at', { mode: 'date' }),
    ...commonColums,
  },
  (table) => [
    index('agent_executions_processing_job_id_idx').on(table.processingJobId),
    index('agent_executions_agent_type_idx').on(table.agentType),
  ]
);

export const processingJobsRelations = relations(processingJobs, ({ one, many }) => ({
  document: one(documents, {
    fields: [processingJobs.documentId],
    references: [documents.id],
  }),
  executions: many(agentExecutions),
}));

export const agentExecutionsRelations = relations(agentExecutions, ({ one }) => ({
  job: one(processingJobs, {
    fields: [agentExecutions.processingJobId],
    references: [processingJobs.id],
  }),
}));


