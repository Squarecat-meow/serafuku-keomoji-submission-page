import { CheckCircle, ClockIcon, FileUpIcon, XCircleIcon } from "lucide-react";
import Badge from "./Badge";
import { submission } from "@/generated/prisma";

type TCardStatus = "Total" | "Pending" | "Reject" | "Accepted";

interface ICard {
  status: TCardStatus;
  children: React.ReactNode;
  submission: submission[];
}

export default function Card({ status, children, submission }: ICard) {
  const statusIcons = {
    Total: <FileUpIcon className="stroke-accent" />,
    Pending: <ClockIcon className="stroke-warning" />,
    Reject: <XCircleIcon className="stroke-error" />,
    Accepted: <CheckCircle className="stroke-success" />,
  };
  const submissionStatusQuantity = submission.filter(
    (el) => el.status === status.toString(),
  );
  return (
    <div className="w-full flex flex-col bg-base-100 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold break-keep">{children}</h1>
        <Badge>{statusIcons[status]}</Badge>
      </div>
      <div>
        <p>{submissionStatusQuantity.length}</p>
      </div>
    </div>
  );
}
