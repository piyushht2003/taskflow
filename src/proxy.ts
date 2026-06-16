import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth")
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  
  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (req.auth?.user?.platformRole === "SUPER_ADMIN") {
        return Response.redirect(new URL("/admin", req.nextUrl))
      }
      return Response.redirect(new URL("/dashboard", req.nextUrl))
    }
    return
  }

  if (!isLoggedIn && req.nextUrl.pathname !== "/" && !req.nextUrl.pathname.startsWith('/invite')) {
    // Only redirect if it's an app route, allow landing page '/' and '/invite'
    if (!req.nextUrl.pathname.startsWith('/api')) {
      let redirectUrl = new URL("/login", req.nextUrl);
      // Preserve the callbackUrl if we are redirecting from a protected route
      redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return Response.redirect(redirectUrl);
    }
  }

  if (isAdminRoute) {
    if (req.auth?.user?.platformRole !== 'SUPER_ADMIN') {
      return Response.redirect(new URL('/dashboard', req.nextUrl))
    }
  }

  return
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
}
