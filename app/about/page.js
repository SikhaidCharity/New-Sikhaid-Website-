'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import Lightbox from '@/components/Lightbox';
import { IMG } from '@/lib/data';

export default function AboutPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const gallery = [
    [IMG.assam1, 'Assam flood relief', '#3E5872'],
    [IMG.food, 'Community food distribution', '#7A4E26'],
    [IMG.ratha1, 'Ratha Yatra 2025, Puri', '#8A5A2B'],
    [IMG.pads, 'No Spot: women’s health', '#6B3A4E'],
    [IMG.blanket, 'Winter blankets', '#4A4A6A'],
    [IMG.fooddist, 'Food for the homeless', '#6E4A2A'],
    [IMG.ration, 'COVID ration kits', '#5C5030'],
    [IMG.assam7, 'Supporting displaced families', '#46607A'],
    [IMG.hygiene, 'Hygiene workshop', '#5A3442'],
    [IMG.ratha6, 'ORS for pilgrims', '#8A5A2B'],
    [IMG.assam3, 'Relief delivery', '#34506E'],
    [IMG.langar, 'Langar meals', '#6E4A2A'],
  ];

  const docs = [
    ['80G certificate', 'PDF'],
    ['12A certificate', 'PDF'],
    ['Trust deed', 'PDF'],
    ['Annual report 2025–26', 'PDF'],
    ['Audited financials 2025–26', 'PDF'],
    ['Campaign utilisation reports', 'One per campaign'],
  ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="ab-hero">
          <div className="wrap">
            <div className="stack" style={{ gap: '18px' }}>
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link> / About us
              </nav>
              <span className="eyebrow">Serving India since 2020</span>
              <h1>
                Langar for all.
                <br />
                Seva for all.
              </h1>
              <p className="lead">
                SikhAid Charitable Trust provides immediate humanitarian aid and
                disaster relief across India. From natural disasters to
                community emergencies, we serve with compassion, dignity and
                full transparency.
              </p>
              <div className="row">
                <Link className="btn btn-give btn-lg" href="/donate">
                  Support our work
                </Link>
                <Link
                  className="btn btn-line btn-lg"
                  href="/get-involved#volunteer"
                >
                  Volunteer with us
                </Link>
              </div>
            </div>
            <div className="mosaic" id="mosaic">
              <Photo
                src={IMG.langar}
                alt="Volunteers preparing meals"
                label="Langar seva"
                tone="#7A4E26"
              />
              <Photo
                src={IMG.assam4}
                alt="Relief materials for flood-affected families"
                label="Flood relief"
                tone="#3E5872"
              />
              <Photo
                src={IMG.health}
                alt="Mobile medical camp"
                label="Healthcare"
                tone="#2E6B68"
              />
            </div>
          </div>
        </section>

        {/* The Three Pillars */}
        <section className="band dark" aria-labelledby="pil-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="stack">
                <span className="eyebrow">What guides us</span>
                <h2 className="h-sec" id="pil-h">
                  The three pillars we work by
                </h2>
              </div>
            </div>
            <div className="grid g3">
              <div className="pillar">
                <small>Remember</small>
                <b className="g">Naam Japo</b>
                <p>
                  We see the divine in everyone we serve, so every person is met
                  with dignity, whatever their faith or circumstance.
                </p>
              </div>
              <div className="pillar">
                <small>Honest work</small>
                <b className="g">Kirt Karo</b>
                <p>
                  Every rupee is accounted for: receipts issued, books audited
                  and utilisation published for each campaign.
                </p>
              </div>
              <div className="pillar">
                <small>Share</small>
                <b className="g">Vand Chakho</b>
                <p>
                  The spirit of langar, extended to every community in crisis:
                  what we have, we share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="band alt" aria-labelledby="mv-h">
          <div className="wrap">
            <h2 className="sr-only" id="mv-h">
              Mission and vision
            </h2>
            <div className="grid g2">
              <div className="panel stack">
                <span className="eyebrow">Our mission</span>
                <p
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '24px',
                    lineHeight: '1.35',
                    color: 'var(--ink)',
                    fontWeight: '600',
                  }}
                >
                  To provide immediate humanitarian aid and disaster relief to
                  communities across India during times of crisis. We serve
                  with compassion, dignity, and unwavering commitment to those
                  who need help the most.
                </p>
                <ul className="ticks">
                  <li>Rapid emergency response within 24 hours</li>
                  <li>Community-centred relief and rehabilitation</li>
                  <li>100% transparent fund utilisation</li>
                </ul>
              </div>
              <div className="panel stack">
                <span className="eyebrow">Our vision</span>
                <p
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '24px',
                    lineHeight: '1.35',
                    color: 'var(--ink)',
                    fontWeight: '600',
                  }}
                >
                  A resilient India where no community faces disaster alone. A
                  network of compassionate service that reaches every corner of
                  our nation, ensuring rapid relief and sustainable recovery.
                </p>
                <ul className="ticks">
                  <li>Pan-India disaster preparedness network</li>
                  <li>Empowered communities with resilience training</li>
                  <li>Technology-driven humanitarian response</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="band" aria-labelledby="tl-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="stack">
                <span className="eyebrow">Our journey</span>
                <h2 className="h-sec" id="tl-h">
                  From one city to 19+ states
                </h2>
              </div>
            </div>
            <ol className="tl">
              <li>
                <b className="y">2020</b>
                <b style={{ color: 'var(--ink)' }}>SikhAid is founded</b>
                <span style={{ color: 'var(--muted)' }}>
                  Starts with COVID oxygen sewa and ration kits for families in
                  need.
                </span>
              </li>
              <li>
                <b className="y">[YEAR]</b>
                <b style={{ color: 'var(--ink)' }}>Langar Aid &amp; No Spot</b>
                <span style={{ color: 'var(--muted)' }}>
                  Community kitchens and women&apos;s health drives expand to new
                  cities.
                </span>
              </li>
              <li>
                <b className="y">2025</b>
                <b style={{ color: 'var(--ink)' }}>Ratha Yatra Seva, Puri</b>
                <span style={{ color: 'var(--muted)' }}>
                  Water, ORS and meals for pilgrims on Grand Road.
                </span>
              </li>
              <li>
                <b className="y">2026</b>
                <b style={{ color: 'var(--ink)' }}>
                  Bihar, Nepal &amp; Assam floods
                </b>
                <span style={{ color: 'var(--muted)' }}>
                  Three simultaneous flood responses; 250,000+ people rescued to
                  date.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* Leadership */}
        <section className="band alt" aria-labelledby="team-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="stack">
                <span className="eyebrow">Leadership</span>
                <h2 className="h-sec" id="team-h">
                  The people accountable for every rupee
                </h2>
              </div>
            </div>
            <div className="grid g4">
              <div className="person stack" style={{ gap: '10px' }}>
                <Photo tone="#2D3354" label="" />
                <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                  [Founder name]
                </b>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  Founder &amp; Managing Trustee
                </span>
              </div>
              <div className="person stack" style={{ gap: '10px' }}>
                <Photo tone="#4C3A2E" label="" />
                <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                  [Trustee name]
                </b>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  Trustee, Operations
                </span>
              </div>
              <div className="person stack" style={{ gap: '10px' }}>
                <Photo tone="#3E5872" label="" />
                <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                  [Name]
                </b>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  Head of Disaster Response
                </span>
              </div>
              <div className="person stack" style={{ gap: '10px' }}>
                <Photo tone="#2E6B68" label="" />
                <b style={{ color: 'var(--ink)', fontSize: '18px' }}>
                  [Name]
                </b>
                <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                  Finance &amp; Compliance
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="band" id="gallery" aria-labelledby="ag-h">
          <div className="wrap">
            <div className="sec-head">
              <div className="stack">
                <span className="eyebrow">Gallery</span>
                <h2 className="h-sec" id="ag-h">
                  Our work, in pictures
                </h2>
              </div>
            </div>
            <div className="agal" id="agal">
              {gallery.map((x, i) => (
                <div
                  key={i}
                  onClick={() => setActivePhotoIndex(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <Photo src={x[0]} alt={x[1]} label={x[1]} tone={x[2]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="band alt" id="compliance" aria-labelledby="comp-h">
          <div className="wrap">
            <div
              className="grid g2"
              style={{ alignItems: 'start', gap: '40px' }}
            >
              <div className="stack" style={{ gap: '16px' }}>
                <span className="eyebrow">Registration &amp; compliance</span>
                <h2 className="h-sec" id="comp-h">
                  Verified, registered, accountable
                </h2>
                <p className="lead" style={{ fontSize: '16px' }}>
                  Every document a donor or CSR partner may need, open to view
                  and download.
                </p>
                <dl className="reg">
                  <dt>Trust registration</dt>
                  <dd>[TRUST REG. NO.]</dd>
                  <dt>80G registration</dt>
                  <dd>[80G REG. NO.]</dd>
                  <dt>12A registration</dt>
                  <dd>[12A REG. NO.]</dd>
                  <dt>Trust PAN</dt>
                  <dd>[TRUST PAN]</dd>
                  <dt>CSR-1</dt>
                  <dd>[CSR-1 NO.]</dd>
                </dl>
              </div>
              <div
                className="grid"
                style={{
                  gridTemplateColumns:
                    'repeat(auto-fit,minmax(min(100%,230px),1fr))',
                  gap: '12px',
                }}
                id="docs"
              >
                {docs.map((d, i) => (
                  <a className="doc" href="#compliance" key={i}>
                    <span className="ic">
                      <svg
                        width="18"
                        height="18"
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
                    </span>
                    <span>
                      <b>{d[0]}</b>
                      <br />
                      <span
                        style={{ fontSize: '13px', color: 'var(--muted)' }}
                      >
                        {d[1]}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox for gallery */}
      {activePhotoIndex !== null && (
        <Lightbox
          images={gallery.map((x) => ({
            src: x[0],
            alt: x[1],
            caption: x[1],
            cat: 'Gallery',
          }))}
          index={activePhotoIndex}
          onClose={() => setActivePhotoIndex(null)}
          onNext={() =>
            setActivePhotoIndex((activePhotoIndex + 1) % gallery.length)
          }
          onPrev={() =>
            setActivePhotoIndex(
              (activePhotoIndex - 1 + gallery.length) % gallery.length
            )
          }
        />
      )}
    </>
  );
}
