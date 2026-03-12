import { z } from "zod";

export const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, "Vui lòng chọn nhà cung cấp"),
  orderCode: z.string().min(1, "Mã đơn hàng không được để trống"),
  orderDate: z.string().min(1, "Ngày đặt hàng không được để trống"),
  notes: z.string().optional(),
});

export type PurchaseOrderSchemaType = z.infer<typeof purchaseOrderSchema>;
