import { Modal } from "@/components/primitives/modal/Modal";

export default function MySubmissionModifyConfirmModal({
  isVisible,
  setIsVisible,
  callback,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  callback: () => unknown;
}) {
  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      className="w-md space-y-4"
    >
      <h1 className="text-xl font-bold">확인</h1>
      <p>이대로 커모지를 제출하시겠습니까?</p>
      <div className="space-x-4 text-right">
        <button className="btn btn-outline" onClick={() => setIsVisible(false)}>
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
      </div>
    </Modal>
  );
}
