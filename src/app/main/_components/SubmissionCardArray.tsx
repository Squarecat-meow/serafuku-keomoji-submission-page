import { Submission } from "@/generated/prisma";
import SubmissionCard from "./SubmissionCard";

export default function SubmissionCardArray({
  data,
}: {
  data: Submission[] | undefined;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {data?.map((el) => (
        <SubmissionCard data={el} key={el.id} />
      ))}
    </section>
  );
}
