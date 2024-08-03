/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { withSentryConfig } = require('@sentry/nextjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  i18n,
  async rewrites() {
    return [
      {
        source: '/settings',
        destination: '/settings/profile'
      },
      {
        source: '/transactions',
        destination: '/settings/transactions'
      },
      {
        source: '/referral',
        destination: '/referral/overview'
      }
    ];
  }
};

module.exports = nextConfig;

// module.exports = withSentryConfig(
//   nextConfig,
//   {
//     silent: true,
//     org: process.env.SENTRY_ORG,
//     project: process.env.SENTRY_PROJECT
//   },
//   {
//     widenClientFileUpload: true,
//     transpileClientSDK: true,
//     tunnelRoute: '/monitoring',
//     hideSourceMaps: true,
//     disableLogger: true,
//     ignoreTransactions: ['NotAllowedError', 'AbortError', 'ChunkLoadError', 'read(frame)'],
//     ignoreErrors: ['NotAllowedError', 'AbortError', 'ChunkLoadError', 'read(frame)']
//   }
// );
