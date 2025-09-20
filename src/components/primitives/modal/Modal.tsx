"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  isVisible,
  setIsVisible,
  className,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  className?: string;
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
    <>
      {isVisible
        ? createPortal(
            <AnimatePresence mode="wait">
              <motion.div
                className="bg-white/30 dark:bg-black/30 backdrop-blur-lg fixed inset-0 z-[2] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsVisible(false)}
              >
                <motion.section
                  className={`w-fit p-4 bg-base-100 rounded-2xl shadow-lg ${className}`}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {children}
                </motion.section>
              </motion.div>
            </AnimatePresence>,
            document.getElementById("portal") as Element,
          )
        : null}
    </>
  );
}
