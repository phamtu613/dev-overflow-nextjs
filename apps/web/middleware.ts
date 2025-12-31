import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/dashboard(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // ❌ Chưa login mà vào private → đẩy về sign-in
  if (!isPublicRoute(req) && !userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }

  // ✅ Đã login mà còn ở sign-in / sign-up → đẩy sang dashboard
  if (userId && isPublicRoute(req)) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
