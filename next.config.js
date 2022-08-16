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
    images: {
        domains: ["cdn.discordapp.com", "lh3.googleusercontent.com"],
    },
};

module.exports = nextConfig;
