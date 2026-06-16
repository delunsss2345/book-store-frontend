import type { StateCreator } from "zustand";

type UsersSliceState = {
  users: any[];
  isLoadingUsers: boolean;
};

type UsersSliceActions = {
  setUsers: (users: any[]) => void;
  setIsLoadingUsers: (isLoading: boolean) => void;
};

export type UsersSlice = UsersSliceState & UsersSliceActions;

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
  users: [],
  isLoadingUsers: false,
  setUsers: (users) => set({ users }),
  setIsLoadingUsers: (isLoadingUsers) => set({ isLoadingUsers }),
});
