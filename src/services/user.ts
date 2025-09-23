import { IUser } from "@/types/auth/authType";
import { api } from "./apiClient";

export async function getUserInfo(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/i`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return (await res.json()) as IUser;
  } catch (err) {
    throw err;
  }
}

export async function postLogout() {
  try {
    const res = await api.post("/api/user/logout", { json: {} });
    return res;
  } catch (err) {
    throw err;
  }
}
