export type PurchaseOrderDisplayStatus =
  | "PENDING"
  | "APPROVED"
  | "RECEIVED"
  | "REJECTED";

export const STATUS_CONFIG: Record<
  PurchaseOrderDisplayStatus,
  { label: string; className: string; dotClassName: string }
> = {
  PENDING: {
    label: "Chờ duyệt",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    dotClassName: "bg-amber-500",
  },
  APPROVED: {
    label: "Đã duyệt",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
    dotClassName: "bg-blue-500",
  },
  RECEIVED: {
    label: "Đã nhận",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
    dotClassName: "bg-emerald-500",
  },
  REJECTED: {
    label: "Đã từ chối",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
    dotClassName: "bg-red-500",
  },
};
