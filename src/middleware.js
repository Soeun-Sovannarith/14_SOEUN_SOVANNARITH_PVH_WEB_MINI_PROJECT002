import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes that anyone can visit without being logged in
const PUBLIC_ROUTES = ["/login", "/register"];

// The page to redirect to when not authenticated
const LOGIN_PAGE = "/login";

// The page to redirect to after a successful login
const DEFAULT_REDIRECT = "/";

export default async function middleware(request) {
  const { nextUrl, nextauth } = request;
  const session = await auth();

  const isAuthenticated = !!session?.user;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // 1. If the user is NOT authenticated and tries to access a protected page → redirect to /login
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL(LOGIN_PAGE, nextUrl.origin);
    // Preserve the original destination so we can redirect back after login
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If the user IS authenticated and visits /login or /register → redirect to home
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl.origin));
  }

  // 3. Otherwise, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  /*
   * Match every route EXCEPT:
   *  - Next.js internals  (_next/static, _next/image, ...)
   *  - Public files       (favicon.ico, images, fonts, etc.)
   *  - Next.js API routes (/api/...)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};
