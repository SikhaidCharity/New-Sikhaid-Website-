'use client';
// Exchange rates in the browser: fetched once per visit and shared by the page and the donation card.
import { useEffect, useState } from 'react';
import { FALLBACK_RATES } from './currency';

let pending = null;
const loadRates = () => {
  pending ||= fetch('/api/fx')
    .then((r) => r.json())
    .then((d) => d.rates || FALLBACK_RATES)
    .catch(() => FALLBACK_RATES);
  return pending;
};

export function useRates() {
  const [rates, setRates] = useState(FALLBACK_RATES);
  useEffect(() => {
    let live = true;
    loadRates().then((r) => live && setRates(r));
    return () => { live = false; };
  }, []);
  return rates;
}
