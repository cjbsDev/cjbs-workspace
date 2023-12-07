module.exports = {
  transpilePackages: ['ui'],
  compress: true,
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    forceSwcTransforms: true,
  },
  redirects: async () => {
    return [
      {
        //  source: '/:path((?!ie_warning.html$).*)',
        source: '/login',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '(.*Trident.*)',
          },
        ],
        permanent: false,
        destination: '/ie_warning.html',
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
