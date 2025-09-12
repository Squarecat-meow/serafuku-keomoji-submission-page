"use client";

import { useGlobalModalStore } from "@/stores/modalStore";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useShallow } from "zustand/shallow";

function GlobalModal() {
  const { isModalVisible } = useGlobalModalStore(
    useShallow((state) => ({
      isModalVisible: state.isModalVisible,
      children: state.children,
    })),
  );
  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalVisible]);

  return (
    <>
      {isModalVisible &&
        createPortal(
          <AnimatePresence mode="wait">
            <ModalBody />
          </AnimatePresence>,
          document.getElementById("global-modal") as Element,
        )}
    </>
  );
}

function ModalBody({ className }: { className?: string }) {
  const router = useRouter();
  const modalTypeRef = useRef<string>(null);
  const { setIsModalVisible, children, modalType } = useGlobalModalStore(
    useShallow((state) => ({
      setIsModalVisible: state.setIsModalVisible,
      children: state.children,
      modalType: state.modalType,
    })),
  );

  switch (modalType) {
    case "info":
      modalTypeRef.current = "확인";
    case "warning":
      modalTypeRef.current = "경고";
    case "error":
      modalTypeRef.current = "오류";
  }

  const handleInfoClick = () => {
    setIsModalVisible(false);
    router.push("/main");
  };

  const handleErrorClick = () => {
    setIsModalVisible(false);
  };
  return (
    <motion.div
      className="bg-white/30 dark:bg-black/30 backdrop-blur-lg fixed inset-0 z-[2] grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsModalVisible(false)}
    >
      <motion.section
        className={`w-md p-4 m-4 z-[3] space-y-4 bg-base-100 rounded-2xl shadow-lg ${className}`}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h1 className="text-xl font-bold">{modalTypeRef.current}</h1>
        <p>{children}</p>
        <button
          className="btn btn-accent"
          onClick={modalType === "info" ? handleInfoClick : handleErrorClick}
        >
          확인
        </button>
      </motion.section>
    </motion.div>
  );
}

export default GlobalModal;
