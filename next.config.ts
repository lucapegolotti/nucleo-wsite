import type { NextConfig } from "next";

// Configure static export for GitHub Pages. When deploying to a project page
// (e.g., username.github.io/repo), we set a basePath at build time via env.
const isProduction = process.env.NODE_ENV === "production";
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const configuredBasePath = isProduction && envBasePath ? envBasePath : undefined;

const nextConfig: NextConfig = {
  output: "export",
  // Ensures routes like /about resolve to /about/index.html on static hosts
  trailingSlash: true,
  // Only set basePath in production when provided
  basePath: configuredBasePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
