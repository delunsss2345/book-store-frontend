import { create } from "zustand";

type HooksStore = {
  timeLeft: number | null;
  setTimeLeft: (timeLeft: number | null) => void;
};

export const useHooksStore = create<HooksStore>()((set) => ({
  timeLeft: null,
  setTimeLeft: (timeLeft) => set({ timeLeft }),
}));
