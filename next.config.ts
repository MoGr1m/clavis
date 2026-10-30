import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  /* Старые URL тем A/B/C → корень или соответствующий путь без префикса */
  async redirects() {
    return [
      { source: "/a", destination: "/", permanent: false },
      { source: "/b", destination: "/", permanent: false },
      { source: "/c", destination: "/", permanent: false },
      { source: "/a/:path*", destination: "/:path*", permanent: false },
      { source: "/b/:path*", destination: "/:path*", permanent: false },
      { source: "/c/:path*", destination: "/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
