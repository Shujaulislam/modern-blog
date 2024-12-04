"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

const TimelineItem = ({ year, title, description, icon, isLast }: TimelineItemProps) => {
  return (
    <div className="relative flex gap-6 pb-8 group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[21px] top-[40px] h-[calc(100%-20px)] w-[2px] bg-neutral-800 group-hover:bg-sky-500/50 transition-colors duration-300" />
      )}

      {/* Timeline dot and year */}
      <div className="relative">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-neutral-800 bg-black group-hover:border-sky-500/50 group-hover:shadow-[0_0_12px_0px_rgba(14,165,233,0.3)] transition-all duration-300">
            {icon ? (
              <div className="text-neutral-500 group-hover:text-sky-400 transition-colors duration-300">
                {icon}
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-sky-500 transition-colors duration-300" />
            )}
          </div>
          <span className="mt-2 text-sm text-neutral-500 font-mono">{year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-2">
        <h3 className="text-xl font-semibold text-neutral-200 mb-2 group-hover:text-sky-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};
