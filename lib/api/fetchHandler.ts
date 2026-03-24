import { envConfig } from "@/config/env.config"; // import cấu hình môi trường để lấy URL BE
import { ApiResponse } from "@/types/response/base.response";
import { HttpStatusCode } from "axios"; // dùng enum status code để so sánh HTTP status
import { cookies } from "next/headers"; // lấy cookies server-side từ Next
import "server-only"; // đảm bảo file chỉ chạy ở server
const BACKEND_URL = envConfig.BACKEND_API_URL; // URL BE mặc định cho mọi request
import jwtDecode from "jwt-decode";

export class HttpError<T = unknown> extends Error {
  // custom error để gắn status + data
  status: number; // HTTP status trả về từ BE
  data?: T; // dữ liệu lỗi (nếu BE trả JSON)

  constructor(status: number, message: string, data?: T) {
    // khởi tạo lỗi với status + message + data
    super(message); // gọi Error constructor để set message
    this.name = "HttpError"; // tên lỗi để phân biệt
    this.status = status; // lưu status
    this.data = data; // lưu dữ liệu lỗi
  }
}

type Query = Record<string, string | number | boolean | null | undefined>; // kiểu query string đơn giản

// Kết quả trả về dạng "raw" để caller có thể đọc header (vd: set-cookie)
export type ApiRawResponse<T = unknown> = {
  // wrapper trả về đủ dữ liệu + header
  data: any; // body sau khi parse
  headers: Headers; // header response từ BE
  status: number; // status code từ BE
  setCookies: string[]; // danh sách Set-Cookie để forward
  message: string;
  success: boolean;
};

type ApiOptions = Omit<RequestInit, "body"> & {
  // option mở rộng từ fetch option
  baseURL?: string; // default: process.env.API_BASE_URL
  query?: Query; // query params
  body?: unknown; // body JSON
  timeoutMs?: number; // default 15s
};

function buildUrl(baseURL: string, path: string, query?: Query) {
  // build URL đầy đủ
  const url = new URL(path, baseURL); // tạo URL object từ base + path
  if (query) {
    // nếu có query
    for (const [k, v] of Object.entries(query)) {
      // duyệt từng key/value
      if (v) {
        // bỏ qua giá trị null/undefined/false/0
        url.searchParams.set(k, String(v)); // set query param
      }
    }
  }
  return url.toString(); // trả về URL string
}

// Lấy danh sách Set-Cookie từ response một cách an toàn (Node/Next có thể hỗ trợ getSetCookie)
function readSetCookies(res: Response): string[] {
  // đọc Set-Cookie từ response
  const anyHeaders = res.headers as unknown as {
    getSetCookie?: () => string[];
  }; // ép kiểu để đọc getSetCookie nếu có
  const fromGetSetCookie =
    typeof anyHeaders.getSetCookie === "function"
      ? anyHeaders.getSetCookie()
      : undefined; // gọi getSetCookie nếu tồn tại
  if (fromGetSetCookie && fromGetSetCookie.length > 0) {
    // nếu có cookie dạng mảng
    return fromGetSetCookie; // trả về ngay
  }
  const single = res.headers.get("set-cookie"); // fallback: đọc set-cookie dạng string
  return single ? [single] : []; // nếu có thì bọc thành mảng
}

// requestRaw: trả về cả headers/status/set-cookie để route có thể forward cho browser
async function request<T = any>( // hàm fetch đầy đủ metadata
  method: string, // HTTP method
  path: string, // path API
  opt: ApiOptions = {}, // option tùy chọn
): Promise<ApiRawResponse<T>> {
  // trả về ApiRawResponse
  const {
    // bóc tách option
    baseURL = process.env.API_BASE_URL!, // base URL ưu tiên opt, fallback env
    query, // query params
    body, // body JSON
    timeoutMs = 15000, // timeout mặc định 15s
    headers, // headers bổ sung
    ...init // các option còn lại (cache, credentials, ...)
  } = opt;
  const cookieStore = await cookies(); // lấy cookie hiện tại trong request của Next
  const guestSessionId = cookieStore.get("guestSessionId")?.value; // lấy guestSessionId nếu có
  const accessToken = cookieStore.get("accessToken")?.value; // lấy accessToken nếu có
  const language = cookieStore.get("appLanguage")?.value ?? "vi"; // lấy ngôn ngữ app, default vi

  const url = buildUrl(baseURL, path, query); // build URL đầy đủ
  const header = new Headers(headers); // khởi tạo headers mới từ input
  if (body !== undefined) header.set("content-type", "application/json"); // nếu có body thì set content-type JSON

  // Khởi tạo controller để cắt request nếu vượt quá timeout
  const abortController = new AbortController(); // dùng để abort request
  const t = setTimeout(() => abortController.abort(), timeoutMs); // set timeout để abort

  // Gắn cookie guestSessionId vào header nếu caller chưa set cookie thủ công
  if (guestSessionId && !header.has("cookie")) {
    // chỉ set nếu có guestSessionId và chưa có cookie header
    header.set(
      "cookie",
      `guestSessionId=${cookieStore.get("guestSessionId")?.value || ""}`,
    ); // gắn cookie để BE đọc
  }

  // Gắn accessToken vào Authorization nếu chưa có
  if (accessToken && !header.has("authorization")) {
    // nếu có token và chưa set Authorization
    header.set("authorization", `Bearer ${accessToken}`); // set header Authorization
  }

  // Gắn ngôn ngữ app để BE trả nội dung đúng ngôn ngữ
  if (language) {
    // nếu có language
    header.set("x-app-lang", language); // set custom header
  }

  let res: Response; // biến lưu response
  try {
    res = await fetch(url, {
      // gọi fetch đến BE
      ...init, // truyền các option còn lại
      method, // HTTP method
      headers: header, // headers đã chuẩn hóa
      body: body !== undefined ? JSON.stringify(body) : undefined, // stringify JSON nếu có body
      signal: abortController.signal, // truyền signal để abort
      cache: init.cache ?? "no-store", // mặc định no-store để tránh cache
    });
  } finally {
    // Dù request thành công hay lỗi, luôn clear timeout để tránh leak
    clearTimeout(t); // clear timeout
  }

  // Kiểm tra content-type để biết có nên parse JSON không
  const contentType = res.headers.get("content-type") || ""; // đọc content-type
  const isJson = contentType.includes("application/json"); // xác định có phải JSON
  const response: ApiResponse<T> = isJson // parse dữ liệu theo content-type
    ? await res.json().catch(() => null) // nếu JSON thì parse, lỗi thì null
    : await res.text().catch(() => ""); // nếu text thì đọc text, lỗi thì empty

  if (!res.ok) {
    // nếu status không phải 2xx
    // Nếu unauthorized thì throw lỗi riêng để caller xử lý
    if (res.status === HttpStatusCode.Unauthorized) {
      // kiểm tra 401
      throw new HttpError(res.status, "Unauthorized", response); // ném lỗi 401 riêng
    }
    const msg =
      isJson && response && response.message
        ? response.message || "InternalServerError"
        : `HTTP ${res.status ?? 505}`; // ưu tiên message từ BE
    throw new HttpError(res.status, msg, response); // ném lỗi tổng quát
  }
  // console.log(response); // api gốc BE sẽ có success , statusCode , message , data
  // Trả về data kèm headers/status/set-cookie để route có thể forward cookie
  return {
    data: response.data, // data đã parse
    headers: res.headers, // headers gốc từ BE
    status: res.status, // status code từ BE
    setCookies: readSetCookies(res), // danh sách Set-Cookie để forward
    message: response?.message ?? "",
    success: response.success,
  };
}

// request: giữ hành vi cũ, chỉ trả data (để không phải sửa toàn bộ callsite)
// async function request<T = any>( // wrapper đơn giản để tương thích cũ
//     method: string, // HTTP method
//     path: string, // path API
//     opt: ApiOptions = {}, // option tùy chọn
// ): Promise<ApiResponse<T>> { // chỉ trả data
//     const raw = await requestRaw<T>(method, path, opt); // gọi requestRaw để lấy đầy đủ
//     return {
//         success: raw.success,
//         data: raw.data as T,
//         statusCode: raw.status,
//         message: raw.message,
//     }; // chỉ trả data
// }

export const fetchApi = (
  defaults: Pick<ApiOptions, "baseURL" | "headers"> = {},
) => {
  // factory tạo api client
  const withDefaults = (opt?: ApiOptions): ApiOptions => ({
    // merge default + option
    ...opt, // giữ option gốc
    baseURL: opt?.baseURL ?? defaults.baseURL, // ưu tiên opt.baseURL
    headers: { ...(defaults.headers as Headers), ...(opt?.headers as Headers) }, // merge headers
  });

  return {
    // trả ra các method HTTP
    get<T = any>(path: string, opt?: ApiOptions) {
      // GET wrapper
      return request<T>("GET", path, withDefaults(opt)); // gọi request đơn giản
    },
    post<T = any>(path: string, body?: unknown, opt?: ApiOptions) {
      // POST wrapper
      return request<T>("POST", path, withDefaults({ ...opt, body })); // gộp body vào option
    },
    put<T = any>(path: string, body?: unknown, opt?: ApiOptions) {
      // PUT wrapper
      return request<T>("PUT", path, withDefaults({ ...opt, body })); // gộp body vào option
    },
    patch<T = any>(path: string, body?: unknown, opt?: ApiOptions) {
      // PATCH wrapper
      return request<T>("PATCH", path, withDefaults({ ...opt, body })); // gộp body vào option
    },
    delete<T = any>(path: string, opt?: ApiOptions) {
      // DELETE wrapper
      return request<T>("DELETE", path, withDefaults(opt)); // gọi request đơn giản
    },
    // raw: { // nhóm method trả về raw response
    //     get<T = any>(path: string, opt?: ApiOptions) { // GET raw
    //         return requestRaw<T>("GET", path, withDefaults(opt)); // gọi requestRaw
    //     },
    //     post<T = any>(path: string, body?: unknown, opt?: ApiOptions) { // POST raw
    //         return requestRaw<T>("POST", path, withDefaults({ ...opt, body })); // gộp body + gọi requestRaw
    //     },
    //     put<T = any>(path: string, body?: unknown, opt?: ApiOptions) { // PUT raw
    //         return requestRaw<T>("PUT", path, withDefaults({ ...opt, body })); // gộp body + gọi requestRaw
    //     },
    //     patch<T = any>(path: string, body?: unknown, opt?: ApiOptions) { // PATCH raw
    //         return requestRaw<T>("PATCH", path, withDefaults({ ...opt, body })); // gộp body + gọi requestRaw
    //     },
    //     delete<T = any>(path: string, opt?: ApiOptions) { // DELETE raw
    //         return requestRaw<T>("DELETE", path, withDefaults(opt)); // gọi requestRaw
    //     },
    // },
  };
};

export const api = fetchApi({
  // instance api dùng chung toàn app
  baseURL: BACKEND_URL, // set baseURL mặc định,
});
