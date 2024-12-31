"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CardGlowProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const CardGlow = ({
  children,
  className,
  containerClassName,
}: CardGlowProps) => {
  return (
    <div className={cn("relative group", containerClassName)}>
      {/* Gradient glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-300/50 via-sky-300/50 to-neutral-300/50 dark:from-neutral-400/25 dark:via-sky-300/25 dark:to-neutral-400/25 rounded-xl blur opacity-20 group-hover:opacity-100 group-hover:blur-md transition duration-1000 group-hover:duration-200 animate-tilt" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neutral-300/75 via-sky-300/75 to-neutral-300/75 dark:from-neutral-400/50 dark:via-sky-300/50 dark:to-neutral-400/50 opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-1000" />
      
      {/* Content container */}
      <div className={cn(
        "relative rounded-xl bg-white/90 dark:bg-black/90 p-4 h-full",
        "border border-neutral-200/50 dark:border-neutral-800/50",
        "transform transition duration-500",
        "group-hover:scale-[1.02]",
        "group-hover:border-sky-500/50",
        className
      )}>
        {children}
      </div>
    </div>
  );
};
