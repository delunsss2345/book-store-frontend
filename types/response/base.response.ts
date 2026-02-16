export interface ApiResponse<T> {
    success: "true" | "false" | boolean;
    statusCode: number;
    message: string;
    data: T;
}

