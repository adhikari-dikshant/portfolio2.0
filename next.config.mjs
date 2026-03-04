/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["sanity", "@sanity/client", "next-sanity"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
};

export default nextConfig;
