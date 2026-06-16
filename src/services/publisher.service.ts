import type {
  CreatePublisherDTO,
  GetPublishersQuery,
  GetPublisherBooksQuery,
} from "@/types/request/publisher.request";
import type {
  PublisherItemResponse,
  PublisherListResponse,
  PublisherBookListResponse,
} from "@/types/response/publisher.response";
import { http } from "@/utils/http";

export const publisherApi = {
  getPublishers: (query?: GetPublishersQuery) =>
    http.get<PublisherListResponse>("/publishers", { params: query }),

  createPublisher: (payload: CreatePublisherDTO) =>
    http.post<PublisherItemResponse>("/publishers", payload),

  getPublisherBooks: (publisherId: string, query?: GetPublisherBooksQuery) =>
    http.get<PublisherBookListResponse>(`/publishers/${publisherId}/books`, { params: query }),
};
