import type { NextConfig } from "next";

/**
 * GitHub Pages project URL: `https://<user>.github.io/ecommerce/`
 * Set `NEXT_PUBLIC_BASE_PATH=` (empty) in `.env.local` to run at site root during dev.
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "/ecommerce";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  images: {
    /** Required for `output: "export"` — no Image Optimization API on static hosts. */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
