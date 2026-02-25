import { AdminBook } from "@/types/response/admin.response";
import { create } from "zustand";

export enum ModalType {
  PRODUCT = "PRODUCT",
  PRODUCT_TRANSLATION = "PRODUCT:TRANSLATION",
  PRODUCT_DETAIL = "PRODUCT:DETAIL",
  ADD_NEW_BOOK = "ADD_NEW_BOOK",
}

interface ModalStore {
  bookDetail: AdminBook | null;
  type: ModalType;
  isOpen: boolean;
  setBookDetail: (bookDetail: AdminBook | null) => void;
  getIsOpen: () => boolean;
  getType: () => ModalType;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  bookDetail: null,
  setBookDetail: (bookDetail: AdminBook | null) => set({ bookDetail }),
  type: ModalType.PRODUCT,
  isOpen: false,
  getType: () => get().type,
  getIsOpen: () => get().isOpen,
  onOpen: (type: ModalType) => set({ isOpen: true, type: type }),
  onClose: () => set({ isOpen: false }),
}));
