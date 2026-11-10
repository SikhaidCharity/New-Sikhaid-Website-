'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { saveFormSubmission } from '@/lib/forms';
import { blogDate, publishedBlogs } from '@/lib/blog';
import './blog.css';

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    saveFormSubmission('newsletter', { Email: email });
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <main>
      <section className="band tight">
        <div className="wrap stack blog-list" style={{ gap: '28px' }}>
          <div className="stack" style={{ gap: '12px' }}>
            <h1 style={{ fontSize: 'clamp(38px, 5.4vw, 60px)' }}>Stories from the field</h1>
            <p className="lead">Volunteer diaries, ground reports and the people behind every relief operation.</p>
          </div>

          {publishedBlogs.length > 0 ? (
            <div className="blog-grid">
              {publishedBlogs.map((post) => (
                <Link className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                  <Photo src={post.image} label={post.category} alt="" />
                  <div className="blog-card-body">
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="blog-meta">{blogDate(post)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="blog-empty">More stories are coming soon.</p>
          )}
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
            <label className="sr-only" htmlFor="subEmail">Email address</label>
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
