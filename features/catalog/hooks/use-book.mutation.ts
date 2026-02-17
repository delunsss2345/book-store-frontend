import { selectorSetBookDetail } from "@/features/catalog/selector/catalog.selector";
import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { catalogApi } from "@/services/catalog.service";
import { BookDetail } from "@/types/response/catalog.response";
import { useMutation } from "@tanstack/react-query";

export const useBookMutation = (slug: string) => {
    const setBookDetail = useCatalogStore(selectorSetBookDetail);

    return useMutation<BookDetail, Error, void>({
        mutationFn: async () => {
            const res = await catalogApi.getBookDetail(slug);
            return res.data;
        },
        onSuccess: (bookDetail) => {
            setBookDetail(bookDetail);
        },
    });
};
