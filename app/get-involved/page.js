'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { IMG } from '@/lib/data';

export default function GetInvolvedPage() {
  const roles = [
    [
      'Field relief volunteer',
      'Pack and distribute relief kits and support camps during floods and emergencies.',
      ['Bihar · Assam · Odisha', 'On deployment'],
    ],
    [
      'Langar sewa',
      'Help prepare and serve fresh meals in our community kitchens.',
      ['Cuttack & partner cities', 'Weekends'],
    ],
    [
      'Medical volunteer',
      'Doctors, nurses and pharmacists for Health on Wheels camps.',
      ['Rural Odisha', 'Monthly camps'],
    ],
    [
      'Logistics & warehouse',
      'Coordinate supplies, vehicles and inventory during responses.',
      ['Hybrid', 'Flexible'],
    ],
    [
      'Content & social media',
      'Photograph, film and tell the stories of our ground work.',
      ['Remote or field', 'Flexible'],
    ],
  ];

  const [selectedRole, setSelectedRole] = useState(roles[0][0]);
  const [vName, setVName] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vCity, setVCity] = useState('');
  const [vWhy, setVWhy] = useState('');
  const [vErr, setVErr] = useState(false);
  const [vOk, setVOk] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = vName.trim() && vPhone.trim() && /\S+@\S+\.\S+/.test(vEmail);
    setVErr(!ok);
    if (!ok) return;
    setVOk(true);
  };

  const handleApplyClick = (roleName) => {
    setSelectedRole(roleName);
    const nameInput = document.getElementById('vName');
    if (nameInput) {
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('help@sikhaid.ngo');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const areas = [
    [
      IMG.assam5,
      'Disaster relief',
      'Pre-positioned relief kits and rapid-response funds.',
      '#3E5872',
    ],
    [
      IMG.langar,
      'Langar & food security',
      'Community kitchens serving fresh meals daily.',
      '#7A4E26',
    ],
    [
      IMG.hygiene,
      'Sanitation & women’s health',
      'No Spot drives, hygiene workshops, sanitary kits.',
      '#6B3A4E',
    ],
    [
      IMG.health,
      'Rural healthcare',
      'Sponsor Health on Wheels routes and camps.',
      '#2E6B68',
    ],
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Get involved
          </nav>
          <h1>Give your time, your skills, or your company&apos;s reach</h1>
          <p className="lead">
            Seva isn&apos;t only money. Join 300+ volunteers in the field,
            partner with us for CSR, or sponsor a whole program in
            someone&apos;s name.
          </p>
          <div className="paths">
            <a href="#volunteer">
              <b>Volunteer</b>
              <span>Relief, langar, medical, logistics and media roles</span>
            </a>
            <a href="#csr">
              <b>CSR partnership</b>
              <span>Custom programs with board-ready impact reports</span>
            </a>
            <a href="#sponsor">
              <b>Sponsor a program</b>
              <span>Fund a day of langar, a camp, or 100 relief kits</span>
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer roles */}
      <section className="band" id="volunteer" aria-labelledby="vol-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Volunteering</span>
              <h2 className="h-sec" id="vol-h">
                Open volunteer roles
              </h2>
              <p className="lead">
                No experience needed for most roles. We train you, pair you with
                a team lead, and send you where you can help most.
              </p>
            </div>
          </div>
          <div className="vol-grid">
            <div className="stack" style={{ gap: '12px' }}>
              {roles.map((r, i) => (
                <div className="role" key={i}>
                  <div className="stack" style={{ gap: '8px', flex: '1 1 300px' }}>
                    <b style={{ fontSize: '19px', color: 'var(--ink)' }}>
                      {r[0]}
                    </b>
                    <span style={{ color: 'var(--muted)' }}>{r[1]}</span>
                    <div className="tags">
                      {r[2].map((t, ti) => (
                        <span key={ti}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn-line"
                    type="button"
                    onClick={() => handleApplyClick(r[0])}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>

            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <h3 style={{ fontSize: '24px' }}>Volunteer application</h3>
              <label className="field" htmlFor="vName">
                Full name
                <input
                  id="vName"
                  type="text"
                  required
                  autoComplete="name"
                  value={vName}
                  onChange={(e) => setVName(e.target.value)}
                />
              </label>
              <label className="field" htmlFor="vPhone">
                Phone (WhatsApp)
                <input
                  id="vPhone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={vPhone}
                  onChange={(e) => setVPhone(e.target.value)}
                />
              </label>
              <label className="field" htmlFor="vEmail">
                Email
                <input
                  id="vEmail"
                  type="email"
                  required
                  autoComplete="email"
                  value={vEmail}
                  onChange={(e) => setVEmail(e.target.value)}
                />
              </label>
              <label className="field" htmlFor="vCity">
                City
                <input
                  id="vCity"
                  type="text"
                  autoComplete="address-level2"
                  value={vCity}
                  onChange={(e) => setVCity(e.target.value)}
                />
              </label>
              <label className="field" htmlFor="vRole">
                Role you&apos;re interested in
                <select
                  id="vRole"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map((r, i) => (
                    <option key={i} value={r[0]}>
                      {r[0]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field" htmlFor="vWhy">
                Skills, or why you&apos;d like to join
                <textarea
                  id="vWhy"
                  rows="3"
                  value={vWhy}
                  onChange={(e) => setVWhy(e.target.value)}
                ></textarea>
              </label>

              {vErr && (
                <p
                  className="err"
                  style={{
                    color: 'var(--red)',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  Please fill in your name, phone and email.
                </p>
              )}

              <button
                className="btn btn-give btn-lg"
                type="submit"
                disabled={vOk}
              >
                Submit application
              </button>

              {vOk && (
                <div className="ok">
                  Thank you! Our volunteer team will contact you within a few
                  working days.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* CSR Partnerships */}
      <section className="band alt" id="csr" aria-labelledby="csr-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">CSR partnerships</span>
              <h2 className="h-sec" id="csr-h">
                Programs your company can stand behind
              </h2>
              <p className="lead">
                Custom programs with measurable outcomes, quarterly impact
                reporting and co-branding, trusted by Axis Bank, Domino&apos;s,
                Hero MotoCorp, TCS, realme and Duramix.
              </p>
            </div>
          </div>

          <div className="grid g4" style={{ marginBottom: '28px' }}>
            {areas.map((a, i) => (
              <div className="area" key={i}>
                <Photo src={a[0]} alt={a[1]} label={a[1]} tone={a[3]} />
                <div className="stack" style={{ padding: '18px', gap: '6px' }}>
                  <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                    {a[1]}
                  </b>
                  <span
                    style={{ color: 'var(--muted)', fontSize: '14.5px' }}
                  >
                    {a[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid g3" style={{ marginBottom: '28px' }}>
            <div className="panel stack" style={{ gap: '8px' }}>
              <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                Impact reporting
              </b>
              <span style={{ color: 'var(--muted)' }}>
                Quarterly reports with outcomes, photos and fund use, ready for
                your board and CSR committee.
              </span>
            </div>
            <div className="panel stack" style={{ gap: '8px' }}>
              <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                Employee volunteering
              </b>
              <span style={{ color: 'var(--muted)' }}>
                Langar service and relief-kit packing days for your teams.
              </span>
            </div>
            <div className="panel stack" style={{ gap: '8px' }}>
              <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                Compliance-ready
              </b>
              <span style={{ color: 'var(--muted)' }}>
                80G, 12A and CSR-1 documents shared on request.
              </span>
            </div>
          </div>

          <div
            className="panel"
            style={{
              background: 'var(--ink)',
              color: 'var(--on-dark)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div className="stack" style={{ gap: '6px' }}>
              <b
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '26px',
                  color: '#fff',
                }}
              >
                Let&apos;s build a program together
              </b>
              <span>
                Write to <b style={{ color: '#fff' }}>help@sikhaid.ngo</b>. Our
                partnerships team replies within 2 business days.
              </span>
            </div>
            <div className="row">
              <button
                className="btn btn-give"
                type="button"
                onClick={copyEmail}
              >
                {copied ? 'Email copied ✓' : 'Copy email address'}
              </button>
              <Link className="btn btn-light" href="/contact">
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor a program */}
      <section className="band" id="sponsor" aria-labelledby="sp-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Sponsor</span>
              <h2 className="h-sec" id="sp-h">
                Sponsor a whole unit of seva
              </h2>
              <p className="lead">
                For a birthday, an anniversary, in memory of a loved one, or as
                a family or company. You receive photos and a personal report.
              </p>
            </div>
          </div>

          <div className="grid g3">
            {/* Card 1: A day of langar */}
            <div className="sponsor-unit-card">
              <div className="sponsor-card-top">
                <span className="sponsor-card-category">Community Kitchen</span>
                <h3 className="sponsor-card-title">A day of langar</h3>
                <div className="sponsor-card-price">
                  <span className="currency">₹</span>
                  <span className="amount">21,000</span>
                  <span className="per">/ full day</span>
                </div>
              </div>
              <p className="sponsor-card-desc">
                Fresh, hot meals for everyone at one community kitchen point for a full day of seva.
              </p>
              <ul className="ticks sponsor-card-ticks">
                <li>Your name or personal dedication displayed at kitchen</li>
                <li>Timestamped ground photo documentation of the seva</li>
                <li>Instant 80G tax receipt &amp; certificate issued to email</li>
              </ul>
              <div className="sponsor-card-actions">
                <Link
                  className="btn btn-dark btn-block"
                  href="/donate#langar-sewa"
                >
                  Sponsor this seva <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Card 2: A Health on Wheels camp (Featured) */}
            <div className="sponsor-unit-card featured">
              <span className="sponsor-card-badge">★ Most loved</span>
              <div className="sponsor-card-top">
                <span className="sponsor-card-category">Mobile Healthcare</span>
                <h3 className="sponsor-card-title">A Health on Wheels camp</h3>
                <div className="sponsor-card-price">
                  <span className="currency">₹</span>
                  <span className="amount">35,000</span>
                  <span className="per">/ mobile camp</span>
                </div>
              </div>
              <p className="sponsor-card-desc">
                One full medical camp in a remote village: doctor team, free medicines, diagnostics &amp; transport.
              </p>
              <ul className="ticks sponsor-card-ticks">
                <li>Patient count &amp; clinical health outcomes report</li>
                <li>Dedicated donor banner placed on the medical van</li>
                <li>Photos and patient recovery stories from the field</li>
              </ul>
              <div className="sponsor-card-actions">
                <Link
                  className="btn btn-give btn-block"
                  href="/donate#sikh-aid-health-on-wheels"
                >
                  Sponsor this seva <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Card 3: 100 family relief kits */}
            <div className="sponsor-unit-card">
              <div className="sponsor-card-top">
                <span className="sponsor-card-category">Disaster Relief</span>
                <h3 className="sponsor-card-title">100 family relief kits</h3>
                <div className="sponsor-card-price">
                  <span className="currency">₹</span>
                  <span className="amount">50,000</span>
                  <span className="per">/ 100 kits</span>
                </div>
              </div>
              <p className="sponsor-card-desc">
                Rations, clean water filtration, tarpaulins, blankets and hygiene items for 100 flood-hit families.
              </p>
              <ul className="ticks sponsor-card-ticks">
                <li>Geo-tagged distribution report with verified locations</li>
                <li>Ground photos &amp; family recipient documentation</li>
                <li>50% tax exemption under Section 80G</li>
              </ul>
              <div className="sponsor-card-actions">
                <Link
                  className="btn btn-dark btn-block"
                  href="/donate#bihar-flood-relief-2026"
                >
                  Sponsor this seva <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
