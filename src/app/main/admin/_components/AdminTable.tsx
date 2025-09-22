"use client";

import Chip from "@/components/primitives/Chip";
import { adminQueries } from "@/queries/adminQueries";
import { useAdminSidebarStore } from "@/stores/adminSidebarStore";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function AdminTable() {
  const type = useAdminSidebarStore((state) => state.type);
  const { data, isLoading } = useQuery(
    adminQueries.sidebarSingleStatusOptions(type),
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

  if (!isLoading) <Loader2Icon className="animate-spin" />;

  if (data?.length === 0)
    return (
      <div className="w-fit m-auto space-y-2 text-center">
        <div className="w-36 mx-auto aspect-square relative">
          <Image
            src={"/images/no_data.png"}
            alt="신청된 커모지가 없습니다"
            fill
          />
        </div>
        <p className="text-xl">커모지가 없습니다!</p>
      </div>
    );

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
            <th>{i + 1}</th>
            <motion.td>
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
            <td className="flex flex-col">
              <span>로컬전용: {el.isLocal ? "⭕" : "❌"}</span>
              <span>민감한 커모지: {el.isSensitive ? "⭕" : "❌"}</span>
            </td>
            <td className="w-fit">
              <Chip status={el.status} />
            </td>
            <td>
              <div className="flex gap-2">
                <button className="px-2 btn btn-sm">수정</button>
                <button className="px-2 btn btn-success btn-sm">승인</button>
                <button className="px-2 btn btn-error btn-sm">반려</button>
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
