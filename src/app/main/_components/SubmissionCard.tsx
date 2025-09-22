import Chip from "@/components/primitives/Chip";
import { Submission } from "@/generated/prisma";
import * as motion from "motion/react-client";

export default function SubmissionCard({
  data,
  setData,
  setIsVisible,
}: {
  data: Submission;
  setData: (id: Submission) => void;
  setIsVisible: (state: boolean) => void;
}) {
  const variant = {
    rest: {
      scale: 1,
      rotateZ: 0,
    },
    hover: {
      scale: 1.1,
      rotateZ: 3,
    },
  };
  return (
    <motion.article
      className="w-full p-4 flex flex-col gap-4 bg-base-200 rounded-2xl cursor-pointer"
      initial="rest"
      whileHover="hover"
      onClick={() => {
        setData(data);
        setIsVisible(true);
      }}
    >
      <motion.img
        variants={variant}
        src={data.url}
        alt={`:${data.name}: 커모지`}
        className="w-1/3 m-auto aspect-square rounded-2xl object-contain"
      />
      <div className="space-y-2">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-bold">:{data.name}:</h1>
          <Chip status={data.status} />
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-lg text-gray-500">{data.category}</h2>
          <div className="space-x-2">
            {data.aliases.map((el, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-2xl"
              >
                {el}
              </span>
            ))}
          </div>
        </div>
        <p>신청한 학생: {data.submissionerUsername}</p>
      </div>
    </motion.article>
  );
}
