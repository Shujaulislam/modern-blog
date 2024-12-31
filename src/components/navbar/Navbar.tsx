"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaBlog, FaUser, FaEnvelope } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle";



const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      name: "Blog",
      link: "/blog",
      icon: <FaBlog className="w-5 h-5" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <FaUser className="w-5 h-5" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <FaEnvelope className="w-5 h-5" />,
    },
    // Only show Dashboard link if user is signed in
    ...(isLoaded && isSignedIn || user?.publicMetadata?.role === "user" || user?.publicMetadata?.role === "admin" ? [{
      name: "Dashboard",
      link: "/user",
      icon: <FaUser className="w-5 h-5" />,
    }] : []),
    // Only show Admin link if user is signed in
    ...(isLoaded && isSignedIn && user?.publicMetadata?.role === "admin" ? [{
      name: "Admin",
      link: "/admin",
      icon: <MdAdminPanelSettings className="w-5 h-5" />,
    }] : []),
  ];

  return (
    <div className="relative w-full">
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
