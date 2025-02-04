import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().optional(),
  content: z.string().min(1, { message: "Content is required" }),
  views: z.number().optional(),
  categoryId: z.string({ required_error: "Category is required" }),
})
