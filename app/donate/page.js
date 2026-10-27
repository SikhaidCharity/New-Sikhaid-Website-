'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { campaigns, TIERS, CAMPAIGN_IMPACT_TIERS, fmt, esc, getFeaturedCampaignStory } from '@/lib/data';

function DonateContent({ initialSlug, isCheckoutPage = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options = [
    {
      slug: 'general',
      title: 'Where it’s needed most',
      short: 'the greatest need',
      subtitle: 'General Relief Fund: Fast Response to Sudden Humanitarian Crises',
      tagText: 'Rapid Humanitarian Relief Fund',
      type: 'flood',
      tone: '#1A237E',
      img: null,
      location: 'General fund',
      blurb: 'Support our comprehensive humanitarian work across India. This fund allows us to respond quickly to emergencies.',
      story: [
        'Support our comprehensive humanitarian work across India. The General Relief Fund allows our volunteers to respond within 24 hours to sudden flash floods, landslides, and rural crises.',
        'Your contribution provides emergency dry ration kits, freshly cooked langar meals, clean drinking water, temporary shelter, and mobile healthcare wherever the need is greatest.',
        '100% transparent allocation ensures your kindness immediately transforms into life-saving seva on the ground.'
      ],
    },
    ...campaigns,
  ];

  const paramSlug = searchParams.get('slug') || searchParams.get('campaign');
  const targetSlug = initialSlug || paramSlug;
  const validInitial = options.some((o) => o.slug === targetSlug) ? targetSlug : 'general';

  const initialAmtParam = searchParams.get('amount') || searchParams.get('amt');
  const validInitialAmt = initialAmtParam ? parseInt(initialAmtParam, 10) || 500 : 500;

  const [step, setStep] = useState(isCheckoutPage ? 2 : 1);
  const [selectedSlug, setSelectedSlug] = useState(validInitial);
  const [amount, setAmount] = useState(validInitialAmt);
  const [customAmount, setCustomAmount] = useState(String(validInitialAmt || 500));
  const [isMonthly, setIsMonthly] = useState(false);
  const [tipPct, setTipPct] = useState(12); // Default to 12% matching SikhAid live flow

  const [isGift, setIsGift] = useState(false);
  const [giftDetails, setGiftDetails] = useState({
    name: '',
    contact: '',
    date: '',
    msg: '',
  });

  const [donor, setDonor] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    pan: '',
    dob: '',
  });

  const [optAccount, setOptAccount] = useState(true);
  const [optWall, setOptWall] = useState(true);
  const [optWa, setOptWa] = useState(true);

  const [method, setMethod] = useState('upi');
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState('');

  useEffect(() => {
    if (isCheckoutPage) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [isCheckoutPage]);

  useEffect(() => {
    const qAmt = searchParams.get('amount') || searchParams.get('amt');
    if (qAmt) {
      const parsed = parseInt(qAmt, 10);
      if (parsed > 0) {
        setAmount(parsed);
        setCustomAmount(String(parsed));
      }
    }
    const qMonthly = searchParams.get('monthly');
    if (qMonthly !== null) {
      setIsMonthly(qMonthly === '1' || qMonthly === 'true');
    }
    const qTip = searchParams.get('tip');
    if (qTip !== null) {
      setTipPct(parseInt(qTip, 10) || 0);
    }

    try {
      const pref = JSON.parse(sessionStorage.getItem('sa-checkout-pref') || 'null');
      if (pref) {
        if (!qAmt && pref.amount) {
          setAmount(pref.amount);
          setCustomAmount(String(pref.amount));
        }
        if (qMonthly === null && pref.isMonthly !== undefined) setIsMonthly(pref.isMonthly);
        if (qTip === null && pref.tipPct !== undefined) setTipPct(pref.tipPct);
        if (pref.customAmount) setCustomAmount(pref.customAmount);
      }
    } catch (e) {}

    if (initialSlug && options.some((o) => o.slug === initialSlug)) {
      setSelectedSlug(initialSlug);
      return;
    }
    const qSlug = searchParams.get('slug') || searchParams.get('campaign');
    if (qSlug && options.some((o) => o.slug === qSlug)) {
      setSelectedSlug(qSlug);
      return;
    }
    try {
      const g = JSON.parse(sessionStorage.getItem('sa-gift') || 'null');
      if (g && options.some((o) => o.slug === g.slug)) {
        setSelectedSlug(g.slug);
        if (g.amt) setAmount(g.amt);
        if (g.monthly !== undefined) setIsMonthly(Boolean(g.monthly));
        sessionStorage.removeItem('sa-gift');
        return;
      }
    } catch (e) {}

    const syncFromHash = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      if (hash === 'monthly') {
        setIsMonthly(true);
      } else if (hash === 'gift') {
        setIsGift(true);
      } else if (options.some((o) => o.slug === hash)) {
        setSelectedSlug(hash);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [initialSlug, searchParams, isCheckoutPage]);

  const camp = options.find((o) => o.slug === selectedSlug) || options[0];
  const tiers = TIERS[camp.slug] || TIERS[camp.type] || TIERS.flood;
  const impactCards = CAMPAIGN_IMPACT_TIERS[camp.slug] || CAMPAIGN_IMPACT_TIERS[camp.type] || CAMPAIGN_IMPACT_TIERS.flood;

  const currentAmt = customAmount ? parseInt(customAmount, 10) || 0 : amount;
  const suffix = isMonthly ? '/month' : '';
  const tipAmt = Math.round((currentAmt * tipPct) / 100);
  const grandTotal = currentAmt + tipAmt;

  const impactText = () => {
    let best = null;
    tiers.forEach((x) => {
      if (currentAmt >= x.amt) best = x;
    });
    return best
      ? `Your ${fmt(currentAmt)}${suffix} can fund: ${best.what.charAt(0).toLowerCase() + best.what.slice(1)}.`
      : 'Every rupee helps. Thank you for standing with vulnerable communities.';
  };

  const handleNext1 = () => {
    if (currentAmt < 100) {
      setError1(true);
      return;
    }
    setError1(false);
    const campSlug = camp.slug || 'general';
    const checkoutPref = {
      amount: currentAmt,
      isMonthly,
      tipPct,
      customAmount,
      selectedSlug: campSlug,
    };
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('sa-checkout-pref', JSON.stringify(checkoutPref));
      } catch (e) {}
    }
    router.push(`/donate/${campSlug}/checkout`);
  };

  const handleBackToDonate = () => {
    const campSlug = camp.slug || 'general';
    router.push(`/donate/${campSlug}`);
  };

  const handleBackToCampaign = () => {
    if (camp.slug && camp.slug !== 'general') {
      router.push(`/campaign/${camp.slug}`);
    } else {
      router.push('/campaigns');
    }
  };

  const handleNext2 = () => {
    if (!donor.name.trim() || !donor.phone.trim() || !/\S+@\S+\.\S+/.test(donor.email)) {
      setError2('Please enter your full name, a valid email, and your mobile number.');
      return;
    }
    const panClean = donor.pan.trim().toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (currentAmt >= 2000) {
      if (!panClean) {
        setError2('PAN is mandatory for donations of ₹2,000 or more under Income Tax regulations (Section 80G). Please enter your 10-character PAN.');
        return;
      }
      if (!panRegex.test(panClean)) {
        setError2('Please enter a valid 10-character PAN number (e.g. ABCDE1234F).');
        return;
      }
    } else if (panClean && !panRegex.test(panClean)) {
      setError2('Please enter a valid 10-character PAN number (e.g. ABCDE1234F), or leave it empty.');
      return;
    }
    setError2('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePay = () => {
    const generatedReceipt = `SA/80G/26-27/${String(Math.floor(Date.now() / 1000) % 1000000).padStart(6, '0')}`;
    const donationPayload = {
      receiptNo: generatedReceipt,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      amount: currentAmt,
      tipAmt: tipAmt,
      grandTotal: grandTotal,
      cause: camp.title,
      causeSlug: camp.slug,
      isMonthly: isMonthly,
      paymentMethod: method,
      donor: {
        name: donor.name.trim(),
        email: donor.email.trim(),
        phone: donor.phone.trim(),
        pan: donor.pan.trim().toUpperCase(),
        dob: donor.dob,
      },
      optAccount: optAccount,
      optWa: optWa,
      taxDeductible: Math.round(currentAmt * 0.5),
    };

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('sa-latest-receipt', JSON.stringify(donationPayload));
        const existing = JSON.parse(localStorage.getItem('sa_donations') || '[]');
        existing.unshift(donationPayload);
        localStorage.setItem('sa_donations', JSON.stringify(existing));
        localStorage.setItem('sa_donor_profile', JSON.stringify(donationPayload.donor));
        localStorage.setItem('sa_donor_email', donor.email.trim());
      } catch (e) {}
      router.push(`/donate/thank-you?receipt=${encodeURIComponent(generatedReceipt)}&amt=${currentAmt}&camp=${encodeURIComponent(camp.title)}`);
    }
  };

  const receiptNo = `SA/80G/26-27/${String(Math.floor(Date.now() / 1000) % 1000000).padStart(6, '0')}`;
  const firstName = donor.name.trim().split(' ')[0] || 'friend';

  const paymentMethodLabels = {
    upi: 'UPI',
    card: 'Card',
    nb: 'Net banking',
    wallet: 'Wallet',
  };

  return (
    <>
      <header className="co-head" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: '12px' }}>
          <Link href="/" className="co-brand" aria-label="SikhAid Charitable Trust home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img
              src="https://www.sikhaid.ngo/sikhaidLogo.webp"
              alt="SikhAid Logo"
              style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span style={{ fontWeight: 900, fontSize: '18px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>SikhAid</span>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Charitable Trust</span>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              className="co-head-secure"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--green)',
                background: 'var(--green-soft)',
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span>Secure checkout · Razorpay</span>
            </span>

            <span className="co-help-text" style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
              Need help? <b style={{ color: 'var(--ink)' }}>+91 98513 41234</b>
            </span>

            <Link
              href="/login"
              className="btn btn-line"
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '999px',
                color: 'var(--ink)',
                borderColor: 'var(--line)',
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main
        className="wrap stack"
        style={{ paddingBlock: '24px 72px', gap: '18px' }}
      >
        <div>
          <button
            type="button"
            onClick={isCheckoutPage ? handleBackToDonate : handleBackToCampaign}
            className="donate-top-back-btn"
            title={isCheckoutPage ? 'Back to amount selection' : 'Back to campaign page'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {isCheckoutPage ? 'Back to donation' : 'Back to campaign'}
          </button>
        </div>

        {step < 4 && (
          <ol className="steps" id="steps" aria-label="Checkout progress">
            {['Amount', 'Your details', 'Payment'].map((name, i) => {
              const k = i + 1;
              const cls = step === k ? 'on' : step > k ? 'done' : '';
              return (
                <li
                  key={k}
                  className={cls}
                  aria-current={step === k ? 'step' : undefined}
                  style={{ cursor: k === 1 && isCheckoutPage ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (k === 1 && isCheckoutPage) {
                      handleBackToDonate();
                    }
                  }}
                  title={k === 1 && isCheckoutPage ? 'Back to amount selection' : undefined}
                >
                  <span>{step > k ? '✓' : k}</span>
                  {name}
                </li>
              );
            })}
          </ol>
        )}

        {/* FEATURED CAMPAIGN DESCRIPTION CARD (Shown on campaign donate page, not on checkout) */}
        {!isCheckoutPage && step === 1 && (
          <section className="camp-desc-card" aria-label="Campaign information">
            <div className="camp-desc-tag">
              <span className="camp-desc-tag-dot" />
              <span>
                {camp.tagText || (camp.urgent ? 'Featured Urgent Campaign' : 'Featured Humanitarian Initiative')}
              </span>
            </div>
            <div className="camp-desc-body">
              <div className="camp-desc-head">
                <div className="camp-desc-info-icon" aria-hidden="true">i</div>
                <div className="camp-desc-titles">
                  <h2>{camp.title}</h2>
                  <span className="camp-desc-sub">
                    {camp.subtitle || (camp.short ? `${camp.title}: Your Seva Can Help Someone Today` : camp.blurb)}
                  </span>
                </div>
              </div>

              <div className="camp-desc-text">
                {getFeaturedCampaignStory(camp).map((par, idx) => (
                  <p key={idx}>{par}</p>
                ))}
              </div>

              {/* 2 Impact Cards Grid (Image 1 layout: Only 500 and 1000) */}
              <div className="camp-impact-grid" role="group" aria-label="Select impact tier">
                {[
                  { amt: 500, title: '5 Warm Meals' },
                  { amt: 1000, title: 'Dry Ration Kit' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`camp-impact-card ${currentAmt === item.amt ? 'active' : ''}`}
                    onClick={() => {
                      setAmount(item.amt);
                      setCustomAmount(String(item.amt));
                    }}
                  >
                    <b className="camp-impact-amt">{fmt(item.amt)}</b>
                    <span className="camp-impact-title">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="co">
          <div className="card-w">
            {step === 1 && (
              <>
                <h1 style={{ fontSize: '30px' }}>Quick Online Payment</h1>

                <div className="seg" role="group" aria-label="Frequency">
                  <button
                    type="button"
                    aria-pressed={!isMonthly}
                    onClick={() => setIsMonthly(false)}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    aria-pressed={isMonthly}
                    onClick={() => setIsMonthly(true)}
                  >
                    Monthly
                  </button>
                </div>

                {/* Custom Amount */}
                <label className="field" htmlFor="custom">
                  Or enter custom amount
                  <div className="money-input">
                    <span>₹</span>
                    <input
                      id="custom"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Minimum ₹100"
                      value={customAmount}
                      onWheel={(e) => e.target.blur()}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/[^0-9]/g, '');
                        setCustomAmount(clean);
                        const num = parseInt(clean, 10);
                        if (num > 0) {
                          setAmount(num);
                        }
                      }}
                    />
                  </div>
                </label>

                {/* Support SikhAid Tip Section */}
                <div className="support-box">
                  <div className="support-head">
                    <div className="support-title-wrap">
                      <span className="heart-icon" aria-hidden="true">🧡</span>
                      <span className="support-title">Support SikhAid by</span>
                    </div>
                    <div className="support-select-wrap">
                      <select
                        className="support-select"
                        value={tipPct}
                        onChange={(e) => setTipPct(parseInt(e.target.value, 10) || 0)}
                        aria-label="Extra contribution to support SikhAid"
                      >
                        <option value={0}>No, thanks</option>
                        <option value={5}>5% ({fmt(Math.round(currentAmt * 0.05))})</option>
                        <option value={12}>12% ({fmt(Math.round(currentAmt * 0.12))})</option>
                        <option value={18}>18% ({fmt(Math.round(currentAmt * 0.18))})</option>
                      </select>
                    </div>
                  </div>
                </div>

                {error1 && (
                  <p className="err">Please choose an amount of ₹100 or more.</p>
                )}

                <button
                  className="btn btn-give btn-lg btn-block"
                  type="button"
                  onClick={handleNext1}
                >
                  Continue to Checkout · {fmt(grandTotal)}
                  {suffix}
                </button>

                {/* Trust list from live site */}
                <ul className="trust-list" aria-label="Donation trust signals">
                  <li className="trust-item">
                    <span>✓</span>
                    <span>Registered NGO</span>
                  </li>
                  <li className="trust-item">
                    <span>✓</span>
                    <span>80G Tax Exemption</span>
                  </li>
                  <li className="trust-item">
                    <span>✓</span>
                    <span>Secure Razorpay Payments</span>
                  </li>
                  <li className="trust-item">
                    <span>✓</span>
                    <span>Transparent Utilization Reports</span>
                  </li>
                </ul>

                <div className="payment-methods">
                  <p className="payment-methods-label">Secure payments powered by Razorpay:</p>
                  <div className="payment-pills">
                    <span className="pill">UPI</span>
                    <span className="pill">Cards</span>
                    <span className="pill">Net Banking</span>
                    <span className="pill">Wallets</span>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 style={{ fontSize: '32px' }}>Your details</h1>
                <p style={{ color: 'var(--muted)' }}>
                  We need these for your 80G receipt and to send you updates on
                  what you funded.
                </p>
                <div className="two">
                  <label className="field" htmlFor="name">
                    Full name *
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={donor.name}
                      onChange={(e) =>
                        setDonor({ ...donor, name: e.target.value })
                      }
                    />
                  </label>
                  <label className="field" htmlFor="email">
                    Email *
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={donor.email}
                      onChange={(e) =>
                        setDonor({ ...donor, email: e.target.value })
                      }
                    />
                  </label>
                  <label className="field" htmlFor="phone">
                    Mobile *
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={donor.phone}
                      onChange={(e) =>
                        setDonor({ ...donor, phone: e.target.value })
                      }
                    />
                  </label>
                  <label className="field" htmlFor="pan">
                    {currentAmt >= 2000 ? (
                      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>PAN * <b style={{ color: 'var(--red)', fontSize: '12px' }}>(Mandatory for ₹2,000+)</b></span>
                        <small style={{ color: 'var(--red)', fontWeight: 600 }}>Required for 80G</small>
                      </span>
                    ) : (
                      'PAN'
                    )}
                    <input
                      id="pan"
                      type="text"
                      placeholder="ABCDE1234F"
                      style={{
                        textTransform: 'uppercase',
                        borderColor: currentAmt >= 2000 && !donor.pan.trim() ? 'var(--red)' : undefined,
                      }}
                      maxLength={10}
                      value={donor.pan}
                      onChange={(e) =>
                        setDonor({ ...donor, pan: e.target.value.toUpperCase() })
                      }
                    />
                  </label>
                  <label className="field" htmlFor="dob">
                    Date of birth{' '}
                    <small>Optional: we send a birthday note on your impact</small>
                    <input
                      id="dob"
                      type="date"
                      value={donor.dob}
                      onChange={(e) =>
                        setDonor({ ...donor, dob: e.target.value })
                      }
                    />
                  </label>
                </div>

                <div
                  className="stack"
                  style={{
                    gap: '12px',
                    background: 'var(--bg-alt)',
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={optAccount}
                      onChange={(e) => setOptAccount(e.target.checked)}
                    />
                    Create my free account to track donations and download receipts
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={optWa}
                      onChange={(e) => setOptWa(e.target.checked)}
                    />
                    Send me campaign updates on WhatsApp
                  </label>
                </div>

                {error2 && <p className="err">{error2}</p>}

                <div className="row" style={{ flexWrap: 'nowrap' }}>
                  <button
                    className="btn btn-line btn-lg"
                    type="button"
                    onClick={handleBackToDonate}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-give btn-lg"
                    style={{ flex: 1 }}
                    type="button"
                    onClick={handleNext2}
                  >
                    Continue to payment
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h1 style={{ fontSize: '32px' }}>Pay securely</h1>
                <div
                  className="stack"
                  role="radiogroup"
                  aria-label="Payment method"
                  style={{ gap: '10px' }}
                >
                  {[
                    [
                      'upi',
                      'UPI',
                      'Google Pay, PhonePe, Paytm, BHIM, or scan a QR',
                    ],
                    [
                      'card',
                      'Debit or credit card',
                      'Visa, Mastercard, RuPay',
                    ],
                    ['nb', 'Net banking', 'All major Indian banks'],
                    ['wallet', 'Wallets', 'Paytm, Mobikwik and more'],
                  ].map((m) => (
                    <button
                      key={m[0]}
                      type="button"
                      className="method"
                      role="radio"
                      aria-checked={method === m[0]}
                      onClick={() => setMethod(m[0])}
                    >
                      <span className="r"></span>
                      <span>
                        <b style={{ color: 'var(--ink)' }}>{m[1]}</b>
                        <br />
                        <span
                          style={{
                            fontSize: '13.5px',
                            color: 'var(--muted)',
                          }}
                        >
                          {m[2]}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                {isMonthly && (
                  <div
                    className="note"
                    style={{
                      background: 'var(--indigo-soft)',
                      color: 'var(--indigo)',
                    }}
                  >
                    You are setting up a UPI AutoPay or card mandate of{' '}
                    {fmt(currentAmt)} every month. We remind you 3 days before each
                    debit, and you can pause or cancel from your account.
                  </div>
                )}

                <div className="row" style={{ flexWrap: 'nowrap' }}>
                  <button
                    className="btn btn-line btn-lg"
                    type="button"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-give btn-lg"
                    style={{ flex: 1 }}
                    type="button"
                    onClick={handlePay}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ verticalAlign: 'middle', marginRight: '6px' }}
                    >
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    Pay {fmt(grandTotal)}
                    {suffix}
                  </button>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--muted)',
                    textAlign: 'center',
                  }}
                >
                  🔒 Secure payment via Razorpay · Instant 80G receipt generated automatically
                </p>
              </>
            )}

            {step === 4 && (
              <>
                <div className="done-hero stack" style={{ gap: '18px' }}>
                  <span className="check-big">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>
                    Thank you, {firstName}. Your seva is on its way.
                  </h1>
                  <p className="lead">
                    {impactText()} We will show you exactly where it went.
                  </p>
                </div>

                <div className="receipt">
                  <div>
                    <span>Amount</span>
                    <b>
                      {fmt(currentAmt)}
                      {suffix}
                    </b>
                  </div>
                  <div>
                    <span>Cause</span>
                    <b>{camp.title}</b>
                  </div>
                  <div>
                    <span>Receipt no.</span>
                    <b className="num">{receiptNo}</b>
                  </div>
                  <div>
                    <span>Paid via</span>
                    <b>{paymentMethodLabels[method]}</b>
                  </div>
                </div>

                <div className="row">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') window.print();
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ verticalAlign: 'middle', marginRight: '6px' }}
                    >
                      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                    </svg>
                    Print / Download 80G receipt
                  </button>
                  <Link className="btn btn-line" href="/account#history">
                    View in account
                  </Link>
                  <a
                    className="btn"
                    style={{ background: '#1F7A4D', color: '#fff' }}
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `I just supported ${camp.title} with SikhAid. Join me: https://www.sikhaid.ngo`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share on WhatsApp
                  </a>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
                  A copy has been sent to {donor.email || 'your email'} and by SMS.
                </p>

                <div
                  className="stack"
                  style={{
                    gap: '12px',
                    borderTop: '1px solid var(--line)',
                    paddingTop: '20px',
                  }}
                >
                  <h2 style={{ fontSize: '20px' }}>What happens next</h2>
                  <ol className="next">
                    <li>
                      <i>✓</i>
                      <span>
                        <b style={{ color: 'var(--ink)' }}>Now:</b> 80G receipt
                        generated and saved to your account
                      </span>
                    </li>
                    <li>
                      <i>2</i>
                      <span>
                        <b style={{ color: 'var(--ink)' }}>Within days:</b> photo
                        updates from the ground by email
                      </span>
                    </li>
                    <li>
                      <i>3</i>
                      <span>
                        <b style={{ color: 'var(--ink)' }}>At 100% of goal:</b> a
                        milestone thank-you and utilisation report
                      </span>
                    </li>
                    <li>
                      <i>4</i>
                      <span>
                        <b style={{ color: 'var(--ink)' }}>March tax time:</b> a
                        consolidated 80G certificate covering all your gifts
                      </span>
                    </li>
                  </ol>
                </div>

                <Link
                  className="btn btn-line"
                  href="/campaigns"
                  style={{ marginTop: '12px' }}
                >
                  See other campaigns you can support →
                </Link>
              </>
            )}
          </div>

          {/* Aside summary */}
          <aside className="sum" aria-label="Donation summary">
            <div
              style={{
                background: 'var(--bg)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(18, 26, 74, 0.06)',
                border: '1px solid var(--line)',
              }}
            >
              <div id="sumPhoto">
                <Photo
                  src={camp.img}
                  tone={camp.tone}
                  alt={camp.title}
                  label={camp.location}
                />
              </div>
              <div style={{ padding: '22px' }} className="stack">
                <b
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '21px',
                    color: 'var(--ink)',
                  }}
                >
                  {camp.title}
                </b>
                <div className="line">
                  <span>Your gift</span>
                  <b>
                    {fmt(currentAmt)}
                    {suffix}
                  </b>
                </div>
                <div className="line">
                  <span>Platform fee</span>
                  <b style={{ color: 'var(--green)' }}>₹0</b>
                </div>
                {tipAmt > 0 && (
                  <div className="line">
                    <span>Support SikhAid ({tipPct}%)</span>
                    <b>{fmt(tipAmt)}</b>
                  </div>
                )}
                <div
                  className="line"
                  style={{
                    borderTop: '1px solid var(--line)',
                    paddingTop: '14px',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ color: 'var(--ink)', fontWeight: 800 }}>
                    Total today
                  </span>
                  <b
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: '28px',
                      color: 'var(--ink)',
                    }}
                  >
                    {fmt(grandTotal)}
                  </b>
                </div>
                <div className="note">{impactText()}</div>
              </div>
            </div>
            <div
              style={{
                background: 'var(--bg)',
                borderRadius: '24px',
                padding: '22px',
                border: '1px solid var(--line)',
              }}
            >
              <ul className="ticks">
                <li>Registered under Section 80G</li>
                <li>Instant receipt by email &amp; in your account</li>
                <li>100% transparent ground reports</li>
                <li>Pause or cancel monthly gifts anytime</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* ========================================================
            DONATION PAGE CONTEXT SECTIONS (From live https://www.sikhaid.ngo/donate)
            ======================================================== */}
        <div className="donate-extra-content">
          {/* How to Donate (Simple Steps) */}
          <section aria-labelledby="how-steps-h">
            <div className="how-to-donate-card">
              <h2 id="how-steps-h" style={{ fontSize: '28px', textAlign: 'center', fontWeight: 800, color: '#FFFFFF' }}>
                Simple Steps to Support
              </h2>
              <div className="how-steps-list">
                <div className="how-step-item">
                  <span className="how-step-num">1</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px', color: '#FFFFFF' }}>Choose Your Amount</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Select a predefined impact tier or enter any custom contribution.</p>
                  </div>
                </div>
                <div className="how-step-item">
                  <span className="how-step-num">2</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px', color: '#FFFFFF' }}>Instant Online Payment</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Pay securely via UPI (GPay, PhonePe, Paytm), Cards, Net Banking, or Wallets.</p>
                  </div>
                </div>
                <div className="how-step-item">
                  <span className="how-step-num">3</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px', color: '#FFFFFF' }}>Instant 80G Tax Receipt</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Your digital tax deduction certificate is generated and emailed immediately.</p>
                  </div>
                </div>
                <div className="how-step-item">
                  <span className="how-step-num">4</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px', color: '#FFFFFF' }}>Track Your Impact</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Receive photo updates and milestone reports showing exactly how your seva helped.</p>
                  </div>
                </div>
              </div>
              <div className="tax-deduct-badge">
                <p style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px', color: '#FFFFFF' }}>100% Tax Deductible</p>
                <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
                  Donations qualify for 50% deduction under Section 80G of the Indian Income Tax Act.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Need Help with Your Donation? (Image 3 fix: bright white legible text) */}
          <section className="help-donate-banner" aria-label="Donation assistance">
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>Need Help with Your Donation?</h2>
            <p style={{ fontSize: '16px', color: '#FFFFFF', maxWidth: '58ch', margin: 0, opacity: 0.95 }}>
              Our donor care team is available to assist you with UPI, wire transfers, 80G receipts, or CSR partnerships.
            </p>
            <div className="help-donate-btns">
              <Link className="btn btn-light" href="/get-involved">
                Contact Support Team
              </Link>
              <a className="btn btn-line" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.6)' }} href="tel:+919851341234">
                Call +91 98513 41234
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default function DonatePage({ initialSlug, isCheckoutPage = false }) {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '60px 20px', textAlign: 'center' }}>
          Loading checkout...
        </div>
      }
    >
      <DonateContent initialSlug={initialSlug} isCheckoutPage={isCheckoutPage} />
    </Suspense>
  );
}
