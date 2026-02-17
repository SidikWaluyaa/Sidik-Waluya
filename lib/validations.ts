import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  short_description: z.string().max(300, "Max 300 characters"),
  content: z.string().nullable().optional(),
  tech_stack: z.array(z.string()).default([]),
  thumbnail_url: z.string().url("Invalid thumbnail URL").nullable().optional(),
  gallery: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
});

export const ArticleSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(5),
  content: z.string().nullable().optional(),
  cover_url: z.string().url().nullable().optional(),
  is_published: z.boolean().default(false),
});

export const MessageSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type Message = z.infer<typeof MessageSchema>;
