import type { StateCreator } from "zustand";

type OrdersSliceState = {
  orders: any[];
  isLoadingOrders: boolean;
};

type OrdersSliceActions = {
  setOrders: (orders: any[]) => void;
  setIsLoadingOrders: (isLoading: boolean) => void;
};

export type OrdersSlice = OrdersSliceState & OrdersSliceActions;

export const createOrdersSlice: StateCreator<OrdersSlice> = (set) => ({
  orders: [],
  isLoadingOrders: false,
  setOrders: (orders) => set({ orders }),
  setIsLoadingOrders: (isLoadingOrders) => set({ isLoadingOrders }),
});
