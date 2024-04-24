/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'genshin.jmp.blue',
            }
        ]
    }
};

export default nextConfig;
