/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.sikhaid.ngo' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      // Images uploaded in the admin (Firebase Storage, v2/ folder).
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/v0/b/sikhaidlandingpage.firebasestorage.app/o/**' },
    ],
  },
  // The donation card lives on the campaign page, so old donate URLs land there with it open.
  // Next passes query strings through, which keeps amount and UTM tags on the redirect.
  async redirects() {
    const generalFund = '/campaigns?donate=general';
    const campaignCard = '/campaigns/:slug?donate=1';
    const campaignSlug = ':slug((?!thank-you$|general$|checkout$)[^/]+)';
    return [
      { source: '/donate', destination: generalFund, permanent: false },
      { source: '/donate.html', destination: generalFund, permanent: false },
      { source: '/donate/checkout', destination: generalFund, permanent: false },
      { source: '/donate/general', destination: generalFund, permanent: false },
      { source: '/donate/general/checkout', destination: generalFund, permanent: false },
      { source: `/donate/${campaignSlug}`, destination: campaignCard, permanent: false },
      { source: `/donate/${campaignSlug}/checkout`, destination: campaignCard, permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: '/about.html', destination: '/about' },
      { source: '/campaigns.html', destination: '/campaigns' },
      { source: '/campaign.html', destination: '/campaign' },
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
