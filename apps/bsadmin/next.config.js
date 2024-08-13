module.exports = {
  reactStrictMode: true,
  transpilePackages: ["cjbsDSTM"],
  experimental: {
    typedRoutes: true,
    missingSuspenseWithCSRBailout: false,
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
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "bsa-common-dev.s3.ap-northeast-2.amazonaws.com",
      "bsa-common-prod.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};
