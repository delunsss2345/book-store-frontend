import { api } from "@/lib/api/fetchHandler";
import { appendSetCookies, ResponseApi } from "@/lib/api/responseHandler";
import { CreateGuestOrdersAndPaymentSchema } from "@/validation/order-address/orderAddressValidation";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { wrapperHandler } from "@/lib/api/wrapperHandler";

export const POST = wrapperHandler(async (request: Request) => {
  const payload = await request.json();
  const cookiesStore = await cookies();
  const parsed = CreateGuestOrdersAndPaymentSchema.safeParse({
    ...payload,
  });
  if (!parsed.success) {
    return ResponseApi.error(parsed.error.message, HttpStatusCode.BadRequest);
  }
  const guestSessionId = cookiesStore.get("guestSessionId")?.value;
  const response = await api.post<any>(
    "orders/guest/checkout",
    { ...payload },
    {
      headers: {
        Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
      },
    },
  );
  const res = ResponseApi.success(response.data, HttpStatusCode.Ok);
  appendSetCookies(res, response.setCookies);
  return res;
});
