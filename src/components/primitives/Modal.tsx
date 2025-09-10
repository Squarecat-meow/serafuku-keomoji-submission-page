import { AnimatePresence, motion } from "motion/react";
import React, { createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

interface IModal {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}

export const ModalInitialValues: IModal = {
  isVisible: false,
  setIsVisible: () => {},
};

const ModalContext = createContext(ModalInitialValues);

function ModalRoot({
  children,
  isVisible,
  setIsVisible,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  return (
    <ModalContext.Provider value={{ isVisible, setIsVisible }}>
      {createPortal(
        <AnimatePresence mode="wait">{isVisible && children}</AnimatePresence>,
        document.getElementById("portal") as Element,
      )}
    </ModalContext.Provider>
  );
}

function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setIsVisible } = useContext(ModalContext);
  return (
    <motion.div
      className="bg-white/30 dark:bg-black/30 backdrop-blur-lg fixed inset-0 z-[2] grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsVisible(false)}
    >
      <motion.section
        className={`w-full lg:w-2xl p-4 m-4 z-[3] bg-base-100 rounded-2xl shadow-lg ${className}`}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {children}
      </motion.section>
    </motion.div>
  );
}

const Modal = {
  Root: ModalRoot,
  Body: ModalBody,
};

export default Modal;
