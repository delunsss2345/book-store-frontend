import type { UserLoginResponse } from "@/types/response/auth.response";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
    isHydrated: boolean;
    isSendOTP: boolean;
    otpResetPassword: string | null;
    clearSession: () => void;
    setHydrated: (value: boolean) => void;
    setIsSendOTP: (value: boolean) => void;
    setOtpResetPassword: (value: string | null) => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isHydrated: false,
            isSendOTP: false,
            otpResetPassword: null,
            clearSession: () => set({ isSendOTP: false, otpResetPassword: null }),
            setHydrated: (value) => set({ isHydrated: value }),
            setIsSendOTP: (value) => set({ isSendOTP: value }),
            setOtpResetPassword: (value) => set({ otpResetPassword: value }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ isSendOTP: state.isSendOTP }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        },
    ),
);
