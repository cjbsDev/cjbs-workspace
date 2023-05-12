module.exports = {
  transpilePackages: ["ui"],
  compress: true,
  reactStrictMode: false,
  swcMinify: true,
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
    ]
},
};
