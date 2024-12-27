"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FaNewspaper, FaUsers, FaChartBar, FaCog } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <FaChartBar className="w-5 h-5" />,
  },
  {
    name: "Posts",
    href: "/admin/posts",
    icon: <FaNewspaper className="w-5 h-5" />,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: <FaUsers className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <FaCog className="w-5 h-5" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();

  if (!isLoaded) return null;

  // Check if user has admin role
  const isAdmin = user?.publicMetadata?.role === "admin";
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-muted/50 backdrop-blur-xl border-r border-border"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Admin Panel
          </h2>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                pathname === item.href && "text-foreground bg-muted"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
