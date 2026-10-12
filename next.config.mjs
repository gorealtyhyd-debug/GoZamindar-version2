/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // static HTML; scripts/postbuild.mjs then inlines everything into dist/index.html
  trailingSlash: false,    // single page → index.html + 404.html, no per-route folders
  images: { unoptimized: true }, // images are pre-sized by scripts/fetch-images.mjs
  reactStrictMode: true,
  poweredByHeader: false,
};
export default nextConfig;
