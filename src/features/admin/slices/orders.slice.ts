import type { StateCreator } from "zustand";
import type { AdminOrder } from "@/types/response/admin.response";

type OrdersSliceState = {
  orders: AdminOrder[];
  isLoadingOrders: boolean;
  selectOrderDetailId: string | null;
};

type OrdersSliceActions = {
  setOrders: (orders: AdminOrder[]) => void;
  setIsLoadingOrders: (isLoading: boolean) => void;
  setSelectOrderDetailId: (id: string | null) => void;
};

export type OrdersSlice = OrdersSliceState & OrdersSliceActions;

export const createOrdersSlice: StateCreator<OrdersSlice> = (set) => ({
  orders: [],
  isLoadingOrders: false,
  selectOrderDetailId: null,
  setOrders: (orders) => set({ orders }),
  setIsLoadingOrders: (isLoadingOrders) => set({ isLoadingOrders }),
  setSelectOrderDetailId: (id) => set({ selectOrderDetailId: id }),
});
