import { useCatalogStore } from "@/features/catalog/store/catalog.store";

type CatalogStoreState = ReturnType<typeof useCatalogStore.getState>;

export const selectorHome = (state: CatalogStoreState) => state.home;
export const selectorIsCatalogLoadingHome = (state: CatalogStoreState) => state.isLoadingHome;
export const selectorIsCatalogHydrated = (state: CatalogStoreState) => state.isHydrated;
export const selectorBookDetail = (state: CatalogStoreState) => state.bookDetail;
export const selectorSetHome = (state: CatalogStoreState) => state.setHome;
export const selectorSetCatalogLoadingHome = (state: CatalogStoreState) => state.setLoadingHome;
export const selectorSetCatalogHydrated = (state: CatalogStoreState) => state.setHydrated;
export const selectorSetBookDetail = (state: CatalogStoreState) => state.setBookDetail;
export const selectorBooksPage = (state: CatalogStoreState) => state.booksPage;
export const selectorBooksLimit = (state: CatalogStoreState) => state.booksLimit;
export const selectorBooksTotal = (state: CatalogStoreState) => state.booksTotal;
export const selectorBooksTotalPages = (state: CatalogStoreState) => state.booksTotalPages;
export const selectorSetBooksPage = (state: CatalogStoreState) => state.setBooksPage;
export const selectorSetBooksLimit = (state: CatalogStoreState) => state.setBooksLimit;
export const selectorSetBooksMeta = (state: CatalogStoreState) => state.setBooksMeta;
