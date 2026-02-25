import { Languages, Trash2, Plus } from "lucide-react";
import { ModalType, useModalStore } from "@/features/modal";
export const variantMenuItems = [
  {
    label: "Add Variant",
    icon: Plus,
    onClick: () => useModalStore.getState().onOpen(ModalType.BOOK_ADD_VARIANT),
  },
  {
    label: "Translation",
    icon: Languages,
    onClick: () => useModalStore.getState().onOpen(ModalType.BOOK_TRANSLATION),
  },
  {
    label: "Delete Variant",
    icon: Trash2,
    onClick: () => console.log("Xử lý xóa variant"),
    variant: "destructive" as const, // Màu đỏ cảnh báo
    showSeparator: true, // Ngăn cách nút xóa ra cho an toàn
  },
];
