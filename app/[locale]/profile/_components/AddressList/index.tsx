import {
  UserAddressData,
  UserAddressItemResponse,
} from "@/types/response/user-address.response";
import { AddressCard } from "../AddressCard";
import { AddressEmptyState } from "../AddressEmptyState";

interface AddressListProps {
  addresses: UserAddressData[];
  t: any;
  formatAddress: (address: any) => string;
  onSetDefault: (id: string) => void;
}

export const AddressList = ({
  addresses,
  t,
  formatAddress,
  onSetDefault,
}: AddressListProps) => {
  if (addresses?.length === 0 || !addresses) {
    return <AddressEmptyState t={t} />;
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          t={t}
          formatAddress={formatAddress}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
};
