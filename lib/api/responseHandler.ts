import { HttpStatusCode } from "axios"; // enum status code cho response
import { NextResponse } from "next/server"; // class để tạo response trong Next route

export class ResponseApi { // helper chuẩn hóa response
    static success<T>(data: T, status: HttpStatusCode = HttpStatusCode.Ok, props = {}) { // response thành công
        return NextResponse.json({ success: true, ...props, data }, { status }); // trả JSON với flag success
    }

    static error( // response lỗi
        message: string, // message lỗi
        status: HttpStatusCode = HttpStatusCode.BadRequest, // status mặc định 400
        details?: unknown // chi tiết lỗi thêm (nếu có)
    ) {
        return NextResponse.json( // trả JSON lỗi
            { success: false, message, details }, // payload lỗi
            { status } // status code
        );
    }
}

// Helper append nhiều Set-Cookie vào response của Next
export function appendSetCookies(res: NextResponse, setCookies: string[]) { // hàm gắn set-cookie vào response
    // Không làm gì nếu BE không trả cookie
    if (!setCookies || setCookies.length === 0) return; // tránh append khi không có cookie
    // Mỗi cookie phải append riêng, không gộp chung 1 string
    for (const cookie of setCookies) { // duyệt từng cookie
        res.headers.append("set-cookie", cookie); // append cookie vào header response
    }
}
