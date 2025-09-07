import { prisma } from "@/lib/prismaClient";
import StatusCardArray from "./_components/StatusCardArray";
import Image from "next/image";
import RecentSubmissionCardArray from "./_components/RecentSubmissionCardArray";

export default async function Page() {
  const submissionStatus = await prisma.submission.findMany();
  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);
  const recentSubmission = await prisma.submission.findMany({
    where: {
      createdAt: {
        gte: new Date(),
        lt: oneWeekLater,
      },
    },
  });

  console.log(recentSubmission);
  return (
    <>
      <StatusCardArray submission={submissionStatus} />
      <h1 className="mt-4 text-4xl font-bold">최근 신청된 커모지</h1>
      {recentSubmission.length !== 0 ? (
        <RecentSubmissionCardArray data={recentSubmission} />
      ) : (
        <div className="w-fit m-auto space-y-2 text-center">
          <div className="w-2xs aspect-square relative">
            <Image
              src={"/images/no_data.png"}
              alt="최근 신청된 커모지가 없습니다"
              fill
            />
          </div>
          <p className="text-xl">최근 신청된 커모지가 없습니다!</p>
        </div>
      )}
    </>
  );
}
