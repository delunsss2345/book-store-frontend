export type CreateCategoryDTO = {
  name: string;
  lang?: string;
  parentId?: string;
  isActive?: boolean;
  sortOrder?: number;
  slug?: string;
  description?: string;
};

export type GetCategoriesQuery = {
  lang?: string;
  page?: number;
  limit?: number;
};
