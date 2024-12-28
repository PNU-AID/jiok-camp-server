import type { NextConfig } from 'next';
import ESLintPlugin from 'eslint-webpack-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        emitWarning: true,
      }),
    );
    return config;
  },
};

export default nextConfig;
