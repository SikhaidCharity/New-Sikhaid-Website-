'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import CampaignCard from '@/components/CampaignCard';
import Lightbox from '@/components/Lightbox';
import IndiaMap from '@/components/IndiaMap';
import ImpactDashboard from '@/components/ImpactDashboard';
import { IMG, campaigns, fmt, pct } from '@/lib/data';

export default function HomePage() {
  const nepal = campaigns.find((c) => c.slug === 'nepal-flood-relief-2026');

  // Hero video sound control
  const [isMuted, setIsMuted] = useState(true);
  const heroVideoRef = useRef(null);

  const toggleSound = () => {
    if (heroVideoRef.current) {
      const nextMuted = !isMuted;
      heroVideoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Campaigns filter
  const campGroups = ['All', 'Emergency', 'Hunger', 'Healthcare', 'Youth'];
  const [campFilter, setCampFilter] = useState('All');
  const campScrollerRef = useRef(null);

  const filteredCampaigns = campaigns.filter(
    (c) => campFilter === 'All' || c.group === campFilter
  );

  const scrollCamp = (direction) => {
    if (!campScrollerRef.current) return;
    const step = Math.max(300, campScrollerRef.current.clientWidth * 0.8);
    campScrollerRef.current.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  // Gallery
  const gal = [
    [IMG.assam1, 'Disaster relief', 'Assam flood relief operations', '#3E5872', 1],
    [IMG.food, 'Food security', 'Large-scale community food distribution', '#7A4E26'],
    [IMG.assam2, 'Disaster relief', 'Volunteers distributing relief supplies', '#46607A'],
    [IMG.pads, "Women's health", 'No Spot: sanitary pad distribution', '#6B3A4E'],
    [IMG.ratha4, 'Devotee relief', 'Ratha Yatra seva, Puri 2025', '#8A5A2B', 1],
    [IMG.langar, 'Food security', 'Volunteers preparing langar meals', '#6E4A2A'],
    [IMG.health, 'Healthcare', 'Mobile medical camp in a rural area', '#2E6B68'],
    [IMG.blanket, 'Winter relief', 'Winter blanket distribution', '#4A4A6A'],
    [IMG.hygiene, "Women's health", 'Hygiene awareness workshop', '#5A3442'],
    [IMG.ration, 'Pandemic relief', 'COVID oxygen sewa: ration kits', '#5C5030'],
    [IMG.assam8, 'Disaster relief', 'On-ground flood relief in Assam', '#34506E'],
    [IMG.ratha6, 'Devotee relief', 'Water and ORS for pilgrims', '#8A5A2B'],
  ];
  const gcats = ['All', 'Disaster relief', 'Food security', "Women's health", 'Healthcare', 'Devotee relief'];
  const [galFilter, setGalFilter] = useState('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const shownGal = gal.filter((g) => galFilter === 'All' || g[1] === galFilter);

  // Testimonials (Expanded with 15 more Indian names)
  const quotes = [
    ['Rajesh Kumar', 'Beneficiary, Punjab', 'Beneficiary', 'SikhAid saved our family during the floods. Their quick response and compassionate care gave us hope when we had lost everything.'],
    ['Sunita Devi', 'Beneficiary, Odisha', 'Beneficiary', 'The mobile medical units reached our remote village when no one else could. SikhAid truly serves with compassion.'],
    ['Priya Sharma', 'Donor, Delhi', 'Donor', 'I have been donating to SikhAid for 2 years. Their transparency and direct impact on communities is remarkable.'],
    ['Manpreet Kaur', 'Community leader, Haryana', 'Community', 'SikhAid helped rebuild our community after the cyclone. Their long-term support made all the difference.'],
    ['Ravi Patel', 'Corporate partner, Gujarat', 'Partner', 'Working as a corporate partner with SikhAid has shown me what true humanitarian work looks like. Exceptional organisation.'],
    ['Dr. Amit Singh', 'Medical volunteer, Mumbai', 'Volunteer', 'As a medical volunteer with SikhAid, I have witnessed their incredible organisational skills and dedication to serving humanity.'],
    ['Gurpreet Singh', 'Relief Volunteer, Amritsar', 'Volunteer', 'Serving langar with the team during the floods taught me the true essence of seva. Every meal is served with utmost dignity and love.'],
    ['Ananya Sen', 'Donor, Kolkata', 'Donor', 'Seeing regular photo updates and transparent reports for every donation gave me 100% trust in SikhAid. Proud to be a regular supporter.'],
    ['Rohit Deshmukh', 'Volunteer, Pune', 'Volunteer', 'When disaster strikes, SikhAid is always among the first boots on the ground. The logistical speed is truly impressive.'],
    ['Balwinder Kaur', 'Beneficiary, Patiala', 'Beneficiary', 'They provided dry ration kits and clean drinking water to our entire village when roads were cut off for days.'],
    ['Vikram Joshi', 'CSR Lead, Bengaluru', 'Partner', 'Our corporate partnership with SikhAid helped deliver critical healthcare supplies to over 15 rural primary schools in Odisha.'],
    ['Meera Nair', 'Donor, Kochi', 'Donor', 'I sponsor monthly meals for children through SikhAid. The 80G tax receipt was delivered instantly to my inbox.'],
    ['Jaswinder Singh', 'Community Volunteer, Ludhiana', 'Volunteer', 'The emergency response vehicles and medical vans operate 24/7. It feels empowering to serve alongside such committed youth.'],
    ['Kavita Murthy', 'Beneficiary, Cuttack', 'Beneficiary', 'My mother received free medicines and health check-ups from the mobile clinic right at our doorstep in rural Cuttack.'],
    ['Harpreet Singh', 'Relief Coordinator, Delhi', 'Volunteer', 'From winter blanket distribution to disaster relief camps, SikhAid ensures no vulnerable person is left behind.'],
    ['Deepa Banerjee', 'Teacher & Volunteer, Siliguri', 'Volunteer', 'During the Assam and Bengal flash floods, the volunteer teams worked day and night distributing warm meals to stranded families.'],
    ['Tarun Verma', 'Donor, Chandigarh', 'Donor', 'Clear financial accountability and genuine grassroots work. Knowing my contribution directly buys ration for families gives immense peace.'],
    ['Simranjeet Kaur', 'Beneficiary, Kurukshetra', 'Beneficiary', 'When our house was submerged, SikhAid gave us emergency shelter, blankets, and hot langar for our children twice every day.'],
    ['Suresh Choudhury', 'Village Sarpanch, Kendrapara', 'Community', 'The central community kitchen in Odisha has been a lifeline for flood-affected families across our rural panchayats.'],
    ['Arvinder Singh', 'Youth Volunteer, Jalandhar', 'Volunteer', 'Being a part of SikhAid seva changed my perspective on life. Unconditional seva with zero discrimination is their guiding light.'],
    ['Pooja Patil', 'Donor, Nagpur', 'Donor', 'Every single rupee is accounted for. Their quick response during the Nepal disaster response showed true humanitarian leadership.']
  ];
  const quoteScrollerRef = useRef(null);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  // Auto-sliding carousel for testimonials
  useEffect(() => {
    if (isQuoteHovered) return;
    const interval = setInterval(() => {
      const el = quoteScrollerRef.current;
      if (!el) return;
      const step = 310;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 3200);
    return () => clearInterval(interval);
  }, [isQuoteHovered]);

  // Map regions
  const regions = [
    { id: 'Odisha', title: 'Odisha', note: 'Headquarters in Cuttack · Health on Wheels · Ratha Yatra Seva in Puri · scholarships', tag: 'National HQ' },
    { id: 'West Bengal', title: 'Kolkata, West Bengal', note: 'Langar and relief distribution across the city', tag: 'Langar Aid' },
    { id: 'Punjab', title: 'Punjab', note: 'Flood relief and langar sewa for affected families', tag: 'Disaster Relief' },
    { id: 'Delhi', title: 'Delhi', note: 'Langar points, volunteers and donor community', tag: 'Community Hub' },
    { id: 'Haryana', title: 'Haryana', note: 'Community rebuilding and relief support', tag: 'Rehabilitation' },
    { id: 'Assam', title: 'Assam', note: 'Assam Flood Relief 2026, now in rehabilitation', tag: 'Relief Ops' },
    { id: 'Nepal', title: 'Nepal', note: 'Nepal Flood Relief 2026, live emergency response', tag: 'Live Emergency' }
  ];
  const [selectedRegion, setSelectedRegion] = useState(null);

  // FAQs
  const faqs = [
    ['Donations & 80G', 'Do my donations get 80G tax exemption?', 'Yes. SikhAid Charitable Trust is registered under Section 80G of the Income Tax Act, so eligible donations qualify for a 50% deduction. Your receipt is generated the moment your payment succeeds, emailed to you and saved in your account.'],
    ['Donations & 80G', 'Why do you ask for my PAN?', 'Income Tax rules require your PAN on 80G receipts so the donation can be reported and claimed. PAN is optional for giving, but needed if you want to claim the deduction.'],
    ['Donations & 80G', 'Can I cancel a monthly donation?', 'Yes. Pause, change the amount or cancel anytime from My account, or write to help@sikhaid.ngo. We remind you 3 days before every debit.'],
    ['Campaigns', 'Where does my donation actually go?', 'Every donation funds a specific outcome: meals, hygiene kits, shelter and rehabilitation for disaster-affected families. Each campaign page shows a fund-use breakdown and dated updates, so you can see exactly how your gift was used.'],
    ['Campaigns', 'What happens if a campaign raises more than its goal?', 'Extra funds go to the next phase of the same response, usually rehabilitation, and are shown in that campaign’s utilisation report.'],
    ['About SikhAid', 'Is SikhAid a registered charity?', 'Yes. SikhAid Charitable Trust is a registered Indian non-governmental organisation operating since 2020, working across multiple states with full transparency on fund utilisation.'],
    ['Volunteering', 'How can I volunteer with SikhAid?', 'Visit Get Involved → Volunteering and submit your details. We respond within a few working days with open roles and field opportunities that match your skills and location.'],
    ['CSR', 'How can companies partner or contribute CSR funds?', 'We work with corporate partners on CSR projects across disaster relief, langar, sanitation drives and rural healthcare. Write to help@sikhaid.ngo and our partnerships team replies within 2 business days.'],
    ['Account', 'Do I need an account to donate?', 'No, you can give as a guest. A free account lets you see your full giving history, download every receipt and manage monthly donations.'],
    ['Account', 'How do I get all my receipts at tax time?', 'Log in to My account → Donation history. Filter by financial year and download every receipt, or one consolidated annual statement that we also email each March.']
  ];
  const fcats = ['All', 'Donations & 80G', 'Campaigns', 'About SikhAid', 'Volunteering', 'CSR', 'Account'];
  const [faqCat, setFaqCat] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);

  const filteredFaqs = faqs.map((f, i) => ({ ...f, origIndex: i })).filter((f) => faqCat === 'All' || f[0] === faqCat);

  // FAQ view all toggle
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const visibleFaqs = faqCat === 'All' && !showAllFaqs ? filteredFaqs.slice(0, 5) : filteredFaqs;

  // Copy helper
  const [copiedText, setCopiedText] = useState('');
  const copy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    }
  };

  const partners = [
    ['Axis Bank', 'https://www.sikhaid.ngo/partners/AxisBank.svg'],
    ["Domino's", 'https://www.sikhaid.ngo/partners/DominosLogo.svg'],
    ['Duramix', 'https://www.sikhaid.ngo/partners/Duramix.webp'],
    ['Hero MotoCorp', 'https://www.sikhaid.ngo/partners/Hero_MotoCorp.svg'],
    ['realme', 'https://www.sikhaid.ngo/partners/realme_logo.svg'],
    ['TCS', 'https://www.sikhaid.ngo/partners/tcs_logo.svg']
  ];

  const payLogos = [
    ['UPI', 'https://www.sikhaid.ngo/paymentLogo/UPI_logo.svg'],
    ['RuPay', 'https://www.sikhaid.ngo/paymentLogo/RuPay.svg'],
    ['Visa', 'https://www.sikhaid.ngo/paymentLogo/visa.svg'],
    ['Mastercard', 'https://www.sikhaid.ngo/paymentLogo/mastercard.svg'],
    ['Razorpay', 'https://www.sikhaid.ngo/paymentLogo/razorpay.svg']
  ];

  return (
    <main>
      {/* HERO: flagship video background with dark blue shade down-to-up and clean 2-line title */}
      <section className="hero" aria-labelledby="hero-h">
        {/* Background Video */}
        <div className="hero-video-bg">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={IMG.food}
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
            <source src="https://cdn.feedingindia.org/fi-web/assets/MTc5MTQwMTU1MTE4OTE3MzAxMg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Down to up dark blue faded shade overlay */}
        <div className="hero-overlay-fade" aria-hidden="true" />

        {/* Hero Center Content - Clean 2-line text & Sound Button (Reference Image) */}
        <div className="hero-center-content">
          {/* Sound Toggle Button */}
          <button
            type="button"
            className="hero-sound-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
          >
            {isMuted ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span>sound off</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span>sound on</span>
              </>
            )}
          </button>

          {/* Simple 2-Line Text */}
          <h1 id="hero-h" className="hero-simple-title">
            <span className="hero-line-1">Langar for all. Seva for all.</span>
            <span className="hero-line-2">Nepal needs you today.</span>
          </h1>

          {/* Scroll Down Indicator */}
          <a href="#emergencies" className="hero-scroll-down" aria-label="Scroll down to active emergencies">
            <span>Scroll down</span>
            <svg className="hero-scroll-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>

        {/* Live Donor Names & Amounts touching the bottom bezels of the hero screen */}
        <div className="hero-donor-ticker" aria-label="Recent donor contributions">
          <div className="hero-donor-tag">
            <span className="dot pulse" style={{ width: '8px', height: '8px', background: 'var(--ink)' }}></span>
            <span>Live Donors</span>
          </div>
          <div className="hero-donor-track">
            <span><b>Arjun</b> <em className="donor-val">₹2,100</em></span>
            <span><b>Simran</b> <em className="donor-val">₹501</em></span>
            <span><b>Rohit</b> <em className="donor-val">₹5,000</em></span>
            <span><b>Kavya</b> <em className="donor-val">₹1,000</em></span>
            <span><b>Gurpreet</b> <em className="donor-val">₹11,000</em></span>
            <span><b>Neha</b> <em className="donor-val">₹1,000</em></span>
            <span><b>Harjeet</b> <em className="donor-val">₹2,500</em></span>
            <span><b>Jaswinder</b> <em className="donor-val">₹10,000</em></span>
            <span><b>Manpreet</b> <em className="donor-val">₹5,000</em></span>
            <span><b>Aman</b> <em className="donor-val">₹1,500</em></span>
            <span><b>Tanya</b> <em className="donor-val">₹2,000</em></span>
            <span><b>Vikram</b> <em className="donor-val">₹3,500</em></span>
            {/* Seamless loop duplicates */}
            <span aria-hidden="true"><b>Arjun</b> <em className="donor-val">₹2,100</em></span>
            <span aria-hidden="true"><b>Simran</b> <em className="donor-val">₹501</em></span>
            <span aria-hidden="true"><b>Rohit</b> <em className="donor-val">₹5,000</em></span>
            <span aria-hidden="true"><b>Kavya</b> <em className="donor-val">₹1,000</em></span>
            <span aria-hidden="true"><b>Gurpreet</b> <em className="donor-val">₹11,000</em></span>
            <span aria-hidden="true"><b>Neha</b> <em className="donor-val">₹1,000</em></span>
            <span aria-hidden="true"><b>Harjeet</b> <em className="donor-val">₹2,500</em></span>
            <span aria-hidden="true"><b>Jaswinder</b> <em className="donor-val">₹10,000</em></span>
            <span aria-hidden="true"><b>Manpreet</b> <em className="donor-val">₹5,000</em></span>
            <span aria-hidden="true"><b>Aman</b> <em className="donor-val">₹1,500</em></span>
            <span aria-hidden="true"><b>Tanya</b> <em className="donor-val">₹2,000</em></span>
            <span aria-hidden="true"><b>Vikram</b> <em className="donor-val">₹3,500</em></span>
          </div>
        </div>
      </section>

      {/* Active emergencies */}
      <section className="emerg" id="emergencies" aria-labelledby="em-h">
        <div className="wrap stack" style={{ paddingBlock: '36px 40px', gap: '18px' }}>
          <div className="row between">
            <h2 id="em-h" style={{ fontSize: '26px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span className="dot pulse" style={{ color: 'var(--red)', width: '12px', height: '12px' }}></span>
              Active emergencies
            </h2>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#7A2F28' }}>
              3 live responses · updated 2 hours ago
            </span>
          </div>
          <div className="grid g3">
            {campaigns
              .filter((c) => c.group === 'Emergency')
              .map((c) => (
                <Link key={c.slug} className="ecard" href={`/campaign#${c.slug}`}>
                  <Photo src={c.img} tone={c.tone} label={c.title} style={{ width: '108px', flex: 'none', borderRadius: '12px', minHeight: '108px' }} />
                  <span className="stack" style={{ gap: '5px', minWidth: 0 }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--red)' }}>
                      {c.location} · {c.status}
                    </span>
                    <b style={{ color: 'var(--ink)', fontSize: '16px', lineHeight: 1.3 }}>{c.title}</b>
                    <span style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                      {fmt(c.raised)} of {fmt(c.goal)} · {pct(c)}%
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--red)' }}>
                      Donate &amp; know more →
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="band" aria-labelledby="camp-h" id="campaigns">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Our campaigns</span>
              <h2 className="h-sec" id="camp-h">Choose a cause close to your heart</h2>
              <p className="lead">Every campaign shows how much has been raised, how many people have given, and what is still needed.</p>
            </div>
          </div>

          <div className="camp-filter-row">
            <div className="chips" role="group" aria-label="Filter campaigns">
              {campGroups.map((g) => (
                <button
                  key={g}
                  className="chip"
                  type="button"
                  aria-pressed={campFilter === g}
                  onClick={() => setCampFilter(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <Link className="camp-view-all" href="/campaigns" aria-label="View all campaigns">
              <span className="camp-view-all-text">View all</span>
              <span className="camp-view-all-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="scroller" ref={campScrollerRef}>
            {filteredCampaigns.map((c) => (
              <CampaignCard key={c.slug} campaign={c} />
            ))}
          </div>
        </div>
      </section>


      {/* HOW WE RESPOND - OUR PROCESS */}
      <section className="band" aria-labelledby="resp-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Our process</span>
              <h2 className="h-sec" id="resp-h">How we respond to a crisis</h2>
              <p className="lead">A proven 4-stage emergency response framework, refined across hundreds of ground operations. The clock starts the moment a disaster strikes.</p>
            </div>
          </div>
          
          <div className="process-stages-grid">
            {/* Stage 1 */}
            <div className="process-card">
              <div className="process-card-top">
                <span className="process-step-num">01</span>
                <span className="process-time-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Within 2 Hours
                </span>
              </div>
              <div className="process-icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
                </svg>
              </div>
              <h3 className="process-card-title">Alert &amp; Assess</h3>
              <p className="process-card-desc">24/7 crisis monitoring and rapid on-ground situation assessment to verify needs and mobilize local volunteers.</p>
              <div className="process-action-tag">
                <span className="action-dot"></span>
                <span><b>Action:</b> SOS verification &amp; field reconnaissance</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="process-card">
              <div className="process-card-top">
                <span className="process-step-num">02</span>
                <span className="process-time-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Within 8 Hours
                </span>
              </div>
              <div className="process-icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 className="process-card-title">Mobilise Teams</h3>
              <p className="process-card-desc">Trained SikhAid volunteers muster, and relief convoys loaded with food, water, blankets, and medical kits depart.</p>
              <div className="process-action-tag">
                <span className="action-dot"></span>
                <span><b>Action:</b> Volunteer dispatch &amp; mobile kitchen fleet</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="process-card">
              <div className="process-card-top">
                <span className="process-step-num">03</span>
                <span className="process-time-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Within 24 Hours
                </span>
              </div>
              <div className="process-icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                </svg>
              </div>
              <h3 className="process-card-title">Immediate Relief</h3>
              <p className="process-card-desc">Hot langar, dry ration kits, water filtration, temporary shelters, and boat evacuations reach stranded families.</p>
              <div className="process-action-tag">
                <span className="action-dot"></span>
                <span><b>Action:</b> Direct ground rescue &amp; community langar</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="process-card">
              <div className="process-card-top">
                <span className="process-step-num">04</span>
                <span className="process-time-badge ongoing">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                  Sustained Recovery
                </span>
              </div>
              <div className="process-icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3 className="process-card-title">Rehabilitation</h3>
              <p className="process-card-desc">Long-term recovery: rebuilding damaged homes and schools, restoring agricultural bunds, and restoring livelihoods.</p>
              <div className="process-action-tag">
                <span className="action-dot"></span>
                <span><b>Action:</b> Rebuilding homes, schools &amp; farming tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOTAL LIVES IMPACTED - Interactive Dashboard */}
      <ImpactDashboard />

      {/* HOW CAN YOU HELP */}
      <section className="band" aria-labelledby="help-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Support our cause</span>
              <h2 className="h-sec" id="help-h">How can you help?</h2>
              <p className="lead">Every contribution, big or small, one-time or recurring, directly funds humanitarian work across India.</p>
            </div>
          </div>
          <div className="grid g3">
            {/* Card 1: One-time donation */}
            <div className="help-card">
              <div className="help-card-head">
                <div className="help-card-icon" style={{ background: '#FFF4E5', color: '#D97706' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </div>
                <span className="help-card-badge" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>Instant 80G</span>
              </div>
              <h3>One-time donation</h3>
              <p>Make an immediate impact on emergency relief, nutritious langar, medical aid and crisis support across India.</p>
              <ul className="ticks">
                <li>50% tax exemption with instant 80G digital receipt</li>
                <li>100% transparent live tracking on fund use</li>
              </ul>
              <Link className="btn btn-dark" href="/donate">
                Donate now <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 2: Monthly donation (Featured) */}
            <div className="help-card help-card-featured">
              <div className="help-card-head">
                <div className="help-card-icon" style={{ background: '#FEF3C7', color: '#B45309' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </div>
                <span className="help-card-badge" style={{ background: 'var(--saffron)', color: 'var(--ink)', fontWeight: 800 }}>★ Most impact</span>
              </div>
              <h3>Monthly donation</h3>
              <p>Predictable recurring support lets our teams maintain ongoing emergency readiness and sustained rehabilitation.</p>
              <ul className="ticks">
                <li>Auto-debit via UPI, cards or net banking</li>
                <li>Modify amount, pause, or cancel anytime</li>
              </ul>
              <Link className="btn btn-give" href="/donate#monthly">
                Start monthly giving <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 3: CSR partnership */}
            <div className="help-card">
              <div className="help-card-head">
                <div className="help-card-icon" style={{ background: '#EBF1FF', color: '#1E3A8A' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2ZM18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2ZM10 6h4M10 10h4M10 14h4M10 18h4"/>
                  </svg>
                </div>
                <span className="help-card-badge" style={{ background: '#EEF2F6', color: '#2563EB' }}>Corporate</span>
              </div>
              <h3>CSR partnership</h3>
              <p>Partner with SikhAid for corporate social responsibility initiatives that create measurable grassroots change.</p>
              <ul className="ticks">
                <li>Custom CSR programs &amp; geographic targeting</li>
                <li>Third-party certified impact reporting</li>
              </ul>
              <Link className="btn btn-line" href="/get-involved#csr">
                Talk to our team <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 4: Gift a birthday donation */}
            <div className="help-card">
              <div className="help-card-head">
                <div className="help-card-icon" style={{ background: '#FFEBE6', color: '#C2410C' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="8" width="18" height="14" rx="2"/>
                    <path d="M12 8v14M3 12h18M7.5 8a2.5 2.5 0 0 1 0-5A4.5 4.5 0 0 1 12 7.5a4.5 4.5 0 0 1 4.5-4.5 2.5 2.5 0 0 1 0 5"/>
                  </svg>
                </div>
                <span className="help-card-badge" style={{ background: '#FFF1E6', color: '#C2410C' }}>Dedication</span>
              </div>
              <h3>Gift a birthday donation</h3>
              <p>Dedicate seva in honour of someone you love. They receive a personalized certificate and e-card on their birthday.</p>
              <ul className="ticks">
                <li>Scheduled digital e-card on the morning of their day</li>
                <li>Includes personal blessing note &amp; 80G receipt</li>
              </ul>
              <Link className="btn btn-line" href="/donate#gift">
                Gift seva <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 5: Volunteer */}
            <div className="help-card">
              <div className="help-card-head">
                <div className="help-card-icon" style={{ background: '#E6FFFA', color: '#0F766E' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span className="help-card-badge" style={{ background: '#E6FBF7', color: '#0D9488' }}>On ground</span>
              </div>
              <h3>Become a volunteer</h3>
              <p>Join 300+ dedicated volunteers responding to emergencies, serving langar, and supporting medical missions.</p>
              <ul className="ticks">
                <li>Disaster rescue, medical &amp; langar kitchen roles</li>
                <li>Remote coordination &amp; digital seva opportunities</li>
              </ul>
              <Link className="btn btn-line" href="/get-involved#volunteer">
                Become a volunteer <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Card 6: Sponsor a program */}
            <div className="help-card">
              <div className="help-card-head">
                <div className="help-card-icon" style={{ background: '#F3E8FF', color: '#6D28D9' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
                  </svg>
                </div>
                <span className="help-card-badge" style={{ background: '#F5EEFD', color: '#7C3AED' }}>Special occasion</span>
              </div>
              <h3>Sponsor a program</h3>
              <p>Directly underwrite a complete unit of seva: a full day of community langar, a rural health camp, or 100 disaster kits.</p>
              <ul className="ticks">
                <li>Ideal for anniversaries, birthdays and memorials</li>
                <li>Photo documentation &amp; personalized field report</li>
              </ul>
              <Link className="btn btn-line" href="/get-involved#sponsor">
                See sponsorships <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WAYS TO DONATE */}
      <section className="band alt" aria-labelledby="ways-h" id="ways">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Ways to donate</span>
              <h2 className="h-sec" id="ways-h">Give the way that suits you</h2>
              <p className="lead">Every method qualifies for an 80G receipt. Online gifts receive their certificate instantly; for direct bank wire transfers, share your details and we email your 80G statement within 48 hours.</p>
            </div>
          </div>
          <div className="grid g2" style={{ maxWidth: '1080px', margin: '0 auto', gap: '28px' }}>
            <div className="pay-tile" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Donate online</h3>
                <span className="help-card-badge" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>Instant 80G</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>The fastest, most secure method. Complete your contribution with UPI, credit/debit cards, RuPay, or net banking through Razorpay&apos;s encrypted checkout.</p>
              <div className="logo-row">
                {payLogos.map(([name, url]) => (
                  <span key={name} className="lg">
                    {name}
                    <img src={url} alt={name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </span>
                ))}
              </div>
              <ul className="ticks" style={{ marginBlock: '8px 16px' }}>
                <li>Instant 80G tax receipt generated and emailed immediately</li>
                <li>Automatically recorded and saved to your donor profile</li>
                <li>One-time donation and recurring monthly giving options</li>
              </ul>
              <Link className="btn btn-give" href="/donate" style={{ marginTop: 'auto', minHeight: '50px', fontSize: '16px', fontWeight: 800 }}>
                Donate online now <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="pay-tile" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Bank transfer / NEFT / RTGS</h3>
                <span className="help-card-badge" style={{ background: '#EEF2F6', color: '#2563EB' }}>Direct Transfer</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>For large contributions, family trusts, CSR disbursements, or direct institutional transfers:</p>
              <dl className="kv" style={{ background: 'var(--bg-alt)', padding: '16px 18px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <dt>Account name</dt>
                <dd>SikhAid Charitable Trust</dd>
                <button className="copy" type="button" onClick={() => copy('SikhAid Charitable Trust')}>
                  {copiedText === 'SikhAid Charitable Trust' ? 'Copied!' : 'Copy'}
                </button>

                <dt>Account no.</dt>
                <dd>[ACCOUNT NUMBER]</dd>
                <button className="copy" type="button" onClick={() => copy('[ACCOUNT NUMBER]')}>
                  {copiedText === '[ACCOUNT NUMBER]' ? 'Copied!' : 'Copy'}
                </button>

                <dt>IFSC Code</dt>
                <dd>[IFSC CODE]</dd>
                <button className="copy" type="button" onClick={() => copy('[IFSC CODE]')}>
                  {copiedText === '[IFSC CODE]' ? 'Copied!' : 'Copy'}
                </button>

                <dt>Bank &amp; Branch</dt>
                <dd>[BANK, BRANCH]</dd>
                <span></span>
              </dl>
              <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
                After initiating your wire transfer, email the transaction screenshot along with your PAN to <a href="mailto:help@sikhaid.ngo"><b>help@sikhaid.ngo</b></a> to receive your 80G certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION - OUR PURPOSE */}
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
              <p className="big">To provide immediate humanitarian aid and disaster relief to communities across India during times of crisis, serving with compassion, dignity and unwavering commitment.</p>
              <ul className="ticks">
                <li>Rapid emergency response within 24 hours</li>
                <li>Community-centred relief and rehabilitation</li>
                <li>100% transparent fund utilisation</li>
              </ul>
            </div>
            <div className="mv mv-vision">
              <span className="eyebrow">Our vision</span>
              <p className="big">A resilient India where no community faces disaster alone: a network of compassionate service reaching every corner of the nation.</p>
              <ul className="ticks">
                <li>Pan-India disaster preparedness network</li>
                <li>Empowered communities with resilience training</li>
                <li>Technology-driven humanitarian response</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR IMPACT GALLERY */}
      <section className="band" aria-labelledby="gal-h">
        <div className="wrap">
          <div className="sec-head" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px', marginBottom: '24px' }}>
            <div className="stack" style={{ alignItems: 'center', textAlign: 'center' }}>
              <span className="eyebrow">Our impact</span>
              <h2 className="h-sec" id="gal-h" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
                Transforming lives across India through compassionate service
              </h2>
            </div>

            {/* Category chips centered in between */}
            <div className="chips" role="group" aria-label="Filter gallery" style={{ justifyContent: 'center', margin: '6px 0 2px 0' }}>
              {gcats.map((g) => (
                <button
                  key={g}
                  className="chip"
                  type="button"
                  aria-pressed={galFilter === g}
                  onClick={() => setGalFilter(g)}
                >
                  {g}
                </button>
              ))}
            </div>

            <Link className="more" href="/about#gallery" style={{ justifyContent: 'center' }}>
              View full gallery →
            </Link>
          </div>

          <div className="gallery">
            {shownGal.map((g, i) => (
              <button
                key={i}
                type="button"
                className={g[4] && galFilter === 'All' ? 'big' : ''}
                aria-label={`View photo: ${g[2]}`}
                onClick={() => setActivePhotoIndex(i)}
              >
                <Photo
                  src={g[0]}
                  label={g[2]}
                  tone={g[3]}
                  alt={g[2]}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="band alt" aria-labelledby="test-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Testimonials</span>
              <h2 className="h-sec" id="test-h">What people say about us</h2>
              <p className="lead">Hear from the communities we serve and the partners who support our mission.</p>
            </div>
          </div>
          <div
            className="scroller"
            ref={quoteScrollerRef}
            onMouseEnter={() => setIsQuoteHovered(true)}
            onMouseLeave={() => setIsQuoteHovered(false)}
            style={{ gridAutoColumns: 'minmax(280px, 320px)', scrollBehavior: 'smooth' }}
          >
            {quotes.map((q, i) => (
              <figure key={i} className="quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#F6A21A" aria-hidden="true">
                  <path d="M4 17c0-5 2-9 7-11l1 2c-3 1.5-4 3.5-4 5h3v6H4zm10 0c0-5 2-9 7-11l1 2c-3 1.5-4 3.5-4 5h3v6h-7z"/>
                </svg>
                <blockquote>{q[3]}</blockquote>
                <figcaption className="who">
                  <span className="av">{q[0].replace('Dr. ', '')[0]}</span>
                  <span>
                    <b style={{ color: 'var(--ink)' }}>{q[0]}</b>
                    <br />
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{q[1]}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CELEBRITY SUPPORT */}
      <section className="band celeb-section" aria-labelledby="cel-h">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '18px' }}>
            <div className="stack">
              <span className="eyebrow">Support from</span>
              <h2 className="h-sec celeb-headline" id="cel-h">Renowned personalities who lend their voice</h2>
              <p className="lead" style={{ fontSize: '14.5px', margin: 0 }}>Artists and public figures who have stood with SikhAid&apos;s seva and helped more people hear about it.</p>
            </div>
          </div>
          <div className="celeb-grid">
            {[
              [IMG.badshah, 'Badshah', 'Rapper & music artist', '#2D3354'],
              [IMG.jaspreet, 'Jaspreet Singh', 'Stand-up comedian', '#4C3A2E'],
              [IMG.banita, 'Banita Sandhu', 'Actress', '#5A3442'],
              [IMG.badshah, 'Diljit Dosanjh', 'Singer & actor', '#1E293B'],
              [IMG.jaspreet, 'Sonu Sood', 'Actor & humanitarian', '#334155'],
              [IMG.banita, 'Harbhajan Singh', 'Cricketer & MP', '#475569'],
            ].map(([src, name, role, tone], idx) => (
              <div key={`${name}-${idx}`} className="celeb">
                <Photo src={src} label={name} tone={tone} alt={name} />
                <div>
                  <h3>{name}</h3>
                  <span>{role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEWA ACROSS INDIA MAP */}
      <section className="band sewa-presence-section" aria-labelledby="map-h" id="map">
        <div className="wrap">
          {/* Centered Top Heading for PC and Phone */}
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Presence &amp; Operations</span>
              <h2 className="h-sec" id="map-h">Sewa across India &amp; Nepal</h2>
              <p className="lead">
                Where our volunteer teams, emergency kitchens and relief vehicles operate 24/7. Select a region to view on-ground seva.
              </p>
            </div>
          </div>

          <div className="map-wrap">
            {/* Left: Map Panel */}
            <div className="map-panel">
              <div className="map-panel-bar">
                <span className="map-live-pill">
                  <span className="dot pulse"></span> Live Operations Map
                </span>
                <span className="map-regions-count">7 Active Hubs</span>
              </div>
              <IndiaMap selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
              <div className="map-panel-footer">
                <span>💡 Click any highlighted state on the map to explore ground operations.</span>
              </div>
            </div>

            {/* Right: Regions Stack / Selected Description */}
            <div className={`map-desc-panel ${selectedRegion ? 'active-selection' : ''}`}>
              {selectedRegion ? (
                (() => {
                  const r = regions.find((x) => x.id === selectedRegion);
                  return (
                    <div className="map-selected-card">
                      <div className="map-selected-header">
                        <div>
                          <span className="map-selected-eyebrow">{r?.tag || 'Active Region'}</span>
                          <h3 className="map-selected-title">{r?.title || selectedRegion}</h3>
                        </div>
                        <button
                          type="button"
                          className="map-close-btn"
                          aria-label="Close details"
                          onClick={() => setSelectedRegion(null)}
                        >
                          ✕
                        </button>
                      </div>
                      <p className="map-selected-note">{r?.note || 'Ground seva, emergency relief and volunteer operations.'}</p>
                      
                      <div className="map-selected-stats">
                        <div className="map-mini-stat">
                          <span className="mini-num">24/7</span>
                          <span className="mini-label">Relief Readiness</span>
                        </div>
                        <div className="map-mini-stat">
                          <span className="mini-num">100%</span>
                          <span className="mini-label">Ground Verified</span>
                        </div>
                      </div>

                      <div className="map-selected-action">
                        <Link href="/campaigns" className="btn btn-sm btn-primary">
                          Support Sewa in {r?.title || selectedRegion} →
                        </Link>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="map-default-desc">
                  <div className="map-info-intro">
                    <h4 style={{ fontSize: '18px', color: 'var(--ink)', margin: '0 0 8px 0' }}>Active Regional Operations</h4>
                    <p style={{ fontSize: '14.5px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                      Click on any highlighted state on the map to view real-time volunteer activity, emergency kitchens, and regional programs.
                    </p>
                  </div>
                  <div className="region-list">
                    {regions.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        className="region"
                        aria-pressed={selectedRegion === r.id}
                        onClick={() => setSelectedRegion(selectedRegion === r.id ? null : r.id)}
                      >
                        <div className="region-pin" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        </div>
                        <div className="region-content">
                          <b>{r.title}</b>
                          <span>{r.note}</span>
                        </div>
                        {r.tag && (
                          <span className="region-tag">{r.tag}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STORIES FROM THE FIELD */}
      <section className="band alt" aria-labelledby="blog-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Latest updates</span>
              <h2 className="h-sec" id="blog-h">Stories from the field</h2>
            </div>
            <Link className="more" href="/blog">View all posts →</Link>
          </div>
          <div className="grid g4 updates-grid">
            {[
              [IMG.langar, '#4A4A6A', 'Volunteer stories', '20 Jan 2025', 'Meet our volunteers: stories from the heart of SikhAid', 'The people who dedicate their time and energy to serve communities across India.'],
              [IMG.food, '#7A4E26', 'Food security', '18 Jan 2025', 'Inside our community kitchens: a day with Langar Aid', '300+ volunteers preparing over 2,000 fresh meals daily for vulnerable communities.'],
              [IMG.assam1, '#3E5872', 'Disaster relief', '16 Jan 2025', 'Assam flood response: delivering emergency kits to 4,000 families', 'Boats deployed with clean water, ration kits and urgent supplies to cut-off villages.'],
              [null, '#2E6B68', 'Education', '15 Jan 2025', 'Educational support: scholarships changing lives in Odisha', 'Scholarships, school supplies and tuition support breaking the cycle of poverty.']
            ].map(([img, tone, cat, date, title, excerpt], i) => (
              <article key={i} className="post">
                <Photo src={img} label={cat} tone={tone} alt={title} />
                <div className="b">
                  <span className="eyebrow" style={{ fontSize: '12px' }}>{cat} · {date}</span>
                  <h3><Link href="/blog">{title}</Link></h3>
                  <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{excerpt}</p>
                  <Link className="more" href="/blog" style={{ marginTop: 'auto' }}>Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS (Image 3 Redesign: Header -> Categories -> Questions) */}
      <section className="band alt" aria-labelledby="faq-h">
        <div className="wrap">
          {/* 1. Header Centered */}
          <div className="faq-header-center">
            <span className="eyebrow">COMMON QUESTIONS</span>
            <h2 className="h-sec" id="faq-h">Frequently asked questions</h2>
            <p className="lead" style={{ fontSize: '17px' }}>
              Common questions about SikhAid, donations, 80G tax benefits, and how to get involved.
            </p>
          </div>

          {/* 2. Categories directly below the heading */}
          <div className="chips faq-chips-center" role="group" aria-label="Filter FAQ topics">
            {fcats.map((c) => (
              <button
                key={c}
                className="chip"
                type="button"
                aria-pressed={faqCat === c}
                onClick={() => setFaqCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 3. Questions accordion list below categories */}
          <div className="faq-accordion-wrap">
            <div className="faq-list">
              {visibleFaqs.map((f, i) => (
                <div key={i} className={`faq-card ${openFaq === f.origIndex ? 'open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={openFaq === f.origIndex}
                      onClick={() => setOpenFaq(openFaq === f.origIndex ? -1 : f.origIndex)}
                    >
                      <span className="faq-q">{f[1]}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {openFaq === f.origIndex ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  {openFaq === f.origIndex && (
                    <div className="faq-body">
                      <p>{f[2]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {faqCat === 'All' && faqs.length > 5 && (
              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <button
                  type="button"
                  className="btn btn-sm btn-line"
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  style={{ minHeight: '36px', fontSize: '13.5px', padding: '6px 18px', margin: '0 auto' }}
                >
                  {showAllFaqs ? 'Show fewer questions ↑' : `View all 10 questions (${faqs.length - 5} more) ↓`}
                </button>
              </div>
            )}

            <div className="faq-footer-help">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>💬</span>
                <div>
                  <b style={{ color: 'var(--ink)', display: 'block', fontSize: '15px' }}>Need more assistance?</b>
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Our donor support team is available 24/7 to help with receipts or queries.</span>
                </div>
              </div>
              <a className="btn btn-dark btn-sm" href="mailto:help@sikhaid.ngo">
                Email help@sikhaid.ngo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      {activePhotoIndex !== null && shownGal[activePhotoIndex] && (
        <Lightbox
          item={shownGal[activePhotoIndex]}
          index={activePhotoIndex}
          total={shownGal.length}
          onClose={() => setActivePhotoIndex(null)}
          onPrev={() => setActivePhotoIndex((activePhotoIndex - 1 + shownGal.length) % shownGal.length)}
          onNext={() => setActivePhotoIndex((activePhotoIndex + 1) % shownGal.length)}
        />
      )}
    </main>
  );
}
