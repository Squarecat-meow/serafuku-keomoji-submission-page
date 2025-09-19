import { CheckCircle, ClockIcon, FileUpIcon, XCircleIcon } from "lucide-react";
import Badge from "./Badge";
import { Submission } from "@/generated/prisma";

interface ICard {
  status: Submission["status"] | "TOTAL";
  children: React.ReactNode;
  submission: number;
}

export default function Card({ status, children, submission }: ICard) {
  const statusIcons = {
    TOTAL: <FileUpIcon className="stroke-info" />,
    PENDING: <ClockIcon className="stroke-warning" />,
    REJECT: <XCircleIcon className="stroke-error" />,
    ACCEPTED: <CheckCircle className="stroke-success" />,
  };
  return (
    <article className="w-full flex flex-col bg-base-100 p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold break-keep">{children}</h1>
        <Badge>{statusIcons[status]}</Badge>
      </div>
      <div>
        <p>{submission}</p>
      </div>
    </article>
  );
}
