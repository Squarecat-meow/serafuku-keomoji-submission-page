import { getPaginatedSubmissions } from "@/services/submission";
import { TStatusPayload } from "@/types/status/statusType";
import { queryOptions } from "@tanstack/react-query";

export const submissionQueries = {
  submission: (page: number, status: TStatusPayload) => [
    "submission",
    { page, status },
  ],
  submissionOptions: (page: number, status: TStatusPayload) =>
    queryOptions({
      queryKey: [...submissionQueries.submission(page, status)],
      queryFn: () => getPaginatedSubmissions(page, status),
    }),
};
