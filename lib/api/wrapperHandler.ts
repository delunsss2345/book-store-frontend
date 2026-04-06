import { handleError } from "./errorHandler";
import { NextResponse } from "next/server";

export function wrapperHandler<T = unknown>(
  fn: (
    req: Request,
    params: Promise<T>,
  ) => Promise<NextResponse> | NextResponse,
) {
  return async (req: Request, params: T) => {
    try {
      return await fn(req, Promise.resolve(params));
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
