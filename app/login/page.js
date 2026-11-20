'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  GOOGLE_CLIENT_ID, isSignedIn, renderGoogleButton, sendLoginCode, signInWithCode, signInWithGoogle, signInWithPassword,
} from '@/lib/donor-api';

const RESEND_SECONDS = 30;

export default function LoginPage() {
  const router = useRouter();
  const googleRef = useRef(null);
  const codeRef = useRef(null);
  // Phone first: most donors give with their mobile number.
  const [mode, setMode] = useState('phone');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [wait, setWait] = useState(0);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isSignedIn()) router.replace('/account');
  }, [router]);

  useEffect(
    () =>
      renderGoogleButton(googleRef.current, async (credential) => {
        setBusy(true);
        setError('');
        try {
          await signInWithGoogle(credential);
          router.push('/account');
        } catch (e) {
          setError(e.message);
          setBusy(false);
        }
      }),
    [router]
  );

  // Countdown before another code can be asked for.
  useEffect(() => {
    if (wait <= 0) return undefined;
    const timer = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(timer);
  }, [wait]);

  const choose = (next) => {
    setMode(next);
    setError('');
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter the email you donated with.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await signInWithPassword(email.trim(), password);
      router.push('/account');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const sendCode = async (e) => {
    e?.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Please enter the mobile number you donated with.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { to } = await sendLoginCode(phone);
      setSentTo(to);
      setCode('');
      setWait(RESEND_SECONDS);
      setTimeout(() => codeRef.current?.focus(), 50);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  const submitCode = async (e) => {
    e.preventDefault();
    if (code.replace(/\D/g, '').length !== 6) {
      setError('Enter the 6-digit code from WhatsApp.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await signInWithCode(phone, code);
      router.push('/account');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const errorLine = error && <p role="alert" style={{ color: 'var(--red)', fontWeight: 700, fontSize: '14px', margin: 0 }}>{error}</p>;

  return (
    <main className="auth">
      <div className="side">
        <span className="eyebrow">Your donor account</span>
        <h2>Every gift, every receipt, in one place.</h2>
        <ul className="ticks">
          <li>Every donation you make is saved to your account automatically</li>
          <li>Download receipts and 80G certificates any time</li>
          <li>Keep your PAN and address ready for your next 80G certificate</li>
        </ul>
      </div>

      <div className="main">
        <div className="box">
          <div className="stack" style={{ gap: '8px' }}>
            <h1 style={{ fontSize: '34px' }}>Log in</h1>
            <p style={{ color: 'var(--muted)' }}>
              Your account is made automatically when you donate. Log in with the mobile number or email you donated with.
            </p>
          </div>

          {GOOGLE_CLIENT_ID && (
            <>
              <div ref={googleRef} style={{ minHeight: '44px', display: 'flex', justifyContent: 'center' }} />
              <div className="or">or</div>
            </>
          )}

          <div className="login-tabs" role="tablist" aria-label="Log in with">
            <button type="button" role="tab" aria-selected={mode === 'phone'} onClick={() => choose('phone')}>Mobile number</button>
            <button type="button" role="tab" aria-selected={mode === 'email'} onClick={() => choose('email')}>Email</button>
          </div>

          {mode === 'phone' && !sentTo && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={sendCode} noValidate>
              <label className="field" htmlFor="phone">
                Mobile number
                <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <small>We’ll send a 6-digit code to this number on WhatsApp. Add the country code if you’re outside India.</small>
              </label>
              {errorLine}
              <button className="btn btn-dark btn-lg" type="submit" disabled={busy}>
                {busy ? 'Sending…' : 'Send code on WhatsApp'}
              </button>
            </form>
          )}

          {mode === 'phone' && sentTo && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={submitCode} noValidate>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                We sent a code to <b style={{ color: 'var(--ink)' }}>{sentTo}</b> on WhatsApp.{' '}
                <button type="button" className="link-btn" onClick={() => { setSentTo(''); setCode(''); setError(''); }}>Change number</button>
              </p>
              <label className="field" htmlFor="code">
                6-digit code
                <input
                  id="code"
                  ref={codeRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="••••••"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ letterSpacing: '6px', fontSize: '20px', fontWeight: 700 }}
                />
              </label>
              {errorLine}
              <button className="btn btn-dark btn-lg" type="submit" disabled={busy}>
                {busy ? 'Logging in…' : 'Log in'}
              </button>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>
                Didn’t get it?{' '}
                {wait > 0 ? `Send again in ${wait}s` : <button type="button" className="link-btn" onClick={sendCode} disabled={busy}>Send a new code</button>}
              </p>
            </form>
          )}

          {mode === 'email' && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={submitEmail} noValidate>
              <label className="field" htmlFor="who">
                Email
                <input id="who" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="field" htmlFor="pwd">
                Password
                <input id="pwd" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              {errorLine}
              <button className="btn btn-dark btn-lg" type="submit" disabled={busy}>
                {busy ? 'Logging in…' : 'Log in'}
              </button>
              <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                No password yet? Right after you donate you are logged in automatically, and you can set a password on
                the thank-you page or in your account’s Profile tab. Or log in with your mobile number instead.
              </p>
            </form>
          )}

          <Link className="btn btn-line" href="/campaigns">Make a donation</Link>
        </div>
      </div>
    </main>
  );
}
