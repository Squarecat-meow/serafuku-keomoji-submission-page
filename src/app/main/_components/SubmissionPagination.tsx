"use client";

import { submissionQueries } from "@/queries/submissionQueries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SubmissionCardArray from "./SubmissionCardArray";
import { Loader2Icon } from "lucide-react";
import { useFilterStore } from "@/stores/filterStore";
import Image from "next/image";
import { useSearchStore } from "@/stores/searchStore";

export default function SubmissionPagination() {
  const [page, setPage] = useState(1);
  const statusValue = useFilterStore((state) => state.value);
  const searchValue = useSearchStore((state) => state.search);
  const { data, isLoading } = useQuery(
    submissionQueries.submissionOptions(page, statusValue, searchValue),
  );
  const pageList =
    data &&
    Array.from({ length: Math.ceil(data.totalCount / 12) }, (_, k) => k + 1);

  if (isLoading) return <Loader2Icon className="animate-spin m-auto" />;

  if (data && data.totalCount <= 0)
    return (
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
    );

  return (
    <>
      <section className="space-y-4">
        <SubmissionCardArray data={data?.results} />
        <div className="w-fit m-auto">
          <button
            className="btn btn-ghost btn-sm"
            disabled={!data?.hasPrevPage}
            onClick={() => page > 1 && setPage((page) => page - 1)}
          >
            &lt;
          </button>
          {pageList?.map((el, i) => (
            <button
              className={`btn btn-ghost btn-sm ${el === page && "font-bold"}`}
              onClick={() => setPage(el)}
              key={i}
            >
              {el}
            </button>
          ))}
          <button
            className="btn btn-ghost btn-sm"
            disabled={!data?.hasNextPage}
            onClick={() => page <= 1 && setPage((page) => page + 1)}
          >
            &gt;
          </button>
        </div>
      </section>
    </>
  );
}
