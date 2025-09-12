"use server";

import { signJwt } from "@/lib/jwt";
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
    const accessToken = await signJwt({ username: accessInfo.user.username });
    cookieStore.set("misskeyAccessToken", accessInfo.accessToken, {
      maxAge: 1000 * 60 * 15,
    });
    cookieStore.set("accessToken", accessToken, {
      maxAge: 1000 * 60 * 15,
    });

    await prisma.user.upsert({
      where: {
        username: accessInfo.user.username,
      },
      update: {
        name: accessInfo.user.name,
        username: accessInfo.user.username,
        avatarUrl: accessInfo.user.avatarUrl,
        bannerUrl: accessInfo.user.bannerUrl,
        roles: accessInfo.user.roles.map((el) => el.id),
      },
      create: {
        name: accessInfo.user.name,
        username: accessInfo.user.username,
        avatarUrl: accessInfo.user.avatarUrl,
        bannerUrl: accessInfo.user.bannerUrl,
        roles: accessInfo.user.roles.map((el) => el.id),
      },
    });

    return accessInfo.user;
  } catch (err) {
    throw err;
  }
}
