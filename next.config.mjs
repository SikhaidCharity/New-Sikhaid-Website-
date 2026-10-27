/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.sikhaid.ngo' },
      { protocol: 'https', hostname: 'i.ibb.co' },
    ],
  },
  async rewrites() {
    return [
      { source: '/donate/:slug/Checkout', destination: '/donate/:slug/checkout' },
      { source: '/donate/Checkout', destination: '/donate/checkout' },
      { source: '/about.html', destination: '/about' },
      { source: '/campaigns.html', destination: '/campaigns' },
      { source: '/campaign.html', destination: '/campaign' },
      { source: '/donate.html', destination: '/donate' },
      { source: '/get-involved.html', destination: '/get-involved' },
      { source: '/blog.html', destination: '/blog' },
      { source: '/contact.html', destination: '/contact' },
      { source: '/account.html', destination: '/account' },
      { source: '/login.html', destination: '/login' },
      { source: '/index.html', destination: '/' },
    ];
  },
};

export default nextConfig;
