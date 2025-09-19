"use client";

import { useQuery } from "@tanstack/react-query";
import { mySubmissionQueries } from "@/queries/submissionQueries";
import { Loader2Icon } from "lucide-react";
import MySubmissionCard from "./_components/MySubmissionCard";
import MySubmissionModal from "./_components/MySubmissionModal";
import { useState } from "react";
import { Submission } from "@/generated/prisma";

export default function MySubmissionCardArray() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<Submission | null>(null);
  const { data: mySubmissions, isLoading } = useQuery(
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
            {mySubmissions?.map((el) => (
              <MySubmissionCard
                data={el}
                setData={setData}
                setIsVisible={setIsVisible}
                key={el.id}
              />
            ))}
          </>
        )}
      </section>
      <MySubmissionModal
        animatedKey={data?.id.toString()}
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}
