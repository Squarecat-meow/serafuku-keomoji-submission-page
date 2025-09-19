"use client";

import { useSearchStore } from "@/stores/filterStore";
import { SearchIcon } from "lucide-react";

export default function FilterSearch() {
  const setSearchValue = useSearchStore((state) => state.setSearchValue);
  return (
    <label className="input">
      <SearchIcon size={16} />
      <input
        type="search"
        placeholder="태그 검색"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </label>
  );
}
