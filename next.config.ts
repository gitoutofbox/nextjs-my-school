import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'vercel.com'
    ],
    // loader: "akamai",
    path: "/",
  },
  // output: "export",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/students",
        permanent: true
      },
      {
        source: "/home",
        destination: "/students",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
