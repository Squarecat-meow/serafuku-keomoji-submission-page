import Card from "@/components/primitives/Card";
import { submission } from "@/generated/prisma";

export default function StatusCardArray({
  submission,
}: {
  submission: submission[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card submission={submission} status="Total">
        총 신청 커모지
      </Card>
      <Card submission={submission} status="Pending">
        검토중인 커모지
      </Card>
      <Card submission={submission} status="Reject">
        반려된 커모지
      </Card>
      <Card submission={submission} status="Accepted">
        승인된 커모지
      </Card>
    </div>
  );
}
