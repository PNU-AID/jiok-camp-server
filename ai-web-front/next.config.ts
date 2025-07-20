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
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
