import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/blog", 
  "/blog/(.*)", 
  "/about", 
  "/contact", 
  "/api/contact", 
  "/api/webhook/clerk",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    // Allow access without authentication for public routes
    return;
  }

  // For non-public routes, Clerk will handle authentication
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Exclude static files and _next
    "/", 
    "/(api|trpc)(.*)", // Match all API and TRPC routes
  ],
};
