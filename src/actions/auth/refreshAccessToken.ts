"use server";

import { signJwt } from "@/lib/jwt";
import { getUserInfo } from "@/services/user";

export async function refreshAccessToken(misskeyAccessToken: string) {
  const user = await getUserInfo(misskeyAccessToken);
  const newAccessToken = await signJwt({ username: user.username });

  return newAccessToken;
}
