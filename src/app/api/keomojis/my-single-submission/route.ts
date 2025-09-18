import { jwtSecret } from "@/lib/jwt";
import { prisma } from "@/lib/prismaClient";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { message: "올바른 요청이 아닙니다!" },
        { status: 401 },
      );

    const data = await prisma.submission.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!data || data.submissionerUsername !== username.payload.username)
      return NextResponse.json(
        { message: "신청자의 커모지가 아닙니다!" },
        { status: 400 },
      );
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
