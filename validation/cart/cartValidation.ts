import { z } from "zod";

export const AddCartItemSchema = z.object({
  bookVariantId: z.number( "bookVariantId không được để trống"  ),
  quantity: z.number().min(1).optional(),
});

export const UpdateCartItemDeltaSchema = z.object({
  quantity: z.number("Số lượng không được để trống"),
});

export type AddCartItemInput = z.infer<typeof AddCartItemSchema>;
export type UpdateCartItemDeltaInput = z.infer<typeof UpdateCartItemDeltaSchema>;
