import type { GetLoginAttemptByUserQuery } from "@/types/request/login-attempt.request";
import type { LoginAttemptListResponse } from "@/types/response/login-attempt.response";
import { http } from "@/utils/http";

export const loginAttemptApi = {
  getByUser: (userId: string, query?: GetLoginAttemptByUserQuery) =>
    http.get<LoginAttemptListResponse>(`/login-attempt/user/${userId}`, { params: query }),
};
