'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRESS_ITEMS = [
  {
    id: 1,
    type: 'article',
    publisher: 'Khalsa Help International / TOI',
    date: '25 Apr 2021',
    title: 'Sikh Aid Group Offers Oxygen to COVID...',
    snippet:
      'As COVID-19 cases surged and overwhelmed Indian hospitals, Khalsa Help International offered free oxygen concentrators and cylinders to families in distress.',
    link: 'https://timesofindia.indiatimes.com',
    tag: 'COVID Relief',
    image: '/press/covid-oxygen.webp',
  },
  {
    id: 2,
    type: 'video',
    publisher: 'NDTV India',
    date: '18 Jul 2024',
    title: 'Ground Zero: Volunteers Mobilize Within Hours for Assam Flood Victims',
    snippet:
      'Special ground report on emergency relief boats navigating submerged villages in Assam to deliver warm meals, dry rations, and baby food to marooned families.',
    link: 'https://www.ndtv.com',
    tag: 'Disaster Relief',
    image: 'https://www.sikhaid.ngo/api/img?src=https%3A%2F%2Fi.ibb.co%2FzWXc5WPS%2FIMG-1877.webp',
  },
  {
    id: 3,
    type: 'article',
    publisher: 'Hindustan Times',
    date: '12 May 2021',
    title: 'From Cuttack to Kathmandu: Dispatches Free Oxygen Cylinders and Drugs',
    snippet:
      'When oxygen plants ran dry, volunteers coordinated non-stop logistics across state borders, ensuring critical patient distress calls were answered within hours.',
    link: 'https://www.hindustantimes.com',
    tag: 'Healthcare',
    image: 'https://www.sikhaid.ngo/campaigns-bg/impact-healthcare.webp',
  },
  {
    id: 4,
    type: 'video',
    publisher: 'Odisha TV (OTV)',
    date: '08 Jul 2025',
    title: 'Special Broadcast: Serving 500,000+ Hot Meals at Puri Ratha Yatra',
    snippet:
      'On the sweltering Grand Road of Puri, 24-hour hydration camps, ORS distribution kiosks, and fresh langar served hundreds of thousands of pilgrims.',
    link: 'https://odishatv.in',
    tag: 'Langar Seva',
    image: 'https://www.sikhaid.ngo/annapurna-seva/ratha-yatra-hero-4.webp',
  },
  {
    id: 5,
    type: 'article',
    publisher: 'ANI News',
    date: '14 Oct 2025',
    title: "SikhAid Launches 'No Spot' Women's Health & Menstrual Dignity Campaign",
    snippet:
      'Targeting remote rural panchayats, teams distributed biodegradable sanitary pads, iron supplements, and conducted vital female health hygiene workshops.',
    link: 'https://www.aninews.in',
    tag: "Women's Health",
    image: 'https://www.sikhaid.ngo/gallery/gallery-153-sanitary-pads.webp',
  },
  {
    id: 6,
    type: 'article',
    publisher: 'The Tribune',
    date: '04 Feb 2026',
    title: 'Honest Seva & Transparent Books: Setting New Benchmarks in Accountability',
    snippet:
      'In an era where non-profit credibility is paramount, publishing dated photo proof and line-by-line fund utilisation reports for every single rupee raised.',
    link: 'https://www.tribuneindia.com',
    tag: 'Transparency',
    image: 'https://www.sikhaid.ngo/gallery/gallery-164-ration-kits.webp',
  },
  {
    id: 7,
    type: 'article',
    publisher: 'India Today',
    date: '29 Sep 2026',
    title: 'Nepal Flash Floods: Establishing 24-Hour Community Kitchens in Border',
    snippet:
      'Rushing beyond borders, volunteer relief convoys crossed into flood-ravaged regions of Nepal, distributing emergency ration kits and water purification tablets.',
    link: 'https://www.indiatoday.in',
    tag: 'Disaster Relief',
    image: 'https://www.sikhaid.ngo/api/img?src=https%3A%2F%2Fi.ibb.co%2FtwFzLXhg%2FDSC-3910.webp',
  },
  {
    id: 8,
    type: 'video',
    publisher: 'Kalinga TV',
    date: '19 Dec 2025',
    title: 'Winter Warmth Drive: Over 10,000 Heavy Quilts Distributed in Tribal Belts',
    snippet:
      'Braving sub-zero temperatures, volunteer teams reached deep forest settlements in Odisha to provide thermal blankets and winter wear to elderlies and children.',
    link: 'https://kalingatv.com',
    tag: 'Winter Relief',
    image: 'https://www.sikhaid.ngo/campaigns-bg/mission-blanket.webp',
  },
];

export default function PressPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = PRESS_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'articles') return item.type === 'article';
    if (activeTab === 'videos') return item.type === 'video';
    return true;
  });

  return (
    <main>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Press Coverage
          </nav>
          <h1>Press Coverage</h1>
          <p className="lead">
            See how SikhAid&apos;s humanitarian work is recognized across national media — from
            grassroots emergency mobilization to 100% transparent public service.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--line)', padding: '16px 0' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="chips" role="group" aria-label="Filter media by format" style={{ justifyContent: 'center' }}>
            <button
              className="chip"
              type="button"
              aria-pressed={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            >
              All Media ({PRESS_ITEMS.length})
            </button>
            <button
              className="chip"
              type="button"
              aria-pressed={activeTab === 'articles'}
              onClick={() => setActiveTab('articles')}
            >
              Articles ({PRESS_ITEMS.filter((x) => x.type === 'article').length})
            </button>
            <button
              className="chip"
              type="button"
              aria-pressed={activeTab === 'videos'}
              onClick={() => setActiveTab('videos')}
            >
              Videos ({PRESS_ITEMS.filter((x) => x.type === 'video').length})
            </button>
          </div>
        </div>
      </section>

      {/* PRESS ARTICLES & VIDEO GRID */}
      <section className="band tight">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">National Recognition</span>
              <h2 className="h-sec">Media mentions &amp; field reports</h2>
              <p className="lead">
                Documenting SikhAid&apos;s journey of selfless service across television, print, and digital journalism.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '28px',
              marginTop: '20px',
            }}
          >
            {filteredItems.map((item) => (
              <article
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid var(--line)',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(18, 26, 74, 0.05)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                className="press-card"
              >
                {/* TOP MEDIA AREA WITH IMAGE AND RED PILL BADGE */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    background: '#0E1B38',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.35s ease',
                    }}
                    loading="lazy"
                  />
                  {/* RED PILL BADGE TOP LEFT */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: '#DC2626',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '5px 14px',
                      borderRadius: '999px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                      zIndex: 2,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* CARD CONTENT BODY */}
                <div
                  style={{
                    padding: '24px 22px 24px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: '21px',
                      fontWeight: 700,
                      color: '#101B37',
                      lineHeight: 1.35,
                      margin: '0 0 12px 0',
                      fontFamily: 'var(--display)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '15px',
                      color: '#4B5563',
                      lineHeight: 1.55,
                      margin: '0 0 16px 0',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.snippet}
                  </p>

                  {/* CALENDAR DATE ROW */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '20px',
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{item.date}</span>
                    <span style={{ marginInline: '4px', opacity: 0.35 }}>•</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)' }}>{item.publisher}</span>
                  </div>

                  {/* SOLID ORANGE READ MORE BUTTON */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      background: '#DE6B16',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '16px',
                      padding: '13px 20px',
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(222, 107, 22, 0.22)',
                      transition: 'all 0.2s ease',
                    }}
                    className="press-btn"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA KIT & PRESS ENQUIRIES */}
      <section className="band alt" aria-labelledby="kit-h">
        <div className="wrap">
          <div
            className="panel"
            style={{
              background: 'var(--bg)',
              border: '1.5px solid var(--line)',
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '32px',
              alignItems: 'center',
              boxShadow: '0 6px 24px rgba(18, 26, 74, 0.04)',
            }}
          >
            <div className="stack" style={{ gap: '12px' }}>
              <span className="eyebrow" style={{ textAlign: 'left' }}>Media Inquiries</span>
              <h2 id="kit-h" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--ink)' }}>
                Journalists &amp; Content Creators
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '15.5px', lineHeight: 1.5 }}>
                Covering humanitarian emergencies, ground langar logistics, or rural health drives?
                Our communications team can provide high-resolution on-ground photography, verified field data,
                and interview access with trustees and field leads.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <span style={{ fontSize: '14.5px', color: 'var(--ink)' }}>
                  <b>Press desk:</b> <a href="mailto:help@sikhaid.ngo" style={{ color: 'var(--indigo)' }}>help@sikhaid.ngo</a>
                </span>
                <span style={{ fontSize: '14.5px', color: 'var(--ink)' }}>
                  <b>Media hotline:</b> <a href="tel:+919851341234" style={{ color: 'var(--indigo)' }}>+91 98513 41234</a>
                </span>
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-alt)',
                border: '1.5px solid var(--line)',
                borderRadius: '18px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '32px' }}>📁</span>
              <b style={{ fontSize: '18px', color: 'var(--ink)' }}>Official Press Kit &amp; Logos</b>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.45 }}>
                Includes vector logos, brand guidelines, verified fact sheets, and high-res relief photos.
              </p>
              <a
                className="btn btn-dark"
                href="/about#compliance"
                style={{ width: '100%', marginTop: '6px' }}
              >
                Download press assets
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM COLLABORATE CTA */}
      <section className="band tight" style={{ textAlign: 'center' }}>
        <div className="wrap stack" style={{ alignItems: 'center', gap: '16px' }}>
          <h2 className="h-sec" style={{ fontSize: '32px' }}>
            Want to feature our story or collaborate?
          </h2>
          <p className="lead" style={{ maxWidth: '560px' }}>
            Reach out to our media relations team for quotes, ground interviews, or collaborative documentary projects.
          </p>
          <div className="row" style={{ justifyContent: 'center', marginTop: '8px' }}>
            <Link className="btn btn-give btn-lg" href="/contact">
              Contact our team
            </Link>
            <Link className="btn btn-line btn-lg" href="/about">
              Learn about SikhAid
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
