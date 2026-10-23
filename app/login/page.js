'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [contact, setContact] = useState('');
  const [step, setStep] = useState(1);
  const [error1, setError1] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef([]);

  const handleSendCode = (e) => {
    e.preventDefault();
    const v = contact.trim();
    const ok = /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, '').length >= 10;
    setError1(!ok);
    if (!ok) return;
    setStep(2);
    setTimeout(() => {
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, 100);
  };

  const handleOtpChange = (index, value) => {
    const clean = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = clean ? clean.slice(-1) : '';
    setOtp(newOtp);

    if (clean && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    router.push('/account');
  };

  return (
    <main className="auth">
      <div className="side">
        <span className="eyebrow">Your donor account</span>
        <h2>Every gift, every receipt, in one place.</h2>
        <ul className="ticks">
          <li>
            Download 80G receipts any time, plus one annual statement
          </li>
          <li>See the impact of everything you have given</li>
          <li>Pause, change or cancel monthly giving yourself</li>
          <li>Get updates from the campaigns you support</li>
        </ul>
      </div>

      <div className="main">
        <div className="box">
          <div className="stack" style={{ gap: '8px' }}>
            <h1 style={{ fontSize: '36px' }}>Log in or sign up</h1>
            <p style={{ color: 'var(--muted)' }}>
              No password needed. We&apos;ll send a one-time code to your email
              or mobile.
            </p>
          </div>

          <button
            className="gbtn"
            type="button"
            onClick={() => router.push('/account')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A237E"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 12h8M16 8.5A5 5 0 1 0 17 12" />
            </svg>
            Continue with Google
          </button>

          <div className="or">or</div>

          {step === 1 && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={handleSendCode} noValidate>
              <label className="field" htmlFor="who">
                Email or mobile number
                <input
                  id="who"
                  type="text"
                  autoComplete="username"
                  placeholder="you@example.com or 98XXXXXXXX"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </label>

              {error1 && (
                <p
                  style={{
                    color: 'var(--red)',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  Enter a valid email or 10-digit mobile number.
                </p>
              )}

              <button className="btn btn-dark btn-lg" type="submit">
                Send code
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={handleVerify} noValidate>
              <p style={{ color: 'var(--muted)' }}>
                We sent a code to {contact}. It expires in 10 minutes.
              </p>

              <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: '6px' }}>
                  Enter the 6-digit code
                </legend>
                <div className="otp">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      id={`o${i}`}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`Digit ${i + 1}`}
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    />
                  ))}
                </div>
              </fieldset>

              <button className="btn btn-give btn-lg" type="submit">
                Verify and continue
              </button>
              <button
                className="btn btn-line"
                type="button"
                onClick={() => setStep(1)}
              >
                Use a different email or number
              </button>
            </form>
          )}

          <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
            Donated as a guest before? Use the same email or mobile and
            we&apos;ll link your past receipts automatically.
          </p>
        </div>
      </div>
    </main>
  );
}
