# Protect routes based on user authorization status
### You can protect routes based on user authorization status by checking if the user has the required roles or permissions.

## There are two methods that you can use:

## Use auth.protect() if you want Clerk to return a 404 if the user does not have the role or permission.
## Use auth().has() if you want more control over what your app does based on the authorization status.

### below is an example of how you can use auth().has() to protect routes based on user authorization status

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { has, redirectToSignIn } = await auth()
  // Restrict admin routes to users with specific permissions
  if (
    (isProtectedRoute(req) && !has({ permission: 'org:sys_memberships:manage' })) ||
    !has({ permission: 'org:sys_domains_manage' })
  ) {
    // Add logic to run if the user does not have the required permissions

    return redirectToSignIn()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}