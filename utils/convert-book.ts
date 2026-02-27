import { AdminBookVariant } from "@/types/response/admin.response";
import { QuickBookFillResponse } from "@/types/response/search.response";
import {
  CreateAdminBookAllRequest,
  CreateBookVariantRequest,
} from "@/types/request/admin.request";

/**
 * Hàm tạo slug từ tiếng Việt (hỗ trợ cho field translations[0].slug)
 */
const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export const convertIsbnResultToBookSchema = (
  source: QuickBookFillResponse | null,
  variants: AdminBookVariant[],
  languageCode: string,
) : CreateAdminBookAllRequest | null => {
  if (!source) return null;
  const languageId = languageCode === "en" ? 2 : 1;
  const authors = source.authorName
    ?.split(",")
    .map((author: string, i: number) => {
      return {
        authorName: author,
        isPrimary: i === 0,
      };
    });

  const normalizedVariants: CreateBookVariantRequest[] = variants.map(
    (variant) => ({
      format: variant.format as CreateBookVariantRequest["format"],
      edition: variant.edition,
      isbn: variant.isbn,
      costPrice: Number(variant.costPrice),
      price: Number(variant.price),
      currencyCode: variant.currencyCode,
      stock: variant.stock,
      isActive: variant.isActive,
    }),
  );

  return {
    publisherName: source.publisherName || "",
    publicationYear: source.publicationYear || new Date().getFullYear(),
    pageCount: source.pageCount || 0,
    weightGrams: source.weightGrams || 0,
    coverImageUrl: source.coverImageUrl || "",
    badgeCode: "NEW",
    spec: source.spec ?? undefined,
    translations: [
      {
        languageId,
        languageCode,
        title: source.title || "",
        description: source.description || "",
        slug: source.title ? slugify(source.title) : "",
      },
    ],
    authors,
    variants: normalizedVariants,
  };
};
