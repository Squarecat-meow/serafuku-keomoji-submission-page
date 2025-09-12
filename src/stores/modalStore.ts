import { create } from "zustand";

interface IGlobalModalStore {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
  children: string | null;
  setChildren: (children: string) => void;
  modalType: "info" | "warning" | "error" | null;
  setModalType: (type: IGlobalModalStore["modalType"]) => void;
}

interface IGlobalLoadingStore {
  isLoadingVisible: boolean;
  setIsLoadingVisible: (state: boolean) => void;
}

export const useGlobalModalStore = create<IGlobalModalStore>()((set) => ({
  isModalVisible: false,
  setIsModalVisible: (state) => set({ isModalVisible: state }),
  children: null,
  setChildren: (children) => set({ children }),
  modalType: null,
  setModalType: (type) => set({ modalType: type }),
}));

export const useGlobalLoadingStore = create<IGlobalLoadingStore>()((set) => ({
  isLoadingVisible: false,
  setIsLoadingVisible: (state) => set({ isLoadingVisible: state }),
}));
