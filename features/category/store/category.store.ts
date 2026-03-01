import { create } from "zustand";
import { CategoryItemData } from "@/types/response/category.response";

type CategoryStore = {
  categories: CategoryItemData[] | null;
  setCategories: (value: CategoryItemData[] | null) => void;
};

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: null,
  setCategories: (value) => set({ categories: value }),
}));
