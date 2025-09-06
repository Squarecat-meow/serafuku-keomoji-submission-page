import { IUser } from "@/types/auth/authType";
import { create } from "zustand";

interface IUserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<IUserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
