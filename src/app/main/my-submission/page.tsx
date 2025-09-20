"use client";

import { useQuery } from "@tanstack/react-query";
import { mySubmissionQueries } from "@/queries/submissionQueries";
import { Loader2Icon } from "lucide-react";
import MySubmissionCard from "./_components/MySubmissionCard";
import MySubmissionModal from "./_components/MySubmissionModal";
import { useState } from "react";
import MySubmissionDeleteModal from "./_components/MySubmissionDeleteModal";
import { useKeomojiStore } from "@/stores/kemojiDetailStore";

export default function MySubmissionCardArray() {
  const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const selectedKeomoji = useKeomojiStore((state) => state.selectedKeomoji);
  const { data: mySubmissions, isLoading } = useQuery(
    mySubmissionQueries.mySubmissionOptions(),
  );

  const handleToggleDetailModal = (state: boolean) => {
    setIsDetailVisible(state);
  };
  const handleToggleDeleteModal = (state: boolean) => {
    setIsDeleteVisible(state);
  };

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
                onImageClick={() => handleToggleDetailModal(true)}
                key={el.id}
              />
            ))}
          </>
        )}
      </section>
      {selectedKeomoji && (
        <>
          <MySubmissionModal
            data={selectedKeomoji}
            isVisible={isDetailVisible}
            onDetailClick={handleToggleDetailModal}
            onDeleteClick={handleToggleDeleteModal}
          />
          <MySubmissionDeleteModal
            data={selectedKeomoji}
            isVisible={isDeleteVisible}
            onDetailVisible={handleToggleDetailModal}
            onDeleteVisible={handleToggleDeleteModal}
          />
        </>
      )}
    </>
  );
}
