import type { GetEmailOutboxQuery } from "@/types/request/email-outbox.request";
import type { EmailOutboxListResponse } from "@/types/response/email-outbox.response";
import { http } from "@/utils/http";

export const emailOutboxApi = {
  getEmailOutbox: (query?: GetEmailOutboxQuery) =>
    http.get<EmailOutboxListResponse>("/email-outbox", { params: query }),
};
