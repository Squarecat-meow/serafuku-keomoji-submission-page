"use client";

import { Submission } from "@prisma/client/index.js";
import { Modal } from "@/components/primitives/modal/Modal";
import ModalDetail from "@/components/primitives/modal/ModalDetail";

export default function MySubmissionModal({
  data,
  isVisible,
  onDetailClick,
  onDeleteClick,
}: {
  data: Submission;
  isVisible: boolean;
  onDetailClick: (state: boolean) => void;
  onDeleteClick: (state: boolean) => void;
}) {
  return (
    <Modal isVisible={isVisible} setIsVisible={onDetailClick}>
      <ModalDetail data={data} />
      <div className="flex gap-2">
        <button className="px-2 btn">수정하기</button>
        <button
          className="px-2 btn btn-error"
          onClick={() => {
            onDeleteClick(true);
          }}
        >
          삭제하기
        </button>
      </div>
    </Modal>
  );
}
