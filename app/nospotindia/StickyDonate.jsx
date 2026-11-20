'use client';

import { useEffect, useState } from 'react';

// Donate, always within reach once the visitor scrolls past the top of the page:
// a bar along the bottom on phones, a floating button on larger screens.
export default function StickyDonate({ href, raised }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`ns-sticky${shown ? ' is-shown' : ''}`} aria-hidden={!shown}>
      <span className="ns-sticky-text"><b>{raised}</b> raised for No Spot</span>
      <a className="ns-btn ns-btn-main ns-sticky-btn" href={href} tabIndex={shown ? 0 : -1}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.3-9.4C1.5 8.3 3.6 4.5 7.3 4.5c2 0 3.4 1.1 4.7 2.8 1.3-1.7 2.7-2.8 4.7-2.8 3.7 0 5.8 3.8 4.6 7.1C19.5 16.4 12 21 12 21z" /></svg>
        Donate<span className="ns-sticky-long"> to No Spot</span>
      </a>
    </div>
  );
}
