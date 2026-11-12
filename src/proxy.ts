import { NextResponse, type NextRequest } from "next/server";

// Private routes: only a signed-in user may open them.
const protectedPaths = [
  "/recruiter/add-jobs",
  "/recruiter/manage-jobs",
  "/recruiter/applications",
  "/recruiter/settings",
  "/seeker/application",
  "/seeker/billing",
  "/seeker/jobs",
  "/seeker/saved-jobs",
  "/seeker/settings",
  "/admin/companies",
  "/admin/jobs",
  "/admin/payments",
  "/admin/settings",
  "/admin/users",
];

export function proxy(request: NextRequest) {
  const isProtected = protectedPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  );
  if (!isProtected) return NextResponse.next();

  // better-auth keeps the session JWT in an HTTPOnly cookie.
  const hasSessionCookie = request.cookies
    .getAll()
    .some(({ name, value }) => name.includes("session_token") && Boolean(value));
  if (hasSessionCookie) return NextResponse.next();

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
  "/recruiter/add-jobs/:path*",
  "/recruiter/manage-jobs/:path*",
  "/recruiter/applications/:path*",
  "/recruiter/settings/:path*",
  "/seeker/application/:path*",
  "/seeker/billing/:path*",
  "/seeker/jobs/:path*",
  "/seeker/saved-jobs/:path*",
  "/seeker/settings/:path*",
  "/admin/companies/:path*",
  "/admin/jobs/:path*",
  "/admin/payments/:path*",
  "/admin/settings/:path*",
  "/admin/users/:path*",
  ],
};