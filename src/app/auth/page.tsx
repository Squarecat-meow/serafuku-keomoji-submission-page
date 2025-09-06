"use client";

import { misskeyAuthPhaseTwo } from "@/actions/auth/misskeyAuthPhaseTwo";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const randomNumber = useRef(Math.floor(Math.random() * 3));
  const loadingArray = [
    "/images/loading/1.gif",
    "/images/loading/2.gif",
    "/images/loading/3.gif",
  ];
  const { isPending } = useQuery({
    queryKey: ["user", token],
    queryFn: () => misskeyAuthPhaseTwo(token),
  });

  useEffect(() => {
    if (!isPending) router.push("/main");
  }, [token, isPending]);

  return (
    <main className="hero min-h-screen">
      <section className="hero-content text-center">
        <h1 className="text-4xl font-bold flex items-center">
          {/* BUG: Next.js Hydration 에러 발생 */}
          <Image
            src={loadingArray[randomNumber.current]}
            alt="로그인 블롭캣 GIF"
            width={48}
            height={48}
            className="inline-flex mr-2 object-cover"
          />
          로그인하고 있습니다...
        </h1>
      </section>
    </main>
  );
}
