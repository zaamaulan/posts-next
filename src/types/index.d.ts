import { postSchema } from "@/lib/schema"
import { z } from "zod"

export type Post = z.infer<typeof postSchema> & { views: number, createdAt: Date }
