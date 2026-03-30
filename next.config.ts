import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Allow remote thumbnails (jpg/png/webp) from DummyJSON CDN. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
