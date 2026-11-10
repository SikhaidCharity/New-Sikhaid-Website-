'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { saveDonation } from '@/lib/forms';
import { bySlug, fmt } from '@/lib/data';
import './DonationCard.css';
import { donateCardStyle } from '@/lib/donate-color';

const AMOUNTS = [701, 1701, 2701, 5701];
const SUGGESTED_AMOUNT = 1701;
const MIN_AMOUNT = 100;
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

const DONATE_LINK = /^\/donate(?:\/([^/]+))?(?:\/checkout)?\/?$/i;
const CAMPAIGN_PATH = /^\/campaigns?\/([^/]+)/;

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

function DonationCard({ campaign, initialAmount, initialMonthly, onClose }) {
  const router = useRouter();
  // Each campaign can set its own amounts in the admin panel.
  const amounts = campaign.donationAmounts?.length ? campaign.donationAmounts : AMOUNTS;
  const suggestedAmount = campaign.suggestedAmount || SUGGESTED_AMOUNT;
  const minAmount = campaign.minAmount || MIN_AMOUNT;
  const startAmount = initialAmount >= minAmount ? initialAmount : suggestedAmount;

  const [step, setStep] = useState('details');
  const [amountText, setAmountText] = useState(String(startAmount));
  const [isMonthly, setIsMonthly] = useState(initialMonthly);
  const [tipPercent, setTipPercent] = useState(DEFAULT_TIP);
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', pan: '' });
  const [createAccount, setCreateAccount] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [method, setMethod] = useState('upi');
  const [errors, setErrors] = useState({});

  const amount = parseInt(amountText, 10) || 0;
  const tipFor = (percent) => Math.round((amount * percent) / 100);
  const tipAmount = tipFor(tipPercent);
  const total = amount + tipAmount;
  const panRequired = total >= PAN_REQUIRED_FROM;
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
    if (amount < minAmount) found.amount = `Please enter an amount of ${fmt(minAmount)} or more.`;
    if (!donor.name.trim()) found.name = 'Please enter your full name.';
    if (!donor.email.trim()) {
      found.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(donor.email)) {
      found.email = 'Please enter a valid email.';
    }
    if (!donor.phone.trim()) {
      found.phone = 'Please enter your mobile number.';
    } else if (!/^[0-9]{10}$/.test(donor.phone)) {
      found.phone = 'Please enter your 10-digit mobile number.';
    }
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
    setStep('payment');
  };

  const handlePay = () => {
    const now = new Date();
    const receiptNo = `SA/80G/26-27/${String(Math.floor(now.getTime() / 1000) % 1000000).padStart(6, '0')}`;
    const utm = readStoredUtm();
    const donorRecord = {
      name: donor.name.trim(),
      email: donor.email.trim(),
      phone: donor.phone,
      pan: donor.pan.trim(),
    };
    const donation = {
      receiptNo,
      // Private code that lets this donor download their receipt and 80G certificate later.
      downloadToken: newDownloadToken(),
      paidAt: now.toISOString(),
      date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      amount,
      tipAmt: tipAmount,
      grandTotal: total,
      cause: campaign.title,
      causeSlug: campaign.slug,
      isMonthly,
      paymentMethod: method,
      donor: donorRecord,
      optAccount: createAccount,
      optWa: whatsappUpdates,
      taxDeductible: Math.round(amount * 0.5),
      utm,
    };

    try {
      sessionStorage.setItem('sa-latest-receipt', JSON.stringify(donation));
      const history = JSON.parse(localStorage.getItem('sa_donations') || '[]');
      history.unshift(donation);
      localStorage.setItem('sa_donations', JSON.stringify(history));
      localStorage.setItem('sa_donor_profile', JSON.stringify(donorRecord));
      localStorage.setItem('sa_donor_email', donorRecord.email);
    } catch (e) {}
    saveDonation(donation);

    const query = new URLSearchParams({ receipt: receiptNo, amt: String(amount), camp: campaign.title, ...utm });
    router.push(`/donate/thank-you?${query.toString()}`);
  };

  const tipLabel = `Support SikhAid (${tipPercent}%)`;

  return (
    <div className="dc-backdrop" style={donateCardStyle(campaign.donateColor)}>
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
                <h3 className="dc-h">Choose an Amount</h3>
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
                      {fmt(value)}
                    </button>
                  ))}
                </div>
                <div className={`dc-amount-input ${errors.amount ? 'has-error' : ''}`}>
                  <span aria-hidden="true">₹</span>
                  <input
                    id="dc-amount"
                    type="text"
                    inputMode="numeric"
                    aria-label="Donation amount in rupees"
                    placeholder={`Minimum ${minAmount}`}
                    value={amountText}
                    onChange={(e) => {
                      setAmountText(e.target.value.replace(/[^0-9]/g, ''));
                      setErrors((current) => ({ ...current, amount: undefined }));
                    }}
                  />
                </div>
                {errors.amount && <p className="dc-error">{errors.amount}</p>}
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
                  {fmt(tipAmount)}
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
                    <span className="dc-phone-code">+91</span>
                    <input
                      id="dc-phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter number here..."
                      aria-required="true"
                      value={donor.phone}
                      onChange={(e) => updateDonor('phone', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </span>
                  {errors.phone && <span className="dc-error">{errors.phone}</span>}
                </label>
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
                {PAYMENT_METHODS.map(([id, name, hint]) => (
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
                  You are setting up a UPI AutoPay or card mandate of {fmt(total)} every month. We remind you
                  3 days before each debit, and you can pause or cancel from your account.
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
                <dd>{fmt(amount)}{suffix}</dd>
              </div>
              <div>
                <dt>{tipLabel}</dt>
                <dd>{fmt(tipAmount)}</dd>
              </div>
              <div className="dc-summary-total">
                <dt>Total</dt>
                <dd>{fmt(total)}{suffix}</dd>
              </div>
            </dl>
          </details>
          <button
            type="button"
            className="dc-cta"
            onClick={step === 'details' ? handleContinue : handlePay}
          >
            {step === 'details' ? 'Continue to Payment' : 'Pay Securely'}
            <span className="dc-cta-total">{fmt(total)}{suffix}</span>
          </button>
          <p className="dc-protect">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z" />
              <path d="M8.5 12l2.5 2.5 4.5-4.5" />
            </svg>
            SikhAid protects your donation
          </p>
        </footer>
      </div>
    </div>
  );
}

function DonationCardHost() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSlug = pathname?.match(CAMPAIGN_PATH)?.[1] || searchParams.get('slug');
  const donateParam = searchParams.get('donate');
  const isOpen = donateParam !== null;
  const campaign = bySlug(donateParam) || bySlug(pageSlug) || GENERAL_FUND;

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
      const currentSlug = window.location.pathname.match(CAMPAIGN_PATH)?.[1] || params.get('slug');

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
