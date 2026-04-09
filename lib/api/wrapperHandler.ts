import { NextRequest, NextResponse } from "next/server";
import { handleError } from "./errorHandler";

export function wrapperHandler<T = unknown>(
  fn: (
    req: Request | NextRequest,
    { params }: { params: Promise<T> },
  ) => Promise<NextResponse> | NextResponse,
) {
  return async (req: Request | NextRequest, { params }: { params: Promise<T> }) => {
    try {
      return await fn(req, { params });
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
