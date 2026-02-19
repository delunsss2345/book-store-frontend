export interface ApiResponse<T> {
    success: "true" | "false" | boolean;
    statusCode: number;
    message: string;
    data: T;
}

export type ProxySuccessResponse<T> = {
    success: true;
    data: T;
};

export type ProxyErrorResponse = {
    success: false;
    message: string;
    details?: unknown;
};

export type ProxyResponse<T> = ProxySuccessResponse<T> | ProxyErrorResponse;

