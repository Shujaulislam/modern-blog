'use client';

import { UserButton as ClerkUserButton } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";

export function UserButton() {
  const { theme } = useTheme();

  return (
    <ClerkUserButton 
      appearance={{
        baseTheme: theme === "dark" ? dark : neobrutalism || undefined,
        elements: {
          avatarBox: "w-10 h-10",
          userButtonPopoverCard: "backdrop-blur-md bg-background/80",
          userButtonPopoverActionButton: "hover:bg-muted",
          userButtonPopoverActionButtonText: "text-foreground",
          userButtonPopoverFooter: "hidden"
        }
      }}
    />
  );
}
