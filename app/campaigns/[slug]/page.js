import { Suspense } from 'react';
import { CampaignDetail } from '@/app/campaign/page';
import { TEST_SLUGS, allCampaigns, bySlug } from '@/lib/data';
import AdBackHold from '@/components/AdBackHold';

export function generateStaticParams() {
  return [...allCampaigns.map((c) => c.slug), ...TEST_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const camp = bySlug(resolvedParams.slug);
  if (!camp) {
    return {
      title: 'Campaigns | SikhAid Charitable Trust',
      description: 'Support SikhAid humanitarian relief missions across India.',
    };
  }
  return {
    title: `${camp.title} | SikhAid Charitable Trust`,
    description: camp.blurb || `Support the ${camp.title} mission. 100% transparent on-ground humanitarian relief.`,
    // Test copies stay out of search results.
    ...(camp.testOf && { robots: { index: false, follow: false } }),
  };
}

export default async function CampaignSlugPage({ params }) {
  const resolvedParams = await params;
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '60px 20px', textAlign: 'center' }}>
          Loading campaign details...
        </div>
      }
    >
      {/* key: a new campaign starts fresh (gallery, FAQ, donation card), nothing carries over */}
      <CampaignDetail key={resolvedParams.slug} initialSlug={resolvedParams.slug} />
      {/* Every campaign page: the first Back press shows "Before you go" */}
      {bySlug(resolvedParams.slug) && <AdBackHold key={`hold-${resolvedParams.slug}`} slug={resolvedParams.slug} />}
    </Suspense>
  );
}
