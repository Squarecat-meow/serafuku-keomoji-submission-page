"use client";

import { Submission } from "@/generated/prisma";
import SubmissionCard from "./SubmissionCard";
import { useState } from "react";
import { useKeomojiStore } from "@/stores/kemojiDetailStore";
import { useShallow } from "zustand/shallow";
import SubmissionModal from "./SubmissionModal";

export default function SubmissionCardArray({
  data,
}: {
  data: Submission[] | undefined;
}) {
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const { selectedKeomoji, setSelectedKeomoji } = useKeomojiStore(
    useShallow((state) => ({
      selectedKeomoji: state.selectedKeomoji,
      setSelectedKeomoji: state.setSelectedKeomoji,
    })),
  );

  const handleToggleDetailModal = (state: boolean) => {
    setIsDetailVisible(state);
  };
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((el) => (
          <SubmissionCard
            data={el}
            key={el.id}
            setData={setSelectedKeomoji}
            setIsVisible={handleToggleDetailModal}
          />
        ))}
      </section>
      {selectedKeomoji && (
        <SubmissionModal
          data={selectedKeomoji}
          isVisible={isDetailVisible}
          onDetailClick={handleToggleDetailModal}
        />
      )}
    </>
  );
}
