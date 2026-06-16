import { catalogApi } from "@/services/catalog.service";
import { useQuery } from "@tanstack/react-query";

export const useHomeQuery = () =>
  useQuery({
    queryKey: ["catalog", "home"],
    queryFn: catalogApi.getHome,
    select: (response) => response.data,
    staleTime: 60_000,
  });
