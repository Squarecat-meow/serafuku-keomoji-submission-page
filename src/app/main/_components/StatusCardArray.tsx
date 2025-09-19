import Card from "@/components/primitives/Card";
import { prisma } from "@/lib/prismaClient";

export default async function StatusCardArray() {
  const [totalCount, pendingCount, rejectedCount, acceptedCount] =
    await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({ where: { status: "PENDING" } }),
      prisma.submission.count({ where: { status: "REJECT" } }),
      prisma.submission.count({ where: { status: "ACCEPTED" } }),
    ]);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card submission={totalCount} status="TOTAL">
        총 신청 커모지
      </Card>
      <Card submission={pendingCount} status="PENDING">
        검토중인 커모지
      </Card>
      <Card submission={rejectedCount} status="REJECT">
        반려된 커모지
      </Card>
      <Card submission={acceptedCount} status="ACCEPTED">
        승인된 커모지
      </Card>
    </section>
  );
}
