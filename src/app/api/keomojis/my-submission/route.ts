import { formDataParser } from "@/functions/formDataParser";
import { jwtSecret } from "@/lib/jwt";
import { prisma } from "@/lib/prismaClient";
import { IKeomojiModify } from "@/types/misskey/keomojiType";
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.formData();
    const cookieStore = await cookies();
    const hasAccessToken = cookieStore.has("accessToken");

    if (!hasAccessToken) return NextResponse.redirect(new URL("/", req.url));

    const accessToken = cookieStore.get("accessToken")!.value;
    const tokenVerify = await jwtVerify(accessToken, jwtSecret);

    // TODO:인증로직 수정하기
    if (!tokenVerify)
      return NextResponse.json(
        { message: "JWT형식이 올바르지 않습니다!" },
        { status: 401 },
      );

    const submission = formDataParser<IKeomojiModify>(data);
    const existedName = await prisma.submission.findUnique({
      where: {
        name: submission.name,
      },
    });
    if (existedName && existedName?.name !== submission.name)
      return NextResponse.json(
        { message: "중복된 이름의 커모지가 있습니다!" },
        { status: 409 },
      );
    const dbModifySubmission = await prisma.submission.update({
      where: {
        id: submission.id,
      },
      data: {
        ...submission,
      },
    });
    return NextResponse.json(dbModifySubmission);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
