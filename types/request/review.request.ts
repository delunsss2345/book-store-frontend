export type CreateReviewDTO = {
  bookId: number;
  bookVariantId: number;
  rating: number;
  content?: string;
};

export type CreateReviewDraftDTO = {
  bookId: number;
  bookVariantId: number;
  userHint: string;
  tone?: string;
  language?: 'vi' | 'en';
  targetWords?: number;
};

export type GetBookReviewsQuery = {
  lang?: string;
  page?: number;
  limit?: number;
};
