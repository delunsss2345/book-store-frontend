import { PaymentGateway } from "@/validation/order-address/orderAddressValidation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderStore = {
  orders: any[];
  setOrders: (orders: any[]) => void;
  isOrdering: boolean;
  setIsOrdering: (isOrdering: boolean) => void;
  idempotencyKey: string;
  setIdempotencyKey: (idempotencyKey: string) => void;
  paymentGateway: PaymentGateway;
  setPaymentGateway: (paymentGateway: PaymentGateway) => void;

};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      setOrders: (orders: any[]) => set({ orders }),
      isOrdering: false,
      setIsOrdering: (isOrdering: boolean) => set({ isOrdering }),
      idempotencyKey: "",
      setIdempotencyKey: (idempotencyKey: string) => set({ idempotencyKey }),
      paymentGateway: PaymentGateway.SEPAY,
      setPaymentGateway: (paymentGateway: PaymentGateway) => set({ paymentGateway }),
    }),
    {
      name: "order-store",
      partialize: (state) => ({
        idempotencyKey: state.idempotencyKey,
      }),
    }
  )
);