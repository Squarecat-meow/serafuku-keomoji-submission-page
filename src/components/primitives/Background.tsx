import { backgroundsInfo } from "@/lib/backgroundInfo";
import Image from "next/image";

export default function Background() {
  const randomNumber = Math.floor(Math.random() * 3);
  return (
    <>
      <Image
        src={backgroundsInfo[randomNumber].src}
        alt="배경"
        fill
        className="-z-[2] opacity-70 blur pointer-events-none object-cover"
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
    </>
  );
}
