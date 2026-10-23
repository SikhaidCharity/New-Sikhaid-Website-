'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import CampaignCard from '@/components/CampaignCard';
import { campaigns, completed, fmt, pct } from '@/lib/data';

export default function CampaignsPage() {
  const [query, setQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [sortKey, setSortKey] = useState('urgent');

  const groups = ['All', 'Emergency', 'Hunger', 'Healthcare', 'Youth'];

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
      if (sortKey === 'close') return pct(b) - pct(a);
      if (sortKey === 'support') return b.donors - a.donors;
      return (b.urgent - a.urgent) || (a.days || 99) - (b.days || 99);
    });
  }, [query, filterGroup, sortKey]);

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Campaigns
          </nav>
          <h1>Every cause, one place</h1>
          <p className="lead">
            Emergency relief, hunger, healthcare and youth programs. See
            progress live, give to the one that moves you, and follow what your
            gift does.
          </p>
          <div className="hero-stats" id="heroStats" style={{ marginTop: '12px' }}>
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
              <b>{totalDonors.toLocaleString('en-IN')}</b>Donors
            </div>
          </div>
        </div>
      </section>

      {/* Sticky toolbar */}
      <div className="toolbar">
        <div className="wrap">
          <label className="search">
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
              placeholder="Search by cause or place, e.g. flood, Odisha"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div className="chips" role="group" aria-label="Filter by cause">
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

          <label
            className="field"
            style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}
          >
            Sort
            <select
              id="sort"
              style={{ minHeight: '46px' }}
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="urgent">Most urgent</option>
              <option value="close">Closest to goal</option>
              <option value="support">Most supported</option>
            </select>
          </label>
        </div>
      </div>

      {/* Campaign results */}
      <section className="band tight" aria-labelledby="res-h">
        <div className="wrap stack" style={{ gap: '20px' }}>
          <h2 className="sr-only" id="res-h">
            Campaign results
          </h2>
          <p
            id="count"
            style={{ color: 'var(--muted)', fontWeight: 700 }}
            aria-live="polite"
          >
            {filteredCampaigns.length} campaign
            {filteredCampaigns.length === 1 ? '' : 's'}
          </p>
          <div className="grid g3" id="list">
            {filteredCampaigns.map((camp) => (
              <CampaignCard key={camp.slug} campaign={camp} />
            ))}
          </div>
          {filteredCampaigns.length === 0 && (
            <p
              id="empty"
              style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}
            >
              No campaigns match. Try another word or clear the filter.
            </p>
          )}
        </div>
      </section>

      {/* How giving works */}
      <section className="band alt tight" aria-labelledby="how-h">
        <div className="wrap stack" style={{ gap: '24px' }}>
          <h2 className="h-sec" id="how-h" style={{ fontSize: '34px' }}>
            How giving to a campaign works
          </h2>
          <div className="how">
            <div>
              <b className="n">1</b>
              <b style={{ color: 'var(--ink)' }}>Pick a campaign</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Each page shows the need, the goal and exactly what your amount
                buys.
              </span>
            </div>
            <div>
              <b className="n">2</b>
              <b style={{ color: 'var(--ink)' }}>Donate securely</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                UPI, cards or net banking. Your 80G receipt arrives instantly.
              </span>
            </div>
            <div>
              <b className="n">3</b>
              <b style={{ color: 'var(--ink)' }}>Relief is delivered</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Our teams buy and distribute supplies, within 24 hours in
                emergencies.
              </span>
            </div>
            <div>
              <b className="n">4</b>
              <b style={{ color: 'var(--ink)' }}>See the proof</b>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>
                Photo updates and a fund-use report land in your inbox and
                account.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly giving banner */}
      <section className="band tight">
        <div className="wrap">
          <div
            className="panel"
            style={{
              background: 'var(--saffron-soft)',
              border: '2px solid var(--saffron)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '22px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className="stack" style={{ gap: '8px', flex: '1 1 480px' }}>
              <h2 style={{ fontSize: '30px' }}>
                Can&apos;t choose? Become a monthly giver.
              </h2>
              <p style={{ color: 'var(--muted)' }}>
                Your monthly gift goes where need is greatest, emergencies first.
                Auto-debit via UPI or card, pause anytime, one annual 80G statement.
              </p>
            </div>
            <Link className="btn btn-dark btn-lg" href="/donate#monthly">
              Start monthly giving
            </Link>
          </div>
        </div>
      </section>

      {/* Past campaigns */}
      <section className="band alt" aria-labelledby="done-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Completed</span>
              <h2 className="h-sec" id="done-h" style={{ fontSize: '34px' }}>
                What past campaigns achieved
              </h2>
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
