import { BookDetail, BookVariant, CatalogHomeBookDto } from "@/types/response/catalog.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CatalogStore = {
    home: CatalogHomeBookDto[] | null;
    isLoadingHome: boolean;
    isHydrated: boolean;
    bookDetail: BookDetail | null;
    bookVariantDetail: BookVariant | null;
    booksPage: number;
    booksLimit: number;
    booksTotal: number;
    booksTotalPages: number;

    setVariantDetail: (value: BookVariant) => void;
    setHome: (value: CatalogHomeBookDto[] | null) => void;
    setLoadingHome: (value: boolean) => void;
    setHydrated: (value: boolean) => void;
    setBookDetail: (book: BookDetail | null) => void;
    setBooksPage: (page: number) => void;
    setBooksLimit: (limit: number) => void;
    setBooksMeta: (meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }) => void;
};

export const useCatalogStore = create<CatalogStore>()(
    persist(
        (set) => ({
            home: null,
            isLoadingHome: false,
            isHydrated: false,
            bookDetail: null,
            bookVariantDetail: null,
            booksPage: 1,
            booksLimit: 12,
            booksTotal: 0,
            booksTotalPages: 1,

            setVariantDetail: (value: BookVariant) => set({ bookVariantDetail: value }),
            setHome: (value: CatalogHomeBookDto[] | null) => set({ home: value }),
            setLoadingHome: (value: boolean) => set({ isLoadingHome: value }),
            setHydrated: (value) => set({ isHydrated: value }),
            setBookDetail: (bookDetail) => set({ bookDetail }),
            setBooksPage: (page) => set({ booksPage: page }),
            setBooksLimit: (limit) => set({ booksLimit: limit }),
            setBooksMeta: ({ page, limit, total, totalPages }) =>
                set({
                    booksPage: page,
                    booksLimit: limit,
                    booksTotal: total,
                    booksTotalPages: totalPages,
                }),
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
