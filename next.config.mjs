/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // GH Pages is static — no Next image optimizer at runtime.
    unoptimized: true,
  },
};

export default nextConfig;
