import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { jwtSecret } from "./lib/jwt";
import { refreshAccessToken } from "./actions/auth/refreshAccessToken";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const miAccessToken = req.cookies.get("misskeyAccessToken")?.value;

  if (req.nextUrl.pathname.endsWith("/")) {
    if (!miAccessToken) {
      return;
    } else if (!accessToken) {
      const newAccessToken = await refreshAccessToken(miAccessToken);
      const res = NextResponse.redirect(new URL("/main", req.url));

      res.cookies.set("accessToken", newAccessToken);

      return res;
    } else {
      return NextResponse.next();
      // return NextResponse.redirect(new URL("/main", req.url));
    }
  }

  if (!miAccessToken) return NextResponse.redirect(new URL("/", req.url));

  if (!accessToken || !jwtVerify(accessToken, jwtSecret)) {
    const newAccessToken = await refreshAccessToken(miAccessToken);

    const res = NextResponse.next();

    res.cookies.set("accessToken", newAccessToken);

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/main/:path*", "/api/:path*"],
};
