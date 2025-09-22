"use client";

import { useState } from "react";
import AdminTable from "./_components/AdminTable";
import { useKeomojiStore } from "@/stores/kemojiDetailStore";
import AdminSubmissionModifyModal from "./_components/AdminSubmissionModifyModal";
import AdminSubmissionRejectConfirmModal from "./_components/AdminSubmissionRejectConfimModal";
import AdminSubmissionAcceptConfirmModal from "./_components/AdminSubmissionAcceptConfimModal";

export default function Page() {
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const selectedItem = useKeomojiStore((state) => state.selectedKeomoji);

  const handleToggleModifyModalVisible = (state: boolean) => {
    setIsModifyModalVisible(state);
  };
  const handleToggleRejectModalVisible = (state: boolean) => {
    setIsRejectModalVisible(state);
  };
  const handleToggleAcceptModalVisible = (state: boolean) => {
    setIsAcceptModalVisible(state);
  };

  return (
    <article>
      <AdminTable
        onModifyModalVisible={handleToggleModifyModalVisible}
        onRejectModalVisible={handleToggleRejectModalVisible}
        onAcceptModalVisible={handleToggleAcceptModalVisible}
      />
      {selectedItem && (
        <>
          <AdminSubmissionModifyModal
            isVisible={isModifyModalVisible}
            onModifyVisible={handleToggleModifyModalVisible}
            data={selectedItem}
          />
          <AdminSubmissionRejectConfirmModal
            isVisible={isRejectModalVisible}
            setIsVisible={handleToggleRejectModalVisible}
            data={selectedItem}
          />
          <AdminSubmissionAcceptConfirmModal
            isVisible={isAcceptModalVisible}
            setIsVisible={handleToggleAcceptModalVisible}
            data={selectedItem}
          />
        </>
      )}
    </article>
  );
}
