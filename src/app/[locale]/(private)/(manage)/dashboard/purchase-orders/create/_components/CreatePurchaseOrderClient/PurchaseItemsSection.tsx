import type { AdminBookListData } from "@/types/response/admin.response";
import type { PurchaseItem } from "@/features/purchaser-orders/store";
import { Trash2 } from "lucide-react";
import { ProductPickerTable } from "../ProductPickerTable";

type PurchaseItemsSectionProps = {
  addedIds: Set<string>;
  bookPending: boolean;
  booksData?: AdminBookListData;
  errors?: string;
  page: number;
  purchaseItems: PurchaseItem[];
  search: string;
  onOpenBook: (bookId: string) => void;
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
  onOpenBook,
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
          onOpenBook={onOpenBook}
        />
        {errors && <p className="mt-2 text-xs text-accent">{errors}</p>}
      </div>

      {purchaseItems.length > 0 ? (
        <PurchaseItemsTable
          purchaseItems={purchaseItems}
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
  onRemoveItem,
}: Pick<PurchaseItemsSectionProps, "purchaseItems" | "onRemoveItem">) {
  return (
    <div className="overflow-x-auto">
      <table className="tbl w-full">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Định dạng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {purchaseItems.map((item) => (
            <tr key={item.id}>
              <td
                className="font-semibold text-ink max-w-[240px] truncate"
                title={item.bookVariantName}
              >
                {item.bookVariantName}
              </td>
              <td>{item.format}</td>
              <td className="text-right">
                <button
                  className="icon-btn h-8 w-8 text-accent hover:border-accent hover:text-accent"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
