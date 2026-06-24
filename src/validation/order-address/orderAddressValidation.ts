import { z } from "zod";

// ─── Payment gateways ─────────────────────────────────────────────────────────

export enum PaymentGateway {
  COD = "COD",
  VNPAY = "VNPAY",
  MOMO = "MOMO",
  SEPAY = "SEPAY",
}

export const PaymentGatewaySchema = z.nativeEnum(PaymentGateway);

// ─── Guest address ────────────────────────────────────────────────────────────

export const GuestAddressSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc"),
  addressLine: z.string().min(1, "Địa chỉ là bắt buộc"),
  city: z.string().min(1, "Tỉnh / thành phố là bắt buộc"),
  ward: z.string().optional(),
  district: z.string().optional(),
  phoneNumber: z.string().min(1, "Số điện thoại là bắt buộc"),
  note: z.string().optional(),
});

export type GuestAddressInput = z.infer<typeof GuestAddressSchema>;

// ─── Guest checkout ───────────────────────────────────────────────────────────

export const GuestCheckoutSchema = z.object({
  guestEmail: z.string().email("Email không hợp lệ"),
  guestAddress: GuestAddressSchema,
  paymentGateway: PaymentGatewaySchema,
});

export type GuestCheckoutInput = z.infer<typeof GuestCheckoutSchema>;

// ─── User checkout ────────────────────────────────────────────────────────────

export const UserCheckoutSchema = z.object({
  addressId: z.number().min(1, "Vui lòng chọn địa chỉ giao hàng"),
  paymentGateway: PaymentGatewaySchema,
});

export type UserCheckoutInput = z.infer<typeof UserCheckoutSchema>;

// ─── Legacy aliases (keep components compiling while migrating) ───────────────
/** @deprecated Use GuestCheckoutInput */
export type CreateGuestOrdersAndPaymentInput = GuestCheckoutInput;
/** @deprecated Use UserCheckoutInput */
export type CreateUserOrdersAndPaymentInput = UserCheckoutInput;
/** @deprecated Use GuestCheckoutSchema */
export const CreateGuestOrdersAndPaymentSchema = GuestCheckoutSchema;
/** @deprecated Use UserCheckoutSchema */
export const CreateUserOrdersAndPaymentSchema = UserCheckoutSchema;
