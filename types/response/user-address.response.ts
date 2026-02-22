import { ApiResponse } from "@/types/response/base.response";

export type UserAddressData = {
  id: string;
  userId: string;
  addressType?: string;
  recipientName?: string;
  phoneNumber: string;
  addressDetail: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
};

export type UserAddressListResponse = ApiResponse<UserAddressData[]>;
export type UserAddressItemResponse = ApiResponse<UserAddressData>;
