import { HomeData } from "@/types/response/catalog.response";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

type CatalogStore = {
    home: HomeData | null,
    isLoadingHome: boolean,
    isHydrated: boolean;
    setHome: (value: HomeData) => void;
    setLoading: (value: boolean) => void;
    setHydrated: (value: boolean) => void;
}


export const useCatalogStore = create<CatalogStore>()(
    persist(
        (set) => ({
            home: null,
            isLoadingHome: false,
            isHydrated: false,
            setHome: (home: HomeData) => set({ home }),
            setLoading: (value: boolean) => set({ isLoadingHome: value }),
            setHydrated: (value: boolean) => set({ isHydrated: value }),
            setIsLoadingHome: (value: boolean) => set({ isLoadingHome: value }),
        }),
        {
            name: "catalog-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ home: state.home }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);