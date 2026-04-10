import { useAdminStore } from "../store/admin.store";

type AdminStoreState = ReturnType<typeof useAdminStore.getState>;

// Books
export const selectorAdminBooks = (state: AdminStoreState) => state.books;
export const selectorIsLoadingBooks = (state: AdminStoreState) =>
  state.isLoadingBooks;
export const selectorSetAdminBooks = (state: AdminStoreState) => state.setBooks;


// Users
export const selectorAdminUsers = (state: AdminStoreState) => state.users;
export const selectorIsLoadingUsers = (state: AdminStoreState) =>
  state.isLoadingUsers;
export const selectorSetAdminUsers = (state: AdminStoreState) => state.setUsers;
export const selectorSetIsLoadingUsers = (state: AdminStoreState) =>
  state.setIsLoadingUsers;

// Orders
export const selectorAdminOrders = (state: AdminStoreState) => state.orders;
export const selectorIsLoadingOrders = (state: AdminStoreState) =>
  state.isLoadingOrders;
export const selectorSetAdminOrders = (state: AdminStoreState) =>
  state.setOrders;
export const selectorSetIsLoadingOrders = (state: AdminStoreState) =>
  state.setIsLoadingOrders;

// Book Snapshots
export const selectorAdminBookSnapshots = (state: AdminStoreState) =>
  state.bookSnapshots;
export const selectorIsLoadingBookSnapshots = (state: AdminStoreState) =>
  state.isLoadingBookSnapshots;
export const selectorSetAdminBookSnapshots = (state: AdminStoreState) =>
  state.setBookSnapshots;
export const selectorSetIsLoadingBookSnapshots = (state: AdminStoreState) =>
  state.setIsLoadingBookSnapshots;
