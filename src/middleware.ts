import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.cookies.has("accessToken")) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/main/:path*"],
};
