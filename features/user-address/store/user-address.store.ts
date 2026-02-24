import { UserAddressData } from "@/types/response/user-address.response";
import { create } from "zustand";

type UserAddressStore = {
  address: UserAddressData[] | null;
  setAddress: (address: UserAddressData[]) => void;
  addAddress: (address: UserAddressData) => void;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, address: UserAddressData) => void;
};

export const useUserAddressStore = create<UserAddressStore>()((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  addAddress: (address) =>
    set((state) => ({
      address: [...(state.address ?? []), address],
    })),
  removeAddress: (id) =>
    set((state) => ({
      address: state.address?.filter((address) => address.id !== id) ?? null,
    })),
  updateAddress: (id, address) =>
    set((state) => ({
      address: state.address?.map((address) =>
        address.id === id ? address : address,
      ) ?? null,
    })),
}));
