/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://cise-backend-murex.vercel.app/api/:path*',
      },
    ]
  },
};

