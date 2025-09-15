import Chip from "@/components/primitives/Chip";
import { Submission } from "@/generated/prisma";
import * as motion from "motion/react-client";

export default function SubmissionCard({ data }: { data: Submission }) {
  return (
    <article className="w-full p-4 flex flex-col gap-4 bg-base-200 rounded-2xl">
      <div className="w-1/3 aspect-square m-auto">
        <motion.img
          whileHover={{ scale: 1.1, rotateZ: 3 }}
          src={data.url}
          alt={`:${data.name}: 커모지`}
          className="w-full aspect-square rounded-2xl object-cover"
        />
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-bold">:{data.name}:</h1>
            <Chip status={data.status} />
          </div>
          <h2 className="text-lg text-gray-500">{data.category}</h2>
        </div>
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
        <p>신청한 학생: {data.submissionerUsername}</p>
      </div>
    </article>
  );
}
