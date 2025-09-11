"use client";

import Modal from "@/components/primitives/Modal";

export default function KeomojiSubmissionConfirmModal({
  isVisible,
  setIsVisible,
  callback,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  callback: () => unknown;
}) {
  return (
    <Modal.Root isVisible={isVisible} setIsVisible={setIsVisible}>
      <Modal.Body className="w-md space-y-4">
        <h1 className="text-xl font-bold">성공</h1>
        <p>커모지 제출이 성공했습니다!</p>
        <div className="space-x-4 text-right">
          <button
            className="btn btn-accent"
            onClick={() => setIsVisible(false)}
          >
            취소
          </button>
        </div>
      </Modal.Body>
    </Modal.Root>
  );
}
