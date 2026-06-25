import type { AdminBookListData } from "@/types/response/admin.response";
import type { PurchaseItem } from "@/features/purchaser-orders/store";
import { Trash2 } from "lucide-react";
import { ProductPickerTable } from "../ProductPickerTable";
import {
  BOOK_FORMAT_LABELS,
  BOOK_FORMAT_OPTIONS,
  BookFormat,
  calculateImportUnitPrice,
  normalizeBookFormat,
  PurchaseOrderBookOption,
  PurchaseOrderVariantOption,
} from "./helpers";

type PurchaseItemField = "quantity" | "originalPrice" | "discount" | "format";

type PurchaseItemsSectionProps = {
  addedIds: Set<string>;
  bookPending: boolean;
  booksData?: AdminBookListData;
  errors?: string;
  page: number;
  purchaseItems: PurchaseItem[];
  search: string;
  onAddItem: (
    variant: PurchaseOrderVariantOption,
    book: PurchaseOrderBookOption,
  ) => void;
  onItemChange: (
    id: string,
    field: PurchaseItemField,
    value: number | BookFormat,
  ) => void;
  onPageChange: (page: number) => void;
  onRemoveItem: (id: string) => void;
  onSearchChange: (value: string) => void;
};

export function PurchaseItemsSection({
  addedIds,
  bookPending,
  booksData,
  errors,
  page,
  purchaseItems,
  search,
  onAddItem,
  onItemChange,
  onPageChange,
  onRemoveItem,
  onSearchChange,
}: PurchaseItemsSectionProps) {
  return (
    <div className="card ">
      <div className="flex items-center justify-between px-5 py-4">
        <h4 className="display text-[17px] font-semibold text-ink">
          Chọn sản phẩm
        </h4>
        {purchaseItems.length > 0 && (
          <span className="bdg bdg-blue">{purchaseItems.length} đã chọn</span>
        )}
      </div>
      <div className="px-5 pb-4">
        <ProductPickerTable
          booksData={booksData}
          bookPending={bookPending}
          addedIds={addedIds}
          search={search}
          onSearchChange={onSearchChange}
          page={page}
          onPageChange={onPageChange}
          onAddItem={onAddItem}
        />
        {errors && <p className="mt-2 text-xs text-accent">{errors}</p>}
      </div>

      {purchaseItems.length > 0 ? (
        <PurchaseItemsTable
          purchaseItems={purchaseItems}
          onItemChange={onItemChange}
          onRemoveItem={onRemoveItem}
        />
      ) : (
        <div className="p-8 text-center text-ink-3">
          <p className="text-[13px]">Chưa có sản phẩm nào được chọn.</p>
        </div>
      )}
    </div>
  );
}

function PurchaseItemsTable({
  purchaseItems,
  onItemChange,
  onRemoveItem,
}: Pick<
  PurchaseItemsSectionProps,
  "purchaseItems" | "onItemChange" | "onRemoveItem"
>) {
  return (
    <div className="overflow-x-auto">
      <table className="tbl w-full">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Định dạng</th>
            <th>Số lượng</th>
            <th>Đơn giá bìa (₫)</th>
            <th>Chiết khấu (%)</th>
            <th>Đơn giá nhập (₫)</th>
            <th className="text-right">Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {purchaseItems.map((item) => {
            const unitPrice = calculateImportUnitPrice(
              item.originalPrice ?? item.unitPrice ?? 0,
              item.discount ?? 0,
            );

            return (
              <tr key={item.id}>
                <td
                  className="font-semibold text-ink max-w-[200px] truncate"
                  title={item.bookVariantName}
                >
                  {item.bookVariantName}
                </td>
                <td>
                  <select
                    className="field h-8 w-32 px-2"
                    value={normalizeBookFormat(item.format)}
                    onChange={(event) =>
                      onItemChange(
                        item.id,
                        "format",
                        event.target.value as BookFormat,
                      )
                    }
                  >
                    {BOOK_FORMAT_OPTIONS.map((format) => (
                      <option key={format} value={format}>
                        {BOOK_FORMAT_LABELS[format]}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    className="field h-8 w-20 px-2"
                    value={item.quantity}
                    onChange={(event) =>
                      onItemChange(
                        item.id,
                        "quantity",
                        Number(event.target.value) || 0,
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="field h-8 w-28 px-2"
                    value={item.originalPrice ?? item.unitPrice ?? 0}
                    onChange={(event) =>
                      onItemChange(
                        item.id,
                        "originalPrice",
                        Number(event.target.value) || 0,
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="field h-8 w-24 px-2"
                    value={item.discount ?? 0}
                    onChange={(event) =>
                      onItemChange(
                        item.id,
                        "discount",
                        Number(event.target.value) || 0,
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="field h-8 w-28 px-2"
                    value={unitPrice}
                    disabled
                    readOnly
                  />
                </td>
                <td className="text-right font-semibold text-ink">
                  {(item.quantity * unitPrice).toLocaleString()} ₫
                </td>
                <td className="text-right">
                  <button
                    className="icon-btn h-8 w-8 text-accent hover:border-accent hover:text-accent"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
