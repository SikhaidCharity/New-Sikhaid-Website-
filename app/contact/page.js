'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [cName, setCName] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cTopic, setCTopic] = useState('Donation or receipt');
  const [cMsg, setCMsg] = useState('');
  const [cErr, setCErr] = useState(false);
  const [cOk, setCOk] = useState(false);

  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);

  useEffect(() => {
    const h = window.location.hash.replace('#', '');
    if (h === 'privacy') setOpenPrivacy(true);
    if (h === 'terms') setOpenTerms(true);
    if (h === 'refund') setOpenRefund(true);
  }, []);

  const copyToClipboard = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = cName.trim() && /\S+@\S+\.\S+/.test(cEmail) && cMsg.trim();
    setCErr(!ok);
    if (ok) {
      setCOk(true);
    }
  };

  return (
    <main>
      <section className="band tight">
        <div className="wrap ct">
          <div className="stack" style={{ gap: '18px' }}>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / Contact
            </nav>
            <h1 style={{ fontSize: 'clamp(38px, 5vw, 58px)' }}>
              We&apos;re here, 24/7
            </h1>
            <p className="lead">
              For emergencies, call us any time. For donations, receipts,
              volunteering or partnerships, send a message and we reply within 2
              business days.
            </p>

            {/* SOS Banner */}
            <div className="sos">
              <div className="sos-content">
                <span className="i">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <div className="sos-details">
                  <span className="sos-badge">
                    Emergency helpline · 24/7
                  </span>
                  <b className="sos-number">+91 98513 41234</b>
                </div>
              </div>
              <div className="sos-actions">
                <a
                  className="btn btn-light sos-btn-call"
                  href="tel:+919851341234"
                  aria-label="Call emergency helpline"
                >
                  Call now
                </a>
                <button
                  className="btn sos-btn-copy"
                  type="button"
                  onClick={() => copyToClipboard('+91 98513 41234', 'phone')}
                >
                  {copiedPhone ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Email & WhatsApp Tiles */}
            <div className="contact-quick-tiles">
              <div className="tile contact-tile">
                <div className="contact-tile-head">
                  <span className="contact-tile-label">Email</span>
                  <span className="contact-tile-status">Reply in 2d</span>
                </div>
                <b className="contact-tile-val">help@sikhaid.ngo</b>
                <button
                  className="btn btn-line btn-contact-act"
                  type="button"
                  onClick={() => copyToClipboard('help@sikhaid.ngo', 'email')}
                >
                  {copiedEmail ? 'Copied ✓' : 'Copy email'}
                </button>
              </div>
              <div className="tile contact-tile">
                <div className="contact-tile-head">
                  <span className="contact-tile-label">WhatsApp</span>
                  <span className="contact-tile-status">Direct chat</span>
                </div>
                <b className="contact-tile-val">+91 98513 41234</b>
                <a
                  className="btn btn-line btn-contact-act"
                  href="https://wa.me/919851341234"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open chat ↗
                </a>
              </div>
            </div>

            {/* Map box */}
            <div className="mapbox">
              <div className="m">
                Cuttack Central Headquarters &amp; Operations Centre
              </div>
              <div style={{ padding: '18px' }} className="stack">
                <b style={{ color: 'var(--ink)' }}>Office</b>
                <span style={{ color: 'var(--muted)' }}>
                  House no. 222, Mangraj Lane, Cuttack, Odisha 753001
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mangraj+Lane+Cuttack+Odisha+753001"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 800 }}
                >
                  Get directions ↗
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form className="cform" onSubmit={handleSubmit} noValidate>
            <h2 style={{ fontSize: '28px' }}>Send us a message</h2>
            <div
              className="grid"
              style={{
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '14px',
              }}
            >
              <label className="field" htmlFor="cName">
                Name
                <input
                  id="cName"
                  type="text"
                  autoComplete="name"
                  required
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                />
              </label>
              <label className="field" htmlFor="cPhone">
                Phone
                <input
                  id="cPhone"
                  type="tel"
                  autoComplete="tel"
                  value={cPhone}
                  onChange={(e) => setCPhone(e.target.value)}
                />
              </label>
            </div>

            <label className="field" htmlFor="cEmail">
              Email
              <input
                id="cEmail"
                type="email"
                autoComplete="email"
                required
                value={cEmail}
                onChange={(e) => setCEmail(e.target.value)}
              />
            </label>

            <label className="field" htmlFor="cTopic">
              What is this about?
              <select
                id="cTopic"
                value={cTopic}
                onChange={(e) => setCTopic(e.target.value)}
              >
                <option>Donation or receipt</option>
                <option>Monthly giving</option>
                <option>Volunteering</option>
                <option>CSR partnership</option>
                <option>Media</option>
                <option>Request help for my community</option>
              </select>
            </label>

            <label className="field" htmlFor="cMsg">
              Message
              <textarea
                id="cMsg"
                rows="6"
                required
                value={cMsg}
                onChange={(e) => setCMsg(e.target.value)}
              ></textarea>
            </label>

            {cErr && (
              <p
                style={{
                  color: 'var(--red)',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                Please add your name, a valid email and a message.
              </p>
            )}

            <button
              className="btn btn-dark btn-lg"
              type="submit"
              disabled={cOk}
            >
              Send message
            </button>

            {cOk && (
              <div
                style={{
                  background: 'var(--green-soft)',
                  color: 'var(--green)',
                  borderRadius: '14px',
                  padding: '16px',
                  fontWeight: 700,
                }}
              >
                Message received. We&apos;ll reply within 2 business days. For
                anything urgent, call the 24/7 helpline.
              </div>
            )}

            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
              Looking for a receipt?{' '}
              <Link href="/login">
                <b>Download it from your account</b>
              </Link>
              , no email needed.
            </p>
          </form>
        </div>
      </section>

      {/* Policies and legal */}
      <section className="band alt" aria-labelledby="legal-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Legal &amp; trust</span>
              <h2 className="h-sec" id="legal-h">
                Policies and documents
              </h2>
              <p className="lead">
                Live documents, not placeholders. Replace the summaries below
                with your final policy text.
              </p>
            </div>
          </div>

          <div className="legal-grid-4">
            <div className="legal" id="privacy">
              <h3>Privacy policy</h3>
              <p>
                How we collect, store and protect donor data, including PAN and
                contact details.
              </p>
              <details open={openPrivacy}>
                <summary onClick={(e) => { e.preventDefault(); setOpenPrivacy(!openPrivacy); }}>
                  {openPrivacy ? 'Close summary' : 'Read summary'}
                </summary>
                <p>
                  We collect your name, contact details and PAN only to process
                  donations, issue 80G receipts and send updates you opt into.
                  We never sell or share your data with third parties for
                  marketing. Payments are processed by Razorpay; we do not store
                  card details. You can ask us to delete your account data at
                  help@sikhaid.ngo.
                </p>
              </details>
            </div>

            <div className="legal" id="terms">
              <h3>Terms of service</h3>
              <p>
                Terms for using this website, donor accounts and recurring
                donations.
              </p>
              <details open={openTerms}>
                <summary onClick={(e) => { e.preventDefault(); setOpenTerms(!openTerms); }}>
                  {openTerms ? 'Close summary' : 'Read summary'}
                </summary>
                <p>
                  Donations are voluntary contributions to SikhAid Charitable
                  Trust. Funds raised for a campaign are used for that response,
                  with any surplus applied to its next phase. Monthly donations
                  continue until you pause or cancel them from your account.
                </p>
              </details>
            </div>

            <div className="legal" id="refund">
              <h3>Refund &amp; cancellation</h3>
              <p>
                How to request a refund or cancel a monthly gift.
              </p>
              <details open={openRefund}>
                <summary onClick={(e) => { e.preventDefault(); setOpenRefund(!openRefund); }}>
                  {openRefund ? 'Close summary' : 'Read summary'}
                </summary>
                <p>
                  If you donated by mistake, email help@sikhaid.ngo within 7
                  days with your receipt number. Approved refunds return to the
                  original payment method within 7–10 working days. Monthly
                  gifts can be cancelled anytime before the next debit.
                </p>
              </details>
            </div>

            <div className="legal" id="compliance-80g">
              <h3>80G certificate</h3>
              <p>
                Our Income Tax Section 80G registration. Registration no. [80G
                REG. NO.]
              </p>
              <Link
                className="btn btn-line btn-compliance"
                href="/about#compliance"
              >
                View all compliance documents
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
