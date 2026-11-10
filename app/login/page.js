'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GOOGLE_CLIENT_ID, isSignedIn, renderGoogleButton, signInWithGoogle, signInWithPassword } from '@/lib/donor-api';

export default function LoginPage() {
  const router = useRouter();
  const googleRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const submit = async (e) => {
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
              Your account is made automatically when you donate. Log in with the email you donated with.
            </p>
          </div>

          {GOOGLE_CLIENT_ID && (
            <>
              <div ref={googleRef} style={{ minHeight: '44px', display: 'flex', justifyContent: 'center' }} />
              <div className="or">or</div>
            </>
          )}

          <form className="stack" style={{ gap: '14px' }} onSubmit={submit} noValidate>
            <label className="field" htmlFor="who">
              Email
              <input id="who" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="field" htmlFor="pwd">
              Password
              <input id="pwd" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p role="alert" style={{ color: 'var(--red)', fontWeight: 700, fontSize: '14px', margin: 0 }}>{error}</p>}
            <button className="btn btn-dark btn-lg" type="submit" disabled={busy}>
              {busy ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
            No password yet? Right after you donate you are logged in automatically, and you can set a password
            on the thank-you page or in your account’s Profile tab.
            {GOOGLE_CLIENT_ID ? ' You can also continue with Google.' : ''}
          </p>
          <Link className="btn btn-line" href="/campaigns">Make a donation</Link>
        </div>
      </div>
    </main>
  );
}
