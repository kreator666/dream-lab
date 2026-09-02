import { auth } from "@/auth";

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const role = req.auth?.user?.role;
  const canAccessAdmin = role === "ADMIN" || role === "MODERATOR";

  if (isAdminRoute && !canAccessAdmin) {
    return Response.redirect(new URL("/login", nextUrl.origin));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
