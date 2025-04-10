import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    // loader: "akamai",
    path: "/",
  },
  // output: "export",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/product",
        permanent: true
      },
      {
        source: "/home",
        destination: "/product",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
