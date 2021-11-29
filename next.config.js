module.exports = {
  basePath: '/mint',
  reactStrictMode: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, options) => {
    config.externals.push('electron')
    return config
  }
}
