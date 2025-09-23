"use client";

import Chip from "@/components/primitives/Chip";
import { Submission } from "@prisma/client/index.js";
import { useKeomojiStore } from "@/stores/kemojiDetailStore";
import { motion } from "motion/react";

export default function Table({
  data,
  onDeleteClick,
  onModifyClick,
}: {
  data: Submission[] | undefined;
  onDeleteClick: (state: boolean) => void;
  onModifyClick: (state: boolean) => void;
}) {
  const setSelectedKeomoji = useKeomojiStore(
    (state) => state.setSelectedKeomoji,
  );
  const variants = {
    rest: {
      scale: 1,
      rotateZ: 0,
    },
    hover: {
      scale: 1.1,
      rotateZ: 3,
    },
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th> </th>
          <th>이미지</th>
          <th>이름 & 카테고리</th>
          <th>태그</th>
          <th>라이선스</th>
          <th>비고</th>
          <th>상태</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((el, i) => (
          <motion.tr
            key={el.id}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="transition-colors hover:bg-base-100"
          >
            <th className="max-w-fit">{i + 1}</th>
            <motion.td className="max-w-fit">
              <motion.img
                src={el.url}
                alt={el.name}
                variants={variants}
                className="h-12 object-contain"
              />
            </motion.td>
            <td>
              <div className="flex flex-col">
                <span className="font-bold">:{el.name}:</span>
                <span className="text-xs opacity-50">{el.category}</span>
              </div>
            </td>
            <td className="space-x-2">
              {el.aliases.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-2xl"
                >
                  {tag}
                </span>
              ))}
            </td>
            <td>{el.licenses ? el.licenses : "없음"}</td>
            <td className="max-w-fit flex flex-col">
              <span>로컬전용: {el.isLocal ? "⭕" : "❌"}</span>
              <span>민감한 커모지: {el.isSensitive ? "⭕" : "❌"}</span>
            </td>
            <td className="max-w-fit">
              <Chip status={el.status} />
            </td>
            {el.status === "PENDING" ? (
              <td className="max-w-fit">
                <div className="flex gap-2">
                  <button
                    className="px-2 btn btn-sm"
                    onClick={() => {
                      setSelectedKeomoji(el);
                      onModifyClick(true);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className="px-2 btn btn-error btn-sm"
                    onClick={() => {
                      setSelectedKeomoji(el);
                      onDeleteClick(true);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              </td>
            ) : (
              <td></td>
            )}
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
