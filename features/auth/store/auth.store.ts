import type { UserLoginResponse } from "@/types/response/auth.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
    user: UserLoginResponse | null;
    accessToken: string | null;
    isHydrated: boolean;
    isSendOTP: boolean;
    otpResetPassword: string | null;
    setSession: (payload: { user: UserLoginResponse; accessToken: string }) => void;
    setAccessToken: (accessToken: string | null) => void;
    clearSession: () => void;
    setHydrated: (value: boolean) => void;
    setIsSendOTP: (value: boolean) => void;
    setOtpResetPassword: (value: string | null) => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isHydrated: false,
            isSendOTP: false,
            otpResetPassword: null,
            setSession: ({ user, accessToken }) => set({ user, accessToken }),
            setAccessToken: (accessToken) => set({ accessToken }),
            clearSession: () => set({ user: null, accessToken: null }),
            setHydrated: (value) => set({ isHydrated: value }),
            setIsSendOTP: (value) => set({ isSendOTP: value }),
            setOtpResetPassword: (value) => set({ otpResetPassword: value }),
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
