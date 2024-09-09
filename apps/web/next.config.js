/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const path = require('path');
const webpack = require("webpack");
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    config.resolve.alias = {
      ...config.resolve.alias,  // preserve existing aliases
      '@components': path.join(__dirname, 'components'),
      '@styles': path.join(__dirname, 'styles'),
      // Add more aliases as needed
    };

    config.plugins.push(
      new webpack.ContextReplacementPlugin(/keyv/, (data) => {
        delete data.dependencies[0].critical;
        return data;
      })
    );

    return config
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui",],
};
