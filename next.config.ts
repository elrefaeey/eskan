import type { NextConfig } from "next";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";
const nextConfig: NextConfig = {
  output: isMobile ? "export" : "standalone",
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "react-icons"],
    optimizeCss: true,
  },
  images: {
    unoptimized: isMobile,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://back.mansoura-eco-build.com/api/:path*",
      },
      {
        source: "/chat-api/:path*",
        destination: "https://chat.enterprise-egy.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/markazmadina",
        destination: "/city-center",
        permanent: true,
      },
      {
        source: "/sakan",
        destination: "/abrag-elmadina",
        permanent: true,
      },
      {
        source: "/vocational-center",
        destination: "/gpi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
