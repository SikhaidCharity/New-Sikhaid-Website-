'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fmt } from '@/lib/data';
import './receipt.css';

const PAYMENT_LABELS = {
  upi: 'UPI',
  card: 'Debit / Credit Card',
  nb: 'Net Banking',
  wallet: 'Wallet',
};

function numberToWordsINR(num) {
  if (!num || isNaN(num)) return 'Zero Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n) {
    if (n < 20) return a[n];
    const digit = n % 10;
    return b[Math.floor(n / 10)] + (digit ? ' ' + a[digit] : ' ');
  }

  let str = '';
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = Math.floor(num / 100);
  num %= 100;

  if (crore > 0) str += inWords(crore) + 'Crore ';
  if (lakh > 0) str += inWords(lakh) + 'Lakh ';
  if (thousand > 0) str += inWords(thousand) + 'Thousand ';
  if (hundred > 0) str += inWords(hundred) + 'Hundred ';
  if (num > 0) str += inWords(num);

  return (str.trim() + ' Rupees Only').replace(/\s+/g, ' ');
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [receiptData, setReceiptData] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    let data = null;
    try {
      const stored = sessionStorage.getItem('sa-latest-receipt');
      if (stored) {
        data = JSON.parse(stored);
      }
    } catch (e) {}

    if (!data) {
      const paramReceipt = searchParams.get('receipt') || 'SA/80G/26-27/041829';
      const paramAmt = parseInt(searchParams.get('amt') || searchParams.get('amount') || '2500', 10);
      const paramCamp = searchParams.get('camp') || searchParams.get('cause') || 'Bihar Flood Relief 2026';

      data = {
        receiptNo: paramReceipt,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: paramAmt,
        grandTotal: paramAmt,
        cause: paramCamp,
        paymentMethod: 'UPI / Online Payment',
        donor: {
          name: 'Generous Supporter',
          email: 'donor@example.com',
          phone: '+91 98XXX XXXXX',
          pan: 'ABCDE1234F',
        },
        taxDeductible: Math.round(paramAmt * 0.5),
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

    const email = receiptData?.donor?.email || 'donor@example.com';
    try {
      localStorage.setItem(`sa_user_password_${email.toLowerCase().trim()}`, password);
      localStorage.setItem('sa_auth_user', email.toLowerCase().trim());
      localStorage.setItem('sa_donor_email', email.toLowerCase().trim());
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
  const donorEmail = donor.email || '';
  const total = receiptData.grandTotal || receiptData.amount;
  const shareText = encodeURIComponent(
    `I just supported ${receiptData.cause} with SikhAid Charitable Trust. Join me in delivering life-saving relief to families in need: https://www.sikhaid.ngo/donate`
  );

  return (
    <main className="wrap stack" style={{ paddingBlock: '36px 80px', gap: '28px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Success Celebration Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #070B1E 0%, #1A237E 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--green)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontSize: '32px',
            margin: '0 auto 16px',
            boxShadow: '0 0 0 8px rgba(34, 197, 94, 0.25)',
          }}
        >
          ✓
        </div>
        <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--saffron)', fontWeight: 800 }}>
          Payment Confirmed · Receipt Issued
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', margin: '8px 0 10px', color: '#FFFFFF' }}>
          Thank You, {receiptData.donor?.name || 'Kind Donor'}!
        </h1>
        <p style={{ fontSize: '16px', color: '#E0E7FF', maxWidth: '58ch', margin: '0 auto', lineHeight: 1.6 }}>
          Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh. Your generous contribution of <b>{fmt(receiptData.amount)}</b> for <b>{receiptData.cause}</b> has been received.
        </p>
      </div>

      {/* Donation receipt */}
      <section id="official-receipt" className="rc" aria-label="Donation receipt">
        <header className="rc-head">
          <div className="rc-brand">
            <span className="rc-logo">
              <img src="https://www.sikhaid.ngo/sikhaidLogo.webp" alt="SikhAid logo" />
            </span>
            <div>
              <b>SikhAid Charitable Trust</b>
              <small>Registered Public Charitable Trust</small>
              <small>Reg No: AAATS5892PF20214 · CIT(E)/80G/2021-22/A/10423</small>
            </div>
          </div>
          <div className="rc-doc">
            <span>Donation Receipt</span>
            <b>{receiptData.receiptNo}</b>
          </div>
        </header>

        <dl className="rc-meta">
          <div>
            <dt className="rc-label">Date</dt>
            <dd>{receiptData.date}</dd>
          </div>
          <div>
            <dt className="rc-label">Time</dt>
            <dd>{receiptData.time}</dd>
          </div>
          <div>
            <dt className="rc-label">Payment Mode</dt>
            <dd>{PAYMENT_LABELS[receiptData.paymentMethod] || receiptData.paymentMethod || 'Online'}</dd>
          </div>
          <div>
            <dt className="rc-label">Status</dt>
            <dd><span className="rc-status">Paid</span></dd>
          </div>
        </dl>

        <div className="rc-section">
          <span className="rc-label">Received From</span>
          <p className="rc-donor-name">{donor.name || 'Anonymous'}</p>
          <dl className="rc-donor">
            <div>
              <dt>Email</dt>
              <dd>{donor.email || 'Not provided'}</dd>
            </div>
            <div>
              <dt>Mobile</dt>
              <dd>{donor.phone ? `+91 ${donor.phone}` : 'Not provided'}</dd>
            </div>
            <div>
              <dt>PAN</dt>
              <dd>{donor.pan || 'Not provided'}</dd>
            </div>
            {donor.address && (
              <div className="rc-wide">
                <dt>Address</dt>
                <dd>{donor.address}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rc-section">
          <table className="rc-items">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col" className="rc-amt">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Donation{receiptData.isMonthly ? ' (monthly)' : ''}
                  <small>{receiptData.cause}</small>
                </td>
                <td className="rc-amt">{fmt(receiptData.amount)}</td>
              </tr>
              {receiptData.tipAmt > 0 && (
                <tr>
                  <td>Voluntary SikhAid Support</td>
                  <td className="rc-amt">{fmt(receiptData.tipAmt)}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>Total Received</td>
                <td className="rc-amt">{fmt(total)}</td>
              </tr>
            </tfoot>
          </table>
          <p className="rc-words">
            Amount in words: <b>{numberToWordsINR(total)}</b>
          </p>
        </div>

        <div className="rc-tear" aria-hidden="true"></div>
        <footer className="rc-foot">
          <b>Thank you for your seva.</b>
          <span>help@sikhaid.ngo · +91 98513 41234</span>
        </footer>
      </section>

      <div className="rc-actions">
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => window.print()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print / Save PDF Receipt
        </button>
        <a
          className="btn btn-line"
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <span>💬</span> Share on WhatsApp
        </a>
        <Link className="btn btn-line" href="/account">
          View Donor Account
        </Link>
      </div>

      {/* Account Password Creation Box, for donors who ticked "Create my free account" */}
      {receiptData.optAccount !== false && (
      <div
        className="box"
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: 'clamp(20px, 3.5vw, 32px)',
          border: '1px solid var(--line)',
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--indigo-soft)',
              color: 'var(--indigo)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            🔐
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
              Create Account Password
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--muted)', margin: 0 }}>
              Set a password for your account (<b>{donorEmail || 'your email'}</b>) so you can log in anytime with either password or OTP to download 80G receipts and track your impact.
            </p>
          </div>
        </div>

        {passwordSaved ? (
          <div
            style={{
              background: 'var(--green-soft)',
              color: 'var(--green)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <b style={{ display: 'block', fontSize: '15px' }}>✓ Password created successfully!</b>
              <span style={{ fontSize: '13.5px' }}>Your donor account is now secured. You can log in using this password anytime.</span>
            </div>
            <Link className="btn btn-give" href="/account">
              Go to Account
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '520px' }}>
            <div className="two" style={{ gap: '12px' }}>
              <label className="field" htmlFor="new-pwd">
                Create password *
                <input
                  id="new-pwd"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
              <label className="field" htmlFor="confirm-pwd">
                Confirm password *
                <input
                  id="confirm-pwd"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            {passwordError && (
              <p style={{ color: 'var(--red)', fontWeight: 700, fontSize: '13.5px', margin: 0 }}>
                {passwordError}
              </p>
            )}

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-give" type="submit">
                Save Password & Continue
              </button>
              <Link className="btn btn-line" href="/account">
                Skip to Account
              </Link>
            </div>
          </form>
        )}
      </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link className="btn btn-line" href="/campaigns">
          Explore Other Campaigns
        </Link>
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
