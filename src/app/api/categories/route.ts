import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const res = await prisma.category.findMany()
    return NextResponse.json({ message: "Categories fetched successfully", data: res })
  } catch (error) {
    console.log("Error fetching categories:", error)
    return NextResponse.json({ message: "Failed to fetch categories", status: 500 })
  }
}