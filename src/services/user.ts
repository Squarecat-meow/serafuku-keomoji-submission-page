import { IUser } from "@/types/auth/authType";

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
