"use server";

import { prisma } from "@/lib/prismaClient";
import { IUser } from "@/types/auth/authType";
import ky from "ky";
import { cookies } from "next/headers";

export async function misskeyAuthPhaseTwo(token: string) {
  const serverUrl = process.env.SERVER_URL;
  const serverUri = process.env.SERVER_URI;
  const cookieStore = await cookies();

  try {
    if (token.length <= 0) throw new Error("토큰이 없습니다!");
    const appSecret = await prisma.server.findUnique({
      where: {
        serverName: serverUri,
      },
    });

    if (!appSecret)
      throw new Error("미스키 서버가 DB에 저장되어있지 않습니다!");

    const accessInfo = await ky
      .post<{ accessToken: string; user: IUser }>(
        `${serverUrl}/api/auth/session/userkey`,
        {
          json: {
            appSecret: appSecret.appSecret,
            token: token,
          },
        },
      )
      .json();

    cookieStore.set("accessToken", accessInfo.accessToken);

    return accessInfo.user;
  } catch (err) {
    throw err;
  }
}
