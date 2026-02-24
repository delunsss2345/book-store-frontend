import { SelectItem } from "@/components/ui/select";
import { UserAddressData } from "@/types/response/user-address.response";

export default function SelectItemAddress({
  address,
}: {
  address: UserAddressData;
}) {
  return (
    <>
      <SelectItem
        value={address.id}
        className="cursor-pointer border-b p-4 focus:bg-zinc-50 last:border-0"
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-bold">{address.recipientName}</span>
          <span className="text-xs italic text-zinc-500">
            {address.addressDetail}, {address.ward}, {address.district},{" "}
            {address.city}
          </span>
        </div>
      </SelectItem>
    </>
  );
}
