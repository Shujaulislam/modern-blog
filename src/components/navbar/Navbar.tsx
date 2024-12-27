"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaBlog, FaUser, FaEnvelope } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";



const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();

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
    // Only show Admin link if user is signed in
    ...(isLoaded && isSignedIn ? [{
      name: "Admin",
      link: "/admin",
      icon: <FaUser className="w-5 h-5" />,
    }] : []),
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
