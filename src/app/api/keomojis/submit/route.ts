import { formDataParser } from "@/functions/formDataParser";
import { Status, Submission } from "@/generated/prisma";
import { jwtSecret } from "@/lib/jwt";
import { prisma } from "@/lib/prismaClient";
import { uploadFile } from "@/lib/s3";
import { IKeomoji } from "@/types/misskey/keomojiType";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const submission = formDataParser<IKeomoji>(data);
    if (!req.cookies.has("accessToken"))
      return NextResponse.json(
        { message: "액세스 토큰이 없습니다!" },
        { status: 403 },
      );
    const accessToken = req.cookies.get("accessToken")!.value;
    const username = await jwtVerify<{ username: string }>(
      accessToken,
      jwtSecret,
    );
    const isDuplicated = await prisma.submission.findUnique({
      where: {
        name: submission.name,
      },
    });
    if (isDuplicated)
      return NextResponse.json(
        { message: "중복된 이름의 커모지가 있습니다!" },
        { status: 409 },
      );
    const imageFile = data.get("image");
    if (!submission)
      return NextResponse.json(
        { message: "전송받은 데이터를 변환하는 과정에서 오류가 발생했어요!" },
        { status: 500 },
      );
    if (!imageFile || typeof imageFile !== "object")
      return NextResponse.json(
        { message: "이미지 파일이 정상적인 파일이 아닙니다!" },
        { status: 400 },
      );

    const uploadedImgUrl = await uploadFile(imageFile);
    if (!uploadedImgUrl)
      return NextResponse.json(
        { message: "이미지를 업로드 하는데 실패했습니다!" },
        { status: 500 },
      );

    Object.assign(submission, { url: uploadedImgUrl });

    const user = await prisma.user.findUnique({
      where: {
        username: username.payload.username,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: "신청한 유저는 없는 유저에요!" },
        { status: 404 },
      );

    const dbSubmission = await prisma.submission.create({
      data: {
        ...submission,
        submissionerUsername: user.username,
      },
    });

    return NextResponse.json(dbSubmission);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageParam = searchParams.get("page");
  const statusParam = searchParams.get("status") as Status;
  const pageSize = 12;

  if ((!pageParam || !statusParam) && !pageParam)
    return NextResponse.json(
      { message: "올바른 리스트 요청이 아닙니다!" },
      { status: 400 },
    );

  const page = parseInt(pageParam);
  const skip = (page - 1) * pageSize;
  const results = await prisma.submission.findMany({
    ...(statusParam ? { where: { status: statusParam } } : {}),
    skip,
    take: pageSize,
  });

  if (!results) return NextResponse.json({}, { status: 204 });

  const totalCount = await prisma.submission.count();
  const hasNextPage = totalCount >= skip + pageSize;
  const hasPrevPage = totalCount <= skip + pageSize;

  return NextResponse.json({ results, totalCount, hasNextPage, hasPrevPage });
}
