"use client";

import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function MySubmissionModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-screen h-screen absolute inset-0 bg-black/50"
      onClick={() => router.back()}
    >
      {children}
    </motion.div>,
    document.getElementById("global-modal") as Element,
  );
}
