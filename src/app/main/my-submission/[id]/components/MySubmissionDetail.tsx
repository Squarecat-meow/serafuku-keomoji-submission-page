"use client";

import { mySubmissionQueries } from "@/queries/submissionQueries";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

export default function MySubmissionDetail({ id }: { id: string }) {
  const { data, isLoading } = useQuery(
    mySubmissionQueries.mySingleSubmissionOptions(parseInt(id)),
  );

  if (isLoading) return <Loader2Icon className="animate-spin" />;

  return (
    <article>
      <h1>:{data?.name}:</h1>
      <p>{data?.category}</p>
    </article>
  );
}
