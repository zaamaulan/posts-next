import { prisma } from "@/lib/prisma"
import { postSchema } from "@/lib/schema"
import { Prisma } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { generateSlug } from "@/lib/utils"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") ?? ""
    const category = searchParams.get("category") ?? ""

    const where: Prisma.PostWhereInput = {
      AND: [
        {
          title: {
            contains: search,
          },
        },
        {
          category: {
            name: {
              contains: category,
            },
          },
        },
      ],
    }

    const res = await prisma.post.findMany({ where, include: { category: true }, orderBy: { createdAt: "desc" } })
    return NextResponse.json({ message: "Posts fetched successfully", data: res })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const parsed = postSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 })
    }

    const slug = generateSlug(parsed.data.title)

    const res = await prisma.post.create({
      data: { ...body, slug, categoryId: +parsed.data.categoryId },
    })
    return NextResponse.json({ message: "Post created successfully", data: res })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Post already exists" }, { status: 400 })
      }
    }
    console.log("Error creating post:", error)
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 })
  }
}
