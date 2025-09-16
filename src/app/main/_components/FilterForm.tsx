"use client";

import FilterChip from "./FilterChip";
import { useFilterStore } from "@/stores/filterStore";
import { TStatusPayload } from "@/types/status/statusType";

export default function FilterForm() {
  const setSelectedOptions = useFilterStore((state) => state.setValue);
  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSelectedOptions(e.target.id as TStatusPayload);
  };
  return (
    <form
      className="filter flex items-center min-w-fit space-x-2"
      onChange={handleFormChange}
      onReset={() => setSelectedOptions(null)}
    >
      <span className="min-w-fit">필터: </span>
      <FilterChip status="ACCEPTED" />
      <FilterChip status="REJECT" />
      <FilterChip status="PENDING" />
      <input
        className="btn btn-ghost btn-sm rounded-xl"
        type="reset"
        id="PENDING"
        value="×"
      />
    </form>
  );
}
