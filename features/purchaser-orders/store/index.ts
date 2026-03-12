import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PurchaseItem = {
  id: string;
  bookVariantName: string;
  bookVariantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type PurchaseStore = {
  purchaseItems: PurchaseItem[];

  addItem: (item: PurchaseItem) => void;
  updateItem: (item: PurchaseItem) => void;
  deleteItem: (id: string) => void;
  clearItems: () => void;
};

export const usePurchaseStore = create<PurchaseStore>()(
  persist(
    (set) => ({
      purchaseItems: [],

      addItem: (item) =>
        set((state) => ({
          purchaseItems: [...state.purchaseItems, item],
        })),

      updateItem: (item) =>
        set((state) => ({
          purchaseItems: state.purchaseItems.map((i) =>
            i.id === item.id ? item : i,
          ),
        })),

      deleteItem: (id) =>
        set((state) => ({
          purchaseItems: state.purchaseItems.filter((i) => i.id !== id),
        })),

      clearItems: () => set({ purchaseItems: [] }),
    }),
    {
      name: "purchase-item-storage",
    },
  ),
);
