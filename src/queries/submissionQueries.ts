import { getPaginatedSubmissions } from "@/services/submission";
import { queryOptions } from "@tanstack/react-query";

export const submissionQueries = {
  submission: (page: number) => ["submission", page],
  submissionOptions: (page: number) =>
    queryOptions({
      queryKey: [...submissionQueries.submission(page)],
      queryFn: () => getPaginatedSubmissions(page),
    }),
};
