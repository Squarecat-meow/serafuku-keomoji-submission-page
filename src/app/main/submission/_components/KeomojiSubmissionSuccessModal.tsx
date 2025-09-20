"use client";

import { Modal } from "@/components/primitives/modal/Modal";

export default function KeomojiSubmissionConfirmModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) {
  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      className="w-md space-y-4"
    >
      <h1 className="text-xl font-bold">성공</h1>
      <p>커모지 제출이 성공했습니다!</p>
      <div className="space-x-4 text-right">
        <button className="btn btn-accent" onClick={() => setIsVisible(false)}>
          취소
        </button>
      </div>
    </Modal>
  );
}
