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
        destination: "/prodcut",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
