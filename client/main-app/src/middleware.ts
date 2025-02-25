export { auth as middleware } from "@/lib/auth"
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|register|otp|$|[^/]+\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
    ],
  };    