"use client";

import { useGlobalLoadingStore } from "@/stores/modalStore";
import { Loader2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function GlobalLoading() {
  const isLoadingVisible = useGlobalLoadingStore(
    (state) => state.isLoadingVisible,
  );

  useEffect(() => {
    if (isLoadingVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoadingVisible]);

  return (
    <>
      {isLoadingVisible &&
        createPortal(
          <AnimatePresence>
            <LoadingBody />
          </AnimatePresence>,
          document.getElementById("global-loading") as Element,
        )}
    </>
  );
}

function LoadingBody() {
  return (
    <motion.div
      className="bg-white/30 dark:bg-black/30 backdrop-blur-lg fixed inset-0 z-[2] grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader2Icon className="animate-spin" />
    </motion.div>
  );
}
