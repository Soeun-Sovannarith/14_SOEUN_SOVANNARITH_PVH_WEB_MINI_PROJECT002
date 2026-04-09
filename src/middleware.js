import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

const AUTH_ONLY_ROUTES = ["/login", "/register"];

const LOGIN_PAGE = "/login";

const DEFAULT_REDIRECT = "/";

export default async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();

  const isAuthenticated = !!session?.user;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthOnlyRoute = AUTH_ONLY_ROUTES.includes(nextUrl.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL(LOGIN_PAGE, nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isAuthOnlyRoute) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};
