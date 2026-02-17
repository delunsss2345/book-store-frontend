import { BookDetail, HomeData } from "@/types/response/catalog.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CatalogStore = {
    home: HomeData | null;
    isLoadingHome: boolean;
    isHydrated: boolean;
    bookDetail: BookDetail | null;

    setHome: (value: HomeData | null) => void;
    setLoadingHome: (value: boolean) => void;
    setHydrated: (value: boolean) => void;
    setBookDetail: (book: BookDetail | null) => void;
};

export const useCatalogStore = create<CatalogStore>()(
    persist(
        (set) => ({
            home: null,
            isLoadingHome: false,
            isHydrated: false,
            bookDetail: null,

            setBookDetail: (bookDetail) => set({ bookDetail }),
            setHome: (home) => set({ home }),
            setLoadingHome: (value) => set({ isLoadingHome: value }),
            setHydrated: (value) => set({ isHydrated: value }),
        }),
        {
            name: "catalog-storage",
            storage: createJSONStorage(() =>
                sessionStorage
            ),
            partialize: (state) => ({ home: state.home }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
