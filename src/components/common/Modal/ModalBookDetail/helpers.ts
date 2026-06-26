export type BookTranslation = {
  languageId: number;
  title?: string | null;
  description?: string | null;
};

export type BookWithTranslations = {
  translation?: BookTranslation | BookTranslation[] | null;
  translations?: BookTranslation[] | null;
};

type BookFormatValue = string | { format?: string | null } | null | undefined;

export const getFormatLabel = (format: BookFormatValue) =>
  typeof format === "string" ? format : format?.format || "Mặc định";
