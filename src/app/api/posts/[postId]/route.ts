import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
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

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { postId: string } }
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

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { authorId: true },
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    // Only allow the author or admin to update the post
    if (post.authorId !== user.id && user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const json = await req.json()
    const { title, content, excerpt, featuredImage, status, categoryIds } = json

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

    const updatedPost = await prisma.post.update({
      where: { id: params.postId },
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        status,
        categories: {
          set: [], // First remove all categories
          connect: categoryIds.map((id: string) => ({ id })), // Then add the new ones
        },
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { postId: string } }
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

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { authorId: true },
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    // Only allow the author or admin to delete the post
    if (post.authorId !== user.id && user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    await prisma.post.delete({
      where: { id: params.postId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[POSTS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
