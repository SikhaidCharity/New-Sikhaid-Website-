// /nospotindia: the No Spot campaign landing page (menstrual health and dignity).
// Written for women donors: it speaks from one woman to another, starting from what every woman
// already knows about periods, then shows what the same week looks like for a girl without pads.
// Reached only by its link (ads, WhatsApp, emails): not in the menus, and kept out of search results.
// Every Donate button opens this website's own donation card (themed to match the page) for the No Spot
// campaign, which records the gift in the admin and sends the Meta "Purchase" through GTM. The ad's UTM
// tags are remembered and saved with the donation.
import { CAMPAIGN_IMPACT_TIERS, bySlug, fmt } from '@/lib/data';
import LiveNumber from '@/components/LiveNumber';
import ShareButton from './ShareButton';
import StickyDonate from './StickyDonate';
import './no-spot.css';

export const metadata = {
  title: 'No Spot: Every Woman Knows. Not Every Girl Has a Pad. | SikhAid',
  description:
    'You know what a period feels like. Many girls in rural India still manage theirs with old cloth. Help SikhAid give them safe pads, answers and dignity.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Every woman knows. Not every girl has a pad.',
    description: 'From one woman to another: help girls in rural India get through their periods with dignity.',
    images: ['/nospotindia/hero.jpg'],
  },
};

const DONATE = '/donate';
const MONTHLY = '/donate#monthly';
// Kept on the site itself (public/nospotindia), so the page never depends on an outside image host.
const PHOTOS = {
  hero: '/nospotindia/hero.jpg',
  workshop: '/nospotindia/workshop.jpg',
  distribution: '/nospotindia/distribution.jpg',
};

// "You remember": moments every woman recognises.
const MOMENTS = [
  { title: 'The first time', text: 'The confusion. The fear that something was wrong. Maybe someone sat you down and explained. Maybe no one did.' },
  { title: 'The school day', text: 'Checking the back of your uniform. Tying a sweater round your waist. Counting the hours until home.' },
  { title: 'The quiet ask', text: '“Do you have a pad?” Whispered to a friend, a stranger in the washroom, a colleague. Women always help.' },
];

// The same period, two different lives.
const COMPARE = {
  you: [
    'Pads in the cupboard, and money to buy more',
    'A clean bathroom with a door that locks',
    'Someone to ask when something feels wrong',
    'School, work and life carry on as usual',
  ],
  her: [
    'Old cloth, washed and used again and again',
    'No toilet nearby, so she waits until dark',
    'No one to explain, so she believes she is impure',
    'Days of school missed, every single month',
  ],
};

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

const PILLARS = [
  { icon: 'pad', title: 'Pads, every month', text: 'Biodegradable sanitary pads and hygiene essentials, handed out every month, not just once.' },
  { icon: 'talk', title: 'Answers, not shame', text: 'Workshops where girls and their mothers learn what a period is, and that it is normal.' },
  { icon: 'home', title: 'A door to close', text: 'Sanitation drives and portable toilets, so she has a clean, private place to change.' },
  { icon: 'care', title: 'Someone to ask', text: 'Health counselling for pain and problems, from women she can talk to openly.' },
];

const FAQ = [
  { q: 'Who are the girls and women you help?', a: 'Schoolgirls, mothers and working women in the urban slums of Pune and remote villages of Odisha, many of whom have never used a sanitary pad.' },
  { q: 'Where does my donation go?', a: 'To No Spot: sanitary pads and toiletries, awareness workshops, sanitation drives and health counselling.' },
  { q: 'Will I get a receipt and tax benefit?', a: 'Yes. You get a receipt on WhatsApp. Donations of ₹2,000 or more also get an 80G certificate, so you can claim tax benefit in India.' },
  { q: 'Can I give every month?', a: 'Yes. Tap “Give monthly” to set up a fixed amount each month, with auto-debit you can cancel anytime.' },
  { q: 'Are the pads safe?', a: 'No Spot gives out biodegradable sanitary pads, along with guidance on how to use and dispose of them safely.' },
];

function Icon({ name }) {
  const common = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'pad') return <svg {...common}><rect x="7" y="2.5" width="10" height="19" rx="5" /><path d="M10 8.5h4M10 12h4M10 15.5h4" /></svg>;
  if (name === 'talk') return <svg {...common}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></svg>;
  if (name === 'home') return <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>;
  if (name === 'check') return <svg {...common} width={20} height={20}><path d="M20 6 9 17l-5-5" /></svg>;
  if (name === 'cross') return <svg {...common} width={20} height={20}><path d="M18 6 6 18M6 6l12 12" /></svg>;
  return <svg {...common}><path d="M12 21s-7.5-4.6-9.3-9.4C1.5 8.3 3.6 4.5 7.3 4.5c2 0 3.4 1.1 4.7 2.8 1.3-1.7 2.7-2.8 4.7-2.8 3.7 0 5.8 3.8 4.6 7.1C19.5 16.4 12 21 12 21z" /></svg>;
}

export default function NoSpotPage() {
  const camp = bySlug('no-spot') || { raised: 0, donors: 0 };
  const tiers = CAMPAIGN_IMPACT_TIERS['no-spot'] || [];
  // Live: starting totals plus payments received since (lib/live-stats.js).
  const raised = <LiveNumber slug="no-spot" field="raised" initial={camp.raised} />;
  const donors = <LiveNumber slug="no-spot" field="donors" initial={camp.donors} />;

  return (
    <div className="ns">
      {/* Google Tag Manager → Meta Pixel and Google Ads, for ads pointing at this page */}

      {/* Hero */}
      <section className="ns-hero">
        <div className="wrap ns-hero-grid">
          <div className="ns-hero-copy">
            <p className="ns-eyebrow">From one woman to another</p>
            <h1>
              Every woman knows what a period feels like.
              <span> Not every girl has a pad.</span>
            </h1>
            <p className="ns-lead">
              You’ve had the cramps, the stained-uniform panic, the whispered “do you have a pad?”. Now imagine it every
              month with only old cloth, no door to close and no one to explain. For many girls in rural Odisha and the
              slums of Pune, that is still every month.
            </p>
            <div className="ns-actions">
              <a className="ns-btn ns-btn-main" href={DONATE}>Give her a pad</a>
              <a className="ns-btn ns-btn-soft" href={MONTHLY}>Stand with her every month</a>
            </div>
            <p className="ns-note">Receipt on WhatsApp · 80G certificate for ₹2,000 or more</p>
          </div>
          <div className="ns-hero-media">
            <img src={PHOTOS.hero} alt="SikhAid volunteers with women and girls at a No Spot session" />
            <div className="ns-raised" aria-label="Raised so far">
              <span className="ns-raised-label">Raised so far</span>
              <b>{raised}</b>
              <span className="ns-raised-sub">from {donors} donors standing with her</span>
            </div>
          </div>
        </div>
      </section>

      {/* You remember */}
      <section className="ns-band">
        <div className="wrap">
          <p className="ns-kicker">You remember</p>
          <h2 className="ns-h2">Every woman has a period story</h2>
          <div className="ns-moments">
            {MOMENTS.map((m) => (
              <article key={m.title} className="ns-moment">
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
          <p className="ns-moments-end">Now imagine going through all of it with nothing.</p>
        </div>
      </section>

      {/* Same period, two lives */}
      <section className="ns-band ns-band-soft">
        <div className="wrap">
          <p className="ns-kicker">The same period</p>
          <h2 className="ns-h2">Your week, and hers</h2>
          <div className="ns-compare">
            <div className="ns-compare-col ns-compare-you">
              <h3>Your period</h3>
              <ul>
                {COMPARE.you.map((t) => (
                  <li key={t}><span className="ns-mark"><Icon name="check" /></span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="ns-compare-col ns-compare-her">
              <h3>Her period</h3>
              <ul>
                {COMPARE.her.map((t) => (
                  <li key={t}><span className="ns-mark"><Icon name="cross" /></span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ns-compare-cta">
            <p>You can close this gap for a girl, starting this month.</p>
            <a className="ns-btn ns-btn-main" href={DONATE}>Close the gap</a>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="ns-facts" aria-label="No Spot at a glance">
        <div className="wrap ns-facts-grid">
          <div><b>1 lakh+</b><span>sanitary pads given out every month</span></div>
          <div><b>{raised}</b><span>raised so far for No Spot</span></div>
          <div><b>{donors}</b><span>donors standing with her</span></div>
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

      {/* What she gets */}
      <section className="ns-band ns-band-soft">
        <div className="wrap ns-split">
          <div className="ns-split-media">
            <img src={PHOTOS.workshop} alt="Girls at a No Spot awareness session" loading="lazy" />
          </div>
          <div>
            <p className="ns-kicker">What your gift gives her</p>
            <h2 className="ns-h2">Everything you had, that she doesn’t</h2>
            <ul className="ns-work">
              {PILLARS.map((p) => (
                <li key={p.title}>
                  <span className="ns-icon"><Icon name={p.icon} /></span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Monthly */}
      <section className="ns-monthly">
        <div className="wrap ns-monthly-inner">
          <div className="ns-cycle" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => <i key={i} className={i < 5 ? 'is-on' : ''} />)}
          </div>
          <div>
            <p className="ns-kicker ns-kicker-light">Every month</p>
            <h2>Her period comes every month. Your support can too.</h2>
            <p>
              A one-time gift helps today. A monthly gift means she never has to go back to cloth. Choose any amount,
              cancel anytime.
            </p>
            <a className="ns-btn ns-btn-light" href={MONTHLY}>Give monthly</a>
          </div>
        </div>
      </section>

      {/* Gift tiers */}
      {tiers.length > 0 && (
        <section className="ns-band ns-band-blush" id="give">
          <div className="wrap">
            <p className="ns-kicker">Your gift at work</p>
            <h2 className="ns-h2">Pick what feels right to you</h2>
            <div className="ns-tiers">
              {tiers.map((t) => (
                <a key={t.amt} className="ns-tier" href={`/donate?amount=${t.amt}`}>
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
          <img src={PHOTOS.distribution} alt="Women volunteers of SikhAid with No Spot sanitary pads" loading="lazy" />
          <figure>
            <blockquote>
              {camp.quote ||
                'Menstrual hygiene is a matter of health, education and human dignity. No Spot replaces unhygienic alternatives with safe sanitary pads and counselling.'}
            </blockquote>
            <figcaption>{camp.quoteAuthor || 'No Spot Women’s Health Team'}</figcaption>
          </figure>
        </div>
      </section>

      {/* Women helping women */}
      <section className="ns-band">
        <div className="wrap">
          <p className="ns-kicker">Women helping women</p>
          <h2 className="ns-h2">We’ve always handed each other a pad. This is the same thing.</h2>
          <div className="ns-help">
            <article className="ns-card ns-help-card">
              <h3>Give once</h3>
              <p>Pads, kits and workshops for girls who need them now.</p>
              <a className="ns-btn ns-btn-main" href={DONATE}>Donate</a>
            </article>
            <article className="ns-card ns-help-card">
              <h3>Give monthly</h3>
              <p>Keep a girl supplied all year, not just for one cycle.</p>
              <a className="ns-btn ns-btn-soft" href={MONTHLY}>Give monthly</a>
            </article>
            <article className="ns-card ns-help-card">
              <h3>Volunteer</h3>
              <p>Join distribution drives and sit with girls at awareness sessions.</p>
              <a className="ns-btn ns-btn-soft" href="/volunteering">Volunteer</a>
            </article>
            <article className="ns-card ns-help-card">
              <h3>Tell your girls</h3>
              <p>Send this to your sisters, friends and mothers’ group. Talking openly is how the silence ends.</p>
              <ShareButton className="ns-btn ns-btn-soft" />
            </article>
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
          <h2>Somewhere, a girl is getting her first period this month. Let it be with a pad, and an answer.</h2>
          <div className="ns-actions ns-actions-center">
            <a className="ns-btn ns-btn-light" href={DONATE}>Give her a pad</a>
            <ShareButton className="ns-btn ns-btn-ghost" />
          </div>
        </div>
      </section>

      <StickyDonate href={DONATE} raised={raised} />
    </div>
  );
}
