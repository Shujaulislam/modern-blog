"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/Shujaulislam09",
      icon: <FaTwitter className="w-7 h-7" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/Shujaulislam",
      icon: <FaGithub className="w-7 h-7" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/shuja-ul-islam/",
      icon: <FaLinkedin className="w-7 h-7" />,
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-stone-800/90 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl text-zinc-400 hover:text-zinc-100 transition-colors relative group"
              >
                {link.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-zinc-100 origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
                  initial={false}
                />
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition-colors relative group"
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
                <motion.div
                  className="absolute -inset-2 rounded-full bg-zinc-800/50 opacity-0 group-hover:opacity-100 -z-10"
                  layoutId={`hover-${link.name}`}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Copyright and Additional Info */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-zinc-400 text-center">
              &copy; {new Date().getFullYear()} Shuja Ul Islam. All rights reserved.
            </p>
            <p className="text-xs text-zinc-500 text-center">
              Built with Next.js &middot; Hosted on Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
