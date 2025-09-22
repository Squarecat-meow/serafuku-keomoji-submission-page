"use client";

import { Submission } from "@/generated/prisma";
import { adminQueries } from "@/queries/adminQueries";
import { useAdminSidebarStore } from "@/stores/adminSidebarStore";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, ClockIcon, Loader2Icon, XCircleIcon } from "lucide-react";

interface ISidebarItems {
  type: Submission["status"];
  title: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const { data, isLoading } = useQuery(
    adminQueries.sidebarStatusCountOptions(),
  );
  const handleClickItems = useAdminSidebarStore((state) => state.setType);

  const sidebarItems: ISidebarItems[] = [
    {
      type: "PENDING",
      title: "대기",
      icon: <ClockIcon className="stroke-warning" />,
    },
    {
      type: "REJECT",
      title: "반려",
      icon: <XCircleIcon className="stroke-error" />,
    },
    {
      type: "ACCEPTED",
      title: "승인",
      icon: <CheckCircle className="stroke-success" />,
    },
  ];

  if (isLoading) return <Loader2Icon className="animate-spin" />;

  return (
    <ul className="w-full menu space-y-2">
      {sidebarItems.map((item) => (
        <li key={item.type} onClick={() => handleClickItems(item.type)}>
          <a>
            <span>{item.icon}</span>
            <span>{item.title}</span>
            <span>{data && data[item.type] > 0 ? data[item.type] : 0}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
