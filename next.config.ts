import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: "/api/media/:path*",
      destination:
        "https://yunomina-blog.s3.us-east-005.backblazeb2.com/:path*",
    },
    {
      source: "/api/emojis/:path*",
      destination:
        "https://yunomina-blog.s3.us-east-005.backblazeb2.com/emojis/:path*",
    },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
