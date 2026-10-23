'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Photo from '@/components/Photo';
import CampaignCard from '@/components/CampaignCard';
import { campaigns, TIERS, BREAKDOWN, IMG, fmt, pct, bySlug } from '@/lib/data';

function CampaignContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [slug, setSlug] = useState('bihar-flood-relief-2026');

  useEffect(() => {
    const qSlug = searchParams.get('slug');
    if (qSlug && bySlug(qSlug)) {
      setSlug(qSlug);
      return;
    }
    const hash = window.location.hash.replace('#', '');
    if (hash && bySlug(hash)) {
      setSlug(hash);
    }
  }, [searchParams]);

  const campaign = bySlug(slug) || campaigns[1]; // default Bihar
  const tiers = TIERS[campaign.type] || TIERS.flood;
  const parts = BREAKDOWN[campaign.type] || BREAKDOWN.flood;

  const [amount, setAmount] = useState(tiers[2]?.amt || 2500);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const currentAmt = customAmount ? parseInt(customAmount, 10) || 100 : amount;
  const suffix = isMonthly ? '/month' : '';

  const closestTier = (a) => {
    let t = tiers[0];
    tiers.forEach((x) => {
      if (a >= x.amt) t = x;
    });
    return t;
  };

  const matchedTier = closestTier(currentAmt);
  const impactSummary =
    currentAmt < tiers[0].amt
      ? `Every rupee helps. ${fmt(currentAmt)} goes straight into ${parts[0][0].split(':')[0].toLowerCase()}.`
      : `${fmt(currentAmt)}${suffix} can fund: ${matchedTier.what.charAt(0).toLowerCase() + matchedTier.what.slice(1)}${currentAmt > matchedTier.amt * 1.5 ? ', and more' : ''}.`;

  const p = pct(campaign);

  const gallery =
    campaign.type === 'flood'
      ? [campaign.img, IMG.assam3, IMG.assam7]
      : campaign.type === 'hunger'
      ? [IMG.food, IMG.langar, IMG.fooddist]
      : campaign.type === 'health'
      ? [IMG.health, IMG.hygiene, IMG.pads]
      : [null, null, null];

  const kits = {
    flood: [
      `What goes into a ${fmt(2500)} family relief kit`,
      [
        '10 kg rice and 5 kg atta',
        '2 kg dal, 1 L cooking oil, salt and spices',
        'Tarpaulin sheet for shelter',
        'Mosquito net',
        'ORS packets and basic medicines',
        'Soap, sanitary pads and a bucket',
      ],
    ],
    hunger: [
      'What a day of langar includes',
      [
        'Fresh dal, sabzi, rice and rotis',
        'Clean drinking water',
        'Served seated, with dignity',
        'Leftovers go to shelters, never wasted',
      ],
    ],
    health: [
      'What one medical camp day includes',
      [
        'Doctor consultation for every patient',
        'Free medicines for common illnesses',
        'Basic tests: BP, sugar, haemoglobin',
        'Referral and follow-up for serious cases',
      ],
    ],
    youth: [
      'What a training month includes',
      [
        'Two coached sessions a week',
        'Balls, cones and bibs for the team',
        'Fitness and nutrition guidance',
        'Match play against nearby villages',
      ],
    ],
  }[campaign.type] || kits.flood;

  const updates =
    campaign.type === 'flood'
      ? [
          [
            '20 Oct 2026',
            'Second relief camp opens',
            'Hot meals now served twice daily to over 800 people. Our medical team is treating fever and skin infections.',
          ],
          [
            '14 Oct 2026',
            'Boats reach cut-off villages',
            'Dry-ration kits and drinking water delivered by boat to six villages unreachable by road.',
          ],
          [
            '08 Oct 2026',
            '50% of the goal reached',
            'Every donor received a milestone thank-you. Funds are moving straight into kits and logistics.',
          ],
          [
            '02 Oct 2026',
            'Campaign launched',
            'Assessment completed within 2 hours of the alert; volunteers mobilised within 8 hours.',
          ],
        ]
      : [
          [
            '18 Oct 2026',
            'Monthly report published',
            'This month’s outcomes and spending are now in the utilisation report.',
          ],
          [
            '30 Sep 2026',
            'New volunteers onboarded',
            'A fresh batch of volunteers joined after training.',
          ],
          [
            '12 Sep 2026',
            'Program milestone',
            'We crossed half of this year’s goal thanks to monthly givers.',
          ],
        ];

  const wall = [
    ['Rohit S.', 5000, '11 min'],
    ['Neha K.', 1000, '24 min'],
    ['Harjeet Singh', 11000, '1 hr'],
    ['A kind soul', 2500, '2 hr'],
    ['Meera P.', 501, '3 hr'],
    ['Deepak & family', 5100, '5 hr'],
  ];

  const faqs = [
    [
      'Will I get a tax receipt?',
      'Yes. Your 80G receipt is generated instantly after payment, emailed to you, and saved in your account. Add your PAN at checkout to claim the 50% deduction.',
    ],
    [
      'How do I know my money was used here?',
      'Every donation to this campaign is tagged to it. You get dated photo updates by email, and the utilisation report shows spending by category.',
    ],
    [
      'What if the goal is exceeded?',
      'Extra funds go to the next phase of the same response, usually rehabilitation, and appear in the utilisation report.',
    ],
    [
      'Can I donate supplies instead of money?',
      'Yes. Call our 24/7 helpline on +91 98513 41234 and our coordination team will tell you what is needed and where to send it.',
    ],
    [
      'Can I get a refund?',
      'If you donated by mistake, write to help@sikhaid.ngo within 7 days with your receipt number. See our refund policy for details.',
    ],
  ];

  const handleGive = () => {
    try {
      sessionStorage.setItem(
        'sa-gift',
        JSON.stringify({
          slug: campaign.slug,
          amt: currentAmt,
          monthly: isMonthly,
        })
      );
    } catch (e) {}
    router.push(`/donate#${campaign.slug}`);
  };

  const cols = ['var(--indigo)', 'var(--saffron)', '#9AA0BF'];

  // Other campaigns scroller
  const otherScrollerRef = useRef(null);
  const scrollOthers = (dir) => {
    if (!otherScrollerRef.current) return;
    const step = Math.max(300, otherScrollerRef.current.clientWidth * 0.8);
    otherScrollerRef.current.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const copyLink = () => {
    const url = `https://www.sikhaid.ngo/campaigns/${campaign.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => triggerToast('Link copied'));
    } else {
      triggerToast(url);
    }
  };

  return (
    <>
      <main className="wrap" style={{ paddingBlock: '24px 72px' }}>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/campaigns">Campaigns</Link> /{' '}
          <span>{campaign.title}</span>
        </nav>

        <div className="stack" style={{ gap: '12px', margin: '20px 0 26px' }}>
          <div className="row" style={{ gap: '8px' }}>
            {campaign.urgent ? (
              <span className="badge urgent">
                <span className="dot pulse"></span>
                {campaign.status}
              </span>
            ) : (
              <span className="badge">{campaign.status}</span>
            )}
            <span className="badge soft">{campaign.category}</span>
            <span className="badge soft">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ verticalAlign: 'middle', marginRight: '3px' }}
              >
                <path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {campaign.location}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            {campaign.title}
          </h1>
          <p className="lead">{campaign.blurb}</p>
        </div>

        <div className="c-layout">
          <div className="c-main">
            <div className="stack" style={{ gap: '16px' }}>
              <div className="pics">
                <Photo
                  src={gallery[0]}
                  tone={campaign.tone}
                  label={campaign.title}
                  alt={campaign.title}
                />
                <Photo
                  src={gallery[1]}
                  tone={campaign.tone}
                  label="Ground report"
                  alt="Ground report photo"
                />
                <Photo
                  src={gallery[2]}
                  tone={campaign.tone}
                  label="Volunteers at work"
                  alt="Volunteers at work"
                />
              </div>

              <div className="progress-card">
                <div className="money">
                  <span>
                    <b className="num" style={{ fontSize: '32px' }}>
                      {fmt(campaign.raised)}
                    </b>{' '}
                    raised of {fmt(campaign.goal)} goal
                  </span>
                  <strong style={{ color: 'var(--indigo)', fontSize: '18px' }}>
                    {p}%
                  </strong>
                </div>
                <div
                  className="progress"
                  role="img"
                  aria-label={`${p}% of goal raised`}
                >
                  <i style={{ width: `${p}%` }}></i>
                </div>
                <div className="figs">
                  <div>
                    <b>{campaign.donors.toLocaleString('en-IN')}</b>
                    <span>donors so far</span>
                  </div>
                  <div>
                    <b>{fmt(campaign.goal - campaign.raised)}</b>
                    <span>still needed</span>
                  </div>
                  <div>
                    <b>{campaign.days ? `${campaign.days} days` : 'Ongoing'}</b>
                    <span>
                      {campaign.days ? 'left to give' : 'year-round program'}
                    </span>
                  </div>
                  <div>
                    <b>{fmt(tiers[2]?.amt || 2500)}</b>
                    <span>most chosen gift</span>
                  </div>
                </div>
              </div>

              <div className="trust">
                <span>✓ Registered under 80G</span>
                <span>✓ Instant tax receipt</span>
                <span>✓ Audited accounts</span>
                <span>✓ Photo updates on every delivery</span>
              </div>
            </div>

            {/* Anchor nav */}
            <nav className="anchor-nav" aria-label="On this page">
              <a href="#impact">What your gift does</a>
              <a href="#journey">How it reaches them</a>
              <a href="#story">The story</a>
              <a href="#money">Where money goes</a>
              <a href="#updates">Updates</a>
              <a href="#supporters">Supporters</a>
              <a href="#cfaq">Questions</a>
            </nav>

            {/* Impact section */}
            <section id="impact" aria-labelledby="impact-h">
              <span className="eyebrow">Your donation, made clear</span>
              <h2 id="impact-h">What your donation does</h2>
              <p style={{ color: 'var(--muted)' }}>
                Pick an amount to see exactly what it pays for. Tap one to set
                it in the donate box.
              </p>
              <div className="tier-list">
                {tiers.map((t) => (
                  <button
                    key={t.amt}
                    type="button"
                    className="tier"
                    aria-pressed={t.amt === currentAmt && !customAmount}
                    onClick={() => {
                      setAmount(t.amt);
                      setCustomAmount('');
                      const giveEl = document.getElementById('give');
                      if (giveEl) {
                        giveEl.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }
                    }}
                  >
                    <b className="a">{fmt(t.amt)}</b>
                    <span>{t.what}</span>
                    <span className="pick">
                      {t.amt === currentAmt && !customAmount
                        ? 'Selected ✓'
                        : 'Choose'}
                    </span>
                  </button>
                ))}
              </div>
              <div
                className="panel"
                style={{ background: 'var(--bg-alt)', border: 0 }}
              >
                <h3 style={{ fontSize: '20px' }}>{kits[0]}</h3>
                <ul
                  className="ticks"
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: '10px 20px',
                  }}
                >
                  {kits[1].map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Journey */}
            <section id="journey" aria-labelledby="journey-h">
              <span className="eyebrow">From your phone to their hands</span>
              <h2 id="journey-h">How your donation reaches them</h2>
              <ol className="journey">
                <li>
                  <span className="when">Right now</span>
                  <b style={{ color: 'var(--ink)' }}>You donate</b>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    UPI, card or net banking via Razorpay.
                  </span>
                </li>
                <li>
                  <span className="when">Instantly</span>
                  <b style={{ color: 'var(--ink)' }}>80G receipt</b>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    Emailed and saved in your account.
                  </span>
                </li>
                <li>
                  <span className="when">Within 12 hours</span>
                  <b style={{ color: 'var(--ink)' }}>Supplies bought</b>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    From local vendors near the affected area.
                  </span>
                </li>
                <li>
                  <span className="when">Within 24 hours</span>
                  <b style={{ color: 'var(--ink)' }}>Delivered</b>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    Our volunteers hand it over directly.
                  </span>
                </li>
                <li>
                  <span className="when">Within 7 days</span>
                  <b style={{ color: 'var(--ink)' }}>You see proof</b>
                  <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    Photo update and fund-use report.
                  </span>
                </li>
              </ol>
            </section>

            {/* Story */}
            <section id="story" aria-labelledby="story-h">
              <span className="eyebrow">The story</span>
              <h2 id="story-h">Why this campaign matters</h2>
              <div
                className="stack"
                style={{
                  gap: '14px',
                  fontSize: '17px',
                  lineHeight: 1.75,
                  maxWidth: '70ch',
                }}
              >
                {campaign.story.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
              <h3 style={{ fontSize: '22px', marginTop: '8px' }}>
                Impact so far
              </h3>
              <div className="grid g4" style={{ gap: '12px' }}>
                {campaign.metrics.map((m, i) => (
                  <div className="metric" key={i}>
                    <b>{m[0]}</b>
                    <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                      {m[1]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Money breakdown */}
            <section id="money" aria-labelledby="money-h">
              <span className="eyebrow">100% transparent</span>
              <h2 id="money-h">Where your money goes</h2>
              <p style={{ fontSize: '18px', color: 'var(--ink)' }}>
                Out of every <b>₹100</b> you give, <b>₹{parts[0][1]}</b> goes
                directly to {parts[0][0].split(':')[0].toLowerCase()}.
              </p>
              <div
                className="split"
                role="img"
                aria-label={parts.map((x) => `${x[0]} ${x[1]}%`).join(', ')}
              >
                {parts.map((x, i) => (
                  <i
                    key={i}
                    style={{ width: `${x[1]}%`, background: cols[i] }}
                  ></i>
                ))}
              </div>
              <div className="legend">
                {parts.map((x, i) => (
                  <div key={i}>
                    <i style={{ background: cols[i] }}></i>
                    <b>{x[1]}%</b>
                    <span>{x[0]}</span>
                  </div>
                ))}
              </div>
              <Link className="more" href="/about#compliance">
                Download the latest utilisation report (PDF) →
              </Link>
            </section>

            {/* Updates */}
            <section id="updates" aria-labelledby="up-h">
              <div className="row between">
                <h2 id="up-h">Campaign updates</h2>
                <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
                  Every donor gets these by email
                </span>
              </div>
              <ol className="timeline">
                {updates.map((u, i) => (
                  <li key={i}>
                    <span className="rail">
                      <i></i>
                      <span></span>
                    </span>
                    <div className="c">
                      <span className="eyebrow" style={{ fontSize: '12px' }}>
                        {u[0]}
                      </span>
                      <b style={{ fontSize: '18px', color: 'var(--ink)' }}>
                        {u[1]}
                      </b>
                      <p style={{ color: 'var(--muted)' }}>{u[2]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Supporters */}
            <section id="supporters" aria-labelledby="sup-h">
              <h2 id="sup-h">Recent supporters</h2>
              <div className="wall">
                {wall.map((w, i) => (
                  <div key={i}>
                    <span
                      className="av"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--indigo-soft)',
                        color: 'var(--indigo)',
                        fontWeight: 800,
                        display: 'grid',
                        placeItems: 'center',
                        flex: 'none',
                      }}
                    >
                      {w[0][0]}
                    </span>
                    <span>
                      <b style={{ color: 'var(--ink)', fontSize: '15px' }}>
                        {w[0]}
                      </b>
                      <br />
                      <span
                        style={{ fontSize: '13px', color: 'var(--muted)' }}
                      >
                        {fmt(w[1])} · {w[2]} ago
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                Only donors who chose to be shown appear here.{' '}
                {(campaign.donors - wall.length).toLocaleString('en-IN')} others
                gave privately.
              </p>
            </section>

            {/* FAQ */}
            <section id="cfaq" aria-labelledby="cfaq-h">
              <h2 id="cfaq-h">Questions donors ask</h2>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {faqs.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div className="faq-item" key={i}>
                      <h3
                        style={{
                          fontFamily: 'var(--body)',
                          letterSpacing: 0,
                        }}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                        >
                          <span>{f[0]}</span>
                          <span className="pm">{isOpen ? '−' : '+'}</span>
                        </button>
                      </h3>
                      {isOpen && (
                        <div className="ans">
                          <p>{f[1]}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="share">
                <b
                  style={{
                    color: 'var(--ink)',
                    alignSelf: 'center',
                    marginRight: '6px',
                  }}
                >
                  Share this campaign
                </b>
                <a
                  className="btn"
                  style={{ background: '#1F7A4D', color: '#fff' }}
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `I support ${campaign.title} with SikhAid. Join me: https://www.sikhaid.ngo/campaigns/${campaign.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  className="btn btn-line"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://www.sikhaid.ngo/campaigns/${campaign.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <button
                  className="btn btn-line"
                  type="button"
                  onClick={copyLink}
                >
                  Copy link
                </button>
              </div>
            </section>
          </div>

          {/* Sticky donation sidebar */}
          <aside aria-label="Donate to this campaign">
            <div className="give-panel" id="give">
              <h2 style={{ fontSize: '24px' }}>
                Support {campaign.short} today
              </h2>
              <div
                className="seg"
                role="group"
                aria-label="Donation frequency"
              >
                <button
                  type="button"
                  aria-pressed={!isMonthly}
                  onClick={() => setIsMonthly(false)}
                >
                  Give once
                </button>
                <button
                  type="button"
                  aria-pressed={isMonthly}
                  onClick={() => setIsMonthly(true)}
                >
                  Give monthly
                </button>
              </div>

              <div
                className="amts"
                role="group"
                aria-label="Choose an amount"
              >
                {tiers.map((t) => (
                  <button
                    key={t.amt}
                    type="button"
                    className="amt"
                    aria-pressed={t.amt === amount && !customAmount}
                    onClick={() => {
                      setAmount(t.amt);
                      setCustomAmount('');
                    }}
                  >
                    {fmt(t.amt)}
                  </button>
                ))}
              </div>

              <label className="field" htmlFor="custom">
                Or enter your own amount
                <span className="money-input">
                  <span>₹</span>
                  <input
                    id="custom"
                    type="number"
                    min="100"
                    inputMode="numeric"
                    placeholder="e.g. 3000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </span>
              </label>

              <div className="impact-line" aria-live="polite">
                <span
                  style={{
                    color: 'var(--saffron-deep)',
                    flex: 'none',
                    marginTop: '2px',
                  }}
                >
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
                    <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z" />
                  </svg>
                </span>
                <span>{impactSummary}</span>
              </div>

              <button
                className="btn btn-give btn-lg btn-block"
                type="button"
                onClick={handleGive}
              >
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
                  style={{ verticalAlign: 'middle', marginRight: '6px' }}
                >
                  <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z" />
                </svg>
                Donate {fmt(currentAmt)}
                {suffix}
              </button>

              <div className="tax">
                <span>Tax deduction under 80G (50%)</span>
                <b>
                  {fmt(currentAmt / 2)}
                  {suffix}
                </b>
              </div>

              <ul className="ticks">
                <li>Instant receipt by email and in your account</li>
                <li>UPI, cards, RuPay and net banking</li>
                <li>Updates on exactly what you funded</li>
              </ul>

              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '14px',
                  fontSize: '14px',
                  color: 'var(--muted)',
                }}
              >
                <b style={{ color: 'var(--ink)' }}>Just donated:</b>{' '}
                {wall
                  .slice(0, 2)
                  .map((w) => `${w[0]} · ${fmt(w[1])}`)
                  .join(' · ')}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Cross-sell other campaigns */}
      <section className="band alt" aria-labelledby="xs-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Keep the seva going</span>
              <h2 className="h-sec" id="xs-h" style={{ fontSize: '36px' }}>
                Other sewa you can support
              </h2>
            </div>
            <div className="row">
              <div className="scroll-btns">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => scrollOthers(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollOthers(1)}
                >
                  ›
                </button>
              </div>
              <Link className="more" href="/campaigns">
                All campaigns →
              </Link>
            </div>
          </div>
          <div className="scroller" ref={otherScrollerRef}>
            {campaigns
              .filter((x) => x.slug !== campaign.slug)
              .map((c) => (
                <CampaignCard key={c.slug} campaign={c} />
              ))}
          </div>
        </div>
      </section>

      {/* Mobile Fixed Give Bar */}
      <div className="mobile-give">
        <div className="info">
          <b>
            {fmt(campaign.raised)} raised · {p}%
          </b>
          <span>{fmt(campaign.goal - campaign.raised)} still needed</span>
        </div>
        <a className="btn btn-give" href="#give">
          Donate
        </a>
      </div>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--ink)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '999px',
            fontWeight: 700,
            zIndex: 9999,
            boxShadow: 'var(--shadow)',
          }}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default function CampaignPage() {
  return (
    <Suspense
      fallback={
        <div className="wrap" style={{ padding: '60px 20px', textAlign: 'center' }}>
          Loading campaign details...
        </div>
      }
    >
      <CampaignContent />
    </Suspense>
  );
}
