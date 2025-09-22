import KeomojiImageArray from "@/app/main/submission/_components/KeomojiImageArray";
import { Submission } from "@/generated/prisma";
import Image from "next/image";
import * as motion from "motion/react-client";

export default function ModalDetail({ data }: { data: Submission }) {
  return (
    <article className="space-y-4">
      <KeomojiImageArray imgUrl={data.url} />
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <h1 className="text-3xl font-bold">:{data.name}:</h1>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-12 rounded-full">
              <Image
                src={"/images/mina.png"}
                alt="미나 프로필 사진"
                fill
                className="rounded-full"
              />
            </div>
          </div>
          <div className="chat-bubble break-keep">
            커모지는{" "}
            <motion.img
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", bounce: 0.8 }}
              src={data.url}
              alt={data.name}
              className="h-7 inline-block"
            />{" "}
            이렇게 보여요!
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label>
          <h2 className="text-xs font-light">카테고리</h2>
          <p className="text-lg">{data.category}</p>
        </label>
        <label>
          <h2 className="text-xs font-light">태그</h2>
          <div className="flex flex-wrap gap-2">
            {data.aliases.map((el, i) => (
              <h2
                key={i}
                className="px-3 py-1 w-fit text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-2xl"
              >
                {el}
              </h2>
            ))}
          </div>
        </label>
        <label>
          <h2 className="text-xs font-light">라이선스</h2>
          <p className="text-lg">{data.licenses ? data.licenses : "없음"}</p>
        </label>
      </div>
    </article>
  );
}
