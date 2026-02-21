import { useOrderStore } from "../store/order.store";

type OrderStoreState = ReturnType<typeof useOrderStore.getState>;

export const selectorIsOrdering = (state: OrderStoreState) => state.isOrdering;
export const selectorSetIsOrdering = (state: OrderStoreState) => state.setIsOrdering;
