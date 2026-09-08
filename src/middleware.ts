import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_VALUE } from "./app/lib/auth";

const publicRoutes = [
  { path: "/signin", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/signin";

function isAuthenticated(request: NextRequest) {
  return request.cookies.get("token")?.value === AUTH_TOKEN_VALUE;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authenticated = isAuthenticated(request);

  if (path.startsWith("/api/")) {
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  if (path === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = authenticated ? "/dashboard" : "/signin";
    return NextResponse.redirect(redirectUrl);
  }

  if (!authenticated && publicRoute) {
    return NextResponse.next();
  }

  if (!authenticated && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (authenticated && publicRoute?.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
