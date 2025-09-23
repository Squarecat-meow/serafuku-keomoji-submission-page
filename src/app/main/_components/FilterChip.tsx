import { Submission } from "@prisma/client/index.js";

export default function FilterChip({
  status,
}: {
  status: Submission["status"];
}) {
  const text: Record<Submission["status"], string> = {
    ACCEPTED: "승인",
    REJECT: "반려",
    PENDING: "대기",
  };
  const classes: Record<Submission["status"], string> = {
    ACCEPTED:
      "bg-success text-success-content focus:bg-success-content focus:text-success focus:inset-shadow-sm focus:inset-shadow-black",
    REJECT:
      "bg-error text-error-content focus:bg-error-content focus:text-error focus:inset-shadow-sm focus:inset-shadow-black",
    PENDING:
      "bg-warning text-warning-content focus:bg-warning-content focus:text-warning focus:inset-shadow-sm focus:inset-shadow-black",
  };
  return (
    <input
      className={`btn btn-sm px-2 py-1 rounded-xl text-xs ${classes[status]}`}
      type="radio"
      name="status"
      id={status}
      aria-label={text[status]}
    />
  );
}
