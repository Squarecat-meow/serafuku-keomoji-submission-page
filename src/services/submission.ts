import { TStatusPayload } from "@/types/status/statusType";
import { api } from "./apiClient";
import { Submission } from "@prisma/client/index.js";

interface IPaginatedSubmissionResponse {
  results: Submission[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export async function getPaginatedSubmissions(
  page: number,
  status: TStatusPayload,
  search?: string,
) {
  try {
    const res = await api
      .get("/api/keomojis/submit", {
        searchParams: {
          page,
          ...(status ? { status } : {}),
          ...(search ? { search } : {}),
        },
      })
      .json();
    return res as IPaginatedSubmissionResponse;
  } catch (err) {
    throw err;
  }
}

export async function postSubmission(data: FormData) {
  try {
    const res = await api.post("/api/keomojis/submit", {
      body: data,
    });
    return res;
  } catch (err) {
    throw err;
  }
}

export async function patchSubmission(data: FormData) {
  try {
    const res = await api
      .patch("/api/keomojis/my-submission", {
        body: data,
      })
      .json();
    return res;
  } catch (err) {
    throw err;
  }
}

export async function getMySubmissions() {
  try {
    const res = await api.get("/api/keomojis/my-submission").json();
    return res as Submission[];
  } catch (err) {
    throw err;
  }
}

export async function getMySingleSubmission(id: number) {
  try {
    const res = await api
      .get("/api/keomojis/my-single-submission", {
        searchParams: {
          id,
        },
      })
      .json();
    return res as Submission;
  } catch (err) {
    throw err;
  }
}

export async function deleteSubmission(id: number) {
  try {
    const res = await api.delete("/api/keomojis/submit", { json: { id } });
    return res;
  } catch (err) {
    throw err;
  }
}
