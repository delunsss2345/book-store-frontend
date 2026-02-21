import { z } from "zod";

export  enum PaymentGateway {
  VNPay = "VNPAY",
  COD = "COD",
}

export const PaymentGatewaySchema = z.nativeEnum(PaymentGateway);

export const CreateOrderAddressSchema = z.object({
  country: z.string().min(1, "country is required"),
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
  addressLine1: z.string().min(1, "addressLine1 is required"),
  city: z.string().min(1, "city is required"),
  postalCode: z.string().optional(),
  phone: z.string().min(1, "phone is required"),
});

export const CreateGuestOrdersAndPaymentSchema = z.object({
  guestEmail: z.string().email().optional(),
  newsletter: z.boolean().optional(),
  paymentGateway: PaymentGatewaySchema,
  note: z.string().optional(),
  orderAddress: CreateOrderAddressSchema,
});

export type CreateGuestOrdersAndPaymentInput = z.infer<
  typeof CreateGuestOrdersAndPaymentSchema
>;