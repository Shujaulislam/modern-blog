'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

interface PostType {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: {
    username: string;
    email: string;
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  createdAt: string;
  relatedPosts?: PostType[];
}

export default function ClientPost({ post }: { post: PostType }) {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      
      {/* Navigation */}
      <nav className="fixed top-4 left-4 z-50">
        <Link 
          href="/blog"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Blog
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="space-y-4">
            {post.categories[0] && (
              <div className="text-sm text-primary">
                {post.categories[0].name}
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>{post.author.username}</span>
              <span>•</span>
              <span>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
              <span>•</span>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-[400px] mb-16 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: post.content.replace(
              /\n/g, 
              '</p><p class="mb-4">'
            ) 
          }} />
        </div>

        {/* Author Section */}
        <motion.div 
          className="mt-16 p-8 rounded-lg bg-muted/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">{post.author.username[0]}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{post.author.username}</h3>
              <p className="text-sm text-muted-foreground">{post.author.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.id}`}
                  className="group block p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="text-sm text-primary mb-2">
                    {relatedPost.categories[0]?.name || 'Uncategorized'}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
