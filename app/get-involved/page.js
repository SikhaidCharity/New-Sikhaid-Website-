'use client';

import Link from 'next/link';

export default function GetInvolvedPage() {
  return (
    <main>
      {/* HERO SECTION - ENTRY GATEWAY */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Get Involved
          </nav>
          <h1>Give your time, your skills, or your company&apos;s reach</h1>
          <p className="lead">
            Seva isn&apos;t only money. Whether you wish to serve on the ground, offer your professional skills remotely,
            or partner through Corporate Social Responsibility, there is an impactful pathway for you to change lives with SikhAid.
          </p>
        </div>
      </section>

      {/* THREE CORE GATEWAYS */}
      <section className="band tight">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Choose Your Pathway</span>
              <h2 className="h-sec">How would you like to get involved?</h2>
              <p className="lead">
                Select an option below to enter our dedicated programs and start your journey of selfless service.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '28px',
              marginTop: '16px',
            }}
          >
            {/* GATEWAY 1: INDIVIDUAL VOLUNTEERING */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '24px',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                boxShadow: '0 8px 30px rgba(18, 26, 74, 0.04)',
                position: 'relative',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'var(--saffron-soft)',
                    color: 'var(--saffron-deep)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '26px',
                  }}
                >
                  🤝
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'var(--saffron-soft)',
                    color: 'var(--saffron-deep)',
                  }}
                >
                  Individual Seva
                </span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Volunteer Opportunities
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Join our nationwide network of 300+ volunteers. Whether you want to coordinate disaster relief,
                write stories, manage social media, or fundraise, your compassion makes a direct impact on families in crisis.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--saffron-deep)', fontWeight: 800 }}>✓</span> Online Volunteering &amp; Coordination
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--saffron-deep)', fontWeight: 800 }}>✓</span> Storytelling, Content &amp; Blogging
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--saffron-deep)', fontWeight: 800 }}>✓</span> Social Media Amplification
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--saffron-deep)', fontWeight: 800 }}>✓</span> Online Community Fundraising
                </li>
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
                <Link
                  className="btn btn-give btn-lg"
                  href="/volunteering"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  Enter Volunteering Portal →
                </Link>
              </div>
            </div>

            {/* GATEWAY 2: CSR PARTNERSHIPS */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '24px',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                boxShadow: '0 8px 30px rgba(18, 26, 74, 0.04)',
                position: 'relative',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'var(--indigo-soft)',
                    color: 'var(--indigo)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '26px',
                  }}
                >
                  🏛️
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'var(--indigo-soft)',
                    color: 'var(--indigo)',
                  }}
                >
                  Corporate &amp; CSR
                </span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                CSR Partnerships
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Fulfill your corporate social responsibility mandate with verified, audited grassroots execution.
                100% compliant under MCA CSR-1, with 80G tax benefits, board-ready impact reports, and geo-tagged proof.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--indigo)', fontWeight: 800 }}>✓</span> Strategic Philanthropy &amp; Emergency Reserves
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--indigo)', fontWeight: 800 }}>✓</span> Cause Marketing &amp; Co-Branded Drives
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--indigo)', fontWeight: 800 }}>✓</span> Events &amp; Mass Hydration Sponsorship
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--indigo)', fontWeight: 800 }}>✓</span> Health on Wheels &amp; Women&apos;s Health Pods
                </li>
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
                <Link
                  className="btn btn-dark btn-lg"
                  href="/csr"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  Enter CSR Partnership Portal →
                </Link>
              </div>
            </div>

            {/* GATEWAY 3: PROGRAM SPONSORSHIP */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '24px',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                boxShadow: '0 8px 30px rgba(18, 26, 74, 0.04)',
                position: 'relative',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#ECFDF5',
                    color: '#059669',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '26px',
                  }}
                >
                  🍱
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: '#ECFDF5',
                    color: '#059669',
                  }}
                >
                  Sponsor Seva
                </span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Sponsor a Program
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Dedicate a full day of langar meals, sponsor a mobile medical camp route, or fund disaster relief kits
                in honor or memory of a loved one. Complete with custom banner, video dedication, and photo updates.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span> Day of Langar in Memory / Birthday
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span> Mobile Health on Wheels Village Camp
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span> No Spot: 500 Women&apos;s Dignity Kits
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#059669', fontWeight: 800 }}>✓</span> Emergency Relief Boat Mobilization
                </li>
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '14px' }}>
                <Link
                  className="btn btn-line btn-lg"
                  href="/donate"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  Sponsor Seva Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & TRANSPARENCY SECTION */}
      <section className="band alt tight">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Our Commitment</span>
              <h2 className="h-sec">Why Collaborate with SikhAid?</h2>
              <p className="lead">
                Built on the core Sikh tenets of Naam Japo, Kirt Karo, and Vand Chakho — serving with total integrity.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '20px',
              marginTop: '12px',
            }}
          >
            <div style={{ background: 'var(--bg)', borderRadius: '18px', padding: '24px', border: '1.5px solid var(--line)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px' }}>⏱️</span>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', margin: '10px 0 6px' }}>24-Hour Deployment</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.45 }}>Immediate emergency response on ground before crisis deepens.</p>
            </div>

            <div style={{ background: 'var(--bg)', borderRadius: '18px', padding: '24px', border: '1.5px solid var(--line)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px' }}>📋</span>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', margin: '10px 0 6px' }}>Full Regulatory Compliance</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.45 }}>80G, 12A, and MCA CSR-1 registered non-profit trust.</p>
            </div>

            <div style={{ background: 'var(--bg)', borderRadius: '18px', padding: '24px', border: '1.5px solid var(--line)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px' }}>📸</span>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', margin: '10px 0 6px' }}>Verified Photo Proof</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.45 }}>Every distribution documented with dated photos and transparent logs.</p>
            </div>

            <div style={{ background: 'var(--bg)', borderRadius: '18px', padding: '24px', border: '1.5px solid var(--line)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px' }}>💖</span>
              <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', margin: '10px 0 6px' }}>Dignity Above All</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.45 }}>Unconditional service without discrimination of faith, caste, or background.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT INQUIRY STRIP */}
      <section className="band tight" style={{ textAlign: 'center' }}>
        <div className="wrap stack" style={{ alignItems: 'center', gap: '14px' }}>
          <h2 className="h-sec">Have questions or custom ideas?</h2>
          <p className="lead" style={{ maxWidth: '600px' }}>
            We welcome university clubs, community groups, and compassionate individuals. Reach out directly.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: '14px', marginTop: '6px' }}>
            <a className="btn btn-dark btn-lg" href="mailto:help@sikhaid.ngo">
              Write to: help@sikhaid.ngo
            </a>
            <a className="btn btn-line btn-lg" href="tel:+919851341234">
              Call: +91 98513 41234
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
