'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { campaigns, TIERS, CAMPAIGN_IMPACT_TIERS, fmt, esc, getFeaturedCampaignStory } from '@/lib/data';

function DonateContent({ initialSlug }) {
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
  const validInitialAmt = initialAmtParam ? parseInt(initialAmtParam, 10) || 2500 : 2500;

  const [step, setStep] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState(validInitial);
  const [amount, setAmount] = useState(validInitialAmt);
  const [customAmount, setCustomAmount] = useState('');
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
    const qAmt = searchParams.get('amount') || searchParams.get('amt');
    if (qAmt) {
      const parsed = parseInt(qAmt, 10);
      if (parsed > 0) {
        setAmount(parsed);
        setCustomAmount('');
      }
    }

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
        return;
      }
    } catch (e) {}

    const hash = window.location.hash.replace('#', '');
    if (hash === 'monthly') {
      setIsMonthly(true);
    } else if (hash === 'gift') {
      setIsGift(true);
    } else if (options.some((o) => o.slug === hash)) {
      setSelectedSlug(hash);
    }
  }, [initialSlug, searchParams]);

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
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext2 = () => {
    if (!donor.name.trim() || !donor.phone.trim() || !/\S+@\S+\.\S+/.test(donor.email)) {
      setError2('Please enter your full name, a valid email, and your mobile number.');
      return;
    }
    setError2('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePay = () => {
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <header className="co-head">
        <div className="wrap">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <span style={{ color: 'var(--saffron)' }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z" />
                </svg>
              </span>
              <img
                src="https://www.sikhaid.ngo/sikhaidLogo.webp"
                alt=""
                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              />
            </span>
            <span className="brand-name">
              <b>SikhAid</b>
              <span>Charitable Trust</span>
            </span>
          </Link>
          <span className="secure">
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
            >
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Secure checkout · Razorpay
          </span>
          <span style={{ fontSize: '14px' }}>
            Need help? <b>+91 98513 41234</b> · <Link href="/login"><b>Log in</b></Link>
          </span>
        </div>
      </header>

      <main
        className="wrap stack"
        style={{ paddingBlock: '28px 72px', gap: '22px' }}
      >
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
                >
                  <span>{step > k ? '✓' : k}</span>
                  {name}
                </li>
              );
            })}
          </ol>
        )}

        {/* FEATURED CAMPAIGN DESCRIPTION CARD (Screenshots 1 & 4 from live flow) */}
        {step === 1 && (
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

              {/* 4 Impact Cards Grid (Image 3 layout) */}
              <div className="camp-impact-grid" role="group" aria-label="Select impact tier">
                {impactCards.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`camp-impact-card ${currentAmt === item.amt && !customAmount ? 'active' : ''}`}
                    onClick={() => {
                      setAmount(item.amt);
                      setCustomAmount('');
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

                <label className="field" htmlFor="camp">
                  Choose cause
                  <select
                    id="camp"
                    value={selectedSlug}
                    onChange={(e) => {
                      const newSlug = e.target.value;
                      setSelectedSlug(newSlug);
                      if (typeof window !== 'undefined' && window.history) {
                        window.history.replaceState(null, '', `/donate/${newSlug}`);
                      }
                    }}
                  >
                    {options.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.title}
                      </option>
                    ))}
                  </select>
                </label>

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

                <div className="amt-tiles" role="group" aria-label="Amount">
                  {tiers.map((t) => (
                    <button
                      key={t.amt}
                      type="button"
                      className="amt-tile"
                      aria-pressed={t.amt === currentAmt && !customAmount}
                      onClick={() => {
                        setAmount(t.amt);
                        setCustomAmount('');
                      }}
                    >
                      <b>{fmt(t.amt)}</b>
                      <small>{t.what}</small>
                    </button>
                  ))}
                </div>

                {/* Custom Amount without scrolling or number spinners bug (Screenshot 2) */}
                <label className="field" htmlFor="custom">
                  Or another amount
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
                      }}
                    />
                  </div>
                </label>

                {/* Support SikhAid Tip Section (Screenshot 3) */}
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

                <div className="gift-box">
                  <label className="check">
                    <input
                      type="checkbox"
                      id="gift"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                    />
                    Dedicate this as a birthday gift to someone
                  </label>
                  {isGift && (
                    <div className="two">
                      <label className="field" htmlFor="gName">
                        Their name
                        <input
                          id="gName"
                          type="text"
                          autoComplete="off"
                          value={giftDetails.name}
                          onChange={(e) =>
                            setGiftDetails({
                              ...giftDetails,
                              name: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="field" htmlFor="gContact">
                        Their email or WhatsApp
                        <input
                          id="gContact"
                          type="text"
                          value={giftDetails.contact}
                          onChange={(e) =>
                            setGiftDetails({
                              ...giftDetails,
                              contact: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="field" htmlFor="gDate">
                        Send the card on
                        <input
                          id="gDate"
                          type="date"
                          value={giftDetails.date}
                          onChange={(e) =>
                            setGiftDetails({
                              ...giftDetails,
                              date: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label className="field" htmlFor="gMsg">
                        Your message
                        <input
                          id="gMsg"
                          type="text"
                          placeholder="Happy birthday!"
                          value={giftDetails.msg}
                          onChange={(e) =>
                            setGiftDetails({
                              ...giftDetails,
                              msg: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>

                {error1 && (
                  <p className="err">Please choose an amount of ₹100 or more.</p>
                )}

                <button
                  className="btn btn-give btn-lg btn-block"
                  type="button"
                  onClick={handleNext1}
                >
                  Continue · {fmt(grandTotal)}
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
                  <label className="field" htmlFor="city">
                    City
                    <input
                      id="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Your city"
                      value={donor.city}
                      onChange={(e) =>
                        setDonor({ ...donor, city: e.target.value })
                      }
                    />
                  </label>
                  <label className="field" htmlFor="pan">
                    PAN <small>Needed to claim 80G</small>
                    <input
                      id="pan"
                      type="text"
                      placeholder="ABCDE1234F"
                      style={{ textTransform: 'uppercase' }}
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
                    Create my free account to track donations and download
                    receipts
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={optWall}
                      onChange={(e) => setOptWall(e.target.checked)}
                    />
                    Show my first name and city on the live donor feed
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
                    onClick={() => setStep(1)}
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
          {/* Section 1: Choose Your Impact */}
          <section aria-labelledby="choose-impact-h">
            <div className="extra-sec-head">
              <h2 id="choose-impact-h">Choose Your Impact</h2>
              <p>Every contribution funds verifiable, transparent grassroots relief</p>
            </div>
            <div className="impact-options-grid">
              <div className="impact-fund-box">
                <div className="impact-fund-head">
                  <div className="impact-fund-icon" style={{ background: '#FFF4E5', color: '#D97706' }}>
                    🧡
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)' }}>General Relief Fund</h3>
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Rapid Emergency Response</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Support our comprehensive humanitarian work across India. This fund allows us to respond quickly to emergencies and maintain ongoing community relief operations.
                </p>
                <div className="impact-fund-buttons">
                  <button
                    type="button"
                    className="impact-btn"
                    onClick={() => {
                      setSelectedSlug('general');
                      setAmount(1000);
                      setCustomAmount('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <b>₹1,000</b>
                    <span>Monthly impact donor</span>
                  </button>
                  <button
                    type="button"
                    className="impact-btn"
                    onClick={() => {
                      setSelectedSlug('general');
                      setAmount(5000);
                      setCustomAmount('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <b>₹5,000</b>
                    <span>Community supporter</span>
                  </button>
                </div>
              </div>

              <div className="impact-fund-box">
                <div className="impact-fund-head">
                  <div className="impact-fund-icon" style={{ background: '#EEF2FF', color: '#2563EB' }}>
                    🛡️
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)' }}>Campaign Support</h3>
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Targeted Ground Missions</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '14.5px', lineHeight: 1.6 }}>
                  Support specific campaigns like Langar Sewa, Health on Wheels, Blanket Distribution, and disaster flood relief across Odisha, Assam, Bihar, and Nepal.
                </p>
                <div className="impact-fund-buttons">
                  <button
                    type="button"
                    className="impact-btn"
                    onClick={() => {
                      setAmount(2000);
                      setCustomAmount('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <b>₹2,000</b>
                    <span>Campaign contributor</span>
                  </button>
                  <button
                    type="button"
                    className="impact-btn"
                    onClick={() => {
                      setAmount(10000);
                      setCustomAmount('');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <b>₹10,000</b>
                    <span>Major sponsor</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: How to Donate (Simple Steps) */}
          <section aria-labelledby="how-steps-h">
            <div className="how-to-donate-card">
              <h2 id="how-steps-h" style={{ fontSize: '28px', textAlign: 'center', fontWeight: 800 }}>
                Simple Steps to Support
              </h2>
              <div className="how-steps-list">
                <div className="how-step-item">
                  <span className="how-step-num">1</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Choose Your Amount</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Select a predefined impact tier or enter any custom contribution.</p>
                  </div>
                </div>
                <div className="how-step-item">
                  <span className="how-step-num">2</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Instant Online Payment</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Pay securely via UPI (GPay, PhonePe, Paytm), Cards, Net Banking, or Wallets.</p>
                  </div>
                </div>
                <div className="how-step-item">
                  <span className="how-step-num">3</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Instant 80G Tax Receipt</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Your digital tax deduction certificate is generated and emailed immediately.</p>
                  </div>
                </div>
                <div className="how-step-item">
                  <span className="how-step-num">4</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Track Your Impact</h3>
                    <p style={{ fontSize: '14px', color: '#E0E7FF' }}>Receive photo updates and milestone reports showing exactly how your seva helped.</p>
                  </div>
                </div>
              </div>
              <div className="tax-deduct-badge">
                <p style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>100% Tax Deductible</p>
                <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0 }}>
                  Donations qualify for 50% deduction under Section 80G of the Indian Income Tax Act.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Your Impact in Action */}
          <section aria-labelledby="action-h">
            <div className="extra-sec-head">
              <h2 id="action-h">Your Impact in Action</h2>
              <p>Grassroots outcomes made possible by generous supporters like you</p>
            </div>
            <div className="hero-stats" style={{ margin: '0 auto 36px', maxWidth: '780px' }}>
              <div>
                <b>2,000+</b>
                Families Supported
              </div>
              <div>
                <b>50,000+</b>
                Meals Distributed
              </div>
              <div>
                <b>15</b>
                Emergency Shelters
              </div>
            </div>

            <div className="stories-cards-grid">
              <div className="story-card-item">
                <p>
                  &ldquo;Thanks to the emergency food packets from Sikh Aid, my family survived the first week after our house was flooded. We had lost everything, but you gave us hope.&rdquo;
                </p>
                <cite>— Gurpreet Kaur, Flood Victim from Ludhiana</cite>
              </div>
              <div className="story-card-item">
                <p>
                  &ldquo;The mobile medical unit reached our village when no other help was available. They treated my elderly father&apos;s diabetes when we had no access to medicines.&rdquo;
                </p>
                <cite>— Harpreet Singh, Village Dhakoli</cite>
              </div>
            </div>
          </section>

          {/* Section 4: Complete Transparency & Why Trust Sikh Aid */}
          <section aria-labelledby="transparency-h">
            <div className="extra-sec-head">
              <h2 id="transparency-h">Complete Transparency</h2>
              <p>Why thousands of donors across India place their trust in SikhAid</p>
            </div>
            <div className="trust-points-grid">
              <div className="trust-point-card">
                <div className="trust-point-icon">🛡️</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>100% Direct Relief</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    Every single rupee goes directly into relief material, nutritious meals, and rescue kits on the ground.
                  </p>
                </div>
              </div>

              <div className="trust-point-card">
                <div className="trust-point-icon">📜</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>80G Tax Benefits</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    All donations qualify for 50% tax deductions under Section 80G with instant receipt generation.
                  </p>
                </div>
              </div>

              <div className="trust-point-card">
                <div className="trust-point-icon">📸</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>Regular Photo Updates</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    Receive verified on-ground photos and utilisation statements for each response you back.
                  </p>
                </div>
              </div>

              <div className="trust-point-card">
                <div className="trust-point-icon">🤝</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>Established Trust</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    Serving communities across India since 2020 with audited financials and 100% compliance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Need Help with Your Donation? */}
          <section className="help-donate-banner" aria-label="Donation assistance">
            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>Need Help with Your Donation?</h2>
            <p style={{ fontSize: '16px', color: '#D5DBEE', maxWidth: '58ch', margin: 0 }}>
              Our donor care team is available to assist you with UPI, wire transfers, 80G receipts, or CSR partnerships.
            </p>
            <div className="help-donate-btns">
              <Link className="btn btn-light" href="/get-involved">
                Contact Support Team
              </Link>
              <a className="btn btn-line" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }} href="tel:+919851341234">
                Call +91 98513 41234
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default function DonatePage({ initialSlug }) {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '60px 20px', textAlign: 'center' }}>
          Loading checkout...
        </div>
      }
    >
      <DonateContent initialSlug={initialSlug} />
    </Suspense>
  );
}
