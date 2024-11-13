import { redirectsConfig, metaConfig } from './k4itrun.config';

import type { NextConfig } from "next";

const commonHeaders = [
    { key: "Access-Control-Allow-Origin", value: "*" },
    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
    { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Accept, Origin" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
    { key: "X-XSS-Protection", value: "1; mode=block" },
];

const contentHeaders = (contentType: string) => [
    { key: "Content-Type", value: contentType },
];

const nextConfg: NextConfig = {
    reactStrictMode: true,
    experimental: {
        turbo: {
            useSwcCss: true
        },
    },
    pageExtensions: ["jsx", "js", "ts", "tsx"],
    env: {
        VERSION: metaConfig.version,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: commonHeaders,
            },
            {
                source: "/(.*).xml",
                headers: contentHeaders("application/xml"),
            },
            {
                source: "/(.*).json",
                headers: contentHeaders("application/json"),
            },
        ];
    },
    async redirects() {
        return redirectsConfig.map((redirect) => ({
            source: redirect.source,
            destination: redirect.destination || "/fallback",
            permanent: redirect.permanent,
        }));
    },
};

export default nextConfg;