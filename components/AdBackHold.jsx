'use client';

import { useEffect, useRef, useState } from 'react';
import { bySlug } from '@/lib/data';
import { cardLine } from '@/lib/card-lines';
import './AdBackHold.css';

// On every campaign page (/campaigns/<slug>). After the visitor's first tap, one extra
// history step is added, so the first Back press shows "Before you go" instead of leaving.
// A second Back press (or "Leave page") leaves as normal. Browsers only honour the extra step
// after a real tap, which is why it waits for one.
export default function AdBackHold({ slug }) {
  const [open, setOpen] = useState(false);
  const campaign = bySlug(slug);
  // Once per page visit: one extra step, one "Before you go". Never re-armed.
  const done = useRef({ held: false, shown: false });

  useEffect(() => {
    if (!bySlug(slug)) return undefined;
    const st = done.current;
    if (window.history.state?.adHold) st.held = true;

    const hold = () => {
      if (st.held) return;
      st.held = true;
      window.history.pushState({ ...(window.history.state || {}), adHold: true }, '', window.location.href);
    };
    const onPop = () => {
      if (!st.held || st.shown || window.history.state?.adHold) return;
      if (new URLSearchParams(window.location.search).has('donate')) return;
      st.shown = true;
      setOpen(true);
    };

    window.addEventListener('pointerup', hold, { once: true });
    window.addEventListener('keydown', hold, { once: true });
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('pointerup', hold);
      window.removeEventListener('keydown', hold);
      window.removeEventListener('popstate', onPop);
    };
  }, [slug]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Opens the donation form the same way the page's own Donate buttons do.
  const donate = () => {
    setOpen(false);
    const link = document.createElement('a');
    link.href = `/donate/${slug}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!open || !campaign) return null;
  const line = cardLine({ ...campaign, slug: campaign.testOf || campaign.slug });

  return (
    <div className="abh-back" role="presentation" onClick={() => setOpen(false)}>
      <div className="abh" role="dialog" aria-modal="true" aria-labelledby="abh-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="abh-x" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        {campaign.img && <img className="abh-img" src={campaign.img} alt="" />}
        <div className="abh-body">
          <h2 id="abh-title">Before you go</h2>
          <p>{line || `Your support for ${campaign.title} can change a life today.`}</p>
          <button type="button" className="btn btn-give abh-give" onClick={donate}>Donate Now</button>
          <button type="button" className="abh-leave" onClick={() => window.history.back()}>Leave page</button>
        </div>
      </div>
    </div>
  );
}
