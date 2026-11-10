'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fmt } from '@/lib/data';
import {
  downloadDonationPdf, getAccount, isSignedIn, saveProfile, setPassword, signOut,
} from '@/lib/donor-api';

const TABS = [
  ['overview', 'Overview'],
  ['history', 'Donations & receipts'],
  ['monthly', 'Monthly giving'],
  ['profile', 'Profile'],
];

// Indian financial year (April to March): "FY 2026–27".
const fyOf = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Earlier';
  const start = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `FY ${start}–${String(start + 1).slice(-2)}`;
};
const dateText = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const initials = (name) => (name || 'SikhAid Donor').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
const MANDATE = { active: 'Active', paused: 'Paused', cancelled: 'Cancelled', pending: 'Pending setup' };

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [selectedFy, setSelectedFy] = useState('All');
  const [selectedCamp, setSelectedCamp] = useState('All');
  const [toastMsg, setToastMsg] = useState('');
  const [downloading, setDownloading] = useState('');

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    // Opened at a tab, e.g. /account#history (set after the first render).
    if (TABS.some(([id]) => id === hash)) Promise.resolve().then(() => setActiveTab(hash));
    if (!isSignedIn()) {
      router.replace('/login');
      return;
    }
    getAccount().then(setData, (e) => {
      if (e.status === 401) router.replace('/login');
      else setError(e.message);
    });
  }, [router]);

  const donations = useMemo(() => data?.donations || [], [data]);
  const donor = data?.donor;
  const years = useMemo(() => ['All', ...new Set(donations.map((d) => fyOf(d.createdAt)))], [donations]);
  const causes = useMemo(() => ['All', ...new Set(donations.map((d) => d.cause))], [donations]);
  const history = donations.filter(
    (d) => (selectedFy === 'All' || fyOf(d.createdAt) === selectedFy) && (selectedCamp === 'All' || d.cause === selectedCamp)
  );
  const monthly = donations.filter((d) => d.isMonthly);
  const oneTime = donations.filter((d) => !d.isMonthly);
  const lifetime = oneTime.reduce((s, d) => s + d.grandTotal, 0);
  const thisFy = fyOf(new Date().toISOString());
  const fyTotal = oneTime.filter((d) => fyOf(d.createdAt) === thisFy).reduce((s, d) => s + d.grandTotal, 0);
  const certCount = oneTime.filter((d) => d.has80g).length;

  const download = async (d) => {
    setDownloading(d.id);
    try {
      await downloadDonationPdf(d.id);
    } catch (e) {
      toast(e.message);
    }
    setDownloading('');
  };

  const logOut = () => {
    signOut();
    router.push('/');
  };

  if (error) {
    return (
      <main className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <p>{error}</p>
        <button type="button" className="btn btn-line" onClick={() => window.location.reload()}>Try again</button>
      </main>
    );
  }
  if (!data) {
    return <main className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>Loading your account…</main>;
  }

  const firstName = (donor.name || '').split(/\s+/)[0] || 'friend';

  return (
    <>
      <main className="wrap acc">
        <nav className="side" aria-label="Account" role="tablist">
          <div className="me">
            <span className="av">{initials(donor.name)}</span>
            <span>
              <b style={{ color: 'var(--ink)' }}>{donor.name || 'SikhAid Donor'}</b>
              <br />
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                {donor.firstDonationAt ? `Donor since ${new Date(donor.firstDonationAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}` : donor.email}
              </span>
            </span>
          </div>
          {TABS.map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
          <button type="button" onClick={logOut} style={{ color: 'var(--muted)' }}>Log out</button>
        </nav>

        <div className="stack" style={{ gap: '22px', minWidth: 0 }}>
          {activeTab === 'overview' && (
            <>
              <div className="row between">
                <div className="stack" style={{ gap: '4px' }}>
                  <span style={{ color: 'var(--muted)' }}>Sat Sri Akal,</span>
                  <h1 style={{ fontSize: 'clamp(30px, 4vw, 40px)' }}>
                    {firstName}, here’s the good you’ve done
                  </h1>
                </div>
                <Link className="btn btn-give" href="/campaigns">Donate again</Link>
              </div>

              <div className="kpis">
                <div className="kpi dark">
                  <span>Lifetime donated</span>
                  <b>{fmt(lifetime)}</b>
                  <span style={{ fontSize: '13px' }}>across {oneTime.length} donation{oneTime.length === 1 ? '' : 's'}</span>
                </div>
                <div className="kpi">
                  <span style={{ color: 'var(--muted)' }}>This year ({thisFy})</span>
                  <b>{fmt(fyTotal)}</b>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>For your tax filing</span>
                </div>
                <div className="kpi">
                  <span style={{ color: 'var(--muted)' }}>80G certificates</span>
                  <b>{certCount}</b>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Donations of {fmt(data.min80g)} or more</span>
                </div>
              </div>

              <div className="box stack" style={{ gap: '12px' }}>
                <div className="row between">
                  <h2 style={{ fontSize: '20px' }}>Recent donations</h2>
                  <button type="button" className="btn btn-line" onClick={() => setActiveTab('history')}>See all</button>
                </div>
                <DonationTable rows={donations.slice(0, 5)} onDownload={download} downloading={downloading} />
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}>Donations & receipts</h1>
              <div className="row" style={{ gap: '12px', flexWrap: 'wrap' }}>
                <label className="field" style={{ minWidth: '180px' }}>
                  Year
                  <select value={selectedFy} onChange={(e) => setSelectedFy(e.target.value)}>
                    {years.map((y) => <option key={y} value={y}>{y === 'All' ? 'All years' : y}</option>)}
                  </select>
                </label>
                <label className="field" style={{ minWidth: '220px' }}>
                  Campaign
                  <select value={selectedCamp} onChange={(e) => setSelectedCamp(e.target.value)}>
                    {causes.map((c) => <option key={c} value={c}>{c === 'All' ? 'All campaigns' : c}</option>)}
                  </select>
                </label>
              </div>
              <p style={{ color: 'var(--muted)', margin: 0 }}>
                {history.length} donation{history.length === 1 ? '' : 's'} · <b style={{ color: 'var(--ink)' }}>{fmt(history.reduce((s, d) => s + d.grandTotal, 0))}</b>
              </p>
              <div className="box">
                <DonationTable rows={history} onDownload={download} downloading={downloading} />
              </div>
            </>
          )}

          {activeTab === 'monthly' && (
            <>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}>Monthly giving</h1>
              {monthly.length === 0 ? (
                <div className="box stack" style={{ gap: '12px' }}>
                  <p style={{ margin: 0, color: 'var(--muted)' }}>You don’t have a monthly donation yet.</p>
                  <Link className="btn btn-give" href="/campaigns" style={{ alignSelf: 'flex-start' }}>Start giving monthly</Link>
                </div>
              ) : (
                <div className="box">
                  <div className="table-box">
                    <table className="data">
                      <thead>
                        <tr>
                          <th scope="col">Started</th>
                          <th scope="col">Campaign</th>
                          <th scope="col">Monthly amount</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthly.map((d) => (
                          <tr key={d.id}>
                            <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{dateText(d.createdAt)}</td>
                            <td><b style={{ color: 'var(--ink)' }}>{d.cause}</b></td>
                            <td><b>{fmt(d.grandTotal)}</b></td>
                            <td>{MANDATE[d.mandateStatus] || 'Pending setup'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: 0 }}>
                    To pause or cancel, contact us and we’ll update it the same day.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'profile' && <Profile donor={donor} onSaved={(d) => { setData((x) => ({ ...x, donor: d })); toast('Profile saved'); }} onPassword={() => { setData((x) => ({ ...x, donor: { ...x.donor, hasPassword: true } })); toast('Password saved'); }} />}
        </div>
      </main>
      {toastMsg && <div className="toast" role="status" style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: 'var(--ink)', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, zIndex: 50 }}>{toastMsg}</div>}
    </>
  );
}

function DonationTable({ rows, onDownload, downloading }) {
  if (rows.length === 0) return <p style={{ color: 'var(--muted)', margin: 0 }}>No donations to show.</p>;
  return (
    <div className="table-box">
      <table className="data">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Campaign</th>
            <th scope="col">Amount</th>
            <th scope="col">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.id}>
              <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{dateText(d.createdAt)}</td>
              <td>
                {d.causeSlug ? (
                  <Link href={`/campaigns/${d.causeSlug}`} style={{ fontWeight: 800, color: 'var(--ink)', textDecoration: 'none' }}>{d.cause}</Link>
                ) : (
                  <b style={{ color: 'var(--ink)' }}>{d.cause}</b>
                )}
                <br />
                <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{d.isMonthly ? 'Monthly' : 'One-time'} · {d.receiptNo}</span>
              </td>
              <td style={{ whiteSpace: 'nowrap' }}><b>{fmt(d.grandTotal)}</b></td>
              <td>
                {d.isMonthly ? (
                  <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Sent each month</span>
                ) : (
                  <button type="button" className="dl" onClick={() => onDownload(d)} disabled={downloading === d.id}>
                    {downloading === d.id ? 'Preparing…' : d.has80g ? 'Receipt + 80G' : 'Receipt'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Profile({ donor, onSaved, onPassword }) {
  const [form, setForm] = useState({ name: donor.name, phone: donor.phone, pan: donor.pan, address: donor.address });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [pwdError, setPwdError] = useState('');
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { donor: saved } = await saveProfile(form);
      onSaved(saved);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pwd.length < 8) return setPwdError('Password must be at least 8 characters long.');
    if (pwd !== pwd2) return setPwdError('Passwords do not match.');
    try {
      await setPassword(pwd);
      setPwd('');
      setPwd2('');
      setPwdError('');
      onPassword();
    } catch (err) {
      setPwdError(err.message);
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}>Profile</h1>
      <form className="box stack" style={{ gap: '14px' }} onSubmit={save}>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
          These details go on your receipts and 80G certificates. Your PAN is needed to claim 80G.
        </p>
        <div className="grid g2">
          <label className="field">Full name<input value={form.name || ''} onChange={(e) => set('name', e.target.value)} /></label>
          <label className="field">Email<input value={donor.email || 'Not given'} disabled /></label>
          <label className="field">Mobile<input inputMode="numeric" value={form.phone || ''} onChange={(e) => set('phone', e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} /></label>
          <label className="field">PAN<input maxLength={10} value={form.pan || ''} placeholder="ABCDE1234F" onChange={(e) => set('pan', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} /></label>
        </div>
        <label className="field">Address<textarea rows={2} value={form.address || ''} onChange={(e) => set('address', e.target.value)} /></label>
        {error && <p role="alert" style={{ color: 'var(--red)', fontWeight: 700, margin: 0 }}>{error}</p>}
        <button className="btn btn-dark" type="submit" disabled={busy} style={{ alignSelf: 'flex-start' }}>{busy ? 'Saving…' : 'Save profile'}</button>
      </form>

      <form className="box stack" style={{ gap: '14px' }} onSubmit={savePassword}>
        <h2 style={{ fontSize: '20px' }}>{donor.hasPassword ? 'Change password' : 'Set a password'}</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
          {donor.email ? `Log in with ${donor.email} and this password.` : 'Add an email to your donations to log in with a password.'}
        </p>
        <div className="grid g2">
          <label className="field">New password<input type="password" autoComplete="new-password" value={pwd} onChange={(e) => setPwd(e.target.value)} /></label>
          <label className="field">Confirm password<input type="password" autoComplete="new-password" value={pwd2} onChange={(e) => setPwd2(e.target.value)} /></label>
        </div>
        {pwdError && <p role="alert" style={{ color: 'var(--red)', fontWeight: 700, margin: 0 }}>{pwdError}</p>}
        <button className="btn btn-give" type="submit" style={{ alignSelf: 'flex-start' }}>Save password</button>
      </form>
    </>
  );
}
