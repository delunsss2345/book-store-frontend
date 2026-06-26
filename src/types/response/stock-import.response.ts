import { ProxySuccessResponse } from "./base.response";

type StockImportDetailItem = {
  id: string;
  purchaseOrderItemId: string;
  realQuantity: number;
  lackQuantity: number;
  totalPrice: number | string;
};

type StockImportCreator = {
  firstName: string;
  lastName: string;
};

type StockImportDetailData = {
  id: string;
  purchaseOrderId: string;
  supplierName: string;
  note: string | null;
  totalAmount: number | string;
  creator: StockImportCreator;
  createdAt: string;
  items: StockImportDetailItem[];
};

type StockImportDetailResponse = ProxySuccessResponse<StockImportDetailData>;

export type {
  StockImportCreator,
  StockImportDetailData,
  StockImportDetailItem,
  StockImportDetailResponse,
};
