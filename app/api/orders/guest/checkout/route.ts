import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { CreateGuestOrdersAndPaymentSchema } from "@/validation/order-address/orderAddressValidation";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const cookiesStore = await cookies();
        const languageCode = cookiesStore.get("appLanguage")?.value ?? 'vi';
        const parsed = CreateGuestOrdersAndPaymentSchema.safeParse({ ...payload, languageCode });
        if (!parsed.success) {
            return ResponseApi.error(
                (parsed.error.message),
                HttpStatusCode.BadRequest
            );
        }
        const guestSessionId = cookiesStore.get("guestSessionId")?.value;
        const response = await api.post<any>("orders/guest/checkout", {...payload , languageCode }, {
            headers: {
                Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
            },
        });
        console.log(response) ;
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Wish Items POST API Error:", error);
        }
        return ResponseApi.error(
            String(error), HttpStatusCode.BadRequest
        );
    }
}
