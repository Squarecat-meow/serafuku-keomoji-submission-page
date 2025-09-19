"use client";

import { Modal } from "@/components/primitives/Modal";
import { Submission } from "@/generated/prisma";

export default function MySubmissionModal({
  isVisible,
  setIsVisible,
  data,
  animatedKey,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  data: Submission | null;
  animatedKey: string | undefined;
}) {
  return (
    <Modal
      animatedKey={animatedKey ?? "modal"}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <div>{data?.name}</div>
    </Modal>
  );
}
