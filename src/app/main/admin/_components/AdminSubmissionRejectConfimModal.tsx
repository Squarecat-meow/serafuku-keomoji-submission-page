"use client";

import { Modal } from "@/components/primitives/modal/Modal";
import { Submission } from "@/generated/prisma";
import { adminQueries } from "@/queries/adminQueries";
import { useAdminSidebarStore } from "@/stores/adminSidebarStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminSubmissionRejectConfirmModal({
  data,
  isVisible,
  setIsVisible,
}: {
  data: Submission;
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const currentStatus = useAdminSidebarStore((state) => state.type);
  const mutation = useMutation(
    adminQueries.adminSubmissionChangeStatusOptions(
      queryClient,
      data.id,
      currentStatus,
      "REJECT",
    ),
  );
  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      className="w-md space-y-4"
    >
      <h1 className="text-xl font-bold">확인</h1>
      <p>커모지를 반려하시겠습니까?</p>
      <div className="space-x-4 text-right">
        <button className="btn btn-outline" onClick={() => setIsVisible(false)}>
          취소
        </button>
        <button
          className="btn btn-accent"
          onClick={() => {
            mutation.mutate();
            setIsVisible(false);
          }}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
