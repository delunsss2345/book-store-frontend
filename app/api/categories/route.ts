import { api } from "@/lib/api/fetchHandler";
import { ResponseApi } from "@/lib/api/responseHandler";
import { CategoryItemResponse, CategoryListResponse } from "@/types/response/category.response";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        if (!searchParams.has("page")) {
            searchParams.set("page", "1");
        }
        if (!searchParams.has("limit")) {
            searchParams.set("limit", "30");
        }

        const response = await api.get<CategoryListResponse>(`categories?${searchParams.toString()}`);
        return ResponseApi.success(response.data, HttpStatusCode.Ok);
    } catch (error: any) {
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const response = await api.post<CategoryItemResponse>("categories", payload);
        return ResponseApi.success(response.data, HttpStatusCode.Created);
    } catch (error: any) {
        return ResponseApi.error(error.message, error.status ?? HttpStatusCode.BadRequest);
    }
}
