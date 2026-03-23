import { ProxySuccessResponse, PaginationResponse } from "./base.response";

type GoodsReceiptSupplier = {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

type GoodsReceiptCreator = {
  id: string;
  name: string;
};

type GoodsReceiptItem = {
  id: string;
  supplierId: string;
  createdBy: string;
  note: string | null;
  totalAmount: string;
  taxAmount: string;
  createdAt: string;
  supplier: GoodsReceiptSupplier;
  creator: GoodsReceiptCreator;
};

type GoodsReceiptDetailItem = {
  id: string;
  stockImportId: string;
  bookVariantId: string;
  quantity: number;
  importPrice: number;
  title: string;
  format: string;
};

type GoodsReceiptListData = PaginationResponse<GoodsReceiptItem>;
type GoodsReceiptDetailData = PaginationResponse<GoodsReceiptDetailItem>;

type GoodsReceiptListResponse = ProxySuccessResponse<GoodsReceiptListData>;
type GoodsReceiptDetailResponse =
  ProxySuccessResponse<GoodsReceiptDetailData>;

export type {
  GoodsReceiptSupplier,
  GoodsReceiptCreator,
  GoodsReceiptItem,
  GoodsReceiptDetailItem,
  GoodsReceiptListData,
  GoodsReceiptDetailData,
  GoodsReceiptListResponse,
  GoodsReceiptDetailResponse,
};
