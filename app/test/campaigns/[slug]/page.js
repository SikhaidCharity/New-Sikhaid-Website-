import CampaignSlugPage, { generateStaticParams } from '@/app/campaigns/[slug]/page';
import { bySlug } from '@/lib/data';

// sikhaid.ngo/test/campaigns/<slug>: the same campaign page, on the test site (₹1 minimum).
export { generateStaticParams };

export async function generateMetadata({ params }) {
  const camp = bySlug((await params).slug);
  return {
    title: `Test · ${camp?.title || 'Campaign'}`,
    robots: { index: false, follow: false },
  };
}

export default CampaignSlugPage;
