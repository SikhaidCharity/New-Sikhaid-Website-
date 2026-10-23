'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { IMG } from '@/lib/data';

export default function BlogPage() {
  const posts = [
    {
      img: IMG.langar,
      tone: '#4A4A6A',
      category: 'Volunteer stories',
      date: '20 Jan 2025',
      title: 'Meet our volunteers: stories from the heart of SikhAid',
      blurb:
        'The inspiring people who dedicate their time and energy to serve communities across India, embodying the true spirit of sewa.',
    },
    {
      img: IMG.food,
      tone: '#7A4E26',
      category: 'Food security',
      date: '18 Jan 2025',
      title: 'Inside our community kitchens: a day with Langar Aid',
      blurb:
        '300+ volunteers preparing over 2,000 meals daily, serving fresh, nutritious food to vulnerable communities.',
    },
    {
      img: null,
      tone: '#2E6B68',
      category: 'Education',
      date: '15 Jan 2025',
      title: 'Educational support: scholarships changing lives in Odisha',
      blurb:
        'How scholarships, school supplies and tuition support are breaking the cycle of poverty for children.',
    },
  ];

  const categories = [
    'All',
    'Volunteer stories',
    'Food security',
    'Education',
    'Disaster relief',
    'Healthcare',
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = posts.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <main>
      <section className="band tight">
        <div className="wrap stack" style={{ gap: '24px' }}>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Blog
          </nav>

          <div className="stack" style={{ gap: '12px' }}>
            <h1 style={{ fontSize: 'clamp(38px, 5.4vw, 60px)' }}>
              Stories from the field
            </h1>
            <p className="lead">
              Volunteer diaries, ground reports and the people behind every relief operation.
            </p>
          </div>

          <a className="feature" href="#posts">
            <Photo
              src={IMG.food}
              tone="#7A4E26"
              label="Langar Aid kitchen"
              alt="Community kitchen"
            />
            <div className="t">
              <span className="eyebrow" style={{ color: 'var(--saffron)' }}>
                Featured · Food security
              </span>
              <h2>Inside our community kitchens: a day with Langar Aid</h2>
              <p>
                Step inside the kitchens where 300+ volunteers prepare over 2,000
                fresh, nutritious meals daily for vulnerable communities.
              </p>
              <b style={{ color: '#fff' }}>Read the story →</b>
            </div>
          </a>

          <div className="chips" role="group" aria-label="Filter posts">
            {categories.map((c) => (
              <button
                key={c}
                className="chip"
                type="button"
                aria-pressed={activeCategory === c}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid g3" id="posts">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((p, i) => (
                <article className="post" key={i}>
                  <Photo
                    src={p.img}
                    tone={p.tone}
                    label={p.category}
                    alt={p.title}
                  />
                  <div className="b">
                    <span className="eyebrow" style={{ fontSize: '12px' }}>
                      {p.category} · {p.date}
                    </span>
                    <h2 style={{ fontSize: '21px', lineHeight: 1.25 }}>
                      {p.title}
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                      {p.blurb}
                    </p>
                    <a className="more" href="#posts" style={{ marginTop: 'auto' }}>
                      Read more →
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <p style={{ color: 'var(--muted)', padding: '24px 0' }}>
                No posts in this category yet. Check back soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Press coverage */}
      <section className="band alt" id="press" aria-labelledby="press-h">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Press coverage</span>
              <h2 className="h-sec" id="press-h">
                SikhAid in the news
              </h2>
            </div>
            <span style={{ color: 'var(--muted)' }}>
              Media enquiries: <b style={{ color: 'var(--ink)' }}>help@sikhaid.ngo</b>
            </span>
          </div>

          <div className="row" style={{ gap: '10px', marginBottom: '24px' }}>
            <span className="pub">[Times of India]</span>
            <span className="pub">[The Hindu]</span>
            <span className="pub">[NDTV]</span>
            <span className="pub">[Indian Express]</span>
            <span className="pub">[Hindustan Times]</span>
          </div>

          <div className="grid g3">
            <a className="press" href="#press">
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--muted)' }}>
                [PUBLICATION] · [DATE]
              </span>
              <b style={{ fontSize: '18px', color: 'var(--ink)', lineHeight: 1.35 }}>
                How SikhAid reached remote submerged villages in Bihar within 24 hours
              </b>
              <span className="more" style={{ padding: 0 }}>
                Read on publisher site ↗
              </span>
            </a>
            <a className="press" href="#press">
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--muted)' }}>
                [PUBLICATION] · [DATE]
              </span>
              <b style={{ fontSize: '18px', color: 'var(--ink)', lineHeight: 1.35 }}>
                Langar Sewa: Serving dignity and hot meals across 19 Indian states
              </b>
              <span className="more" style={{ padding: 0 }}>
                Read on publisher site ↗
              </span>
            </a>
            <a className="press" href="#press">
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--muted)' }}>
                [PUBLICATION] · [DATE]
              </span>
              <b style={{ fontSize: '18px', color: 'var(--ink)', lineHeight: 1.35 }}>
                Health on Wheels: Free rural clinic on wheels transforms healthcare in Odisha
              </b>
              <span className="more" style={{ padding: 0 }}>
                Read on publisher site ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="band dark tight">
        <div className="wrap grid g2" style={{ alignItems: 'center' }}>
          <div className="stack" style={{ gap: '8px' }}>
            <h2 style={{ fontSize: '30px' }}>Get field updates in your inbox</h2>
            <p>One email a month with stories, photos and where donations went. No spam.</p>
          </div>
          <form className="sub" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="subEmail">
              Email address
            </label>
            <input
              id="subEmail"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-give btn-lg" type="submit">
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
