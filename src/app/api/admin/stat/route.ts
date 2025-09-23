import { Submission } from "@prisma/client/index.js";
import { prisma } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const hasMisskeyToken = cookieStore.has("misskeyAccessToken");

    if (!hasMisskeyToken)
      return NextResponse.json(
        { message: "미스키 토큰이 없습니다!" },
        { status: 401 },
      );

    const misskeyToken = cookieStore.get("misskeyAccessToken")!.value;

    const data = (await req.json()) as {
      id: number;
      status: Submission["status"];
    };

    if (data.status === "ACCEPTED") {
      const { url: imageUrl } = await prisma.submission.findUniqueOrThrow({
        where: {
          id: data.id,
        },
        select: {
          url: true,
        },
      });
    }

    const res = await prisma.submission.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
