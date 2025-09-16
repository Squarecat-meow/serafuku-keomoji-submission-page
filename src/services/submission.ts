import { TStatusPayload } from "@/types/status/statusType";
import { api } from "./apiClient";
import { Submission } from "@/generated/prisma";

interface IPaginatedSubmissionResponse {
  results: Submission[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function getPaginatedSubmissions(
  page: number,
  status: TStatusPayload,
) {
  try {
    const res = await api
      .get("/api/keomojis/submit", {
        searchParams: {
          page,
          ...(status ? { status } : {}),
        },
      })
      .json();
    return res as IPaginatedSubmissionResponse;
  } catch (err) {
    throw err;
  }
}
