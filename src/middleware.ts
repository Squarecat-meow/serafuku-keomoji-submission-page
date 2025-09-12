import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { jwtSecret, signJwt } from "./lib/jwt";
import { getUserInfo } from "./services/user";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const miAccessToken = req.cookies.get("misskeyAccessToken")?.value;

  if (!miAccessToken) return NextResponse.redirect(new URL("/", req.url));

  if (!accessToken || !jwtVerify(accessToken, jwtSecret)) {
    const user = await getUserInfo(miAccessToken);
    const newAccessToken = await signJwt({ username: user.username });

    const res = NextResponse.next();

    res.cookies.set("accessToken", newAccessToken);

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/api/:path*"],
};
