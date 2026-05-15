/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**"
      }
    ]
  },
  typescript: {
    // Allows the production build to finish even if there are minor configuration type errors
    ignoreBuildErrors: true,
  }
};

export default nextConfig;