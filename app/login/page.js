'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [contact, setContact] = useState('');
  const [loginMode, setLoginMode] = useState('otp'); // 'otp' or 'password'
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = input email, 2 = verify otp, 3 = set password
  const [error1, setError1] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef([]);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('sa_donor_email') || localStorage.getItem('sa_auth_user');
      if (savedEmail) {
        setContact(savedEmail);
      }
    } catch (e) {}
  }, []);

  const handleSendCode = (e) => {
    e.preventDefault();
    const v = contact.trim().toLowerCase();
    const ok = /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, '').length >= 10;
    if (!ok) {
      setError1('Please enter a valid email or 10-digit mobile number.');
      return;
    }
    setError1('');

    if (loginMode === 'password') {
      const storedPwd = localStorage.getItem(`sa_user_password_${v}`);
      if (storedPwd && storedPwd === password) {
        localStorage.setItem('sa_auth_user', v);
        router.push('/account');
        return;
      } else if (!storedPwd) {
        setError1('No password found for this account yet. Please log in with OTP to set your password.');
        return;
      } else {
        setError1('Incorrect password. Please try again or use OTP.');
        return;
      }
    }

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
    const cleanContact = contact.trim().toLowerCase();
    localStorage.setItem('sa_auth_user', cleanContact);
    localStorage.setItem('sa_donor_email', cleanContact);

    // Check if password already exists
    const existingPwd = localStorage.getItem(`sa_user_password_${cleanContact}`);
    if (!existingPwd) {
      // Step 3: Allow user to create password right away
      setStep(3);
    } else {
      router.push('/account');
    }
  };

  const handleCreatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError1('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError1('Passwords do not match. Please re-enter.');
      return;
    }

    const cleanContact = contact.trim().toLowerCase();
    localStorage.setItem(`sa_user_password_${cleanContact}`, newPassword);
    localStorage.setItem('sa_auth_user', cleanContact);
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
            <h1 style={{ fontSize: '34px' }}>
              {step === 3 ? 'Create your password' : 'Log in or sign up'}
            </h1>
            <p style={{ color: 'var(--muted)' }}>
              {step === 3
                ? 'Secure your account so you can log in easily next time with either password or OTP.'
                : 'Log in with a one-time OTP sent to your email or with your account password.'}
            </p>
          </div>

          {step === 1 && (
            <>
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

              <div className="seg" role="group" aria-label="Login method" style={{ marginBottom: '14px' }}>
                <button
                  type="button"
                  aria-pressed={loginMode === 'otp'}
                  onClick={() => {
                    setLoginMode('otp');
                    setError1('');
                  }}
                >
                  Email OTP
                </button>
                <button
                  type="button"
                  aria-pressed={loginMode === 'password'}
                  onClick={() => {
                    setLoginMode('password');
                    setError1('');
                  }}
                >
                  Password
                </button>
              </div>

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

                {loginMode === 'password' && (
                  <label className="field" htmlFor="pwd">
                    Account password
                    <input
                      id="pwd"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                )}

                {error1 && (
                  <p
                    style={{
                      color: 'var(--red)',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    {error1}
                  </p>
                )}

                <button className="btn btn-dark btn-lg" type="submit">
                  {loginMode === 'password' ? 'Log in with Password' : 'Send One-Time OTP'}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={handleVerify} noValidate>
              <p style={{ color: 'var(--muted)' }}>
                We sent a 6-digit verification code to <b>{contact}</b>. It expires in 10 minutes.
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

          {step === 3 && (
            <form className="stack" style={{ gap: '14px' }} onSubmit={handleCreatePassword} noValidate>
              <div
                style={{
                  background: 'var(--indigo-soft)',
                  color: 'var(--indigo)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                }}
              >
                ✓ OTP Verified for <b>{contact}</b>. Create a password below to log in directly without OTP in the future.
              </div>

              <label className="field" htmlFor="create-pwd">
                Create password *
                <input
                  id="create-pwd"
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>

              <label className="field" htmlFor="confirm-new-pwd">
                Confirm password *
                <input
                  id="confirm-new-pwd"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>

              {error1 && (
                <p style={{ color: 'var(--red)', fontWeight: 700, fontSize: '14px' }}>
                  {error1}
                </p>
              )}

              <button className="btn btn-give btn-lg" type="submit">
                Save Password & Go to Account
              </button>
              <button
                className="btn btn-line"
                type="button"
                onClick={() => router.push('/account')}
              >
                Skip for now
              </button>
            </form>
          )}

          <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginTop: '8px' }}>
            Donated as a guest before? Use the same email or mobile and
            we&apos;ll link your past receipts automatically.
          </p>
        </div>
      </div>
    </main>
  );
}
