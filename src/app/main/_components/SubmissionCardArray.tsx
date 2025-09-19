"use client";

import { Submission } from "@/generated/prisma";
import SubmissionCard from "./SubmissionCard";
import { useState } from "react";
import MySubmissionModal from "../my-submission/_components/MySubmissionModal";

export default function SubmissionCardArray({
  data,
}: {
  data: Submission[] | undefined;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalData, setModalData] = useState<Submission | null>(null);
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((el) => (
          <SubmissionCard
            data={el}
            key={el.id}
            setData={setModalData}
            setIsVisible={setIsVisible}
          />
        ))}
      </section>
      {modalData && (
        <MySubmissionModal
          animatedKey={modalData.id.toString()}
          data={modalData}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </>
  );
}
