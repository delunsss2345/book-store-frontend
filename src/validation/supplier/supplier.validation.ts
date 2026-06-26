import { z } from "zod";

export const purchaseOrderItemSchema = z.object({
  bookVariantId: z.coerce.number(),
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
  unitPrice: z.number().min(0, "Giá không hợp lệ"),
  discountPrice: z.number().min(0).max(100, "Chiết khấu không hợp lệ"),
});

export const purchaseOrderSchema = z.object({
  supplierId: z.number().min(1, "Vui lòng chọn nhà cung cấp"),
  code: z.string().min(1, "Mã đơn nhập không được để trống"),
  note: z.string().optional(),
  taxAmount: z.number().optional(),
});

export const createPurchaseOrderSchema = purchaseOrderSchema.extend({
  items: z
    .array(purchaseOrderItemSchema)
    .min(1, "Danh sách sản phẩm không được để trống"),
});

export type PurchaseOrderSchemaType = z.infer<typeof purchaseOrderSchema>;
export type CreatePurchaseOrderSchemaType = z.infer<
  typeof createPurchaseOrderSchema
>;

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Tên nhà cung cấp không được để trống"),
  code: z.string().min(1, "Mã nhà cung cấp không được để trống"),
  isActive: z.boolean().default(true).optional(),
});

export type CreateSupplierValues = z.infer<typeof createSupplierSchema>;
