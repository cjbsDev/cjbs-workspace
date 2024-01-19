module.exports = {
  reactStrictMode: true,
  transpilePackages: ["cjbsDSTM"],
  experimental: {
    typedRoutes: true,
    // turbo: {
    //   loaders: {
    //     ".svg": ["@svgr/webpack"],
    //   },
    // },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
