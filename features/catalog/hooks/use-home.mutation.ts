import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { catalogApi } from "@/services/catalog.service";
import { HomeResponse } from "@/types/response/catalog.response";
import { useMutation } from "@tanstack/react-query";

export const useHomeMutation = () => {
    const setHome = useCatalogStore(state => state.setHome)
    return useMutation({
        mutationFn: catalogApi.getHome,

        onSuccess: (home: HomeResponse) => {

            setHome(home.data);

        }
    })
}