import DonatePage from '../page';
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
  if (resolvedParams.slug === 'general' || !camp) {
    return {
      title: 'Donate Where Most Needed | SikhAid Charitable Trust',
      description: 'Support SikhAid humanitarian emergency and general relief missions across India.',
    };
  }
  return {
    title: `Donate to ${camp.title} | SikhAid Charitable Trust`,
    description: camp.blurb || `Support the ${camp.title} mission. 100% transparent donation directly funding on-ground relief.`,
  };
}

export default async function DynamicDonatePage({ params }) {
  const resolvedParams = await params;
  return <DonatePage initialSlug={resolvedParams.slug} />;
}
