import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "192.168.1.92",
                port: "",
                pathname: "**",
                search: "",
            },
            {
                protocol: "http",
                hostname: "192.168.1.92:3000",
                port: "",
                pathname: "**",
                search: "",
            },
            {
                protocol: "http",
                hostname: "localhost:4001",
                port: "",
                pathname: "**",
                search: "",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
