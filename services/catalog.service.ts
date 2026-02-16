import { GetBookDetailResponse, HomeResponse } from "@/types/response/catalog.response";
import { http } from "@/utils/http";


export const catalogApi = {
    getHome: async () => {
        const response = await http.get<HomeResponse>(`catalog/home`);
        return response;
    },
    getBookDetail: async (slug: string) => {
        const response = await http.get<GetBookDetailResponse>(`catalog/books/slug/${slug}?lang=vi`);
        return response;
    }
};
