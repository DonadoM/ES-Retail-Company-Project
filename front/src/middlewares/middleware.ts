export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", " login", " Dashboard", "/pages/:path*"],
};
