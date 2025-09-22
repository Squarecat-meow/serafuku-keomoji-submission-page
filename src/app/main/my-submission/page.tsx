"use client";

import { useQuery } from "@tanstack/react-query";
import { mySubmissionQueries } from "@/queries/submissionQueries";
import { Loader2Icon } from "lucide-react";
import MySubmissionModal from "./_components/MySubmissionModal";
import { useState } from "react";
import MySubmissionDeleteModal from "./_components/MySubmissionDeleteModal";
import { useKeomojiStore } from "@/stores/kemojiDetailStore";
import Table from "./_components/MySubmissionTable";

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
      <section>
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <Table data={mySubmissions} onDeleteClick={handleToggleDeleteModal} />
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
