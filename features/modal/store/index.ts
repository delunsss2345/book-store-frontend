import { AdminBookDetail } from "@/types/request/admin.request";
import { AdminOrderStatus, AdminBook } from "@/types/response/admin.response";
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
  DETAIL_GOODS_RECEIPT = "DETAIL_GOODS_RECEIPT",
  CREATE_ADDRESS = "CREATE_ADDRESS",
  SHOW_ORDER_ITEMS = "SHOW_ORDER_ITEMS",
  SHOW_VARIANT_EDIT = "SHOW_VARIANT_EDIT",
  SHOW_BOOK_SPECIFICATIONS_EDIT = "BOOK_SPECIFICATIONS",
  ORDER_DETAIL_ADMIN = "ORDER_DETAIL_ADMIN",
  ORDER_APPROVAL_ADMIN = "ORDER_APPROVAL_ADMIN",
}

export type ApproveOrderAdmin = {
  orderId: string;
  status: AdminOrderStatus.CANCELLED | AdminOrderStatus.CONFIRMED;
};

interface ModalStore {
  bookDetail: AdminBook | null;
  type: ModalType;
  isOpen: boolean;
  purchaseOrderId: string | null;
  goodsReceiptId: string | null;
  orderShowDetailId: string | null;
  actionApproveOrder: ApproveOrderAdmin | null;
  setActionApproveOrder: (actionApproveOrder: ApproveOrderAdmin) => void;
  setOrderShowDetailId: (orderShowDetailId: string | null) => void;
  setBookDetail: (bookDetail: AdminBook | null) => void;
  setPurchaseOrderId: (purchaseOrderId: string | null) => void;
  setGoodsReceiptId: (goodsReceiptId: string | null) => void;
  getIsOpen: () => boolean;
  getType: () => ModalType;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  bookDetail: null,
  orderShowDetailId: null,
  setOrderShowDetailId: (orderShowDetailId: string | null) => {
    set({ orderShowDetailId });
  },
  actionApproveOrder: null,
  setActionApproveOrder: (actionApproveOrder: ApproveOrderAdmin) => {
    set({ actionApproveOrder });
  },
  setBookDetail: (bookDetail: AdminBook | null) => set({ bookDetail }),
  type: ModalType.BOOK,
  purchaseOrderId: null,
  setPurchaseOrderId: (purchaseOrderId: string | null) =>
    set({ purchaseOrderId }),
  goodsReceiptId: null,
  setGoodsReceiptId: (goodsReceiptId: string | null) => set({ goodsReceiptId }),

  isOpen: false,
  getType: () => get().type,
  getIsOpen: () => get().isOpen,
  onOpen: (type: ModalType) => set({ isOpen: true, type: type }),
  onClose: () => set({ isOpen: false }),
}));
