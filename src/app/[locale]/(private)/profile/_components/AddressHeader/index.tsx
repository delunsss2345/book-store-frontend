"use client";
import { Plus } from "lucide-react";
import { ModalType, useModalStore } from "@/features/modal";

interface AddressHeaderProps {
  t: any;
}

export const AddressHeader = ({ t }: AddressHeaderProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-line p-6">
      <div>
        <h3 className="text-[15px] font-semibold text-ink">
          {t("profile.page.addressesTitle")}
        </h3>
        <p className="mt-1 text-[13px] text-ink-3">
          {t("profile.page.addressesDescription")}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onOpen(ModalType.CREATE_ADDRESS)}
        className="btn-ink h-9 gap-2 rounded-lg px-4 text-[13px] flex items-center justify-center shrink-0"
      >
        <Plus className="mr-1 h-4 w-4" />
        {t("profile.page.addAddress")}
      </button>
    </div>
  );
};
