import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.delete("accessToken");
  res.cookies.delete("misskeyAccessToken");

  return res;
}
