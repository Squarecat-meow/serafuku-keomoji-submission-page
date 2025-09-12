import Chip from "@/components/primitives/Chip";
import { Submission } from "@/generated/prisma";
import Image from "next/image";

export default function RecentSubmissionCard({ data }: { data: Submission }) {
  return (
    <article className="w-full p-4 flex gap-4 bg-base-200 rounded-2xl">
      <div className="relative w-36 object-cover aspect-square">
        <Image
          src={data.url}
          alt={`:${data.name}: 커모지`}
          fill
          className="rounded-2xl"
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
