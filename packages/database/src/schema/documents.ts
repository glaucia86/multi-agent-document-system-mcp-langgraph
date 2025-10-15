import { relations } from 'drizzle-orm';
import { 
  pgTable,
  serial,
  varchar,
  text,
  integer,
  jsonb,
  index,
  vector
} from 'drizzle-orm/pg-core';
import { commonColums, documentStatusEnum } from './types';
import { processingJobs } from './processingJobs';

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  originalFileName: varchar('original_file_name', { length: 100 }).notNull(),
  fileSize: integer('file_size').notNull(),
  content: text('content').notNull(),
  status: documentStatusEnum('status').notNull().default('pending'),
  errorMessage: text('error_message'),
  ...commonColums,
}, (table) => [
    index('documents_status_idx').on(table.status),
    index('documents_created_at_idx').on(table.createdAt),
  ]
);

export const documentsRelations = relations(documents, ({ many }) => ({
  metadata: many(documentMetadata),
  embeddings: many(documentEmbeddings),
  processingJobs: many(processingJobs),
}));

export const documentMetadata = pgTable('document_metadata', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  key: varchar('key', { length: 100}).notNull(),
  value: jsonb('value').notNull(),
  extractedBy: varchar('extracted_by', { length: 50 }),
  confidence: integer('confidence'),
  ...commonColums,
}, 
(table) => [
    index('document_metadata_document_id_idx').on(table.documentId),
    index('document_metadata_key_idx').on(table.key),
  ]
);

export const documentMetadataRelations = relations(documentMetadata, ({ one }) => ({
  document: one(documents, {
    fields: [documentMetadata.documentId],
    references: [documents.id],
  }),
}));

export const documentEmbeddings = pgTable('document_embeddings', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
    chunkIndex: integer('chunk_index').notNull(),
    chunkText: text('chunk_text').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }).notNull(),
    model: varchar('model', { length: 50 }).notNull().default('text-embedding-3-small'),
    ...commonColums,
}, (table) => [
    index('document_embeddings_document_id_idx').on(table.documentId),
    index('document_embeddings_embedding_idx')
      .using('hnsw', table.embedding.op('vector_cosine_ops')),
  ]
);

export const documentEmbeddingsRelations = relations(documentEmbeddings, ({ one }) => ({
  document: one(documents, {
    fields: [documentEmbeddings.documentId],
    references: [documents.id],
  }),
}));

