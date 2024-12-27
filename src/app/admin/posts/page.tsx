'use client';

import { useEffect, useState } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/moving-border";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED';
  author: {
    username: string;
  };
  categories: string[];
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  excerpt?: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const take = 10;

  const fetchPosts = async (skipCount: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/posts?skip=${skipCount}&take=${take}&status=PUBLISHED`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      if (skipCount === 0) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      
      // Check if we have more posts to load
      setHasMore(data.posts.length === take);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts(0);
  }, []);

  // Load more handler
  const handleLoadMore = () => {
    const newSkip = skip + take;
    setSkip(newSkip);
    fetchPosts(newSkip);
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-neutral-600  dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 w-full max-w-4xl mx-auto p-4">
        <div className="text-center mb-8">
          <TextGenerateEffect words="Manage Your Blog Posts" className="text-4xl font-bold mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Create, edit, and manage your blog posts</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-6">
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Create New Post
          </Button>
        </div>

        {/* Posts Table */}
        <div className="bg-white dark:bg-black/50 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {post.featuredImage && (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {post.title}
                        </div>
                        {post.excerpt && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {post.excerpt}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      post.status === 'PUBLISHED' 
                        ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                    )}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-teal-500 dark:text-teal-400">
                    {post.author.username}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent" />
              ) : (
                'Load More Posts'
              )}
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !posts.length && (
          <div className="text-center mt-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !posts.length && (
          <div className="text-center mt-8 text-muted-foreground">
            No posts found
          </div>
        )}
      </div>
      <BackgroundBeams />
    </div>
  );
}
