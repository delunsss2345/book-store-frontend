import type {
  GuestSessionListResponse,
  GuestSessionItemResponse,
} from "@/types/response/guest-session.response";
import { http } from "@/utils/http";

export const guestSessionApi = {
  getGuestSessions: () =>
    http.get<GuestSessionListResponse>("/guest-sessions"),

  getGuestSessionById: (guestSessionId: string) =>
    http.get<GuestSessionItemResponse>(`/guest-sessions/${guestSessionId}`),
};
