/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        net: false,
        tls: false,
        'rpc-websockets': require.resolve('rpc-websockets'),
      }
    }
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    })
    config.externals.push('encoding', 'pino-pretty', 'lokijs', 'node:crypto')
    return config
  },
  transpilePackages: [
    '@jup-ag/core',
    '@solana/web3.js',
    '@project-serum/serum',
    '@solana/spl-token',
  ],
}

module.exports = nextConfig 