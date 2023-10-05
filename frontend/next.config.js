/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://cise-assignment-1-b-qnho.vercel.app/api/:path*',
      },
    ]
  },
};

