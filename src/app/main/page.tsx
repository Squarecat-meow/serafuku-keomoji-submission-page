import StatusCardArray from "./_components/StatusCardArray";
import Image from "next/image";
import SubmissionPagination from "./_components/SubmissionPagination";
import { prisma } from "@/lib/prismaClient";

export default async function Page() {
  const submission = await prisma.submission.findMany();
  return (
    <>
      <StatusCardArray submission={submission} />
      <h1 className="mt-4 text-4xl font-bold">신청된 커모지 리스트</h1>
      {submission.length !== 0 ? (
        <SubmissionPagination />
      ) : (
        <div className="w-fit m-auto space-y-2 text-center">
          <div className="w-2xs aspect-square relative">
            <Image
              src={"/images/no_data.png"}
              alt="신청된 커모지가 없습니다"
              fill
            />
          </div>
          <p className="text-xl">신청된 커모지가 없습니다!</p>
        </div>
      )}
    </>
  );
}
