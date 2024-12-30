import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile with post count
    const profile = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's posts
    const posts = await prisma.post.findMany({
      where: { authorId: profile.id },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        excerpt: true,
        featuredImage: true,
        createdAt: true,
        categories: {
          select: {
            name: true,
            slug: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform the profile data to include default values for optional fields
    const transformedProfile = {
      ...(profile as any),
      bio: (profile as any).bio ?? "",
      avatarUrl: (profile as any).avatarUrl ?? "",
    };

    return NextResponse.json({
      profile: transformedProfile,
      posts: posts.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString(),
      }))
    });
  } catch (error) {
    console.error("[USER_PROFILE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { username, bio } = data;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedProfile = await prisma.user.update({
      where: { id: user.id },
      data: {
        username,
        bio,
      },
    });

    return NextResponse.json({ 
      profile: {
        ...(updatedProfile as any),
        bio: (updatedProfile as any).bio ?? "",
        avatarUrl: (updatedProfile as any).avatarUrl ?? "",
      } 
    });
  } catch (error) {
    console.error("[USER_PROFILE_UPDATE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
