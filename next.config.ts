import { redirects, meta } from '@k4itrun/config';
import type { NextConfig } from "next";
import createMdx from "@next/mdx";

const withMDX = createMdx();

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

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        turbo: {
            useSwcCss: true
        },
    },
    pageExtensions: ["jsx", "js", "ts", "tsx"],
    env: {
        VERSION: meta.version,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                pathname: "**",
            },
            {
                protocol: "https",
                port: "",
                hostname: "media.discordapp.net",
                pathname: "**",
            },
        ],
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
        return redirects.map((redirect) => ({
            source: redirect.source,
            destination: redirect.destination || "/",
            permanent: redirect.permanent,
        }));
    },
} satisfies NextConfig;

export default withMDX(nextConfig);
