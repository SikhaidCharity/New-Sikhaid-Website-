// Today's exchange rates for the international donation page: rupees for one unit of each currency.
// Fetched from a free public rates service at most every 6 hours; falls back to fixed rates if it's down.
import { CURRENCY_CODES, FALLBACK_RATES } from '@/lib/currency';

export const revalidate = 21600;

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/INR', { next: { revalidate }, signal: AbortSignal.timeout(8000) });
    const data = await res.json();
    if (data?.result !== 'success') throw new Error('rates unavailable');
    const rates = {};
    for (const code of CURRENCY_CODES) {
      const perRupee = Number(data.rates?.[code]);
      if (!(perRupee > 0)) throw new Error(`no rate for ${code}`);
      rates[code] = Math.round((1 / perRupee) * 100) / 100;
    }
    return Response.json({ rates, updated: data.time_last_update_utc || '', live: true });
  } catch {
    return Response.json({ rates: FALLBACK_RATES, updated: '', live: false });
  }
}
