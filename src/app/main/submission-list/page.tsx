import { prisma } from "@/lib/prismaClient";
import * as motion from "motion/react-client";

export default async function Page() {
  const data = await prisma.submission.findMany();
  return (
    <article className="space-y-4">
      <h1 className="text-4xl font-bold text-center">신청 커모지 목록</h1>
      <motion.ul
        className="list bg-base-100 rounded-2xl"
        layout
        transition={{ duration: 0.3 }}
      >
        {data.map((el) => (
          <motion.li key={el.id} className="list-row">
            <img src={el.url} alt={`${el.name}의 이미지`} className="size-16" />
            <div>
              <h1 className="text-xl font-bold">:{el.name}:</h1>
              <div className="flex items-center gap-2">
                <h2 className="text-gray-500">{el.category}</h2>
                <div className="text-gray-500 mx-2">|</div>
                {el.aliases.map((el, i) => (
                  <span
                    key={i}
                    className="px-2 text-xs text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-2xl"
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </article>
  );
}
