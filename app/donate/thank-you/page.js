'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fmt } from '@/lib/data';
import { SITE } from '@/lib/site';
import trust from '@/lib/content/trust-80g.json';
import './receipt.css';

// As printed on the current sikhaid.ngo receipt.
const REGD_NO = '4123009581';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "10-Nov-2026 · 17:49"
function paidOn(receipt) {
  const d = receipt.paidAt ? new Date(receipt.paidAt) : null;
  if (!d || Number.isNaN(d.getTime())) return [receipt.date, receipt.time].filter(Boolean).join(' · ');
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}-${MONTHS[d.getMonth()]}-${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const lastFour = (phone) => String(phone || '').replace(/\D/g, '').slice(-4);

function ThankYouContent() {
  const searchParams = useSearchParams();

  const [receiptData, setReceiptData] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    let data = null;
    try {
      const stored = sessionStorage.getItem('sa-latest-receipt');
      if (stored) data = JSON.parse(stored);
    } catch (e) {}

    if (!data) {
      const paramAmt = parseInt(searchParams.get('amt') || searchParams.get('amount') || '2500', 10);
      data = {
        receiptNo: searchParams.get('receipt') || 'SA/80G/26-27/041829',
        paidAt: new Date().toISOString(),
        amount: paramAmt,
        grandTotal: paramAmt,
        cause: searchParams.get('camp') || searchParams.get('cause') || 'Bihar Flood Relief 2026',
        donor: { name: 'Generous Supporter', email: '', phone: '' },
      };
    }
    setReceiptData(data);
  }, [searchParams]);

  const handleSetPassword = (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match. Please re-enter.');
      return;
    }
    const email = (receiptData?.donor?.email || '').toLowerCase().trim();
    try {
      localStorage.setItem(`sa_user_password_${email}`, password);
      localStorage.setItem('sa_auth_user', email);
      localStorage.setItem('sa_donor_email', email);
      setPasswordSaved(true);
      setPasswordError('');
    } catch (e) {
      setPasswordError('Could not save password. Please try again.');
    }
  };

  if (!receiptData) {
    return (
      <div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <p>Loading your official receipt...</p>
      </div>
    );
  }

  const donor = receiptData.donor || {};
  const total = receiptData.grandTotal || receiptData.amount;
  const firstName = (donor.name || '').trim().split(/\s+/)[0] || 'friend';
  const phoneEnd = lastFour(donor.phone);
  const paymentId = receiptData.razorpayPaymentId || receiptData.receiptNo;
  const shareText = encodeURIComponent(
    `I just supported ${receiptData.cause} with SikhAid Charitable Trust. Join me in delivering life-saving relief to families in need: https://www.sikhaid.ngo/donate`
  );

  return (
    <main className="ty">
      <div className="ty-grid">
        {/* The receipt. On a phone this is the whole view, and it is what Download saves as a PDF. */}
        <section id="official-receipt" className="rcp" aria-label="Donation receipt">
          <header className="rcp-top">
            <span className="rcp-logo">
              <img src="https://www.sikhaid.ngo/sikhaidLogo.webp" alt="SikhAid" />
            </span>
            <b className="rcp-org">{trust.trustName || 'SikhAid Charitable Trust'}</b>
            <p className="rcp-regd">Regd No: {REGD_NO} · Section 80G Tax-Exempt NGO</p>
            <span className="rcp-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <h1 className="rcp-title">Donation Successful</h1>
            <p className="rcp-sub">Thank you for standing with humanity</p>
          </header>

          <div className="rcp-tear" aria-hidden="true"></div>

          <div className="rcp-body">
            <div className="rcp-amount">
              <span>Amount Paid</span>
              <b>{fmt(total)}</b>
              <small>Secured via Razorpay</small>
            </div>

            <dl className="rcp-facts">
              <div>
                <dt>Payment ID</dt>
                <dd className="rcp-mono">{paymentId}</dd>
              </div>
              <div>
                <dt>Date &amp; Time</dt>
                <dd>{paidOn(receiptData)}</dd>
              </div>
              <div>
                <dt>Donor</dt>
                <dd>
                  {donor.name || 'Anonymous'}
                  {phoneEnd && <span className="rcp-phone">•••• {phoneEnd}</span>}
                </dd>
              </div>
              <div>
                <dt>Cause / Campaign</dt>
                <dd>{receiptData.cause}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{receiptData.isMonthly ? 'Monthly Donation' : 'One-Time Donation'}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>Secure Online</dd>
              </div>
            </dl>

            <p className="rcp-note">
              For 80G certificate call/WhatsApp {SITE.phone} — receipt will be sent.
            </p>
          </div>

          <div className="rcp-tear" aria-hidden="true"></div>

          <footer className="rcp-foot">
            <b>sikhaid.ngo · Regd NGO · 80G Exempt</b>
            <small>This is a system-generated official receipt. No physical signature required.</small>
          </footer>
        </section>

        <div className="ty-side">
        <aside className="ty-panel">
          <h2>Thank you, {firstName}! 🙏</h2>
          <p>
            Your contribution of <b>{fmt(total)}</b> has been received. Your support funds food security,
            medical camps, and disaster relief across India.
          </p>
          <div className="ty-impact">Your support saves lives and brings hope to families.</div>

          <button type="button" className="ty-btn ty-btn-navy" onClick={() => window.print()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Official Receipt
          </button>
          <a className="ty-btn ty-btn-orange" href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer">
            Share Your Impact
          </a>
          <div className="ty-pair">
            <Link className="ty-btn ty-btn-line" href={receiptData.causeSlug ? `/campaigns/${receiptData.causeSlug}?donate=1` : '/campaigns?donate=general'}>
              Donate Again
            </Link>
            <Link className="ty-btn ty-btn-line" href="/">
              Back to Home
            </Link>
          </div>
        </aside>

          {/* For donors who ticked "Create my free account" */}
          {receiptData.optAccount === true && (
            <div className="ty-account">
              <h2>Create Account Password</h2>
              <p>
                Set a password for <b>{donor.email || 'your email'}</b> to download 80G receipts and track your impact anytime.
              </p>
              {passwordSaved ? (
                <div className="ty-saved">
                  <b>✓ Password created successfully!</b>
                  <Link className="ty-mini ty-mini-give" href="/account">Go to Account</Link>
                </div>
              ) : (
                <form onSubmit={handleSetPassword} className="ty-form">
                  <div className="ty-pw">
                    <label className="field" htmlFor="new-pwd">
                      Create password *
                      <input id="new-pwd" type="password" placeholder="At least 6 characters" value={password}
                        onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                    </label>
                    <label className="field" htmlFor="confirm-pwd">
                      Confirm password *
                      <input id="confirm-pwd" type="password" placeholder="Repeat your password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                    </label>
                  </div>
                  {passwordError && <p className="ty-error">{passwordError}</p>}
                  <div className="ty-mini-row">
                    <button className="ty-mini ty-mini-give" type="submit">Save Password</button>
                    <Link className="ty-mini ty-mini-line" href="/account">Skip</Link>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>
          Loading your confirmation...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
