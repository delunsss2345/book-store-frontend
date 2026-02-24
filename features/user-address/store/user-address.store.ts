import { UserAddressData } from "@/types/response/user-address.response";
import { create } from "zustand";

type UserAddressStore = {
  address: UserAddressData[] | null;
  setAddress: (address: UserAddressData[]) => void;
  addressDefault: UserAddressData | null;
  setAddressDefault: (address: UserAddressData | null) => void;
};

export const useUserAddressStore = create<UserAddressStore>()((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  addressDefault: null,
  setAddressDefault: (address: UserAddressData | null) =>
    set({ addressDefault: address }),
}));
