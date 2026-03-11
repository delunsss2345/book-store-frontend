import { supplierApi } from "@/services/supplier.service";
import { useQuery } from "@tanstack/react-query";

export const useSupplierQuery = () =>
  useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => await supplierApi.getSupplier,
  });
