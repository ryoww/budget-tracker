import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        optimizePackageImports: ["@chakra-ui/react", "react-icons"],
    },
};

export default nextConfig;
