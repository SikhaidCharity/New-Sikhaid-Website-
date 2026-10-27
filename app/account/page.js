'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fmt } from '@/lib/data';

export default function AccountPage() {
  const gifts = [
    ['FY 2026–27', '22 Oct 2026', 'Bihar Flood Relief 2026', 2500, 'UPI', 'bihar-flood-relief-2026'],
    ['FY 2026–27', '01 Oct 2026', 'Monthly giving', 1000, 'UPI AutoPay', null],
    ['FY 2026–27', '19 Sep 2026', 'Nepal Flood Relief 2026', 5000, 'Visa ••4421', 'nepal-flood-relief-2026'],
    ['FY 2026–27', '05 Sep 2026', 'Langar Sewa', 1100, 'UPI', 'langar-sewa'],
    ['FY 2026–27', '01 Sep 2026', 'Monthly giving', 1000, 'UPI AutoPay', null],
    ['FY 2026–27', '14 Aug 2026', 'Assam Flood Relief 2026', 3400, 'RuPay ••0917', 'assam-flood-relief-2026'],
    ['FY 2025–26', '12 Mar 2026', 'Sikh Aid Health on Wheels', 5100, 'Net banking', 'sikh-aid-health-on-wheels'],
    ['FY 2025–26', '20 Dec 2025', 'Langar Sewa', 2100, 'UPI', 'langar-sewa'],
    ['FY 2024–25', '18 Nov 2024', 'Langar Sewa', 1000, 'UPI', 'langar-sewa'],
  ];

  const tabs = [
    ['overview', 'Overview'],
    ['history', 'Donations & receipts'],
    ['monthly', 'Monthly giving'],
    ['profile', 'Profile'],
  ];

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFy, setSelectedFy] = useState('FY 2026–27');
  const [selectedCamp, setSelectedCamp] = useState('All');
  const [isPaused, setIsPaused] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [profileEmail, setProfileEmail] = useState('priya@example.com');
  const [newAccPwd, setNewAccPwd] = useState('');
  const [confirmAccPwd, setConfirmAccPwd] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (tabs.some((t) => t[0] === hash)) {
      setActiveTab(hash);
    }
    try {
      const email = localStorage.getItem('sa_auth_user') || localStorage.getItem('sa_donor_email');
      if (email) setProfileEmail(email);
    } catch (e) {}
  }, []);

  const lifetimeDonated = gifts.reduce((s, g) => s + g[3], 0);
  const fyDonated = gifts
    .filter((g) => g[0] === 'FY 2026–27')
    .reduce((s, g) => s + g[3], 0);

  const years = ['FY 2026–27', 'FY 2025–26', 'FY 2024–25'];
  const campaignsList = ['All', ...new Set(gifts.map((g) => g[2]))];

  const filteredHistory = gifts.filter(
    (g) =>
      g[0] === selectedFy &&
      (selectedCamp === 'All' || g[2] === selectedCamp)
  );

  const historyTotal = filteredHistory.reduce((s, g) => s + g[3], 0);

  return (
    <>
      <main className="wrap acc">
        <nav className="side" aria-label="Account" role="tablist">
          <div className="me">
            <span className="av">PS</span>
            <span>
              <b style={{ color: 'var(--ink)' }}>Priya Sharma</b>
              <br />
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Member since Mar 2024
              </span>
            </span>
          </div>
          {tabs.map((t) => (
            <button
              key={t[0]}
              type="button"
              role="tab"
              aria-selected={activeTab === t[0]}
              onClick={() => setActiveTab(t[0])}
            >
              {t[1]}
            </button>
          ))}
          <Link
            href="/"
            style={{
              padding: '12px',
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            Log out
          </Link>
        </nav>

        <div className="stack" style={{ gap: '22px', minWidth: 0 }}>
          {activeTab === 'overview' && (
            <>
              <span className="sample">
                Example account: your real giving appears here once you log in
              </span>
              <div className="row between">
                <div className="stack" style={{ gap: '4px' }}>
                  <span style={{ color: 'var(--muted)' }}>Sat Sri Akal,</span>
                  <h1 style={{ fontSize: 'clamp(30px, 4vw, 40px)' }}>
                    Priya, here’s the good you’ve done
                  </h1>
                </div>
                <Link className="btn btn-give" href="/donate">
                  Donate again
                </Link>
              </div>

              <div className="kpis">
                <div className="kpi dark">
                  <span>Lifetime donated</span>
                  <b>{fmt(lifetimeDonated)}</b>
                  <span style={{ fontSize: '13px' }}>
                    across {gifts.length} donations
                  </span>
                </div>
                <div className="kpi">
                  <span style={{ color: 'var(--muted)' }}>Causes supported</span>
                  <b>5</b>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Floods, langar, healthcare
                  </span>
                </div>
                <div className="kpi">
                  <span style={{ color: 'var(--muted)' }}>This financial year</span>
                  <b>{fmt(fyDonated)}</b>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    {fmt(fyDonated / 2)} eligible under 80G
                  </span>
                </div>
                <div className="kpi">
                  <span style={{ color: 'var(--muted)' }}>Monthly giving</span>
                  <b style={{ color: isPaused ? 'var(--saffron-deep)' : 'var(--green)' }}>
                    {isPaused ? 'Paused' : 'Active'}
                  </b>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    {fmt(1000)} · next debit 1 Nov
                  </span>
                </div>
              </div>

              <div className="box">
                <div className="row between">
                  <h2 style={{ fontSize: '24px' }}>Your impact</h2>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Estimated from your gifts and campaign costs
                  </span>
                </div>
                <div className="imp">
                  <div>
                    <b>640</b>hot langar meals
                  </div>
                  <div>
                    <b>9</b>family relief kits
                  </div>
                  <div>
                    <b>3</b>medical camp days
                  </div>
                  <div>
                    <b>1</b>boat run to cut-off villages
                  </div>
                </div>
              </div>

              <div className="grid g2">
                <div className="box">
                  <div className="row between">
                    <h2 style={{ fontSize: '22px' }}>Recent donations</h2>
                    <button
                      className="more"
                      style={{ border: 0, background: 'none', cursor: 'pointer' }}
                      type="button"
                      onClick={() => setActiveTab('history')}
                    >
                      View all →
                    </button>
                  </div>
                  {gifts.slice(0, 4).map((g, i) => (
                    <div
                      key={i}
                      className="row"
                      style={{
                        flexWrap: 'nowrap',
                        borderBottom: '1px solid var(--line)',
                        paddingBottom: '12px',
                      }}
                    >
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <b style={{ color: 'var(--ink)' }}>{g[2]}</b>
                        <br />
                        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                          {g[1]} · {g[4]}
                        </span>
                      </span>
                      <b className="num" style={{ color: 'var(--ink)' }}>
                        {fmt(g[3])}
                      </b>
                    </div>
                  ))}
                </div>

                <div className="box">
                  <h2 style={{ fontSize: '22px' }}>From causes you support</h2>
                  <Link
                    href="/campaign#bihar-flood-relief-2026"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="eyebrow" style={{ fontSize: '12px' }}>
                      Bihar · 20 Oct
                    </span>
                    <br />
                    <b style={{ color: 'var(--ink)' }}>Second relief camp opens</b>
                  </Link>
                  <Link href="/campaign#langar-sewa" style={{ textDecoration: 'none' }}>
                    <span className="eyebrow" style={{ fontSize: '12px' }}>
                      Langar Sewa · 16 Oct
                    </span>
                    <br />
                    <b style={{ color: 'var(--ink)' }}>
                      Kitchen reaches 2,000 meals a day
                    </b>
                  </Link>
                  <div
                    style={{
                      background: 'var(--indigo-soft)',
                      borderRadius: '14px',
                      padding: '16px',
                    }}
                    className="stack"
                  >
                    <b style={{ color: 'var(--ink)' }}>Add your birthday</b>
                    <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                      We’ll send a note on your day showing what your giving
                      achieved that year.
                    </span>
                    <button
                      className="more"
                      type="button"
                      style={{
                        border: 0,
                        background: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        alignSelf: 'flex-start',
                      }}
                      onClick={() => setActiveTab('profile')}
                    >
                      Add date of birth →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <>
              <div className="row between">
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>
                  Donations &amp; receipts
                </h1>
                <div className="row">
                  <label className="field" htmlFor="fy">
                    Financial year
                    <select
                      id="fy"
                      value={selectedFy}
                      onChange={(e) => setSelectedFy(e.target.value)}
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field" htmlFor="cp">
                    Campaign
                    <select
                      id="cp"
                      value={selectedCamp}
                      onChange={(e) => setSelectedCamp(e.target.value)}
                    >
                      {campaignsList.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="statement">
                <div className="stack" style={{ gap: '4px' }}>
                  <b
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: '22px',
                      color: '#fff',
                    }}
                  >
                    Annual 80G statement · {selectedFy}
                  </b>
                  <span>
                    {filteredHistory.length} donations · {fmt(historyTotal)} total
                    · one PDF for your tax filing
                  </span>
                </div>
                <button
                  className="btn btn-give"
                  type="button"
                  onClick={() =>
                    triggerToast(
                      'Your annual statement PDF will download on the live site.'
                    )
                  }
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
                  Download statement
                </button>
              </div>

              <div className="box" style={{ padding: '8px 8px 16px' }}>
                <div className="table-box">
                  <table className="data">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Campaign</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((g, i) => (
                          <tr key={i}>
                            <td
                              style={{
                                color: 'var(--muted)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {g[1]}
                            </td>
                            <td>
                              {g[5] ? (
                                <Link
                                  href={`/campaign#${g[5]}`}
                                  style={{
                                    fontWeight: 800,
                                    color: 'var(--ink)',
                                    textDecoration: 'none',
                                  }}
                                >
                                  {g[2]}
                                  <br />
                                  <span
                                    style={{
                                      fontSize: '13px',
                                      color: 'var(--muted)',
                                    }}
                                  >
                                    See what it funded →
                                  </span>
                                </Link>
                              ) : (
                                <b style={{ color: 'var(--ink)' }}>{g[2]}</b>
                              )}
                            </td>
                            <td>
                              <b style={{ color: 'var(--ink)' }}>{fmt(g[3])}</b>
                            </td>
                            <td style={{ color: 'var(--muted)' }}>{g[4]}</td>
                            <td>
                              <button
                                className="dl"
                                type="button"
                                onClick={() =>
                                  triggerToast(
                                    'Your receipt PDF will download on the live site.'
                                  )
                                }
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
                                >
                                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                                </svg>
                                80G PDF
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ color: 'var(--muted)' }}>
                            No donations match these filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'monthly' && (
            <>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>
                Monthly giving
              </h1>
              <div className="box">
                <div
                  className="row between"
                  style={{ alignItems: 'flex-start' }}
                >
                  <div className="stack" style={{ gap: '6px' }}>
                    <div className="row" style={{ gap: '10px' }}>
                      <b style={{ fontSize: '20px', color: 'var(--ink)' }}>
                        {fmt(1000)} / month · Where it’s needed most
                      </b>
                      <span className={`pill ${isPaused ? 'off' : 'on'}`}>
                        {isPaused ? 'Paused' : 'Active'}
                      </span>
                    </div>
                    <span style={{ color: 'var(--muted)' }}>
                      {isPaused
                        ? 'Paused. No debits until you resume.'
                        : 'UPI AutoPay · next debit 1 Nov 2026 · giving since Mar 2025'}
                    </span>
                  </div>
                  <div className="row">
                    <button
                      className="btn btn-line"
                      type="button"
                      onClick={() =>
                        triggerToast(
                          'Choose a new amount on the next screen of the live site.'
                        )
                      }
                    >
                      Change amount
                    </button>
                    <button
                      className="btn btn-line"
                      type="button"
                      onClick={() => {
                        setIsPaused(!isPaused);
                        triggerToast(
                          !isPaused
                            ? 'Monthly gift paused'
                            : 'Monthly gift resumed'
                        );
                      }}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                      className="btn"
                      type="button"
                      style={{ color: 'var(--red)', background: 'none' }}
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {showCancelConfirm && (
                  <div
                    className="note"
                    style={{ background: 'var(--red-soft)', color: '#7A2F28' }}
                  >
                    Cancel your monthly gift? Relief kits for the next emergency
                    depend on monthly givers.
                    <div className="row" style={{ marginTop: '10px' }}>
                      <button
                        className="btn btn-dark"
                        type="button"
                        onClick={() => setShowCancelConfirm(false)}
                      >
                        Keep giving
                      </button>
                      <button
                        className="btn btn-line"
                        type="button"
                        onClick={() => {
                          setShowCancelConfirm(false);
                          triggerToast(
                            'Monthly gift cancelled. Thank you for your seva.'
                          );
                        }}
                      >
                        Yes, cancel
                      </button>
                    </div>
                  </div>
                )}

                <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
                  We email and SMS you 3 days before every renewal.
                </p>
              </div>

              <div className="box" style={{ background: 'var(--saffron-soft)' }}>
                <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                  Start another monthly gift
                </b>
                <span style={{ color: 'var(--muted)' }}>
                  Pick a specific campaign, like Langar Sewa or Health on Wheels.
                </span>
                <Link
                  className="btn btn-give"
                  href="/donate#monthly"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Add a monthly gift
                </Link>
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Profile</h1>
              <form
                className="box"
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerToast('Profile saved');
                }}
              >
                <div className="grid g2" style={{ gap: '14px' }}>
                  <label className="field" htmlFor="pName">
                    Full name
                    <input
                      id="pName"
                      type="text"
                      defaultValue="Priya Sharma"
                      autoComplete="name"
                    />
                  </label>
                  <label className="field" htmlFor="pEmail">
                    Email
                    <input
                      id="pEmail"
                      type="email"
                      defaultValue={profileEmail}
                      autoComplete="email"
                      onChange={(e) => setProfileEmail(e.target.value)}
                    />
                  </label>
                  <label className="field" htmlFor="pPhone">
                    Mobile
                    <input
                      id="pPhone"
                      type="tel"
                      defaultValue="+91 98XXX XXXXX"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="field" htmlFor="pPan">
                    PAN (for 80G receipts)
                    <input
                      id="pPan"
                      type="text"
                      defaultValue="ABCPS1234K"
                      style={{ textTransform: 'uppercase' }}
                      maxLength={10}
                    />
                  </label>
                  <label className="field" htmlFor="pDob">
                    Date of birth (for your birthday impact note)
                    <input id="pDob" type="date" />
                  </label>
                </div>
                <div className="stack" style={{ gap: '10px' }}>
                  <label className="check">
                    <input type="checkbox" defaultChecked />
                    Email me campaign updates
                  </label>
                  <label className="check">
                    <input type="checkbox" defaultChecked />
                    WhatsApp updates
                  </label>
                  <label className="check">
                    <input type="checkbox" />
                    Show my name on donor walls
                  </label>
                </div>
                <button
                  className="btn btn-dark"
                  type="submit"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Save changes
                </button>
              </form>

              {/* Password & Security Card (Image 5 & Flow requirement) */}
              <div className="box" style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '24px' }}>🔐</span>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                      Account Password & Security
                    </h2>
                    <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0 }}>
                      Set or update your password to log in directly without waiting for an OTP.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newAccPwd || newAccPwd.length < 6) {
                      triggerToast('Password must be at least 6 characters');
                      return;
                    }
                    if (newAccPwd !== confirmAccPwd) {
                      triggerToast('Passwords do not match');
                      return;
                    }
                    const cleanEmail = profileEmail.toLowerCase().trim();
                    localStorage.setItem(`sa_user_password_${cleanEmail}`, newAccPwd);
                    localStorage.setItem('sa_auth_user', cleanEmail);
                    triggerToast('Password saved successfully!');
                    setNewAccPwd('');
                    setConfirmAccPwd('');
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  <div className="grid g2" style={{ gap: '14px' }}>
                    <label className="field" htmlFor="new-acc-pwd">
                      New password
                      <input
                        id="new-acc-pwd"
                        type="password"
                        placeholder="At least 6 characters"
                        value={newAccPwd}
                        onChange={(e) => setNewAccPwd(e.target.value)}
                        autoComplete="new-password"
                      />
                    </label>
                    <label className="field" htmlFor="confirm-acc-pwd">
                      Confirm new password
                      <input
                        id="confirm-acc-pwd"
                        type="password"
                        placeholder="Repeat your password"
                        value={confirmAccPwd}
                        onChange={(e) => setConfirmAccPwd(e.target.value)}
                        autoComplete="new-password"
                      />
                    </label>
                  </div>
                  <button className="btn btn-dark" type="submit" style={{ alignSelf: 'flex-start' }}>
                    Update Password
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </main>

      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--ink)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '999px',
            fontWeight: 700,
            zIndex: 9999,
            boxShadow: 'var(--shadow)',
          }}
        >
          {toastMsg}
        </div>
      )}
    </>
  );
}
