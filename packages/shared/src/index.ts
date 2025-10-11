import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string(),
  createdAt: z.date()
});

export type Document = z.infer<typeof DocumentSchema>;