// import createNextIntlPlugin from 'next-intl/plugin';
 
// const withNextIntl = createNextIntlPlugin();
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {};
 
// export default withNextIntl(nextConfig);



import createNextIntlPlugin from 'next-intl/plugin';

// Initialize the `next-intl` plugin
const withNextIntl = createNextIntlPlugin();

// Add rewrites inside the configuration
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Proxy requests starting with /api
                destination: 'http://143.110.241.146:9050/:path*', // Redirect to your backend
            },
        ];
    },
};

// Export the combined configuration
export default withNextIntl(nextConfig);
