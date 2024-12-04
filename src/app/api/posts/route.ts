import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { PostStatus } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") as PostStatus | null
    const categoryId = searchParams.get("categoryId")
    const featured = searchParams.get("featured") === "true"
    const take = parseInt(searchParams.get("take") || "10")
    const skip = parseInt(searchParams.get("skip") || "0")

    const where = {
      ...(status && { status }),
      ...(categoryId && {
        categories: {
          some: {
            id: categoryId,
          },
        },
      }),
      ...(featured && { featured: true }),
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              username: true,
              email: true,
            },
          },
          categories: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        take,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } : { userId: string | null } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const json = await req.json()
    const { title, content, excerpt, featuredImage, status, categoryIds } = json

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        status,
        authorId: user.id,
        categories: {
          connect: categoryIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
