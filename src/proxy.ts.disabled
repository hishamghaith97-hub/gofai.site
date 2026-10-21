import { NextResponse, type NextRequest } from "next/server";

// A quick first check that runs before any page renders: no session cookie means no access,
// so the visitor goes straight to /login. It only looks for the cookie; the real session
// check happens on the server in getCurrentUser() (src/lib/current-user.ts).
const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"];
const PUBLIC_PATHS = ["/login", "/check-email", "/auth-error"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));
  if (hasSession) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  // Everything except Auth.js endpoints, Next.js internals and static files.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
