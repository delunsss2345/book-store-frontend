import { AdminOrderStatus } from "@/types/response/admin.response";
import type { PurchaseItem } from "@/features/purchaser-orders/store";
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
  CREATE_STOCK_IMPORT = "CREATE_STOCK_IMPORT",
  CREATE_ADDRESS = "CREATE_ADDRESS",
  SHOW_ORDER_ITEMS = "SHOW_ORDER_ITEMS",
  SHOW_VARIANT_EDIT = "SHOW_VARIANT_EDIT",
  SHOW_BOOK_SPECIFICATIONS_EDIT = "BOOK_SPECIFICATIONS",
  ORDER_DETAIL_ADMIN = "ORDER_DETAIL_ADMIN",
  ORDER_APPROVAL_ADMIN = "ORDER_APPROVAL_ADMIN",
  SELECT_ADDRESS = "SELECT_ADDRESS",
  CONFIRM_PURCHASE_ORDER = "CONFIRM_PURCHASE_ORDER",
}

export type ApproveOrderAdmin = {
  orderId: string;
  status: AdminOrderStatus.CANCELLED | AdminOrderStatus.CONFIRMED;
};

export type PurchaseOrderModalVariant = {
  id: string | number;
  format?: unknown;
  price?: string | number | null;
  costPrice?: string | number | null;
  currencyCode?: string | null;
  stock?: number | null;
  isbn?: string | null;
  isActive?: boolean;
};

export type PurchaseOrderModalBook = {
  id: string | number;
  title: string;
};

interface ModalStore {
  bookDetailId: string | null;
  type: ModalType;
  isOpen: boolean;
  purchaseOrderId: string | null;
  goodsReceiptId: string | null;
  orderShowDetailId: string | null;
  actionApproveOrder: ApproveOrderAdmin | null;
  selectedAddressId: number;
  selectAddressCallback: ((addressId: number) => void) | null;
  purchaseOrderVariantSelect:
    | ((
        variant: PurchaseOrderModalVariant,
        book: PurchaseOrderModalBook,
      ) => void)
    | null;
  purchaseOrderConfirmSubmit:
    | ((items: PurchaseItem[]) => Promise<void> | void)
    | null;
  setActionApproveOrder: (actionApproveOrder: ApproveOrderAdmin) => void;
  setOrderShowDetailId: (orderShowDetailId: string | null) => void;
  setBookDetailId: (bookDetailId: string | null) => void;
  setPurchaseOrderId: (purchaseOrderId: string | null) => void;
  setGoodsReceiptId: (goodsReceiptId: string | null) => void;
  setPurchaseOrderVariantSelect: (
    callback:
      | ((
          variant: PurchaseOrderModalVariant,
          book: PurchaseOrderModalBook,
        ) => void)
      | null,
  ) => void;
  setPurchaseOrderConfirmSubmit: (
    callback: ((items: PurchaseItem[]) => Promise<void> | void) | null,
  ) => void;
  getIsOpen: () => boolean;
  getType: () => ModalType;
  onOpen: (type: ModalType) => void;
  onOpenSelectAddress: (
    selectedId: number,
    cb: (addressId: number) => void,
  ) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  bookDetailId: null,
  orderShowDetailId: null,
  setOrderShowDetailId: (orderShowDetailId: string | null) => {
    set({ orderShowDetailId });
  },
  actionApproveOrder: null,
  setActionApproveOrder: (actionApproveOrder: ApproveOrderAdmin) => {
    set({ actionApproveOrder });
  },
  setBookDetailId: (bookDetailId: string | null) => set({ bookDetailId }),
  type: ModalType.BOOK,
  purchaseOrderId: null,
  setPurchaseOrderId: (purchaseOrderId: string | null) =>
    set({ purchaseOrderId }),
  goodsReceiptId: null,
  setGoodsReceiptId: (goodsReceiptId: string | null) => set({ goodsReceiptId }),

  selectedAddressId: 0,
  selectAddressCallback: null,
  purchaseOrderVariantSelect: null,
  purchaseOrderConfirmSubmit: null,
  setPurchaseOrderVariantSelect: (purchaseOrderVariantSelect) =>
    set({ purchaseOrderVariantSelect }),
  setPurchaseOrderConfirmSubmit: (purchaseOrderConfirmSubmit) =>
    set({ purchaseOrderConfirmSubmit }),
  isOpen: false,
  getType: () => get().type,
  getIsOpen: () => get().isOpen,
  onOpen: (type: ModalType) => set({ isOpen: true, type: type }),
  onOpenSelectAddress: (selectedId: number, cb: (addressId: number) => void) =>
    set({
      isOpen: true,
      type: ModalType.SELECT_ADDRESS,
      selectedAddressId: selectedId,
      selectAddressCallback: cb,
    }),
  onClose: () =>
    set({
      isOpen: false,
      purchaseOrderVariantSelect: null,
      purchaseOrderConfirmSubmit: null,
    }),
}));
