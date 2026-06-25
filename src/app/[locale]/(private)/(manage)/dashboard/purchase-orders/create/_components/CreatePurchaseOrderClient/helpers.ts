export const BOOK_FORMAT_OPTIONS = [
  "HARDCOVER",
  "PAPERBACK",
  "EBOOK",
  "AUDIOBOOK",
] as const;

export type BookFormat = (typeof BOOK_FORMAT_OPTIONS)[number];

export type PurchaseOrderVariantOption = {
  id: string | number;
  format?: unknown;
  price?: string | number | null;
};

export type PurchaseOrderBookOption = {
  id: string | number;
  title?: string | null;
  translations?: { title?: string | null }[] | null;
};

export const BOOK_FORMAT_LABELS: Record<BookFormat, string> = {
  HARDCOVER: "HARDCOVER",
  PAPERBACK: "PAPERBACK",
  EBOOK: "EBOOK",
  AUDIOBOOK: "AUDIOBOOK",
};

const isBookFormat = (value: unknown): value is BookFormat =>
  typeof value === "string" &&
  BOOK_FORMAT_OPTIONS.includes(value as BookFormat);

export const normalizeBookFormat = (format: unknown): BookFormat => {
  if (isBookFormat(format)) return format;

  if (
    format &&
    typeof format === "object" &&
    "format" in format &&
    isBookFormat(format.format)
  ) {
    return format.format;
  }

  return "PAPERBACK";
};

export const calculateImportUnitPrice = (
  originalPrice = 0,
  discountPercent = 0,
) => {
  const safeOriginalPrice = Math.max(0, originalPrice);
  const safeDiscountPercent = Math.min(100, Math.max(0, discountPercent));

  return Math.round(
    safeOriginalPrice - safeOriginalPrice * (safeDiscountPercent / 100),
  );
};
