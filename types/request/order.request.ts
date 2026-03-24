export type CreateOrderAddressDTO = {
  country: string;
  recipientName?: string;
  firstName: string;
  lastName: string;
  addressLine: string;
  city: string;
  ward?: string;
  district?: string;
  postalCode?: string;
  phoneNumber: string;
  countryCode?: string;
  note?: string;
};

export type CreateGuestOrdersAndPaymentDTO = {
  cartId: number;
  guestEmail?: string;
  newsletter?: boolean;
  paymentGateway: string;
  note?: string;
  languageCode: string;
  orderAddress: CreateOrderAddressDTO;
};

export type CreateUserOrdersAndPaymentDTO = {
  cartId: number;
  paymentGateway: string;
  note?: string;
  languageCode: string;
  addressId: number;
};
