import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const category = searchParams.get("category")

    if (!query) {
      return new NextResponse("Search query is required", { status: 400 })
    }

    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
              { excerpt: { contains: query, mode: "insensitive" } },
            ],
          },
          {
            status: "PUBLISHED",
          },
          category
            ? {
                categories: {
                  some: {
                    slug: category,
                  },
                },
              }
            : {},
        ],
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
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("[SEARCH_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
