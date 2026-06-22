import { PUBLIC_API_PATHS } from "@/src/constants/publicApi";

export const isPublicApi = (url?: string) => {
  if (!url) return false;
  console.log("Url", url);
  return PUBLIC_API_PATHS.some((path) => url.endsWith(path));
};
