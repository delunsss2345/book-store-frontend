import { create } from "zustand";
import type { BookSnapshotsSlice } from "../slices/book-snapshots.slice";
import { createBookSnapshotsSlice } from "../slices/book-snapshots.slice";
import type { BooksSlice } from "../slices/books.slice";
import { createBooksSlice } from "../slices/books.slice";
import type { OrdersSlice } from "../slices/orders.slice";
import { createOrdersSlice } from "../slices/orders.slice";
import type { UsersSlice } from "../slices/users.slice";
import { createUsersSlice } from "../slices/users.slice";
import { createBookVariantSlice } from "../slices/book-variants.slice";

type AdminStore = BooksSlice & UsersSlice & OrdersSlice & BookSnapshotsSlice;

export const useAdminStore = create<AdminStore>()((...args) => ({
  ...createBooksSlice(...args),
  ...createUsersSlice(...args),
  ...createOrdersSlice(...args),
  ...createBookSnapshotsSlice(...args),
  ...createBookVariantSlice(...args),
}));
