/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // For GitHub Pages deployment with custom domain
    // If using username.github.io/repo-name, add: basePath: '/repo-name'
    // For custom domain (scaffold.stylofront.com), no basePath needed
};

module.exports = nextConfig;
