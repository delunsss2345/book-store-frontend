import type { UserLoginResponse } from "@/types/response/auth.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
    user: UserLoginResponse | null;
    accessToken: string | null;
    isHydrated: boolean;
    setSession: (payload: { user: UserLoginResponse; accessToken: string }) => void;
    clearSession: () => void;
    setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isHydrated: false,
            setSession: ({ user, accessToken }) => set({ user, accessToken }),
            clearSession: () => set({ user: null, accessToken: null }),
            setHydrated: (value) => set({ isHydrated: value }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        },
    ),
);