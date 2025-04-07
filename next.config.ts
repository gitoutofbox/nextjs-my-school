import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: []
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
