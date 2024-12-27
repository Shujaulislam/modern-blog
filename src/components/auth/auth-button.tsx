'use client';

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";



export function AuthButton() {
  const { isSignedIn, isLoaded, userId, sessionId } = useAuth();

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <SignInButton mode="modal">
      <button className="border text-xl font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"> {/*shimmer class - bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-shimmer*/}
          <span>Sign In</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
      <button className="border text-xl font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"> {/*shimmer class - bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-shimmer*/}
          <span>Sign Up</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </SignUpButton>
    </div>
  );
}
