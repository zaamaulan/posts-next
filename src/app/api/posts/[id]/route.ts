import { prisma } from "@/lib/prisma"
import { postSchema } from "@/lib/schema"
import { generateSlug } from "@/lib/utils"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = parseInt((await params).id, 10)
    const res = await prisma.post.findUnique({ where: { id }, include: { category: true } })
    return NextResponse.json({ message: "Post fetched successfully", data: res })
  } catch (error) {
    console.log("Error fetching post:", error)
    return NextResponse.json({ message: "Failed to fetch post", status: 500 })
  }
}

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = parseInt((await params).id, 10)
    const body = await request.json()
    const parsed = postSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.flatten(), status: 400 })
    }

    const slug = generateSlug(parsed.data.title)

    const res = await prisma.post.update({
      where: { id },
      data: { ...body, slug, categoryId: +parsed.data.categoryId },
    })
    return NextResponse.json({ message: "Post updated successfully", data: res })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found", status: 404 })
      }
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Post already exists", status: 400 })
      }
    }
    console.log("Error updating post:", error)
    return NextResponse.json({ message: "Failed to update post", status: 500 })
  }
}

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = parseInt((await params).id, 10)
    await prisma.post.delete({ where: { id } })
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found", status: 404 })
      }
    }
    console.log("Error deleting post:", error)
    return NextResponse.json({ message: "Failed to delete post", status: 500 })
  }
}
