// Currencies for the international donation page (/international-donation).
// Each one has its own amount buttons, so donors see round numbers in their own money.

export const CURRENCIES = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', amounts: [25, 50, 100, 250], suggested: 50, min: 5 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'en-IE', amounts: [25, 50, 100, 250], suggested: 50, min: 5 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', amounts: [20, 40, 80, 200], suggested: 40, min: 5 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', locale: 'en-CA', amounts: [35, 70, 140, 350], suggested: 70, min: 5 },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU', amounts: [40, 75, 150, 400], suggested: 75, min: 5 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED ', locale: 'en-AE', amounts: [100, 200, 400, 1000], suggested: 200, min: 20 },
};
export const CURRENCY_CODES = Object.keys(CURRENCIES);
export const DEFAULT_CURRENCY = 'USD';

// Rupees for one unit of each currency, used only if live rates can't be fetched.
export const FALLBACK_RATES = { USD: 94.26, EUR: 104.04, GBP: 124.56, CAD: 66.05, AUD: 63.98, AED: 25.67 }; // Nov 2026

export const isCurrency = (code) => Object.hasOwn(CURRENCIES, String(code || '').toUpperCase());
export const currencyOf = (code) => CURRENCIES[String(code || '').toUpperCase()] || CURRENCIES[DEFAULT_CURRENCY];

// "$1,250" / "£40" / "AED 200"
export function formatMoney(amount, code) {
  const c = currencyOf(code);
  return c.symbol + Math.round(Number(amount) || 0).toLocaleString(c.locale);
}

// Rupees → the chosen currency, rounded to a whole unit.
export const fromInr = (inr, code, rates) => Math.round((Number(inr) || 0) / (rates?.[code] || FALLBACK_RATES[code] || 1));
// The chosen currency → rupees.
export const toInr = (amount, code, rates) => Math.round((Number(amount) || 0) * (rates?.[code] || FALLBACK_RATES[code] || 1));

// Country (ISO code, e.g. from the hosting provider's location header) → currency.
const EURO_COUNTRIES = new Set(['AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK']);
export function currencyForCountry(country) {
  const cc = String(country || '').toUpperCase();
  if (!cc) return '';
  if (cc === 'US') return 'USD';
  if (cc === 'GB') return 'GBP';
  if (cc === 'CA') return 'CAD';
  if (cc === 'AU') return 'AUD';
  if (cc === 'AE') return 'AED';
  if (EURO_COUNTRIES.has(cc)) return 'EUR';
  return '';
}

// In the browser, when there is no location header (e.g. on a local computer): guess from the time zone.
export function currencyFromBrowser() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Europe/London') return 'GBP';
    if (tz.startsWith('Europe/')) return 'EUR';
    if (tz === 'Asia/Dubai') return 'AED';
    if (tz.startsWith('Australia/')) return 'AUD';
    if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Montreal)/.test(tz)) return 'CAD';
    if (tz.startsWith('America/')) return 'USD';
  } catch {}
  return '';
}
