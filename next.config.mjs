/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                hostname: 'upload-os-bbs.mihoyo.com',
                protocol: "https"
            },
            {
                hostname: 'webstatic.hoyoverse.com',
                protocol: "https"
            },
            {
                hostname: 'api.ambr.top',
                protocol: 'https'
            },
            {
                hostname: 'sdk.hoyoverse.com',
                protocol: 'https'
            },
            {
                hostname: 'img-os-static.hoyolab.com',
                protocol: 'https'
            },
            {
                hostname: 'fastcdn.hoyoverse.com',
                protocol: 'https'
            },
            {
                hostname: 'enka.network',
                protocol: 'https'
            }
        ]
    },
};
const withMDX = createMDX({
})

export default withMDX(nextConfig)
