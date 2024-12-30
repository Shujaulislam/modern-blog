"use client";

import { motion } from "framer-motion";
import { FaNewspaper, FaUsers, FaEye, FaComments } from "react-icons/fa";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

const statsCards = [
  {
    title: "Total Posts",
    value: "156",
    change: "+12%",
    icon: <FaNewspaper className="w-6 h-6" />,
  },
  {
    title: "Total Users",
    value: "2.4K",
    change: "+18%",
    icon: <FaUsers className="w-6 h-6" />,
  },
  {
    title: "Page Views",
    value: "32K",
    change: "+24%",
    icon: <FaEye className="w-6 h-6" />,
  },
  {
    title: "Comments",
    value: "891",
    change: "+8%",
    icon: <FaComments className="w-6 h-6" />,
  },
];

const recentPosts = [
  {
    title: "Getting Started with Next.js 14",
    views: "1.2K",
    comments: 23,
    status: "Published",
  },
  {
    title: "Understanding TypeScript Generics",
    views: "856",
    comments: 15,
    status: "Draft",
  },
  {
    title: "The Future of Web Development",
    views: "2.1K",
    comments: 45,
    status: "Published",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen relative">
      {/* Sparkles Effect */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative">
        {/* Welcome Section */}
        <div className="mb-8">
          <TextGenerateEffect words="Welcome to your Admin Dashboard" className="text-4xl font-bold" />
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your blog today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-background/60 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-muted rounded-full">{stat.icon}</div>
                  <div className={cn(
                    "text-sm font-medium",
                    stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                  )}>
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>

        {/* Recent Posts Table */}
        {/* <BackgroundGradient className="rounded-[22px] p-6 bg-background/60 backdrop-blur-xl mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-medium">Title</th>
                  <th className="text-left py-4 px-4 font-medium">Views</th>
                  <th className="text-left py-4 px-4 font-medium">Comments</th>
                  <th className="text-left py-4 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.title} className="border-b border-border">
                    <td className="py-4 px-4">{post.title}</td>
                    <td className="py-4 px-4">{post.views}</td>
                    <td className="py-4 px-4">{post.comments}</td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        post.status === "Published" 
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      )}>
                        {post.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BackgroundGradient> */}

        {/* Quick Actions */}
        <BackgroundGradient className="rounded-[22px] p-6 bg-background/60 backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <HoverEffect
            items={[
              {
                title: "Create New Post",
                description: "Write and publish a new blog post",
                link: "",
              },
              {
                title: "Manage Posts",
                description: "Review and moderate posts",
                link: "admin/posts",
              },
              {
                title: "User Management",
                description: "View and manage user accounts",
                link: "admin/users",
              },
            ]}
          />
        </BackgroundGradient>
      </div>
    </div>
  );
}