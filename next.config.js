/** @type {import('next').NextConfig} */
const nextConfig =  {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'about.embloy.com',
                },
                {
                    protocol: 'https',
                    hostname: 'f005.backblazeb2.com',
                },
                {
                    protocol: 'https',
                    hostname: 'avatars.githubusercontent.com',
                },
                {
                    protocol: 'https',
                    hostname: 'embloy2.blob.core.windows.net',
                },
                {
                    protocol: 'https',
                    hostname: 'embloy.s3.eu-central-1.amazonaws.com',
                },
            ],
        },
        output: "standalone",
    }

module.exports = nextConfig
