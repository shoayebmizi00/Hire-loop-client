import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Private routes: only a signed-in user may open them.
// All dashboards need a session, so one prefix covers them.
const protectedPaths = ["/dashboard"];

export function proxy(request: NextRequest) {
  const isProtected = protectedPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  );
  if (!isProtected) return NextResponse.next();

  // better-auth keeps the session in an HTTPOnly cookie.
  // (optimistic check: presence only — full session verification happens in the app)
  if (getSessionCookie(request)) return NextResponse.next();

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
