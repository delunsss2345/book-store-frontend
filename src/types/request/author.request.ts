export type CreateAuthorDTO = {
  defaultName: string;
};

export type GetAuthorsQuery = {
  lang?: string;
  page?: number;
  limit?: number;
};

export type GetAuthorBooksQuery = {
  lang?: string;
  page?: number;
  limit?: number;
};
