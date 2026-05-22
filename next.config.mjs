/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoBase = "/relocation-to-cyprus";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves the site at user.github.io/relocation-to-cyprus/.
  basePath: isProd ? repoBase : "",
  assetPrefix: isProd ? repoBase : "",
  images: {
    // GH Pages is static — no Next image optimizer at runtime.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoBase : "",
  },
};

export default nextConfig;
