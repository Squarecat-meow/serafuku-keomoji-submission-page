import StatusCardArray from "./_components/StatusCardArray";
import SubmissionPagination from "./_components/SubmissionPagination";
import FilterForm from "./_components/FilterForm";
import FilterSearch from "./_components/FilterSearch";

export default async function Page() {
  return (
    <>
      <StatusCardArray />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">신청된 커모지 리스트</h1>
        <div className="min-w-fit flex items-center gap-2">
          <FilterForm />
          <FilterSearch />
        </div>
      </div>
      <SubmissionPagination />
    </>
  );
}
