'use server';

import { prisma } from '@/lib/prismaClient';
import { IAppSecret, ITokenAndAuthUrl } from '@/types/auth/authTypes';
import ky from 'ky';

export async function misskeyAuthPhaseOne(): Promise<ITokenAndAuthUrl> {
  const serverUrl = process.env.SERVER_URL;
  const serverUri = process.env.SERVER_URI;

  if (!serverUrl || !serverUri) {
    throw new Error('서버 환경변수가 없어요!');
  }

  const existingAppSecret = await prisma.server.findUnique({
    where: {
      serverName: serverUri,
    },
  });

  if (existingAppSecret) {
    const tokenAndAuthUrl: ITokenAndAuthUrl = await ky
      .post(`${serverUrl}/api/auth/session/generate`, {
        json: { appSecret: existingAppSecret.appSecret },
      })
      .json();
    return tokenAndAuthUrl;
  } else {
    const appInfo = {
      name: '세라복.모에 커모지 신청 페이지',
      description: '세라복.모에의 커모지를 신청할 수 있는 페이지입니다.',
      permission: ['read:account'],
      callbackUrl: process.env.APP_URL ? `${process.env.APP_URL}/auth` : null,
    };

    const appSecret: IAppSecret = await ky
      .post(`${serverUrl}/api/app/create`, { json: appInfo })
      .json();
    const tokenAndAuthUrl: ITokenAndAuthUrl = await ky
      .post(`${serverUrl}/api/auth/session/generate`, {
        json: { appSecret: appSecret.secret },
      })
      .json();

    await prisma.server.create({
      data: {
        serverName: serverUri,
        appSecret: appSecret.secret,
      },
    });
    return tokenAndAuthUrl;
  }
}
