import { Submission } from "@/generated/prisma";
import { getSidebarCount, getSubmissionInfo } from "@/services/admin";
import { queryOptions } from "@tanstack/react-query";

export const adminQueries = {
  sidebarCount: () => ["sidebar-count"],
  sidebarStatus: (status: Submission["status"]) => ["status", status],
  sidebarStatusCountOptions: () =>
    queryOptions({
      queryKey: [...adminQueries.sidebarCount()],
      queryFn: () => getSidebarCount(),
    }),
  sidebarSingleStatusOptions: (status: Submission["status"]) =>
    queryOptions({
      queryKey: [...adminQueries.sidebarStatus(status)],
      queryFn: () => getSubmissionInfo(status),
    }),
};
