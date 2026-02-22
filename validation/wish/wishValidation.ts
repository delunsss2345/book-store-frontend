import { z } from "zod";

export const AddWishItemSchema = z.object({
  bookVariantId: z.number("bookVariantId không được để trống"),
});

export type AddWishItemInput = z.infer<typeof AddWishItemSchema>;
