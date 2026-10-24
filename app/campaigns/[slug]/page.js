import { Suspense } from 'react';
import { CampaignDetail } from '@/app/campaign/page';
import { allCampaigns, bySlug } from '@/lib/data';

export function generateStaticParams() {
  return allCampaigns.map((c) => ({ slug: c.slug }));
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
      <CampaignDetail initialSlug={resolvedParams.slug} />
    </Suspense>
  );
}
