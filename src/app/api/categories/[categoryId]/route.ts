import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.categoryId },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })

    if (!category) {
      return new NextResponse("Category not found", { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("[CATEGORIES]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } : { userId: string | null } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true },
    })

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const json = await req.json()
    const { name } = json

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

    const category = await prisma.category.update({
      where: { id: params.categoryId },
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("[CATEGORIES]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } : { userId: string | null } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, role: true },
    })

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    await prisma.category.delete({
      where: { id: params.categoryId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[CATEGORIES]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
