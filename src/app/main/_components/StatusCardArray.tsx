import Card from "@/components/primitives/Card";
import { Submission } from "@/generated/prisma";

export default function StatusCardArray({
  submission,
}: {
  submission: Submission[];
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card submission={submission} status="TOTAL">
        총 신청 커모지
      </Card>
      <Card submission={submission} status="PENDING">
        검토중인 커모지
      </Card>
      <Card submission={submission} status="REJECT">
        반려된 커모지
      </Card>
      <Card submission={submission} status="ACCEPTED">
        승인된 커모지
      </Card>
    </section>
  );
}
