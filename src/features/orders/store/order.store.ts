import { BookDetail, BookVariant } from "@/src/types/response/catalog.response";
import { PaymentGateway } from "@/validation/order-address/orderAddressValidation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BuyNowItem = {
  book: BookDetail;
  variant: BookVariant;
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
    }),
    {
      name: "order-store",
      partialize: (state) => ({
        idempotencyKey: state.idempotencyKey,
      }),
    },
  ),
);
