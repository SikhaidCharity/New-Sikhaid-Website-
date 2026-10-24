'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import CampaignCard from '@/components/CampaignCard';
import { campaigns, completed, fmt, pct } from '@/lib/data';

export default function CampaignsPage() {
  const [query, setQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');

  const groups = ['All', 'Emergency', 'Hunger', 'Healthcare', 'Youth', 'Community'];

  const totalRaised = useMemo(() => campaigns.reduce((s, c) => s + c.raised, 0), []);
  const totalDonors = useMemo(() => campaigns.reduce((s, c) => s + c.donors, 0), []);
  const activeEmergencies = useMemo(() => campaigns.filter((c) => c.urgent).length, []);

  const filteredCampaigns = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = campaigns.filter(
      (c) =>
        (filterGroup === 'All' || c.group === filterGroup) &&
        (!q ||
          (c.title + ' ' + c.location + ' ' + c.category + ' ' + c.blurb)
            .toLowerCase()
            .includes(q))
    );

    return list.slice().sort((a, b) => {
      return (b.urgent - a.urgent) || (a.days || 99) - (b.days || 99);
    });
  }, [query, filterGroup]);

  return (
    <main>
      {/* HERO SECTION - ALL CENTER ALIGNED */}
      <section className="page-hero">
        <div className="wrap">
          {/* Live Urgency Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(239, 68, 68, 0.16)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#EF4444',
                boxShadow: '0 0 8px #EF4444',
              }}
            />
            {activeEmergencies} Active Emergency Relief Operations On Ground
          </div>

          <nav className="crumbs" aria-label="Breadcrumb" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <Link href="/">Home</Link> / Campaigns
          </nav>

          <h1 style={{ textAlign: 'center', marginInline: 'auto' }}>Every cause a life. Every rupee a lifeline.</h1>

          <p className="lead" style={{ textAlign: 'center', marginInline: 'auto' }}>
            When disaster strikes or a child goes to sleep hungry, every second counts.
            SikhAid is on the ground within 24 hours providing meals, clean water, healthcare,
            and shelter. Choose a cause close to your heart and follow your impact with 100% transparent proof.
          </p>

          {/* Centered Stat Cards */}
          <div className="hero-stats" id="heroStats">
            <div>
              <b>{campaigns.length}</b>Active campaigns
            </div>
            <div>
              <b>{activeEmergencies}</b>Live emergencies
            </div>
            <div>
              <b>{fmt(totalRaised)}</b>Raised this season
            </div>
            <div>
              <b>{totalDonors.toLocaleString('en-IN')}</b>Generous donors
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL IMPACT TIERS — "WHAT YOUR GIFT DELIVERS" */}
      <section className="band alt tight" style={{ paddingBlock: '36px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <span className="eyebrow">Direct Impact</span>
            <h2 className="h-sec" style={{ fontSize: '26px', marginTop: '4px' }}>
              See what your contribution achieves on the ground
            </h2>
          </div>

          <div className="camp-impact-grid">
            <Link
              href="/donate?amount=500"
              className="camp-impact-card"
            >
              <span className="camp-impact-icon">🍲</span>
              <b className="camp-impact-amt">₹500</b>
              <span className="camp-impact-title">5 Warm Meals</span>
              <span className="camp-impact-desc">
                Freshly cooked hot langar for families stranded in relief camps.
              </span>
            </Link>

            <Link
              href="/donate?amount=1200"
              className="camp-impact-card"
            >
              <span className="camp-impact-icon">📦</span>
              <b className="camp-impact-amt">₹1,200</b>
              <span className="camp-impact-title">2-Week Ration Kit</span>
              <span className="camp-impact-desc">
                Atta, rice, dal, oil, and salt to sustain a family of 4 through crisis.
              </span>
            </Link>

            <Link
              href="/donate?amount=2500"
              className="camp-impact-card active"
            >
              <span className="camp-impact-icon">🩺</span>
              <b className="camp-impact-amt">₹2,500</b>
              <span className="camp-impact-title">Emergency Medical Kit</span>
              <span className="camp-impact-desc">
                ORS packets, water purification tablets, fever & antiseptic medicines.
              </span>
            </Link>

            <Link
              href="/donate?amount=5000"
              className="camp-impact-card"
            >
              <span className="camp-impact-icon">🏠</span>
              <b className="camp-impact-amt">₹5,000</b>
              <span className="camp-impact-title">Family Shelter Kit</span>
              <span className="camp-impact-desc">
                Heavy-duty tarpaulin, ground mats, warm blankets, and mosquito nets.
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* STICKY TOOLBAR */}
      <div className="toolbar">
        <div className="wrap" style={{ justifyContent: 'center' }}>
          <label className="search" style={{ maxWidth: '380px' }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span className="sr-only">Search campaigns</span>
            <input
              id="q"
              type="search"
              placeholder="Search by cause, state, e.g. flood, Odisha"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div className="chips" role="group" aria-label="Filter by cause" style={{ justifyContent: 'center' }}>
            {groups.map((g) => (
              <button
                key={g}
                className="chip"
                type="button"
                aria-pressed={filterGroup === g}
                onClick={() => setFilterGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CAMPAIGN RESULTS */}
      <section className="band tight" aria-labelledby="res-h">
        <div className="wrap stack" style={{ gap: '20px' }}>
          <h2 className="sr-only" id="res-h">
            Campaign results
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <p
              id="count"
              style={{ color: 'var(--muted)', fontWeight: 700, textAlign: 'center' }}
              aria-live="polite"
            >
              Showing {filteredCampaigns.length} active campaign
              {filteredCampaigns.length === 1 ? '' : 's'}
            </p>
          </div>
          <div className="grid g3" id="list">
            {filteredCampaigns.map((camp) => (
              <CampaignCard key={camp.slug} campaign={camp} />
            ))}
          </div>
          {filteredCampaigns.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '14px' }}>
                No active campaigns match your search.
              </p>
              <button
                className="btn btn-line"
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilterGroup('All');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* HOW GIVING WORKS */}
      <section className="band alt" aria-labelledby="how-h">
        <div className="wrap stack" style={{ gap: '28px' }}>
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Transparent Process</span>
              <h2 className="h-sec" id="how-h">
                How giving to a campaign works
              </h2>
              <p className="lead">
                Every rupee is tracked from receipt to ground deployment. Full dignity, zero waste.
              </p>
            </div>
          </div>
          <div className="how">
            <div>
              <b className="n">1</b>
              <b style={{ color: 'var(--ink)' }}>Pick a cause</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Each campaign transparently lists the on-ground crisis, targets, and what your amount delivers.
              </span>
            </div>
            <div>
              <b className="n">2</b>
              <b style={{ color: 'var(--ink)' }}>Donate securely</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                UPI, cards, or NetBanking. Instant 80G tax exemption certificate sent straight to your email.
              </span>
            </div>
            <div>
              <b className="n">3</b>
              <b style={{ color: 'var(--ink)' }}>Rapid field relief</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                SikhAid volunteers purchase and distribute relief on ground within 24 hours of emergency mobilization.
              </span>
            </div>
            <div>
              <b className="n">4</b>
              <b style={{ color: 'var(--ink)' }}>Verified proof</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Receive dated photographic updates and campaign fund utilization reports in your email.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY GIVING BANNER */}
      <section className="band tight">
        <div className="wrap">
          <div
            className="panel"
            style={{
              background: 'linear-gradient(135deg, #FFF8EC 0%, #FFF3D6 100%)',
              border: '2px solid var(--saffron)',
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className="stack" style={{ gap: '10px', flex: '1 1 480px' }}>
              <span className="eyebrow" style={{ color: 'var(--saffron-deep)' }}>Continuous Seva</span>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: 'var(--ink)' }}>
                Can&apos;t choose? Become a monthly lifeline.
              </h2>
              <p style={{ color: '#4A5568', fontSize: '16px', lineHeight: 1.5 }}>
                Your regular support funds emergency supplies before disaster strikes so teams can deploy instantly.
                Flexible auto-debit, cancel or pause anytime, with one consolidated annual 80G tax statement each March.
              </p>
            </div>
            <Link className="btn btn-give btn-lg" href="/donate#monthly">
              Start monthly giving →
            </Link>
          </div>
        </div>
      </section>

      {/* PAST CAMPAIGNS */}
      <section className="band alt" aria-labelledby="done-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Proven Track Record</span>
              <h2 className="h-sec" id="done-h">
                What past campaigns achieved
              </h2>
              <p className="lead">
                Every emergency closed with completed on-ground rehabilitation and full audit transparency.
              </p>
            </div>
          </div>
          <div className="grid g3" id="done">
            {completed.map((d, i) => (
              <Link key={i} className="done-card" href="/blog">
                <Photo src={d.img} tone={d.tone} alt={d.title} label={d.title} />
                <span className="stack" style={{ gap: '6px' }}>
                  <span
                    className="badge done"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    Completed
                  </span>
                  <b style={{ color: 'var(--ink)', fontSize: '17px' }}>
                    {d.title}
                  </b>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    {d.sub}
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      color: 'var(--indigo)',
                      fontSize: '14px',
                    }}
                  >
                    Read impact report →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
