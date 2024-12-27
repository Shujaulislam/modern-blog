import { Suspense } from 'react';
import ClientPost from './client-post';
import { prisma } from '@/lib/prisma';

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const post = await prisma.post.findUnique({
    where: { id },
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
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = await prisma.post.findMany({
    where: {
      id: { not: post.id },
      categories: {
        some: {
          id: { in: post.categories.map(cat => cat.id) }
        }
      },
      status: 'PUBLISHED'
    },
    take: 2,
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
  });

  // Serialize the dates and prepare the data structure
  const serializedPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    relatedPosts: relatedPosts.map(rp => ({
      ...rp,
      createdAt: rp.createdAt.toISOString(),
      updatedAt: rp.updatedAt.toISOString(),
    })),
  };

  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ClientPost post={serializedPost} />
    </Suspense>
  );
}
