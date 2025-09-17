"use client";

import { useQuery } from "@tanstack/react-query";
import MySubmissionCard from "./MySubmissionCard";
import { mySubmissionQueries } from "@/queries/submissionQueries";
import { Loader2Icon } from "lucide-react";

export default function MySubmissionCardArray() {
  const { data, isLoading } = useQuery(
    mySubmissionQueries.mySubmissionOptions(),
  );
  return (
    <>
      <h1 className="text-4xl font-bold">내가 신청한 커모지</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <>
            {data?.map((el) => (
              <MySubmissionCard data={el} key={el.id} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
