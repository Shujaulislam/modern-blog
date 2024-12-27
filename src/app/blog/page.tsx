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
  categories: { name: string }[];
  createdAt: string;
  author: { username: string };
}

const CATEGORIES = ['All', 'Technology', 'Development', 'Design', 'Tutorial', 'News'];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Initial fetch and category change handler
  useEffect(() => {
    setSkip(0);
    setPosts([]);
    setHasMore(true);
    fetchPosts(0);
  }, [selectedCategory]);

  const fetchPosts = async (skipCount: number) => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory !== 'All' ? `&category=${selectedCategory}` : '';
      const response = await fetch(`/api/posts?skip=${skipCount}&take=12&status=PUBLISHED${categoryParam}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      
      if (skipCount === 0) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      
      setHasMore(data.posts.length === 12);
      setSkip(skipCount + 12);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
        !loading &&
        hasMore
      ) {
        fetchPosts(skip);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, skip, hasMore]);

  // Filter posts based on search
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const categoriesTabs = CATEGORIES.map(category => ({
    title: category,
    value: category,
    content: null,
  }));

  return (
    <main className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.2] -z-10 dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background -z-10" />

      <div className="container mx-auto px-4 py-12">
        {/* Header with Lamp Effect */}
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-0 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Blog Posts
          </motion.h1>
        </LampContainer>

        {/* Search and Categories */}
        <div className="max-w-2xl mx-auto mb-14 space-y-4">
          <Input
            type="text"
            placeholder="Search posts..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Tabs
             tabs={CATEGORIES.map(category => ({
              title: category,
              value: category,
              content: null
            }))}
            containerClassName="flex flex-wrap gap-2 justify-center"
            activeTabClassName="bg-primary text-primary-foreground"
            tabClassName="px-4 py-2 rounded-full text-sm transition-colors bg-muted hover:bg-muted/80"
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition-all"
            >
              <Link href={`/blog/${post.id}`}>
                {/* Post Content */}
                <div className="relative p-6 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-muted-foreground">
                      {post.categories[0]?.name || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-primary hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          </div>
        )}

        {/* No Posts State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            No posts found
          </div>
        )}
      </div>
    </main>
  );
}