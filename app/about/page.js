'use client';

import Link from 'next/link';
import Photo from '@/components/Photo';

export default function AboutPage() {
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
        {/* HERO SECTION */}
        <section className="about-hero" aria-label="About SikhAid">
          <div className="wrap">
            <h1 className="about-hero-title">SikhAid&apos;s Story</h1>
            <p className="about-hero-sub">
              Serving humanity with compassion and dignity. From a small response in 2020 to nationwide impact today.
            </p>
            <nav className="about-hero-pill" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span className="active">About Us</span>
            </nav>
          </div>
        </section>

        {/* INCEPTION & VERTICALS */}
        <section className="band" aria-labelledby="incep-h">
          <div className="wrap">
            <div className="sec-head" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px' }}>
              <div className="stack" style={{ alignItems: 'center' }}>
                <span className="eyebrow">Inception</span>
                <h2 className="h-sec" id="incep-h" style={{ lineHeight: '1.2' }}>
                  How an emergency response<br />grew into a nationwide movement
                </h2>
              </div>
            </div>

            <div className="story-lead-block">
              <p>
                In 2020, when COVID-19 hit India, SikhAid Charitable Trust was founded with a simple yet powerful intention guided by the Sikh principles of compassion, equality, and selfless service (sewa). What began as an immediate response to the pandemic quickly grew into a nationwide humanitarian movement.
              </p>
              <p>
                During the lockdown, the team worked relentlessly to deliver free oxygen tanks, pulse oximeters, masks, and other critical supplies to families in distress. During the second wave, SikhAid expanded its operations and provided life-saving oxygen support to tens of thousands across Odisha and other states. The trust became known for its on-ground efficiency, compassion-driven approach, and commitment to serving people in their most vulnerable moments.
              </p>
              <p>
                Over the years, SikhAid has broadened its impact far beyond Punjab, building a strong network of volunteers and partners across India. Today, the organization works across multiple verticals to uplift communities and ensure holistic development and relief wherever it’s needed most.
              </p>
            </div>

            {/* Verticals Grid */}
            <div className="verticals-grid">
              <div className="vertical-card">
                <div className="vertical-card-header">
                  <div className="vertical-card-icon" aria-hidden="true">🌊</div>
                  <h3>Disaster Relief &amp; Rehabilitation</h3>
                </div>
                <p>
                  SikhAid responds swiftly to natural calamities such as floods, landslides, and storms. From providing emergency food, water, and medical aid to long-term rehabilitation including rebuilding homes, restoring schools, and supporting livelihoods—the trust has carried out major relief missions in Punjab, Himachal Pradesh, Odisha, and the North-East.
                </p>
              </div>

              <div className="vertical-card">
                <div className="vertical-card-header">
                  <div className="vertical-card-icon" aria-hidden="true">🎓</div>
                  <h3>Education &amp; Child Development</h3>
                </div>
                <p>
                  Recognizing education as a pathway to empowerment, SikhAid supports underprivileged children through scholarships, digital learning tools, school supplies, and community-led learning programs. The aim is simple: to give every child a fair chance at a brighter future.
                </p>
              </div>

              <div className="vertical-card">
                <div className="vertical-card-header">
                  <div className="vertical-card-icon" aria-hidden="true">🧵</div>
                  <h3>Women Empowerment</h3>
                </div>
                <p>
                  Through stitching centers, vocational training programs, and awareness drives, the trust helps women gain financial independence, confidence, and leadership opportunities within their communities.
                </p>
              </div>

              <div className="vertical-card">
                <div className="vertical-card-header">
                  <div className="vertical-card-icon" aria-hidden="true">🩺</div>
                  <h3>Healthcare &amp; Medical Support</h3>
                </div>
                <p>
                  SikhAid conducts free medical camps, blood donation drives, health check-ups, and awareness campaigns in rural and underserved areas. The organization remains actively involved in providing medicines, oxygen support, and medical assistance during health crises.
                </p>
              </div>

              <div className="vertical-card">
                <div className="vertical-card-header">
                  <div className="vertical-card-icon" aria-hidden="true">🛠️</div>
                  <h3>Livelihood Support</h3>
                </div>
                <p>
                  Families affected by crises receive vocational tools, skills training, and financial support to rebuild their livelihoods sustainably with dignity and stability at the core of every initiative.
                </p>
              </div>

              <div className="vertical-card">
                <div className="vertical-card-header">
                  <div className="vertical-card-icon" aria-hidden="true">🍲</div>
                  <h3>Community Development &amp; Welfare</h3>
                </div>
                <p>
                  From langar (community kitchens) and clean drinking water projects to sanitation initiatives and clothing drives, SikhAid works wherever there is a need, ensuring no individual is left behind regardless of caste, creed, or region.
                </p>
              </div>
            </div>

            {/* Sewa Quote */}
            <div className="sewa-quote-banner">
              <blockquote>
                &ldquo;Every act of sewa contributes to a kinder, stronger, more compassionate world. Together, we can bring meaningful change one step at a time.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* OUR PHILOSOPHY */}
        <section className="band alt" aria-labelledby="phil-h">
          <div className="wrap">
            <div className="sec-head" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
              <div className="stack" style={{ alignItems: 'center' }}>
                <span className="eyebrow">Our Philosophy</span>
                <h2 className="h-sec" id="phil-h">
                  Creating lasting change through constant kindness
                </h2>
              </div>
            </div>
            <div className="philosophy-grid">
              <div className="philosophy-card">
                <h3>Thousands of Lives Impacted</h3>
                <p>Across Odisha and beyond through diverse humanitarian initiatives, disaster relief, and continuous community development.</p>
              </div>
              <div className="philosophy-card">
                <h3>Strong Volunteer Base</h3>
                <p>Dedicated on-ground volunteers and kind-hearted donors standing united 24/7 to serve when communities need it most.</p>
              </div>
              <div className="philosophy-card">
                <h3>Kindness as a Way of Life</h3>
                <p>Creating a society where kindness is not occasional or reactionary, but a constant, everyday commitment to humanity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT GUIDES US (THE THREE PILLARS) - FIRST */}
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

        {/* OUR APPROACH - AFTER WHAT GUIDES US */}
        <section className="band alt" aria-labelledby="appr-h">
          <div className="wrap">
            <div className="sec-head" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
              <div className="stack" style={{ alignItems: 'center' }}>
                <span className="eyebrow">Our Approach</span>
                <h2 className="h-sec" id="appr-h">
                  Three principles that guide every campaign we run
                </h2>
              </div>
            </div>

            <div className="approach-grid">
              <div className="approach-card">
                <span className="approach-num">01</span>
                <h3>Compassionate Service</h3>
                <p>
                  Rooted in the spirit of seva — dignity, education, and healthcare for all, delivered without distinction of caste, creed, or background.
                </p>
              </div>

              <div className="approach-card">
                <span className="approach-num">02</span>
                <h3>Community Engagement</h3>
                <p>
                  Working closely with local communities and leaders to deeply understand and address their most urgent and long-term needs.
                </p>
              </div>

              <div className="approach-card">
                <span className="approach-num">03</span>
                <h3>Sustainable Impact</h3>
                <p>
                  Creating lasting change that empowers communities with vocational tools and self-reliance to thrive independently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION / VISION - OUR PURPOSE (LIKE HOMEPAGE) */}
        <section className="band purpose-section" aria-labelledby="pur-h">
          <div className="purpose-bg-overlay" aria-hidden="true" />
          <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
            <div className="sec-head">
              <div className="stack">
                <span className="eyebrow" style={{ color: 'var(--saffron)' }}>Our purpose</span>
                <h2 className="h-sec" id="pur-h" style={{ color: '#FFFFFF' }}>Guided by compassion, driven by service</h2>
              </div>
            </div>

            <div className="grid g2 purpose-cards-grid">
              <div className="mv mv-mission">
                <span className="eyebrow">Our mission</span>
                <p className="big">
                  To provide immediate humanitarian aid and disaster relief to
                  communities across India during times of crisis, serving with
                  compassion, dignity and unwavering commitment.
                </p>
                <ul className="ticks">
                  <li>Rapid emergency response within 24 hours</li>
                  <li>Community-centred relief and rehabilitation</li>
                  <li>100% transparent fund utilisation</li>
                </ul>
              </div>

              <div className="mv mv-vision">
                <span className="eyebrow">Our vision</span>
                <p className="big">
                  A resilient India where no community faces disaster alone:
                  a network of compassionate service reaching every corner of
                  the nation.
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

        {/* OUR JOURNEY */}
        <section className="band alt" aria-labelledby="tl-h">
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

        {/* LEADERSHIP */}
        <section className="band" aria-labelledby="team-h">
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

        {/* REGISTRATION & COMPLIANCE - CENTERED WITH 1-LINE DOWNLOADS */}
        <section className="band alt" id="compliance" aria-labelledby="comp-h">
          <div className="wrap">
            {/* Centered Heading */}
            <div className="sec-head" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px' }}>
              <div className="stack" style={{ alignItems: 'center' }}>
                <span className="eyebrow">Registration &amp; compliance</span>
                <h2 className="h-sec" id="comp-h">
                  Verified, registered, accountable
                </h2>
                <p className="lead" style={{ fontSize: '15.5px', maxWidth: '640px', margin: '6px auto 0' }}>
                  Every document a donor or CSR partner may need, open to view and download.
                </p>
              </div>
            </div>

            {/* Centered Registration Details in the Middle */}
            <div className="compliance-centered-details">
              <dl className="reg-inline">
                <div className="reg-item">
                  <dt>Trust registration</dt>
                  <dd>[TRUST REG. NO.]</dd>
                </div>
                <div className="reg-item">
                  <dt>80G registration</dt>
                  <dd>[80G REG. NO.]</dd>
                </div>
                <div className="reg-item">
                  <dt>12A registration</dt>
                  <dd>[12A REG. NO.]</dd>
                </div>
                <div className="reg-item">
                  <dt>Trust PAN</dt>
                  <dd>[TRUST PAN]</dd>
                </div>
                <div className="reg-item">
                  <dt>CSR-1</dt>
                  <dd>[CSR-1 NO.]</dd>
                </div>
              </dl>
            </div>

            {/* Download PDF Cards in One Line Below */}
            <div className="docs-single-line" id="docs">
              {docs.map((d, i) => (
                <a className="doc-card-compact" href="#compliance" key={i}>
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
                  <div className="doc-text">
                    <b>{d[0]}</b>
                    <span>{d[1]}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
