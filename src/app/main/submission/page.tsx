"use client";

import { ImageUp } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import KeomojiForm from "./_components/KeomojiForm";

export default function Page() {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageUrl, setImgUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setImgUrl(url);
    setIsImageUploaded(true);
  };
  const handleBackButtonClick = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImgUrl(null);
    setIsImageUploaded(false);
  };
  return (
    <div className="w-full space-y-4 text-center">
      <h1 className="text-2xl font-bold">커모지 신청</h1>
      <AnimatePresence mode="wait">
        <motion.div
          className="w-fit m-auto"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          key={isImageUploaded ? "form" : "loader"}
        >
          {isImageUploaded && imageUrl ? (
            <>
              <KeomojiForm imgUrl={imageUrl} onCancel={handleBackButtonClick} />
            </>
          ) : (
            <>
              <div className="w-2xs aspect-square p-2 rounded-xl border border-dashed border-gray-400 dark:border-gray-600">
                <button
                  className="w-full h-full rounded-xl bg-transparent transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => fileRef.current?.click()}
                >
                  <ImageUp className="w-8 h-8 m-auto mb-2" />
                  클릭하여 커모지를 선택
                </button>
              </div>
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                ref={fileRef}
                accept="image/jpeg, image/png, image/gif"
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
