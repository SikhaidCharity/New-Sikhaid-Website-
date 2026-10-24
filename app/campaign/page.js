'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Photo from '@/components/Photo';
import CampaignCard from '@/components/CampaignCard';
import { campaigns, TIERS, BREAKDOWN, IMG, fmt, pct, bySlug } from '@/lib/data';

export function CampaignDetail({ initialSlug }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [slug, setSlug] = useState(initialSlug || 'bihar-flood-relief-2026');

  useEffect(() => {
    if (initialSlug && bySlug(initialSlug)) {
      setSlug(initialSlug);
      return;
    }
    const qSlug = searchParams?.get('slug');
    if (qSlug && bySlug(qSlug)) {
      setSlug(qSlug);
      return;
    }
    const syncFromHash = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      if (hash && bySlug(hash)) {
        setSlug(hash);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [searchParams, initialSlug]);

  const campaign = bySlug(slug) || campaigns[0] || {};
  const tiers = TIERS[campaign.type] || TIERS.flood;
  const parts = BREAKDOWN[campaign.type] || BREAKDOWN.flood;

  const [amount, setAmount] = useState(tiers[2]?.amt || 2500);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const currentAmt = customAmount ? parseInt(customAmount, 10) || 100 : amount;
  const suffix = isMonthly ? '/month' : '';

  const closestTier = (a) => {
    let t = tiers[0];
    tiers.forEach((x) => { if (a >= x.amt) t = x; });
    return t;
  };

  const matchedTier = closestTier(currentAmt);
  const impactSummary =
    currentAmt < tiers[0].amt
      ? `Every rupee helps. ${fmt(currentAmt)} goes straight to relief.`
      : `${fmt(currentAmt)}${suffix} can provide: ${matchedTier.what.charAt(0).toLowerCase() + matchedTier.what.slice(1)}.`;

  const p = pct(campaign);

  // Filter out raw duplicate headers from scraped content
  const titleLower = (campaign.title || '').toLowerCase();
  const subLower = (campaign.subtitle || '').toLowerCase();
  const isDuplicateHeader = (s) => {
    if (!s || s.length < 12) return true;
    const l = s.toLowerCase();
    if (l === titleLower || l === subLower) return true;
    if (l.includes('relief mission 2026') || l.includes('relief mission') || l === 'our relief priorities' || l === 'our mission: from emergency relief to recovery' || l === 'why your support matters' || l === 'where your donation goes' || l === 'join the mission' || l === 'our relief priorities') return true;
    return false;
  };

  const rawStory = Array.isArray(campaign.story) ? campaign.story : (campaign.blurb || '').split('\n\n');
  const storyItems = rawStory.filter((s) => !isDuplicateHeader(s));

  // Extract structured priority items (e.g. "Food Security: Dry rations...", "* Clean water")
  const priorities = storyItems
    .filter((s) => s.includes(': ') || (s.startsWith('*') && s.length > 5))
    .map((s) => {
      const clean = s.replace(/^\*\s*/, '');
      const idx = clean.indexOf(': ');
      if (idx !== -1) {
        return { title: clean.slice(0, idx).trim(), desc: clean.slice(idx + 2).trim() };
      }
      return { title: clean, desc: '' };
    });

  // Extract pure narrative paragraphs
  const narratives = storyItems.filter(
    (s) => !s.includes(': ') && !s.startsWith('*') && s.length > 30
  );
  if (narratives.length === 0 && campaign.blurb) {
    narratives.push(...campaign.blurb.split('\n\n'));
  }

  const faqs = [
    ['Will I receive an 80G tax exemption receipt?', 'Yes. Your 80G receipt is generated instantly and emailed to you. Eligible for 50% tax deduction.'],
    ['How are donations allocated?', '100% of your gift is ring-fenced for this campaign with photo and GPS-verified documentation.'],
    ['What payment methods are supported?', 'UPI, Google Pay, PhonePe, Paytm, Net Banking, Credit/Debit cards, RuPay, and international donations.'],
    ['What if the campaign exceeds its target?', 'Surplus goes to extended relief and rehabilitation for the same community.'],
  ];

  // Clean, punchy 1-2 line hero description spanning left-to-right
  const heroDescription = (campaign.blurb || '').split('\n\n')[0].replace(/\s+/g, ' ').trim();
  const shortHeroText = (() => {
    if (!heroDescription) return '';
    const sentences = heroDescription.match(/[^.!?]+[.!?]+/g) || [heroDescription];
    let res = '';
    for (const s of sentences) {
      if ((res + ' ' + s).trim().length <= 190) res = (res ? res + ' ' : '') + s.trim();
      else break;
    }
    return res || sentences[0].trim();
  })();

  const handleGive = () => {
    try {
      sessionStorage.setItem('sa-gift', JSON.stringify({ slug: campaign.slug, amt: currentAmt, monthly: isMonthly }));
    } catch (e) {}
    router.push(`/donate/${campaign.slug}?amount=${currentAmt}&freq=${isMonthly ? 'monthly' : 'once'}`);
  };

  const cols = ['#EF4444', 'var(--saffron)', '#94A3B8'];

  const otherScrollerRef = useRef(null);
  const scrollOthers = (dir) => {
    if (!otherScrollerRef.current) return;
    const step = Math.max(300, otherScrollerRef.current.clientWidth * 0.8);
    otherScrollerRef.current.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const copyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : `https://www.sikhaid.ngo/campaigns/${campaign.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => triggerToast('Link copied!'));
    } else {
      triggerToast(url);
    }
  };

  return (
    <>
      {/* ─── FULL-BLEED HERO ─── */}
      <div className="cd-hero">
        <Photo
          src={campaign.img || IMG.hero}
          tone={campaign.tone}
          label={campaign.title}
          alt={campaign.title}
        />
        <div className="cd-hero-overlay">
          <div className="cd-wrap">
            <nav className="crumbs" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>{' '}
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>{' '}
              <Link href="/campaigns" style={{ color: 'rgba(255,255,255,0.7)' }}>Campaigns</Link>{' '}
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>{' '}
              <span style={{ color: '#fff' }}>{campaign.title}</span>
            </nav>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {campaign.urgent && (
                <span className="cd-pill cd-pill-urgent">
                  <span className="dot pulse" style={{ background: '#fff', width: '6px', height: '6px' }}></span>
                  {campaign.status || 'Urgent'}
                </span>
              )}
              <span className="cd-pill">{campaign.category}</span>
              <span className="cd-pill">📍 {campaign.location}</span>
            </div>
            <h1 className="cd-hero-title">{campaign.title}</h1>
            <p className="cd-hero-blurb">{shortHeroText || campaign.blurb}</p>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT (FULL-WIDTH FLUID) ─── */}
      <div className="cd-wrap" style={{ paddingTop: 0, paddingBottom: '80px' }}>
        <div className="cd-grid">
          {/* ── LEFT: Story Column ── */}
          <div className="cd-story">

            {/* Progress Bar — flush, no card wrapper */}
            <div className="cd-progress">
              <div className="cd-progress-top">
                <div>
                  <span className="cd-raised">{fmt(campaign.raised)}</span>
                  <span className="cd-goal"> raised of {fmt(campaign.goal)}</span>
                </div>
                <span className="cd-pct">{p}%</span>
              </div>
              <div className="cd-bar-track">
                <div className="cd-bar-fill" style={{ width: `${Math.min(p, 100)}%` }}></div>
              </div>
              <div className="cd-stats">
                <div><b>{campaign.donors.toLocaleString('en-IN')}</b><span>Donors</span></div>
                <div><b>{campaign.days ? `${campaign.days}d` : 'Ongoing'}</b><span>{campaign.days ? 'Left' : 'Year-round'}</span></div>
                <div><b>80G</b><span>Tax Receipt</span></div>
              </div>
            </div>

            {/* ── Why This Campaign Matters ── */}
            <section className="cd-section">
              <div className="cd-section-header">
                <span className="cd-section-eyebrow">
                  <span className="dot pulse" style={{ background: '#EF4444', width: '8px', height: '8px' }}></span>
                  {campaign.urgent ? 'Critical Ground Reality' : 'Verified Field Seva'}
                </span>
                <h2 className="cd-h2">Why This Campaign Matters</h2>
                <p className="cd-section-sub">
                  {campaign.subtitle || `${campaign.title}: Immediate relief and sustained rehabilitation on the frontlines.`}
                </p>
              </div>

              {/* Urgency Alert Card */}
              <div className="cd-urgency-card">
                <div className="cd-urgency-head">
                  <span className="cd-urgency-badge">⚡ Immediate Ground Situation</span>
                  <span className="cd-urgency-loc">📍 {campaign.location}</span>
                </div>
                <p className="cd-urgency-p">
                  {narratives[0] || campaign.blurb}
                </p>
              </div>

              {/* Mission Narrative Prose */}
              <div className="cd-narratives">
                {narratives.slice(1, 4).map((para, i) => (
                  <p key={i} className="cd-story-p">{para}</p>
                ))}
              </div>

              {/* Key Relief Priorities Grid */}
              {priorities.length > 0 && (
                <div className="cd-priorities-block">
                  <h3 className="cd-priorities-title">Immediate Relief Priorities Delivered On Ground</h3>
                  <div className="cd-priorities-grid">
                    {priorities.slice(0, 6).map((item, i) => (
                      <div key={i} className="cd-priority-card">
                        <span className="cd-priority-check">✓</span>
                        <div>
                          <b className="cd-priority-head">{item.title}</b>
                          {item.desc && <span className="cd-priority-desc">{item.desc}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Impact Stats */}
            {campaign.impactStats && campaign.impactStats.length > 0 && (
              <section className="cd-section">
                <div className="cd-section-header">
                  <span className="cd-section-eyebrow">Verified Proof</span>
                  <h2 className="cd-h2">Impact So Far</h2>
                </div>
                <div className="cd-impact-grid">
                  {campaign.impactStats.map((stat, i) => (
                    <div key={i} className="cd-impact-stat">
                      <span className="cd-impact-icon">{stat.icon || '📍'}</span>
                      <b>{stat.value}</b>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What Your Gift Delivers */}
            <section className="cd-section">
              <div className="cd-section-header">
                <span className="cd-section-eyebrow">100% Direct Allocation</span>
                <h2 className="cd-h2">What Your Gift Delivers</h2>
                <p className="cd-section-sub">Select a tier below or enter any custom amount to sponsor direct on-ground relief.</p>
              </div>
              <div className="cd-tiers">
                {tiers.map((t) => {
                  const sel = t.amt === currentAmt && !customAmount;
                  return (
                    <button
                      key={t.amt}
                      type="button"
                      className={`cd-tier ${sel ? 'active' : ''}`}
                      onClick={() => { setAmount(t.amt); setCustomAmount(''); }}
                    >
                      <b>{fmt(t.amt)}</b>
                      <span>{t.what}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* How It Works */}
            {campaign.howItWorks && campaign.howItWorks.length > 0 && (
              <section className="cd-section">
                <div className="cd-section-header">
                  <span className="cd-section-eyebrow">Full Transparency</span>
                  <h2 className="cd-h2">How It Works</h2>
                </div>
                <div className="cd-steps">
                  {campaign.howItWorks.map((step, i) => (
                    <div key={i} className="cd-step">
                      <span className="cd-step-num">0{step.step || (i + 1)}</span>
                      <div>
                        <b>{step.title}</b>
                        <span>{step.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quote */}
            <div className="cd-quote-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--saffron)" aria-hidden="true" style={{ opacity: 0.8 }}>
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote>
                "{campaign.quote || 'Your seva feeds, heals, and brings dignity to someone today.'}"
              </blockquote>
              <span className="cd-quote-author">— {campaign.quoteAuthor || 'SikhAid Field Team'}</span>
            </div>

            {/* Where Money Goes */}
            <section className="cd-section">
              <h2 className="cd-h2">Where Your Money Goes</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '14px' }}>
                Of every <b style={{ color: 'var(--ink)' }}>₹100</b>, <b style={{ color: 'var(--ink)' }}>₹{parts[0][1]}</b> goes directly to field relief.
              </p>
              <div className="cd-split-bar">
                {parts.map((x, i) => (
                  <i key={i} style={{ width: `${x[1]}%`, background: cols[i] }}></i>
                ))}
              </div>
              <div className="cd-legend">
                {parts.map((x, i) => (
                  <div key={i}>
                    <i style={{ background: cols[i] }}></i>
                    <b>{x[1]}%</b>
                    <span>{x[0]}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="cd-section">
              <h2 className="cd-h2">Questions Donors Ask</h2>
              <div className="cd-faq-list">
                {faqs.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="cd-faq-item">
                      <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : i)}>
                        <span>{f[0]}</span>
                        <span className="cd-faq-toggle">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && <p>{f[1]}</p>}
                    </div>
                  );
                })}
              </div>

              {/* Share */}
              <div className="cd-share">
                <span>Share:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Support ${campaign.title}: https://www.sikhaid.ngo/campaigns/${campaign.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ background: '#1F7A4D', color: '#fff', padding: '6px 14px', fontSize: '13px', borderRadius: '999px' }}
                >
                  WhatsApp
                </a>
                <button type="button" className="btn btn-line" style={{ padding: '6px 14px', fontSize: '13px', borderRadius: '999px' }} onClick={copyLink}>
                  Copy Link
                </button>
              </div>
            </section>
          </div>

          {/* ── RIGHT: Sticky Donate Sidebar ── */}
          <aside className="cd-aside">
            <div className="cd-donate-card" id="give">
              <h3>Support {campaign.short || campaign.title}</h3>
              <div className="seg" role="group" aria-label="Donation frequency">
                <button type="button" aria-pressed={!isMonthly} onClick={() => setIsMonthly(false)}>Once</button>
                <button type="button" aria-pressed={isMonthly} onClick={() => setIsMonthly(true)}>Monthly</button>
              </div>
              <div className="cd-amt-grid">
                {tiers.map((t) => (
                  <button
                    key={t.amt}
                    type="button"
                    className={`cd-amt-btn ${t.amt === amount && !customAmount ? 'active' : ''}`}
                    onClick={() => { setAmount(t.amt); setCustomAmount(''); }}
                  >
                    {fmt(t.amt)}
                  </button>
                ))}
              </div>
              <label className="field" htmlFor="custom-amt" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Custom amount
                <span className="money-input">
                  <span>₹</span>
                  <input id="custom-amt" type="number" min="100" inputMode="numeric" placeholder="e.g. 5000" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
                </span>
              </label>
              <div className="cd-impact-msg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z" /></svg>
                <span>{impactSummary}</span>
              </div>
              <Link
                href={`/donate/${campaign.slug || 'general'}?amount=${currentAmt}&freq=${isMonthly ? 'monthly' : 'once'}`}
                className="btn btn-give btn-lg btn-block"
                onClick={() => {
                  try {
                    sessionStorage.setItem('sa-gift', JSON.stringify({ slug: campaign.slug, amt: currentAmt, monthly: isMonthly }));
                  } catch (e) {}
                }}
                style={{ fontWeight: 700 }}
              >
                Donate {fmt(currentAmt)}{suffix}
              </Link>
              <div className="cd-trust-row">
                <span>✓ 80G Tax Receipt</span>
                <span>✓ 256-bit SSL</span>
                <span>✓ All UPI & Cards</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── OTHER CAMPAIGNS ─── */}
      <section className="band alt" aria-labelledby="xs-h" style={{ paddingBlock: '48px' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Keep the Seva Going</span>
              <h2 className="h-sec" id="xs-h" style={{ fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700 }}>Other Active Campaigns</h2>
            </div>
            <div className="row" style={{ gap: '10px' }}>
              <div className="scroll-btns">
                <button type="button" aria-label="Previous" onClick={() => scrollOthers(-1)}>‹</button>
                <button type="button" aria-label="Next" onClick={() => scrollOthers(1)}>›</button>
              </div>
              <Link className="more" href="/campaigns">All →</Link>
            </div>
          </div>
          <div className="scroller" ref={otherScrollerRef}>
            {campaigns.filter((x) => x.slug !== campaign.slug).map((c) => (
              <CampaignCard key={c.slug} campaign={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOBILE DOCK ─── */}
      <div className="cd-mobile-dock">
        <div>
          <b style={{ fontSize: '16px' }}>{fmt(currentAmt)}</b>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{isMonthly ? '/mo' : ' once'} · {p}% funded</span>
        </div>
        <Link
          href={`/donate/${campaign.slug || 'general'}?amount=${currentAmt}&freq=${isMonthly ? 'monthly' : 'once'}`}
          className="btn btn-give"
          style={{ padding: '10px 22px', fontWeight: 700, borderRadius: '999px', fontSize: '14px' }}
          onClick={() => {
            try {
              sessionStorage.setItem('sa-gift', JSON.stringify({ slug: campaign.slug, amt: currentAmt, monthly: isMonthly }));
            } catch (e) {}
          }}
        >
          Donate Now →
        </Link>
      </div>

      {toastMessage && (
        <div role="status" aria-live="polite" style={{ position: 'fixed', bottom: '84px', left: '50%', transform: 'translateX(-50%)', background: 'var(--ink)', color: '#fff', padding: '10px 22px', borderRadius: '999px', fontWeight: 700, fontSize: '13px', zIndex: 9999, boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default function CampaignPage() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>Loading...</div>}>
      <CampaignDetail />
    </Suspense>
  );
}
