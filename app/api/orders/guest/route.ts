import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { CreateOrderAddressSchema } from "@/validation/order-address/orderAddressValidation";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const parsed = CreateOrderAddressSchema.safeParse(payload);
        if (!parsed.success) {
            return ResponseApi.error(
                String(parsed.error),
                HttpStatusCode.BadRequest
            );
        }
        const cookiesStore = await cookies();
        const guestSessionId = cookiesStore.get("guestSessionId")?.value;
        const response = await api.post<any>("orders/guest", payload, {
            headers: {
                Cookie: guestSessionId ? `guestSessionId=${guestSessionId}` : "",
            },
        });
        
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
