'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { campaigns, TIERS, fmt, esc } from '@/lib/data';

function DonateContent() {
  const searchParams = useSearchParams();

  const options = [
    {
      slug: 'general',
      title: 'Where it’s needed most',
      short: 'the greatest need',
      type: 'flood',
      tone: '#1A237E',
      img: null,
      location: 'General fund',
    },
    ...campaigns,
  ];

  const [step, setStep] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState('general');
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
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
    try {
      const g = JSON.parse(sessionStorage.getItem('sa-gift') || 'null');
      if (g && options.some((o) => o.slug === g.slug)) {
        setSelectedSlug(g.slug);
        setAmount(g.amt);
        setIsMonthly(Boolean(g.monthly));
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
  }, []);

  const camp = options.find((o) => o.slug === selectedSlug) || options[0];
  const tiers = TIERS[camp.type] || TIERS.flood;
  const currentAmt = customAmount ? parseInt(customAmount, 10) || 100 : amount;
  const suffix = isMonthly ? '/month' : '';

  const impactText = () => {
    let best = null;
    tiers.forEach((x) => {
      if (currentAmt >= x.amt) best = x;
    });
    return best
      ? `Your ${fmt(currentAmt)}${suffix} can fund: ${best.what.charAt(0).toLowerCase() + best.what.slice(1)}.`
      : 'Every rupee helps. Thank you.';
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

        <div className="co">
          <div className="card-w">
            {step === 1 && (
              <>
                <h1 style={{ fontSize: '32px' }}>Choose your gift</h1>
                <label className="field" htmlFor="camp">
                  Cause
                  <select
                    id="camp"
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
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
                    Give once
                  </button>
                  <button
                    type="button"
                    aria-pressed={isMonthly}
                    onClick={() => setIsMonthly(true)}
                  >
                    Give monthly
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

                <label className="field" htmlFor="custom">
                  Or another amount
                  <span className="money-input">
                    <span>₹</span>
                    <input
                      id="custom"
                      type="number"
                      min="100"
                      inputMode="numeric"
                      placeholder="Minimum ₹100"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </span>
                </label>

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
                  Continue · {fmt(currentAmt)}
                  {suffix}
                </button>
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
                      placeholder="+91"
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
                    Pay {fmt(currentAmt)}
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
                  On the live site this opens the Razorpay window. Your 80G receipt
                  is generated automatically.
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
                  <Link className="btn btn-dark" href="/account#history">
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
                    Download 80G receipt
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
                        <b style={{ color: 'var(--ink)' }}>Every March:</b> one
                        consolidated annual 80G statement
                      </span>
                    </li>
                  </ol>
                </div>

                {!isMonthly && (
                  <div
                    className="panel"
                    style={{
                      background: 'var(--saffron-soft)',
                      border: '2px solid var(--saffron)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>
                      <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                        Make it monthly?
                      </b>
                      <br />
                      <span style={{ color: 'var(--muted)' }}>
                        {fmt(500)} a month keeps relief kits ready for the next
                        emergency.
                      </span>
                    </span>
                    <button
                      className="btn btn-give"
                      type="button"
                      onClick={() => {
                        setAmount(500);
                        setCustomAmount('');
                        setIsMonthly(true);
                        setStep(3);
                      }}
                    >
                      Start {fmt(500)}/month
                    </button>
                  </div>
                )}

                <Link className="more" href="/campaigns">
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
                <div className="line">
                  <span>80G deduction (50%)</span>
                  <b>{fmt(currentAmt / 2)}</b>
                </div>
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
                    }}
                  >
                    {fmt(currentAmt)}
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
              }}
            >
              <ul className="ticks">
                <li>Registered under Section 80G</li>
                <li>Receipt emailed instantly</li>
                <li>Photo updates on what you funded</li>
                <li>Pause or cancel monthly gifts anytime</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '60px 20px', textAlign: 'center' }}>
          Loading checkout...
        </div>
      }
    >
      <DonateContent />
    </Suspense>
  );
}
