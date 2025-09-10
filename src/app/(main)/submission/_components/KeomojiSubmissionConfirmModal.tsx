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
      <Modal.Body>
        <h1>확인</h1>
        <p>이대로 커모지를 제출하시겠습니까?</p>
        <button
          className="btn hover:btn-warning"
          onClick={() => setIsVisible(false)}
        >
          취소
        </button>
        <button
          className="btn btn-accent"
          onClick={() => {
            callback();
            setIsVisible(false);
          }}
        >
          확인
        </button>
      </Modal.Body>
    </Modal.Root>
  );
}
