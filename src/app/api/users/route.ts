import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Get users from our database with post counts
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        _count: {
          select: { posts: true }
        }
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 