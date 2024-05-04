/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            {
                hostname:'upload-os-bbs.mihoyo.com',
                protocol:"https"
            },
            {
                hostname:'webstatic.hoyoverse.com',
                protocol:"https"
            },
            {
                hostname:'api.ambr.top',
                protocol:'https'
            },
            {
                hostname:'sdk.hoyoverse.com',
                protocol:'https'
            },
            {
                hostname:'img-os-static.hoyolab.com',
                protocol:'https'
            },
            {
                hostname:'fastcdn.hoyoverse.com',
                protocol:'https'
            },
            {
                hostname:'enka.network',
                protocol:'https'
            }
        ]
    }
};

export default nextConfig;
