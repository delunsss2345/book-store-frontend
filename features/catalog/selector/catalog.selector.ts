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
