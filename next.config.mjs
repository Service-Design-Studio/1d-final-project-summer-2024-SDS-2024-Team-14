/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['127.0.0.1', 'localhost', 'gebirah-backend-2r6b52gguq-as.a.run.app']
    },
};

export default nextConfig;
