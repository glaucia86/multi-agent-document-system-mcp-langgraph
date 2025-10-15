import { z } from 'zod';

export const messageRoleSchema = z.enum(['user', 'assistant', 'system']);

export const createConversationSchema = z.object({
  title: z.string().max(255).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const conversationSchema = createConversationSchema.extend({
  id: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const createMessageSchema = z.object({
  conversationId: z.number().int().positive(),
  documentId: z.number().int().positive().nullable().optional(),
  role: messageRoleSchema,
  content: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

export const messageSchema = createMessageSchema.extend({
  id: z.number().int().positive(),
  tokensUsed: z.number().int().nonnegative().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type MessageRole = z.infer<typeof messageRoleSchema>;
export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type Message = z.infer<typeof messageSchema>;