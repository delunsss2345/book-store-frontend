import { z } from "zod";


export const ADDRESS_TYPES = ["HOME", "OFFICE", "OTHER"] as const;

export const CreateUserAddressSchema = z.object({
  addressType: z.enum(ADDRESS_TYPES),
  recipientName: z.string().optional(),
  phoneNumber: z.string().min(1, "Số điện thoại không được để trống"),
  addressDetail: z.string().min(1, "Địa chỉ chi tiết không được để trống"),
  ward: z.string().min(1, "Phường/Xã không được để trống"),
  district: z.string().min(1, "Quận/Huyện không được để trống"),
  city: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
});

export const UpdateUserAddressSchema = z.object({
  addressType: z.string().optional(),
  recipientName: z.string().optional(),
  phoneNumber: z.string().optional(),
  addressDetail: z.string().optional(),
  ward: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
});

export type CreateUserAddressInput = z.infer<typeof CreateUserAddressSchema>;
export type UpdateUserAddressInput = z.infer<typeof UpdateUserAddressSchema>;
