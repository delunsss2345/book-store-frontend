export type CreateUserAddressDTO = {
  addressType?: string;
  recipientName?: string;
  phoneNumber: string;
  addressDetail: string;
  ward: string;
  district: string;
  city: string;
};

export type UpdateUserAddressDTO = {
  addressType?: string;
  recipientName?: string;
  phoneNumber?: string;
  addressDetail?: string;
  ward?: string;
  district?: string;
  city?: string;
};
