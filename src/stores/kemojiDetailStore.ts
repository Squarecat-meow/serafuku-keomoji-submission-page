import { Submission } from "@prisma/client/index.js";
import { create } from "zustand";

interface IKeomojiStore {
  selectedKeomoji: Submission | null;
  setSelectedKeomoji: (item: Submission) => void;
}

export const useKeomojiStore = create<IKeomojiStore>()((set) => ({
  selectedKeomoji: null,
  setSelectedKeomoji: (by) => set({ selectedKeomoji: by }),
}));
