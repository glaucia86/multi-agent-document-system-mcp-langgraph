import { z } from 'zod';

export const executionStatusSchema = z.enum([
  'pending',
  'running',
  'completed',
  'failed',
]);

export const agentTypeSchema = z.enum([
  'document_analyzer',
  'content_summarizer',
  'query_resolver',
  'coordinator',
]);

export const processingJobSchema = z.object({
  id: z.number().int().positive(),
  documentId: z.number().int().positive(),
  status: executionStatusSchema,
  startedAt: z.date().nullable(),
  completedAt: z.date().nullable(),
  errorMessage: z.string().nullable(),
  result: z.record(z.unknown()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const agentExecutionSchema = z.object({
  id: z.number().int().positive(),
  processingJobId: z.number().int().positive(),
  agentType: agentTypeSchema,
  status: executionStatusSchema,
  input: z.record(z.unknown()).nullable(),
  output: z.record(z.unknown()).nullable(),
  errorMessage: z.string().nullable(),
  durationMs: z.number().int().nonnegative().nullable(),
  tokensUsed: z.number().int().nonnegative().nullable(),
  startedAt: z.date().nullable(),
  completedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type ExecutionStatus = z.infer<typeof executionStatusSchema>;
export type AgentType = z.infer<typeof agentTypeSchema>;
export type ProcessingJob = z.infer<typeof processingJobSchema>;
export type AgentExecution = z.infer<typeof agentExecutionSchema>;