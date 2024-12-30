"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tabs } from '@/components/ui/tabs';
import { LampContainer } from '@/components/ui/lamp';
import { Input } from '@/components/ui/input';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
  categories: { id: string; name: string; slug: string; }[];
  createdAt: string;
  author: { username: string; email: string; };
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
}

const CATEGORIES = [
  { title: 'All', value: 'All' },
  { title: 'Technology', value: 'Technology' },
  { title: 'Development', value: 'Development' },
  { title: 'Design', value: 'Design' },
  { title: 'Tutorial', value: 'Tutorial' },
  { title: 'News', value: 'News' },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const take = 12;

  // Reset pagination when category changes
  useEffect(() => {
    setSkip(0);
    setPosts([]);
    setHasMore(true);
    fetchPosts(0);
  }, [selectedCategory]);

  const fetchPosts = async (skipCount: number) => {
    try {
      setLoading(true);
      setError(null);
      const categoryParam = selectedCategory !== 'All' ? `&category=${selectedCategory}` : '';
      const response = await fetch(
        `/api/posts?skip=${skipCount}&take=${take}&status=PUBLISHED${categoryParam}`
      );
      
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
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const newSkip = skip + take;
      setSkip(newSkip);
      fetchPosts(newSkip);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.categories.some(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10">
        {/* Hero Section */}
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Our Blog
          </motion.h1>
        </LampContainer>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Tabs
              tabs={CATEGORIES}
              containerClassName="flex flex-wrap gap-2"
              activeTabClassName="bg-primary text-white"
              tabClassName="px-4 py-2 rounded-full text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              activeTab={selectedCategory}
              onTabChange={setSelectedCategory}
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500">No image</span>
                      </div>
                    )}
                    {post.featured && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <span
                          key={category.id}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author.username}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !loading && filteredPosts.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-300"
              >
                Load More
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center mt-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
              No posts found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}