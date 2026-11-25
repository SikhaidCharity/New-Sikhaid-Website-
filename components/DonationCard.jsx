'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaymentCancelled, payDonation } from '@/lib/pay';
import { LIVE_SLUG, bySlug, fmt } from '@/lib/data';
import './DonationCard.css';
import { donateCardStyle } from '@/lib/donate-color';
import { CURRENCIES, CURRENCY_CODES, currencyOf, formatMoney, isCurrency, toInr } from '@/lib/currency';
import { useRates } from '@/lib/fx-client';
import { EXTRA_MAX_QTY, EXTRA_UNIT_PRICE, extraOfferFor } from '@/lib/extra-offers';

const AMOUNTS = [500, 1500, 2500, 5000];
const SUGGESTED_AMOUNT = 2500;
const OLD_AMOUNTS = '701,1701,2701,5701';
const MIN_AMOUNT = 300;
// Campaigns saved with the old standard minimum (₹100) use the current one.
const OLD_MIN_AMOUNT = 100;
const TIP_SLABS = [
  { value: 0, label: 'No thanks' },
  { value: 5, label: '5%' },
  { value: 12, label: '12%' },
  { value: 18, label: '18%' },
];
const DEFAULT_TIP = 12;
const PAN_REQUIRED_FROM = 2000;
const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const UTM_STORAGE_KEY = 'sa-utm';
// Params that describe the open card, removed from the URL when it closes.
const CARD_PARAMS = ['donate', 'amount', 'amt', 'monthly'];

const GENERAL_FUND = { slug: 'general', title: 'Where it’s needed most' };

const PAYMENT_METHODS = [
  ['upi', 'UPI', 'Google Pay, PhonePe, Paytm, BHIM, or scan a QR'],
  ['card', 'Debit or credit card', 'Visa, Mastercard, RuPay'],
  ['nb', 'Net banking', 'All major Indian banks'],
  ['wallet', 'Wallets', 'Paytm, Mobikwik and more'],
];

// Donors abroad pay by card or PayPal in their own currency.
const INTERNATIONAL_METHODS = [
  ['card', 'Credit or debit card', 'Visa, Mastercard, American Express'],
  ['paypal', 'PayPal', 'Pay with your PayPal account'],
];
// Phone country code shown first for each currency; donors can change it.
const DIAL_CODES = { USD: '+1', CAD: '+1', GBP: '+44', EUR: '+49', AUD: '+61', AED: '+971' };

const DONATE_LINK = /^\/donate(?:\/([^/]+))?(?:\/checkout)?\/?$/i;
const CAMPAIGN_PATH = /^\/campaigns?\/([^/]+)/;

// The international donation page: one campaign, shown in the donor's own currency.
export const INTERNATIONAL_PATH = '/international-donation';
export const INTERNATIONAL_SLUG = 'mission-garmahat'; // Mission Garmahat (winter blankets)
// Campaign landing pages reached only by link: the card opens on the page for that campaign.
const LANDING_PAGES = { [INTERNATIONAL_PATH]: INTERNATIONAL_SLUG, '/nospotindia': 'no-spot' };
const slugForPath = (pathname) => LANDING_PAGES[pathname?.replace(/\/$/, '')] || pathname?.match(CAMPAIGN_PATH)?.[1];
// A landing page can dress the card in its own colours (only there; the campaign's own pages keep theirs).
const LANDING_THEMES = { '/nospotindia': { donateColor: '#A3375F', donateStyle: 'solid' } };

function readStoredUtm() {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}


// 32 random hex characters from the browser's secure random generator.
function newDownloadToken() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function DonationCard({ campaign, initialAmount, initialMonthly, onClose, currency, onCurrency }) {
  const router = useRouter();
  // On the international page everything is in the donor's own currency (USD, EUR, GBP, CAD, AUD, AED).
  const intl = currency ? currencyOf(currency) : null;
  const rates = useRates();
  const money = (n) => (intl ? formatMoney(n, intl.code) : fmt(n));
  // Each campaign can set its own amounts in the admin panel.
  // A campaign still on the old standard amounts (₹701 / 1,701 / 2,701 / 5,701) gets the current ones.
  const custom = campaign.donationAmounts?.length && campaign.donationAmounts.join() !== OLD_AMOUNTS;
  const amounts = intl ? intl.amounts : custom ? campaign.donationAmounts : AMOUNTS;
  const suggestedAmount = intl ? intl.suggested : (custom && campaign.suggestedAmount) || SUGGESTED_AMOUNT;
  const savedMin = Number(campaign.minAmount) || 0;
  const minAmount = intl ? intl.min : savedMin && savedMin !== OLD_MIN_AMOUNT ? savedMin : MIN_AMOUNT;
  const startAmount = initialAmount >= minAmount ? initialAmount : suggestedAmount;

  const [step, setStep] = useState('details');
  const [amountText, setAmountText] = useState(String(startAmount));
  const [isMonthly, setIsMonthly] = useState(initialMonthly);
  const [tipPercent, setTipPercent] = useState(DEFAULT_TIP);
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', pan: '', dial: intl ? DIAL_CODES[intl.code] : '+91' });
  const [createAccount, setCreateAccount] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [method, setMethod] = useState(intl ? 'card' : 'upi');
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  // The "add one more" offer (blanket on Langar Sewa, langar on Mission Garmahat): asked once, on Pay.
  const offer = !intl ? extraOfferFor(campaign.slug) : null;
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerQty, setOfferQty] = useState(1);
  // The donor's answer ({ offer, accepted, qty }), asked on Continue to Payment and used when paying.
  const [extraChoice, setExtraChoice] = useState(null);
  const [payError, setPayError] = useState('');

  const amount = parseInt(amountText, 10) || 0;
  const tipFor = (percent) => Math.round((amount * percent) / 100);
  const tipAmount = tipFor(tipPercent);
  const total = amount + tipAmount;
  // The blanket / langar the donor added at the offer (0 if they said no thanks).
  const extraAmount = extraChoice?.accepted ? extraChoice.qty * EXTRA_UNIT_PRICE : 0;
  const payTotal = total + extraAmount;
  // PAN is for Indian income tax only, so it isn't asked on the international page.
  const panRequired = !intl && total >= PAN_REQUIRED_FROM;
  const suffix = isMonthly ? '/month' : '';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const updateDonor = (field, value) => {
    setDonor((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const found = {};
    const pan = donor.pan.trim();
    if (amount < minAmount) found.amount = `Minimum amount ${money(minAmount)}`;
    if (!donor.name.trim()) found.name = 'Please enter your full name.';
    if (!donor.email.trim()) {
      found.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(donor.email)) {
      found.email = 'Please enter a valid email.';
    }
    if (!donor.phone.trim()) {
      found.phone = 'Please enter your mobile number.';
    } else if (intl ? !/^[0-9]{6,14}$/.test(donor.phone) : !/^[0-9]{10}$/.test(donor.phone)) {
      found.phone = intl ? 'Please enter your mobile number (digits only, without the country code).' : 'Please enter your 10-digit mobile number.';
    }
    if (intl && !/^\+[0-9]{1,4}$/.test(donor.dial)) found.phone = 'Please check the country code (e.g. +44).';
    if (panRequired && !pan) {
      found.pan = `PAN is mandatory for donations of ${fmt(PAN_REQUIRED_FROM)} or more.`;
    } else if (pan && !PAN_PATTERN.test(pan)) {
      found.pan = 'Please enter a valid 10-character PAN (e.g. ABCDE1234F).';
    }
    return found;
  };

  const handleContinue = () => {
    const found = validate();
    setErrors(found);
    const firstInvalid = ['amount', 'name', 'email', 'phone', 'pan'].find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`dc-${firstInvalid}`)?.focus();
      return;
    }
    // On a campaign with an offer (one-time gifts), the offer shows first; its answer leads on to payment.
    if (offer && !isMonthly) {
      setExtraChoice(null);
      setOfferOpen(true);
      return;
    }
    setExtraChoice(null);
    setStep('payment');
  };

  // Monthly giving runs on the live site's page for now (UPI AutoPay / card mandates).
  const monthlyLink = () => {
    const own = campaign.slug && campaign.slug !== 'general' ? LIVE_SLUG[campaign.testOf || campaign.slug] || campaign.testOf || campaign.slug : '';
    const slug = own ? `/${own}` : '';
    const params = new URLSearchParams({ type: 'monthly', ...readStoredUtm() });
    return `https://www.sikhaid.ngo/donate${slug}?${params.toString()}`;
  };

  const handlePay = () => {
    if (paying) return;
    if (isMonthly) {
      window.location.assign(monthlyLink());
      return;
    }
    payNow();
  };

  const chooseOffer = (accepted) => {
    setExtraChoice({ offer: offer.offer, accepted, qty: accepted ? offerQty : 0 });
    setOfferOpen(false);
    setStep('payment');
  };

  const payNow = async () => {
    if (paying) return;
    // What the donor added on top (recorded either way, so the admin sees opt-ins and opt-outs).
    const extra = extraChoice && { ...extraChoice, unitPrice: EXTRA_UNIT_PRICE, amount: extraAmount };
    const utm = readStoredUtm();
    const donorRecord = {
      name: donor.name.trim(),
      email: donor.email.trim(),
      phone: intl ? `${donor.dial} ${donor.phone}` : donor.phone,
      pan: intl ? '' : donor.pan.trim(),
    };
    // International gifts are kept in rupees for the admin's totals, with the donor's own currency alongside.
    const rate = intl ? rates[intl.code] : 1;
    const inINR = (n) => (intl ? toInr(n, intl.code, rates) : n);
    // Private code that lets this donor download their receipt and 80G certificate later.
    const downloadToken = newDownloadToken();
    const donation = {
      // Replaced by the Razorpay payment id once paid; the admin requires one to be present.
      receiptNo: 'pending',
      downloadToken,
      amount: inINR(amount),
      tipAmt: inINR(tipAmount),
      grandTotal: inINR(payTotal),
      ...(extra && { extra }),
      ...(intl && {
        international: true,
        currency: intl.code,
        foreignAmount: amount,
        foreignTip: tipAmount,
        foreignTotal: total,
        fxRate: rate,
      }),
      cause: campaign.title,
      causeSlug: campaign.slug,
      isMonthly: false,
      paymentMethod: method,
      donor: donorRecord,
      optAccount: createAccount,
      optWa: whatsappUpdates,
      utm,
    };

    setPaying(true);
    setPayError('');
    let paid;
    try {
      paid = await payDonation(donation, {
        method,
        description: campaign.title,
        color: campaign.donateColor || undefined,
      });
    } catch (e) {
      setPaying(false);
      setPayError(e instanceof PaymentCancelled ? e.message : e.message || 'Payment could not be completed. Please try again.');
      return;
    }

    const now = new Date();
    const receipt = {
      ...donation,
      receiptNo: paid.receiptNo,
      razorpayPaymentId: paid.paymentId,
      paidAt: now.toISOString(),
      date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      taxDeductible: intl ? 0 : Math.round(amount * 0.5),
    };
    try {
      sessionStorage.setItem('sa-latest-receipt', JSON.stringify(receipt));
      const history = JSON.parse(localStorage.getItem('sa_donations') || '[]');
      history.unshift(receipt);
      localStorage.setItem('sa_donations', JSON.stringify(history));
      localStorage.setItem('sa_donor_profile', JSON.stringify(donorRecord));
      localStorage.setItem('sa_donor_email', donorRecord.email);
    } catch (e) {}
    // Tells Google Tag Manager (where a page loads it) that a donation was paid: Meta "Purchase".
    try {
      window.dataLayer?.push({ event: 'purchase', donation_value: inINR(payTotal), value: inINR(payTotal), currency: 'INR', transaction_id: paid.paymentId });
    } catch (e) {}

    const query = new URLSearchParams({ receipt: paid.receiptNo, amt: String(amount), camp: campaign.title, ...(intl && { currency: intl.code }), ...utm });
    router.push(`/donate/thank-you?${query.toString()}`);
  };

  const tipLabel = `Support SikhAid (${tipPercent}%)`;

  return (
    <div className="dc-backdrop" style={donateCardStyle(campaign.donateColor, campaign.donateStyle)}>
      <div className="dc-card" role="dialog" aria-modal="true" aria-labelledby="dc-title">
        <header className="dc-head">
          <div>
            <p className="dc-towards">Donation Towards</p>
            <h2 className="dc-title" id="dc-title">{campaign.title}</h2>
            {isMonthly && (
              <p className="dc-monthly">
                Monthly donation ·{' '}
                <button type="button" onClick={() => setIsMonthly(false)}>Switch to one-time</button>
              </p>
            )}
            {campaign.donateHighlight && <p className="dc-highlight">{campaign.donateHighlight}</p>}
            {campaign.donateMessage && <p className="dc-message">{campaign.donateMessage}</p>}
          </div>
          <button type="button" className="dc-close" onClick={onClose} aria-label="Close donation card">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="dc-body">
          {step === 'details' ? (
            <>
              <section>
                <div className="dc-amount-head">
                  <h3 className="dc-h">Choose an Amount</h3>
                  {intl && (
                    <select
                      className="dc-currency"
                      aria-label="Currency"
                      value={intl.code}
                      onChange={(e) => {
                        const next = currencyOf(e.target.value);
                        setAmountText(String(next.suggested));
                        setDonor((d) => ({ ...d, dial: DIAL_CODES[next.code] }));
                        onCurrency?.(next.code);
                      }}
                    >
                      {CURRENCY_CODES.map((code) => (
                        <option key={code} value={code}>{code} · {CURRENCIES[code].name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="dc-amounts">
                  {amounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="dc-amount"
                      aria-pressed={amount === value}
                      onClick={() => {
                        setAmountText(String(value));
                        setErrors((current) => ({ ...current, amount: undefined }));
                      }}
                    >
                      {value === suggestedAmount && <span className="dc-suggested">Suggested ✨</span>}
                      {money(value)}
                    </button>
                  ))}
                </div>
                <div className={`dc-amount-input ${errors.amount ? 'has-error' : ''}`}>
                  <span aria-hidden="true">{intl ? intl.symbol.trim() : '₹'}</span>
                  <input
                    id="dc-amount"
                    type="text"
                    inputMode="numeric"
                    aria-label={intl ? `Donation amount in ${intl.code}` : 'Donation amount in rupees'}
                    placeholder="Enter amount"
                    value={amountText}
                    onChange={(e) => {
                      setAmountText(e.target.value.replace(/[^0-9]/g, ''));
                      setErrors((current) => ({ ...current, amount: undefined }));
                    }}
                  />
                </div>
                {/* The minimum isn't shown up front, only as a small note once a lower amount is typed. */}
                {errors.amount ? (
                  <p className="dc-error">{errors.amount}</p>
                ) : amountText && amount < minAmount ? (
                  <p className="dc-min-note">Minimum amount {money(minAmount)}</p>
                ) : null}
              </section>

              <div className="dc-tip-row">
                <div className="dc-tip-left">
                  <label htmlFor="dc-tip-select" className="dc-tip-label">
                    Support SikhAid:
                  </label>
                  <div className="dc-tip-dropdown-wrap">
                    <select
                      id="dc-tip-select"
                      className="dc-tip-native-select"
                      aria-label="Support SikhAid percentage"
                      value={tipPercent}
                      onChange={(e) => setTipPercent(Number(e.target.value))}
                    >
                      {TIP_SLABS.map((slab) => (
                        <option key={slab.value} value={slab.value}>
                          {slab.label}
                        </option>
                      ))}
                    </select>
                    <span className="dc-tip-badge" aria-hidden="true">
                      <span className="dc-tip-pct">
                        {tipPercent === 0 ? 'No thanks' : `${tipPercent}%`}
                      </span>
                      <svg
                        className="dc-tip-arrow"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="dc-tip-amount">
                  {money(tipAmount)}
                </div>
              </div>

              <section className="dc-details">
                <h3 className="dc-h">Donor Details</h3>
                <label className="dc-field" htmlFor="dc-name">
                  Full Name *
                  <input
                    id="dc-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter name here..."
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    value={donor.name}
                    onChange={(e) => updateDonor('name', e.target.value)}
                  />
                  {errors.name && <span className="dc-error">{errors.name}</span>}
                </label>
                <label className="dc-field" htmlFor="dc-email">
                  Email *
                  <input
                    id="dc-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter email here..."
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    value={donor.email}
                    onChange={(e) => updateDonor('email', e.target.value)}
                  />
                  {errors.email && <span className="dc-error">{errors.email}</span>}
                </label>
                <label className="dc-field" htmlFor="dc-phone">
                  Phone Number *
                  <span className="dc-phone" aria-invalid={Boolean(errors.phone)}>
                    {intl ? (
                      <input
                        className="dc-phone-dial"
                        type="text"
                        inputMode="tel"
                        aria-label="Country code"
                        maxLength={5}
                        value={donor.dial}
                        onChange={(e) => updateDonor('dial', `+${e.target.value.replace(/[^0-9]/g, '')}`)}
                      />
                    ) : (
                      <span className="dc-phone-code">+91</span>
                    )}
                    <input
                      id="dc-phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={intl ? 14 : 10}
                      placeholder="Enter number here..."
                      aria-required="true"
                      value={donor.phone}
                      onChange={(e) => updateDonor('phone', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </span>
                  {errors.phone && <span className="dc-error">{errors.phone}</span>}
                </label>
                {!intl && (
                <label className="dc-field" htmlFor="dc-pan">
                  <span className="dc-label-row">
                    PAN Number{panRequired ? ' *' : ''}
                    {panRequired ? (
                      <small style={{ color: 'var(--dc-error)' }}>Mandatory for {fmt(PAN_REQUIRED_FROM)} or more</small>
                    ) : (
                      <small style={{ color: 'var(--dc-muted)' }}>Mandatory only for {fmt(PAN_REQUIRED_FROM)}+</small>
                    )}
                  </span>
                  <input
                    id="dc-pan"
                    type="text"
                    className="dc-pan-input"
                    maxLength={10}
                    placeholder="Enter PAN number here..."
                    aria-required={panRequired}
                    aria-invalid={Boolean(errors.pan)}
                    value={donor.pan}
                    onChange={(e) => updateDonor('pan', e.target.value.toUpperCase())}
                  />
                  {errors.pan && <span className="dc-error">{errors.pan}</span>}
                </label>
                )}
                <label className="dc-check">
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                  />
                  Create my free account to track donations and download receipts
                </label>
                <label className="dc-check">
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  />
                  Send me campaign updates on WhatsApp
                </label>
              </section>
            </>
          ) : (
            <section className="dc-payment">
              <button type="button" className="dc-back" onClick={() => setStep('details')}>
                ← Back to details
              </button>
              <h3 className="dc-h">Choose a Payment Method</h3>
              <div className="dc-methods" role="radiogroup" aria-label="Payment method">
                {(intl ? INTERNATIONAL_METHODS : PAYMENT_METHODS).map(([id, name, hint]) => (
                  <button
                    key={id}
                    type="button"
                    className="dc-method"
                    role="radio"
                    aria-checked={method === id}
                    onClick={() => setMethod(id)}
                  >
                    <span className="dc-radio" aria-hidden="true"></span>
                    <span>
                      <b>{name}</b>
                      <small>{hint}</small>
                    </span>
                  </button>
                ))}
              </div>
              {isMonthly && (
                <p className="dc-note">
                  Monthly giving of {money(total)} is set up on our secure monthly page with UPI AutoPay or a card
                  mandate. We remind you before each debit, and you can pause or cancel any time.
                </p>
              )}
            </section>
          )}
        </div>

        <footer className="dc-foot">
          <details className="dc-summary">
            <summary>
              <span>Donation Summary</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <dl>
              <div>
                <dt>Your donation</dt>
                <dd>{money(amount)}{suffix}</dd>
              </div>
              <div>
                <dt>{tipLabel}</dt>
                <dd>{money(tipAmount)}</dd>
              </div>
              {step === 'payment' && extraAmount > 0 && (
                <div>
                  <dt>{offer?.offer === 'blanket' ? `Blankets × ${extraChoice.qty}` : `Langar × ${extraChoice.qty} (${extraChoice.qty * 8} people)`}</dt>
                  <dd>{money(extraAmount)}</dd>
                </div>
              )}
              <div className="dc-summary-total">
                <dt>Total</dt>
                <dd>{money(step === 'payment' ? payTotal : total)}{suffix}</dd>
              </div>
            </dl>
          </details>
          {payError && <p className="dc-pay-error" role="alert">{payError}</p>}
          <button
            type="button"
            className="dc-cta"
            onClick={step === 'details' ? handleContinue : handlePay}
            disabled={paying}
          >
            {step === 'details' ? 'Continue to Payment' : paying ? 'Opening secure payment…' : isMonthly ? 'Set up monthly giving' : 'Pay Securely'}
            <span className="dc-cta-total">{money(step === 'payment' ? payTotal : total)}{suffix}</span>
          </button>
          <p className="dc-protect">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z" />
              <path d="M8.5 12l2.5 2.5 4.5-4.5" />
            </svg>
            SikhAid protects your donation
          </p>
        </footer>
        {offerOpen && offer && (
          <div className="dc-offer-backdrop" role="presentation">
            <div className="dc-offer" role="dialog" aria-modal="true" aria-labelledby="dc-offer-title">
              <span className="dc-offer-emoji" aria-hidden="true">{offer.emoji}</span>
              <h3 id="dc-offer-title">{offer.title}</h3>
              <p>{offer.text}</p>
              <p className="dc-offer-each">{offer.each}</p>
              <div className="dc-offer-qty" role="group" aria-label="How many">
                <button type="button" aria-label="One less" onClick={() => setOfferQty((q) => Math.max(1, q - 1))} disabled={offerQty <= 1}>−</button>
                <output aria-live="polite">{offerQty}</output>
                <button type="button" aria-label="One more" onClick={() => setOfferQty((q) => Math.min(EXTRA_MAX_QTY, q + 1))} disabled={offerQty >= EXTRA_MAX_QTY}>+</button>
              </div>
              <p className="dc-offer-impact">{offer.impact(offerQty)} · <b>{fmt(offerQty * EXTRA_UNIT_PRICE)}</b></p>
              <button type="button" className="dc-cta" onClick={() => chooseOffer(true)}>
                Yes, add it
                <span className="dc-cta-total">{fmt(total + offerQty * EXTRA_UNIT_PRICE)}</span>
              </button>
              <button type="button" className="dc-offer-skip" onClick={() => chooseOffer(false)}>
                No thanks, continue with {fmt(total)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DonationCardHost() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSlug = slugForPath(pathname) || searchParams.get('slug');
  // Only the international page uses other currencies; ?currency=GBP picks one (ads link with it).
  const currencyParam = searchParams.get('currency')?.toUpperCase();
  const currency = pathname === INTERNATIONAL_PATH ? (isCurrency(currencyParam) ? currencyParam : 'USD') : null;
  const donateParam = searchParams.get('donate');
  const isOpen = donateParam !== null;
  const found = bySlug(donateParam) || bySlug(pageSlug) || GENERAL_FUND;
  const theme = LANDING_THEMES[pathname?.replace(/\/$/, '')];
  // ?test=1 lowers the minimum to ₹1 so the team can check payments with a small amount (e.g. ₹10).
  const testMode = searchParams.get('test') === '1';
  const themed = theme ? { ...found, ...theme } : found;
  const campaign = testMode ? { ...themed, minAmount: 1 } : themed;

  // Remember UTM tags so they survive moving between pages and reach the donation record.
  useEffect(() => {
    const incoming = {};
    UTM_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) incoming[key] = value;
    });
    if (Object.keys(incoming).length === 0) return;
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(incoming));
    } catch (e) {}
  }, [searchParams]);

  // Every link to /donate on the site opens the card instead of leaving the page.
  useEffect(() => {
    const openCard = (url, linkSlug) => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(readStoredUtm()).forEach(([key, value]) => {
        if (!params.has(key)) params.set(key, value);
      });
      const amount = url.searchParams.get('amount') || url.searchParams.get('amt');
      if (amount) params.set('amount', amount);
      if (url.hash === '#monthly' || url.searchParams.get('monthly')) params.set('monthly', '1');

      const linkCampaign = bySlug(linkSlug);
      const currentSlug = slugForPath(window.location.pathname) || params.get('slug');

      if (linkCampaign && linkCampaign.slug !== currentSlug) {
        params.delete('slug');
        params.set('donate', '1');
        router.push(`/campaigns/${linkCampaign.slug}?${params.toString()}`);
        return;
      }
      params.set('donate', bySlug(currentSlug) ? '1' : 'general');
      window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
    };

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href]');
      if (!link || link.target === '_blank') return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const match = url.pathname.match(DONATE_LINK);
      if (!match || match[1]?.toLowerCase() === 'thank-you') return;
      e.preventDefault();
      e.stopPropagation();
      openCard(url, match[1]);
    };

    // Capture phase, so this runs before Next's <Link> starts a navigation.
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [router]);

  const closeCard = () => {
    const params = new URLSearchParams(window.location.search);
    CARD_PARAMS.forEach((key) => params.delete(key));
    const query = params.toString();
    window.history.replaceState(null, '', query ? `${window.location.pathname}?${query}` : window.location.pathname);
  };

  if (!isOpen) return null;

  return (
    <DonationCard
      key={campaign.slug}
      campaign={campaign}
      initialAmount={parseInt(searchParams.get('amount') || searchParams.get('amt'), 10) || 0}
      initialMonthly={searchParams.get('monthly') === '1'}
      onClose={closeCard}
      currency={currency}
      onCurrency={(code) => {
        const params = new URLSearchParams(window.location.search);
        params.set('currency', code);
        window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
      }}
    />
  );
}

export default function DonationCardRoot() {
  return (
    <Suspense fallback={null}>
      <DonationCardHost />
    </Suspense>
  );
}
