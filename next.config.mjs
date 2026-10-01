/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export (served by Vercel): no Next image optimizer at runtime.
    unoptimized: true,
  },
};

export default nextConfig;
