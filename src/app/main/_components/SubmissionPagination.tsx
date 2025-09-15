"use client";

import { submissionQueries } from "@/queries/submissionQueries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SubmissionCardArray from "./SubmissionCardArray";
import { Loader2Icon } from "lucide-react";

export default function SubmissionPagination() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(
    submissionQueries.submissionOptions(page),
  );
  const pageList =
    data &&
    Array.from({ length: Math.ceil(data.totalCount / 12) }, (_, k) => k + 1);

  return (
    <>
      {isLoading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
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
      )}
    </>
  );
}
