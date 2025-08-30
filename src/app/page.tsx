'use client';

import Image from 'next/image';
import SerafukuIcon from '@/public/images/serafuku.png';
import MisskeyIcon from '@/public/icons/Misskey.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { misskeyAuthPhaseOne } from '@/actions/auth/misskeyAuthPhaseOne';

export default function Home() {
  const router = useRouter();
  const handleLoginClick = async () => {
    try {
      const { url } = await misskeyAuthPhaseOne();
      router.push(url);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  };

  return (
    <main className="hero min-h-screen">
      <section className="hero-content text-center">
        <article className="space-y-8 break-keep">
          <h1 className="text-6xl font-bold">
            세라복.모에 커스텀 에모지 신청 페이지
          </h1>
          <p>
            미스키
            <MisskeyIcon className="w-5 h-5 inline-flex fill-green-600 mx-1" />
            인스턴스{' '}
            <Link
              href={'https://serafuku.moe'}
              className="text-sky-500 underline"
            >
              세라복.모에
            </Link>
            의 커스텀 이모지를 신청할 수 있는 페이지입니다. <br />
            세라복.모에 계정으로만 로그인할 수 있으며, <br />
            신청 후에는 학생회가 검토한 후, 승인 결과를 DM으로 알려드립니다.
          </p>
          <button className="btn btn-xl bg-sky-500" onClick={handleLoginClick}>
            <Image
              src={SerafukuIcon}
              alt="세라복.모에 아이콘"
              width={24}
              height={24}
              className="mr-1"
            />
            세라복.모에로 로그인
          </button>
        </article>
      </section>
    </main>
  );
}
