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
            ],
        },
    }

module.exports = nextConfig
