import { BookDetail, BookVariant } from "@/src/types/response/catalog.response";
import { PaymentGateway } from "@/validation/order-address/orderAddressValidation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BuyNowItem = {
  book: BookDetail;
  variant: BookVariant;
  quantity: number;
};

export type CheckoutItem = {
  bookVariantId: number;
  quantity: number;
};

type OrderStore = {
  orders: any[];
  buyNow: BuyNowItem | null;
  setOrders: (orders: any[]) => void;
  isOrdering: boolean;
  setIsOrdering: (isOrdering: boolean) => void;
  idempotencyKey: string;
  setIdempotencyKey: (idempotencyKey: string) => void;
  paymentGateway: PaymentGateway;
  setPaymentGateway: (paymentGateway: PaymentGateway) => void;
  setBuyNow: (order: BuyNowItem | null) => void;
  // Selected cart items for checkout
  items: CheckoutItem[];
  setItems: (items: CheckoutItem[]) => void;
  clearItems: () => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      buyNow: null,
      setBuyNow: (order: BuyNowItem | null) => set({ buyNow: order }),
      setOrders: (orders: any[]) => set({ orders }),
      isOrdering: false,
      setIsOrdering: (isOrdering: boolean) => set({ isOrdering }),
      idempotencyKey: "",
      setIdempotencyKey: (idempotencyKey: string) => set({ idempotencyKey }),
      paymentGateway: PaymentGateway.COD,
      setPaymentGateway: (paymentGateway: PaymentGateway) =>
        set({ paymentGateway }),
      items: [],
      setItems: (items: CheckoutItem[]) => set({ items }),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: "order-store",
      partialize: (state) => ({
        idempotencyKey: state.idempotencyKey,
        items: state.items,
      }),
    },
  ),
);
