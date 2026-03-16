import axios from "axios";
import { CreatePurchaseOrderSchemaType } from "@/validation/supplier/supplier.validation";
import { http } from "@/utils/http";

export const purchaserService = {
  create: (data: CreatePurchaseOrderSchemaType) => {
    console.log(data);
    return http.post("/purchase-orders", data);
  },
};
