"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome, FaBlog, FaUser, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
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
  ];

  return (
    <FloatingNav 
      navItems={navItems}
      className="fixed top-4 inset-x-0 max-w-2xl mx-auto z-50"
    />
  );
};

export default Navbar;
