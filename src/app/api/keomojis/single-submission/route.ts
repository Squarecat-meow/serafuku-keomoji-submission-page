import { prisma } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const stringId = searchParams.get("id");

    if (!stringId)
      return NextResponse.json(
        { message: "올바른 요청이 아닙니다!" },
        { status: 401 },
      );

    const id = parseInt(stringId);

    const data = await prisma.submission.findUnique({
      where: {
        id,
      },
    });

    if (!data)
      return NextResponse.json(
        { message: "데이터가 없습니다!" },
        { status: 404 },
      );

    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
