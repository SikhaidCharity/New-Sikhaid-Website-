'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fmt } from '@/lib/data';
import { SITE_LINKS } from '@/lib/site';
import {
  downloadDonationPdf, getAccount, isSignedIn, saveProfile, setPassword, signOut,
} from '@/lib/donor-api';

const TABS = [
  ['overview', 'Overview'],
  ['history', 'Receipts'],
  ['monthly', 'Monthly'],
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
      <main className="wrap ac-state">
        <p>{error}</p>
        <button type="button" className="btn btn-line" onClick={() => window.location.reload()}>Try again</button>
      </main>
    );
  }
  if (!data) {
    return <main className="wrap ac-state">Loading your account…</main>;
  }

  const firstName = (donor.name || '').split(/\s+/)[0] || 'friend';
  const since = donor.firstDonationAt
    ? `Donor since ${new Date(donor.firstDonationAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}`
    : '';

  return (
    <main className="ac">
      <div className="wrap ac-wrap">
        {/* Who you are, what you've given, and the two things you'd do next */}
        <header className="ac-hero">
          <div className="ac-hero-top">
            <span className="ac-avatar" aria-hidden="true">{initials(donor.name)}</span>
            <div className="ac-hello">
              <span>Sat Sri Akal,</span>
              <h1>{firstName}</h1>
              <small>{[since, donor.email].filter(Boolean).join(' · ')}</small>
            </div>
            <div className="ac-hero-acts">
              <Link className="btn btn-give" href="/campaigns">Donate again</Link>
              <button type="button" className="ac-logout" onClick={logOut}>Log out</button>
            </div>
          </div>
          <dl className="ac-stats">
            <div><dt>Total given</dt><dd>{fmt(lifetime)}</dd><small>{oneTime.length} donation{oneTime.length === 1 ? '' : 's'}</small></div>
            <div><dt>This year</dt><dd>{fmt(fyTotal)}</dd><small>{thisFy}, for your tax filing</small></div>
            <div><dt>80G certificates</dt><dd>{certCount}</dd><small>For gifts of {fmt(data.min80g)} or more</small></div>
          </dl>
        </header>

        {!donor.pan && (
          <div className="ac-note" role="note">
            <span>Add your PAN to get 80G certificates for your donations.</span>
            <button type="button" onClick={() => setActiveTab('profile')}>Add PAN</button>
          </div>
        )}

        <div className="ac-tabs" role="tablist" aria-label="Your account">
          {TABS.map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <section className="ac-card">
            <div className="ac-card-head">
              <h2>Recent donations</h2>
              {donations.length > 5 && <button type="button" className="ac-link" onClick={() => setActiveTab('history')}>See all</button>}
            </div>
            <DonationList rows={donations.slice(0, 5)} onDownload={download} downloading={downloading} />
          </section>
        )}

        {activeTab === 'history' && (
          <section className="ac-card">
            <div className="ac-card-head">
              <h2>Donations &amp; receipts</h2>
              <span className="ac-sum">{history.length} · <b>{fmt(history.reduce((s, d) => s + d.grandTotal, 0))}</b></span>
            </div>
            <div className="ac-filters">
              <label>
                <span className="sr-only">Year</span>
                <select value={selectedFy} onChange={(e) => setSelectedFy(e.target.value)}>
                  {years.map((y) => <option key={y} value={y}>{y === 'All' ? 'All years' : y}</option>)}
                </select>
              </label>
              <label>
                <span className="sr-only">Campaign</span>
                <select value={selectedCamp} onChange={(e) => setSelectedCamp(e.target.value)}>
                  {causes.map((c) => <option key={c} value={c}>{c === 'All' ? 'All campaigns' : c}</option>)}
                </select>
              </label>
            </div>
            <DonationList rows={history} onDownload={download} downloading={downloading} />
          </section>
        )}

        {activeTab === 'monthly' && (
          <section className="ac-card">
            <div className="ac-card-head"><h2>Monthly giving</h2></div>
            {monthly.length === 0 ? (
              <div className="ac-empty">
                <p>You don’t give monthly yet. A small amount every month keeps langar and relief going all year.</p>
                <Link className="btn btn-give" href="/campaigns">Start giving monthly</Link>
              </div>
            ) : (
              <>
                <ul className="ac-list">
                  {monthly.map((d) => (
                    <li key={d.id} className="ac-item">
                      <div className="ac-item-main">
                        <b>{d.cause}</b>
                        <span>Started {dateText(d.createdAt)}</span>
                      </div>
                      <div className="ac-item-end">
                        <b className="ac-amt">{fmt(d.grandTotal)}<small>/month</small></b>
                        <span className={`ac-pill ${d.mandateStatus === 'active' ? 'ok' : ''}`}>{MANDATE[d.mandateStatus] || 'Pending setup'}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="ac-hint">To pause or cancel, message us and we’ll update it the same day.</p>
              </>
            )}
          </section>
        )}

        {activeTab === 'profile' && <Profile donor={donor} onSaved={(d) => { setData((x) => ({ ...x, donor: d })); toast('Profile saved'); }} onPassword={() => { setData((x) => ({ ...x, donor: { ...x.donor, hasPassword: true } })); toast('Password saved'); }} />}

        <aside className="ac-help">
          <span>Need help with a receipt or your 80G certificate?</span>
          <a href={SITE_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          <a href={SITE_LINKS.mail}>Email us</a>
        </aside>
      </div>
      {toastMsg && <div className="ac-toast" role="status">{toastMsg}</div>}
    </main>
  );
}

// Each donation as one easy row: what, when, how much, and its receipt.
function DonationList({ rows, onDownload, downloading }) {
  if (rows.length === 0) return <p className="ac-hint">No donations to show.</p>;
  return (
    <ul className="ac-list">
      {rows.map((d) => (
        <li key={d.id} className="ac-item">
          <div className="ac-item-main">
            {d.causeSlug ? <Link href={`/campaigns/${d.causeSlug}`}>{d.cause}</Link> : <b>{d.cause}</b>}
            <span>{dateText(d.createdAt)} · {d.isMonthly ? 'Monthly' : 'One-time'}{d.receiptNo ? ` · ${d.receiptNo}` : ''}</span>
          </div>
          <div className="ac-item-end">
            <b className="ac-amt">{fmt(d.grandTotal)}</b>
            {d.isMonthly ? (
              <span className="ac-hint">Receipt sent each month</span>
            ) : (
              <button type="button" className="ac-dl" onClick={() => onDownload(d)} disabled={downloading === d.id}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                {downloading === d.id ? 'Preparing…' : d.has80g ? 'Receipt + 80G' : 'Receipt'}
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
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
      <form className="ac-card" onSubmit={save}>
        <div className="ac-card-head"><h2>Your details</h2></div>
        <p className="ac-hint">These go on your receipts and 80G certificates. Your PAN is needed to claim 80G.</p>
        <div className="ac-form">
          <label className="field">Full name<input value={form.name || ''} onChange={(e) => set('name', e.target.value)} /></label>
          <label className="field">Email<input value={donor.email || 'Not given'} disabled /></label>
          <label className="field">Mobile<input inputMode="numeric" value={form.phone || ''} onChange={(e) => set('phone', e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} /></label>
          <label className="field">PAN<input maxLength={10} value={form.pan || ''} placeholder="ABCDE1234F" onChange={(e) => set('pan', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} /></label>
          <label className="field ac-wide">Address<textarea rows={2} value={form.address || ''} onChange={(e) => set('address', e.target.value)} /></label>
        </div>
        {error && <p role="alert" className="ac-error">{error}</p>}
        <button className="btn btn-dark" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save details'}</button>
      </form>

      <form className="ac-card" onSubmit={savePassword}>
        <div className="ac-card-head"><h2>{donor.hasPassword ? 'Change password' : 'Set a password'}</h2></div>
        <p className="ac-hint">
          {donor.email ? `Log in with ${donor.email} and this password.` : 'Add an email to your donations to log in with a password.'}
        </p>
        <div className="ac-form">
          <label className="field">New password<input type="password" autoComplete="new-password" value={pwd} onChange={(e) => setPwd(e.target.value)} /></label>
          <label className="field">Confirm password<input type="password" autoComplete="new-password" value={pwd2} onChange={(e) => setPwd2(e.target.value)} /></label>
        </div>
        {pwdError && <p role="alert" className="ac-error">{pwdError}</p>}
        <button className="btn btn-line" type="submit">Save password</button>
      </form>
    </>
  );
}
