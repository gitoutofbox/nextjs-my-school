import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: []
  },
  // output: "export",
  redirects: async () => {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
