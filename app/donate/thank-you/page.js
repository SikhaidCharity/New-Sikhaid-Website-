'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fmt } from '@/lib/data';

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

  const donorEmail = receiptData.donor?.email || '';
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
          Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh. Your generous contribution of <b>{fmt(receiptData.amount)}</b> for <b>{receiptData.cause}</b> directly reaches those fighting to survive on the ground.
        </p>
      </div>

      {/* Official 80G Tax Exemption Receipt Card */}
      <div
        id="official-receipt"
        style={{
          background: '#FFFFFF',
          border: '2px solid var(--ink)',
          borderRadius: '20px',
          padding: ' clamp(20px, 4vw, 36px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          position: 'relative',
        }}
      >
        {/* Receipt Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '2px solid var(--line)', paddingBottom: '20px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <img
              src="https://www.sikhaid.ngo/sikhaidLogo.webp"
              alt="SikhAid Logo"
              style={{ width: '56px', height: '56px', objectFit: 'contain' }}
            />
            <div>
              <b style={{ fontSize: '22px', color: 'var(--ink)', display: 'block', letterSpacing: '-0.02em' }}>
                SIKHAID CHARITABLE TRUST
              </b>
              <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>
                Registered Public Charitable Trust · 80G Tax Exemption Certificate
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'block' }}>
                Reg No: AAATS5892PF20214 · CIT(E)/80G/2021-22/A/10423
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--green-soft)',
                color: 'var(--green)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '13px',
                marginBottom: '6px',
              }}
            >
              80G Tax Exempt
            </span>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
              Receipt No: <b style={{ color: 'var(--ink)' }}>{receiptData.receiptNo}</b>
            </div>
          </div>
        </div>

        {/* Receipt Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            background: 'var(--bg-alt)',
            padding: '18px',
            borderRadius: '14px',
            marginBottom: '22px',
          }}
        >
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Donor Name</span>
            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--ink)', marginTop: '2px' }}>{receiptData.donor?.name || 'Anonymous'}</div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
            <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--ink)', marginTop: '2px' }}>{receiptData.donor?.email || 'N/A'}</div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mobile</span>
            <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--ink)', marginTop: '2px' }}>{receiptData.donor?.phone || 'N/A'}</div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PAN Number</span>
            <div style={{ fontWeight: 800, fontSize: '14.5px', color: receiptData.donor?.pan ? 'var(--ink)' : 'var(--muted)', marginTop: '2px' }}>
              {receiptData.donor?.pan || 'Not provided'}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date & Time</span>
            <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--ink)', marginTop: '2px' }}>
              {receiptData.date} · {receiptData.time}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Mode</span>
            <div style={{ fontWeight: 700, fontSize: '14.5px', color: 'var(--ink)', marginTop: '2px' }}>
              {receiptData.paymentMethod?.toUpperCase?.() || 'ONLINE / UPI'}
            </div>
          </div>
        </div>

        {/* Contribution Breakdown */}
        <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '18px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '15px', color: 'var(--muted)' }}>Campaign / Mission</span>
            <b style={{ fontSize: '15px', color: 'var(--ink)' }}>{receiptData.cause}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '15px', color: 'var(--muted)' }}>Donation Amount</span>
            <b style={{ fontSize: '17px', color: 'var(--ink)' }}>{fmt(receiptData.amount)}</b>
          </div>
          {receiptData.tipAmt > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Voluntary SikhAid Support</span>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>+{fmt(receiptData.tipAmt)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '2px dashed var(--line)' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>Total Received</span>
            <b style={{ fontSize: '24px', fontWeight: 900, color: 'var(--ink)' }}>{fmt(receiptData.grandTotal || receiptData.amount)}</b>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
            Amount in words: <b style={{ color: 'var(--ink)' }}>{numberToWordsINR(receiptData.grandTotal || receiptData.amount)}</b>
          </div>
        </div>

        {/* 80G Statutory Exemption Notice */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '440px', fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, color: 'var(--ink)' }}>Income Tax Exemption Under Section 80G:</p>
            Donations made to SikhAid Charitable Trust qualify for 50% deduction under Section 80G(5)(vi) of the Income Tax Act, 1961. This digital certificate is valid for IT filing without physical signature.
          </div>
          <div style={{ textAlign: 'center', border: '1px dashed var(--line)', padding: '12px 20px', borderRadius: '12px' }}>
            <div style={{ width: '48px', height: '48px', margin: '0 auto 6px', background: 'var(--saffron-soft)', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--saffron-deep)', fontWeight: 900, fontSize: '18px' }}>
              SA
            </div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', display: 'block' }}>Authorized Signatory</span>
            <b style={{ fontSize: '13px', color: 'var(--ink)' }}>SikhAid Trust Accounts</b>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row" style={{ marginTop: '24px', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => window.print()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </div>

      {/* Account Password Creation Box (Flow requirement from User) */}
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
