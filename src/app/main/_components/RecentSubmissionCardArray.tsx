import { Submission } from "@/generated/prisma";
import RecentSubmissionCard from "./RecentSubmissionCard";

export default function RecentSubmissionCardArray({
  data,
}: {
  data: Submission[];
}) {
  return (
    <section className="grid grid-cols-2 gap-4">
      {data.map((el) => (
        <RecentSubmissionCard data={el} key={el.id} />
      ))}
    </section>
  );
}
