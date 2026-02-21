import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderStore = {
  isOrdering: boolean;
  setIsOrdering: (isOrdering: boolean) => void;
  idempotencyKey: string;
  setIdempotencyKey: (idempotencyKey: string) => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      isOrdering: false,
      setIsOrdering: (isOrdering: boolean) => set({ isOrdering }),
      idempotencyKey: "",
      setIdempotencyKey: (idempotencyKey: string) => set({ idempotencyKey }),
    }),
    {
      name: "order-store",
      partialize: (state) => ({
        idempotencyKey: state.idempotencyKey,
      }),
    }
  )
);