'use client';

import { useEffect, useState } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/moving-border";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  author: {
    username: string;
    email: string;
  };
  categories: Array<{
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  excerpt?: string;
  featured: boolean;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const take = 12;

  const fetchPosts = async (skipCount: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/posts?skip=${skipCount}&take=${take}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch posts');
      }
      
      const { posts: newPosts, total } = await response.json();
      
      if (!Array.isArray(newPosts)) {
        throw new Error('Invalid response format');
      }
      
      if (skipCount === 0) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }
      
      setHasMore(newPosts.length === take);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const loadMore = () => {
    const newSkip = skip + take;
    setSkip(newSkip);
    fetchPosts(newSkip);
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto p-4">
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

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Posts Table */}
        <div className="bg-white dark:bg-black/50 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading && posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    </div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No posts found
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {post.featuredImage && (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="h-10 w-10 rounded-md object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{post.title}</div>
                          {post.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {post.author.username}
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
                      {format(new Date(post.createdAt), 'MMM d, yyyy')}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {hasMore && !isLoading && (
          <div className="mt-6 text-center">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={loadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
      <BackgroundBeams />
    </div>
  );
}
