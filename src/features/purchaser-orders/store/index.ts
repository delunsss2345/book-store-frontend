import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PurchaseItem = {
  id: string;
  bookVariantName: string;
  format: string;
  bookVariantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  originalPrice?: number;
  discount?: number;
};

type PurchaseStore = {
  purchaseItems: PurchaseItem[];

  addItem: (item: PurchaseItem) => void;
  updateItem: (id: string, field: string, value: any) => void;
  updateQuantityItem: (id: string) => void;
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

      updateItem: (id: string, field: string, value: any) =>
        set((state) => ({
          purchaseItems: state.purchaseItems.map((i) =>
            i.id === id ? { ...i, [field]: value } : i,
          ),
        })),
      updateQuantityItem: (id: string) =>
        set((state) => ({
          purchaseItems: state.purchaseItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
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
