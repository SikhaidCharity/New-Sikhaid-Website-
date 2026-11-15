'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CampaignDetail } from '@/app/campaign/page';
import { INTERNATIONAL_SLUG } from '@/components/DonationCard';
import { CURRENCIES, CURRENCY_CODES, DEFAULT_CURRENCY, currencyFromBrowser, formatMoney, fromInr, isCurrency } from '@/lib/currency';
import { useRates } from '@/lib/fx-client';
import './international.css';

// The chosen currency lives in the address (?currency=GBP), so the donation card, a refresh and a
// shared link all agree. First visit: from the ad's link, else the visitor's country, else a browser guess.
export default function InternationalCampaign({ initialCurrency }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const rates = useRates();
  const fromUrl = searchParams.get('currency')?.toUpperCase();
  const currency = isCurrency(fromUrl) ? fromUrl : initialCurrency || DEFAULT_CURRENCY;

  const choose = (code) => {
    const params = new URLSearchParams(window.location.search);
    params.set('currency', code);
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (isCurrency(fromUrl)) return;
    choose(initialCurrency || currencyFromBrowser() || DEFAULT_CURRENCY);
    // Only on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbar = (
    <div className="intl-bar">
      <div className="wrap intl-bar-inner">
        <p>
          <b>Donating from abroad?</b> Give in your own currency.
          <span className="intl-rate">
            {formatMoney(1, currency)} ≈ ₹{(rates[currency] || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </p>
        <div className="intl-currencies" role="radiogroup" aria-label="Currency">
          {CURRENCY_CODES.map((code) => (
            <button key={code} type="button" role="radio" aria-checked={code === currency} title={CURRENCIES[code].name} onClick={() => choose(code)}>
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <CampaignDetail
      initialSlug={INTERNATIONAL_SLUG}
      money={(inr) => formatMoney(fromInr(inr, currency, rates), currency)}
      toolbar={toolbar}
      international
    />
  );
}
