import { prisma } from "@/lib/prisma"
import { postSchema } from "@/lib/schema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = parseInt((await params).id, 10)
    const body = await request.json()
    const parsed = postSchema.pick({ views: true }).required().safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.flatten(), status: 400 })
    }

    const res = await prisma.post.update({ where: { id }, data: { ...body, views: parsed.data.views } })
    return NextResponse.json({ message: "Post views updated successfully", data: res })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found", status: 404 })
      }
    }
    console.log("Error updating post:", error)
    return NextResponse.json({ message: "Failed to update post views", status: 500 })
  }
}
