import { useAuthStore } from "@/features/auth/store/auth.store";

type AuthStoreState = ReturnType<typeof useAuthStore.getState>;

export const selectorIsAuthHydrated = (state: AuthStoreState) => state.isHydrated;
export const selectorClearSession = (state: AuthStoreState) => state.clearSession;
export const selectorSetAuthHydrated = (state: AuthStoreState) => state.setHydrated;
