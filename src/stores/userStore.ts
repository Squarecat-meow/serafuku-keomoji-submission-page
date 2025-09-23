import { IUser } from "@/types/auth/authType";
import { create } from "zustand";

interface IUserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
