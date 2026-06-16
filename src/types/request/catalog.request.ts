export type CatalogHomeQuery = {
  lang?: string;
  limit?: number;
};

export type CatalogBookListQuery = {
  page?: number;
  limit?: number;
  slugCategory?: string;
  keyword?: string;
};

export type CatalogCategoriesQuery = {
  lang?: string;
};
