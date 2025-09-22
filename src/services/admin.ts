import { Submission } from "@/generated/prisma";
import { api } from "./apiClient";

export async function getSidebarCount() {
  try {
    const res = await api.get("/api/admin/count").json();
    return res as Record<string, number>;
  } catch (err) {
    throw err;
  }
}

export async function getSubmissionInfo(status: Submission["status"]) {
  try {
    const res = await api
      .get("/api/admin/stat", {
        searchParams: {
          status,
        },
      })
      .json();
    return res as Submission[];
  } catch (err) {
    throw err;
  }
}

export async function patchAdminSubmission(data: FormData) {
  try {
    const res = await api
      .patch("/api/admin/edit", {
        body: data,
      })
      .json();
    return res as Submission;
  } catch (err) {
    throw err;
  }
}

export async function patchAdminStatusChange(
  id: number,
  status: Submission["status"],
) {
  try {
    const res = await api
      .patch("/api/admin/stat", {
        json: {
          id,
          status,
        },
      })
      .json();
    return res as Submission;
  } catch (err) {
    throw err;
  }
}
