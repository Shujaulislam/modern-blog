'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/moving-border";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { FaEdit, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { Tabs } from '@/components/ui/tabs';
import Link from 'next/link';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  excerpt?: string;
  featuredImage?: string;
  createdAt: string;
  categories: Array<{ name: string; slug: string }>;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  _count: {
    posts: number;
  };
}

const TABS = [
  { title: 'Overview', value: 'overview' },
  { title: 'Posts', value: 'posts' },
  { title: 'Settings', value: 'settings' },
];

export default function UserDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfile(data.profile);
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      setIsDeleting(postId);
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete post');
      
      // Remove the post from the local state
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    console.log('Active Tab:', activeTab);
    console.log('Posts:', posts);
    console.log('Profile:', profile);
  }, [activeTab, posts, profile]);

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.username} className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-2xl">{profile?.username?.[0]?.toUpperCase()}</span>
              </div>
            )}
            <div>
              <h4 className="font-medium">{profile?.username}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
            </div>
          </div>
          {profile?.bio && (
            <p className="text-gray-600 dark:text-gray-400">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Posts</p>
            <p className="text-2xl font-semibold">{profile?._count?.posts || 0}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Published Posts</p>
            <p className="text-2xl font-semibold">
              {posts.filter(post => post.status === 'PUBLISHED').length}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Drafted Posts</p>
            <p className="text-2xl font-semibold">
              {posts.filter(post => post.status === 'DRAFT').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => {
    if (error) {
      return (
        <div className="p-8 text-center">
          <div className="mb-4 text-red-500 dark:text-red-400">
            <FaExclamationTriangle className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button
            onClick={fetchUserData}
            className="mt-4 bg-primary hover:bg-primary/80"
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="p-8 text-center">
          <div className="mb-4 text-gray-400">
            <HiOutlineDocumentText className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No Posts Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first post to share your thoughts with the world.
          </p>
          <Link href="/create-post">
            <Button className="bg-primary hover:bg-primary/80">
              Create Your First Post
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                  </span>
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    post.status === 'PUBLISHED' 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  )}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/edit-post/${post.id}`}>
                  <Button size="icon" variant="ghost">
                    <FaEdit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={() => handleDeletePost(post.id)}
                  disabled={isDeleting === post.id}
                >
                  {isDeleting === post.id ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                  ) : (
                    <FaTrash className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Profile Settings</h3>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            defaultValue={profile?.username}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows={4}
            defaultValue={profile?.bio}
          />
        </div>
        <div>
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 w-full max-w-6xl mx-auto p-4">
        <div className="text-center mb-8">
          <TextGenerateEffect words="Welcome to Your Dashboard" className="text-4xl font-bold mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Manage your profile and posts</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="mb-8">
          <Tabs
            tabs={TABS}
            containerClassName="flex flex-wrap gap-2"
            activeTabClassName="bg-primary text-black"
            tabClassName="px-4 py-2 rounded-full text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            activeTab={activeTab}
            onTabChange={(value) => {
              console.log('Tab changed to:', value);
              setActiveTab(value);
            }}
          />
        </div>

        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
            </div>
          ) : (
            <div className="space-y-6">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'posts' && renderPosts()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          )}
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
