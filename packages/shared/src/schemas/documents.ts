import { z } from 'zod';
import { mime } from 'zod/v4';

export const documentStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const createDocumentSchema = z.object({
  title: z.string().min(1).max(500),
  originalFileName: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(100),
  fileSize: z.number().int().positive().max(100 * 1024 * 1024), // Max 100 MB
  content: z.string().min(1)
});

export const documentSchema = createDocumentSchema.extend({
  id: z.number().int().positive(),
  status: documentStatusSchema,
  errorMessage: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const documentMetadataSchema = z.object({
  id: z.number().int().positive(),
  documentId: z.number().int().positive(),
  key: z.string().min(1).max(100),
  value: z.record(z.unknown()),
  extractedBy: z.string().max(50).nullable(),
  confidence: z.number().int().min(0).max(100).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const documentEmbeddingSchema = z.object({
  id: z.number().int().positive(),
  documentId: z.number().int().positive(),
  chunkIndex: z.number().int().nonnegative(),
  chunkText: z.string().min(1),
  embedding: z.array(z.number()).length(1536),
  model: z.string().max(50),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type DocumentStatus = z.infer<typeof documentStatusSchema>;
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type Document = z.infer<typeof documentSchema>;
export type DocumentMetadata = z.infer<typeof documentMetadataSchema>;
export type DocumentEmbedding = z.infer<typeof documentEmbeddingSchema>;