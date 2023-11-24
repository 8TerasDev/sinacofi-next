/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH ?? "";
const config = {
  basePath: basePath,
  env: {
    basePath,
  },
};
const nextConfig = {
  ...config,
};

module.exports = nextConfig;