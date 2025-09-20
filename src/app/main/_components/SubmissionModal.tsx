"use client";

import { Submission } from "@/generated/prisma";
import { Modal } from "@/components/primitives/modal/Modal";
import ModalDetail from "@/components/primitives/modal/ModalDetail";

export default function SubmissionModal({
  data,
  isVisible,
  onDetailClick,
}: {
  data: Submission;
  isVisible: boolean;
  onDetailClick: (state: boolean) => void;
}) {
  return (
    <Modal isVisible={isVisible} setIsVisible={onDetailClick}>
      <ModalDetail data={data} />
    </Modal>
  );
}
