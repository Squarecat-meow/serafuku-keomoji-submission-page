import { Submission } from "@/generated/prisma";
import { prisma } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const hasStatus = params.has("status");
    if (!hasStatus) {
    } else {
    }
    const status = params.get("status") as Submission["status"];

    if (!status)
      return NextResponse.json(
        { message: "올바른 요청이 아닙니다!" },
        { status: 400 },
      );

    const res = await prisma.submission.findMany({
      where: {
        status,
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
