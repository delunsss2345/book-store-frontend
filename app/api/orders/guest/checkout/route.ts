import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { CreateGuestOrdersAndPaymentSchema } from "@/validation/order-address/orderAddressValidation";
import { HttpStatusCode } from "axios";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const parsed = CreateGuestOrdersAndPaymentSchema.safeParse({
    ...payload,
  });
  if (!parsed.success) {
    return ResponseApi.error(parsed.error.message, HttpStatusCode.BadRequest);
  }
  console.log(payload);
  const response = await api.post<any>("orders/guest/checkout", { ...payload });
  console.log(response);
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});
