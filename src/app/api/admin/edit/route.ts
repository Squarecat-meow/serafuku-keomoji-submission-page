import { formDataParser } from "@/functions/formDataParser";
import { prisma } from "@/lib/prismaClient";
import { IKeomojiModify } from "@/types/misskey/keomojiType";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.formData();
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
