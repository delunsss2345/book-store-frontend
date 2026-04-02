import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "http", hostname: "books.google.com" },
      { protocol: "https", hostname: "taschen.makaira.media" },
    ],
  },
};

export default withNextIntl(nextConfig);
