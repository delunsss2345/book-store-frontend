import { supplierApi } from "@/services/supplier.service";
import { useQuery } from "@tanstack/react-query";

export const useSupplierQuery = () =>
  useQuery({
    queryKey: ["suppliers"],
    queryFn: supplierApi.getSupplier,
    select: (response) => response.data,
  });
