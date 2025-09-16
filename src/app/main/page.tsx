import StatusCardArray from "./_components/StatusCardArray";
import Image from "next/image";
import SubmissionPagination from "./_components/SubmissionPagination";
import { prisma } from "@/lib/prismaClient";
import { SearchIcon } from "lucide-react";
import FilterForm from "./_components/FilterForm";

export default async function Page() {
  const submission = await prisma.submission.findMany();
  return (
    <>
      <StatusCardArray submission={submission} />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">신청된 커모지 리스트</h1>
        <div className="min-w-fit flex items-center gap-2">
          <FilterForm />
          <label className="input">
            <SearchIcon size={16} />
            <input type="search" placeholder="검색" />
          </label>
        </div>
      </div>
      {submission.length !== 0 ? (
        <SubmissionPagination />
      ) : (
        <div className="w-fit m-auto space-y-2 text-center">
          <div className="w-2xs aspect-square relative">
            <Image
              src={"/images/no_data.png"}
              alt="신청된 커모지가 없습니다"
              fill
            />
          </div>
          <p className="text-xl">신청된 커모지가 없습니다!</p>
        </div>
      )}
    </>
  );
}
