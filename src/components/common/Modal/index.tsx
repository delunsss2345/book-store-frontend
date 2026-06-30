"use client";

import { ModalType, useModalStore } from "@/features/modal";
import { ModalPortal } from "../ModalPortal";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { lazy, Suspense } from "react";

const ModalBookDetail = lazy(() => import("./ModalBookDetail"));
const ModalAddVariant = lazy(() => import("./ModalAddVariant"));
const ModalAddTranslateBook = lazy(() => import("./ModalAddTranslateBook"));
const ModalAddSupplier = lazy(() => import("./ModalAddSupplier"));
const ModalPurchaseOrderDetail = lazy(
  () => import("./ModelPurchaseOrderDetail"),
);
const ModalGoodsReceiptDetail = lazy(() => import("./ModalGoodsReceiptDetail"));
const ModalStockImportDetail = lazy(() => import("./ModalStockImportDetail"));
const ModalCreateStockImport = lazy(() => import("./ModalCreateStockImport"));
const ModalCreateAddress = lazy(() => import("./ModalCreateAddress"));
const ModalOrderItemsDetail = lazy(() => import("./ModalShowOrderItem"));
const ModalBookVariantPricing = lazy(() => import("./ModalShowVariant"));
const ModalBookVariantPurchases = lazy(
  () => import("./ModalBookVariantPurchases"),
);
const ModelShowSpecEdit = lazy(() => import("./ModalShowSpecEdit"));
const ModelShowOrderDetailAdmin = lazy(
  () => import("./ModelShowOrderDetailAdmin"),
);
const ModalApproveOrderAdmin = lazy(() => import("./ModalApprovalOrderAdmin"));
const ModalSelectAddress = lazy(() => import("./ModalSelectAddress"));
const ModalPurchaseOrderConfirm = lazy(
  () => import("./ModalPurchaseOrderConfirm"),
);
const ModalOrderPaymentHistory = lazy(
  () => import("./ModalOrderPaymentHistory"),
);

export function ModalHost() {
  const isOpen = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const onClose = useModalStore((state) => state.onClose);

  return (
    <ModalPortal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className={`relative w-full max-h-[90vh] overflow-y-auto bg-surface rounded-2xl shadow-2xl border border-line custom-scrollbar ${
                type === ModalType.CONFIRM_PURCHASE_ORDER ||
                type === ModalType.CREATE_STOCK_IMPORT ||
                type === ModalType.DETAIL_STOCK_IMPORT ||
                type === ModalType.BOOK_VARIANT_PURCHASES
                  ? "max-w-5xl"
                  : type === ModalType.CREATE_ADDRESS ||
                      type === ModalType.SELECT_ADDRESS
                    ? "max-w-lg"
                    : "max-w-3xl"
              }`}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md text-ink-3 transition hover:bg-paper"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8">
                <Suspense fallback={null}>
                  {type === ModalType.BOOK_DETAIL && (
                    <ModalBookDetail onClose={onClose} />
                  )}
                  {type === ModalType.BOOK_ADD_VARIANT && (
                    <ModalAddVariant onClose={onClose} />
                  )}
                  {type === ModalType.BOOK_TRANSLATION && (
                    <ModalAddTranslateBook onClose={onClose} />
                  )}
                  {type === ModalType.ADD_SUPPLIER && (
                    <ModalAddSupplier onClose={onClose} />
                  )}
                  {type === ModalType.DETAIL_PURCHASE_ORDER && (
                    <ModalPurchaseOrderDetail onClose={onClose} />
                  )}
                  {type === ModalType.DETAIL_GOODS_RECEIPT && (
                    <ModalGoodsReceiptDetail />
                  )}
                  {type === ModalType.DETAIL_STOCK_IMPORT && (
                    <ModalStockImportDetail onClose={onClose} />
                  )}
                  {type === ModalType.CREATE_STOCK_IMPORT && (
                    <ModalCreateStockImport onClose={onClose} />
                  )}
                  {type === ModalType.CREATE_ADDRESS && (
                    <ModalCreateAddress onClose={onClose} />
                  )}
                  {type === ModalType.SHOW_ORDER_ITEMS && (
                    <ModalOrderItemsDetail />
                  )}
                  {type === ModalType.SHOW_VARIANT_EDIT && (
                    <ModalBookVariantPricing />
                  )}
                  {type === ModalType.BOOK_VARIANT_PURCHASES && (
                    <ModalBookVariantPurchases onClose={onClose} />
                  )}
                  {type === ModalType.SHOW_BOOK_SPECIFICATIONS_EDIT && (
                    <ModelShowSpecEdit />
                  )}
                  {type === ModalType.ORDER_DETAIL_ADMIN && (
                    <ModelShowOrderDetailAdmin />
                  )}
                  {type === ModalType.ORDER_APPROVAL_ADMIN && (
                    <ModalApproveOrderAdmin />
                  )}
                  {type === ModalType.SELECT_ADDRESS && (
                    <ModalSelectAddress
                      onClose={onClose}
                      selectedAddressId={
                        useModalStore.getState().selectedAddressId
                      }
                      onSelect={(addressId) => {
                        const cb =
                          useModalStore.getState().selectAddressCallback;
                        if (cb) cb(addressId);
                      }}
                    />
                  )}
                  {type === ModalType.CONFIRM_PURCHASE_ORDER && (
                    <ModalPurchaseOrderConfirm onClose={onClose} />
                  )}
                  {type === ModalType.ORDER_PAYMENT_HISTORY && (
                    <ModalOrderPaymentHistory />
                  )}
                </Suspense>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}
