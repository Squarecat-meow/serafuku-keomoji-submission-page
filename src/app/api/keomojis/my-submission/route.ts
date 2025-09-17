import { jwtSecret } from "@/lib/jwt";
import { prisma } from "@/lib/prismaClient";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has("accessToken");

  if (!hasAccessToken) return NextResponse.redirect(new URL("/", req.url));

  const accessToken = cookieStore.get("accessToken")!.value;
  const username = await jwtVerify<{ username: string }>(
    accessToken,
    jwtSecret,
  );

  if (!username)
    return NextResponse.json(
      { message: "JWT형식이 올바르지 않습니다!" },
      { status: 401 },
    );

  const data = await prisma.submission.findMany({
    where: {
      submissionerUsername: username.payload.username,
    },
  });

  return NextResponse.json(data);
}
