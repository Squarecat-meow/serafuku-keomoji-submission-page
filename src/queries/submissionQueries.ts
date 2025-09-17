import {
  getMySingleSubmission,
  getMySubmissions,
  getPaginatedSubmissions,
} from "@/services/submission";
import { TStatusPayload } from "@/types/status/statusType";
import { queryOptions } from "@tanstack/react-query";

export const submissionQueries = {
  submission: ({
    page,
    status,
  }: {
    page?: number;
    status?: TStatusPayload;
  }) => ["submission", { page, status }],
  submissionOptions: (page: number, status: TStatusPayload) =>
    queryOptions({
      queryKey: [...submissionQueries.submission({ page, status })],
      queryFn: () => getPaginatedSubmissions(page, status),
    }),
};

export const mySubmissionQueries = {
  mySubmission: () => ["my-submission"],
  mySubmissionOptions: () =>
    queryOptions({
      queryKey: [...mySubmissionQueries.mySubmission()],
      queryFn: () => getMySubmissions(),
    }),
  mySingleSubmission: () => ["my-single-submission"],
  mySingleSubmissionOptions: (id: number) =>
    queryOptions({
      queryKey: [...mySubmissionQueries.mySingleSubmission()],
      queryFn: () => getMySingleSubmission(id),
    }),
};
