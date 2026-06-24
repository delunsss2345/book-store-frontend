// ─── Shared ────────────────────────────────────────────────────────────────

export type CheckoutItem = {
  bookVariantId: number;
  quantity: number;
};

// ─── Guest address ──────────────────────────────────────────────────────────

export type GuestAddressDTO = {
  name: string;
  addressLine: string;
  city: string;
  ward?: string;
  district?: string;
  phoneNumber: string;
  note?: string;
};

// ─── Unified checkout request ────────────────────────────────────────────────

export type CheckoutDTO =
  | {
      isGuest: true;
      guestEmail: string;
      guestAddress: GuestAddressDTO;
      paymentGateway: string;
      items: CheckoutItem[];
    }
  | {
      isGuest: false;
      addressId: number;
      paymentGateway: string;
      items: CheckoutItem[];
    };
