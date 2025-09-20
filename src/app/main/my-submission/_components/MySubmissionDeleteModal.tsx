"use client";

import { Modal } from "@/components/primitives/modal/Modal";
import { Submission } from "@/generated/prisma";
import { mySubmissionQueries } from "@/queries/submissionQueries";
import {
  useGlobalLoadingStore,
  useGlobalModalStore,
} from "@/stores/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

export default function MySubmissionDeleteModal({
  data,
  isVisible,
  onDetailVisible,
  onDeleteVisible,
}: {
  data: Submission;
  isVisible: boolean;
  onDetailVisible: (state: boolean) => void;
  onDeleteVisible: (state: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { setGlobalModalVisible, setModalChildren, setModalType } =
    useGlobalModalStore(
      useShallow((state) => ({
        setGlobalModalVisible: state.setIsModalVisible,
        setModalChildren: state.setChildren,
        setModalType: state.setModalType,
      })),
    );
  const setLoading = useGlobalLoadingStore(
    (state) => state.setIsLoadingVisible,
  );
  const mutation = useMutation(
    mySubmissionQueries.mySubmissionDeleteMutationOptions(
      data.id,
      queryClient,
      onDetailVisible,
      setModalChildren,
      setModalType,
      setGlobalModalVisible,
      setLoading,
    ),
  );
  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={onDeleteVisible}
      className="space-y-4"
    >
      <h1 className="text-xl font-bold">확인</h1>
      <p className="break-keep">
        신청한 커모지를 지우시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </p>
      <div className="space-x-4 text-right">
        <button
          className="btn btn-outline"
          onClick={() => onDeleteVisible(false)}
        >
          취소
        </button>
        <button
          className="btn btn-accent"
          onClick={() => {
            onDeleteVisible(false);
            mutation.mutate();
          }}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
