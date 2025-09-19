import StatusCardArray from "./_components/StatusCardArray";
import SubmissionPagination from "./_components/SubmissionPagination";
import { SearchIcon } from "lucide-react";
import FilterForm from "./_components/FilterForm";

export default async function Page() {
  return (
    <>
      <StatusCardArray />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">신청된 커모지 리스트</h1>
        <div className="min-w-fit flex items-center gap-2">
          <FilterForm />
          <label className="input">
            <SearchIcon size={16} />
            <input type="search" placeholder="검색" />
          </label>
        </div>
      </div>
      <SubmissionPagination />
    </>
  );
}
