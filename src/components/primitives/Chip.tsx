import { Submission } from "@prisma/client/index.js";

export default function Chip({ status }: { status: Submission["status"] }) {
  const text: Record<Submission["status"], string> = {
    ACCEPTED: "승인",
    REJECT: "반려",
    PENDING: "대기",
  };
  const classes: Record<Submission["status"], string> = {
    ACCEPTED: "bg-success text-success-content",
    REJECT: "bg-error text-error-content",
    PENDING: "bg-warning text-warning-content",
  };
  return (
    <div className={`w-fit px-2 py-1 rounded-xl text-xs ${classes[status]}`}>
      {text[status]}
    </div>
  );
}
