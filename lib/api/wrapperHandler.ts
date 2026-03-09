import { handleError } from "./errorHandler";

export function wrapperHandler(
  fn: (...args: any) => Promise<Response> | Response,
) {
  return async (...args: any) => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      return handleError(error);
    }
  };
}
