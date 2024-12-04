"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

interface MasonryItemProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

export const MasonryItem = ({ children, className, index }: MasonryItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className={cn("break-inside-avoid mb-6", className)}
    >
      {children}
    </motion.div>
  );
};

export const MasonryGrid = ({ children, className }: MasonryGridProps) => {
  return (
    <div
      className={cn(
        "columns-1 md:columns-2 lg:columns-3 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};
