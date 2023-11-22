/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH ?? "";
const config = {
  basePath: basePath,
  env: {
    basePath,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: basePath,
      },
    ];
  },
};
const nextConfig = {
  ...config,
};

module.exports = nextConfig;
