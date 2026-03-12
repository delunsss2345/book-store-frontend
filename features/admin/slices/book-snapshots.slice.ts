import type { StateCreator } from "zustand";

type BookSnapshotsSliceState = {
  bookSnapshots: any[];
  isLoadingBookSnapshots: boolean;
};

type BookSnapshotsSliceActions = {
  setBookSnapshots: (snapshots: any[]) => void;
  setIsLoadingBookSnapshots: (isLoading: boolean) => void;
};

export type BookSnapshotsSlice = BookSnapshotsSliceState &
  BookSnapshotsSliceActions;

export const createBookSnapshotsSlice: StateCreator<BookSnapshotsSlice> = (
  set,
) => ({
  bookSnapshots: [],
  isLoadingBookSnapshots: false,
  setBookSnapshots: (bookSnapshots) => set({ bookSnapshots }),
  setIsLoadingBookSnapshots: (isLoadingBookSnapshots) =>
    set({ isLoadingBookSnapshots }),
});
