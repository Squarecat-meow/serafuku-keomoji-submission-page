"use client";

import MySubmissionDetail from "@/app/main/my-submission/[id]/components/MySubmissionDetail";
import MySubmissionModal from "@/app/main/my-submission/_components/MySubmissionModal";
import { AnimatePresence } from "motion/react";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <AnimatePresence mode="wait">
      <MySubmissionModal>
        <MySubmissionDetail id={id} />
      </MySubmissionModal>
    </AnimatePresence>
  );
}
