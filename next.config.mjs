// Old campaign address → new one (keep in step with lib/data.js RENAMED).
const RENAMED_CAMPAIGNS = { 'blanket-distribution': 'mission-garmahat' };

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
      // Campaigns that were renamed: old links (ads, WhatsApp, shares) go to the new address.
      ...Object.entries(RENAMED_CAMPAIGNS).flatMap(([from, to]) => [
        { source: `/campaigns/${from}`, destination: `/campaigns/${to}`, permanent: true },
        { source: `/campaign/${from}`, destination: `/campaigns/${to}`, permanent: true },
        { source: `/donate/${from}`, destination: `/campaigns/${to}?donate=1`, permanent: false },
        { source: `/donate/${from}/checkout`, destination: `/campaigns/${to}?donate=1`, permanent: false },
      ]),
      // The A/B ad pages were first at -testing-1 (and the Mission Garmahat one typed as -testing1): old links go to -ad-1.
      ...['langar-sewa', 'mission-garmahat'].flatMap((base) => [
        { source: `/campaigns/${base}-testing-1`, destination: `/campaigns/${base}-ad-1`, permanent: false },
        { source: `/campaign/${base}-testing-1`, destination: `/campaigns/${base}-ad-1`, permanent: false },
        { source: `/donate/${base}-testing-1`, destination: `/campaigns/${base}-ad-1?donate=1`, permanent: false },
      ]),
      { source: '/campaigns/mission-garmahat-testing1', destination: '/campaigns/mission-garmahat-ad-1', permanent: false },
      { source: '/campaigns/mission-garmahat-testing1-', destination: '/campaigns/mission-garmahat-ad-1', permanent: false },
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
