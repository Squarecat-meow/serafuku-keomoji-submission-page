"use client";

import { misskeyAuthPhaseTwo } from "@/actions/auth/misskeyAuthPhaseTwo";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [imgIndex, setImgIndex] = useState<number | null>(null);
  const loadingArray = [
    "/images/loading/1.gif",
    "/images/loading/2.gif",
    "/images/loading/3.gif",
  ];

  useEffect(() => {
    setImgIndex(Math.floor(Math.random() * 3));
    misskeyAuthPhaseTwo(token)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        router.push("/main");
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <main className="hero min-h-screen">
      <section className="hero-content text-center">
        <h1 className="text-4xl font-bold flex items-center">
          {imgIndex !== null && (
            <Image
              src={loadingArray[imgIndex]}
              alt="로그인 블롭캣 GIF"
              width={48}
              height={48}
              className="inline-flex mr-2 object-cover"
            />
          )}
          로그인하고 있습니다...
        </h1>
      </section>
    </main>
  );
}
