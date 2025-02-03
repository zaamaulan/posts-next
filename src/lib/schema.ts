import { z } from "zod"

export const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().optional(),
  content: z.string().min(1, { message: "Content is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  views: z.number().optional(),
})
