import { create } from "zustand";

type HooksStore = {
  timeLeft: number;
  setTimeLeft: (timeLeft: number) => void;
};

export const useHooksStore = create<HooksStore>()((set) => ({
  timeLeft: 0.5 * 60 * 1000,
  setTimeLeft: (timeLeft: number) => set({ timeLeft }),
}));
