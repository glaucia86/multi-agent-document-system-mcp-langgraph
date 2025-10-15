import { relations } from 'drizzle-orm';
import { 
  pgTable,
  serial,
  integer,
  text,
  varchar,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { commonColums, messageRoleEnum } from './types';  
import { documents } from './documents';

export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  metadata: jsonb('metadata'),
  ...commonColums,
},
  (table) => [
    index('conversations_created_at_idx').on(table.createdAt),
  ]
);

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  documentId: integer('document_id').references(() => documents.id, { onDelete: 'set null' }),
  role: messageRoleEnum('role').notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  tokensUsed: integer('tokens_used'),
  ...commonColums,
}, (table) => [
    index('messages_conversation_id_idx').on(table.conversationId),
    index('messages_created_at_idx').on(table.createdAt),
    index('messages_role_idx').on(table.role),
  ]
);

export const conversationsRelations = relations(conversations, ({ many }) => ({
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  document: one(documents, {
    fields: [messages.documentId],
    references: [documents.id],
  }),
}));

