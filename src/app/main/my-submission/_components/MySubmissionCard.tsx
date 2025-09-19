"use client";

import Chip from "@/components/primitives/Chip";
import { Submission } from "@/generated/prisma";
import { EllipsisVertical } from "lucide-react";
import { motion } from "motion/react";

export default function MySubmissionCard({
  data,
  setData,
  setIsVisible,
}: {
  data: Submission;
  setData: (id: Submission) => void;
  setIsVisible: (state: boolean) => void;
}) {
  return (
    <article className="w-full p-4 relative flex flex-col gap-4 bg-base-200 rounded-2xl">
      <div
        className="w-1/3 aspect-square m-auto"
        onClick={() => {
          setData(data);
          setIsVisible(true);
        }}
      >
        <motion.img
          whileHover={{ scale: 1.1, rotateZ: 3 }}
          src={data.url}
          alt={`:${data.name}: 커모지`}
          className="w-full aspect-square rounded-2xl object-contain cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-bold">:{data.name}:</h1>
            <Chip status={data.status} />
          </div>
          <h2 className="text-lg text-gray-500">{data.category}</h2>
        </div>
        <div className="space-x-2">
          {data.aliases.map((el, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-2xl"
            >
              {el}
            </span>
          ))}
        </div>
        <p>신청한 학생: {data.submissionerUsername}</p>
      </div>
      <div className="dropdown dropdown-end absolute top-2 right-2">
        <div
          className="px-1 btn btn-ghost btn-circle"
          role="button"
          tabIndex={0}
        >
          <EllipsisVertical />
        </div>
        <ul className="dropdown-content menu bg-base-200 border border-gray-500 shadow-lg rounded-box z-[1] w-28">
          <button className="px-2 btn btn-sm btn-ghost">수정하기</button>
          <button className="px-2 btn btn-sm btn-ghost hover:bg-error">
            삭제하기
          </button>
        </ul>
      </div>
    </article>
  );
}
