// /international-donation: the Winter Sewa campaign for donors abroad, in their own currency.
// Reached only by its link (ads, emails): not in the menus, and kept out of search results.
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { currencyForCountry, isCurrency } from '@/lib/currency';
import InternationalCampaign from './InternationalCampaign';

export const metadata = {
  title: 'Winter Sewa: Donate from Abroad | SikhAid Charitable Trust',
  description: 'Keep families warm this winter. Donate to SikhAid’s Winter Sewa in your own currency.',
  robots: { index: false, follow: false },
};

export default async function InternationalDonationPage({ searchParams }) {
  const params = await searchParams;
  const asked = String(params?.currency || '').toUpperCase();
  // Hosting tells us the visitor's country; locally there's none and the browser guesses instead.
  const country = (await headers()).get('x-vercel-ip-country') || '';
  const initial = isCurrency(asked) ? asked : currencyForCountry(country);

  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>Loading…</div>}>
      <InternationalCampaign initialCurrency={initial} />
    </Suspense>
  );
}
