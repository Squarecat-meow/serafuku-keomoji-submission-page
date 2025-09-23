import { Submission } from "@prisma/client/index.js";
import { create } from "zustand";

interface IAdminSidebarStore {
  type: Submission["status"];
  setType: (type: Submission["status"]) => void;
}

export const useAdminSidebarStore = create<IAdminSidebarStore>()((set) => ({
  type: "PENDING",
  setType: (by) => set({ type: by }),
}));
