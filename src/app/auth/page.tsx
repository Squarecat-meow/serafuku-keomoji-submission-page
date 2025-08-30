'use client';

import { misskeyAuthPhaseTwo } from '@/actions/auth/misskeyAuthPhaseTwo';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const router = useRouter();
  const randomNumber = Math.floor(Math.random() * 3);
  const loadingArray = [
    '/images/loading/1.gif',
    '/images/loading/2.gif',
    '/images/loading/3.gif',
  ];

  useEffect(() => {
    misskeyAuthPhaseTwo(token).then(() => router.push('/main'));
  }, [token]);

  return (
    <main className="hero min-h-screen">
      <section className="hero-content text-center">
        <h1 className="text-4xl font-bold flex items-center">
          <Image
            src={loadingArray[randomNumber]}
            alt="로그인 블롭캣 GIF"
            className="inline-flex h-12 w-12 mr-2 object-cover"
          />
          로그인하고 있습니다...
        </h1>
      </section>
    </main>
  );
}
