// /nospotindia: the No Spot campaign landing page (menstrual health and dignity).
// Reached only by its link (ads, WhatsApp, emails): not in the menus, and kept out of search results.
// Every Donate button goes to the live site's No Spot donation page (sikhaid.ngo), which takes real
// Razorpay payments and records the Meta "Purchase" through the same GTM. The ad's UTM tags go along.
import { CAMPAIGN_IMPACT_TIERS, bySlug, fmt } from '@/lib/data';
import Gtm from '@/components/Gtm';
import ShareButton from './ShareButton';
import StickyDonate from './StickyDonate';
import KeepUtm from './KeepUtm';
import './no-spot.css';

export const metadata = {
  title: 'No Spot: Dignity for Every Period | SikhAid Charitable Trust',
  description:
    'Help girls and women in rural India manage their periods safely. Your gift provides sanitary pads, awareness workshops and clean facilities.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'No Spot: Dignity for Every Period',
    description: 'Safe sanitary pads, honest conversations and clean facilities for girls and women across India.',
    images: ['/nospotindia/hero.jpg'],
  },
};

const DONATE = 'https://www.sikhaid.ngo/donate/no-spot';
const MONTHLY = `${DONATE}?type=monthly`;
// Kept on the site itself (public/nospotindia), so the page never depends on an outside image host.
const PHOTOS = {
  hero: '/nospotindia/hero.jpg',
  workshop: '/nospotindia/workshop.jpg',
  distribution: '/nospotindia/distribution.jpg',
};

// "Our story": mission, vision and approach.
const STORY = [
  {
    label: 'Our mission',
    title: 'Safe, private and without shame',
    text: 'To make sure every girl and woman we reach can manage her period safely, privately and without shame, with sanitary pads, hygiene essentials and honest health education.',
  },
  {
    label: 'Our vision',
    title: 'A period never decides her future',
    text: 'An India where a period never decides whether a girl goes to school, goes to work, or speaks up about her own health.',
  },
  {
    label: 'Our approach',
    title: 'Where the need is greatest',
    text: 'We work in the urban slums of Pune and the villages of Odisha, pairing monthly pad distribution with workshops, sanitation drives and counselling, so change lasts beyond one visit.',
  },
];

const ISSUE = [
  { title: 'The silence', text: 'In many homes, periods are still something to hide. Girls grow up without being told what is happening to their bodies, or that it is normal.' },
  { title: 'The gap', text: 'Safe pads cost money many families cannot spare, and clean, private toilets are often missing. Old cloth, used again and again, becomes the only option.' },
  { title: 'The cost', text: 'Infections, missed school days and lost wages. A natural part of life ends up holding girls and women back, every single month.' },
];

// Four pillars of the work.
const PILLARS = [
  { icon: 'pad', title: 'Access', text: 'Biodegradable sanitary pads and hygiene essentials, handed out every month to girls and women who need them.' },
  { icon: 'talk', title: 'Awareness', text: 'Workshops that replace shame with knowledge, for girls, mothers and whole communities.' },
  { icon: 'home', title: 'Hygiene', text: 'Sanitation drives and portable toilets, so every woman has a clean, private place to go.' },
  { icon: 'care', title: 'Care', text: 'Health counselling for period problems, and a safe space to ask questions no one else will answer.' },
];

// "Stronger together": ways to help.
const HELP = [
  { title: 'Give once', text: 'Every gift buys pads, kits and workshops for girls who need them now.', href: DONATE, cta: 'Donate' },
  { title: 'Give monthly', text: 'Periods come every month. A monthly gift keeps a girl supplied all year.', href: MONTHLY, cta: 'Give monthly' },
  { title: 'Volunteer', text: 'Join distribution drives and awareness sessions with the SikhAid team.', href: '/volunteering', cta: 'Volunteer' },
  { title: 'Spread the word', text: 'Talking about periods openly is how the silence ends. Share this page.', share: true },
];

const FAQ = [
  { q: 'Where does my donation go?', a: 'To No Spot’s work with girls and women in the urban slums of Pune and remote villages of Odisha: sanitary pads and toiletries, awareness workshops, sanitation drives and health counselling.' },
  { q: 'Will I get a receipt and tax benefit?', a: 'Yes. Every donor gets a receipt on WhatsApp. Donations of ₹2,000 or more also get an 80G certificate, so you can claim tax benefit in India.' },
  { q: 'Can I give every month?', a: 'Yes. Tap “Give monthly” to set up a fixed amount each month, with auto-debit you can cancel anytime.' },
  { q: 'Are the pads safe?', a: 'No Spot gives out biodegradable sanitary pads, along with guidance on how to use and dispose of them safely.' },
];

function Icon({ name }) {
  const common = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'pad') return <svg {...common}><rect x="7" y="2.5" width="10" height="19" rx="5" /><path d="M10 8.5h4M10 12h4M10 15.5h4" /></svg>;
  if (name === 'talk') return <svg {...common}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></svg>;
  if (name === 'home') return <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>;
  return <svg {...common}><path d="M12 21s-7.5-4.6-9.3-9.4C1.5 8.3 3.6 4.5 7.3 4.5c2 0 3.4 1.1 4.7 2.8 1.3-1.7 2.7-2.8 4.7-2.8 3.7 0 5.8 3.8 4.6 7.1C19.5 16.4 12 21 12 21z" /></svg>;
}

export default function NoSpotPage() {
  const camp = bySlug('no-spot') || { raised: 0, donors: 0 };
  const tiers = CAMPAIGN_IMPACT_TIERS['no-spot'] || [];
  const raised = fmt(camp.raised);
  const donors = Number(camp.donors || 0).toLocaleString('en-IN');

  return (
    <div className="ns">
      {/* Google Tag Manager → Meta Pixel and Google Ads, for ads pointing at this page */}
      <Gtm />

      {/* Hero */}
      <section className="ns-hero">
        <div className="wrap ns-hero-grid">
          <div className="ns-hero-copy">
            <p className="ns-eyebrow">No Spot · A SikhAid women’s health mission</p>
            <h1>
              Periods are natural.
              <span> Missing school because of one shouldn’t be.</span>
            </h1>
            <p className="ns-lead">
              Across rural Odisha and the slums of Pune, many girls and women still manage their periods with old cloth,
              in silence. No Spot brings safe sanitary pads, honest conversations and clean facilities, so no one has to
              hide, miss school or lose a day’s work.
            </p>
            <div className="ns-actions">
              <a className="ns-btn ns-btn-main" href={DONATE}>Donate pads</a>
              <a className="ns-btn ns-btn-soft" href={MONTHLY}>Give monthly</a>
            </div>
            <p className="ns-note">Receipt on WhatsApp · 80G certificate for ₹2,000 or more</p>
          </div>
          <div className="ns-hero-media">
            <img src={PHOTOS.hero} alt="SikhAid volunteers with women at a No Spot session" />
            <div className="ns-raised" aria-label="Raised so far">
              <span className="ns-raised-label">Raised so far</span>
              <b>{raised}</b>
              <span className="ns-raised-sub">from {donors} donors · every rupee goes to No Spot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="ns-facts" aria-label="No Spot at a glance">
        <div className="wrap ns-facts-grid">
          <div><b>1 lakh+</b><span>sanitary pads given out every month</span></div>
          <div><b>{raised}</b><span>raised so far for No Spot</span></div>
          <div><b>{donors}</b><span>donors standing with them</span></div>
          <div><b>Pune &amp; Odisha</b><span>urban slums and remote villages</span></div>
        </div>
      </section>

      {/* Our story: mission, vision, approach */}
      <section className="ns-band" id="story">
        <div className="wrap">
          <p className="ns-kicker">Our story</p>
          <h2 className="ns-h2">Why No Spot exists</h2>
          <div className="ns-story">
            {STORY.map((s) => (
              <article key={s.label} className="ns-card ns-story-card">
                <span className="ns-tag">{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The issue */}
      <section className="ns-band ns-band-soft">
        <div className="wrap ns-split">
          <div className="ns-split-media">
            <img src={PHOTOS.workshop} alt="A No Spot awareness workshop with girls" loading="lazy" />
          </div>
          <div>
            <p className="ns-kicker">The issue</p>
            <h2 className="ns-h2">A period should never cost a girl her dignity</h2>
            <div className="ns-issue">
              {ISSUE.map((w, i) => (
                <div key={w.title} className="ns-issue-row">
                  <span className="ns-num">0{i + 1}</span>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="ns-band">
        <div className="wrap">
          <p className="ns-kicker">What No Spot does</p>
          <h2 className="ns-h2">Four ways we bring dignity back</h2>
          <div className="ns-pillars">
            {PILLARS.map((p) => (
              <article key={p.title} className="ns-pillar">
                <span className="ns-icon"><Icon name={p.icon} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gift tiers */}
      {tiers.length > 0 && (
        <section className="ns-band ns-band-blush" id="give">
          <div className="wrap">
            <p className="ns-kicker">Your gift at work</p>
            <h2 className="ns-h2">Choose what you’d like to give</h2>
            <div className="ns-tiers">
              {tiers.map((t) => (
                <a key={t.amt} className="ns-tier" href={DONATE}>
                  <b className="ns-tier-amt">{fmt(t.amt)}</b>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <span className="ns-tier-go">Donate →</span>
                </a>
              ))}
            </div>
            <p className="ns-center"><a className="ns-link" href={DONATE}>Or give any amount you like</a></p>
          </div>
        </section>
      )}

      {/* Voice */}
      <section className="ns-quote-band">
        <div className="wrap ns-quote-grid">
          <img src={PHOTOS.distribution} alt="SikhAid volunteers with No Spot sanitary pads" loading="lazy" />
          <figure>
            <blockquote>
              {camp.quote ||
                'Menstrual hygiene is a matter of health, education and human dignity. No Spot replaces unhygienic alternatives with safe sanitary pads and counselling.'}
            </blockquote>
            <figcaption>{camp.quoteAuthor || 'No Spot Women’s Health Team'}</figcaption>
          </figure>
        </div>
      </section>

      {/* Stronger together */}
      <section className="ns-band">
        <div className="wrap">
          <p className="ns-kicker">Stronger together</p>
          <h2 className="ns-h2">We can’t end period poverty alone</h2>
          <div className="ns-help">
            {HELP.map((h) => (
              <article key={h.title} className="ns-card ns-help-card">
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                {h.share ? <ShareButton className="ns-btn ns-btn-soft" /> : <a className={`ns-btn ${h.href === DONATE ? 'ns-btn-main' : 'ns-btn-soft'}`} href={h.href}>{h.cta}</a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="ns-gallery" aria-label="No Spot in pictures">
        <img src={PHOTOS.distribution} alt="Volunteers with No Spot pad packs" loading="lazy" />
        <img src={PHOTOS.hero} alt="The No Spot team with women in the community" loading="lazy" />
        <img src={PHOTOS.workshop} alt="Girls at a No Spot session" loading="lazy" />
      </section>

      {/* FAQ */}
      <section className="ns-band">
        <div className="wrap ns-faq-wrap">
          <p className="ns-kicker">Questions</p>
          <h2 className="ns-h2">Before you give</h2>
          <div className="ns-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call */}
      <section className="ns-cta">
        <div className="wrap ns-cta-inner">
          <h2>Help a girl get through her period with dignity, this month and every month.</h2>
          <div className="ns-actions ns-actions-center">
            <a className="ns-btn ns-btn-light" href={DONATE}>Donate now</a>
            <ShareButton className="ns-btn ns-btn-ghost" />
          </div>
        </div>
      </section>

      <StickyDonate href={DONATE} raised={raised} />
      <KeepUtm />
    </div>
  );
}
