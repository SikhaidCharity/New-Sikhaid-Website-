import DonatePage from '../../page';
import { campaigns } from '@/lib/data';

export function generateStaticParams() {
  return [
    { slug: 'general' },
    ...campaigns.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const camp = campaigns.find((c) => c.slug === resolvedParams.slug);
  const title = camp ? camp.title : 'Relief Mission';
  return {
    title: `Checkout - Donate to ${title} | SikhAid Charitable Trust`,
    description: `Complete your donation to ${title}. Instant 80G tax receipt and transparent impact updates.`,
  };
}

export default async function DynamicCheckoutPage({ params }) {
  const resolvedParams = await params;
  return <DonatePage initialSlug={resolvedParams.slug} isCheckoutPage={true} />;
}
