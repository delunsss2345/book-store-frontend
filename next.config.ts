
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // nếu bạn dùng thêm domain khác thì add ở đây
    ],
  },
};
export default nextConfig;
