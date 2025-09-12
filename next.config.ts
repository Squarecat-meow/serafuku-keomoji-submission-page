import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`${process.env.APP_URL}/**`)],
  },
  rewrites: async () => [
    {
      source: "/api/media/:path*",
      destination:
        "https://serafuku-keomoji-submission.s3.us-east-005.backblazeb2.com/:path*",
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
