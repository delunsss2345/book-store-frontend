"use client";
import { ModalType, useModalStore } from "@/features/modal";

interface AddressEmptyStateProps {
  t: any;
}

export const AddressEmptyState = ({ t }: AddressEmptyStateProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink-3 mb-4">
        <i data-lucide="map-pin-off" className="h-6 w-6"></i>
      </div>
      <p className="text-[15px] font-medium text-ink">
        {t("profile.page.emptyAddressesTitle")}
      </p>
      <p className="mt-1.5 text-[13px] text-ink-3 max-w-sm">
        {t("profile.page.emptyAddressesDescription")}
      </p>
      <button
        type="button"
        onClick={() => onOpen(ModalType.CREATE_ADDRESS)}
        className="btn-soft mt-6 h-9 rounded-lg px-6 text-[13px]"
      >
        {t("profile.page.addAddress")}
      </button>
    </div>
  );
};
