import { create } from "zustand";

type AdminStore = {
  // Books
  books: any[];
  isLoadingBooks: boolean;
  setBooks: (books: any[]) => void;
  setIsLoadingBooks: (isLoading: boolean) => void;

  // Users
  users: any[];
  isLoadingUsers: boolean;
  setUsers: (users: any[]) => void;
  setIsLoadingUsers: (isLoading: boolean) => void;

  // Orders
  orders: any[];
  isLoadingOrders: boolean;
  setOrders: (orders: any[]) => void;
  setIsLoadingOrders: (isLoading: boolean) => void;

  // Book Snapshots
  bookSnapshots: any[];
  isLoadingBookSnapshots: boolean;
  setBookSnapshots: (snapshots: any[]) => void;
  setIsLoadingBookSnapshots: (isLoading: boolean) => void;
};

export const useAdminStore = create<AdminStore>()((set) => ({
  // Books
  books: [],
  isLoadingBooks: false,
  setBooks: (books) => set({ books }),
  setIsLoadingBooks: (isLoadingBooks) => set({ isLoadingBooks }),

  // Users
  users: [],
  isLoadingUsers: false,
  setUsers: (users) => set({ users }),
  setIsLoadingUsers: (isLoadingUsers) => set({ isLoadingUsers }),

  // Orders
  orders: [],
  isLoadingOrders: false,
  setOrders: (orders) => set({ orders }),
  setIsLoadingOrders: (isLoadingOrders) => set({ isLoadingOrders }),

  // Book Snapshots
  bookSnapshots: [],
  isLoadingBookSnapshots: false,
  setBookSnapshots: (bookSnapshots) => set({ bookSnapshots }),
  setIsLoadingBookSnapshots: (isLoadingBookSnapshots) =>
    set({ isLoadingBookSnapshots }),
}));
