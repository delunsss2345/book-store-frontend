export type CreatePublisherDTO = {
  defaultName: string;
};

export type GetPublishersQuery = {
  page?: number;
  limit?: number;
};

export type GetPublisherBooksQuery = {
  lang?: string;
  page?: number;
  limit?: number;
};
