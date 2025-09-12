import { create } from "zustand";

interface IGlobalModalStore {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
  children: string | null;
  setChildren: (children: string) => void;
  modalType: "info" | "warning" | "error" | null;
  setModalType: (type: IGlobalModalStore["modalType"]) => void;
}

export const useGlobalModalStore = create<IGlobalModalStore>()((set) => ({
  isModalVisible: false,
  setIsModalVisible: (state) => set({ isModalVisible: state }),
  children: null,
  setChildren: (children) => set({ children }),
  modalType: null,
  setModalType: (type) => set({ modalType: type }),
}));
