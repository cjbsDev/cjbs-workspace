module.exports = {
  reactStrictMode: true,
  transpilePackages: ["cjbsDSTM"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
