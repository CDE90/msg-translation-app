/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/message",
                destination: "/create",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
