import * as z from "zod";

export const getAdminBookVariantSchema = (t: (key: string) => string) =>
  z.object({
    format: z
      .enum(["PAPERBACK", "HARDCOVER", "EBOOK", "AUDIOBOOK"])
      .or(z.string()),
    edition: z.number(),
    isbn: z
      .string()
      .min(1, t("dashboard.products.create.variant.validation.isbnRequired")),
    price: z
      .string()
      .min(1, t("dashboard.products.create.variant.validation.priceRequired")),
    costPrice: z.string().min(1, "Vui lòng nhập giá nhập"),
    currencyCode: z
      .string()
      .min(
        1,
        t("dashboard.products.create.variant.validation.currencyCodeRequired"),
      ),
    stock: z.number().min(0, "Số lượng không hợp lệ"),
    isActive: z.boolean(),
  });

export type AdminBookVariantForm = z.infer<
  ReturnType<typeof getAdminBookVariantSchema>
>;
