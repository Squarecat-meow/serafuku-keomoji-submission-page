import { create } from "zustand";

interface ISearchStore {
  search: string | null;
  setSearch: (search: string | null) => void;
}

export const useSearchStore = create<ISearchStore>()((set) => ({
  search: null,
  setSearch: (by) => set({ search: by }),
}));
