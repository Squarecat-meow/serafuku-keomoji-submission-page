import { backgroundsInfo } from "@/lib/backgroundInfo";
import Image from "next/image";

export default function Background() {
  const randomNumber = Math.floor(Math.random() * 3);
  return (
    <div className="fixed inset-0 -z-[2]">
      <Image
        src={backgroundsInfo[randomNumber].src}
        alt="배경"
        quality={75}
        fill
        className="-z-[2] opacity-70 pointer-events-none object-cover fixed inset-0"
      />
      <span className="absolute bottom-2 right-2 text-xs text-slate-700 dark:text-slate-200">
        사진:{" "}
        <a
          href={backgroundsInfo[randomNumber].unsplash}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
        의{" "}
        <a
          href={backgroundsInfo[randomNumber].authorLink}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {backgroundsInfo[randomNumber].author}
        </a>
      </span>
    </div>
  );
}
