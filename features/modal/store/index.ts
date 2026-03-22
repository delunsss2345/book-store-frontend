import { AdminBook } from "@/types/response/admin.response";
import { create } from "zustand";

export enum ModalType {
  BOOK = "BOOK",
  BOOK_TRANSLATION = "BOOK:TRANSLATION",
  BOOK_DETAIL = "BOOK:DETAIL",
  ADD_NEW_BOOK = "ADD_NEW_BOOK",
  BOOK_ADD_VARIANT = "BOOK:ADD_VARIANT",
  BOOK_VARIANT_TRANSLATION = "BOOK:VARIANT_TRANSLATION",
  ADD_SUPPLIER = "ADD_SUPPLIER",
  DETAIL_PURCHASE_ORDER = "DETAIL_PURCHASE_ORDER",
}

interface ModalStore {
  bookDetail: AdminBook | null;
  type: ModalType;
  isOpen: boolean;
  purchaseOrderId: string | null;
  setBookDetail: (bookDetail: AdminBook | null) => void;
  setPurchaseOrderId: (purchaseOrderId: string | null) => void;
  getIsOpen: () => boolean;
  getType: () => ModalType;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  bookDetail: null,
  setBookDetail: (bookDetail: AdminBook | null) => set({ bookDetail }),
  type: ModalType.BOOK,
  purchaseOrderId: null,
  setPurchaseOrderId: (purchaseOrderId: string | null) =>
    set({ purchaseOrderId }),

  isOpen: false,
  getType: () => get().type,
  getIsOpen: () => get().isOpen,
  onOpen: (type: ModalType) => set({ isOpen: true, type: type }),
  onClose: () => set({ isOpen: false }),
}));
