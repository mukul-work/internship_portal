import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    console.log("Proxy executed:", req.nextUrl.pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/api/auth") || pathname === "/auth/signin") {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
