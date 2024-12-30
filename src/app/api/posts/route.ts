import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { PostStatus } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const take = parseInt(searchParams.get("take") || "12")
    const skip = parseInt(searchParams.get("skip") || "0")
    const status = searchParams.get("status") as PostStatus | null
    const category = searchParams.get("category")

    const where = {
      ...(status && { status }),
      ...(category && {
        categories: {
          some: {
            name: category
          }
        }
      })
    }

    const posts = await prisma.post.findMany({
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
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    })

    const total = await prisma.post.count({ where })

    return NextResponse.json({
      posts: posts.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      })),
      total,
    })
  } catch (error) {
    console.error("[POSTS_GET]", error)
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { 
      status: 500 
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { title, content, excerpt, featuredImage, status, categoryIds = [] } = await req.json()

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
        status: status || "DRAFT",
        authorId: user.id,
        categoryIds,
      },
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
    })

    return NextResponse.json({
      post: {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      }
    })
  } catch (error) {
    console.error("[POSTS_POST]", error)
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { 
      status: 500 
    })
  }
}
