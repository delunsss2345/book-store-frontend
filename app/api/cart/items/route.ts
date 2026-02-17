// import { API_MESSAGE } from "@/constants/api/messageApi";
// import { ResponseApi } from "@/lib/api/responseHandler";
// import { HttpStatusCode } from "axios";
// import { NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//     try {
//         // const payload = await request.json();
//         // const response = await api.get() { }
//     }
//     catch (error) {
//         if (process.env.NODE_ENV === 'development') {
//             console.error("Register API Error:", error);
//         }
//         return ResponseApi.error(
//             error.message ?? API_MESSAGE.SYSTEM_TRY_AGAIN, HttpStatusCode.BadRequest
//         )
//     }
// }