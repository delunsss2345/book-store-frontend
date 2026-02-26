import { AdminBookVariant } from "@/types/response/admin.response";
import { QuickBookFillResponse } from "@/types/response/search.response";

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
  variants: AdminBookVariant[] | null,
  languageCode: string,
) => {
  if (!source) return null;
  const authors = source.authorName
    ?.split(",")
    .map((author: any, i: number) => {
      return {
        authorName: author,
        isPrimary: i === 0,
      };
    });
  return {
    publisherName: source.publisherName || "",
    publicationYear: source.publicationYear || new Date().getFullYear(),
    pageCount: source.pageCount || 0,
    weightGrams: source.weightGrams || 0,
    coverImageUrl: source.coverImageUrl || "",
    badgeCode: "NEW",
    spec: source.spec || null,
    translations: [
      {
        languageCode,
        title: source.title || "",
        description: source.description || "",
        slug: source.title ? slugify(source.title) : "",
      },
    ],
    authors,
    variants,
  };
};
