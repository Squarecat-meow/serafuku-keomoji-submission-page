// Huge thanks to this post: https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router
// Edited based on https://stackoverflow.com/questions/77691781/exit-animation-on-nextjs-14-framer-motion

"use client";

import { AnimatePresence, motion } from "motion/react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useRef } from "react";

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function AnimatePresenceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        className="space-y-4"
        key={segment}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.article>
    </AnimatePresence>
  );
}
