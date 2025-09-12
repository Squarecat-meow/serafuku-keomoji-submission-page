import { formDataParser } from "@/functions/formDataParser";
import { prisma } from "@/lib/prismaClient";
import { uploadFile } from "@/lib/s3";
import { IKeomoji } from "@/types/misskey/keomojiType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const submission = formDataParser<IKeomoji>(data);
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

    const dbSubmission = await prisma.submission.create({
      data: {
        ...submission,
      },
    });

    return NextResponse.json(dbSubmission);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
