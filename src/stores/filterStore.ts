import { TStatusPayload } from "@/types/status/statusType";
import { create } from "zustand";

interface IFilterStore {
  value: TStatusPayload;
  setValue: (value: TStatusPayload) => void;
}

export const useFilterStore = create<IFilterStore>()((set) => ({
  value: null,
  setValue: (by: TStatusPayload) => set({ value: by }),
}));
