"use client";

import { useSearchStore } from "@/stores/searchStore";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function FilterSearch() {
  const [search, setSearch] = useState("");
  const setSearchValue = useSearchStore((state) => state.setSearch);

  const handleDebounce = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearch((prev) => {
        if (prev !== e.target.value) {
          return e.target.value;
        } else {
          return prev;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);
  return (
    <label className="input">
      <SearchIcon size={16} />
      <input type="search" placeholder="이름 검색" onChange={handleDebounce} />
    </label>
  );
}
