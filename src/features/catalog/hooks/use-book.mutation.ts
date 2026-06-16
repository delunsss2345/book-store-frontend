import { catalogApi } from "@/services/catalog.service";
import { useQuery } from "@tanstack/react-query";

export const useBookQuery = (slug: string) =>
  useQuery({
    queryKey: ["catalog", "book", slug],
    queryFn: () => catalogApi.getBookBySlug(slug),
    enabled: Boolean(slug),
    select: (response) => response.data,
    staleTime: 60_000,
  });
