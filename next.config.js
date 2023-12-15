/** @type {import('next').NextConfig} */
const nextConfig =  {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'about.embloy.com',
                },
            ],
        },
    }

module.exports = nextConfig
