import { prisma } from "@/lib/prismaClient";
import StatusCardArray from "./_components/StatusCardArray";

export default async function Page() {
  const submissionStatus = await prisma.submission.findMany();
  return (
    <>
      <StatusCardArray submission={submissionStatus} />
    </>
  );
}
