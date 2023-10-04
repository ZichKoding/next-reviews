/** @type {import('next').NextConfig} */
module.exports = {
    // output: 'export', Thhis is for static site generation
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
            pathname: '/uploads/**',
        },
        ],
    },
};